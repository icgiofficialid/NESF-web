// ================================================================
// kurasi.ts — Curation Process dari dashboard ICGI
//
// Sumbernya sama dengan situs event IYSA (gelembung kurasi.js dan
// halaman Curation/CurationTahun):
//   - `kurasi_progres` : linimasa pengajuan kurasi ke Puspresnas per edisi,
//                        dicatat tim RnD di dashboard (Pengusulan Ajang …
//                        Status Kurasi).
//   - `berkas_kurasi`  : berkas kurasi yang ditandai boleh disiarkan.
//
// Portal ini memuat banyak seri sekaligus, jadi linimasanya dirender
// sebagai komponen sendiri — gelembung kurasi.js hanya bisa satu seri per
// halaman dan tidak ikut berganti saat pindah halaman tanpa muat ulang.
// ================================================================
import { DASHBOARD_API } from "@/lib/dashboardIcgi";

export type Bahasa = "id" | "en";

export interface LangkahKurasi {
  langkah: string;
  label: string;
  tercatat: boolean;
  status: string | null;
  nada: "selesai" | "berjalan" | "gagal" | "belum";
  terjadi_pada: string | null;
  catatan: string | null;
  bintang: number | null;
  skor: number | null;
}
export interface EdisiKurasi { tahun: string; persiapan: boolean; isi: LangkahKurasi[] }
export interface ProgresKurasi { bahasa: Bahasa; edisi: EdisiKurasi[] }
export interface BerkasKurasi { slot: string; jenis: string; nama: string; url: string | null; kategori: string | null }

async function ambil<T>(jalur: string): Promise<T> {
  const res = await fetch(`${DASHBOARD_API}/api/public/v1/${jalur}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message ?? jalur);
  return json.data as T;
}

/** Linimasa kurasi semua edisi seri ini, terbaru dulu. */
export async function ambilProgres(akronim: string): Promise<ProgresKurasi> {
  const d = await ambil<{ sections: Array<{ key: string; bahasa?: string; edisi?: string; persiapan?: boolean; isi: LangkahKurasi[]; edisi_list?: EdisiKurasi[] }> }>(
    `${encodeURIComponent(akronim)}?sections=kurasi_progres`);
  const s = d.sections?.[0];
  const edisi = s?.edisi_list?.length
    ? s.edisi_list
    : s?.isi?.length ? [{ tahun: s.edisi ?? "", persiapan: !!s.persiapan, isi: s.isi }] : [];
  return { bahasa: s?.bahasa === "id" ? "id" : "en", edisi };
}

/** Edisi seri ini yang ada di dashboard: `[{tahun, nama, dipin}]`. */
export async function ambilEdisi(akronim: string): Promise<Array<{ tahun: string; nama: string; dipin: boolean }>> {
  const d = await ambil<{ edisi: Array<{ tahun: string; nama: string; dipin: boolean }> }>(`${encodeURIComponent(akronim)}/edisi`);
  return (d.edisi ?? []).filter(e => e.tahun);
}

/** Berkas kurasi satu edisi yang boleh disiarkan, per butir. */
export async function ambilBerkas(akronim: string, tahun: string): Promise<Array<{ nomor: number; butir: string; berkas: BerkasKurasi[] }>> {
  const d = await ambil<{ sections: Array<{ key: string; isi: unknown }> }>(
    `${encodeURIComponent(akronim)}?tahun=${encodeURIComponent(tahun)}&sections=berkas_kurasi`);
  const isi = d.sections?.find(s => s.key === "berkas_kurasi")?.isi;
  return Array.isArray(isi) ? isi : [];
}

/**
 * Daftar berkas yang ditampilkan: rata, satu per slot — aturan yang sama
 * dengan situs IYSA. Dokumen yang terbit per kategori disembunyikan bila
 * slotnya punya berkas gabungan ("Semua"/tanpa kategori); bila tidak ada
 * gabungan, yang per kategori tetap tampil.
 */
export function berkasTampil(butir: Array<{ berkas: BerkasKurasi[] }>): BerkasKurasi[] {
  const gabungan = (f: BerkasKurasi) => !f.kategori || f.kategori === "Semua";
  const perSlot = new Map<string, BerkasKurasi[]>();
  for (const b of butir ?? []) for (const f of b.berkas ?? []) {
    perSlot.set(f.slot, [...(perSlot.get(f.slot) ?? []), f]);
  }
  const hasil: BerkasKurasi[] = [];
  for (const berkas of perSlot.values()) {
    const utama = berkas.filter(gabungan);
    hasil.push(...(utama.length > 0 ? utama : berkas));
  }
  return hasil;
}

// ── Teks — istilah langkah & status TIDAK diterjemahkan (istilah resmi Puspresnas)
export const TEKS = {
  id: {
    judul: "Proses Kurasi",
    sumber: "Dicatat dari laman pengajuan kurasi Puspresnas.",
    belum: "Belum dijalani",
    persiapan: "Persiapan",
    ketPersiapan: "Pengajuan kurasi ke Puspresnas untuk edisi ini sedang disiapkan.",
    tanpaTanggal: "Tanggal tidak dicantumkan Puspresnas",
    status: "Status",
    edisi: "Edisi",
    langkahKe: (n: number, t: number) => `Langkah ${n} dari ${t}`,
    predikat: "Predikat",
    tanpaPredikat: "Tidak ada predikat",
    dokumen: "Dokumen Kurasi",
    tombolEdisi: (t: string) => `Kurasi ${t}`,
    jumlahDokumen: (n: number) => `${n} dokumen`,
    kosong: "Belum ada dokumen yang diterbitkan untuk edisi ini.",
    gagal: "Daftar dokumen tidak bisa dimuat. Coba lagi sebentar lagi.",
    memuat: "Memuat…",
    dokumentasi: "Dokumentasi",
    kembali: "← Kurasi",
  },
  en: {
    judul: "Curation Process",
    sumber: "Recorded from the Puspresnas curation submission page.",
    belum: "Not started",
    persiapan: "Preparation",
    ketPersiapan: "The curation submission to Puspresnas for this edition is being prepared.",
    tanpaTanggal: "Date not listed by Puspresnas",
    status: "Status",
    edisi: "Edition",
    langkahKe: (n: number, t: number) => `Step ${n} of ${t}`,
    predikat: "Rating",
    tanpaPredikat: "No rating",
    dokumen: "Curation Documents",
    tombolEdisi: (t: string) => `Curation ${t}`,
    jumlahDokumen: (n: number) => `${n} documents`,
    kosong: "No documents have been published for this edition yet.",
    gagal: "The document list could not be loaded. Please try again shortly.",
    memuat: "Loading…",
    dokumentasi: "Documentation",
    kembali: "← Curation",
  },
} as const;

export const NADA: Record<LangkahKurasi["nada"], string> = {
  selesai: "#1B8C78",
  berjalan: "#E07B39",
  gagal: "#E53945",
  belum: "#98A1B5",
};

/** Tanggal saja, dibaca di zona WIB — Puspresnas hanya mencatat tanggal. */
export function tanggalKurasi(iso: string, bahasa: Bahasa): string {
  try {
    return new Date(iso).toLocaleDateString(bahasa === "en" ? "en-GB" : "id-ID", {
      day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta",
    });
  } catch { return String(iso).slice(0, 10); }
}
