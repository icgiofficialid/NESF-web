import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_ORIGINS = [
  "https://icc.icgi.or.id",
  "https://iesf.icgi.or.id",
  "https://icgi.or.id",
  "https://iccofficial.or.id",
  "https://www.iccofficial.or.id",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://localhost:8080",
];

const ipMap = new Map<string, { count: number; reset: number }>();
function checkRate(ip: string, max = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.reset) {
    ipMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration error: API key missing." });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ??
    req.socket.remoteAddress ?? "unknown";

  if (!checkRate(ip)) {
    return res.status(429).json({ error: "Terlalu banyak permintaan. Coba lagi dalam 1 menit." });
  }

  const { systemPrompt, messages } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages tidak valid" });
  }

  try {
    // Format pesan untuk Groq (OpenAI-compatible)
    const groqMessages = [
      {
        role: "system",
        content: typeof systemPrompt === "string" ? systemPrompt : "You are a helpful assistant.",
      },
      ...messages.slice(-18).map((m: { role: string; content: string }) => ({
        role: m.role, // "user" | "assistant" — sama dengan OpenAI
        content: m.content,
      })),
    ];

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // model terbaik Groq, gratis
        messages: groqMessages,
        stream: true,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      const errData = await groqRes.json().catch(() => ({}));
      throw new Error(errData?.error?.message ?? `Groq error: ${groqRes.status}`);
    }

    // SSE streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("X-Accel-Buffering", "no");

    const reader = groqRes.body?.getReader();
    if (!reader) throw new Error("No response body from Groq");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") {
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const text = parsed.choices?.[0]?.delta?.content;
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        } catch {
          // skip invalid JSON
        }
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();

  } catch (err: unknown) {
    console.error("[groq] error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";

    if (!res.headersSent) {
      res.status(500).json({ error: message });
    } else {
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
      res.end();
    }
  }
}