// ================================================================
// UpcomingEvents.tsx — Filter ongoing+upcoming, ongoing prioritas pertama
// ================================================================

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SiteShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useEvents } from "@/hooks/useEvents";
import type { NESFEvent, EventType } from "@/lib/gasClient";
import { useLang } from "@/components/LanguageProvider";
import { getVisibleEvents } from "@/config/eventRegistry";

const LABELS = {
  title:      { en: "Upcoming",          id: "Event" },
  titleSub:   { en: "Events",            id: "Mendatang" },
  search:     { en: "Find event...",     id: "Cari event..." },
  noEvents:   { en: "No events found.",  id: "Tidak ada event ditemukan." },
  deadline:   { en: "Registration Deadline:", id: "Batas Pendaftaran:" },
  all:        { en: "All",               id: "Semua" },
  competition:{ en: "Competition",       id: "Kompetisi" },
  education:  { en: "Education",         id: "Edukasi" },
  loading:    { en: "Loading events...", id: "Memuat events..." },
  ongoing:    { en: "Ongoing Now",       id: "Sedang Berlangsung" },
};

// NESFEvent + coverImage yang di-inject dari registry
type EnrichedEvent = NESFEvent & { coverImage?: string };

const EventCard = ({ event, index }: { event: EnrichedEvent; index: number }) => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const isOngoing = (event.status as string) === "ongoing";

  return (
    <SectionReveal delay={index * 0.07} className="h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.22 }}
        onClick={() => navigate(`/events/${event.slug}`)}
        className="group relative h-full cursor-pointer rounded-2xl overflow-hidden border border-border/70 bg-panel shadow-sm hover:shadow-xl transition-shadow duration-300"
      >
        {/* Ongoing — highlighted border */}
        {isOngoing && (
          <div className="absolute inset-0 rounded-2xl border-2 border-green-400/50 pointer-events-none z-10" />
        )}

        <div className={`relative h-52 bg-gradient-to-br ${(event as EnrichedEvent & { heroGradient?: string }).heroGradient ?? event.coverGradient ?? "from-primary/80 to-primary"} flex items-end p-0`}>

          {/* Foto cover dari registry */}
          {event.coverImage && (
            <img
              src={event.coverImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}

          {/* Ongoing strip banner */}
          {isOngoing && (
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center gap-2 bg-green-400/90 backdrop-blur-sm py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span className="text-[10px] font-bold text-black uppercase tracking-widest">
                {LABELS.ongoing[lang]}
              </span>
            </div>
          )}

          <div className={`absolute left-3 flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white ${isOngoing ? "top-10" : "top-3"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOngoing ? "bg-green-400" : "bg-amber-400"}`} />
            {event.type}
          </div>
          <div className="absolute top-3 right-3 text-white/50 text-[10px] tracking-widest font-bold">IESF</div>
          <div className="w-full bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
            <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-1">{event.subtitle}</p>
            <h3 className="text-white text-sm font-bold leading-tight line-clamp-2">{event.title}</h3>
          </div>

        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>📍</span><span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>📅</span><span>{event.dateRange}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>⏰</span>
            <span>{LABELS.deadline[lang]} {event.registrationDeadline}</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {event.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </SectionReveal>
  );
};

const UpcomingEvents = () => {
  const [filter, setFilter] = useState<"All" | EventType>("All");
  const [search, setSearch] = useState("");
  const { lang } = useLang();

  const { events: rawEvents, loading } = useEvents("nesf");

  // Map slug → data registry (untuk inject coverImage)
  const registryMap = new Map(
    getVisibleEvents().map(e => [e.slug, e])
  );

  // Slug yang boleh tampil (tidak shutdown, hanya ongoing+upcoming)
  const localVisibleEvents = getVisibleEvents().filter(
    e => e.status === "ongoing" || e.status === "upcoming"
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
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
};

export default UpcomingEvents;