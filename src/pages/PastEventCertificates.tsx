// ================================================================
// PastEventCertificates.tsx
// Path: src/pages/PastEventCertificates.tsx
// Route: /past-events/:slug/certificates
// Data : eventRegistry → certificates
// ================================================================
import { Award } from "lucide-react";
import PastEventPage, { PastEventEmpty } from "@/components/nesf/PastEventPage";
import DriveLinkCard from "@/components/nesf/DriveLinkCard";

const MODE_LABEL = { online: "Online", offline: "Offline", all: "Semua peserta" } as const;

const PastEventCertificates = () => (
  <PastEventPage
    section="certificates"
    title="Sertifikat"
    description="Unduh sertifikat peserta dan pemenang melalui tautan Google Drive di bawah ini."
  >
    {(meta) => {
      const items = meta.certificates ?? [];
      if (items.length === 0) {
        return (
          <PastEventEmpty
            icon={Award}
            title="Sertifikat belum tersedia"
            description="Tautan sertifikat akan ditambahkan setelah proses penerbitan selesai."
          />
        );
      }
      return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <DriveLinkCard
              key={`${item.title}-${i}`}
              index={i}
              icon={Award}
              title={item.title}
              description={item.description}
              badge={item.mode ? MODE_LABEL[item.mode] : undefined}
              href={item.driveUrl}
              ctaLabel="Buka sertifikat"
            />
          ))}
        </div>
      );
    }}
  </PastEventPage>
);

export default PastEventCertificates;
