// ================================================================
// dscfRegisterConfig.tsx
// Path: src/pages/nesf/register/dscfRegisterConfig.tsx
//
// Single source of truth untuk registrasi DSCF 2026:
// tipe, harga, terms, field wajib per sub-event, submit ke GAS,
// dan komponen UI reusable.
//
// Pola: peserta Indonesia only, hanya offline.
// Sub-event: DESF · DMO · DCC
// ================================================================

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

// ── Tipe ──────────────────────────────────────────────────────────
export type DscfSubEvent = "desf" | "dmo" | "dcc";
export type FormData     = Record<string, string>;

// ── Label tampilan per sub-event ──────────────────────────────────
export const DSCF_SUB_LABELS: Record<DscfSubEvent, string> = {
  desf: "Depok Engineering Science Fair (DESF)",
  dmo:  "Depok Math Olympiad (DMO)",
  dcc:  "Depok Cultural Competition (DCC)",
};

// ── Harga pendaftaran ─────────────────────────────────────────────
export const DSCF_PRICE_MAP: Record<DscfSubEvent, string> = {
  desf: "Rp 350.000 / tim",
  dmo:  "Rp 175.000 / peserta",
  dcc:  "Rp 50.000 / tim",
};

// ── GAS Endpoint DSCF ─────────────────────────────────────────────
export const DSCF_SHEET_URL =
  "https://script.google.com/macros/s/YOUR_DSCF_GAS_URL_HERE/exec";

// Sheet target per sub-event
export const DSCF_SHEET_TARGETS: Record<DscfSubEvent, string> = {
  desf: "dscf-desf",
  dmo:  "dscf-dmo",
  dcc:  "dscf-dcc",
};

// ── Kategori DESF (8 bidang sains) ───────────────────────────────
export const DESF_PROJECT_CATEGORIES: string[] = [
  "Matematika, Sains & Teknologi",
  "Lingkungan",
  "IoT & Robotika",
  "Informatika & Kecerdasan Buatan",
  "Ilmu Hayati",
  "Ilmu Sosial & Humaniora",
  "Fisika, Energi & Teknik",
  "Kesehatan & Kedokteran",
];

// ── Jenjang DMO ───────────────────────────────────────────────────
export const DMO_DIVISIONS: string[] = [
  "Kelas 4 SD",
  "Kelas 5 SD",
  "Kelas 6 SD",
  "Kelas 7 SMP",
  "Kelas 8 SMP",
  "Kelas 9 SMP",
  "Kelas 10 SMA/SMK",
  "Kelas 11 SMA/SMK",
  "Kelas 12 SMA/SMK",
];

// ── Kategori DCC ──────────────────────────────────────────────────
export const DCC_CATEGORIES: string[] = [
  "DCC — Tari (Solo)",
  "DCC — Tari (Grup)",
  "DCC — MHQ (Marawis, Hadroh & Qasidah)",
];

// ── Field wajib per sub-event ─────────────────────────────────────
export const DSCF_REQUIRED_FIELDS: Record<DscfSubEvent, string[]> = {
  desf: [
    "NAMA_LENGKAP",
    "LEADER_WHATSAPP",
    "LEADER_EMAIL",
    "NAMA_SEKOLAH",
    "GRADE",
    "NAME_SUPERVISOR",
    "WHATSAPP_NUMBER_SUPERVISOR",
    "EMAIL_TEACHER_SUPERVISOR",
    "CATEGORIES",
    "PROJECT_TITLE",
    "COMPLETE_ADDRESS",
  ],
  dmo: [
    "NAMA_LENGKAP",
    "LEADER_WHATSAPP",
    "LEADER_EMAIL",
    "NAMA_SEKOLAH",
    "GRADE",
    "NAME_SUPERVISOR",
    "WHATSAPP_NUMBER_SUPERVISOR",
    "EMAIL_TEACHER_SUPERVISOR",
    "CATEGORIES",
    "COMPLETE_ADDRESS",
  ],
  dcc: [
    "NAMA_LENGKAP",
    "LEADER_WHATSAPP",
    "LEADER_EMAIL",
    "NAMA_SEKOLAH",
    "GRADE",
    "NAME_SUPERVISOR",
    "WHATSAPP_NUMBER_SUPERVISOR",
    "EMAIL_TEACHER_SUPERVISOR",
    "CATEGORIES",
    "PROJECT_TITLE",
    "COMPLETE_ADDRESS",
  ],
};

// ================================================================
// SYARAT & KETENTUAN per sub-event
// ================================================================
export const DSCF_TERMS: Record<DscfSubEvent, string[]> = {
  desf: [
    "Peserta merupakan pelajar aktif jenjang SD, SMP, atau SMA/SMK, dibuktikan dengan identitas resmi yang masih berlaku.",
    "Seluruh data yang telah diisi tidak dapat diubah setelah batas waktu pembayaran. Pastikan data yang dikirimkan sudah benar dan final.",
    "Peserta wajib menyelesaikan pembayaran paling lambat 27 Agustus 2026. Biaya yang telah dibayarkan tidak dapat dikembalikan.",
    "Peserta wajib hadir sesuai jadwal yang telah ditetapkan. Keterlambatan dapat mengurangi waktu presentasi.",
    "Setiap tim wajib membawa poster ukuran A0 dan mendekorasi stan/meja yang disediakan panitia.",
    "Sesi penjurian terbuka: setiap tim mendapatkan 7 menit presentasi + 8 menit tanya jawab di hadapan juri.",
    "Sesi penjurian tertutup (selektif): 5 menit presentasi PowerPoint + 5 menit tanya jawab.",
    "Presentasi wajib dilakukan dalam Bahasa Indonesia.",
    "Makalah lengkap wajib dikirim sebelum hari pelaksanaan (format PDF/Word, maks. 12 halaman). Template: https://bit.ly/FORMAT-FULL-PAPER",
    "Plagiarisme dan kecurangan dilarang keras. Jika terbukti, pendaftaran akan dibatalkan tanpa pengembalian biaya.",
    "Seluruh keputusan dewan juri bersifat final dan tidak dapat diganggu gugat.",
  ],
  dmo: [
    "Peserta merupakan pelajar aktif SD, SMP, atau SMA/SMK, dibuktikan dengan identitas resmi yang masih berlaku.",
    "Kompetisi dilaksanakan secara individu dalam satu babak (single round).",
    "Peserta mengerjakan soal pilihan ganda sesuai jenjang. Penilaian berdasarkan jumlah jawaban benar.",
    "Peserta wajib hadir tepat waktu. Keterlambatan akan mengurangi waktu pengerjaan dan tidak dapat dikompensasi.",
    "Seluruh data yang telah diisi tidak dapat diubah setelah batas waktu pembayaran.",
    "Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan dalam kondisi apapun.",
    "Peserta dilarang membawa atau menggunakan alat bantu apapun yang tidak diizinkan selama kompetisi.",
    "Seluruh keputusan panitia dan dewan juri bersifat final.",
  ],
  dcc: [
    "Peserta merupakan pelajar aktif SD, SMP, SMA/SMK, atau umum (khusus kategori MHQ), dibuktikan dengan identitas resmi.",
    "Seluruh data yang telah diisi tidak dapat diubah setelah batas waktu pembayaran.",
    "Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan.",
    "Untuk kategori Tari: file musik (MP3/WAV) wajib dikirimkan paling lambat H-14 sebelum acara. Peserta juga wajib membawa file cadangan pada hari pelaksanaan.",
    "Untuk kategori Tari: urutan penampilan ditentukan oleh panitia dan tidak dapat diubah.",
    "Untuk kategori MHQ: jumlah peserta maksimal 10 orang/tim. Peserta membawa peralatan musik sendiri.",
    "Untuk kategori MHQ: penggunaan peralatan elektronik saat penampilan TIDAK diperkenankan.",
    "Untuk kategori MHQ: seluruh peserta wajib hadir 30 menit sebelum acara dimulai.",
    "Peserta yang terlambat dapat kehilangan kesempatan tampil sesuai kebijakan panitia.",
    "Seluruh keputusan dewan juri bersifat final dan tidak dapat diganggu gugat.",
  ],
};

// ================================================================
// submitToDscfSheet
//
// Mengirim data pendaftaran ke GAS per sub-event.
// Menggunakan image trick bypass CORS (pola sama dengan IESF).
// ================================================================
export const submitToDscfSheet = async (
  subEvent: DscfSubEvent,
  form:     FormData,
  sheetUrl?:    string,
  sheetTarget?: string,
): Promise<void> => {
  const url    = sheetUrl    ?? DSCF_SHEET_URL;
  const target = sheetTarget ?? DSCF_SHEET_TARGETS[subEvent];
  const f = (key: string) => form[key] ?? "";

  const payload: Record<string, string> = {
    sheetTarget:                target,
    timestamp:                  new Date().toISOString(),
    SUB_EVENT:                  DSCF_SUB_LABELS[subEvent],
    CATEGORY_COMPETITION:       f("CATEGORY_COMPETITION") || DSCF_SUB_LABELS[subEvent],
    CATEGORY_PRICE:             f("CATEGORY_PRICE")       || DSCF_PRICE_MAP[subEvent],
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
    COMPLETE_ADDRESS:           f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:      f("INFORMATION_RESOURCES"),
    FILE:                       f("FILE"),
    YES_NO:                     f("YES_NO"),
    JUDUL_PERNAH_BERPARTISIPASI: f("JUDUL_PERNAH_BERPARTISIPASI"),
  };

  const fullUrl = `${url}?${new URLSearchParams(payload).toString()}`;

  await new Promise<void>((resolve) => {
    const img = new Image();
    img.onload  = () => resolve();
    img.onerror = () => resolve();
    img.src     = fullUrl;
    setTimeout(resolve, 8000);
  });
};

// ================================================================
// Komponen UI Reusable
// (Dipakai oleh DscfStepForm — pola identik dengan IESF & NESF)
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