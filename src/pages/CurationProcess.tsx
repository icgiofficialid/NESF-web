// ================================================================
// CurationProcess.tsx
// Route: /curation   (navbar utama)
//
// Pola halaman Curation situs event IYSA: tiap seri NESF menampilkan
// Proses Kurasi (linimasa pengajuan ke Puspresnas) dan tombol
// "Kurasi <tahun>" untuk tiap edisi yang berkas kurasinya sudah terbit
// di dashboard ICGI. Seri & tahun tidak ditulis di kode — event baru di
// dashboard muncul sendiri.
// ================================================================
import { ClipboardCheck } from "lucide-react";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import KurasiSeri from "@/components/kurasi/KurasiSeri";
import { seriPortal } from "@/lib/dashboardIcgi";

const CurationProcess = () => (
  <NesfShell>
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <section className="container relative pt-16 pb-10 md:pt-24">
        <SectionReveal className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <ClipboardCheck className="h-4 w-4" /> NESF
          </span>
          <h1 className="text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">Kurasi</h1>
          <p className="max-w-2xl leading-7 text-muted-foreground">
            Proses kurasi setiap event NESF di Puspresnas dan dokumen kurasi yang telah diterbitkan.
          </p>
        </SectionReveal>
      </section>
      <section className="container relative space-y-16 pb-24">
        {seriPortal.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">Data kurasi belum tersedia.</p>
        ) : (
          seriPortal.map((s) => (
            <SectionReveal key={s.akronim}>
              <KurasiSeri akronim={s.akronim} nama={s.nama} tautan={(a, t) => `/curation/${a.toLowerCase()}/${t}`} />
            </SectionReveal>
          ))
        )}
      </section>
    </div>
  </NesfShell>
);

export default CurationProcess;
