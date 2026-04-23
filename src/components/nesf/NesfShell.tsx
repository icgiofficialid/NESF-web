// ================================================================
// NesfShell.tsx
// ================================================================
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import NesfNavbar from "./NesfNavbar";
import NesfFooter from "./NesfFooter";
import ScrollToTop from "@/components/nesf/ScrollToTop";

type NesfShellProps = {
  children: ReactNode;
  showFooter?: boolean;
};

const NesfShell = ({ children, showFooter = true }: NesfShellProps) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <NesfNavbar />
      <main className="relative">{children}</main>
      {showFooter && <NesfFooter />}

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 20, pointerEvents: showTop ? "auto" : "none" }}
        transition={{ duration: 0.25 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 rounded-lg border border-border bg-surface p-3 shadow-lg backdrop-blur-xl"
        style={{
          boxShadow: "0 0 0 1px hsl(195 100% 50% / 0.2), 0 8px 32px hsl(195 100% 50% / 0.15)",
          color: "hsl(195 100% 50%)",
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default NesfShell;