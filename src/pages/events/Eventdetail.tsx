// ================================================================
// EventDetail.tsx — Dynamic event detail page (replaces YICCDetail)
// Path: src/pages/EventDetail.tsx  (project: icc-event-web)
// ================================================================
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar, MapPin, Clock, ChevronRight, FileText, ExternalLink,
  CalendarClock,
} from "lucide-react";
import IccShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { useEvent } from "@/hooks/useEvents";
import {
  competitionCategories, divisions, iccJudgingCriteria,
  awards, itinerary, domesticSongs,
} from "@/components/nesf/NesfData";


// ── Helpers ───────────────────────────────────────────────────────

function GradientText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        backgroundImage: "linear-gradient(135deg, #f59e0b, #f43f5e)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────

export default function EventDetail() {
  const { slug }           = useParams<{ slug: string }>();
  const { event, loading } = useEvent(slug ?? "");
  const navigate           = useNavigate();
  const { lang }           = useLang();

  const LABELS = {
    registerBtn:    { en: "Register Now",                id: "Daftar Sekarang" },
    guideBtn:       { en: "Download Guidebook",          id: "Unduh Buku Panduan" },
    back:           { en: "← Back to Events",            id: "← Kembali ke Events" },
    divisions:      { en: "Participant Divisions",       id: "Divisi Peserta" },
    divisionsSub:   { en: "Open to all school levels and communities", id: "Terbuka untuk semua jenjang" },
    categories:     { en: "Competition Categories",      id: "Kategori Kompetisi" },
    judging:        { en: "Judging Criteria",            id: "Kriteria Penilaian" },
    judgingDance:   { en: "Dance (Solo & Group)",        id: "Tari (Solo & Grup)" },
    judgingCostume: { en: "Costume Show",                id: "Pertunjukan Kostum" },
    judgingVocal:   { en: "Traditional Song Solo",       id: "Lagu Tradisional Solo" },
    awards:         { en: "Awards & Recognition",        id: "Penghargaan & Pengakuan" },
    awardsSub:      { en: "Recognition based on passing grade system", id: "Berbasis sistem nilai kelulusan" },
    schedule:       { en: "Event Schedule",              id: "Jadwal Acara" },
    scheduleSub:    { en: "5 days of culture and celebration", id: "5 hari budaya dan perayaan" },
    songs:          { en: "Official Song List",          id: "Daftar Lagu Resmi" },
    songsSub:       { en: "For Traditional Song Solo — domestic participants", id: "Untuk Lagu Tradisional Solo — peserta domestik" },
    documents:      { en: "Required Documents",          id: "Dokumen yang Diperlukan" },
    deadline:       { en: "Registration Deadline",       id: "Batas Pendaftaran" },
    loading:        { en: "Loading event…",              id: "Memuat event…" },
    notFound:       { en: "Event not found",             id: "Event tidak ditemukan" },
    comingSoon:     { en: "Coming Soon",                 id: "Segera Hadir" },
  };

  // ── Loading state ────────────────────────────────────────────────
  if (loading) {
    return (
      <IccShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">{LABELS.loading[lang]}</p>
        </div>
      </IccShell>
    );
  }

  // ── Not found state ──────────────────────────────────────────────
  if (!event) {
    return (
      <IccShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-6xl">🎭</p>
          <h1 className="text-2xl font-bold">{LABELS.notFound[lang]}</h1>
          <p className="text-muted-foreground text-sm max-w-xs">
            {lang === "en"
              ? "This event doesn't exist or has been removed."
              : "Event ini tidak ada atau telah dihapus."}
          </p>
          <button
            onClick={() => navigate("/events")}
            className="mt-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            {LABELS.back[lang]}
          </button>
        </div>
      </IccShell>
    );
  }

  // ── Derived values ───────────────────────────────────────────────
  const coverGradient = event.coverGradient || "from-rose-950 via-fuchsia-950 to-amber-950";
  const accentColor   = event.accentColor   || "hsl(38 95% 55%)";
  const accentColor2  = "#f43f5e";
  const isIcc         = event.platform?.toLowerCase() === "icc";
  const tags          = event.tags ?? [];

  const titleWords  = event.title.split(" ");
  const firstWord   = titleWords[0];
  const middleWords = titleWords.length > 2
    ? titleWords.slice(1, -1).join(" ")
    : titleWords.slice(1).join(" ");
  const lastWord    = titleWords.length > 2 ? titleWords[titleWords.length - 1] : null;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  const docsByCategory = {
    dance: {
      en: ["Title of dance", "Cultural origin / region / country", "Short performance description", "Music file (MP3/WAV)", "Property declaration (if applicable)"],
      id: ["Judul tari", "Asal budaya / daerah / negara", "Deskripsi singkat penampilan", "File musik (MP3/WAV)", "Deklarasi properti (jika ada)"],
    },
    costume: {
      en: ["Costume title / theme", "Cultural inspiration", "Short costume description", "Music file (MP3/WAV)"],
      id: ["Judul/tema kostum", "Inspirasi budaya", "Deskripsi singkat kostum", "File musik (MP3/WAV)"],
    },
    vocal: {
      en: ["Song title", "Cultural origin / region / country", "Short song description or meaning", "Instrumental backing track", "Lyrics (if required)"],
      id: ["Judul lagu", "Asal budaya / daerah / negara", "Deskripsi singkat atau makna lagu", "Iringan instrumental", "Lirik (jika diperlukan)"],
    },
  };

  return (
    <IccShell>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${coverGradient}`} />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at 25% 30%, ${accentColor}40 0%, transparent 55%),
                         radial-gradient(ellipse at 75% 70%, ${accentColor2}4D 0%, transparent 55%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating ornaments */}
        {["🌺", "🎭", "🪗", "🏮", "🌸", "🎶"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-15 pointer-events-none select-none"
            style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 20}%` }}
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 7 + i, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        ))}

        <div className="container relative z-10">
          <button
            onClick={() => navigate("/events")}
            className="mb-6 text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1"
          >
            {LABELS.back[lang]}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4 max-w-3xl"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                {event.type}
              </span>
                <span className="rounded-full border border-amber-400/40 bg-amber-400/20 px-3 py-1 text-[10px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                  <CalendarClock className="h-3 w-3" />
                  {LABELS.comingSoon[lang]}
                </span>
              {event.year && (
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                  {event.year}
                </span>
              )}
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-medium text-white/80 uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
              {firstWord}<br />
              <GradientText style={{ backgroundImage: `linear-gradient(135deg, ${accentColor}, ${accentColor2})` }}>
                {middleWords}
              </GradientText>
              {lastWord && <><br />{lastWord}</>}
            </h1>

            {/* Description */}
            {event.description && (
              <p className="text-white/70 text-base leading-7 max-w-xl">
                {event.description}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-white/60">
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {event.location}
                </div>
              )}

              {/* Tanggal — coming soon pakai date_display atau teks fallback */}
              {(event as any).date_display && (
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" />
                  {(event as any).date_display[lang]}
                </div>
              )}
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {event.dateRange}
                  </div>
                {event.registrationDeadline && (
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {LABELS.deadline[lang]}: {
                    // Jika bukan ISO date, tampilkan apa adanya (misal "Coming Soon")
                    isNaN(new Date(event.registrationDeadline).getTime())
                        ? event.registrationDeadline
                        : formatDate(event.registrationDeadline)
                    }
                </div>
                )}
                </>
              
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              {/* Sembunyikan Register jika coming soon dan belum ada registration_url */}
              {(event.registrationUrl) && (
                <button
                  onClick={() =>
                    event.registrationUrl
                      ? window.open(event.registrationUrl, "_blank")
                      : navigate("/register")
                  }
                  className="flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm hover:brightness-110 transition-all"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`, color: "#fff" }}
                >
                  {LABELS.registerBtn[lang]}
                </button>
              )}

              {event.guidebookUrl ? (
                <a
                  href={event.guidebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-all"
                >
                  <FileText className="h-4 w-4" /> {LABELS.guideBtn[lang]}
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              ) : (
                <a
                  href="/guide"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-all"
                >
                  <FileText className="h-4 w-4" /> {LABELS.guideBtn[lang]}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PARTICIPANT DIVISIONS ──────────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor }}>
            Who Can Join
          </p>
          <h2 className="text-3xl font-bold font-display">{LABELS.divisions[lang]}</h2>
          <p className="text-muted-foreground text-sm">{LABELS.divisionsSub[lang]}</p>
        </SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((div, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <div className="cultural-shell rounded-2xl p-5 text-center space-y-2">
                <div className="text-3xl">{["🏫", "🏃", "👨‍🎓", "🌍"][i]}</div>
                <h3 className="font-bold text-foreground text-sm">{div.level[lang]}</h3>
                <p className="text-xs text-muted-foreground">{div.age[lang]}</p>
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold"
                  style={{ background: `${accentColor}1F`, color: accentColor }}
                >
                  {div.note[lang]}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── COMPETITION CATEGORIES ────────────────────────────────── */}
      {isIcc && (
        <section className="bg-surface/60 border-y border-border/40 py-20">
          <div className="container">
            <SectionReveal className="mb-10 text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor2 }}>
                Performances
              </p>
              <h2 className="text-3xl font-bold font-display">{LABELS.categories[lang]}</h2>
            </SectionReveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {competitionCategories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <SectionReveal key={cat.letter} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.22 }}
                      className="cultural-shell rounded-2xl p-6 flex flex-col h-full"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Cat. {cat.letter}
                      </span>
                      <h3 className="font-bold text-foreground text-sm leading-snug mt-1 mb-2">
                        {cat.title[lang]}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-6 flex-1">
                        {cat.description[lang]}
                      </p>
                      <div className="mt-4 pt-4 border-t border-border/40 space-y-1 text-[11px] text-muted-foreground">
                        <p>👥 {cat.participants[lang]}</p>
                        <p>⏱ {cat.duration[lang]}</p>
                      </div>
                    </motion.div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── JUDGING CRITERIA ──────────────────────────────────────── */}
      {isIcc && (
        <section className="container py-20">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(270 70% 65%)" }}>
              Assessment
            </p>
            <h2 className="text-3xl font-bold font-display">{LABELS.judging[lang]}</h2>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { key: "dance",   label: LABELS.judgingDance,   criteria: iccJudgingCriteria.dance,   icon: "💃", color: accentColor2 },
              { key: "costume", label: LABELS.judgingCostume, criteria: iccJudgingCriteria.costume, icon: "👘", color: "hsl(270 70% 60%)" },
              { key: "vocal",   label: LABELS.judgingVocal,   criteria: iccJudgingCriteria.vocal,   icon: "🎤", color: "hsl(175 70% 45%)" },
            ].map(({ key, label, criteria, icon, color }) => (
              <SectionReveal key={key}>
                <div className="cultural-shell rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{icon}</span>
                    <h3 className="font-bold text-foreground text-sm">{label[lang]}</h3>
                  </div>
                  <div className="space-y-3">
                    {criteria.map((c, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground flex-1">{c.aspect[lang]}</span>
                        <span className="text-xs font-bold shrink-0" style={{ color }}>{c.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── AWARDS ────────────────────────────────────────────────── */}
      <section className="bg-surface/60 border-y border-border/40 py-20">
        <div className="container">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor }}>
              Recognition
            </p>
            <h2 className="text-3xl font-bold font-display">{LABELS.awards[lang]}</h2>
            <p className="text-muted-foreground text-sm">{LABELS.awardsSub[lang]}</p>
          </SectionReveal>
          <div className="flex flex-wrap justify-center gap-4">
            {awards.map((award, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                  className="cultural-shell rounded-2xl px-6 py-5 flex flex-col items-center gap-2 min-w-[130px]"
                >
                  <span className="text-3xl">{award.icon}</span>
                  <span className="text-sm font-bold text-foreground text-center">{award.label[lang]}</span>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT SCHEDULE ────────────────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor2 }}>
            Itinerary
          </p>
          <h2 className="text-3xl font-bold font-display">{LABELS.schedule[lang]}</h2>
          <p className="text-muted-foreground text-sm">{LABELS.scheduleSub[lang]}</p>
        </SectionReveal>
        <div className="space-y-4 max-w-3xl mx-auto">
          {itinerary.map((day, i) => (
            <SectionReveal key={day.day} delay={i * 0.07}>
              <div className="cultural-shell rounded-2xl p-5 flex gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: i % 2 === 0 ? `${accentColor}26` : `${accentColor2}26`,
                    }}
                  >
                    {day.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Day {day.day}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">{day.title[lang]}</h3>
                  <ul className="space-y-1">
                    {day.highlights[lang].map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ChevronRight
                          className="h-3 w-3 shrink-0"
                          style={{ color: i % 2 === 0 ? accentColor : accentColor2 }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── OFFICIAL SONG LIST — ICC only ────────────────────────── */}
      {isIcc && (
        <section className="bg-surface/60 border-y border-border/40 py-20">
          <div className="container">
            <SectionReveal className="mb-10 text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(175 70% 45%)" }}>🎵</p>
              <h2 className="text-3xl font-bold font-display">{LABELS.songs[lang]}</h2>
              <p className="text-muted-foreground text-sm">{LABELS.songsSub[lang]}</p>
            </SectionReveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {domesticSongs.map((song, i) => (
                <SectionReveal key={i} delay={i * 0.05}>
                  <div className="cultural-shell rounded-xl p-4 flex items-center gap-3">
                    <span className="text-lg">🎵</span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{song.title}</p>
                      <p className="text-[11px] text-muted-foreground">{song.region[lang]}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REQUIRED DOCUMENTS — ICC only ────────────────────────── */}
      {isIcc && (
        <section className="container py-20">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor }}>
              Submission
            </p>
            <h2 className="text-3xl font-bold font-display">{LABELS.documents[lang]}</h2>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: "🕺", title: { en: "Dance Categories", id: "Kategori Tari" },     docs: docsByCategory.dance },
              { icon: "👘", title: { en: "Costume Show",     id: "Pertunjukan Kostum" }, docs: docsByCategory.costume },
              { icon: "🎤", title: { en: "Traditional Song", id: "Lagu Tradisional" },   docs: docsByCategory.vocal },
            ].map(({ icon, title, docs }, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="cultural-shell rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{icon}</span>
                    <h3 className="font-bold text-foreground">{title[lang]}</h3>
                  </div>
                  <ul className="space-y-2">
                    {docs[lang].map((doc, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-0.5 shrink-0" style={{ color: accentColor }}>•</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="mt-14 text-center">
            <button
              onClick={() =>
                event.registrationUrl
                  ? window.open(event.registrationUrl, "_blank")
                  : navigate("/register")
              }
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold hover:brightness-110 hover:scale-[1.02] transition-all"
              style={{ background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))" }}
            >
              {LABELS.registerBtn[lang]}
            </button>
          </SectionReveal>
        </section>
      )}

    </IccShell>
  );
}