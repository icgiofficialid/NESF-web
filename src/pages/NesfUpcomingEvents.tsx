// ================================================================
// NesfUpcomingEvents.tsx
// ================================================================
import { useState } from "react";
import { Search, MapPin, Calendar, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { useEvents } from "@/hooks/useEvents";

const CYAN = "hsl(195 100% 50%)";
const CYAN_DIM = "hsl(195 100% 50% / 0.1)";

const NesfUpcomingEvents = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { lang } = useLang();
  const { events, loading } = useEvents("nesf");

  const LABELS = {
    title:    { en: "Upcoming",           id: "Event" },
    titleSub: { en: "Events",             id: "Mendatang" },
    search:   { en: "Find event...",      id: "Cari event..." },
    noEvents: { en: "No events found.",   id: "Tidak ada event ditemukan." },
    loading:  { en: "Loading events...", id: "Memuat events..." },
  };

  const filtered = events
    .filter(e => e.status === "upcoming")
    .filter(e =>
      search === "" ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
    );

  // Fallback static event if no live data
  const displayEvents = filtered.length > 0 ? filtered : [];

  return (
    <NesfShell>
      <section className="container pt-16 pb-8 md:pt-20">
        <SectionReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center font-display">
            <span>{LABELS.title[lang]}</span>{" "}
            <span className="font-light text-muted-foreground">{LABELS.titleSub[lang]}</span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder={LABELS.search[lang]}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-5 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition"
              style={{ "--tw-ring-color": "hsl(195 100% 50% / 0.3)" } as React.CSSProperties}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white"
              style={{ background: "linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))" }}>
              <Search className="h-4 w-4" />
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="container pb-20">
        {loading ? (
          <SectionReveal className="py-20 text-center text-muted-foreground">
            <div className="space-y-3">
              <div className="mx-auto w-8 h-8 border-2 border-t-cyan-400 rounded-full animate-spin"
                style={{ borderColor: "hsl(195 100% 50% / 0.3)", borderTopColor: CYAN }} />
              <p className="text-sm">{LABELS.loading[lang]}</p>
            </div>
          </SectionReveal>
        ) : displayEvents.length === 0 ? (
          <SectionReveal className="py-24 text-center">
            <div
              className="max-w-md mx-auto rounded-[2rem] border p-12 space-y-5"
              style={{ borderColor: "hsl(195 100% 50% / 0.2)", background: CYAN_DIM }}
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))", color: "#fff" }}
              >
                <FlaskConical className="w-8 h-8" />
              </div>
              <p className="text-xl font-bold font-display text-foreground">
                {lang === "en" ? "Coming Soon" : "Segera Hadir"}
              </p>
              <p className="text-sm text-muted-foreground leading-6">
                {lang === "en"
                  ? "NESF events are being prepared. Stay tuned for official announcements!"
                  : "Event NESF sedang dipersiapkan. Pantau terus pengumuman resmi!"}
              </p>
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full"
                style={{ background: CYAN_DIM, color: CYAN }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: CYAN }} />
                {lang === "en" ? "Registration TBA" : "Pendaftaran TBA"}
              </div>
            </div>
          </SectionReveal>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayEvents.map((event, i) => (
              <SectionReveal key={event.id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => navigate(`/events/${event.slug}`)}
                  className="cursor-pointer group rounded-2xl overflow-hidden border border-border/70 bg-panel hover:shadow-xl transition-all duration-300"
                  style={{ ["--hover-border" as string]: "hsl(195 100% 50% / 0.3)" }}
                >
                  <div className={`relative h-52 bg-gradient-to-br ${event.coverGradient} flex items-end p-0`}>
                    <div className="absolute inset-0"
                      style={{ backgroundImage: "radial-gradient(ellipse at 70% 20%, hsl(195 100% 50% / 0.2) 0%, transparent 55%)" }} />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: CYAN }} />
                      {event.type}
                    </div>
                    <div className="absolute top-3 right-3 text-white/40 text-[10px] tracking-widest font-bold">NESF</div>
                    <div className="w-full bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
                      <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-1">{event.subtitle}</p>
                      <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 font-display">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /><span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /><span>{event.dateRange}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {event.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: CYAN_DIM, color: CYAN }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        )}
      </section>
    </NesfShell>
  );
};

export default NesfUpcomingEvents;