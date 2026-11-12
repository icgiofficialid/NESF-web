// ================================================================
// GelembungKurasi.tsx — gelembung "Proses Kurasi" mengambang
//
// Tiruan gelembung kurasi.js situs event IYSA (mis. iiiex.or.id): pil di
// pojok bawah "Proses Kurasi 2026 · Langkah n dari 5" yang membuka panel
// berisi tab tahun edisi, bar kemajuan, linimasa lima langkah Puspresnas,
// dan catatan sumber.
//
// Bedanya: portal ini memuat banyak seri, jadi panelnya punya pemilih
// seri, dan seri yang terpilih mengikuti halaman yang sedang dibuka
// (/events/<slug>, /past-events/<slug>, /curation/<akronim>/…).
// kurasi.js sendiri hanya bisa satu seri per halaman dan tidak dipasang
// ulang saat pindah halaman tanpa muat ulang.
//
// Di KIRI bawah, bukan kanan: kanan bawah sudah dipakai tombol kembali ke
// atas (dan popup notifikasi event di beranda).
// ================================================================
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Linimasa } from "./ProsesKurasi";
import { seriPortal, slugKeSeri } from "@/lib/dashboardIcgi";
import { ambilProgres, berselang, ringkasEdisi, TEKS, type ProgresKurasi } from "@/lib/kurasi";

const GelembungKurasi = () => {
  const { pathname } = useLocation();
  const [progres, setProgres] = useState<Record<string, ProgresKurasi>>({});
  const [buka, setBuka] = useState(false);
  const [pilihSeri, setPilihSeri] = useState<string | null>(null);
  const [pilihEdisi, setPilihEdisi] = useState(0);

  // Muat linimasa semua seri portal sekali.
  useEffect(() => {
    let batal = false;
    Promise.all(seriPortal.map((s) => ambilProgres(s.akronim).then((p) => [s.akronim, p] as const).catch(() => null)))
      .then((hasil) => {
        if (batal) return;
        const peta: Record<string, ProgresKurasi> = {};
        for (const h of hasil) if (h && h[1].edisi.length) peta[h[0]] = h[1];
        setProgres(peta);
      });
    return () => { batal = true; };
  }, []);

  const tersedia = useMemo(() => seriPortal.filter((s) => progres[s.akronim]), [progres]);

  // Seri dari halaman yang sedang dibuka.
  const seriHalaman = useMemo(() => {
    const m = pathname.match(/^\/(?:events|past-events)\/([^/]+)/);
    if (m && slugKeSeri[m[1]]) return slugKeSeri[m[1]];
    const k = pathname.match(/^\/curation\/([^/]+)/);
    if (k) return k[1].toUpperCase();
    return null;
  }, [pathname]);

  useEffect(() => {
    if (seriHalaman && progres[seriHalaman]) { setPilihSeri(seriHalaman); setPilihEdisi(0); }
  }, [seriHalaman, progres]);

  // Escape menutup panel.
  useEffect(() => {
    if (!buka) return;
    const f = (e: KeyboardEvent) => { if (e.key === "Escape") setBuka(false); };
    document.addEventListener("keydown", f);
    return () => document.removeEventListener("keydown", f);
  }, [buka]);

  if (tersedia.length === 0) return null;
  const akronim = pilihSeri && progres[pilihSeri] ? pilihSeri : tersedia[0].akronim;
  const data = progres[akronim];
  const t = TEKS[data.bahasa];
  const ed = data.edisi[Math.min(pilihEdisi, data.edisi.length - 1)];
  const utama = data.edisi[0];
  const r0 = ringkasEdisi(utama);
  const rs = ringkasEdisi(ed);
  const persen = ed.persiapan ? 0 : Math.round((100 * rs.nomor) / Math.max(1, ed.isi.length));
  const langkahUtama = utama.persiapan ? t.persiapan : t.langkahKe(r0.nomor, utama.isi.length);
  const judulPil = `${tersedia.length > 1 ? `${akronim} · ` : ""}${t.judul} ${utama.tahun}`;

  return (
    // z-40: di bawah popup event (z-50) dan tombol kembali ke atas, di atas isi halaman.
    <div className="fixed bottom-[18px] left-[18px] z-40 flex flex-col items-start gap-2.5 max-[480px]:left-3 max-[480px]:bottom-3">
      {buka && (
        <div role="dialog" aria-label={t.judul}
          className="flex max-h-[min(72vh,600px)] w-[380px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-[#E6E8EF] bg-white text-[#12203A] shadow-[0_18px_48px_rgba(9,20,40,.24)] dark:border-[#26304A] dark:bg-[#131A28] dark:text-[#E8EBF2]">
          <div className="flex items-center justify-between gap-2.5 px-4 pt-3.5 pb-2.5">
            <h2 className="text-sm font-bold">{t.judul}</h2>
            <button type="button" aria-label={t.tutup} onClick={() => setBuka(false)} className="text-[#6B7487] hover:opacity-80">
              <X className="h-4 w-4" />
            </button>
          </div>

          {tersedia.length > 1 && (
            <div role="tablist" aria-label={t.pilihSeri} className="flex gap-1.5 overflow-x-auto px-4 pb-2.5 [scrollbar-width:none]">
              {tersedia.map((s) => (
                <button key={s.akronim} type="button" role="tab" aria-selected={s.akronim === akronim} title={s.nama}
                  onClick={() => { setPilihSeri(s.akronim); setPilihEdisi(0); }}
                  className={cn("shrink-0 rounded-full border px-3 py-1 text-xs font-bold",
                    s.akronim === akronim
                      ? "border-[#0F2E5C] bg-[#0F2E5C] text-white dark:border-[#F2B705] dark:bg-[#F2B705] dark:text-[#12203A]"
                      : "border-[#DDE1EA] text-[#3B455C] dark:border-[#2E3954] dark:text-[#C9CFDC]")}>
                  {s.akronim}
                </button>
              ))}
            </div>
          )}

          {data.edisi.length > 1 && (
            <div role="tablist" aria-label={t.edisi} className="flex gap-1.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
              {data.edisi.map((e, i) => {
                const r = ringkasEdisi(e);
                return (
                  <button key={e.tahun} type="button" role="tab" aria-selected={i === pilihEdisi} onClick={() => setPilihEdisi(i)}
                    className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                      i === pilihEdisi
                        ? "border-[#0F2E5C] bg-[#0F2E5C] text-white dark:border-[#F2B705] dark:bg-[#F2B705] dark:text-[#12203A]"
                        : "border-[#DDE1EA] bg-white text-[#3B455C] dark:border-[#2E3954] dark:bg-[#131A28] dark:text-[#C9CFDC]")}>
                    <span className="h-[7px] w-[7px] rounded-full" style={{ background: r.warna }} />
                    {e.tahun}
                  </button>
                );
              })}
            </div>
          )}

          <div className="border-b border-[#EDEFF4] px-4 pb-3 dark:border-[#26304A]">
            <div className="mb-1.5 flex justify-between gap-2 text-xs font-semibold">
              <span style={{ color: rs.warna }}>{ed.persiapan ? t.persiapan : rs.terakhir?.status}</span>
              <span className="whitespace-nowrap font-medium text-[#7A8296] dark:text-[#98A1B5]">
                {t.edisi} {ed.tahun} · {ed.persiapan ? `0/${ed.isi.length}` : t.langkahKe(rs.nomor, ed.isi.length)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#EDEFF4] dark:bg-[#26304A]">
              <i className="block h-full rounded-full" style={{ width: `${persen}%`, background: rs.warna }} />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-2">
            <Linimasa ed={ed} bahasa={data.bahasa} />
          </div>

          <div className="border-t border-[#EDEFF4] px-4 pt-2.5 pb-3 text-[11px] leading-relaxed text-[#8A91A3] dark:border-[#26304A]">
            {t.sumber}
            {!ed.persiapan && rs.terakhir?.diperbarui && (
              <><br />{t.diperbaruiLabel}: {berselang(rs.terakhir.diperbarui, data.bahasa)}</>
            )}
          </div>
        </div>
      )}

      <button type="button" aria-expanded={buka} onClick={() => setBuka((v) => !v)}
        title={utama.persiapan ? `${judulPil} — ${t.ketPersiapan}` : `${judulPil} — ${r0.terakhir?.label}: ${r0.terakhir?.status}`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F2E5C] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_20px_rgba(15,46,92,.28)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r0.warna }} />
        {/* Ponsel: pil ringkas supaya tidak menutupi popup event di kanan bawah. */}
        <span className="hidden sm:inline">{judulPil} · {langkahUtama}</span>
        <span className="sm:hidden">{data.bahasa === "en" ? "Curation" : "Kurasi"} {utama.tahun}</span>
      </button>
    </div>
  );
};

export default GelembungKurasi;
