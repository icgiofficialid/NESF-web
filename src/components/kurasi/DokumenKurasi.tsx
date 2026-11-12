// ================================================================
// DokumenKurasi.tsx — berkas kurasi satu edisi sebagai kartu
// (sama dengan halaman CurationTahun situs IYSA: judul kartu = nama
// dokumen/slot, nama berkas kecil di bawahnya, lencana hanya untuk
// berkas dokumentasi).
// ================================================================
import { useEffect, useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { ambilBerkas, berkasTampil, TEKS, type Bahasa, type BerkasKurasi } from "@/lib/kurasi";

const DokumenKurasi = ({ akronim, tahun, bahasa }: { akronim: string; tahun: string; bahasa: Bahasa }) => {
  const [berkas, setBerkas] = useState<BerkasKurasi[] | null>(null);
  const [galat, setGalat] = useState(false);
  const t = TEKS[bahasa];

  useEffect(() => {
    let batal = false;
    setBerkas(null);
    setGalat(false);
    ambilBerkas(akronim, tahun)
      .then((d) => { if (!batal) setBerkas(berkasTampil(d)); })
      .catch(() => { if (!batal) setGalat(true); });
    return () => { batal = true; };
  }, [akronim, tahun]);

  // "Belum ada" dan "gagal memuat" sengaja dibedakan.
  if (galat) return <p className="text-sm text-muted-foreground">{t.gagal}</p>;
  if (berkas === null) return <p className="text-sm text-muted-foreground">{t.memuat}</p>;
  if (berkas.length === 0) return <p className="text-sm text-muted-foreground">{t.kosong}</p>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t.jumlahDokumen(berkas.length)}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {berkas.map((f, i) => {
          const isi = (
            <>
              <div className="flex items-start justify-between gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {f.jenis === "dokumentasi" && (
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">{t.dokumentasi}</span>
                )}
              </div>
              <h3 className="font-semibold leading-snug text-foreground group-hover:text-primary">{f.slot}</h3>
              <p className="mt-auto break-all text-xs text-muted-foreground">{f.nama}</p>
              {f.url && <ExternalLink className="absolute right-4 bottom-4 h-4 w-4 text-muted-foreground" />}
            </>
          );
          const kelas = "group relative flex min-h-[9rem] flex-col gap-2 rounded-2xl border border-border/70 bg-panel/70 p-5 pr-10 transition-colors hover:border-primary/50";
          return f.url ? (
            <a key={`${f.url}-${i}`} href={f.url} target="_blank" rel="noopener noreferrer" className={kelas}>{isi}</a>
          ) : (
            <div key={`${f.slot}-${i}`} className={kelas}>{isi}</div>
          );
        })}
      </div>
    </div>
  );
};

export default DokumenKurasi;
