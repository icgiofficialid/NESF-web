// ================================================================
// CurationEdisi.tsx
// Route: /curation/:akronim/:tahun
//
// Dokumen kurasi satu edisi (pola halaman CurationTahun situs IYSA),
// ditambah linimasa Proses Kurasi edisi itu.
// ================================================================
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NesfShell from "@/components/nesf/NesfShell";
import ProsesKurasi from "@/components/kurasi/ProsesKurasi";
import DokumenKurasi from "@/components/kurasi/DokumenKurasi";
import { ambilProgres, TEKS, type Bahasa } from "@/lib/kurasi";
import { seriPortal } from "@/lib/dashboardIcgi";

const CurationEdisi = () => {
  const { akronim = "", tahun = "" } = useParams<{ akronim: string; tahun: string }>();
  const kode = akronim.toUpperCase();
  const nama = seriPortal.find((s) => s.akronim === kode)?.nama ?? kode;
  const [bahasa, setBahasa] = useState<Bahasa>("id");
  useEffect(() => { ambilProgres(kode).then((p) => setBahasa(p.bahasa)).catch(() => {}); }, [kode]);
  const t = TEKS[bahasa];

  return (
    <NesfShell>
      <section className="container pt-16 pb-24 md:pt-24 space-y-10">
        <div className="space-y-3">
          <Link to="/curation" className="text-sm text-muted-foreground hover:text-foreground">{t.kembali}</Link>
          <p className="text-sm font-semibold text-primary">{kode} {tahun}</p>
          <h1 className="text-3xl font-bold text-foreground md:text-5xl">{t.tombolEdisi(tahun)}</h1>
          <p className="text-muted-foreground">{nama}</p>
        </div>
        <ProsesKurasi akronim={kode} tahun={tahun} />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{t.dokumen}</h2>
          <DokumenKurasi akronim={kode} tahun={tahun} bahasa={bahasa} />
        </div>
      </section>
    </NesfShell>
  );
};

export default CurationEdisi;
