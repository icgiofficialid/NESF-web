// ================================================================
// gasClient.ts — nesf-event-web
//
// ⚠️ UPDATE: menambahkan alias `NESFEvent` dan tipe "Education"
//    agar kompatibel dengan NesfUpcomingEvents.tsx & NesfIndex.tsx
//    yang sudah meng-import { NESFEvent, EventType } dari sini.
//    Tidak ada perubahan pada ICCEvent / fetch logic yang sudah ada.
// ================================================================

export type EventType   = "Competition" | "Education" | "Workshop" | "Exhibition";
export type EventStatus = "upcoming" | "past" | "ongoing";

export interface ICCEvent {
  id:                   string;
  slug:                 string;
  type:                 EventType;
  status:               EventStatus;
  title:                string;
  subtitle:             string;
  location:             string;
  country:              string;
  dateRange:            string;
  year?:                number;
  registrationDeadline: string;
  coverGradient:        string;
  accentColor:          string;
  description:          string;
  tags:                 string[];
  platform:             string;
  posterUrl:            string;
  guidebookUrl:         string;
  registrationUrl:      string;
  spreadsheetId:        string;
  date_display?:        string;
  is_active?:           boolean;
  sort_order?:          number;
  coverImage?:          string;
}

// ── Alias — dipakai oleh halaman NESF (UpcomingEvents, Index, dll) ─
// NESFEvent === ICCEvent secara struktur. Alias ini hanya untuk
// penamaan yang lebih sesuai konteks NESF tanpa duplikasi tipe.
export type NESFEvent = ICCEvent;

const GAS_API_URL = import.meta.env.VITE_GAS_PUBLIC_API_URL as string | undefined;

// ── Mapper: row GAS → ICCEvent ────────────────────────────────────
function mapGasRowToEvent(row: Record<string, string>): ICCEvent {
  const startDate = row["start_date"] ?? "";
  const endDate   = row["end_date"]   ?? "";

  let status: EventStatus = "upcoming";
  if (endDate) {
    const end = new Date(endDate);
    if (!isNaN(end.getTime()) && end < new Date()) status = "past";
  }
  if (row["status"] === "ongoing" || row["status"] === "past" || row["status"] === "upcoming") {
    status = row["status"] as EventStatus;
  }

  let dateRange = "TBA";
  if (startDate && endDate) {
    try {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
      dateRange = `${fmt.format(s)} – ${fmt.format(e)}, ${e.getFullYear()}`;
    } catch { dateRange = `${startDate} – ${endDate}`; }
  }

  const tags = row["tags"]
    ? row["tags"].split(",").map(t => t.trim()).filter(Boolean)
    : ["Science", "Culture", "National"];

  return {
    id:                   row["event_id"]              ?? "",
    slug:                 row["slug"]                  || row["event_id"]?.toLowerCase() || "",
    type:                 (row["event_type"]           as EventType) ?? "Competition",
    status,
    title:                row["event_name"]            ?? "",
    subtitle:             row["subtitle"]              || row["event_id"] || "",
    location:             row["location"]              || "Depok, Indonesia",
    country:              row["country"]               || "Indonesia",
    dateRange,
    year:                 startDate ? new Date(startDate).getFullYear() : new Date().getFullYear(),
    registrationDeadline: row["registration_deadline"] || "TBA",
    coverGradient:        row["cover_gradient"]        || "from-cyan-900 via-blue-900 to-indigo-900",
    accentColor:          row["accent_color"]          || "hsl(195 100% 50%)",
    description:          row["description"]           || "",
    tags,
    platform:             (row["platform"]             || "nesf").toLowerCase(),
    posterUrl:            row["poster_url"]            || "",
    guidebookUrl:         row["guidebook_url"]         || "",
    registrationUrl:      row["registration_url"]      || "",
    spreadsheetId:        row["spreadsheet_id"]        || "",
    date_display:         row["date_display"]          || "",
    is_active:            row["is_active"] !== "FALSE" && row["is_active"] !== "false",
    sort_order:           row["sort_order"] ? Number(row["sort_order"]) : undefined,
  };
}

// ── fetchEvents ───────────────────────────────────────────────────
export async function fetchEvents(
  platform?: string,
  fallback: ICCEvent[] = []
): Promise<ICCEvent[]> {
  if (!GAS_API_URL) {
    console.warn("[gasClient-nesf] VITE_GAS_PUBLIC_API_URL tidak di-set. Menggunakan data lokal.");
    return fallback;
  }

  try {
    const params = new URLSearchParams({ action: "getEvents", published_only: "true" });
    if (platform) params.set("platform", platform);

    const res = await fetch(`${GAS_API_URL}?${params}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

    if (json.status === "error") throw new Error(json.message ?? "GAS error");

    const rows: Record<string, string>[] = Array.isArray(json.data)
      ? json.data
      : Array.isArray(json.events)
        ? json.events
        : [];

    const mapped = rows.map(mapGasRowToEvent);
    return mapped.length > 0 ? mapped : fallback;

  } catch (err) {
    console.error("[gasClient-nesf] Gagal fetch events:", err);
    return fallback;
  }
}

// ── fetchEventBySlug ──────────────────────────────────────────────
export async function fetchEventBySlug(
  slug: string,
  fallback: ICCEvent | null = null
): Promise<ICCEvent | null> {
  if (!GAS_API_URL) return fallback;

  try {
    const all = await fetchEvents(undefined, []);
    const found = all.find(e => e.slug === slug || e.id.toLowerCase() === slug.toLowerCase());
    return found ?? fallback;

  } catch (err) {
    console.error(`[gasClient-nesf] Gagal fetch event "${slug}":`, err);
    return fallback;
  }
}
// ================================================================
// ── BARU: khusus event yang dashboardAcronym-nya diisi ───────────
// TIDAK mengubah fetchEvents/fetchEventBySlug di atas — dua-duanya
// tetap 100% melayani DSCF & Borneo-NESF seperti sekarang.
// ================================================================

const BE_ICGI_API_URL = import.meta.env.VITE_BE_ICGI_API_URL as string | undefined;

function computeSeriStatus(mulai: string, selesai: string): EventStatus {
  const now = new Date();
  const s = mulai ? new Date(mulai) : null;
  const e = selesai ? new Date(selesai) : s;
  if (s && now < s) return "upcoming";
  if (e && now > e) return "past";
  return "ongoing";
}

function mapSeriToEvent(r: Record<string, any>): ICCEvent {
  return {
    id: r.id,
    slug: r.slug,
    type: "Competition",
    status: computeSeriStatus(r.mulai, r.selesai),
    title: r.nama,
    subtitle: r.akronim,
    location: "",
    country: "Indonesia",
    dateRange: r.mulai && r.selesai
      ? `${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(r.mulai))} – ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(r.selesai))}`
      : "TBA",
    year: r.tahun ? Number(r.tahun) : new Date().getFullYear(),
    registrationDeadline: r.pendaftaran_tutup || "TBA",
    coverGradient: "from-cyan-900 via-blue-900 to-indigo-900",
    accentColor: "hsl(38 92% 50%)",
    description: "",
    tags: ["Science", "National"],
    platform: "nesf",
    posterUrl: "",
    guidebookUrl: "",
    registrationUrl: `/register/${r.slug}`,
    spreadsheetId: "",
    coverImage: r.banner || undefined,
  };
}

/**
 * @param acronyms  Akronim event dashboard yang jadi milik portal ini
 *                  (dari EVENTS_REGISTRY yang dashboardAcronym-nya diisi).
 */
export async function fetchDashboardEvents(acronyms: string[]): Promise<ICCEvent[]> {
  if (!BE_ICGI_API_URL || acronyms.length === 0) return [];
  try {
    const res = await fetch(`${BE_ICGI_API_URL}/api/public/v1/_seri`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    if (json.status === "error") return [];
    const seri: any[] = json?.data?.seri ?? [];
    return seri
      .filter(s => acronyms.includes(String(s.akronim).toUpperCase()))
      .map(mapSeriToEvent);
  } catch (err) {
    console.error("[gasClient-nesf] Gagal fetch dashboard events:", err);
    return [];
  }
}