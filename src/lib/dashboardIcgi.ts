// ================================================================
// dashboardIcgi.ts — NESF-web
//
// Menyambungkan portal ini ke dashboard ICGI (dashboard.icgi.or.id,
// backend api-dashboard.iysa.or.id) lewat API publik yang sama dengan
// situs event lain: /api/public/v1.
//
// Saat situs dibuka, event milik lembaga ICGI yang situs resminya
// nesfofficial.or.id dimuat dari dashboard, lalu DIGABUNGKAN ke
// EVENTS_REGISTRY dan newsItems. Semua halaman yang sudah ada (daftar
// event, detail, dokumentasi, berita, pesan siaran, kurasi) membaca
// registry itu, jadi otomatis ikut berisi data dashboard:
//
//   - Event baru     → dibuat di dashboard (lembaga ICGI, website
//                      https://nesfofficial.or.id/events/<slug>)
//   - Pendaftaran    → formulir sisipan dashboard (daftar.js)
//   - Galeri         → Dokumentasi edisi di dashboard
//   - Berita         → Publikasi edisi di dashboard
//   - Pesan siaran   → Publikasi › Press Release
//   - Kurasi         → berkas kurasi yang ditandai untuk disiarkan
//
// Hanya lembaga ICGI. Event IYSA dan IYORA tidak pernah ikut.
// Event yang sudah ditulis di eventRegistry.ts (DSCF, Borneo-NESF)
// tetap memakai halaman & alur lamanya; dashboard hanya MENAMBAH
// galeri, berita, pesan siaran, dan kurasinya.
// ================================================================

import { EVENTS_REGISTRY, type EventMeta, type GalleryAlbum, type DriveResource } from "@/config/eventRegistry";
import { newsItems, type NewsItem } from "@/config/newsData";

export const DASHBOARD_API =
  ((import.meta.env.VITE_BE_ICGI_API_URL as string | undefined) || "https://api-dashboard.iysa.or.id").replace(/\/+$/, "");

/** Lembaga pemilik portal ini di dashboard. */
const LEMBAGA = "ICGI";
/** Situs resmi event yang dilayani portal ini. Event ICGI lain (IESF, ICC) punya situsnya sendiri. */
const HOST_PORTAL = "nesfofficial.or.id";
/** Batas tunggu total — lewat dari ini situs tetap tampil dengan data lokal. */
const BATAS_MS = 6000;

const SEKSI = "identitas,pendaftaran,publikasi,dokumentasi,berkas_kurasi";

// ── Tipe data API publik (yang dipakai saja) ──────────────────────
interface Seri {
  akronim: string;
  nama?: string;
  slug: string;
  tahun: string;
  situs: string;
  lembaga?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bentuk isi berbeda per seksi
interface Seksi { key: string; isi: any }
interface Tautan { id?: string; link?: string; judul?: string; gambar?: string }
interface Foto { id?: string; label?: string; gambar?: string; link?: string }

// ── Utilitas ──────────────────────────────────────────────────────
async function ambil<T>(path: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(`${DASHBOARD_API}${path}`, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}`);
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message ?? path);
  return json.data as T;
}

function hostSitus(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; }
}

const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
function tgl(iso: string): { d: number; m: number; y: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  return m ? { y: +m[1], m: +m[2] - 1, d: +m[3] } : null;
}
/** "2026-08-24" → "24 Agustus 2026" */
export function tanggalIndo(iso: string): string {
  const t = tgl(iso);
  return t ? `${t.d} ${BULAN[t.m]} ${t.y}` : "";
}
/** Rentang gaya registry: "29 September – 2 Oktober 2026", "27–30 November 2026". */
export function rentangIndo(mulai: string, selesai: string): string {
  const a = tgl(mulai), b = tgl(selesai || mulai);
  if (!a || !b) return "TBA";
  if (a.y === b.y && a.m === b.m && a.d === b.d) return `${a.d} ${BULAN[a.m]} ${a.y}`;
  if (a.y === b.y && a.m === b.m) return `${a.d}–${b.d} ${BULAN[b.m]} ${b.y}`;
  if (a.y === b.y) return `${a.d} ${BULAN[a.m]} – ${b.d} ${BULAN[b.m]} ${b.y}`;
  return `${a.d} ${BULAN[a.m]} ${a.y} – ${b.d} ${BULAN[b.m]} ${b.y}`;
}

function statusDari(mulai: string, selesai: string): EventMeta["status"] {
  const now = new Date();
  const a = tgl(mulai), b = tgl(selesai || mulai);
  if (a && now < new Date(a.y, a.m, a.d)) return "upcoming";
  if (b && now > new Date(b.y, b.m, b.d, 23, 59, 59)) return "past";
  return a ? "ongoing" : "upcoming";
}

// ── Pemetaan: Dokumentasi → album galeri ──────────────────────────
const JUDUL_DOK: Record<string, string> = {
  offline: "Dokumentasi Luring",
  online: "Dokumentasi Daring",
  sarpras: "Sarana & Prasarana",
};

function albumDari(dokumentasi: Array<{ jenis: string; isi: Foto[] }>, keterangan: string): GalleryAlbum[] {
  const foto: Record<string, string[]> = {};
  const tautan: Record<string, string> = {};
  for (const g of dokumentasi ?? []) {
    const m = /^(.*?)(Docs|Link)$/.exec(g.jenis || "");
    if (!m) continue;
    const kunci = m[1];
    if (m[2] === "Docs") {
      foto[kunci] = g.isi.map(f => f.gambar || "").filter(Boolean);
    } else {
      const link = g.isi[0]?.link || "";
      if (link) tautan[kunci] = link;
    }
  }
  const urut = ["offline", "online", "sarpras", ...Object.keys({ ...foto, ...tautan })];
  const sudah = new Set<string>();
  const hasil: GalleryAlbum[] = [];
  for (const k of urut) {
    if (sudah.has(k)) continue;
    sudah.add(k);
    const photos = foto[k] ?? [];
    const driveUrl = tautan[k] ?? "";
    if (photos.length === 0 && !driveUrl) continue;
    hasil.push({
      title: JUDUL_DOK[k] ?? `Dokumentasi ${k}`,
      description: keterangan,
      coverImage: photos[0] ?? "",
      driveUrl,
      photos,
    });
  }
  return hasil;
}

// ── Pemetaan: Publikasi → berita ──────────────────────────────────
const KATEGORI_PUB: Record<string, string> = {
  mediaLinks: "Liputan Media",
  newsletter: "Newsletter",
  pressRelease: "Pesan Siaran",
  youtube: "Video",
  instagram: "Instagram",
};
/** Tautan ke halaman pesan siaran portal ini sendiri — tidak dijadikan berita. */
const TAUTAN_SENDIRI = /nesfofficial\.or\.id\/press-releases/i;

function beritaDari(
  publikasi: Array<{ jenis: string; isi: Tautan[] }>,
  meta: { slug: string; title: string; subtitle: string; tanggal: string },
): NewsItem[] {
  const hasil: NewsItem[] = [];
  for (const kanal of ["mediaLinks", "newsletter", "pressRelease", "youtube", "instagram"]) {
    const g = (publikasi ?? []).find(p => p.jenis === kanal);
    for (const item of g?.isi ?? []) {
      if (!item.link || TAUTAN_SENDIRI.test(item.link)) continue;
      const kategori = KATEGORI_PUB[kanal];
      const judul = item.judul || `${kategori} ${meta.subtitle}`;
      hasil.push({
        slug: `${meta.slug}-${kanal}-${item.id || hasil.length}`.toLowerCase(),
        category: kategori,
        date: meta.tanggal,
        title: judul,
        excerpt: `${kategori} · ${meta.title} (${meta.subtitle})`,
        content: "",
        coverImage: item.gambar || undefined,
        tags: [meta.subtitle, kategori],
        externalUrl: item.link,
        eventSlug: meta.slug,
      });
    }
  }
  return hasil;
}

function pesanSiaranDari(publikasi: Array<{ jenis: string; isi: Tautan[] }>): string | undefined {
  const g = (publikasi ?? []).find(p => p.jenis === "pressRelease");
  return g?.isi.map(x => x.link || "").find(l => l && !TAUTAN_SENDIRI.test(l));
}

// ── Pemetaan: berkas kurasi → sumber Drive ────────────────────────
function kurasiDari(butir: Array<{ nomor: number; butir: string; berkas: Array<{ slot?: string; nama?: string; url?: string }> }>): DriveResource[] {
  const hasil: DriveResource[] = [];
  for (const b of Array.isArray(butir) ? butir : []) {
    for (const f of b.berkas ?? []) {
      if (!f.url) continue;
      hasil.push({
        title: f.slot || f.nama || `Butir ${b.nomor}`,
        description: `Butir ${b.nomor} · ${b.butir}`,
        driveUrl: f.url,
        mode: "all",
      });
    }
  }
  return hasil;
}

// ── Satu edisi → EventMeta ────────────────────────────────────────
function metaDari(akronim: string, sections: Seksi[], dipin: boolean): { meta: EventMeta; berita: NewsItem[] } | null {
  const s = (k: string) => sections.find(x => x.key === k)?.isi;
  const id = s("identitas") ?? {};
  if (!id.slug) return null;
  /* Pagar kedua: hanya ICGI, apa pun yang dikirim server. */
  if (String(id.lembaga?.singkatan ?? "").toUpperCase() !== LEMBAGA) return null;

  const tahun = String(id.tahun || "");
  const judul = String(id.nama || akronim).replace(/\s+20\d{2}\s*$/, "");
  const subtitle = `${akronim}${tahun ? ` ${tahun}` : ""}`;
  const daftar = s("pendaftaran") ?? {};
  const lokasi = id.lokasi?.luring || id.lokasi?.daring || "Indonesia";
  const tanggalAkhir = tanggalIndo(id.selesai || id.mulai) || tahun;

  const meta: EventMeta = {
    slug: id.slug,
    title: judul,
    subtitle,
    location: lokasi,
    dateRange: rentangIndo(id.mulai, id.selesai),
    year: tahun ? Number(tahun) : undefined,
    registrationDeadline: tanggalIndo(id.pendaftaran_tutup) || "TBA",
    sheet: { sheetUrl: "", targets: { "indo-online": "", "indo-offline": "", "inter-online": "", "inter-offline": "" } },
    route: `/events/${id.slug}`,
    status: statusDari(id.mulai, id.selesai),
    /* Formulir sisipan selalu melayani edisi yang dipin — edisi lama tidak bisa didaftari. */
    registrationOpen: dipin && Boolean(daftar.dibuka ?? id.pendaftaran_dibuka),
    shutdown: false,
    coverImage: id.banner || id.logo || undefined,
    coverImageLandscape: id.banner || undefined,
    dashboardAcronym: akronim,
    dashboardYear: tahun || undefined,
    seriDashboard: akronim,
    seriTahun: tahun || undefined,
    gallery: albumDari(s("dokumentasi") ?? [], rentangIndo(id.mulai, id.selesai)),
    pressReleaseUrl: pesanSiaranDari(s("publikasi") ?? []),
    curation: kurasiDari(s("berkas_kurasi") ?? []),
  };
  const berita = beritaDari(s("publikasi") ?? [], { slug: id.slug, title: judul, subtitle, tanggal: tanggalAkhir });
  meta.newsSlugs = berita.map(b => b.slug);
  return { meta, berita };
}

/** Gabungkan ke event yang sudah ditulis di registry: hanya mengisi/menambah, tidak mengganti alurnya. */
function gabungKeStatis(statis: EventMeta, dash: EventMeta) {
  statis.gallery = [...(dash.gallery ?? []), ...(statis.gallery ?? [])];
  statis.newsSlugs = [...(dash.newsSlugs ?? []), ...(statis.newsSlugs ?? [])];
  if (!statis.pressReleaseUrl && dash.pressReleaseUrl) statis.pressReleaseUrl = dash.pressReleaseUrl;
  const kurasiKosong = (statis.curation ?? []).every(c => !c.driveUrl);
  if (kurasiKosong && (dash.curation ?? []).length) statis.curation = dash.curation;
  if (!statis.year && dash.year) statis.year = dash.year;
  // Seri & tahun di dashboard — untuk Proses Kurasi. Sengaja BUKAN
  // dashboardAcronym: itu memindahkan detail & pendaftaran ke dashboard.
  statis.seriDashboard = dash.seriDashboard;
  statis.seriTahun = dash.seriTahun;
}

/** Seri dashboard milik portal ini (untuk halaman Kurasi), urut akronim. */
export const seriPortal: Array<{ akronim: string; nama: string }> = [];
/** Slug edisi → akronim seri dashboard (gelembung Proses Kurasi mengikuti halaman). */
export const slugKeSeri: Record<string, string> = {};

let sudahDimuat: Promise<void> | null = null;

/**
 * Muat event ICGI dari dashboard dan gabungkan ke registry. Dipanggil sekali
 * di main.tsx sebelum aplikasi dirender. Tidak pernah melempar: kalau
 * dashboard tidak terjangkau, situs tetap tampil dengan data lokal.
 */
export function muatEventDashboard(): Promise<void> {
  if (sudahDimuat) return sudahDimuat;
  sudahDimuat = (async () => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), BATAS_MS);
    try {
      const { seri } = await ambil<{ seri: Seri[] }>(`/api/public/v1/_seri?lembaga=${LEMBAGA}`, ctrl.signal);
      const milikPortal = seri.filter(x =>
        String(x.lembaga ?? LEMBAGA).toUpperCase() === LEMBAGA && hostSitus(x.situs) === HOST_PORTAL);

      for (const x of milikPortal) {
        seriPortal.push({ akronim: x.akronim.toUpperCase(), nama: String(x.nama || x.akronim).replace(/\s+20\d{2}\s*$/, "") });
      }

      const per = await Promise.all(milikPortal.map(async (x) => {
        const akronim = x.akronim.toUpperCase();
        let edisi: Array<{ tahun: string; dipin: boolean }> = [{ tahun: x.tahun, dipin: true }];
        try {
          const d = await ambil<{ edisi: Array<{ tahun: string; dipin: boolean }> }>(
            `/api/public/v1/${encodeURIComponent(akronim)}/edisi`, ctrl.signal);
          if (d.edisi?.length) edisi = d.edisi.filter(e => e.tahun);
        } catch { /* cukup edisi yang dipin */ }

        return Promise.all(edisi.map(async (e) => {
          try {
            const q = e.dipin ? `?sections=${SEKSI}` : `?tahun=${encodeURIComponent(e.tahun)}&sections=${SEKSI}`;
            const d = await ambil<{ sections: Seksi[] }>(`/api/public/v1/${encodeURIComponent(akronim)}${q}`, ctrl.signal);
            return metaDari(akronim, d.sections ?? [], e.dipin);
          } catch { return null; }
        }));
      }));

      for (const hasil of per.flat()) {
        if (!hasil) continue;
        const { meta, berita } = hasil;
        if (meta.seriDashboard) slugKeSeri[meta.slug] = meta.seriDashboard;
        for (const b of berita) if (!newsItems.some(n => n.slug === b.slug)) newsItems.push(b);
        const statis = EVENTS_REGISTRY.find(e => e.slug === meta.slug);
        if (statis) gabungKeStatis(statis, meta);
        else EVENTS_REGISTRY.push(meta);
      }
    } catch (err) {
      console.warn("[dashboard-icgi] data dashboard tidak termuat, memakai data lokal:", err);
    } finally {
      clearTimeout(timer);
    }
  })();
  return sudahDimuat;
}
