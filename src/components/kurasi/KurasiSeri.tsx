// ================================================================
// KurasiSeri.tsx — satu seri di halaman Curation: Proses Kurasi +
// tombol "Curation <tahun>" untuk tiap edisi yang punya berkas terbit
// (pola halaman Curation situs IYSA: tahun tidak ditulis di kode, edisi
// baru muncul sendiri; edisi tanpa berkas tidak diberi tombol).
// ================================================================
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProsesKurasi from "./ProsesKurasi";
import { ambilBerkas, ambilEdisi, ambilProgres, TEKS, type Bahasa } from "@/lib/kurasi";

interface Props {
  akronim: string;
  nama: string;
  /** Alamat halaman dokumen satu edisi. */
  tautan: (akronim: string, tahun: string) => string;
}

const KurasiSeri = ({ akronim, nama, tautan }: Props) => {
  const [tahunBerisi, setTahunBerisi] = useState<string[]>([]);
  const [bahasa, setBahasa] = useState<Bahasa>("en");

  useEffect(() => {
    let batal = false;
    ambilProgres(akronim).then((p) => { if (!batal) setBahasa(p.bahasa); }).catch(() => {});
    (async () => {
      try {
        const semua = await ambilEdisi(akronim);
        const berisi: string[] = [];
        for (const e of semua) {
          const butir = await ambilBerkas(akronim, e.tahun).catch(() => []);
          if (butir.length > 0) berisi.push(e.tahun);
        }
        if (!batal) setTahunBerisi(berisi);
      } catch { /* tanpa tombol — linimasa tetap tampil */ }
    })();
    return () => { batal = true; };
  }, [akronim]);

  const t = TEKS[bahasa];
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">{akronim}</p>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">{nama}</h2>
        </div>
        {tahunBerisi.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tahunBerisi.map((th) => (
              <Link key={th} to={tautan(akronim, th)}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                {t.tombolEdisi(th)}
              </Link>
            ))}
          </div>
        )}
      </div>
      <ProsesKurasi akronim={akronim} />
    </section>
  );
};

export default KurasiSeri;
