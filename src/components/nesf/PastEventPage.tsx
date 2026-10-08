// ================================================================
// PastEventPage.tsx
// Path: src/components/nesf/PastEventPage.tsx
//
// Kerangka bersama semua halaman pasca-event:
//   - ambil event dari eventRegistry berdasarkan :slug
//   - redirect jika event tidak ada / belum selesai
//   - header + tab navigasi + area konten
// ================================================================
import type { ReactNode } from "react";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import PastEventSubNav, { PAST_EVENT_SECTIONS, type PastEventSectionKey } from "@/components/nesf/PastEventSubNav";
import { getEventMeta, type EventMeta } from "@/config/eventRegistry";

interface PastEventPageProps {
  section: PastEventSectionKey;
  /** Judul besar halaman, mis. "Daftar Pemenang" */
  title: string;
  description?: string;
  children: (meta: EventMeta) => ReactNode;
}

const PastEventPage = ({ section, title, description, children }: PastEventPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const meta = slug ? getEventMeta(slug) : undefined;

  if (!meta) return <Navigate to="/past-events" replace />;
  if (meta.status !== "past") return <Navigate to={`/events/${meta.slug}`} replace />;

  const gradient = meta.heroGradient ?? "from-slate-800 to-slate-900";
  const SectionIcon = PAST_EVENT_SECTIONS.find((s) => s.key === section)?.icon;

  return (
    <NesfShell>
      <div className="relative min-h-screen overflow-hidden">
        <div
          aria-hidden
          className={`pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br ${gradient} opacity-25 blur-3xl`}
        />

        <section className="container relative pt-16 pb-8 md:pt-20">
          <Link
            to="/past-events"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Event Lalu
          </Link>

          <SectionReveal className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold text-primary">{meta.subtitle}</p>
            <h1 className="text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
              {title}
              <span className="block font-light text-muted-foreground">{meta.title}</span>
            </h1>
            {description && <p className="max-w-2xl leading-7 text-muted-foreground">{description}</p>}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-sm text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-panel/70 px-3 py-1 backdrop-blur">{meta.location}</span>
              <span className="rounded-full border border-border/70 bg-panel/70 px-3 py-1 backdrop-blur">{meta.dateRange}</span>
              {SectionIcon && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-medium text-primary">
                  <SectionIcon className="h-3.5 w-3.5" /> {title}
                </span>
              )}
            </div>
          </SectionReveal>
        </section>

        <div className="container relative pb-8">
          <PastEventSubNav slug={meta.slug} />
        </div>

        <section className="container relative pb-24">{children(meta)}</section>
      </div>
    </NesfShell>
  );
};

/** Tampilan kosong standar untuk semua halaman pasca-event */
export const PastEventEmpty = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <SectionReveal className="space-y-3 py-20 text-center">
    <Icon className="mx-auto h-10 w-10 text-muted-foreground/50" />
    <p className="text-lg font-semibold text-foreground">{title}</p>
    <p className="mx-auto max-w-md text-sm text-muted-foreground">{description}</p>
  </SectionReveal>
);

export default PastEventPage;
