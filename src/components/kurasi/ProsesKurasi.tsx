// ================================================================
// ProsesKurasi.tsx — linimasa pengajuan kurasi ke Puspresnas
// (isi gelembung "Proses Kurasi" situs IYSA, dirender di dalam halaman).
// ================================================================
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ambilProgres, NADA, TEKS, tanggalKurasi, type Bahasa, type EdisiKurasi, type ProgresKurasi } from "@/lib/kurasi";

function Predikat({ bintang, skor, bahasa }: { bintang: number | null; skor: number | null; bahasa: Bahasa }) {
  if (bintang == null) return null;
  const t = TEKS[bahasa];
  if (bintang === 0) return <p className="text-xs text-muted-foreground">{t.predikat}: {t.tanpaPredikat}</p>;
  const b = Math.max(0, Math.min(5, bintang));
  const nilai = skor != null ? String(skor).replace(".", bahasa === "en" ? "." : ",") : "";
  return (
    <p className="text-sm" title={`${t.predikat} ${b}/5${nilai ? ` (${nilai})` : ""}`}>
      <span className="text-amber-500">{"★".repeat(b)}</span>
      <span className="text-muted-foreground/40">{"★".repeat(5 - b)}</span>
      {nilai && <span className="ml-1.5 text-xs text-muted-foreground">({nilai})</span>}
    </p>
  );
}

export function Linimasa({ ed, bahasa }: { ed: EdisiKurasi; bahasa: Bahasa }) {
  const t = TEKS[bahasa];
  return (
    <div>
      {ed.persiapan && <p className="mb-4 text-sm text-muted-foreground">{t.ketPersiapan}</p>}
      <ol className="relative space-y-5 border-l-2 border-border/70 pl-6">
        {ed.isi.map((k) => {
          const belum = k.tercatat === false;
          const warna = NADA[belum ? "belum" : k.nada] ?? NADA.berjalan;
          return (
            <li key={k.langkah} className={cn("relative", belum && "opacity-70")}>
              <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-background" style={{ background: warna }} />
              <p className="font-semibold leading-snug text-foreground">{k.label}</p>
              {belum ? (
                <p className="text-sm font-medium" style={{ color: warna }}>{t.belum}</p>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">
                    {k.terjadi_pada ? tanggalKurasi(k.terjadi_pada, bahasa) : t.tanpaTanggal}
                  </p>
                  <p className="text-sm font-medium" style={{ color: warna }}>{t.status}: {k.status}</p>
                </>
              )}
              {k.catatan && <p className="mt-1 text-sm text-muted-foreground">{k.catatan}</p>}
              {!belum && <Predikat bintang={k.bintang} skor={k.skor} bahasa={bahasa} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

interface Props {
  akronim: string;
  /** Tampilkan satu edisi saja; kosong = semua edisi dengan tab tahun. */
  tahun?: string;
  className?: string;
}

const ProsesKurasi = ({ akronim, tahun, className }: Props) => {
  const [data, setData] = useState<ProgresKurasi | null>(null);
  const [pilih, setPilih] = useState(0);

  useEffect(() => {
    let batal = false;
    ambilProgres(akronim)
      .then((d) => { if (!batal) { setData(d); setPilih(0); } })
      .catch(() => { /* situs tidak menampilkan galat dashboard */ });
    return () => { batal = true; };
  }, [akronim]);

  if (!data) return null;
  const edisi = tahun ? data.edisi.filter((e) => e.tahun === tahun) : data.edisi;
  if (edisi.length === 0) return null;
  const t = TEKS[data.bahasa];
  const ed = edisi[Math.min(pilih, edisi.length - 1)];
  const tercatat = ed.isi.filter((k) => k.tercatat !== false);
  const nomor = tercatat.length ? ed.isi.indexOf(tercatat[tercatat.length - 1]) + 1 : 0;

  return (
    <div className={cn("rounded-3xl border border-border/70 bg-panel/70 p-5 md:p-7", className)}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-foreground">{t.judul}</h3>
        <span className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
          {t.edisi} {ed.tahun} · {ed.persiapan ? t.persiapan : t.langkahKe(nomor, ed.isi.length)}
        </span>
      </div>
      {edisi.length > 1 && (
        <div role="tablist" className="mb-5 flex gap-2 overflow-x-auto">
          {edisi.map((e, i) => (
            <button key={e.tahun} type="button" role="tab" aria-selected={i === pilih} onClick={() => setPilih(i)}
              className={cn("rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                i === pilih ? "border-primary bg-primary text-primary-foreground" : "border-border/70 text-foreground hover:border-primary/50")}>
              {e.tahun}
            </button>
          ))}
        </div>
      )}
      <Linimasa ed={ed} bahasa={data.bahasa} />
      <p className="mt-5 text-xs text-muted-foreground">{t.sumber}</p>
    </div>
  );
};

export default ProsesKurasi;
