// ================================================================
// nesfRegisterConfig.tsx
// Path: src/pages/nesf/register/nesfRegisterConfig.tsx
//
// Single source of truth untuk registrasi NESF:
// tipe, konstanta, logika submit, komponen UI reusable.
// Struktur mengikuti pola registerConfig.tsx IESF.
// Hanya peserta Indonesia (tidak ada ParticipantType).
// Semua teks: Bahasa Indonesia.
// ================================================================

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

// ── Kontak Admin ──────────────────────────────────────────────────
export const WHATSAPP_ADMIN = "628139905880";

// ── GAS Endpoint default (bisa di-override lewat argumen submit) ──
export const NESF_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyR5h25ll0eDrld-0IcSzflrtMx501Je9kfuq3BS_t6aMqHzExp6IuAJoIMjX6W6GaE/exec";

// ── Tipe ──────────────────────────────────────────────────────────
export type CompetitionType = "online" | "offline";
export type FormData        = Record<string, string>;

// ================================================================
// HARGA — ubah di sini jika ada perubahan
// ================================================================
export const CATEGORY_PRICE_MAP: Record<string, string> = {
  // DSCF — Depok Science & Cultural Festival
  "Kompetisi DESF (Depok Engineering Science Fair)": "Rp 350.000",
  "Kompetisi DMO (Depok Math Olympiad)":             "Rp 175.000",
  "Kompetisi DCC (Depok Cultural Competition)":      "Rp 50.000",
};

// ================================================================
// COMPETITION_CATEGORIES
// Alias flat array untuk NesfStepForm (agar import tetap berfungsi).
// Isi dari kategori DSCF offline sebagai default.
// ================================================================
export const COMPETITION_CATEGORIES: string[] = [
  "Kompetisi DESF (Depok Engineering Science Fair)",
  "Kompetisi DMO (Depok Math Olympiad)",
  "Kompetisi DCC (Depok Cultural Competition)",
];

// ── Kategori Sub-Kompetisi per Event (untuk penggunaan per-slug) ──
export const COMPETITION_CATEGORY_OPTIONS: Record<string, Record<CompetitionType, string[]>> = {
  "dscf-2026": {
    offline: [
      "Kompetisi DESF (Depok Engineering Science Fair)",
      "Kompetisi DMO (Depok Math Olympiad)",
      "Kompetisi DCC (Depok Cultural Competition)",
    ],
    online: [], // DSCF hanya offline
  },
};

// ── Kategori Proyek per Event ─────────────────────────────────────
export const PROJECT_CATEGORIES: Record<string, string[]> = {
  "dscf-2026": [
    "Matematika, Sains & Teknologi",
    "Lingkungan",
    "IoT & Robotika",
    "Informatika & Kecerdasan Buatan",
    "Ilmu Hayati",
    "Ilmu Sosial & Humaniora",
    "Fisika, Energi & Teknik",
    "Kesehatan & Kedokteran",
    "Depok Math Olympiad (DMO)",
    "Depok Cultural Competition — Tari",
    "Depok Cultural Competition — MHQ",
  ],
};

// ================================================================
// PARTICIPANT_DIVISIONS
// Dipakai oleh NesfStepForm untuk dropdown divisi peserta.
// ================================================================
export const PARTICIPANT_DIVISIONS: string[] = [
  "SD (Sekolah Dasar)",
  "SMP (Sekolah Menengah Pertama)",
  "SMA/SMK (Sekolah Menengah Atas)",
  "Umum / Komunitas (khusus MHQ)",
];

// ================================================================
// TERMS — Syarat & Ketentuan per format kompetisi
// Dipakai oleh NesfStepTerms.
// ================================================================
export const TERMS: Record<CompetitionType, string[]> = {
  offline: [
    "Peserta merupakan pelajar aktif sesuai jenjang lomba (SD, SMP, SMA), atau umum untuk kategori MHQ, dibuktikan dengan identitas resmi yang masih berlaku.",
    "Seluruh data yang telah diisi tidak dapat diubah setelah batas waktu pembayaran. Pastikan data yang dikirimkan sudah benar dan final.",
    "Peserta wajib menyelesaikan pembayaran sesuai ketentuan panitia. Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan dalam kondisi apapun.",
    "Peserta yang tidak mengumpulkan dokumen yang dipersyaratkan setelah dua kali pengingat akan dianggap mengundurkan diri secara otomatis.",
    "Peserta wajib hadir sesuai jadwal yang telah ditetapkan. Keterlambatan dapat mengurangi waktu penampilan/pengerjaan atau menghilangkan kesempatan tampil.",
    "Untuk DESF: peserta wajib membawa poster ukuran A0, produk, dan salinan makalah lengkap pada sesi penjurian. Presentasi dilakukan dalam Bahasa Indonesia.",
    "Untuk DCC Tari: file musik wajib dikirimkan paling lambat H-14 sebelum acara (format MP3/WAV). Peserta wajib membawa file cadangan pada hari pelaksanaan.",
    "Untuk DCC MHQ: peserta membawa peralatan musik sendiri dan tidak diperkenankan menggunakan peralatan elektronik saat penampilan. Seluruh peserta wajib hadir 30 menit sebelum acara.",
    "Plagiarisme dan kecurangan dilarang keras. Jika terbukti, pendaftaran akan dibatalkan tanpa pengembalian biaya.",
    "Seluruh keputusan dewan juri bersifat final dan tidak dapat diganggu gugat.",
  ],
  online: [
    "Seluruh data yang telah diisi tidak dapat diubah setelah batas waktu pembayaran.",
    "Peserta wajib memastikan koneksi internet yang stabil selama sesi kompetisi online.",
    "Peserta yang tidak mengumpulkan dokumen yang dipersyaratkan setelah dua kali pengingat akan dianggap mengundurkan diri secara otomatis.",
    "Seluruh karya/proyek yang dikumpulkan harus merupakan karya orisinal. Plagiarisme akan mengakibatkan diskualifikasi tanpa pengembalian biaya.",
    "Seluruh keputusan dewan juri bersifat final dan tidak dapat diganggu gugat.",
    "Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan dalam kondisi apapun.",
  ],
};

// ── Field wajib isi ───────────────────────────────────────────────
export const REQUIRED_FIELDS: string[] = [
  "NAMA_LENGKAP",
  "LEADER_WHATSAPP",
  "LEADER_EMAIL",
  "NAMA_SEKOLAH",
  "GRADE",
  "NAME_SUPERVISOR",
  "WHATSAPP_NUMBER_SUPERVISOR",
  "EMAIL_TEACHER_SUPERVISOR",
  "PROJECT_TITLE",
  "CATEGORIES",
  "COMPLETE_ADDRESS",
];

// ================================================================
// submitToNesfSheet
//
// Overload 1 — dipanggil dari NesfStepForm (2 argumen):
//   submitToNesfSheet(competition, form)
//   → pakai NESF_SHEET_URL dan sheetTarget otomatis "nesf-<competition>"
//
// Overload 2 — dipanggil dari flow per-event (4 argumen):
//   submitToNesfSheet(competition, form, sheetUrl, sheetTarget)
//   → pakai sheetUrl dan sheetTarget yang diberikan
//
// Menggunakan image trick untuk bypass CORS (sama dengan IESF).
// ================================================================
export const submitToNesfSheet = async (
  competition: CompetitionType,
  form:        FormData,
  sheetUrl?:   string,
  sheetTarget?: string,
): Promise<void> => {
  const url    = sheetUrl    ?? NESF_SHEET_URL;
  const target = sheetTarget ?? `nesf-${competition}`;
  const f = (key: string) => form[key] ?? "";

  const payload: Record<string, string> = {
    sheetTarget:                target,
    timestamp:                  new Date().toISOString(),
    CATEGORY_COMPETITION:       f("CATEGORY_COMPETITION") || competition,
    NAMA_LENGKAP:               f("NAMA_LENGKAP"),
    LEADER_WHATSAPP:            f("LEADER_WHATSAPP"),
    LEADER_EMAIL:               f("LEADER_EMAIL"),
    SOCIAL_MEDIA:               f("SOCIAL_MEDIA"),
    NAMA_SEKOLAH:               f("NAMA_SEKOLAH"),
    GRADE:                      f("GRADE"),
    NISN_NIM:                   f("NISN_NIM"),
    PROVINCE:                   f("PROVINCE"),
    NAME_SUPERVISOR:            f("NAME_SUPERVISOR"),
    WHATSAPP_NUMBER_SUPERVISOR: f("WHATSAPP_NUMBER_SUPERVISOR"),
    EMAIL_TEACHER_SUPERVISOR:   f("EMAIL_TEACHER_SUPERVISOR"),
    CATEGORIES:                 f("CATEGORIES"),
    PROJECT_TITLE:              f("PROJECT_TITLE"),
    PROJECT_ABSTRACT:           f("PROJECT_ABSTRACT"),
    MEMBER_COUNT:               f("MEMBER_COUNT"),
    DRIVE_LINK:                 f("DRIVE_LINK"),
    YES_NO:                     f("YES_NO"),
    JUDUL_PERNAH_BERPATISIPASI: f("JUDUL_PERNAH_BERPATISIPASI"),
    COMPLETE_ADDRESS:           f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:      f("INFORMATION_RESOURCES"),
    FILE:                       f("FILE"),
    CATEGORY_PRICE:             CATEGORY_PRICE_MAP[f("CATEGORY_COMPETITION")] ?? "",
  };

  const fullUrl = `${url}?${new URLSearchParams(payload).toString()}`;

  // Image trick — bypass CORS, request tetap sampai ke GAS meski browser error
  await new Promise<void>((resolve) => {
    const img = new Image();
    img.onload  = () => resolve();
    img.onerror = () => resolve(); // onerror tetap resolve — request sudah terkirim ke GAS
    img.src     = fullUrl;
    setTimeout(resolve, 8000);    // fallback timeout 8 detik
  });
};

// ================================================================
// Komponen UI Reusable
// (Mengikuti pola IESF: Field dengan error + fieldId, SuccessOverlay)
// ================================================================

export const Field = ({
  label, note, required, children, error, fieldId,
}: {
  label: string; note?: string; required?: boolean;
  children: ReactNode; error?: boolean; fieldId?: string;
}) => (
  <div className="flex flex-col gap-1.5" id={fieldId}>
    <label className="text-sm font-semibold text-foreground">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {note && (
      <p className="text-xs text-muted-foreground leading-5 whitespace-pre-line">{note}</p>
    )}
    <div className={error ? "ring-2 ring-red-400 ring-offset-1 rounded-lg" : ""}>
      {children}
    </div>
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
        <span>⚠</span>
        <span>Wajib diisi</span>
      </p>
    )}
  </div>
);

export const TextInput = ({
  placeholder, value, onChange, type = "text",
}: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <Input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    className="rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary"
  />
);

export const TextArea = ({
  placeholder, value, onChange, maxLength,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; maxLength?: number;
}) => (
  <div className="relative">
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      className="w-full rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none min-h-[100px]"
    />
    {maxLength && (
      <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
        {value.length}/{maxLength}
      </span>
    )}
  </div>
);

export const SelectInput = ({
  placeholder, value, onChange, options,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; options: string[];
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none text-foreground"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

export const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-primary pb-2 mb-5">
    <h3 className="text-lg font-bold text-primary uppercase tracking-wide">{title}</h3>
  </div>
);

export const SuccessOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4 text-center shadow-xl">
      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-foreground">Pendaftaran Berhasil Dikirim!</h2>
      <p className="text-sm text-muted-foreground">
        LoA akan dikirim ke email ketua tim dalam 3 hari kerja.
      </p>
    </div>
  </div>
);