// ================================================================
// NesfNavbar.tsx — Industrial-futuristic · cyan accent
// ================================================================
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: { en: "Upcoming Events", id: "Event Mendatang" }, href: "/events" },
  { label: { en: "Past Events",     id: "Event Lalu"      }, href: "/past-events" },
  { label: { en: "FAQ",             id: "FAQ"             }, href: "/faq" },
  { label: { en: "Contact Us",      id: "Kontak"          }, href: "/contact" },
];

// Atom/molecule mark — science logo
const AtomMark = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="10">
    <circle cx="100" cy="100" r="18" fill="currentColor" stroke="none" />
    <ellipse cx="100" cy="100" rx="80" ry="30" />
    <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)" />
    <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)" />
  </svg>
);

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Toggle theme">
      {theme === "dark"
        ? <Sun className="w-4 h-4 text-muted-foreground" />
        : <Moon className="w-4 h-4 text-muted-foreground" />}
    </button>
  );
};

const LangToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <button onClick={toggle} className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-muted transition-colors text-sm font-semibold text-muted-foreground">
      {lang === "en" ? (
        <><img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-5 h-4 rounded-sm object-cover" /><span className="text-xs">EN</span></>
      ) : (
        <><img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-5 h-4 rounded-sm object-cover" /><span className="text-xs">ID</span></>
      )}
    </button>
  );
};

const NesfNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/80 bg-background/92 backdrop-blur-2xl shadow-[0_1px_0_hsl(195_100%_50%/0.06)]"
          : "border-b border-transparent bg-background/70 backdrop-blur-xl"
      )}
    >
      <div className="container flex items-center justify-between gap-4 py-3">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 group">
          <motion.div className="relative shrink-0" whileHover={{ scale: 1.08 }} transition={{ duration: 0.2 }}>
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))",
                boxShadow: "0 0 16px hsl(195 100% 50% / 0.35)",
                color: "#fff",
              }}
            >
              <AtomMark size={20} />
            </div>
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-background"
              style={{ background: "hsl(195 100% 50%)", animation: "pulse-dot 2.4s ease-in-out infinite" }}
            />
          </motion.div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[13px] font-bold text-foreground tracking-[0.08em] group-hover:opacity-70 transition-opacity font-display">
              NESF
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
              by ICGI
            </span>
          </div>
        </a>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          className="inline-flex rounded-xl border border-border/70 bg-surface/80 p-2 lg:hidden transition-colors hover:bg-muted"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </motion.span>
              : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-4 w-4 text-muted-foreground" />
                </motion.span>
            }
          </AnimatePresence>
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <motion.div key={item.href} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}>
              <NavLink
                to={item.href}
                className="relative font-medium transition-colors hover:text-foreground group"
                activeClassName="text-foreground"
              >
                {item.label[lang]}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "hsl(195 100% 50%)" }}
                />
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* RIGHT CONTROLS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="hidden items-center gap-1 lg:flex"
        >
          <ThemeToggle />
          <LangToggle />
          <NavLink
            to="/register"
            className="ml-2 flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold tracking-wide transition-all hover:scale-[1.04] hover:shadow-lg active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))",
              color: "#fff",
              boxShadow: "0 2px 16px hsl(195 100% 50% / 0.3)",
            }}
          >
            <AtomMark size={13} />
            Register
          </NavLink>
        </motion.div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border/60 bg-background/96 backdrop-blur-2xl lg:hidden overflow-hidden"
          >
            <div className="container grid gap-1.5 py-4 text-sm text-muted-foreground">
              {NAV_ITEMS.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                  <NavLink
                    to={item.href}
                    className="block rounded-xl border border-transparent px-3 py-2.5 font-medium transition-colors hover:border-border hover:bg-surface hover:text-foreground"
                    activeClassName="border-border bg-surface text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {item.label[lang]}
                  </NavLink>
                </motion.div>
              ))}
              <div className="flex items-center gap-1 pt-1 border-t border-border/40 mt-1">
                <ThemeToggle />
                <LangToggle />
              </div>
              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold mt-1 text-white"
                style={{ background: "linear-gradient(135deg, hsl(195 100% 40%), hsl(220 90% 50%))" }}
              >
                <AtomMark size={13} />
                Register Now
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NesfNavbar;