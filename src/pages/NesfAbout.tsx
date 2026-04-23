// ================================================================
// NesfAbout.tsx
// ================================================================
import { motion } from "framer-motion";
import { Globe, Target, Users, Lightbulb, FlaskConical } from "lucide-react";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { competitionCategories, goals, submissionRequirements } from "@/components/nesf/NesfData";

const CYAN = "hsl(195 100% 50%)";
const CYAN_DIM = "hsl(195 100% 50% / 0.1)";

const NesfAbout = () => {
  const { lang } = useLang();

  return (
    <NesfShell>
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <SectionReveal>
          <div
            className="rounded-[2rem] p-8 md:p-12 relative overflow-hidden border"
            style={{
              borderColor: "hsl(195 100% 50% / 0.2)",
              background: "linear-gradient(135deg, hsl(195 100% 50% / 0.05) 0%, hsl(220 90% 60% / 0.05) 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: `linear-gradient(hsl(195 100% 50% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(195 100% 50% / 0.06) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative max-w-3xl space-y-5">
              <div
                className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm uppercase tracking-[0.24em]"
                style={{ borderColor: "hsl(195 100% 50% / 0.35)", background: CYAN_DIM, color: CYAN }}
              >
                <Globe className="h-4 w-4" />
                {lang === "en" ? "About NESF" : "Tentang NESF"}
              </div>
              <h1 className="font-display text-4xl md:text-5xl leading-tight text-balance">
                {lang === "en"
                  ? "A national platform for engineering and scientific innovation"
                  : "Platform nasional untuk inovasi teknik dan ilmiah"}
              </h1>
              <p className="max-w-2xl leading-8 text-muted-foreground">
                {lang === "en"
                  ? "NESF (National Engineering Science Fair) is ICGI's national-level competition platform. Unlike YIESF which opens to international participants, NESF focuses on Indonesia's domestic students and innovators — providing an accessible national stage before the world stage."
                  : "NESF (National Engineering Science Fair) adalah platform kompetisi tingkat nasional ICGI. Berbeda dengan YIESF yang terbuka untuk peserta internasional, NESF berfokus pada pelajar dan inovator domestik Indonesia — menyediakan panggung nasional yang mudah diakses sebelum ke panggung dunia."}
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ICGI Ecosystem */}
      <section className="bg-surface/60 border-y border-border/40 py-16">
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: CYAN }}>The ICGI Family</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "Two Science Portals, One Vision" : "Dua Portal Sains, Satu Visi"}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
              {lang === "en"
                ? "ICGI runs both a national and international science fair for academic excellence."
                : "ICGI menjalankan dua pameran sains nasional dan internasional untuk keunggulan akademik."}
            </p>
          </SectionReveal>
          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
            {[
              {
                name: "NESF",
                full: { en: "National Engineering Science Fair", id: "National Engineering Science Fair" },
                desc: { en: "National innovation platform for Indonesian students — engineering, science, research & technology", id: "Platform inovasi nasional untuk pelajar Indonesia — teknik, sains, penelitian & teknologi" },
                color: "from-cyan-500 to-blue-600",
                icon: "🔬",
                href: "/",
                active: true,
              },
              {
                name: "YIESF",
                full: { en: "Yogyakarta International Engineering Science Fair", id: "Yogyakarta International Engineering Science Fair" },
                desc: { en: "International academic innovation platform for global participants", id: "Platform inovasi akademik internasional untuk peserta global" },
                color: "from-blue-500 to-violet-600",
                icon: "🌐",
                href: "https://iesf.icgi.or.id",
                active: false,
              },
            ].map((portal, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }}
                  className={`rounded-2xl border p-6 text-center space-y-3 transition-all ${portal.active ? "" : "opacity-70 hover:opacity-100"}`}
                  style={{ borderColor: portal.active ? "hsl(195 100% 50% / 0.3)" : "hsl(var(--border))" }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-2xl mx-auto`}>
                    {portal.icon}
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg text-foreground">{portal.name}</p>
                    <p className="text-xs text-muted-foreground">{portal.full[lang]}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-6">{portal.desc[lang]}</p>
                  {portal.active && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full"
                      style={{ background: CYAN_DIM, color: CYAN }}>
                      ● {lang === "en" ? "You are here" : "Anda di sini"}
                    </span>
                  )}
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="container py-16">
        <SectionReveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: CYAN }}>Mission</p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {lang === "en" ? "Our Goals" : "Tujuan Kami"}
          </h2>
        </SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {goals.map((goal, i) => {
            const icons = [Lightbulb, Target, Users, Globe];
            const Icon = icons[i % icons.length];
            return (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-border/50 bg-panel p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: CYAN_DIM }}>
                    <Icon className="h-4 w-4" style={{ color: CYAN }} />
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{goal[lang]}</p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      {/* Competition Categories */}
      <section className="bg-surface/60 border-y border-border/40 py-16">
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "5 Academic Fields" : "5 Bidang Akademik"}
            </h2>
          </SectionReveal>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {competitionCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <SectionReveal key={cat.letter} delay={i * 0.08}>
                  <div className="rounded-2xl border border-border/50 bg-panel p-5 text-center space-y-3 h-full">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: CYAN }}
                    >
                      Cat. {cat.letter}
                    </div>
                    <h3 className="text-xs font-bold text-foreground font-display leading-snug">{cat.title[lang]}</h3>
                    <p className="text-xs text-muted-foreground leading-5 line-clamp-4">{cat.description[lang]}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Submission Requirements */}
      <section className="container py-16">
        <SectionReveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: CYAN }}>
            {lang === "en" ? "What to Submit" : "Apa yang Harus Dikumpulkan"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {lang === "en" ? "Project Submission Requirements" : "Persyaratan Pengumpulan Proyek"}
          </h2>
        </SectionReveal>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {submissionRequirements.map((req, i) => (
            <SectionReveal key={i} delay={i * 0.04}>
              <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-panel px-4 py-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{ background: CYAN_DIM, color: CYAN }}
                >
                  {i + 1}
                </div>
                <span className="text-sm text-muted-foreground">{req[lang]}</span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </NesfShell>
  );
};

export default NesfAbout;