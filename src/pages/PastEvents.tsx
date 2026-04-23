// ================================================================
// PastEvents.tsx — Updated: pakai useEvents hook (tidak hardcode)
// ================================================================
import { useState } from "react";
import { Search } from "lucide-react";
import IccShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { useEvents } from "@/hooks/useEvents";

const PastEvents = () => {
  const [search, setSearch] = useState("");
  const { lang } = useLang();

  // ← Sebelumnya: import { iccEvents } dari iccEventsData (hardcode)
  // ← Sekarang:   fetch dari GAS Public API via useEvents hook
  const { events, loading } = useEvents("icc");

  const LABELS = {
    title:    { en: "Past",                id: "Event" },
    titleSub: { en: "Events",              id: "Lalu" },
    search:   { en: "Find event...",       id: "Cari event..." },
    noEvents: { en: "No past events yet.", id: "Belum ada event yang selesai." },
    noEventsDesc: {
      en: "Past events will appear here after they conclude.",
      id: "Event yang telah selesai akan muncul di sini.",
    },
    loading:  { en: "Loading events...",  id: "Memuat events..." },
  };

  const pastEvents = events.filter(
    e =>
      e.status === "past" &&
      (search === "" ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <IccShell>
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
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-5 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-1.5 text-primary-foreground">
              <Search className="h-4 w-4" />
            </div>
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
        ) : pastEvents.length === 0 ? (
          <SectionReveal className="py-24 text-center">
            <div className="space-y-3">
              <p className="text-5xl">📂</p>
              <p className="text-xl font-semibold text-foreground">{LABELS.noEvents[lang]}</p>
              <p className="text-muted-foreground text-sm">{LABELS.noEventsDesc[lang]}</p>
            </div>
          </SectionReveal>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pastEvents.map((event, i) => (
              <SectionReveal key={event.id} delay={i * 0.07}>
                <div className="rounded-2xl border border-border/70 bg-panel overflow-hidden opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className={`h-44 bg-gradient-to-br ${event.coverGradient} flex items-end p-4`}>
                    <div>
                      <p className="text-white/60 text-[10px] uppercase tracking-widest">{event.subtitle}</p>
                      <h3 className="text-white text-sm font-bold mt-1">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5 text-xs text-muted-foreground">
                    <p>📍 {event.location}</p>
                    <p>📅 {event.dateRange}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        )}
      </section>
    </IccShell>
  );
};

export default PastEvents;