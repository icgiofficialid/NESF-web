// ================================================================
// PastEventSubNav.tsx
// Path: src/components/nesf/PastEventSubNav.tsx
//
// Tab navigasi antar halaman pasca-event:
// Dokumentasi · Berita · Daftar Pemenang · Sertifikat · Kurasi
// ================================================================
import { Link, useLocation } from "react-router-dom";
import { Award, ClipboardCheck, Images, Newspaper, Trophy, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type PastEventSectionKey = "gallery" | "news" | "winners" | "certificates" | "curation";

export const PAST_EVENT_SECTIONS: {
  key: PastEventSectionKey;
  label: string;
  /** Sambungan setelah /past-events/:slug */
  path: string;
  icon: LucideIcon;
}[] = [
  { key: "gallery",      label: "Dokumentasi",     path: "",              icon: Images },
  { key: "news",         label: "Berita",          path: "/news",         icon: Newspaper },
  { key: "winners",      label: "Daftar Pemenang", path: "/winners",      icon: Trophy },
  { key: "certificates", label: "Sertifikat",      path: "/certificates", icon: Award },
  { key: "curation",     label: "Kurasi",          path: "/curation",     icon: ClipboardCheck },
];

const PastEventSubNav = ({ slug }: { slug: string }) => {
  const { pathname } = useLocation();
  const base = `/past-events/${slug}`;
  const current = pathname.replace(/\/+$/, "");

  return (
    <nav
      aria-label="Halaman event"
      className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max min-w-full gap-2 rounded-2xl border border-border/70 bg-panel/70 p-1.5 backdrop-blur md:w-full">
        {PAST_EVENT_SECTIONS.map(({ key, label, path, icon: Icon }) => {
          const active = current === `${base}${path}`;
          return (
            <li key={key} className="md:flex-1">
              <Link
                to={`${base}${path}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PastEventSubNav;
