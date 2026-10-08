// ================================================================
// WinnersArchive.tsx
// Path: src/pages/WinnersArchive.tsx
// Route: /winners   (navbar utama — semua event, per tahun)
// Data : eventRegistry → winners (online/offline × jenjang)
// ================================================================
import { MapPin, Trophy, Wifi } from "lucide-react";
import DriveLinkCard from "@/components/nesf/DriveLinkCard";
import { ArchiveEmpty, ArchiveShell, EventGroupHeader } from "@/components/nesf/YearArchive";
import { getEventsByYear, getEventYears, type EventMeta } from "@/config/eventRegistry";
import { levelIcon } from "@/pages/PastEventWinners";

const hasWinners = (e: EventMeta) => (e.winners?.online?.length ?? 0) + (e.winners?.offline?.length ?? 0) > 0;

const WinnersArchive = () => {
  const years = getEventYears();
  const counts = Object.fromEntries(years.map((y) => [y, getEventsByYear(y).filter(hasWinners).length])) as Record<number, number>;

  return (
    <ArchiveShell
      title="Daftar Pemenang"
      description="Daftar pemenang dari seluruh event NESF, dipisah per kompetisi online/offline dan per jenjang. Pilih tahun untuk melihatnya."
      icon={Trophy}
      years={years}
      counts={counts}
      countUnit="event"
    >
      {(year) => {
        const events = getEventsByYear(year).filter(hasWinners);
        if (events.length === 0) {
          return <ArchiveEmpty icon={Trophy} title={`Belum ada daftar pemenang ${year}`} description="Daftar pemenang akan muncul setelah hasil akhir dipublikasikan." />;
        }
        return (
          <div className="space-y-14">
            {events.map((meta) => (
              <div key={meta.slug}>
                <EventGroupHeader meta={meta} section="winners" />
                <div className="space-y-8">
                  {([
                    { key: "online",  label: "Online",  icon: Wifi },
                    { key: "offline", label: "Offline", icon: MapPin },
                  ] as const).map(({ key, label, icon: Icon }) => {
                    const levels = meta.winners?.[key] ?? [];
                    if (levels.length === 0) return null;
                    return (
                      <div key={key} className="space-y-4">
                        <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-foreground">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </span>
                          Kompetisi {label}
                        </h3>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                          {levels.map((item, i) => (
                            <DriveLinkCard
                              key={`${meta.slug}-${key}-${item.level}`}
                              index={i}
                              icon={levelIcon(item.level)}
                              title={item.level}
                              subtitle={item.age}
                              description={item.description}
                              href={item.driveUrl}
                              ctaLabel="Lihat daftar pemenang"
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      }}
    </ArchiveShell>
  );
};

export default WinnersArchive;
