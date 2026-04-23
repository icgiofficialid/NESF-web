// ================================================================
// useEvents.ts
// Path: src/hooks/useEvents.ts  (project: icc-event-web)
//
// Custom hook untuk fetch & cache ICC events dari GAS Public API.
// Gunakan hook ini di IccUpcomingEvents.tsx, PastEvents.tsx, dll.
// ================================================================

import { useState, useEffect } from "react";
import { fetchEvents, fetchEventBySlug, type ICCEvent } from "../lib/gasClient";
import { localNesfEvents } from "../components/nesf/NesfEventsData";

// ── useEvents ─────────────────────────────────────────────────────
/**
 * Hook untuk mengambil semua ICC events.
 * @param platform  Optional: "icc"
 *
 * @example
 * const { events, loading, error } = useEvents("icc");
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
        const data = await fetchEvents(platform, localNesfEvents);
        if (!cancelled) {
          setEvents(data.length > 0 ? data : localNesfEvents);
        }
      } catch (_e: unknown) {
        if (!cancelled) {
          setError("Gagal memuat data events.");
          setEvents(localNesfEvents);
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
 * Hook untuk mengambil satu ICC event berdasarkan slug.
 * @param slug  Slug event, misal: "yicc"
 *
 * @example
 * const { event, loading } = useEvent("yicc");
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
        const localFallback = localNesfEvents.find(e => e.slug === slug) ?? null;
        const data = await fetchEventBySlug(slug, localFallback);
        if (!cancelled) setEvent(data);
      } catch (_e: unknown) {
        if (!cancelled) {
          setError("Gagal memuat detail event.");
          const localFallback = localNesfEvents.find(e => e.slug === slug) ?? null;
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