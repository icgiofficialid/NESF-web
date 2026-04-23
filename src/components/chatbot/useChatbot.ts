// ================================================================
// useChatbot.ts — AI Chatbot hook
// ================================================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatbotConfig {
  botName: string;
  welcomeMessage: string;
  systemPrompt: string;
  accentColor: string;
  accentForeground: string;
  apiUrl: string;
}

// ── ICC CONFIG ────────────────────────────────────────────────────
export const ICC_CONFIG: ChatbotConfig = {
  botName: "ICC Assistant",
  welcomeMessage:
    "Hello! I'm the official ICC Assistant. I'm here to help you with registration, competition categories, schedules, and more. Feel free to ask!",
  accentColor: "#ffffff",
  accentForeground: "#0a0a0a",
  apiUrl: "/api/chat",
  systemPrompt: `You are the official AI assistant for the Yogyakarta International Cultural Competition (YICC), organized by ICGI in Yogyakarta, Indonesia.

You are bilingual — always respond in the same language the user uses. English for English, Indonesian for Indonesian.

Your role is to answer questions ONLY based on the information below. If a question is outside this scope, politely say you don't have that information yet and suggest contacting the official committee at icgi.official.id@gmail.com or www.icgi.or.id.

=== EVENT INFORMATION ===

Event Name: Yogyakarta International Cultural Competition (YICC)
Type: International Cultural Competition
Venue: TBA (Yogyakarta, Indonesia)
Format: Indonesian participants: Offline | International participants: Hybrid (mechanism TBA)
Official Email: icgi.official.id@gmail.com
Official Website: www.icgi.or.id

=== PARTICIPANT DIVISIONS ===

Student Division:
- Primary / Elementary School: Age 7–12
- Junior High School: Age 13–15
- Senior High School: Age 16–18

Open Division:
- For university students, communities, cultural studios/sanggar, and general participants
- No age limit (mixed age compositions allowed)
- International participants must present cultural works representing their country/region/community of origin

=== COMPETITION CATEGORIES ===

1. Traditional / Cultural-Based Dance Solo
   - Participants: 1 person
   - Duration: Max 5 minutes
   - Required submission: Dance title, cultural origin, short description, music file, property declaration (if applicable)

2. Traditional / Cultural-Based Dance Group
   - Participants: 5–10 people
   - Duration: Max 7 minutes
   - Required submission: Dance title, cultural origin, short description, member list, music file, property declaration (if applicable)

3. Ethnic / Cultural Creative Costume Show
   - Participants: 1 person (Solo)
   - Duration: Max 2 minutes
   - Required submission: Costume title/theme, cultural inspiration, short description, music file
   - Modern interpretation allowed as long as cultural roots remain clear

4. Traditional Song Solo
   - Participants: 1 person
   - Duration: Max 5 minutes
   - Required submission: Song title, cultural origin, short description/meaning, instrumental backing track, lyrics (if required)
   - Domestic participants: choose from official song list
   - International participants: must represent their own cultural origin

=== DOMESTIC SONG LIST (Traditional Song Solo) ===

- Soleram — Riau
- Jali-Jali — Betawi / DKI Jakarta
- Gambang Suling — Jawa Tengah
- Cublak-Cublak Suweng — Jawa
- Kampuang Nan Jauh di Mato — Sumatra Barat
- Ampar-Ampar Pisang — Kalimantan Selatan
- O Ina Ni Keke — Sulawesi Utara
- Cik Cik Periuk — Kalimantan Barat

=== COMPETITION RULES ===

Schedule:
- Performance order determined by committee
- Schedule change requests not accepted
- Late participants may lose their performance slot

Submission Deadline:
- All files and documents must be submitted at least 14 days before the event (H-14)
- Includes: music files, descriptions, property declaration, and other required documents

Music:
- Must be submitted in advance
- Accepted format: MP3 / WAV (to be confirmed)
- Participants must bring backup files on event day
- Only approved files will be used

Property Rules — PROHIBITED items:
- Fire, smoke, liquids, sharp weapons
- Glass or breakable materials, dangerous substances
- Live animals, confetti, glitter
- Any material that makes the stage dirty or slippery

Costume & Content:
- Must be appropriate for public cultural competition
- No hate speech, offensive SARA content, explicit violence, or inappropriate material

Setup Time (on-stage before performance):
- Dance Solo: 1 minute
- Dance Group: 1 minute
- Costume Show: 1 minute
- Solo Vocal: Cue music only, no major setup

=== TECHNICAL REHEARSAL ===

- Held before main competition
- For technical checking only (entrance/exit, stage position, cue music, blocking)
- NOT a full performance session
- Schedule determined by committee, cannot be changed
- Missing rehearsal slot = may lose rehearsal opportunity

Rehearsal Duration:
- Dance Solo: 3 minutes
- Dance Group: 5 minutes
- Costume Show: 2 minutes
- Solo Vocal: 2 minutes

=== JUDGING CRITERIA ===

Traditional Dance Solo & Group:
- Technique & Execution: 30%
- Cultural Interpretation / Authenticity: 25%
- Choreography / Composition: 20%
- Stage Presence & Expression: 15%
- Costume & Overall Presentation: 10%

Ethnic / Cultural Creative Costume Show:
- Costume Concept & Cultural Relevance: 35%
- Creativity / Design Development: 25%
- Catwalk & Presentation: 20%
- Confidence / Expression: 10%
- Overall Visual Impact: 10%

Traditional Song Solo:
- Vocal Quality / Technique: 35%
- Musicality / Intonation / Rhythm: 25%
- Interpretation & Expression: 20%
- Cultural Delivery / Song Character: 10%
- Stage Presence / Appearance: 10%

=== AWARDS ===

- Gold Award
- Silver Award
- Bronze Award
- Honorable Mention
- Certificate of Participation
- Additional: Winner of Each Category & Special Awards (under discussion)

=== EVENT ITINERARY ===

- Day 1: Registration, Opening Ceremony, Technical Meeting/Briefing, Welcoming Party
- Day 2: Technical Rehearsal, Stage Checking, Sound & Lighting Test, Costume Preparation
- Day 3: Cultural Main Competition
- Day 4: Cultural Expo/Booth, Gala Night, Cultural Showcase/Exchange Performance
- Day 5: Awarding Ceremony, Closing Ceremony, Official Photo

=== CULTURAL EXPO BOOTH ===

- Booth size: 2x2 meters (tentative)
- Allowed content: traditional food, cultural souvenirs, handicrafts, regional/national cultural items, visual cultural information
- Sales allowed (subject to committee and venue regulations)
- Rules: clean, safe, respectful; no dangerous items; manage waste responsibly

Booth Assessment Criteria:
- Cultural Storytelling / Content: 25%
- Visual Design / Creativity: 20%
- Space Utilization: 15%
- Visitor Engagement / Interactivity: 15%
- Product / Display Relevance: 15%
- Cleanliness & Order: 10%

=== GALA NIGHT SHOWCASE ===

- Non-competitive cultural presentation
- Voluntary or by committee invitation
- Forms: dance, music, costume presentation, or cultural greeting
- NOT included in official competition score

=== REQUIRED DOCUMENTS ===

General (all participants):
- Registration form
- Identity card / student card / passport
- Participant or team photo
- Institution / community / studio information
- Consent for documentation and publication

By Category:
- Dance: title, cultural origin, description, music file, property declaration
- Costume Show: costume title, cultural inspiration, description, music file
- Solo Vocal: song title, origin, description/meaning, instrumental backing track, lyrics (if required)

=== ITEMS STILL TBD (not yet confirmed) ===

The following are NOT yet finalized — do not give specific answers, tell users to check the official website or contact committee:
- Registration fee
- Final venue
- Hybrid mechanism for international participants
- Final song list for domestic solo vocal
- Score band and award details
- Special award details
- Booth facilities

=== BEHAVIOR RULES ===

- Only answer questions related to YICC / ICC event information above
- If asked about topics outside YICC (e.g., general knowledge, other events, unrelated topics), politely decline and redirect to YICC topics
- If information is not in the guidebook above, say: "This information hasn't been confirmed yet. Please contact us at icgi.official.id@gmail.com or visit www.icgi.or.id for updates."
- Be friendly, professional, and helpful at all times
`,
};

// ── ICGI CONFIG ───────────────────────────────────────────────────
export const ICGI_CONFIG: ChatbotConfig = {
  botName: "ICGI Assistant",
  welcomeMessage:
    "Selamat datang di ICGI! Saya siap membantu Anda dengan informasi tentang program, event, dan layanan ICGI. Silakan tanyakan apa saja!",
  systemPrompt: `Kamu adalah asisten resmi ICGI (organisasi penyelenggara event budaya dan kompetisi internasional berbasis di Yogyakarta, Indonesia).

Bantu pengunjung dengan:
- Informasi tentang ICGI dan visi misinya
- Event yang diselenggarakan (ICC, IESF, dan event lainnya)
- Cara berpartisipasi, bermitra, atau menjadi sponsor
- Informasi kontak dan media sosial resmi
- Program beasiswa atau kolaborasi budaya

Bersikaplah profesional, ramah, dan informatif. Jawab dalam bahasa yang sama dengan pengguna.`,
  accentColor: "#1d4ed8",
  accentForeground: "#ffffff",
  apiUrl: "/api/chat",
};

// ── IESF CONFIG ───────────────────────────────────────────────────
export const IESF_CONFIG: ChatbotConfig = {
  botName: "IESF Assistant",
  welcomeMessage:
    "Hi! I'm the IESF Assistant. I can help you with information about our programs, events, and activities. What would you like to know?",
  systemPrompt: `Kamu adalah asisten resmi IESF, sebuah organisasi event dan federasi olahraga internasional.

Bantu pengunjung dengan:
- Program dan kegiatan IESF
- Jadwal event dan cara pendaftaran
- Persyaratan partisipasi
- Kontak dan informasi resmi organisasi

Bersikaplah profesional, energetik, dan membantu. Jawab dalam bahasa yang sama dengan pengguna (Indonesia atau Inggris).`,
  accentColor: "#16a34a",
  accentForeground: "#ffffff",
  apiUrl: "/api/chat",
};

// ── HOOK ─────────────────────────────────────────────────────────
import { useState, useCallback, useRef } from "react";

export function useChatbot(config: ChatbotConfig) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || isLoading) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: userText.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      const assistantId = crypto.randomUUID();
      setMessages(prev => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      try {
        abortRef.current = new AbortController();

        const history = [...messages, userMsg].map(m => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch(config.apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: abortRef.current.signal,
          body: JSON.stringify({
            systemPrompt: config.systemPrompt,
            messages: history,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error ?? `Server error: ${res.status}`);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error("No response body");

        let accumulated = "";
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
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (typeof parsed.text === "string") {
                accumulated += parsed.text;
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantId ? { ...m, content: accumulated } : m
                  )
                );
              }
            } catch { /* skip */ }
          }
        }

        if (!accumulated) {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId
                ? { ...m, content: "Sorry, no response received. Please try again." }
                : m
            )
          );
        }

      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "An error occurred";
        setError(msg);
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: "Sorry, an error occurred. Please try again." }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, isLoading, config]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages, stopGeneration };
}