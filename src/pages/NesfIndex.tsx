// ================================================================
// NesfIndex.tsx — Home page, industrial-futuristic STEM aesthetic
// ================================================================
import { motion } from "framer-motion";
import { ArrowRight, Cpu, FlaskConical, Zap, Users, Award, ChevronRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import {
  competitionCategories,
  highlights,
  divisions,
  itinerary,
  judgingCriteria,
} from "@/components/nesf/NesfData";

const AtomMark = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="10">
    <circle cx="100" cy="100" r="18" fill="currentColor" stroke="none" />
    <ellipse cx="100" cy="100" rx="80" ry="30" />
    <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)" />
    <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)" />
  </svg>
);

const CYAN = "hsl(195 100% 50%)";
const CYAN_DIM = "hsl(195 100% 50% / 0.12)";
const BLUE = "hsl(220 90% 60%)";

const NesfIndex = () => {
  const { lang } = useLang();

  return (
    <NesfShell>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-center">
        {/* Grid lines background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(hsl(195 100% 50% / 0.04) 1px, transparent 1px),
              linear-gradient(90deg, hsl(195 100% 50% / 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, hsl(195 100% 50% / 0.08) 0%, transparent 70%)",
            animation: "glowShift 14s ease-in-out infinite",
          }}
        />
        {/* Corner marks */}
        {[
          "top-8 left-8 border-t-2 border-l-2",
          "top-8 right-8 border-t-2 border-r-2",
          "bottom-8 left-8 border-b-2 border-l-2",
          "bottom-8 right-8 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-8 h-8 ${cls} opacity-20`}
            style={{ borderColor: CYAN }}
          />
        ))}

        <div className="container relative py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em]"
              style={{
                borderColor: `hsl(195 100% 50% / 0.35)`,
                background: `hsl(195 100% 50% / 0.08)`,
                color: CYAN,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: CYAN }} />
              {lang === "en" ? "National Stage · Indonesia" : "Panggung Nasional · Indonesia"}
            </motion.div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground">
                National
              </h1>
              <h1
                className="font-display text-5xl md:text-7xl leading-[1.05]"
                style={{
                  background: `linear-gradient(135deg, ${CYAN} 0%, ${BLUE} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Engineering
              </h1>
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground font-light">
                Science Fair
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-xl leading-8">
              {lang === "en"
                ? "Indonesia's national platform for academic innovation — where engineering, science, and research converge to shape the future."
                : "Platform nasional Indonesia untuk inovasi akademik — di mana teknik, sains, dan penelitian bertemu untuk membentuk masa depan."}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <NavLink
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-bold text-sm tracking-wide text-white transition-all hover:scale-[1.04] hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))`,
                  boxShadow: `0 4px 24px hsl(195 100% 50% / 0.35)`,
                }}
              >
                <AtomMark size={15} />
                {lang === "en" ? "Register Now" : "Daftar Sekarang"}
                <ArrowRight className="w-4 h-4" />
              </NavLink>
              <NavLink
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg border px-7 py-3.5 font-semibold text-sm tracking-wide transition-all hover:bg-surface"
                style={{ borderColor: "hsl(195 100% 50% / 0.3)", color: CYAN }}
              >
                {lang === "en" ? "Learn More" : "Pelajari Lebih"}
                <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-16 border border-border/40 rounded-xl overflow-hidden"
            style={{ background: "hsl(var(--border) / 0.4)" }}
          >
            {highlights.map((h, i) => (
              <div key={i} className="bg-background px-6 py-5 flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-bold font-display" style={{ color: CYAN }}>
                  {h.value}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-[0.18em]">
                  {h.label[lang]}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="border-y border-border/40 py-10" style={{ background: "hsl(195 100% 50% / 0.03)" }}>
        <div className="container flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <p className="text-xs uppercase tracking-[0.32em] font-semibold" style={{ color: CYAN }}>
              {lang === "en" ? "About NESF" : "Tentang NESF"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "Innovation meets the national stage" : "Inovasi bertemu panggung nasional"}
            </h2>
            <p className="text-muted-foreground text-sm leading-7 max-w-2xl">
              {lang === "en"
                ? "NESF (National Engineering Science Fair) is ICGI's national-level academic competition platform, designed to spotlight engineering ingenuity, scientific exploration, and applied research from Indonesia's brightest young minds. NESF is the national counterpart to YIESF."
                : "NESF (National Engineering Science Fair) adalah platform kompetisi akademik nasional ICGI, dirancang untuk menyoroti kecerdasan teknik, eksplorasi ilmiah, dan penelitian terapan dari generasi muda terbaik Indonesia. NESF adalah pasangan nasional dari YIESF."}
            </p>
          </div>
          <div className="flex gap-4">
            {[
              { label: { en: "YIESF\nInternational", id: "YIESF\nInternasional" }, color: BLUE, href: "https://iesf.icgi.or.id" },
              { label: { en: "NESF\nNational", id: "NESF\nNasional" }, color: CYAN, href: "/" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="rounded-xl border p-4 text-center text-xs font-bold font-display whitespace-pre-line transition-all hover:scale-105"
                style={{
                  borderColor: `${item.color}40`,
                  background: `${item.color}0a`,
                  color: item.color,
                  minWidth: "100px",
                }}
              >
                {item.label[lang]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPETITION CATEGORIES ── */}
      <section className="container py-20">
        <SectionReveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: CYAN }}>
            {lang === "en" ? "Categories" : "Kategori"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            {lang === "en" ? "5 Competition Fields" : "5 Bidang Kompetisi"}
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
            {lang === "en"
              ? "Covering the full spectrum of science, technology, and innovation."
              : "Mencakup spektrum penuh sains, teknologi, dan inovasi."}
          </p>
        </SectionReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {competitionCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <SectionReveal key={cat.letter} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="group rounded-2xl border border-border/70 bg-panel p-5 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                  style={{ ["--hover-border" as string]: "hsl(195 100% 50% / 0.4)" }}
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.22em] mb-1"
                    style={{ color: CYAN }}
                  >
                    Category {cat.letter}
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-2 font-display">
                    {cat.title[lang]}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-5 line-clamp-3">
                    {cat.description[lang]}
                  </p>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      {/* ── DIVISIONS ── */}
      <section className="border-y border-border/40 py-16" style={{ background: "hsl(195 100% 50% / 0.02)" }}>
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: CYAN }}>
              {lang === "en" ? "Participant Divisions" : "Divisi Peserta"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "Open for All Ages" : "Terbuka untuk Semua Usia"}
            </h2>
          </SectionReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {divisions.map((div, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div
                  className="rounded-2xl border p-5 space-y-2 transition-all hover:border-cyan-500/30"
                  style={{ borderColor: "hsl(195 100% 50% / 0.15)", background: CYAN_DIM }}
                >
                  <div className="text-2xl font-bold font-display" style={{ color: CYAN }}>
                    {["SD", "SMP", "SMA", "Open"][i]}
                  </div>
                  <div className="text-sm font-semibold text-foreground">{div.level[lang]}</div>
                  <div className="text-xs text-muted-foreground">{div.age[lang]}</div>
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full w-fit"
                    style={{ background: "hsl(195 100% 50% / 0.1)", color: CYAN }}
                  >
                    {div.note[lang]}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITINERARY ── */}
      <section className="container py-20">
        <SectionReveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: CYAN }}>
            {lang === "en" ? "Schedule" : "Jadwal"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {lang === "en" ? "5-Day Program" : "Program 5 Hari"}
          </h2>
        </SectionReveal>
        <div className="max-w-3xl mx-auto space-y-3">
          {itinerary.map((day, i) => (
            <SectionReveal key={day.day} delay={i * 0.07}>
              <div className="rounded-2xl border border-border/60 bg-panel overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 font-bold font-display"
                    style={{ background: CYAN_DIM, color: CYAN }}
                  >
                    {day.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-0.5" style={{ color: CYAN }}>
                      Day {day.day}
                    </div>
                    <div className="text-sm font-bold text-foreground font-display">{day.title[lang]}</div>
                  </div>
                </div>
                <div className="px-5 pb-4 flex flex-wrap gap-2">
                  {day.highlights[lang].map((h, j) => (
                    <span
                      key={j}
                      className="text-[11px] rounded-full px-3 py-0.5 font-medium"
                      style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── JUDGING CRITERIA ── */}
      <section className="border-y border-border/40 py-16" style={{ background: "hsl(220 90% 60% / 0.02)" }}>
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: CYAN }}>
              {lang === "en" ? "Evaluation" : "Penilaian"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "Judging Criteria" : "Kriteria Penilaian"}
            </h2>
          </SectionReveal>
          <div className="max-w-2xl mx-auto space-y-3">
            {judgingCriteria.map((c, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-panel px-5 py-3">
                  <div className="flex-1 text-sm font-medium text-foreground">{c.aspect[lang]}</div>
                  <div
                    className="text-sm font-bold font-display shrink-0 px-3 py-1 rounded-full"
                    style={{ background: CYAN_DIM, color: CYAN }}
                  >
                    {c.weight}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container py-24">
        <SectionReveal>
          <div
            className="rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden"
            style={{
              border: "1px solid hsl(195 100% 50% / 0.25)",
              background: "linear-gradient(135deg, hsl(195 100% 50% / 0.06) 0%, hsl(220 90% 60% / 0.06) 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(195 100% 50% / 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(195 100% 50% / 0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative space-y-6">
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))`,
                  boxShadow: `0 8px 32px hsl(195 100% 50% / 0.4)`,
                  color: "#fff",
                }}
              >
                <AtomMark size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                {lang === "en" ? "Ready to Innovate?" : "Siap Berinovasi?"}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm leading-7">
                {lang === "en"
                  ? "Join thousands of Indonesia's young innovators. Register your team and present your project on the national stage."
                  : "Bergabunglah dengan ribuan inovator muda Indonesia. Daftarkan tim Anda dan presentasikan proyek Anda di panggung nasional."}
              </p>
              <NavLink
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-bold text-sm tracking-wide text-white transition-all hover:scale-[1.04]"
                style={{
                  background: `linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))`,
                  boxShadow: `0 4px 24px hsl(195 100% 50% / 0.4)`,
                }}
              >
                {lang === "en" ? "Register Your Team" : "Daftarkan Tim Anda"}
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </SectionReveal>
      </section>
    </NesfShell>
  );
};

export default NesfIndex;