// ================================================================
// PastEventPressRelease.tsx
// Path: src/pages/PastEventPressRelease.tsx
// Route: /past-events/:slug/press-release
// Data : eventRegistry → pressReleaseUrl
// ================================================================
import { ArrowRight, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import PastEventPage from "@/components/nesf/PastEventPage";
import DriveLinkCard from "@/components/nesf/DriveLinkCard";
import { getEventYear } from "@/config/eventRegistry";

const PastEventPressRelease = () => (
  <PastEventPage
    section="press"
    title="Pesan Siaran"
    description="Pesan siaran resmi event ini. Klik kartu untuk membuka filenya di Google Drive."
  >
    {(meta) => {
      const year = getEventYear(meta);
      return (
        <div className="max-w-xl space-y-6">
          <DriveLinkCard
            icon={Megaphone}
            title={`Pesan Siaran ${meta.subtitle}`}
            subtitle={`${meta.location} · ${meta.dateRange}`}
            href={meta.pressReleaseUrl}
            ctaLabel="Buka pesan siaran"
          />
          {year && (
            <Link
              to={`/press-releases/${year}`}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              Lihat pesan siaran event lain di {year}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      );
    }}
  </PastEventPage>
);

export default PastEventPressRelease;