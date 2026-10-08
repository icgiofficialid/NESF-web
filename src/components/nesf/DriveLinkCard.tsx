// ================================================================
// DriveLinkCard.tsx
// Path: src/components/nesf/DriveLinkCard.tsx
//
// Kartu yang membuka file/folder Google Drive di tab baru.
// Kalau `href` kosong → tampil "Segera hadir" dan tidak bisa diklik.
// Dipakai di: Daftar Pemenang, Sertifikat, Kurasi.
// ================================================================
import { motion } from "framer-motion";
import { ExternalLink, Hourglass, type LucideIcon } from "lucide-react";
import SectionReveal from "@/components/nesf/SectionReveal";

interface DriveLinkCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
  icon: LucideIcon;
  /** Label kecil di pojok kanan atas, mis. "Online" */
  badge?: string;
  ctaLabel?: string;
  index?: number;
}

const DriveLinkCard = ({
  title,
  subtitle,
  description,
  href,
  icon: Icon,
  badge,
  ctaLabel = "Buka di Google Drive",
  index = 0,
}: DriveLinkCardProps) => {
  const enabled = Boolean(href && href.trim());

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 ${
            enabled ? "group-hover:bg-primary group-hover:text-primary-foreground" : ""
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        {badge && (
          <span className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {badge}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold leading-snug text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        {description && <p className="pt-1 text-sm leading-6 text-muted-foreground">{description}</p>}
      </div>

      <div
        className={`mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-sm font-semibold ${
          enabled ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {enabled ? (
          <>
            {ctaLabel}
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </>
        ) : (
          <>
            Segera hadir
            <Hourglass className="h-4 w-4" />
          </>
        )}
      </div>
    </>
  );

  return (
    <SectionReveal delay={index * 0.06} className="h-full">
      {enabled ? (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.22 }}
          className="group flex h-full flex-col gap-5 rounded-2xl border border-border/70 bg-panel p-5 shadow-sm outline-none transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary"
        >
          {body}
        </motion.a>
      ) : (
        <div
          aria-disabled="true"
          className="flex h-full cursor-not-allowed flex-col gap-5 rounded-2xl border border-dashed border-border/70 bg-panel/50 p-5 opacity-70"
        >
          {body}
        </div>
      )}
    </SectionReveal>
  );
};

export default DriveLinkCard;
