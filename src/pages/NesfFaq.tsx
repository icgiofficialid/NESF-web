// ================================================================
// NesfFaq.tsx
// ================================================================
import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { faqItems } from "@/components/nesf/NesfData";

const CYAN = "hsl(195 100% 50%)";
const CYAN_DIM = "hsl(195 100% 50% / 0.1)";

const NesfFaq = () => {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <NesfShell>
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <SectionReveal>
          <div
            className="rounded-[2rem] p-8 md:p-10 border"
            style={{
              borderColor: "hsl(195 100% 50% / 0.2)",
              background: "linear-gradient(135deg, hsl(195 100% 50% / 0.04) 0%, hsl(220 90% 60% / 0.04) 100%)",
            }}
          >
            <div className="relative max-w-3xl space-y-5">
              <div
                className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm uppercase tracking-[0.24em]"
                style={{ borderColor: "hsl(195 100% 50% / 0.35)", background: CYAN_DIM, color: CYAN }}
              >
                <CircleHelp className="h-4 w-4" />
                FAQ
              </div>
              <h1 className="font-display text-4xl md:text-5xl">
                {lang === "en" ? "Quick Answers" : "Jawaban Cepat"}
              </h1>
              <p className="max-w-xl leading-8 text-muted-foreground">
                {lang === "en"
                  ? "Everything you need to know about participating in NESF — the National Engineering Science Fair."
                  : "Semua yang perlu Anda ketahui tentang berpartisipasi dalam NESF — National Engineering Science Fair."}
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* FAQ List */}
      <section className="container pb-20">
        <div className="grid gap-4 max-w-3xl mx-auto">
          {faqItems.map((faq, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div
                className="rounded-2xl overflow-hidden cursor-pointer border transition-all duration-200"
                style={{
                  borderColor: openIndex === i ? "hsl(195 100% 50% / 0.3)" : "hsl(var(--border) / 0.6)",
                  background: openIndex === i ? "hsl(195 100% 50% / 0.03)" : "hsl(var(--panel))",
                }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4 p-6">
                  <h2 className="text-base font-semibold text-foreground">{faq.question[lang]}</h2>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                    style={{ color: CYAN }}
                  />
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-6 leading-7 text-sm text-muted-foreground border-t border-border/40 pt-4">
                        {faq.answer[lang]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* CTA */}
        <SectionReveal className="mt-12">
          <div
            className="max-w-3xl mx-auto rounded-2xl p-6 text-center border"
            style={{ borderColor: "hsl(195 100% 50% / 0.2)", background: CYAN_DIM }}
          >
            <p className="text-sm font-semibold text-foreground mb-1">
              {lang === "en" ? "Still have questions?" : "Masih punya pertanyaan?"}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {lang === "en" ? "Reach out to the NESF team directly." : "Hubungi tim NESF secara langsung."}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.04]"
              style={{ background: "linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))" }}
            >
              {lang === "en" ? "Contact Us" : "Hubungi Kami"}
            </a>
          </div>
        </SectionReveal>
      </section>
    </NesfShell>
  );
};

export default NesfFaq;