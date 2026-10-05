// ================================================================
// eventRegistry.ts
// Path: src/config/eventRegistry.ts
//
// ✅  SINGLE SOURCE OF TRUTH untuk semua event NESF.
//
// CARA MENAMBAH EVENT BARU:
//   1. Tambahkan entry di EVENTS_REGISTRY di bawah.
//   2. Buat file detail data di src/config/events/<slug>.ts
//   3. Route sudah otomatis via <EventDetailPage slug="..." />
//   4. Tidak perlu ubah file lain sama sekali.
//
// ⚠️ UPDATE: menambahkan field opsional `heroGradient` &
//    `coverImage` / `coverImageLandscape` pada EventMeta agar
//    konsisten dengan registry IESF dan dipakai oleh
//    NesfUpcomingEvents.tsx / NesfIndex.tsx untuk menampilkan
//    kartu event (termasuk DSCF) di halaman beranda & daftar event.
//
// ⚠️ UPDATE 2: tambahkan field opsional `pricing` (mengikuti pola
//    IESF) — harga per kategori kompetisi, dibaca oleh
//    borneoNesfRegisterConfig.tsx. Ditambahkan entry event baru:
//    borneonesf-2026 (Borneo National Science Fair).
// ================================================================

import { fluentValidationResolver } from "@hookform/resolvers/fluentvalidation-ts";

export type ParticipantType = "international" | "indonesian";
export type CompetitionType = "online" | "offline";

// ── Per-event sheet config ────────────────────────────────────────
// Setiap kombinasi participant × competition punya sheetTarget-nya sendiri.
// sheetUrl bisa sama (1 GAS deployment) atau berbeda per event.
export interface SheetConfig {
  sheetUrl: string;
  targets: {
    "indo-online":   string;
    "indo-offline":  string;
    "inter-online":  string;
    "inter-offline": string;
  };
}

export interface GalleryAlbum {
  title: string;
  /** Foto cover card (URL Cloudinary dsb.) */
  coverImage: string;
  /** Link folder Google Drive */
  driveUrl: string;
  description?: string;
  photos?: string[];
}

// ── Tipe meta event (untuk listing, card, dsb.) ───────────────────
export interface EventMeta {
  /** Unik slug — dipakai di URL /events/<slug> */
  slug: string;
  /** Nama lengkap event */
  title: string;
  /** Edisi / tahun singkat */
  subtitle: string;
  /** Lokasi acara */
  location: string;
  /** Rentang tanggal */
  dateRange: string;
  /** Deadline pendaftaran */
  registrationDeadline: string;
  /** Konfigurasi Google Sheets per kombinasi peserta × format */
  sheet: SheetConfig;
  /** Path route di App.tsx — biasanya /events/<slug> */
  route: string;
  /** Status event */
  status: "upcoming" | "past" | "ongoing";
  /** Apakah pendaftaran dibuka? */
  registrationOpen: boolean;
    /** Set true untuk menyembunyikan event dari semua halaman web */
  shutdown: boolean;
  /** Opsional: pesan alasan shutdown (hanya untuk catatan internal) */
  shutdownNote?: string;
    /** URL gambar cover dari Cloudinary (opsional, jika tidak ada pakai gradient) */
  coverImage?: string;
  coverImageLandscape?: string;
  /** Gradient untuk hero/card jika tidak ada coverImage */
  heroGradient?: string;
  /** Warna aksen untuk event */
  accentColor?: string;
  /** Harga per kategori kompetisi (opsional — kalau kosong pakai default di registerConfig) */
  pricing?: Record<string, string>;
  /**
   * Kalau diisi, event ini pendaftaran & detailnya ambil dari dashboard ICGI
   * (bukan Google Sheet) — isi dengan akronim event tsb di dashboard, mis.
   * "BORNEONESF". SENGAJA TIDAK diisi untuk dscf-2026 & borneo-nesf-2026
   * yang sekarang — appscript yang sudah jalan untuk keduanya dibiarkan
   * apa adanya.
   */
  dashboardAcronym?: string;
    /** Album dokumentasi (dipakai halaman /past-events/:slug) */
  gallery?: GalleryAlbum[];
}

// ================================================================
// ✏️  EDIT DI SINI — daftarkan semua event
// ================================================================
export const EVENTS_REGISTRY: EventMeta[] = [
 {
    slug:                 "dscf-2026",
    title:                "Depok Science & Cultural Festival",
    subtitle:             "DSCF 2026",
    location:             "Depok, Indonesia",
    dateRange:            "29 September – 2 Oktober 2026",
    registrationDeadline: "24 Agustus 2026",
    status:               "past",
    registrationOpen:     false,
    route:                "/events/dscf-2026",
    shutdown:             false,
    heroGradient:         "from-amber-700 via-yellow-600 to-amber-800",
    accentColor:          "38 92% 50%", 
    coverImage:           "https://res.cloudinary.com/dwhobhexj/image/upload/v1783324813/dscf-potret_idalof.jpg",
    coverImageLandscape:  "https://res.cloudinary.com/dwhobhexj/image/upload/v1783324812/dscf-landscape_lygnsu.jpg",
    gallery: [
      {
        title: "Album DSCF 2026",
        description: "29 September – 2 Oktober 2026",
        coverImage: "https://res.cloudinary.com/dwhobhexj/image/upload/v1783324813/dscf-potret_idalof.jpg",
        driveUrl: "https://drive.google.com/drive/u/0/folders/1Y8-YysJttsW7Vn-hPj11JvRKt_R_XUMx",
        photos: [
          "https://drive.google.com/file/d/1N0wDtGv4BJUMPXmAz-fiyqNq_t7gHfFj/view?usp=drive_link",
          "https://drive.google.com/file/d/1XhC4CyZzUzCFED1a7YAMjEWpjNNk45U_/view?usp=drive_link",
          "https://drive.google.com/file/d/1diz2NQ_-382l-seb8IeXd1-n0NlpZ6yk/view?usp=drive_link",
          "https://drive.google.com/file/d/1Ez7VutO8mKWaHk5Czbg_QBORJSMthGiN/view?usp=drive_link",
          "https://drive.google.com/file/d/1qznbPV2Gj1tZMPJ4bvaM7vc960X3UN4T/view?usp=drive_link",
          "https://drive.google.com/file/d/1dZy9gROFQzMioibI6LRm0b7gl6hBa5ly/view?usp=drive_link",
          "https://drive.google.com/file/d/1hE4VEfxScQwEqsLcw4ptzs7lGl3yz-p2/view?usp=drive_link",
          "https://drive.google.com/file/d/12aZ3I7M-lIhNLZdLcPy4pgtUqM2tafNX/view?usp=drive_link",
          "https://drive.google.com/file/d/1iwx2VhJYeyJ_ynHuGJIf9LF_JrqV315P/view?usp=drive_link",
          "https://drive.google.com/file/d/1YyRoirP5fXGsDRrTZKyRFLIY2QqUdyPG/view?usp=drive_link",
          "https://drive.google.com/file/d/10NdBXROLfOOnoBjc_ypwIRj5bJnTxz2A/view?usp=drive_link",
          "https://drive.google.com/file/d/1hxnp37Yx9cAxVjfr6bZZguxGlLvlUpGZ/view?usp=drive_link",

        ],
      },
    ],
    sheet: {
      // Ganti dengan URL GAS deploymen milik DSCF
      sheetUrl: "https://script.google.com/macros/s/AKfycbzz8NDKfyJgcTkGOqwY_-ZkQpFWbJbzERlUK1rUzmcB_aRUJ8hXtG_Z1kI6C0xcZJkA/exec",
      targets: {
        "indo-online":   "indo-online",
        "indo-offline":  "indo-offline",
        // inter tidak dipakai untuk DSCF — biarkan isi placeholder
        "inter-online":  "",
        "inter-offline": "",
      },
    },
  },

  {
    slug:                 "borneo-nesf-2026",
    title:                "Borneo National Science Fair",
    subtitle:             "Borneo-NESF 2026",
    location:             "Palangka Raya, Kalimantan Tengah, Indonesia",
    dateRange:            "27–30 November 2026",
    registrationDeadline: "27 Oktober 2026",
    status:               "upcoming",
    // ⚠️ Set true setelah sheetUrl asli & cover image sudah final
    registrationOpen:     true,
    route:                "/events/borneo-nesf-2026",
    shutdown:             false,
    coverImage:           "https://res.cloudinary.com/dwhobhexj/image/upload/v1787221796/BorneoNESF-potret_nks3ri.png",
    coverImageLandscape:  "https://res.cloudinary.com/dwhobhexj/image/upload/v1787225619/BorneoNESF-landscape_gyuaby.png",
    heroGradient:         "from-[#0B2B1E] via-[#133326] to-[#2F6B4F]",
    accentColor:          "38 92% 50%",

    // Harga BorneoNESF — kompetisi nasional, tanpa tarif internasional (USD).
    // Ubah bebas di sini kalau ada perubahan.
    pricing: {
      "Online Competition":                                                                                                       "IDR 750.000",
      "Offline Competition":                                                                                                      "IDR 3.000.000",
      "Online Competition (E-Certificate Only)":                                                                                  "USD 50",
      "Online Competition + one medal/team and Certificate for each member + shipping fee (SOUTH EAST ASIA)":                     "USD 225",
      "Online Competition + one medal/team and Certificate for each member + shipping fee (Exclude SOUTH EAST ASIA)":             "USD 275",
      "Offline Competition (International)":                                                                                      "USD 400",
    },

    sheet: {
      // TODO: ganti dengan URL GAS deployment khusus BorneoNESF
      sheetUrl: "https://script.google.com/macros/s/AKfycbwJD0Wr6hWUz0HhgXqMPq-MilC48w8dZE6lI6_nc0mazgGlX5VBg0UAL9uFo9E2moqScg/exec",
      targets: {
        "indo-online":   "indo-online",
        "indo-offline":  "indo-offline",
        "inter-online":  "",
        "inter-offline": "",
      },
    },
  },

];

// ── Helper — cari event by slug ───────────────────────────────────
export const getEventMeta = (slug: string): EventMeta | undefined =>
  EVENTS_REGISTRY.find(e => e.slug === slug && !e.shutdown);

// Tambah helper baru untuk listing (filter shutdown + sort ongoing dulu)
export const getVisibleEvents = (): EventMeta[] =>
  EVENTS_REGISTRY
    .filter(e => !e.shutdown)
    .sort((a, b) => {
      const order = { ongoing: 0, upcoming: 1, past: 2 };
      return order[a.status] - order[b.status];
    });

// ── Helper — ambil sheet config ───────────────────────────────────
export const getSheetConfig = (
  slug: string,
  participant: ParticipantType,
  competition: CompetitionType
): { sheetUrl: string; sheetTarget: string } | null => {
  const meta = getEventMeta(slug);
  if (!meta) return null;
  const key = `${participant === "indonesian" ? "indo" : "inter"}-${competition}` as keyof SheetConfig["targets"];
  return {
    sheetUrl:    meta.sheet.sheetUrl,
    sheetTarget: meta.sheet.targets[key],
  };
};