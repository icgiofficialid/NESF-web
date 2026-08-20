// ================================================================
// nesfRegisterConfig.tsx
// Path: src/pages/register/nesfRegisterConfig.tsx
//
// ⚠️ REWRITE — sekarang ini adalah SINGLE SOURCE OF TRUTH untuk
// flow registrasi generik NESF, dipakai oleh SEMUA event NESF
// (Borneo-NESF, dan event NESF berikutnya) KECUALI DSCF (DSCF
// sengaja punya flow terpisah — dscfRegisterConfig.tsx — JANGAN
// disatukan ke sini).
//
// Field, label, urutan section, dan aturan wajib isi di sini
// DISAMAKAN PERSIS dengan RegistrationForm.tsx milik IESF (cabang
// peserta Indonesia) — hanya bahasanya saja yang full Bahasa
// Indonesia (NESF adalah kompetisi nasional, tidak ada pilihan
// kewarganegaraan/COUNTRY seperti IESF).
//
// CARA KERJA UNTUK EVENT BARU (tanpa bikin file register baru lagi):
//   1. Tambahkan entry event baru di src/config/eventRegistry.ts
//      (isi pricing, sheet.sheetUrl, sheet.targets, dst).
//   2. Buat file data konten di src/config/events/<slug>.ts
//   3. Buat halaman detail (boleh custom, atau pakai EventDetailPage
//      generik) yang tombol "Daftar"-nya navigate ke `/register/<slug>`.
//   4. Selesai — NesfRegister.tsx otomatis baca slug dari URL,
//      ambil sheetUrl/sheetTarget/pricing dari eventRegistry, dan
//      pakai komponen di file ini apa adanya. TIDAK PERLU file
//      register baru per event lagi.
// ================================================================

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

// ── Kontak Admin ──────────────────────────────────────────────────
export const WHATSAPP_ADMIN = "628139905880";

// ── Tipe ──────────────────────────────────────────────────────────
// Sengaja TIDAK ada ParticipantType/COUNTRY — semua event NESF
// adalah kompetisi nasional, peserta selalu Indonesia.
export type CompetitionType = "online" | "offline";
export type FormData        = Record<string, string>;

// ── Label format kompetisi (dipakai untuk key harga & payload) ────
// KEY di sini HARUS sama persis dengan key yang dipakai di
// `pricing` pada tiap entry EVENTS_REGISTRY (src/config/eventRegistry.ts).
export const FORMAT_LABEL: Record<CompetitionType, string> = {
  online:  "Online Competition",
  offline: "Offline Competition",
};

// ================================================================
// HARGA — FALLBACK DEFAULT saja (dipakai kalau event yang aktif
// tidak mengisi field `pricing` di eventRegistry.ts sama sekali).
// Harga sesungguhnya selalu per-event, lihat `pricing` di
// eventRegistry.ts (pola sama persis dengan IESF).
// ================================================================
export const DEFAULT_CATEGORY_PRICE_MAP: Record<string, string> = {
  "Online Competition":  "",
  "Offline Competition": "",
};

// ================================================================
// PROJECT_CATEGORIES — sama persis (diterjemahkan) dengan
// PROJECT_CATEGORIES di RegistrationForm.tsx (IESF). Konstanta
// global, dipakai semua event NESF (bukan per-event), mengikuti
// pola aslinya di IESF.
// ================================================================
export const PROJECT_CATEGORIES: string[] = [
  "Matematika, Sains & Teknologi",
  "Lingkungan",
  "IoT & Robotika",
  "Informatika & Kecerdasan Buatan",
  "Ilmu Hayati",
  "Ilmu Sosial & Humaniora",
  "Fisika, Energi & Teknik",
  "Kesehatan & Kedokteran",
];

// ── Jenjang peserta (setara "Grade / Year" IESF: Elementary/Secondary/University) ─
export const GRADE_OPTIONS: string[] = [
  "SD / Sederajat",
  "SMP–SMA / Sederajat",
  "Perguruan Tinggi / Universitas",
];

// ── Sumber informasi (setara infoSources IESF, versi Indonesia) ───
export const INFO_SOURCES: string[] = [
  "Instagram", "WhatsApp", "Teman/Guru", "Website", "YouTube", "Lainnya",
];

// ================================================================
// TERMS — Syarat & Ketentuan per format kompetisi (Bahasa Indonesia).
// Konstanta global dipakai semua event NESF, sama seperti IESF yang
// pakai 1 set terms.json untuk semua event-nya.
// ================================================================
export const TERMS: Record<CompetitionType, string[]> = {
  offline: [
    "Peserta merupakan pelajar aktif jenjang SD, SMP, SMA, atau mahasiswa aktif, dibuktikan dengan identitas resmi yang masih berlaku.",
    "Setiap tim beranggotakan maksimal 4 orang (1 ketua & 3 anggota) dan wajib didampingi 1 pembimbing.",
    "Seluruh data yang telah diisi tidak dapat diubah setelah batas waktu pembayaran. Pastikan data yang dikirimkan sudah benar dan final.",
    "Peserta wajib menyelesaikan pembayaran sesuai ketentuan panitia. Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan dalam kondisi apapun.",
    "Setiap tim wajib membawa poster ukuran A0 dan mendekorasi booth/meja yang disediakan panitia. Perlengkapan dekorasi lain menjadi tanggung jawab peserta.",
    "Penilaian dilakukan oleh dewan juri dalam dua tahap: review dokumen dan presentasi langsung di booth (7 menit presentasi + 8 menit tanya-jawab).",
    "Peserta dengan skor tertinggi akan diseleksi untuk mengikuti Sesi Penjurian Privat.",
    "Plagiarisme dan kecurangan dalam bentuk apapun dilarang keras. Jika terbukti, pendaftaran akan dibatalkan tanpa pengembalian biaya.",
    "Seluruh keputusan dewan juri bersifat final dan tidak dapat diganggu gugat.",
  ],
  online: [
    "Peserta merupakan pelajar aktif jenjang SD, SMP, SMA, atau mahasiswa aktif, dibuktikan dengan identitas resmi yang masih berlaku.",
    "Setiap tim beranggotakan maksimal 4 orang (1 ketua & 3 anggota) dan wajib didampingi 1 pembimbing.",
    "Seluruh data yang telah diisi tidak dapat diubah setelah batas waktu pembayaran.",
    "Peserta wajib memastikan koneksi internet yang stabil selama sesi penjurian melalui Zoom, serta menampilkan produk saat presentasi.",
    "Penilaian dilakukan oleh dewan juri dalam dua tahap: review dokumen dan presentasi langsung via Zoom (7 menit presentasi + 8 menit tanya-jawab).",
    "Seluruh karya/proyek yang dikumpulkan harus orisinal. Plagiarisme mengakibatkan diskualifikasi tanpa pengembalian biaya.",
    "Seluruh keputusan dewan juri bersifat final dan tidak dapat diganggu gugat.",
    "Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan dalam kondisi apapun.",
  ],
};

// ================================================================
// Field wajib isi — DISAMAKAN PERSIS dengan getRequired() di
// RegistrationForm.tsx (IESF, cabang peserta Indonesia).
// Sengaja TIDAK wajib (sama seperti IESF): SOCIAL_MEDIA, YES_NO,
// JUDUL_PERNAH_BERPATISIPASI, FILE.
// ================================================================
export const getRequired = (): string[] => [
  "NAMA_LENGKAP",
  "LEADER_WHATSAPP_NUM",
  "LEADER_EMAIL",
  "NISN_NIM",
  "NAMA_SEKOLAH",
  "NPSN",
  "GRADE",
  "PROVINCE",
  "NAME_SUPERVISOR",
  "SUPERVISOR_WA_NUM",
  "EMAIL_TEACHER_SUPERVISOR",
  "PROJECT_TITLE",
  "CATEGORIES",
  "COMPLETE_ADDRESS",
  "INFORMATION_RESOURCES",
];

// ================================================================
// normalizePhone — rapikan nomor WhatsApp ke format +62xxxxxxxxxx.
// NESF selalu Indonesia, jadi kode negara di-fix ke +62 (tidak perlu
// dropdown kode negara penuh seperti di form IESF).
// ================================================================
export const normalizePhone62 = (raw: string): string => {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2); // 0062xxx → 62xxx
  if (digits.startsWith("62"))  digits = digits.slice(2); // 62xxx  → xxx
  digits = digits.replace(/^0+/, "");                     // 0812xx → 812xx
  return digits ? `+62${digits}` : "";
};

// ================================================================
// submitToSheet
// Payload key & struktur DISAMAKAN PERSIS dengan submitToSheet() di
// registerConfig.tsx (IESF) cabang Indonesia — hanya field COUNTRY
// yang dihilangkan (tidak relevan untuk kompetisi nasional).
// sheetUrl & sheetTarget WAJIB dikirim oleh caller (diambil dari
// getSheetConfig() di eventRegistry.ts).
// Menggunakan image trick untuk bypass CORS (sama dengan IESF).
// ================================================================
export const submitToSheet = async (
  sheetUrl: string,
  sheetTarget: string,
  competition: CompetitionType,
  form: FormData,
): Promise<void> => {
  const f = (key: string) => form[key] || "";

  const payload: Record<string, string> = {
    sheetTarget,
    timestamp:                  new Date().toISOString(),
    CATEGORY_PARTICIPANT:       "indonesian",
    CATEGORY_COMPETITION:       f("CATEGORY_COMPETITION") || FORMAT_LABEL[competition],
    NAMA_SEKOLAH:                f("NAMA_SEKOLAH"),
    NAMA_LENGKAP:                f("NAMA_LENGKAP"),
    GRADE:                       f("GRADE"),
    LEADER_EMAIL:                f("LEADER_EMAIL"),
    LEADER_WHATSAPP:             f("LEADER_WHATSAPP"),
    SOCIAL_MEDIA:                f("SOCIAL_MEDIA"),
    NISN_NIM:                    f("NISN_NIM"),
    NPSN:                        f("NPSN"),
    PROVINCE:                    f("PROVINCE"),
    NAME_SUPERVISOR:             f("NAME_SUPERVISOR"),
    WHATSAPP_NUMBER_SUPERVISOR:  f("WHATSAPP_NUMBER_SUPERVISOR"),
    EMAIL_TEACHER_SUPERVISOR:    f("EMAIL_TEACHER_SUPERVISOR"),
    COMPLETE_ADDRESS:            f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:       f("INFORMATION_RESOURCES"),
    FILE:                        f("FILE"),
    YES_NO:                      f("YES_NO"),
    JUDUL_PERNAH_BERPATISIPASI:  f("JUDUL_PERNAH_BERPATISIPASI"),
    CATEGORY_PRICE:              f("CATEGORY_PRICE"),
    CATEGORIES:                  f("CATEGORIES"),
    PROJECT_TITLE:               f("PROJECT_TITLE"),
  };

  const fullUrl = `${sheetUrl}?${new URLSearchParams(payload).toString()}`;

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
// Komponen UI Reusable (pola & styling sama persis dengan
// registerConfig.tsx IESF, teks di-Indonesia-kan)
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