// ================================================================
// UpcomingEvents.tsx — Filter ongoing+upcoming, ongoing prioritas pertama
// ================================================================

import { useState } from "react";
import { Search } from "lucide-react";
import SiteShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useEvents } from "@/hooks/useEvents";
import type { NESFEvent, EventType } from "@/lib/gasClient";
import { useLang } from "@/components/LanguageProvider";
import { getVisibleEvents } from "@/config/eventRegistry";
import EventCard from "@/components/nesf/EventCard";

const LABELS = {
  title:      { en: "Upcoming",          id: "Event" },
  titleSub:   { en: "Events",            id: "Mendatang" },
  search:     { en: "Find event...",     id: "Cari event..." },
  noEvents:   { en: "No events found.",  id: "Tidak ada event ditemukan." },
  all:        { en: "All",               id: "Semua" },
  competition:{ en: "Competition",       id: "Kompetisi" },
  education:  { en: "Education",         id: "Edukasi" },
  loading:    { en: "Loading events...", id: "Memuat events..." },
};

// NESFEvent + coverImage yang di-inject dari registry
type EnrichedEvent = NESFEvent & { coverImage?: string };

const UpcomingEvents = () => {
  const [filter, setFilter] = useState<"All" | EventType>("All");
  const [search, setSearch] = useState("");
  const { lang } = useLang();

  const { events: rawEvents, loading } = useEvents("nesf");

  // Map slug → data registry (untuk inject coverImage)
  const registryMap = new Map(
    getVisibleEvents().map(e => [e.slug, e])
  );

  const FILTERS: { label: string; value: "All" | EventType }[] = [
    { label: LABELS.all[lang],         value: "All" },
    { label: LABELS.competition[lang], value: "Competition" },
    { label: LABELS.education[lang],   value: "Education" as EventType },
  ];

  const filtered: EnrichedEvent[] = rawEvents
    // Hanya ongoing + upcoming, skip past dan shutdown
    .filter(e => ((e.status as string) === "ongoing" || (e.status as string) === "upcoming"))
    // Sort: ongoing dulu
    .sort((a, b) => ((a.status as string) === "ongoing" ? -1 : (b.status as string) === "ongoing" ? 1 : 0))
    // Inject coverImage dari registry
    .map(e => ({ ...e, coverImage: registryMap.get(e.slug)?.coverImageLandscape ?? registryMap.get(e.slug)?.coverImage }))
    // Filter type dan search
    .filter(e => {
      const matchType   = filter === "All" || e.type === filter;
      const matchSearch = search === "" ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });

  return (
    <SiteShell>
      <section className="container pt-16 pb-8 md:pt-20">
        <SectionReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center">
            <span className="font-bold">{LABELS.title[lang]}</span>{" "}
            <span className="font-light text-muted-foreground">{LABELS.titleSub[lang]}</span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder={LABELS.search[lang]}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-5 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-1.5 text-primary-foreground">
              <Search className="h-4 w-4" />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-6 flex justify-center">
          <div className="flex gap-2 rounded-2xl bg-muted/50 border border-border/50 p-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-xl px-6 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === f.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="container pb-20">
        {loading ? (
          <SectionReveal className="py-20 text-center text-muted-foreground">
            <div className="space-y-3">
              <div className="mx-auto w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-sm">{LABELS.loading[lang]}</p>
            </div>
          </SectionReveal>
        ) : filtered.length === 0 ? (
          <SectionReveal className="py-20 text-center text-muted-foreground">
            {LABELS.noEvents[lang]}
          </SectionReveal>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} showTags showDeadline />
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
};

export default UpcomingEvents;