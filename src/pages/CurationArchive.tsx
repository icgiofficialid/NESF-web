// ================================================================
// CurationArchive.tsx
// Path: src/pages/CurationArchive.tsx
// Route: /curation   (navbar utama — semua event, per tahun)
// ================================================================
import { ClipboardCheck } from "lucide-react";
import ResourceArchive from "@/components/nesf/ResourceArchive";

const CurationArchive = () => (
  <ResourceArchive
    field="curation"
    title="Kurasi"
    description="Hasil kurasi karya peserta dari seluruh event NESF. Pilih tahun untuk melihat tautannya."
    icon={ClipboardCheck}
    ctaLabel="Buka hasil kurasi"
    emptyTitle="Belum ada hasil kurasi"
  />
);

export default CurationArchive;
