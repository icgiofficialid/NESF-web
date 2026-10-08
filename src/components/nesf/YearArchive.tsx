// ================================================================
// YearArchive.tsx
// Path: src/components/nesf/YearArchive.tsx
//
// Kerangka halaman arsip lintas event (navbar utama):
//   judul → tombol tahun (2026, 2027, …) → konten tahun terpilih.
// Tahun terpilih disimpan di URL (?year=2026).
// ================================================================
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarX2, MapPin, type LucideIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { cn } from "@/lib/utils";
import type { EventMeta } from "@/config/eventRegistry";

interface ArchiveShellProps {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Daftar tahun (terbaru dulu) */
  years: number[];
  /** Jumlah item per tahun — ditampilkan kecil di tombol tahun (opsional) */
  counts?: Record<number, number>;
  /** Satuan untuk counts, mis. "event" / "berita" */
  countUnit?: string;
  children: (year: number) => ReactNode;
}

export const ArchiveShell = ({ title, description, icon: Icon, years, counts, countUnit, children }: ArchiveShellProps) => {
  const [params, setParams] = useSearchParams();
  const fromUrl = Number(params.get("year"));
  const year = years.includes(fromUrl) ? fromUrl : years[0];

  return (
    <NesfShell>
      <div className="relative min-h-screen overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />

        <section className="container relative pt-16 pb-8 md:pt-24">
          <SectionReveal className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Icon className="h-4 w-4" /> NESF
            </span>
            <h1 className="text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">{title}</h1>
            <p className="max-w-2xl leading-7 text-muted-foreground">{description}</p>
          </SectionReveal>
        </section>

        {years.length === 0 ? (
          <section className="container relative pb-24">
            <div className="space-y-3 py-20 text-center">
              <CalendarX2 className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="text-lg font-semibold text-foreground">Belum ada data</p>
              <p className="text-sm text-muted-foreground">Data akan muncul setelah event terdaftar.</p>
            </div>
          </section>
        ) : (
          <>
            {/* Tombol tahun */}
            <div className="container relative pb-10">
              <div role="tablist" aria-label="Pilih tahun" className="flex flex-wrap gap-3">
                {years.map((y) => {
                  const active = y === year;
                  return (
                    <button
                      key={y}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setParams({ year: String(y) })}
                      className={cn(
                        "flex min-w-[6.5rem] flex-col items-center rounded-2xl border px-6 py-3 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary",
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-lg"
                          : "border-border/70 bg-panel text-foreground hover:-translate-y-0.5 hover:border-primary/50"
                      )}
                    >
                      <span className="text-2xl font-bold leading-none">{y}</span>
                      {counts && countUnit && (
                        <span className={cn("mt-1 text-xs", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                          {counts[y] ?? 0} {countUnit}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <section className="container relative pb-24">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                >
                  {children(year)}
                </motion.div>
              </AnimatePresence>
            </section>
          </>
        )}
      </div>
    </NesfShell>
  );
};

/** Judul satu event di dalam halaman arsip + tautan ke halaman event-nya */
export const EventGroupHeader = ({ meta, section }: { meta: EventMeta; section?: "winners" | "certificates" | "curation" | "news" }) => (
  <div className="mb-5 flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="space-y-1">
      <p className="text-sm font-semibold text-primary">{meta.subtitle}</p>
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">{meta.title}</h2>
      <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" /> {meta.location} · {meta.dateRange}
      </p>
    </div>
    {meta.status === "past" && section && (
      <Link
        to={`/past-events/${meta.slug}/${section}`}
        className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"
      >
        Buka halaman event
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    )}
  </div>
);

export const ArchiveEmpty = ({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) => (
  <div className="space-y-3 py-16 text-center">
    <Icon className="mx-auto h-10 w-10 text-muted-foreground/50" />
    <p className="text-lg font-semibold text-foreground">{title}</p>
    <p className="mx-auto max-w-md text-sm text-muted-foreground">{description}</p>
  </div>
);
