// ================================================================
// gasClient.ts — icc-event-web
// ================================================================

export type EventType   = "Competition" | "Workshop" | "Exhibition";
export type EventStatus = "upcoming" | "past";

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
}

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
    : ["Culture", "International"];

  return {
    id:                   row["event_id"]              ?? "",
    slug:                 row["slug"]                  || row["event_id"]?.toLowerCase() || "",
    type:                 (row["event_type"]           as EventType) ?? "Competition",
    status,
    title:                row["event_name"]            ?? "",
    subtitle:             row["subtitle"]              || row["event_id"] || "",
    location:             row["location"]              || "Yogyakarta, Indonesia",
    country:              row["country"]               || "Indonesia",
    dateRange,
    year:                 startDate ? new Date(startDate).getFullYear() : new Date().getFullYear(),
    registrationDeadline: row["registration_deadline"] || "TBA",
    coverGradient:        row["cover_gradient"]        || "from-rose-900 via-fuchsia-900 to-amber-900",
    accentColor:          row["accent_color"]          || "#f43f5e",
    description:          row["description"]           || "",
    tags,
    platform:             (row["platform"]             || "icc").toLowerCase(),
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
    console.warn("[gasClient-icc] VITE_GAS_PUBLIC_API_URL tidak di-set. Menggunakan data lokal.");
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
    console.error("[gasClient-icc] Gagal fetch events:", err);
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
    console.error(`[gasClient-icc] Gagal fetch event "${slug}":`, err);
    return fallback;
  }
}