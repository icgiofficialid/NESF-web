// ================================================================
// NesfStepForm.tsx — Langkah 3: Formulir Pendaftaran
//
// Field, label, urutan section, dan aturan wajib isi DISAMAKAN
// PERSIS dengan RegistrationForm.tsx milik IESF (cabang peserta
// Indonesia) — hanya bahasanya full Bahasa Indonesia dan TIDAK ada
// field COUNTRY / pilihan kewarganegaraan (NESF = kompetisi
// nasional). Generik untuk semua event NESF lewat props
// (eventSlug, eventTitle, sheetUrl, sheetTarget, pricing) yang
// diambil dari eventRegistry.ts oleh NesfRegister.tsx.
// ================================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field, TextInput, TextArea, SelectInput, SectionTitle, SuccessOverlay,
  type FormData, type CompetitionType,
  getRequired, normalizePhone62, submitToSheet,
  DEFAULT_CATEGORY_PRICE_MAP, PROJECT_CATEGORIES, GRADE_OPTIONS, INFO_SOURCES,
  FORMAT_LABEL,
} from "./nesfRegisterConfig";

// ── Input WhatsApp nasional — prefix +62 tetap (NESF = peserta
//    Indonesia saja, jadi tidak perlu dropdown kode negara penuh
//    seperti di form IESF) ─────────────────────────────────────────
const PhoneInputID = ({
  placeholder, value, onChange,
}: {
  placeholder: string; value: string; onChange: (v: string) => void;
}) => (
  <div className="flex gap-2">
    <span className="shrink-0 flex items-center gap-1.5 rounded-lg border border-input bg-muted/30 px-3 py-3 text-sm text-muted-foreground select-none">
      🇮🇩 +62
    </span>
    <Input
      type="tel"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="flex-1 min-w-0 rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary"
    />
  </div>
);

const SpinnerOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

export interface SummaryData {
  namaLengkap: string; namaSekolah: string;
  categories: string; projectTitle: string;
  grade: string; competitionCategory?: string;
}

interface Props {
  eventSlug: string;
  eventTitle: string;
  competition: CompetitionType;
  sheetUrl: string;
  sheetTarget: string;
  pricing?: Record<string, string>; // ← harga khusus event ini (dari eventRegistry); fallback DEFAULT_CATEGORY_PRICE_MAP kalau tidak diisi
  onBack: () => void;
  onSuccess: (data: SummaryData) => void;
}

const NesfStepForm = ({ eventTitle, competition, sheetUrl, sheetTarget, pricing, onBack, onSuccess }: Props) => {
  const priceMap = { ...DEFAULT_CATEGORY_PRICE_MAP, ...(pricing ?? {}) };

  const [form, setForm]           = useState<FormData>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const [errors, setErrors]       = useState<Record<string, boolean>>({});

  const set = (key: string) => (v: string) => {
    setForm(p => ({ ...p, [key]: v }));
    if (v) setErrors(p => ({ ...p, [key]: false }));
  };
  const f = (key: string) => form[key] || "";

  const required = getRequired();
  const YES = "Ya";
  const cLabel = FORMAT_LABEL[competition];

  const handleSubmit = async () => {
    // Validasi semua field required — tampilkan error & scroll ke yang pertama
    const newErrors: Record<string, boolean> = {};
    required.forEach(k => { if (!f(k)) newErrors[k] = true; });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstEmpty = required.find(k => !f(k));
      if (firstEmpty) {
        const el = document.getElementById(`field-${firstEmpty}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
      return;
    }

    setErrors({});
    setLoading(true); setError("");

    const resolvedCatComp = f("CATEGORY_COMPETITION") || cLabel;

    const finalForm: FormData = {
      ...form,
      LEADER_WHATSAPP:            normalizePhone62(f("LEADER_WHATSAPP_NUM")),
      WHATSAPP_NUMBER_SUPERVISOR: normalizePhone62(f("SUPERVISOR_WA_NUM")),
      CATEGORY_COMPETITION:       resolvedCatComp,
      CATEGORY_PRICE:             priceMap[resolvedCatComp] ?? "",
    };

    try {
      await submitToSheet(sheetUrl, sheetTarget, competition, finalForm);
      setSubmitted(true);
      setTimeout(() => onSuccess({
        namaLengkap:  f("NAMA_LENGKAP"),
        namaSekolah:  f("NAMA_SEKOLAH"),
        categories:   f("CATEGORIES"),
        projectTitle: f("PROJECT_TITLE"),
        grade:        f("GRADE"),
        competitionCategory: resolvedCatComp,
      }), 2000);
    } catch {
      setError("Gagal mengirim. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[88%] xl:w-[82%] max-w-[1200px] mx-auto">

      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Langkah 3 dari 3</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Formulir Pendaftaran</h2>
        <p className="text-muted-foreground mt-1 text-sm">{eventTitle} · {cLabel}</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 md:p-10 space-y-10">

        {/* Banner info */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground leading-6">
          <p className="font-semibold text-foreground mb-3">
            {`HALO PESERTA ${eventTitle.toUpperCase()}, Mohon perhatikan informasi berikut sebelum mengisi formulir pendaftaran:`}
          </p>
          <ol className="list-decimal list-inside space-y-3">
            <li>Harap isi data yang diperlukan dengan benar dan pastikan tidak ada kesalahan penulisan. Pastikan juga bahwa data yang dikirimkan sudah final dan tidak berubah.</li>
            <li>Setelah memastikan data sudah benar, klik tombol "Kirim Formulir" sekali saja. Jika data berhasil dikirim, Anda akan dipindahkan ke halaman lain.</li>
            <li>Akan ada email informasi bahwa pendaftaran telah diterima yang dikirim ke alamat email ketua tim, dan file akan divalidasi oleh tim kami. Harap bersabar dan tunggu maksimal 3 hari setelah waktu pendaftaran, Letter of Acceptance (LoA) akan dikirimkan ke alamat email ketua tim.</li>
          </ol>
        </div>

        {/* ── BIODATA ─────────────────────────────────────────── */}
        <section>
          <SectionTitle title="Biodata" />
          <div className="grid gap-5">
            <Field label="Kategori Kompetisi">
              <Input value={cLabel} disabled />
            </Field>

            <Field label="Nama Ketua & Anggota Tim" required fieldId="field-NAMA_LENGKAP" error={errors["NAMA_LENGKAP"]}
              note={"Masukkan nama ketua tim dan anggota tim dengan nama ketua tim di awal, dengan format berikut:\n\nNama Ketua\nNama Anggota 1\nNama Anggota 2\n\nCatatan: maksimal 3 anggota + 1 ketua tim"}>
              <TextArea placeholder="Masukkan Nama Ketua & Anggota Tim"
                value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={400} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="No. WhatsApp Ketua" required note="Masukkan nomor tanpa awalan 0." fieldId="field-LEADER_WHATSAPP_NUM" error={errors["LEADER_WHATSAPP_NUM"]}>
                <PhoneInputID placeholder="8xxxxxxxx"
                  value={f("LEADER_WHATSAPP_NUM")} onChange={set("LEADER_WHATSAPP_NUM")} />
              </Field>
              <Field label="Email Ketua" required note="LoA akan dikirim ke email ini." fieldId="field-LEADER_EMAIL" error={errors["LEADER_EMAIL"]}>
                <TextInput placeholder="email@sekolah.com"
                  value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
              </Field>
            </div>

            <Field label="NIM / NISN Ketua & Anggota Tim" required fieldId="field-NISN_NIM" error={errors["NISN_NIM"]}
              note={"Catatan: Masukkan NIM/NISN jika masih sekolah dengan urutan nama ketua tim dan anggota, dengan format sebagai berikut:\n\n1201301\n1302402\n1020100"}>
              <TextArea placeholder="Masukkan NIM / NISN Ketua & Anggota Tim"
                value={f("NISN_NIM")} onChange={set("NISN_NIM")} />
            </Field>

            <Field label="Link Media Sosial" note="Instagram, LinkedIn, atau media sosial lainnya (opsional).">
              <TextInput placeholder="https://instagram.com/username"
                value={f("SOCIAL_MEDIA")} onChange={set("SOCIAL_MEDIA")} />
            </Field>
          </div>
        </section>

        {/* ── DATA SEKOLAH ─────────────────────────────────────── */}
        <section>
          <SectionTitle title="Data Sekolah" />
          <div className="grid gap-5">
            <Field label="Nama Sekolah/Universitas" required fieldId="field-NAMA_SEKOLAH" error={errors["NAMA_SEKOLAH"]}
              note={"Tulis nama sekolah tiap anggota sesuai urutan nama di biodata, satu baris per sekolah.\nContoh:\n\nSMA Negeri 1 Jakarta (Ketua)\nSMK Telkom Bandung (Anggota1)"}>
              <TextArea placeholder="SMA Negeri 1 Jakarta (Ketua)\nSMK Telkom Bandung (Anggota1)"
                value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={500} />
            </Field>

            <Field label="NPSN (Nomor Pokok Sekolah Nasional)" required fieldId="field-NPSN" error={errors["NPSN"]}
              note="Nomor Pokok Sekolah Nasional (8 digit). Cek di https://sekolah.data.kemdikbud.go.id jika belum tahu.">
              <TextInput placeholder="Contoh: 20106589"
                value={f("NPSN")} onChange={set("NPSN")} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Jenjang / Tahun" required fieldId="field-GRADE" error={errors["GRADE"]}>
                <SelectInput placeholder="-- Pilih Jenjang --" value={f("GRADE")} onChange={set("GRADE")}
                  options={GRADE_OPTIONS} />
              </Field>
              <Field label="Provinsi" required fieldId="field-PROVINCE" error={errors["PROVINCE"]}>
                <TextInput placeholder="Mis. Jawa Barat, Yogyakarta"
                  value={f("PROVINCE")} onChange={set("PROVINCE")} />
              </Field>
            </div>
          </div>
        </section>

        {/* ── DATA PEMBIMBING ──────────────────────────────────── */}
        <section>
          <SectionTitle title="Data Pembimbing" />
          <div className="grid gap-5">
            <Field label="Nama Guru/Pembimbing" required fieldId="field-NAME_SUPERVISOR" error={errors["NAME_SUPERVISOR"]}>
              <TextArea placeholder="Masukkan Nama Guru/Pembimbing"
                value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="No. WhatsApp Pembimbing" required note="Masukkan nomor tanpa awalan 0." fieldId="field-SUPERVISOR_WA_NUM" error={errors["SUPERVISOR_WA_NUM"]}>
                <PhoneInputID placeholder="8xxxxxxxx"
                  value={f("SUPERVISOR_WA_NUM")} onChange={set("SUPERVISOR_WA_NUM")} />
              </Field>
              <Field label="Email Pembimbing" required fieldId="field-EMAIL_TEACHER_SUPERVISOR" error={errors["EMAIL_TEACHER_SUPERVISOR"]}>
                <TextInput placeholder="pembimbing@sekolah.com"
                  value={f("EMAIL_TEACHER_SUPERVISOR")} onChange={set("EMAIL_TEACHER_SUPERVISOR")} type="email" />
              </Field>
            </div>
          </div>
        </section>

        {/* ── DETAIL PROYEK ────────────────────────────────────── */}
        <section>
          <SectionTitle title="Detail Proyek" />
          <div className="grid gap-5">
            <Field label="Judul Proyek" required note="Tidak dapat diubah setelah pengiriman." fieldId="field-PROJECT_TITLE" error={errors["PROJECT_TITLE"]}>
              <TextArea placeholder="Masukkan judul proyek Anda"
                value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")} maxLength={160} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Kategori Proyek" required fieldId="field-CATEGORIES" error={errors["CATEGORIES"]}>
                <SelectInput placeholder="-- Pilih Kategori --" value={f("CATEGORIES")}
                  onChange={set("CATEGORIES")} options={PROJECT_CATEGORIES} />
              </Field>
              <Field label="Apakah proyek ini pernah ikut kompetisi lain?">
                <SelectInput placeholder="-- Pilih --" value={f("YES_NO")}
                  onChange={set("YES_NO")} options={[YES, "Tidak"]} />
              </Field>
            </div>
            {f("YES_NO") === YES && (
              <Field label="Nama Kompetisi Sebelumnya">
                <TextArea placeholder="Masukkan Nama Kompetisi"
                  value={f("JUDUL_PERNAH_BERPATISIPASI")} onChange={set("JUDUL_PERNAH_BERPATISIPASI")} />
              </Field>
            )}
          </div>
        </section>

        {/* ── INFORMASI UMUM ───────────────────────────────────── */}
        <section>
          <SectionTitle title="Informasi Umum" />
          <div className="grid gap-5">
            <Field label="Alamat Lengkap" required note="Nama Jalan, No. Rumah, Kelurahan, Kecamatan, Kab/Kota, Provinsi, Kode Pos" fieldId="field-COMPLETE_ADDRESS" error={errors["COMPLETE_ADDRESS"]}>
              <TextArea placeholder="Masukkan Alamat Lengkap Anda"
                value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")} />
            </Field>
            <Field label={`Dari mana Anda mengetahui ${eventTitle}?`} required fieldId="field-INFORMATION_RESOURCES" error={errors["INFORMATION_RESOURCES"]}>
              <SelectInput placeholder="-- Pilih Sumber --" value={f("INFORMATION_RESOURCES")}
                onChange={set("INFORMATION_RESOURCES")} options={INFO_SOURCES} />
            </Field>
          </div>
        </section>

        {/* ── BUKTI REGISTRASI GRATIS ──────────────────────────── */}
        <section>
          <Field label="Jika mendapat registrasi gratis, lampirkan buktinya di sini.">
            <TextInput placeholder="https://drive.google.com/..." value={f("FILE")} onChange={set("FILE")} />
          </Field>
        </section>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="pt-2">
          <Button variant="hero" size="lg"
            className="w-full text-base py-4 font-bold tracking-widest uppercase"
            disabled={loading} onClick={handleSubmit}>
            {loading ? "Mengirim..." : "Kirim Formulir"}
          </Button>
        </div>
      </div>

      <div className="mt-4 flex justify-start">
        <Button variant="hero-outline" size="sm" onClick={onBack}>← Kembali ke Syarat</Button>
      </div>

      {loading && <SpinnerOverlay />}
      {submitted && <SuccessOverlay />}
    </div>
  );
};

export default NesfStepForm;