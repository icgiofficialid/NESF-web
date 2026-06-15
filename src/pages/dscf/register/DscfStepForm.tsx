// ================================================================
// DscfStepForm.tsx — Step 3: Form Pendaftaran DSCF
// Path: src/pages/nesf/register/DscfStepForm.tsx
//
// Form berbeda-beda per sub-kompetisi:
//   DESF → data tim + proyek sains (8 kategori bidang)
//   DMO  → data individu + jenjang + materi olimpiade
//   DCC  → data tim + kategori seni (Tari / MHQ)
// ================================================================
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field, TextInput, TextArea, SelectInput, SectionTitle,
  type DscfSubEvent, type FormData,
  DSCF_REQUIRED_FIELDS,
  DESF_PROJECT_CATEGORIES,
  DMO_DIVISIONS,
  DCC_CATEGORIES,
  DSCF_SUB_LABELS,
  DSCF_PRICE_MAP,
  submitToDscfSheet,
} from "./dscfRegisterConfig";

interface Props {
  subEvent: DscfSubEvent;
  onBack: () => void;
  onSuccess: (subEvent: DscfSubEvent, form: FormData) => void;
}

// ── Overlays ──────────────────────────────────────────────────────
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
      <h2 className="text-xl font-bold text-foreground font-display">Pendaftaran Berhasil!</h2>
      <p className="text-sm text-muted-foreground leading-6">
        LoA akan dikirim ke email ketua tim dalam 3 hari kerja. Terima kasih telah mendaftar DSCF 2026!
      </p>
      <Button size="lg" className="w-full mt-2" onClick={onDone}>
        Kembali ke Beranda
      </Button>
    </div>
  </div>
);

// ── Form DESF ─────────────────────────────────────────────────────
const DesfForm = ({ f, set }: { f: (k: string) => string; set: (k: string) => (v: string) => void }) => (
  <>
    {/* Data Tim */}
    <div>
      <SectionTitle title="Data Tim" />
      <div className="grid gap-4">
        <Field
          label="Nama Ketua / Anggota Tim"
          required
          note="Ketua / Anggota1 / Anggota2 (maks. 3 anggota per tim)"
        >
          <TextArea
            placeholder="Cth: Budi Santoso / Rina Dewi / Ahmad Fauzi"
            value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={300}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="WhatsApp Ketua Tim" required note="Sertakan kode negara. Cth: +62 817 xxxx">
            <TextInput placeholder="+62 …" value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
          </Field>
          <Field label="Email Ketua Tim" required note="LoA akan dikirim ke sini.">
            <TextInput placeholder="email@example.com" value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
          </Field>
        </div>
        <Field label="Instagram / Media Sosial Tim">
          <TextInput placeholder="@username" value={f("SOCIAL_MEDIA")} onChange={set("SOCIAL_MEDIA")} />
        </Field>
      </div>
    </div>

    {/* Data Sekolah */}
    <div>
      <SectionTitle title="Data Sekolah / Institusi" />
      <div className="grid gap-4">
        <Field label="Nama Sekolah / Institusi" required>
          <TextInput placeholder="Cth. SMP Negeri 1 Depok" value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Jenjang / Grade" required>
            <SelectInput
              placeholder="-- Pilih Jenjang --"
              value={f("GRADE")} onChange={set("GRADE")}
              options={["SD (Sekolah Dasar)", "SMP (Sekolah Menengah Pertama)", "SMA/SMK (Sekolah Menengah Atas)"]}
            />
          </Field>
          <Field label="NISN / NIM">
            <TextInput placeholder="Nomor identitas siswa" value={f("NISN_NIM")} onChange={set("NISN_NIM")} />
          </Field>
        </div>
        <Field label="Provinsi / Kota">
          <TextInput placeholder="Cth. Jawa Barat" value={f("PROVINCE")} onChange={set("PROVINCE")} />
        </Field>
      </div>
    </div>

    {/* Data Pembimbing */}
    <div>
      <SectionTitle title="Data Guru Pembimbing" />
      <div className="grid gap-4">
        <Field label="Nama Guru Pembimbing" required>
          <TextInput placeholder="Nama lengkap pembimbing" value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="WhatsApp Pembimbing" required note="Sertakan kode negara.">
            <TextInput placeholder="+62 …" value={f("WHATSAPP_NUMBER_SUPERVISOR")} onChange={set("WHATSAPP_NUMBER_SUPERVISOR")} type="tel" />
          </Field>
          <Field label="Email Pembimbing" required>
            <TextInput placeholder="guru@sekolah.sch.id" value={f("EMAIL_TEACHER_SUPERVISOR")} onChange={set("EMAIL_TEACHER_SUPERVISOR")} type="email" />
          </Field>
        </div>
      </div>
    </div>

    {/* Data Proyek */}
    <div>
      <SectionTitle title="Data Proyek DESF" />
      <div className="grid gap-4">
        <Field label="Kategori Bidang Proyek" required>
          <SelectInput
            placeholder="-- Pilih Kategori Bidang --"
            value={f("CATEGORIES")} onChange={set("CATEGORIES")}
            options={DESF_PROJECT_CATEGORIES}
          />
        </Field>
        <Field
          label="Judul Proyek / Penelitian"
          required
          note="Tidak dapat diubah setelah pengiriman."
        >
          <TextInput placeholder="Masukkan judul proyek Anda" value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")} />
        </Field>
        <Field
          label="Abstrak / Ringkasan Proyek"
          note="Deskripsi singkat latar belakang, metode, dan hasil proyek (maks. 300 kata)."
        >
          <TextArea
            placeholder="Deskripsikan proyek Anda…"
            value={f("PROJECT_ABSTRACT")} onChange={set("PROJECT_ABSTRACT")} maxLength={1500}
          />
        </Field>
        <Field
          label="Link Dokumen Proyek (Google Drive)"
          note="Makalah lengkap (PDF/Word), poster A0, dan dokumen pendukung lainnya. Format template: https://bit.ly/FORMAT-FULL-PAPER"
        >
          <TextInput placeholder="https://drive.google.com/…" value={f("DRIVE_LINK")} onChange={set("DRIVE_LINK")} />
        </Field>
      </div>
    </div>
  </>
);

// ── Form DMO ──────────────────────────────────────────────────────
const DmoForm = ({ f, set }: { f: (k: string) => string; set: (k: string) => (v: string) => void }) => (
  <>
    {/* Data Peserta */}
    <div>
      <SectionTitle title="Data Peserta (Individu)" />
      <div className="grid gap-4">
        <Field label="Nama Lengkap Peserta" required>
          <TextInput placeholder="Nama lengkap sesuai identitas" value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="WhatsApp Peserta / Orang Tua" required note="Sertakan kode negara. Cth: +62 817 xxxx">
            <TextInput placeholder="+62 …" value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
          </Field>
          <Field label="Email Peserta / Orang Tua" required note="LoA akan dikirim ke sini.">
            <TextInput placeholder="email@example.com" value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
          </Field>
        </div>
      </div>
    </div>

    {/* Data Sekolah */}
    <div>
      <SectionTitle title="Data Sekolah" />
      <div className="grid gap-4">
        <Field label="Nama Sekolah" required>
          <TextInput placeholder="Cth. SDN 1 Depok" value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Jenjang / Kelas" required>
            <SelectInput
              placeholder="-- Pilih Jenjang --"
              value={f("GRADE")} onChange={set("GRADE")}
              options={DMO_DIVISIONS}
            />
          </Field>
          <Field label="NISN">
            <TextInput placeholder="Nomor induk siswa" value={f("NISN_NIM")} onChange={set("NISN_NIM")} />
          </Field>
        </div>
        <Field label="Provinsi / Kota">
          <TextInput placeholder="Cth. Jawa Barat" value={f("PROVINCE")} onChange={set("PROVINCE")} />
        </Field>
      </div>
    </div>

    {/* Data Pembimbing */}
    <div>
      <SectionTitle title="Data Guru Pembimbing" />
      <div className="grid gap-4">
        <Field label="Nama Guru Pembimbing" required>
          <TextInput placeholder="Nama lengkap pembimbing" value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="WhatsApp Pembimbing" required>
            <TextInput placeholder="+62 …" value={f("WHATSAPP_NUMBER_SUPERVISOR")} onChange={set("WHATSAPP_NUMBER_SUPERVISOR")} type="tel" />
          </Field>
          <Field label="Email Pembimbing" required>
            <TextInput placeholder="guru@sekolah.sch.id" value={f("EMAIL_TEACHER_SUPERVISOR")} onChange={set("EMAIL_TEACHER_SUPERVISOR")} type="email" />
          </Field>
        </div>
      </div>
    </div>

    {/* Kategori DMO (filler untuk CATEGORIES field) */}
    <div>
      <SectionTitle title="Kategori DMO" />
      <div className="grid gap-4">
        <Field
          label="Bidang Olimpiade"
          required
          note="DMO adalah olimpiade matematika individu satu babak."
        >
          <Input value="Depok Math Olympiad (DMO)" disabled className="rounded-lg bg-muted/20 text-sm" />
        </Field>
        <Field
          label="Judul / Tema (opsional)"
          note="Kosongkan jika tidak ada."
        >
          <TextInput placeholder="—" value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")} />
        </Field>
      </div>
    </div>
  </>
);

// ── Form DCC ──────────────────────────────────────────────────────
const DccForm = ({ f, set }: { f: (k: string) => string; set: (k: string) => (v: string) => void }) => {
  const isMhq = f("CATEGORIES") === "DCC — MHQ (Marawis, Hadroh & Qasidah)";
  return (
    <>
      {/* Data Tim */}
      <div>
        <SectionTitle title="Data Tim / Peserta" />
        <div className="grid gap-4">
          <Field
            label="Nama Ketua / Anggota Tim"
            required
            note={
              isMhq
                ? "Daftar nama semua anggota tim (maks. 10 orang). Pisahkan dengan /"
                : "Nama ketua / anggota (solo atau grup)"
            }
          >
            <TextArea
              placeholder="Nama Ketua / Anggota1 / Anggota2 / …"
              value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={500}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="WhatsApp Ketua Tim" required note="Sertakan kode negara.">
              <TextInput placeholder="+62 …" value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
            </Field>
            <Field label="Email Ketua Tim" required note="LoA akan dikirim ke sini.">
              <TextInput placeholder="email@example.com" value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
            </Field>
          </div>
          <Field label="Jumlah Anggota" note={isMhq ? "Maks. 10 orang/tim" : "Solo: 1 | Grup: sesuai ketentuan"}>
            <TextInput placeholder="1 / 2 / 3 / …" value={f("MEMBER_COUNT")} onChange={set("MEMBER_COUNT")} />
          </Field>
        </div>
      </div>

      {/* Data Sekolah / Komunitas */}
      <div>
        <SectionTitle title="Asal Sekolah / Komunitas" />
        <div className="grid gap-4">
          <Field label="Nama Sekolah / Komunitas / Sanggar" required>
            <TextInput placeholder="Cth. SMAN 2 Depok / Sanggar Tari Nusantara" value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Jenjang / Kategori Peserta" required>
              <SelectInput
                placeholder="-- Pilih Jenjang --"
                value={f("GRADE")} onChange={set("GRADE")}
                options={["SD (Sekolah Dasar)", "SMP (Sekolah Menengah Pertama)", "SMA/SMK (Sekolah Menengah Atas)", "Umum / Komunitas (khusus MHQ)"]}
              />
            </Field>
            <Field label="Provinsi / Kota">
              <TextInput placeholder="Cth. Jawa Barat" value={f("PROVINCE")} onChange={set("PROVINCE")} />
            </Field>
          </div>
        </div>
      </div>

      {/* Data Pembimbing / Penanggung Jawab */}
      <div>
        <SectionTitle title="Guru Pembimbing / Penanggung Jawab" />
        <div className="grid gap-4">
          <Field label="Nama Pembimbing / PJ" required>
            <TextInput placeholder="Nama lengkap" value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="WhatsApp Pembimbing" required>
              <TextInput placeholder="+62 …" value={f("WHATSAPP_NUMBER_SUPERVISOR")} onChange={set("WHATSAPP_NUMBER_SUPERVISOR")} type="tel" />
            </Field>
            <Field label="Email Pembimbing" required>
              <TextInput placeholder="pembimbing@email.com" value={f("EMAIL_TEACHER_SUPERVISOR")} onChange={set("EMAIL_TEACHER_SUPERVISOR")} type="email" />
            </Field>
          </div>
        </div>
      </div>

      {/* Kategori DCC */}
      <div>
        <SectionTitle title="Kategori &amp; Detail Penampilan" />
        <div className="grid gap-4">
          <Field label="Kategori DCC" required>
            <SelectInput
              placeholder="-- Pilih Kategori DCC --"
              value={f("CATEGORIES")} onChange={set("CATEGORIES")}
              options={DCC_CATEGORIES}
            />
          </Field>

          <Field
            label="Judul / Nama Penampilan"
            required
            note={
              isMhq
                ? "Nama sholawat yang dibawakan + lagu bebas islami (maks. 7 menit)"
                : "Judul tari atau tema penampilan"
            }
          >
            <TextInput
              placeholder={isMhq ? "Sholawat: … | Lagu: …" : "Judul tari / penampilan"}
              value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")}
            />
          </Field>

          {/* Field khusus Tari: link file musik */}
          {!isMhq && (
            <Field
              label="Link File Musik (Google Drive)"
              note="Upload file MP3/WAV ke Google Drive dan tempel link di sini. Wajib dikirim H-14 sebelum acara."
            >
              <TextInput placeholder="https://drive.google.com/…" value={f("DRIVE_LINK")} onChange={set("DRIVE_LINK")} />
            </Field>
          )}

          {/* Field khusus MHQ: pernyataan peralatan */}
          {isMhq && (
            <Field
              label="Peralatan yang Dibawa Tim"
              note="Peserta membawa peralatan sendiri. Tidak diperbolehkan menggunakan peralatan elektronik saat penampilan."
            >
              <TextArea
                placeholder="Cth: Rebana (5 buah), Bedug (1), Simbal (2)…"
                value={f("DRIVE_LINK")} onChange={set("DRIVE_LINK")} maxLength={300}
              />
            </Field>
          )}
        </div>
      </div>
    </>
  );
};

// ── Main Component ─────────────────────────────────────────────────
const DscfStepForm = ({ subEvent, onBack, onSuccess }: Props) => {
  const [form, setForm]           = useState<FormData>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  const set = (key: string) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));
  const f   = (key: string) => form[key] ?? "";

  // Inject sub-event ke CATEGORY_COMPETITION agar ter-record di sheet
  const formWithMeta: FormData = {
    ...form,
    CATEGORY_COMPETITION: DSCF_SUB_LABELS[subEvent],
    CATEGORY_PRICE:       DSCF_PRICE_MAP[subEvent],
    // DMO: set CATEGORIES otomatis
    ...(subEvent === "dmo" && !form["CATEGORIES"]
      ? { CATEGORIES: "Depok Math Olympiad (DMO)" }
      : {}),
  };

  const requiredFields = DSCF_REQUIRED_FIELDS[subEvent];
  const isValid = requiredFields.every(k => !!formWithMeta[k]?.trim());

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");
    try {
      await submitToDscfSheet(subEvent, formWithMeta);
      setSubmitted(true);
    } catch {
      setError("Pengiriman gagal. Periksa koneksi Anda dan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const subLabel = DSCF_SUB_LABELS[subEvent];

  return (
    <div className="w-full max-w-3xl">

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          Langkah 3 dari 3
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">Formulir Pendaftaran</h2>
        <p className="text-muted-foreground mt-1 text-sm">DSCF 2026 · {subLabel} · Offline</p>
      </div>

      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-8">

        {/* Info banner */}
        <div className="rounded-xl p-4 text-sm text-muted-foreground leading-6 bg-primary/5 border border-primary/20">
          <p className="font-semibold text-foreground mb-1">DSCF 2026 — {subLabel}</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Isi semua data dengan benar. Data yang dikirim bersifat <strong className="text-foreground">final</strong> dan tidak dapat diubah.</li>
            <li>Selesaikan pembayaran <strong className="text-foreground">sebelum 27 Agustus 2026</strong>. Berita transfer: IESF + Nama Lengkap.</li>
            <li>LoA akan dikirim ke email ketua dalam <strong className="text-foreground">3 hari kerja</strong>.</li>
            <li>Biaya pendaftaran: <strong className="text-primary">{DSCF_PRICE_MAP[subEvent]}</strong></li>
          </ol>
        </div>

        {/* Form berbeda per sub-event */}
        {subEvent === "desf" && <DesfForm f={f} set={set} />}
        {subEvent === "dmo"  && <DmoForm  f={f} set={set} />}
        {subEvent === "dcc"  && <DccForm  f={f} set={set} />}

        {/* Informasi Umum (semua sub-event) */}
        <div>
          <SectionTitle title="Informasi Umum" />
          <div className="grid gap-4">
            <Field label="Alamat Lengkap" required note="Jalan, Kota, Provinsi">
              <TextArea
                placeholder="Masukkan alamat lengkap…"
                value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")}
              />
            </Field>
            <Field label="Dari mana Anda mengetahui DSCF?">
              <SelectInput
                placeholder="-- Pilih Sumber --"
                value={f("INFORMATION_RESOURCES")} onChange={set("INFORMATION_RESOURCES")}
                options={["Instagram", "WhatsApp", "Teman / Guru", "Website", "YouTube", "Lainnya"]}
              />
            </Field>
          </div>
        </div>

        {/* Bukti Pembayaran */}
        <div>
          <SectionTitle title="Bukti Pembayaran" />
          <div className="grid gap-4">
            <div className="rounded-xl p-4 text-xs text-muted-foreground bg-muted/30 border border-border/50 leading-6">
              <p className="font-semibold text-foreground mb-1">📌 Informasi Pembayaran</p>
              <p>Bank Syariah Indonesia (BSI) · Kode: 451</p>
              <p>No. Rekening: <strong className="text-foreground">352261658</strong></p>
              <p>Atas Nama: YYS PUSAT INOVASI ANAK BERBAKAT IND</p>
              <p className="mt-1">Berita Transfer: <strong className="text-primary">IESF + Nama Lengkap</strong></p>
            </div>
            <Field
              label="Link Bukti Pembayaran (Google Drive)"
              note="Upload foto/screenshot bukti transfer ke Google Drive dan tempel link-nya di sini."
            >
              <TextInput
                placeholder="https://drive.google.com/…"
                value={f("FILE")} onChange={set("FILE")}
              />
            </Field>
          </div>
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
            {loading ? "Mengirim…" : "Kirim Pendaftaran"}
          </Button>
          {!isValid && (
            <p className="text-xs text-center text-muted-foreground">
              Harap isi semua kolom wajib (*) sebelum mengirim
            </p>
          )}
        </div>
      </div>

      {/* Back */}
      <div className="mt-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          ← Kembali
        </Button>
      </div>

      {loading && <SpinnerOverlay />}
      {submitted && <SuccessOverlay onDone={() => onSuccess(subEvent, formWithMeta)} />}
    </div>
  );
};

export default DscfStepForm;