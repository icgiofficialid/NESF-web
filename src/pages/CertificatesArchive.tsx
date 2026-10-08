// ================================================================
// CertificatesArchive.tsx
// Path: src/pages/CertificatesArchive.tsx
// Route: /certificates   (navbar utama — semua event, per tahun)
// ================================================================
import { Award } from "lucide-react";
import ResourceArchive from "@/components/nesf/ResourceArchive";

const CertificatesArchive = () => (
  <ResourceArchive
    field="certificates"
    title="Sertifikat"
    description="Sertifikat peserta dan pemenang dari seluruh event NESF. Pilih tahun untuk melihat tautannya."
    icon={Award}
    ctaLabel="Buka sertifikat"
    emptyTitle="Belum ada sertifikat"
  />
);

export default CertificatesArchive;
