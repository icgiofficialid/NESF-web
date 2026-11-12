// ================================================================
// useEvents.ts
// Path: src/hooks/useEvents.ts  (project: NESF-web)
//
// Custom hook untuk fetch & cache NESF events dari GAS Public API.
// Gunakan hook ini di NesfUpcomingEvents.tsx, NesfIndex.tsx,
// PastEvents.tsx, dll.
//
// ⚠️ UPDATE: fallback sekarang menggabungkan:
//   1. localNesfEvents   (data lama, tetap dipertahankan)
//   2. EVENTS_REGISTRY   (single source of truth, termasuk DSCF)
// Sehingga event baru yang didaftarkan di eventRegistry.ts
// (misal "dscf-2026") otomatis muncul di UpcomingEvents & Index
// tanpa perlu menyentuh GAS atau NesfEventsData.ts.
// ================================================================

import { useState, useEffect } from "react";
import { fetchEvents, fetchEventBySlug, type ICCEvent } from "../lib/gasClient";
import { localNesfEvents } from "../components/nesf/NesfEventsData";
import { EVENTS_REGISTRY, type EventMeta } from "../config/eventRegistry";

// ── Build ICCEvent (NESFEvent) dari EventMeta di eventRegistry ────
// Memastikan setiap event yang didaftarkan di EVENTS_REGISTRY
// (mis. dscf-2026) otomatis tampil sebagai card tanpa perlu GAS.
const GRADIENT_POOL = [
  "from-cyan-900 via-blue-900 to-indigo-900",
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-emerald-500 via-green-600 to-teal-700",
  "from-amber-500 via-orange-600 to-red-700",
  "from-rose-600 via-pink-600 to-fuchsia-700",
];

function registryToNesfEvent(meta: EventMeta, index: number): ICCEvent {
  const tahun = meta.year ?? (Number(meta.dateRange.match(/\b(20\d{2})\b/g)?.pop() ?? "") || new Date().getFullYear());
  return {
    id:                   meta.slug,
    slug:                 meta.slug,
    type:                 "Competition",
    status:               meta.status,
    title:                meta.title,
    subtitle:             meta.subtitle,
    location:             meta.location,
    country:              meta.location.split(",").pop()?.trim() ?? "Indonesia",
    dateRange:            meta.dateRange,
    year:                 tahun,
    registrationDeadline: meta.registrationDeadline,
    coverGradient:        meta.heroGradient ?? GRADIENT_POOL[index % GRADIENT_POOL.length],
    accentColor:          "hsl(195 100% 50%)",
    description:          meta.title,
    tags:                 ["Science", "Culture", "National"],
    platform:             "nesf",
    posterUrl:            "",
    guidebookUrl:         "",
    registrationUrl:      meta.route,
    spreadsheetId:        "",
    coverImage:           meta.coverImageLandscape ?? meta.coverImage,
  };
}

// Fallback dari registry — selalu sinkron dengan EVENTS_REGISTRY (termasuk DSCF)
const registryFallback: ICCEvent[] = getVisibleRegistryEvents().map(registryToNesfEvent);

function getVisibleRegistryEvents(): EventMeta[] {
  return EVENTS_REGISTRY.filter(e => !e.shutdown);
}

// Gabungkan data lama (localNesfEvents) dengan registry, hindari slug duplikat
// (registry diprioritaskan jika ada slug yang sama)
function buildCombinedFallback(): ICCEvent[] {
  const registrySlugs = new Set(registryFallback.map(e => e.slug));
  const legacyOnly = localNesfEvents.filter(e => !registrySlugs.has(e.slug));
  return [...registryFallback, ...legacyOnly];
}

const combinedFallback: ICCEvent[] = buildCombinedFallback();

// ── useEvents ─────────────────────────────────────────────────────
/**
 * Hook untuk mengambil semua NESF events.
 * @param platform  Optional: "nesf"
 *
 * @example
 * const { events, loading, error } = useEvents("nesf");
 */
export function useEvents(platform?: string) {
  const [events,  setEvents]  = useState<ICCEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Event dari dashboard ICGI sudah digabungkan ke EVENTS_REGISTRY oleh
        // lib/dashboardIcgi.ts sebelum aplikasi dimuat, jadi sudah ada di
        // combinedFallback. Kalau GAS aktif, event registry yang belum ada di
        // GAS tetap ikut supaya event dashboard tidak hilang.
        const gasData = await fetchEvents(platform, combinedFallback);
        const slugGas = new Set(gasData.map(e => e.slug));
        const merged = gasData === combinedFallback
          ? gasData
          : [...registryFallback.filter(e => !slugGas.has(e.slug)), ...gasData];
        if (!cancelled) {
          setEvents(merged.length > 0 ? merged : combinedFallback);
        }
      } catch (_e: unknown) {
        if (!cancelled) {
          setError("Gagal memuat data events.");
          setEvents(combinedFallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [platform]);

  return { events, loading, error };
}

// ── useEvent ──────────────────────────────────────────────────────
/**
 * Hook untuk mengambil satu NESF event berdasarkan slug.
 * @param slug  Slug event, misal: "dscf-2026"
 *
 * @example
 * const { event, loading } = useEvent("dscf-2026");
 */
export function useEvent(slug: string) {
  const [event,   setEvent]   = useState<ICCEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const localFallback = combinedFallback.find(e => e.slug === slug) ?? null;
        const data = await fetchEventBySlug(slug, localFallback);
        if (!cancelled) setEvent(data);
      } catch (_e: unknown) {
        if (!cancelled) {
          setError("Gagal memuat detail event.");
          const localFallback = combinedFallback.find(e => e.slug === slug) ?? null;
          setEvent(localFallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { event, loading, error };
}