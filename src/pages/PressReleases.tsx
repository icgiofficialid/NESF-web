// ================================================================
// PressReleases.tsx
// Path: src/pages/PressReleases.tsx
// Route: /press-releases/:year   (dari dropdown navbar → Berita)
// Data : eventRegistry → pressReleaseUrl (per event)
//
// Menampilkan card semua event pada tahun tsb. Klik card membuka
// file Pesan Siaran di Google Drive.
// ================================================================
import { motion } from "framer-motion";
import { CalendarDays, ExternalLink, FileText, Hourglass, MapPin, Megaphone } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { getEventsByYear, getEventYears, type EventMeta } from "@/config/eventRegistry";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<EventMeta["status"], string> = {
  past: "Selesai",
  ongoing: "Berlangsung",
  upcoming: "Akan datang",
};

const PressCard = ({ meta, index }: { meta: EventMeta; index: number }) => {
  const href = meta.pressReleaseUrl?.trim();
  const enabled = Boolean(href);
  const gradient = meta.heroGradient ?? "from-slate-800 to-slate-900";
  const cover = meta.coverImageLandscape ?? meta.coverImage;

  const inner = (
    <>
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradient}`}>
        {cover && (
          <img
            src={cover}
            alt=""
            loading="lazy"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-transform duration-500",
              enabled && "group-hover:scale-105"
            )}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          <Megaphone className="h-3.5 w-3.5" /> {STATUS_LABEL[meta.status]}
        </span>
        <p className="absolute bottom-3 left-4 text-lg font-bold text-white drop-shadow">{meta.subtitle}</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-bold leading-snug text-foreground">{meta.title}</h3>
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {meta.location}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" /> {meta.dateRange}
          </p>
        </div>

        <div
          className={cn(
            "mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-sm font-semibold",
            enabled ? "text-primary" : "text-muted-foreground"
          )}
        >
          {enabled ? (
            <>
              <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4" /> Buka pesan siaran</span>
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </>
          ) : (
            <>
              Segera hadir <Hourglass className="h-4 w-4" />
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <SectionReveal delay={index * 0.07} className="h-full">
      {enabled ? (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka pesan siaran ${meta.title}`}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.22 }}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-panel shadow-sm outline-none transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary"
        >
          {inner}
        </motion.a>
      ) : (
        <div aria-disabled="true" className="flex h-full cursor-not-allowed flex-col overflow-hidden rounded-2xl border border-dashed border-border/70 bg-panel/60 opacity-75">
          {inner}
        </div>
      )}
    </SectionReveal>
  );
};

const PressReleases = () => {
  const { year: yearParam } = useParams<{ year: string }>();
  const years = getEventYears();
  const year = Number(yearParam);

  // Tahun tidak dikenal → ke tahun terbaru (atau ke /news kalau belum ada event)
  if (!years.includes(year)) {
    return <Navigate to={years.length ? `/press-releases/${years[0]}` : "/news"} replace />;
  }

  const events = getEventsByYear(year);

  return (
    <NesfShell>
      <div className="relative min-h-screen overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />

        <section className="container relative pt-16 pb-10 md:pt-24">
          <SectionReveal className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Megaphone className="h-4 w-4" /> Liputan media
            </span>
            <h1 className="text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">Pesan Siaran {year}</h1>
            <p className="max-w-2xl leading-7 text-muted-foreground">
              Pesan siaran resmi dari setiap event NESF tahun {year}
            </p>
          </SectionReveal>

          {years.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2" aria-label="Pilih tahun">
              {years.map((y) => (
                <Link
                  key={y}
                  to={`/press-releases/${y}`}
                  aria-current={y === year ? "page" : undefined}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                    y === year
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/70 bg-panel text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {y}
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="container relative pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((meta, i) => (
              <PressCard key={meta.slug} meta={meta} index={i} />
            ))}
          </div>
        </section>
      </div>
    </NesfShell>
  );
};

export default PressReleases;