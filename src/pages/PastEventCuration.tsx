// ================================================================
// PastEventCuration.tsx
// Path: src/pages/PastEventCuration.tsx
// Route: /past-events/:slug/curation
// Data : eventRegistry → curation
// ================================================================
import { ClipboardCheck } from "lucide-react";
import PastEventPage, { PastEventEmpty } from "@/components/nesf/PastEventPage";
import DriveLinkCard from "@/components/nesf/DriveLinkCard";

const MODE_LABEL = { online: "Online", offline: "Offline", all: "Semua peserta" } as const;

const PastEventCuration = () => (
  <PastEventPage
    section="curation"
    title="Kurasi"
    description="Hasil kurasi karya peserta. Buka tautan untuk melihat dokumennya di Google Drive."
  >
    {(meta) => {
      const items = meta.curation ?? [];
      if (items.length === 0) {
        return (
          <PastEventEmpty
            icon={ClipboardCheck}
            title="Hasil kurasi belum tersedia"
            description="Hasil kurasi akan ditambahkan setelah proses penilaian selesai."
          />
        );
      }
      return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <DriveLinkCard
              key={`${item.title}-${i}`}
              index={i}
              icon={ClipboardCheck}
              title={item.title}
              description={item.description}
              badge={item.mode ? MODE_LABEL[item.mode] : undefined}
              href={item.driveUrl}
              ctaLabel="Buka hasil kurasi"
            />
          ))}
        </div>
      );
    }}
  </PastEventPage>
);

export default PastEventCuration;
