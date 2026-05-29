// ================================================================
// NesfIndex.tsx — Home page, industrial-futuristic STEM aesthetic
// Redesigned: premium animations, responsive, dramatic layout
// ================================================================
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Atom, Microscope, Code2, FlaskConical, Cpu, Zap, Globe, Star } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { useRef, useEffect, useState } from "react";
import {
  competitionCategories,
  highlights,
  divisions,
  itinerary,
  judgingCriteria,
} from "@/components/nesf/NesfData";

// ── Atom SVG Mark ──
const AtomMark = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="10">
    <circle cx="100" cy="100" r="18" fill="currentColor" stroke="none" />
    <ellipse cx="100" cy="100" rx="80" ry="30" />
    <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)" />
    <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)" />
  </svg>
);

// ── Animated counter ──
const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const dur = 1800;
      const step = Math.ceil(target / (dur / 16));
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        setCount(cur);
        if (cur >= target) clearInterval(t);
      }, 16);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ── Particle field ──
const ParticleField = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    dur: 6 + Math.random() * 10,
    delay: Math.random() * 6,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "hsl(195 100% 60%)",
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
            y: [0, -40 - Math.random() * 60],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// ── Scan line effect ──
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px pointer-events-none z-10"
    style={{ background: "linear-gradient(90deg, transparent, hsl(195 100% 60% / 0.4), transparent)" }}
    animate={{ top: ["0%", "100%"] }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  />
);

// ── Category icon map (string fallback for data-driven icons) ──
const categoryIcons: Record<string, React.ElementType> = {
  Cpu, FlaskConical, Code2, Microscope, Zap,
};

type IconValue = React.ElementType | string | undefined;
const resolveIcon = (icon: IconValue): React.ElementType => {
  if (!icon) return Cpu;
  if (typeof icon === "string") return categoryIcons[icon] ?? Cpu;
  return icon;
};

// ── Theme colors ──
const C = {
  cyan: "hsl(195 100% 50%)",
  cyanDim: "hsl(195 100% 50% / 0.12)",
  cyanGlow: "hsl(195 100% 50% / 0.35)",
  blue: "hsl(220 90% 60%)",
  blueDim: "hsl(220 90% 60% / 0.12)",
};

// ── Stat card ──
const StatCard = ({
  value, label, suffix = "", delay = 0,
}: {
  value: number; label: string; suffix?: string; delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="relative rounded-2xl border p-6 overflow-hidden group"
    style={{
      borderColor: "hsl(195 100% 50% / 0.2)",
      background: "hsl(195 100% 50% / 0.03)",
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: "radial-gradient(ellipse at center, hsl(195 100% 50% / 0.07), transparent 70%)" }}
    />
    <div
      className="text-4xl font-black font-display tracking-tight mb-1"
      style={{ color: C.cyan }}
    >
      <CountUp target={value} suffix={suffix} />
    </div>
    <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-semibold">{label}</div>
  </motion.div>
);

// ── Category card ──
const CategoryCard = ({
  cat, i, lang,
}: {
  cat: (typeof competitionCategories)[number]; i: number; lang: string;
}) => {
  const Icon = resolveIcon(cat.icon as IconValue);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.55 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative rounded-2xl border border-border/60 bg-panel p-6 cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col gap-4"
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, hsl(195 100% 50% / 0.08), transparent 60%)" }}
      />
      {/* top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)` }}
      />
      {/* letter badge */}
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span
          className="text-[10px] font-black uppercase tracking-[0.25em] opacity-40 group-hover:opacity-100 transition-opacity"
          style={{ color: C.cyan }}
        >
          {cat.letter}
        </span>
      </div>
      <div>
        <h3 className="text-sm font-bold text-foreground leading-snug mb-1.5 font-display">
          {cat.title[lang as "en" | "id"]}
        </h3>
        <p className="text-xs text-muted-foreground leading-5 line-clamp-3">
          {cat.description[lang as "en" | "id"]}
        </p>
      </div>
    </motion.div>
  );
};

// ================================================================
// Main component
// ================================================================
const NesfIndex = () => {
  const { lang } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <NesfShell>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden h-[100svh] max-h-[100svh] flex flex-col justify-center"
      >
        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(hsl(195 100% 50% / 0.05) 1px, transparent 1px),
                linear-gradient(90deg, hsl(195 100% 50% / 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
            }}
          />
          {/* Radial vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(195 100% 50% / 0.07) 0%, transparent 70%)",
            }}
          />
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }} />
        </div>

        {/* Particles */}
        <ParticleField />
        {/* Scan line */}
        <ScanLine />

        {/* Corner brackets */}
        {[
          "top-6 left-6 border-t-2 border-l-2",
          "top-6 right-6 border-t-2 border-r-2",
          "bottom-6 left-6 border-b-2 border-l-2",
          "bottom-6 right-6 border-b-2 border-r-2",
        ].map((cls, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            className={`absolute w-10 h-10 ${cls}`}
            style={{ borderColor: C.cyan }}
          />
        ))}

        {/* Diagonal accent strip */}
        <div
          className="absolute top-0 right-0 w-px h-full opacity-10 hidden md:block"
          style={{
            background: `linear-gradient(to bottom, transparent, ${C.cyan}, transparent)`,
            transform: "translateX(-120px)",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container relative z-10 py-0"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
              style={{
                borderColor: "hsl(195 100% 50% / 0.3)",
                background: "hsl(195 100% 50% / 0.06)",
                color: C.cyan,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: C.cyan, boxShadow: `0 0 6px ${C.cyan}`, animation: "pulse 2s infinite" }}
              />
              {lang === "en" ? "National Stage · Indonesia" : "Panggung Nasional · Indonesia"}
              <span className="opacity-40">2025</span>
            </motion.div>

            {/* Main headline */}
            <div className="space-y-0 mb-5 text-center">
              {["National", "Engineering", "Science Fair"].map((word, i) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1
                    className="font-display leading-[1.05] tracking-tight"
                    style={{
                      fontSize: "clamp(2rem, 6.5vw, 5rem)",
                      fontWeight: i === 2 ? 300 : 800,
                      ...(i === 1
                        ? {
                            background: `linear-gradient(120deg, ${C.cyan} 0%, ${C.blue} 60%, hsl(270 80% 70%) 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }
                        : { color: "hsl(var(--foreground))" }),
                    }}
                  >
                    {word}
                  </h1>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-24 mb-5 mx-auto"
              style={{ background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)` }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-7 mb-7 text-center"
            >
              {lang === "en"
                ? "Indonesia's premier national platform for academic innovation — where engineering, science, and research converge to shape the future."
                : "Platform nasional unggulan Indonesia untuk inovasi akademik — di mana teknik, sains, dan penelitian bertemu untuk membentuk masa depan."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <NavLink
                to="/events"
                className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 font-bold text-sm tracking-wide text-white transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: `linear-gradient(135deg, hsl(195 100% 38%), hsl(220 90% 48%))`,
                  boxShadow: `0 0 0 0 ${C.cyanGlow}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 32px ${C.cyanGlow}`)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 4px 20px ${C.cyanGlow}`)}
              >
                <AtomMark size={16} />
                {lang === "en" ? "Register Now" : "Daftar Sekarang"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </NavLink>

              <NavLink
                to="/about"
                className="group inline-flex items-center gap-2 rounded-xl border px-8 py-4 font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-surface"
                style={{
                  borderColor: "hsl(195 100% 50% / 0.28)",
                  color: C.cyan,
                  background: "transparent",
                }}
              >
                {lang === "en" ? "Explore NESF" : "Jelajahi NESF"}
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </motion.div>
          </div>

          {/* Floating accent number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 right-4 md:right-12 hidden sm:flex flex-col items-end gap-1"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Est.</span>
            <span
              className="font-display text-7xl font-black opacity-[0.06] leading-none"
              style={{ color: C.cyan, fontSize: "clamp(4rem, 10vw, 8rem)" }}
            >
              NESF
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, ${C.cyan}, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════ */}
      <section
        className="relative border-y border-border/40 py-4 overflow-hidden"
        style={{ background: "hsl(195 100% 50% / 0.025)" }}
      >
        {/* Marquee line */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {Array.from({ length: 2 }).map((_, di) =>
              ["NATIONAL STAGE", "ENGINEERING", "SCIENCE FAIR", "INNOVATION", "INDONESIA", "RESEARCH", "TECHNOLOGY"].map((w, i) => (
                <span
                  key={`${di}-${i}`}
                  className="inline-flex items-center gap-4 px-6 text-[11px] font-black uppercase tracking-[0.3em] opacity-20"
                  style={{ color: C.cyan }}
                >
                  {w}
                  <span className="w-1 h-1 rounded-full bg-current" />
                </span>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT + STATS
      ══════════════════════════════════════════ */}
      <section className="container py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <SectionReveal>
            <div className="space-y-6">
              <p
                className="text-[10px] uppercase tracking-[0.35em] font-bold"
                style={{ color: C.cyan }}
              >
                {lang === "en" ? "About NESF" : "Tentang NESF"}
              </p>
              <h2
                className="font-display font-bold leading-tight"
                style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}
              >
                {lang === "en"
                  ? "Innovation meets the national stage"
                  : "Inovasi bertemu panggung nasional"}
              </h2>
              <p className="text-muted-foreground text-sm leading-8 max-w-lg">
                {lang === "en"
                  ? "NESF (National Engineering Science Fair) is ICGI's flagship national-level academic competition. Designed to spotlight engineering ingenuity, scientific exploration, and applied research from Indonesia's brightest young minds — it is the national counterpart to IESF."
                  : "NESF (National Engineering Science Fair) adalah kompetisi akademik nasional unggulan ICGI. Dirancang untuk menyoroti kecerdasan teknik, eksplorasi ilmiah, dan penelitian terapan dari generasi muda terbaik Indonesia — sebagai pasangan nasional dari IESF."}
              </p>
              <div className="flex gap-3 pt-2">
                {[
                  { label: lang === "en" ? "IESF\nInternational" : "IESF\nInternasional", color: C.blue, href: "https://iesfofficial.or.id" },
                  { label: lang === "en" ? "NESF\nNational" : "NESF\nNasional", color: C.cyan, href: "/" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="rounded-xl border p-4 text-center text-xs font-bold font-display whitespace-pre-line transition-colors"
                    style={{
                      borderColor: `${item.color}40`,
                      background: `${item.color}0a`,
                      color: item.color,
                      minWidth: "100px",
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 2500, label: lang === "en" ? "Participants" : "Peserta", suffix: "+" },
              { value: 34,   label: lang === "en" ? "Provinces" : "Provinsi", suffix: "" },
              { value: 5,    label: lang === "en" ? "Categories" : "Kategori", suffix: "" },
              { value: 150,  label: lang === "en" ? "Schools" : "Sekolah", suffix: "+" },
            ].map((s, i) => (
              <StatCard key={i} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPETITION CATEGORIES
      ══════════════════════════════════════════ */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: "hsl(195 100% 50% / 0.02)" }}
      >
        {/* Background decoration */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(220 90% 60% / 0.05) 0%, transparent 70%)" }}
        />

        <div className="container">
          <SectionReveal className="mb-14 max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.35em] font-bold mb-3" style={{ color: C.cyan }}>
              {lang === "en" ? "Competition Fields" : "Bidang Kompetisi"}
            </p>
            <h2
              className="font-display font-bold leading-tight mb-3"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              {lang === "en" ? "5 Fields of Excellence" : "5 Bidang Keunggulan"}
            </h2>
            <p className="text-muted-foreground text-sm leading-7">
              {lang === "en"
                ? "Covering the full spectrum of science, technology, and innovation. Find your field and compete at the national level."
                : "Mencakup spektrum penuh sains, teknologi, dan inovasi. Temukan bidang Anda dan berkompetisi di tingkat nasional."}
            </p>
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {competitionCategories.map((cat, i) => (
              <CategoryCard key={cat.letter} cat={cat} i={i} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HIGHLIGHTS / TIMELINE
      ══════════════════════════════════════════ */}
      <section className="container py-24">
        <SectionReveal className="mb-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] font-bold mb-3" style={{ color: C.cyan }}>
            {lang === "en" ? "Why NESF" : "Kenapa NESF"}
          </p>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            {lang === "en" ? "Built for the brightest" : "Dibangun untuk yang terbaik"}
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Globe,
              title: lang === "en" ? "National Reach" : "Jangkauan Nasional",
              desc: lang === "en"
                ? "Compete alongside the best minds from across Indonesia's 34 provinces on one unified national stage."
                : "Bersaing bersama pikiran terbaik dari 34 provinsi Indonesia dalam satu panggung nasional.",
              accent: C.cyan,
            },
            {
              icon: Star,
              title: lang === "en" ? "Prestigious Recognition" : "Pengakuan Bergengsi",
              desc: lang === "en"
                ? "Awards, certificates, and pathways to international competitions for top-performing teams."
                : "Penghargaan, sertifikat, dan jalur ke kompetisi internasional untuk tim terbaik.",
              accent: C.blue,
            },
            {
              icon: Zap,
              title: lang === "en" ? "Real-World Impact" : "Dampak Nyata",
              desc: lang === "en"
                ? "Projects are evaluated for real-world applicability and scientific rigor by industry experts."
                : "Proyek dievaluasi untuk kemampuan penerapan nyata dan ketelitian ilmiah oleh para ahli industri.",
              accent: "hsl(270 80% 70%)",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group relative rounded-2xl border border-border/60 bg-panel p-8 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${item.accent}15`, color: item.accent, border: `1px solid ${item.accent}30` }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-7">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="container pb-28">
        <SectionReveal>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-[2rem] p-10 md:p-20 text-center overflow-hidden"
            style={{
              border: "1px solid hsl(195 100% 50% / 0.2)",
              background: "linear-gradient(135deg, hsl(195 100% 50% / 0.05) 0%, hsl(220 90% 60% / 0.05) 50%, hsl(270 80% 60% / 0.04) 100%)",
            }}
          >
            {/* Background grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(195 100% 50% / 0.04) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(195 100% 50% / 0.04) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Corner brackets */}
            {[
              "top-4 left-4 border-t border-l",
              "top-4 right-4 border-t border-r",
              "bottom-4 left-4 border-b border-l",
              "bottom-4 right-4 border-b border-r",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-6 h-6 ${cls} opacity-30`}
                style={{ borderColor: C.cyan }}
              />
            ))}
            {/* Glow orb behind icon */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, hsl(195 100% 50% / 0.07) 0%, transparent 65%)" }}
            />

            <div className="relative space-y-7">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, hsl(195 100% 38%), hsl(220 90% 48%))`,
                  boxShadow: `0 8px 40px hsl(195 100% 50% / 0.35)`,
                  color: "#fff",
                }}
              >
                <AtomMark size={32} />
              </motion.div>

              <div>
                <h2
                  className="font-display font-bold text-foreground mb-4"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                >
                  {lang === "en" ? "Ready to Innovate?" : "Siap Berinovasi?"}
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto text-sm leading-7">
                  {lang === "en"
                    ? "Join thousands of Indonesia's young innovators. Register your team and present your project on the national stage."
                    : "Bergabunglah dengan ribuan inovator muda Indonesia. Daftarkan tim Anda dan presentasikan proyek Anda di panggung nasional."}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <NavLink
                  to="/events"
                  className="group inline-flex items-center gap-2.5 rounded-xl px-9 py-4 font-bold text-sm tracking-wide text-white transition-all hover:scale-[1.04]"
                  style={{
                    background: `linear-gradient(135deg, hsl(195 100% 38%), hsl(220 90% 48%))`,
                    boxShadow: `0 4px 28px hsl(195 100% 50% / 0.4)`,
                  }}
                >
                  {lang === "en" ? "Register Your Team" : "Daftarkan Tim Anda"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </NavLink>
                <NavLink
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-xl border px-9 py-4 font-semibold text-sm tracking-wide transition-all hover:bg-surface"
                  style={{ borderColor: "hsl(195 100% 50% / 0.28)", color: C.cyan }}
                >
                  {lang === "en" ? "Learn More" : "Pelajari Lebih"}
                </NavLink>
              </div>
            </div>
          </motion.div>
        </SectionReveal>
      </section>

    </NesfShell>
  );
};

export default NesfIndex;