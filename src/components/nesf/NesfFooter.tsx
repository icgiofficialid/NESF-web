// ================================================================
// NesfFooter.tsx — Industrial-futuristic · cyan accent
// ================================================================
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LanguageProvider";
import { footerColumns, footerLinkMap, socialItems } from "./NesfData";
import { motion } from "framer-motion";

const AtomMark = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="10">
    <circle cx="100" cy="100" r="18" fill="currentColor" stroke="none" />
    <ellipse cx="100" cy="100" rx="80" ry="30" />
    <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)" />
    <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)" />
  </svg>
);

const NesfFooter = () => {
  const { lang } = useLang();

  return (
    <footer className="relative overflow-hidden border-t border-border/60">
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(195 100% 50% / 0.6) 40%, hsl(220 90% 60% / 0.6) 60%, transparent 100%)" }}
      />

      {/* Watermark atom */}
      <div
        className="absolute -bottom-16 -right-16 pointer-events-none select-none"
        style={{
          opacity: 0.03,
          color: "hsl(195 100% 50%)",
          animation: "rotateCW 80s linear infinite",
        }}
      >
        <AtomMark size={320} />
      </div>

      <div className="container py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] grid-cols-1">
          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))",
                  boxShadow: "0 4px 24px hsl(195 100% 50% / 0.3)",
                  color: "#fff",
                }}
              >
                <AtomMark size={26} />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm leading-tight tracking-[0.08em] font-display">
                  National Engineering Science Fair
                </p>
                <p className="text-[10px] uppercase tracking-[0.22em] mt-0.5 text-muted-foreground">
                  by ICGI · Indonesia
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 max-w-sm text-muted-foreground">
              Mendorong inovasi, penelitian, dan rekayasa di kalangan pelajar dan inovator muda Indonesia.
            </p>

            <div className="flex flex-wrap gap-2">
              {socialItems.map((Icon, i) => (
                <NavLink
                  key={i}
                  to="/contact"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 border border-border bg-surface text-muted-foreground"
                  style={{ ["--hover-color" as string]: "hsl(195 100% 50%)" }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </NavLink>
              ))}
            </div>
          </motion.div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-4">
            {footerColumns.map((column, colIdx) => {
              const colTitle = typeof column.title === "string" ? column.title : column.title[lang];
              return (
                <motion.div
                  key={colTitle}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: colIdx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] mb-4 text-foreground font-display">
                    {colTitle}
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    {column.links.map(link => {
                      const linkText = typeof link === "string" ? link : link[lang];
                      const href = footerLinkMap[linkText] ?? "/";
                      const isExternal = href.startsWith("http") || href.startsWith("mailto");
                      return (
                        <li key={linkText}>
                          {isExternal ? (
                            <a href={href} target="_blank" rel="noopener noreferrer"
                              className="transition-colors hover:text-foreground text-muted-foreground relative group">
                              {linkText}
                              <span className="absolute -bottom-px left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                                style={{ background: "hsl(195 100% 50%)" }} />
                            </a>
                          ) : (
                            <NavLink to={href} className="transition-colors hover:text-foreground text-muted-foreground relative group">
                              {linkText}
                              <span className="absolute -bottom-px left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                                style={{ background: "hsl(195 100% 50%)" }} />
                            </NavLink>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/50"
        >
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} National Engineering Science Fair (NESF) · ICGI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "hsl(195 100% 50%)", animation: "pulse-dot 2.4s ease-in-out infinite" }}
            />
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Powered by ICGI
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default NesfFooter;