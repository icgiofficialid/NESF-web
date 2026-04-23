// ================================================================
// NesfStepForm.tsx — Step 3: Registration Form
// ================================================================
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/components/LanguageProvider";
import {
  Field, TextInput, TextArea, SelectInput, SectionTitle,
  type CompetitionType, type FormData,
  REQUIRED_FIELDS, COMPETITION_CATEGORIES, PARTICIPANT_DIVISIONS,
  submitToNesfSheet,
} from "./nesfRegisterConfig";

interface Props {
  competition: CompetitionType;
  onBack: () => void;
  onSuccess: () => void;
}

// ── Sub-components ────────────────────────────────────────────────

const SpinnerOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div
      className="w-14 h-14 border-4 border-t-transparent rounded-full animate-spin"
      style={{ borderColor: "hsl(var(--primary) / 0.3)", borderTopColor: "hsl(var(--primary))" }}
    />
  </div>
);

const SuccessOverlay = ({ onDone }: { onDone: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4 text-center shadow-xl max-w-sm mx-4">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <Check className="text-emerald-500" size={32} />
      </div>
      <h2 className="text-xl font-bold text-foreground font-display">Registration Submitted!</h2>
      <p className="text-sm text-muted-foreground leading-6">
        LoA will be sent to your email within 3 working days. Thank you for registering to NESF 2026!
      </p>
      <Button size="lg" className="w-full mt-2" onClick={onDone}>
        Back to Home
      </Button>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────

const NesfStepForm = ({ competition, onBack, onSuccess }: Props) => {
  const [form, setForm]           = useState<FormData>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const { lang } = useLang();

  const set = (key: string) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));
  const f   = (key: string) => form[key] ?? "";

  const isValid = REQUIRED_FIELDS.every(k => !!f(k).trim());

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");
    try {
      await submitToNesfSheet(competition, form);
      setSubmitted(true);
    } catch {
      setError(
        lang === "en"
          ? "Submission failed. Please check your connection and try again."
          : "Pengiriman gagal. Periksa koneksi Anda dan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  const L = {
    step:       { en: "Step 3 of 3",         id: "Langkah 3 dari 3" },
    online:     { en: "Online",              id: "Online" },
    offline:    { en: "Offline",             id: "Offline" },
    submit:     { en: "Submit Registration", id: "Kirim Formulir" },
    submitting: { en: "Submitting…",         id: "Mengirim…" },
    required:   { en: "Please fill in all required fields (*)", id: "Harap isi semua kolom wajib (*)" },
    back:       { en: "← Back",             id: "← Kembali" },
  };

  const cLabel = competition === "online" ? L.online[lang] : L.offline[lang];

  return (
    <div className="w-full max-w-3xl">

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          {L.step[lang]}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">Registration Form</h2>
        <p className="text-muted-foreground mt-1 text-sm">NESF 2026 · {cLabel}</p>
      </div>

      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-8">

        {/* Info banner */}
        <div className="rounded-xl p-4 text-sm text-muted-foreground leading-6 bg-primary/5 border border-primary/20">
          <p className="font-semibold text-foreground mb-1">NESF 2026 — {cLabel} Participant</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              {lang === "en"
                ? "Fill in all data correctly. Submitted data is final and cannot be changed."
                : "Isi semua data dengan benar. Data yang dikirim bersifat final."}
            </li>
            <li>
              {lang === "en"
                ? "All project documents must be submitted no later than H-14 before the event."
                : "Semua dokumen proyek harus dikirim paling lambat H-14 sebelum acara."}
            </li>
            <li>
              {lang === "en"
                ? "LoA will be sent to the leader's email within 3 working days."
                : "LoA akan dikirim ke email ketua dalam 3 hari kerja."}
            </li>
          </ol>
        </div>

        {/* ── 1. TEAM DATA ─────────────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "Team Data" : "Data Tim"} />
          <div className="grid gap-4">

            {/* Read-only: competition type */}
            <Field label={lang === "en" ? "Competition Format" : "Format Kompetisi"}>
              <Input value={cLabel} disabled className="rounded-lg bg-muted/20 text-sm" />
            </Field>

            <Field
              label={lang === "en" ? "Team Leader / Participant Name" : "Nama Ketua Tim / Peserta"}
              required
              note={lang === "en"
                ? "For team: Leader / Member1 / Member2 (max 3 members)"
                : "Untuk tim: Ketua / Anggota1 / Anggota2 (maks. 3 anggota)"}
            >
              <TextArea
                placeholder={lang === "en" ? "Enter participant name(s)" : "Masukkan nama peserta"}
                value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={300}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={lang === "en" ? "Leader WhatsApp" : "WhatsApp Ketua"}
                required
                note={lang === "en" ? "Include country code. e.g. +62 817 xxxx" : "Sertakan kode negara. Cth: +62 817 xxxx"}
              >
                <TextInput placeholder="+62 …" value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
              </Field>
              <Field
                label={lang === "en" ? "Leader Email" : "Email Ketua"}
                required
                note={lang === "en" ? "LoA will be sent here." : "LoA akan dikirim ke sini."}
              >
                <TextInput placeholder="email@example.com" value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={lang === "en" ? "Participant Division" : "Divisi Peserta"} required>
                <SelectInput
                  placeholder={lang === "en" ? "-- Choose Division --" : "-- Pilih Divisi --"}
                  value={f("DIVISION")} onChange={set("DIVISION")} options={PARTICIPANT_DIVISIONS}
                />
              </Field>
              <Field
                label={lang === "en" ? "Number of Members" : "Jumlah Anggota"}
                note={lang === "en" ? "Solo: 1 | Team: up to 3" : "Solo: 1 | Tim: maks. 3"}
              >
                <TextInput placeholder="1 / 2 / 3" value={f("MEMBER_COUNT")} onChange={set("MEMBER_COUNT")} />
              </Field>
            </div>
          </div>
        </div>

        {/* ── 2. INSTITUTION DATA ──────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "School / Institution" : "Sekolah / Institusi"} />
          <div className="grid gap-4">
            <Field
              label={lang === "en" ? "Name of School / University / Community" : "Nama Sekolah / Universitas / Komunitas"}
              required
            >
              <TextArea
                placeholder={lang === "en" ? "e.g. SMA N 1 Yogyakarta" : "Cth. SMA N 1 Yogyakarta"}
                value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={200}
              />
            </Field>
            <Field label={lang === "en" ? "Province / City" : "Provinsi / Kota"}>
              <TextInput
                placeholder={lang === "en" ? "e.g. Jawa Tengah" : "Cth. Jawa Tengah"}
                value={f("PROVINCE")} onChange={set("PROVINCE")}
              />
            </Field>
          </div>
        </div>

        {/* ── 3. SUPERVISOR DATA ───────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "Supervisor / Mentor" : "Pembimbing / Mentor"} />
          <div className="grid gap-4">
            <Field label={lang === "en" ? "Supervisor Name" : "Nama Pembimbing"} required>
              <TextInput
                placeholder={lang === "en" ? "Enter supervisor name" : "Masukkan nama pembimbing"}
                value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={lang === "en" ? "Supervisor WhatsApp" : "WhatsApp Pembimbing"}
                required
                note={lang === "en" ? "Include country code." : "Sertakan kode negara."}
              >
                <TextInput placeholder="+62 …" value={f("WHATSAPP_NUMBER_SUPERVISOR")} onChange={set("WHATSAPP_NUMBER_SUPERVISOR")} type="tel" />
              </Field>
              <Field label={lang === "en" ? "Supervisor Email" : "Email Pembimbing"} required>
                <TextInput placeholder="supervisor@example.com" value={f("EMAIL_SUPERVISOR")} onChange={set("EMAIL_SUPERVISOR")} type="email" />
              </Field>
            </div>
          </div>
        </div>

        {/* ── 4. PROJECT DATA ──────────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "Project Data" : "Data Proyek"} />
          <div className="grid gap-4">

            <Field label={lang === "en" ? "Competition Category" : "Kategori Kompetisi"} required>
              <SelectInput
                placeholder={lang === "en" ? "-- Choose Category --" : "-- Pilih Kategori --"}
                value={f("COMPETITION_CATEGORY")} onChange={set("COMPETITION_CATEGORY")}
                options={COMPETITION_CATEGORIES}
              />
            </Field>

            <Field
              label={lang === "en" ? "Project Title" : "Judul Proyek"}
              required
              note={lang === "en"
                ? "Cannot be changed after submission."
                : "Tidak dapat diubah setelah pengiriman."}
            >
              <TextInput
                placeholder={lang === "en" ? "Enter your project title" : "Masukkan judul proyek Anda"}
                value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")}
              />
            </Field>

            <Field
              label={lang === "en" ? "Project Abstract / Summary" : "Abstrak / Ringkasan Proyek"}
              note={lang === "en" ? "Brief description of your project (max 300 words)." : "Deskripsi singkat proyek Anda (maks. 300 kata)."}
            >
              <TextArea
                placeholder={lang === "en" ? "Describe your project…" : "Deskripsikan proyek Anda…"}
                value={f("PROJECT_ABSTRACT")} onChange={set("PROJECT_ABSTRACT")} maxLength={1500}
              />
            </Field>

            <Field
              label={lang === "en" ? "Project Document / Drive Link" : "Link Dokumen Proyek / Drive"}
              note={lang === "en"
                ? "Google Drive link to your full paper, poster, or supporting documents."
                : "Link Google Drive ke full paper, poster, atau dokumen pendukung."}
            >
              <TextInput
                placeholder="https://drive.google.com/…"
                value={f("DRIVE_LINK")} onChange={set("DRIVE_LINK")}
              />
            </Field>
          </div>
        </div>

        {/* ── 5. GENERAL INFO ──────────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "General Information" : "Informasi Umum"} />
          <div className="grid gap-4">
            <Field
              label={lang === "en" ? "Full Address" : "Alamat Lengkap"}
              required
              note={lang === "en" ? "Street, City, Province" : "Jalan, Kota, Provinsi"}
            >
              <TextArea
                placeholder={lang === "en" ? "Enter your full address…" : "Masukkan alamat lengkap…"}
                value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")}
              />
            </Field>
            <Field label={lang === "en" ? "How did you hear about NESF?" : "Dari mana Anda mengetahui NESF?"}>
              <SelectInput
                placeholder={lang === "en" ? "-- Select Source --" : "-- Pilih Sumber --"}
                value={f("INFORMATION_RESOURCES")} onChange={set("INFORMATION_RESOURCES")}
                options={["Instagram", "WhatsApp", "Friend / Teacher", "Website", "YouTube", "Other"]}
              />
            </Field>
          </div>
        </div>

        {/* ── 6. PAYMENT PROOF ─────────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "Payment Proof" : "Bukti Pembayaran"} />
          <Field
            label={lang === "en" ? "Payment / Free Registration Evidence" : "Bukti Pembayaran / Registrasi Gratis"}
            note={lang === "en"
              ? "Upload to Google Drive and paste the link here."
              : "Upload ke Google Drive dan tempel linknya di sini."}
          >
            <TextInput
              placeholder="https://drive.google.com/…"
              value={f("FILE")} onChange={set("FILE")}
            />
          </Field>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="pt-2 space-y-2">
          <Button
            className="w-full text-base py-4 font-bold tracking-widest uppercase"
            disabled={!isValid || loading}
            onClick={handleSubmit}
          >
            {loading ? L.submitting[lang] : L.submit[lang]}
          </Button>
          {!isValid && (
            <p className="text-xs text-center text-muted-foreground">{L.required[lang]}</p>
          )}
        </div>
      </div>

      {/* Back */}
      <div className="mt-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          {L.back[lang]}
        </Button>
      </div>

      {loading && <SpinnerOverlay />}
      {submitted && <SuccessOverlay onDone={onSuccess} />}
    </div>
  );
};

export default NesfStepForm;