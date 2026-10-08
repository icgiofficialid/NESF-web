// ================================================================
// ResourceArchive.tsx
// Path: src/components/nesf/ResourceArchive.tsx
//
// Halaman arsip per tahun untuk resource Drive yang sifatnya sama
// (Sertifikat & Kurasi). Data dari eventRegistry (`certificates` / `curation`).
// ================================================================
import type { LucideIcon } from "lucide-react";
import DriveLinkCard from "@/components/nesf/DriveLinkCard";
import { ArchiveEmpty, ArchiveShell, EventGroupHeader } from "@/components/nesf/YearArchive";
import { getEventsByYear, getEventYears } from "@/config/eventRegistry";

const MODE_LABEL = { online: "Online", offline: "Offline", all: "Semua peserta" } as const;

interface ResourceArchiveProps {
  field: "certificates" | "curation";
  title: string;
  description: string;
  icon: LucideIcon;
  ctaLabel: string;
  emptyTitle: string;
}

const ResourceArchive = ({ field, title, description, icon, ctaLabel, emptyTitle }: ResourceArchiveProps) => {
  const years = getEventYears();
  const counts = Object.fromEntries(
    years.map((y) => [y, getEventsByYear(y).filter((e) => (e[field]?.length ?? 0) > 0).length])
  ) as Record<number, number>;

  return (
    <ArchiveShell title={title} description={description} icon={icon} years={years} counts={counts} countUnit="event">
      {(year) => {
        const events = getEventsByYear(year).filter((e) => (e[field]?.length ?? 0) > 0);
        if (events.length === 0) {
          return <ArchiveEmpty icon={icon} title={`${emptyTitle} ${year}`} description="Tautan akan ditambahkan setelah event selesai." />;
        }
        return (
          <div className="space-y-14">
            {events.map((meta) => (
              <div key={meta.slug}>
                <EventGroupHeader meta={meta} section={field} />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {(meta[field] ?? []).map((item, i) => (
                    <DriveLinkCard
                      key={`${meta.slug}-${item.title}-${i}`}
                      index={i}
                      icon={icon}
                      title={item.title}
                      description={item.description}
                      badge={item.mode ? MODE_LABEL[item.mode] : undefined}
                      href={item.driveUrl}
                      ctaLabel={ctaLabel}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }}
    </ArchiveShell>
  );
};

export default ResourceArchive;
