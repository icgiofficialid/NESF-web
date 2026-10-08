// ================================================================
// PastEventWinners.tsx
// Path: src/pages/PastEventWinners.tsx
// Route: /past-events/:slug/winners   (opsional: ?mode=online|offline)
//
// Alur: pilih Online / Offline → daftar kartu jenjang → klik kartu
// membuka file Drive. Semua data dari eventRegistry (`winners`).
// ================================================================
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, MapPin, School, Trophy, Users, Wifi, type LucideIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PastEventPage, { PastEventEmpty } from "@/components/nesf/PastEventPage";
import DriveLinkCard from "@/components/nesf/DriveLinkCard";
import type { EventMeta, WinnerLevel } from "@/config/eventRegistry";
import { cn } from "@/lib/utils";

type Mode = "online" | "offline";

const MODES: { key: Mode; label: string; hint: string; icon: LucideIcon }[] = [
  { key: "online",  label: "Online",  hint: "Peserta yang berlomba secara daring",    icon: Wifi },
  { key: "offline", label: "Offline", hint: "Peserta yang berlomba langsung di lokasi", icon: MapPin },
];

export const levelIcon = (level: string): LucideIcon => {
  const l = level.toLowerCase();
  if (/dasar|\bsd\b|elementary|primary/.test(l)) return BookOpen;
  if (/tinggi|univ|college|mahasiswa/.test(l)) return GraduationCap;
  if (/menengah|smp|sma|smk|secondary|high/.test(l)) return School;
  return Users;
};

const WinnersContent = ({ meta }: { meta: EventMeta }) => {
  const [params, setParams] = useSearchParams();
  const raw = params.get("mode");
  const mode: Mode | null = raw === "online" || raw === "offline" ? raw : null;

  const lists: Record<Mode, WinnerLevel[]> = {
    online: meta.winners?.online ?? [],
    offline: meta.winners?.offline ?? [],
  };

  if (lists.online.length === 0 && lists.offline.length === 0) {
    return (
      <PastEventEmpty
        icon={Trophy}
        title="Daftar pemenang belum tersedia"
        description="Daftar pemenang akan muncul di sini setelah hasil akhir dipublikasikan."
      />
    );
  }

  const choose = (m: Mode) => setParams({ mode: m });
  const reset = () => setParams({});

  return (
    <AnimatePresence mode="wait" initial={false}>
      {mode === null ? (
        /* ── Langkah 1: pilih Online / Offline ─────────────────── */
        <motion.div
          key="choose"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <p className="text-center text-lg font-semibold text-foreground md:text-xl">
            Lihat pemenang dari kompetisi mana?
          </p>
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {MODES.map(({ key, label, hint, icon: Icon }) => {
              const count = lists[key].length;
              const empty = count === 0;
              return (
                <motion.button
                  key={key}
                  type="button"
                  disabled={empty}
                  onClick={() => choose(key)}
                  whileHover={empty ? undefined : { y: -6 }}
                  whileTap={empty ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  className={cn(
                    "group relative flex flex-col items-start gap-8 overflow-hidden rounded-3xl border border-border/70 bg-panel p-7 text-left shadow-sm outline-none transition-[border-color,box-shadow] duration-300 md:p-9",
                    empty
                      ? "cursor-not-allowed border-dashed opacity-60"
                      : "hover:border-primary/60 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary"
                  )}
                >
                  {/* lingkaran dekoratif besar di belakang ikon */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-125"
                  />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span className="relative space-y-1.5">
                    <span className="block text-3xl font-bold text-foreground md:text-4xl">{label}</span>
                    <span className="block text-sm text-muted-foreground">{hint}</span>
                  </span>
                  <span className="relative flex w-full items-center justify-between border-t border-border/60 pt-4 text-sm font-semibold text-primary">
                    {empty ? <span className="text-muted-foreground">Belum tersedia</span> : `${count} jenjang`}
                    {!empty && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      ) : (
        /* ── Langkah 2: kartu jenjang ──────────────────────────── */
        <motion.div
          key={`levels-${mode}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Mode kompetisi" className="inline-flex w-fit rounded-2xl border border-border/70 bg-panel/70 p-1.5 backdrop-blur">
              {MODES.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={mode === key}
                  disabled={lists[key].length === 0}
                  onClick={() => choose(key)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                    mode === key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={reset}
              className="w-fit text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Kembali ke pilihan mode
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Pemenang kompetisi {mode === "online" ? "Online" : "Offline"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Pilih jenjang untuk membuka daftar pemenangnya di Google Drive.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lists[mode].map((item, i) => (
              <DriveLinkCard
                key={`${mode}-${item.level}`}
                index={i}
                icon={levelIcon(item.level)}
                title={item.level}
                subtitle={item.age}
                description={item.description}
                href={item.driveUrl}
                ctaLabel="Lihat daftar pemenang"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PastEventWinners = () => (
  <PastEventPage
    section="winners"
    title="Daftar Pemenang"
    description="Pilih kompetisi online atau offline, lalu pilih jenjang untuk melihat daftar pemenangnya."
  >
    {(meta) => <WinnersContent meta={meta} />}
  </PastEventPage>
);

export default PastEventWinners;
