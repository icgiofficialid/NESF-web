// ================================================================
// DscfStepForm.tsx — Step 3: Form Pendaftaran DSCF 2026
// Path: src/pages/nesf/register/DscfStepForm.tsx
//
// Disesuaikan dengan Juknis DSCF 2026:
//   DESF → tim (maks 3), proyek sains, makalah, standing banner
//   DMO  → individu, laptop pribadi, olimpiade matematika
//   DCC  → Tari (solo/grup, maks 5 menit) / MHQ (maks 10 orang)
// ================================================================
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        LoA akan dikirim ke email ketua tim dalam 3 hari kerja setelah pembayaran terverifikasi. Terima kasih telah mendaftar DSCF 2026!
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
        label="Nama Ketua & Anggota Tim"
        required
        note={
          "Catatan: Masukkan nama ketua tim dan anggota tim dengan nama ketua tim di awal, dengan format berikut:\n\n" +
          "Nama Ketua\nNama Anggota 1\nNama Anggota 2\nNama Anggota 3\n\n" +
          "Catatan: maksimal 3 anggota + 1 ketua tim"
        }
      >
        <TextArea
          placeholder="Masukkan Nama Ketua & Anggota Tim"
          value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={400}
        />
      </Field>
            <Field
        label="NISN / NIM Ketua & Anggota Tim"
        note={
          "Catatan: Masukkan NIM/NISN jika masih sekolah dengan urutan nama ketua tim dan anggota, dengan format sebagai berikut:\n\n" +
          "1201301\n1302402\n1020100"
        }
      >
        <TextArea
          placeholder="Masukkan NIM / NISN Ketua & Anggota Tim"
          value={f("NISN_NIM")} onChange={set("NISN_NIM")}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="WhatsApp Ketua Tim" required note="Sertakan kode negara. Cth: +62 817 xxxx">
          <TextInput placeholder="+62 …" value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
        </Field>
        <Field label="Email Ketua Tim" required note="LoA akan dikirim ke email ini.">
          <TextInput placeholder="email@example.com" value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
        </Field>
      </div>
    </div>
  </div>

  {/* Data Sekolah */}
  <div>
    <SectionTitle title="Data Sekolah / Institusi" />
    <div className="grid gap-4">
      <Field
        label="Nama Sekolah / Institusi"
        required
        note={
          "Tulis nama sekolah tiap anggota sesuai urutan nama di biodata, satu baris per sekolah.\nContoh:\n\n" +
          "SMA Negeri 1 Depok (Ketua)\nSMK Negeri 2 Depok (Anggota1)"
        }
      >
        <TextArea
          placeholder={"SMA Negeri 1 Depok (Ketua)\nSMK Negeri 2 Depok (Anggota1)"}
          value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={500}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Jenjang" required>
          <SelectInput
            placeholder="-- Pilih Jenjang --"
            value={f("GRADE")} onChange={set("GRADE")}
            options={["SD (Sekolah Dasar)", "SMP (Sekolah Menengah Pertama)", "SMA/SMK (Sekolah Menengah Atas)"]}
          />
        </Field>
        <Field label="Provinsi / Kota" required>
          <TextInput placeholder="Cth. Jawa Barat" value={f("PROVINCE")} onChange={set("PROVINCE")} />
        </Field>
      </div>
    </div>
    <Field label="NPSN Sekolah" note="Nomor Pokok Sekolah Nasional" required>
  <TextInput placeholder="Cth. 20229819" value={f("NPSN")} onChange={set("NPSN")} />
  </Field>
  <Field label="Provinsi / Kota" required>
    <TextInput placeholder="Cth. Jawa Barat" value={f("PROVINCE")} onChange={set("PROVINCE")} />
  </Field>
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
          <Field label="Link Media Sosial" note="Instagram, LinkedIn, atau media sosial lainnya (opsional).">
      <TextInput placeholder="https://instagram.com/username" value={f("SOCIAL_MEDIA")} onChange={set("SOCIAL_MEDIA")} />
    </Field>
        </div>
      </div>
    </div>

    {/* Detail Proyek — layout disamakan dengan BIESF */}
    <div>
      <SectionTitle title="Detail Proyek" />
      <div className="grid gap-4">
        <Field
          label="Judul Proyek"
          required
          note="Isi judul dengan BENAR. Data yang sudah dikirim tidak dapat diubah!"
        >
          <TextArea placeholder="Masukkan judul proyek Anda" value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")} maxLength={160} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Kategori Bidang Proyek" required>
            <SelectInput
              placeholder="-- Pilih Kategori Bidang --"
              value={f("CATEGORIES")} onChange={set("CATEGORIES")}
              options={DESF_PROJECT_CATEGORIES}
            />
          </Field>
          <Field label="Apakah proyek ini pernah diikutkan kompetisi sebelumnya?" required>
            <SelectInput
              placeholder="-- Pilih --"
              value={f("YES_NO")} onChange={set("YES_NO")}
              options={["Ya", "Tidak"]}
            />
          </Field>
        </div>

        {f("YES_NO") === "Ya" && (
          <Field
            label="Nama Kompetisi Sebelumnya"
            note="Tuliskan nama event/kompetisi yang pernah diikuti dengan judul yang sama."
          >
            <TextArea
              placeholder="Cth. IESF 2025, BIESF 2025…"
              value={f("JUDUL_PERNAH_BERPARTISIPASI")} onChange={set("JUDUL_PERNAH_BERPARTISIPASI")}
            />
          </Field>
        )}
        <Field
              label="Jika Anda mendapat registrasi gratis, lampirkan buktinya di sini."
              note="Upload bukti ke Google Drive, lalu tempel link-nya di sini. Kosongkan jika tidak ada."
            >
              <TextInput
                placeholder="https://drive.google.com/…"
                value={f("FILE")} onChange={set("FILE")}
              />
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
        <Field label="Nama Lengkap Peserta" required note="Sesuai identitas resmi (kartu pelajar / KTP).">
          <TextInput placeholder="Nama lengkap" value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} />
        </Field>
          <Field label="NISN">
            <TextInput placeholder="Nomor induk siswa" value={f("NISN_NIM")} onChange={set("NISN_NIM")} />
          </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="WhatsApp Peserta / Orang Tua" required note="Sertakan kode negara. Cth: +62 817 xxxx">
            <TextInput placeholder="+62 …" value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
          </Field>
          <Field label="Email Peserta / Orang Tua" required note="LoA akan dikirim ke email ini.">
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
          <Field label="Jenjang / Kelas" required note="Pilih sesuai kelas saat ini.">
            <SelectInput
              placeholder="-- Pilih Jenjang/Kelas --"
              value={f("GRADE")} onChange={set("GRADE")}
              options={DMO_DIVISIONS}
            />
          </Field>
        </div>
      <Field label="NPSN Sekolah" note="Nomor Pokok Sekolah Nasional (opsional).">
        <TextInput placeholder="Cth. 20229819" value={f("NPSN")} onChange={set("NPSN")} />
      </Field>
      <Field label="Provinsi / Kota" required>
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
          <Field label="Link Media Sosial" note="Instagram, LinkedIn, atau media sosial lainnya (opsional).">
            <TextInput placeholder="https://instagram.com/username" value={f("SOCIAL_MEDIA")} onChange={set("SOCIAL_MEDIA")} />
          </Field>
                      <Field
              label="Jika Anda mendapat registrasi gratis, lampirkan buktinya di sini."
              note="Upload bukti ke Google Drive, lalu tempel link-nya di sini. Kosongkan jika tidak ada."
            >
              <TextInput
                placeholder="https://drive.google.com/…"
                value={f("FILE")} onChange={set("FILE")}
              />
            </Field>
        </div>
      </div>
    </div>

    {/* Info DMO */}
    <div>
      <SectionTitle title="Informasi Olimpiade" />
      <div className="grid gap-4">
        <div className="rounded-xl p-4 text-xs text-muted-foreground bg-amber-500/5 border border-amber-500/20 leading-6">
          <p className="font-semibold text-foreground mb-2">
            Bidang Olimpiade: <span className="text-foreground">Depok Math Olympiad — Matematika</span>
            <span className="block font-normal text-muted-foreground mt-0.5">DMO adalah olimpiade matematika individu satu babak (single round).</span>
          </p>
          <p className="font-semibold text-foreground mb-1">📋 Ketentuan Teknis DMO</p>
          <ul className="space-y-0.5 list-disc list-inside">
            <li>Peserta wajib membawa <strong className="text-foreground">laptop pribadi</strong> dan alat tulis.</li>
            <li>Wi-Fi akan disediakan oleh panitia.</li>
            <li>Penilaian: setiap soal pilihan ganda bernilai <strong className="text-foreground">1 poin</strong>.</li>
            <li>Medali Emas: KKM &gt; 80 · Perak: 70–79 · Perunggu: &lt; 69.</li>
            <li>Keterlambatan hadir akan mengurangi waktu pengerjaan.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

// ── Form DCC ──────────────────────────────────────────────────────
const DccForm = ({ f, set }: { f: (k: string) => string; set: (k: string) => (v: string) => void }) => {
  const isMhq = f("CATEGORIES") === "DCC — MHQ (Marawis, Hadroh & Qasidah)";
  const isTari = f("CATEGORIES").includes("Tari");

  return (
    <>
      {/* Kategori DCC */}
      <div>
        <SectionTitle title="Kategori Kompetisi" />
        <div className="grid gap-4">
          <div className="rounded-xl p-4 border border-primary/20 bg-primary/5">
            <Field label="Kategori DCC" required note="Pilih kategori terlebih dahulu sebelum mengisi data tim.">
              <SelectInput
                placeholder="-- Pilih Kategori DCC --"
                value={f("CATEGORIES")} onChange={set("CATEGORIES")}
                options={DCC_CATEGORIES}
              />
            </Field>

            {isTari && (
              <div className="mt-4 text-xs text-muted-foreground leading-6">
                <p className="font-semibold text-foreground mb-1">💃 Ketentuan Lomba Tari</p>
                <ul className="space-y-0.5 list-disc list-inside">
                  <li>Durasi penampilan <strong className="text-foreground">maksimal 5 menit</strong>.</li>
                  <li>Urutan penampilan ditentukan panitia dan <strong className="text-foreground">tidak dapat diubah</strong>.</li>
                  <li>File musik (MP3/WAV) wajib dikirim <strong className="text-foreground">H-14 sebelum acara</strong>.</li>
                  <li>Peserta wajib membawa file musik cadangan pada hari acara.</li>
                </ul>
              </div>
            )}
            {isMhq && (
              <div className="mt-4 text-xs text-muted-foreground leading-6">
                <p className="font-semibold text-foreground mb-1">🥁 Ketentuan MHQ (Marawis, Hadroh & Qasidah)</p>
                <ul className="space-y-0.5 list-disc list-inside">
                  <li>Jumlah peserta <strong className="text-foreground">maksimal 10 orang/tim</strong>. Terbuka untuk umum.</li>
                  <li>Membawakan <strong className="text-foreground">1 sholawat</strong> + <strong className="text-foreground">1 lagu bebas bernuansa islami</strong>.</li>
                  <li>Waktu penampilan <strong className="text-foreground">maksimal 5 menit</strong>.</li>
                  <li>Peserta membawa <strong className="text-foreground">peralatan musik sendiri</strong>. Peralatan elektronik <strong className="text-foreground">TIDAK diperkenankan</strong>.</li>
                  <li>Seluruh peserta wajib hadir <strong className="text-foreground">30 menit sebelum acara</strong>.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

    {/* Data Tim / Peserta */}
    <div>
      <SectionTitle title="Data Tim / Peserta" />
      <div className="grid gap-4">
        <Field
          label="Nama Ketua & Anggota Tim"
          required
          note={
            isMhq
              ? "Baris pertama = nama ketua tim. Kalau grup, tambahkan nama anggota di baris berikutnya (tekan Enter), maks. 10 orang/tim. Kalau solo, cukup isi 1 baris."
              : "Baris pertama = nama ketua tim / penampil solo. Kalau grup, tambahkan nama anggota di baris berikutnya (tekan Enter)."
          }
        >
          <TextArea
            placeholder={"Nama Ketua Tim\nNama Anggota 1\nNama Anggota 2"}
            value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={500}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="WhatsApp Ketua Tim" required note="Sertakan kode negara.">
            <TextInput placeholder="+62 …" value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
          </Field>
          <Field label="Email Ketua Tim" required note="LoA akan dikirim ke email ini.">
            <TextInput placeholder="email@example.com" value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
          </Field>
        </div>
        <Field
          label="Jumlah Anggota"
          note={isMhq ? "Maks. 10 orang/tim" : "Solo: 1 orang | Grup: sesuai kategori"}
        >
          <TextInput placeholder="Cth. 5" value={f("MEMBER_COUNT")} onChange={set("MEMBER_COUNT")} />
        </Field>
                <Field
        label="NISN / NIM Ketua & Anggota Tim"
        note={
          "Catatan: Masukkan NIM/NISN jika masih sekolah dengan urutan nama ketua tim dan anggota, dengan format sebagai berikut:\n\n" +
          "1201301\n1302402\n1020100"
        }
      >
        <TextArea
          placeholder="Masukkan NIM / NISN Ketua & Anggota Tim"
          value={f("NISN_NIM")} onChange={set("NISN_NIM")}
        />
      </Field>
      </div>
    </div>

  {/* Asal Sekolah / Komunitas */}
  <div>
    <SectionTitle title="Asal Sekolah / Komunitas" />
    <div className="grid gap-4">
      <Field
        label="Nama Sekolah / Komunitas / Sanggar"
        required
        note={
          isMhq
            ? "Kalau solo/satu asal, cukup isi 1 baris. Kalau anggota tim berasal dari sekolah/komunitas berbeda, tulis satu per baris sesuai urutan nama di Data Tim.\nContoh:\n\nSanggar Marawis Al-Hidayah (Ketua)\nSMAN 2 Depok (Anggota1)"
            : "Kalau solo/satu asal, cukup isi 1 baris. Kalau anggota tim berasal dari sekolah/sanggar berbeda, tulis satu per baris sesuai urutan nama di Data Tim.\nContoh:\n\nSMAN 2 Depok (Ketua)\nSanggar Tari Nusantara (Anggota1)"
        }
      >
        <TextArea
          placeholder={
            isMhq
              ? "Sanggar Marawis Al-Hidayah (Ketua)\nSMAN 2 Depok (Anggota1)"
              : "SMAN 2 Depok (Ketua)\nSanggar Tari Nusantara (Anggota1)"
          }
          value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={500}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Jenjang / Kategori Peserta" required>
          <SelectInput
            placeholder="-- Pilih Jenjang --"
            value={f("GRADE")} onChange={set("GRADE")}
            options={
              isMhq
                ? ["SD (Sekolah Dasar)", "SMP (Sekolah Menengah Pertama)", "SMA/SMK (Sekolah Menengah Atas)", "Umum / Komunitas"]
                : ["SD (Sekolah Dasar)", "SMP (Sekolah Menengah Pertama)", "SMA/SMK (Sekolah Menengah Atas)"]
            }
          />
        </Field>
      <Field label="NPSN Sekolah" note="Nomor Pokok Sekolah Nasional." required>
      <TextInput placeholder="Cth. 20229819" value={f("NPSN")} onChange={set("NPSN")} />
      </Field>
        <Field label="Kota / Provinsi" required>
          <TextInput placeholder="Cth. Depok, Jawa Barat" value={f("PROVINCE")} onChange={set("PROVINCE")} />
        </Field>
      </div>
    </div>
  </div>

      {/* Guru Pembimbing / PJ */}
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
            <Field label="Link Media Sosial" note="Instagram, LinkedIn, atau media sosial lainnya (opsional).">
      <TextInput placeholder="https://instagram.com/username" value={f("SOCIAL_MEDIA")} onChange={set("SOCIAL_MEDIA")} />
    </Field>
          </div>
        </div>
      </div>

      {/* Detail Penampilan — layout disamakan dengan BIESF */}
      {f("CATEGORIES") && (
        <div>
          <SectionTitle title="Detail Penampilan" />
          <div className="grid gap-4">
            <Field
              label={isMhq ? "Judul Sholawat & Lagu Islami" : "Judul / Nama Penampilan"}
              required
              note={
                isMhq
                  ? "Tuliskan 1 judul sholawat dan 1 judul lagu bebas bernuansa islami. Cth: Sholawat: Ya Habibal Qolbi | Lagu: Tombo Ati"
                  : "Judul tari atau nama penampilan yang akan ditampilkan. Tidak dapat diubah setelah pengiriman."
              }
            >
              <TextArea
                placeholder={isMhq ? "Sholawat: … | Lagu: …" : "Judul tari / penampilan"}
                value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")} maxLength={160}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Reuse CATEGORIES slot kosong di sini tidak perlu — kategori sudah dipilih di atas.
                  Sejajarkan pertanyaan partisipasi sebelumnya, sesuai pola BIESF. */}
              <Field label="Apakah penampilan ini pernah diikutkan kompetisi sebelumnya?" required>
                <SelectInput
                  placeholder="-- Pilih --"
                  value={f("YES_NO")} onChange={set("YES_NO")}
                  options={["Ya", "Tidak"]}
                />
              </Field>

              {isTari && ( 
                <Field
                  label="foto (bersama grup/solo) dan File Musik (Google Drive)"
                  note="Wajib dikirim H-14 sebelum acara." required
                >
                  <TextInput placeholder="https://drive.google.com/…" value={f("DRIVE_LINK")} onChange={set("DRIVE_LINK")} />
                </Field>
              )}
              {isMhq && (
                <Field
                  label="Foto bersama Grup"
                  note="Elektronik TIDAK diperkenankan saat tampil."
                  required
                >
                  <TextInput placeholder="https://drive.google.com/…" value={f("DRIVE_LINK")} onChange={set("DRIVE_LINK")} />
                </Field>
              )}
            </div>

            {f("YES_NO") === "Ya" && (
              <Field
                label="Nama Kompetisi Sebelumnya"
                note="Tuliskan nama event/kompetisi yang pernah diikuti dengan judul yang sama."
              >
                <TextArea
                  placeholder="Cth. YICC 2025, DCC 2025…"
                  value={f("JUDUL_PERNAH_BERPARTISIPASI")} onChange={set("JUDUL_PERNAH_BERPARTISIPASI")}
                />
              </Field>
            )}
            <Field
              label="Peralatan music yang di bawa (jika ada)"
            >
              <TextInput
                placeholder="cth: ,Rebana, kipas tari, bedug, simbal, dll"
                value={f("FILE")} onChange={set("FILE")}
              />
            </Field>
          </div>
        </div>
      )}
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

  const formWithMeta: FormData = {
    ...form,
    CATEGORY_COMPETITION: DSCF_SUB_LABELS[subEvent],
    CATEGORY_PRICE:       DSCF_PRICE_MAP[subEvent],
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
    <div className="w-full">

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          Langkah 3 dari 3
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">Formulir Pendaftaran</h2>
        <p className="text-muted-foreground mt-1 text-sm">DSCF 2026 · {subLabel} · Depok, Indonesia</p>
      </div>

      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-8">

        {/* Info banner */}
        <div className="rounded-xl p-4 text-sm text-muted-foreground leading-6 bg-primary/5 border border-primary/20">
          <p className="font-semibold text-foreground mb-2">📌 DSCF 2026 — {subLabel}</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Isi semua data dengan benar. Data yang dikirim bersifat <strong className="text-foreground">final</strong> dan tidak dapat diubah.</li>
            <li>Selesaikan pembayaran paling lambat <strong className="text-foreground">27 Agustus 2026</strong>.</li>
            <li>Berita transfer: <strong className="text-foreground">DSCF + Nama Lengkap</strong>.</li>
            <li>LoA dikirim ke email ketua dalam <strong className="text-foreground">3 hari kerja</strong> setelah pembayaran terverifikasi.</li>
            <li>Biaya pendaftaran: <strong className="text-primary">{DSCF_PRICE_MAP[subEvent]}</strong></li>
          </ol>
        </div>

        {/* Form per sub-event */}
        {subEvent === "desf" && <DesfForm f={f} set={set} />}
        {subEvent === "dmo"  && <DmoForm  f={f} set={set} />}
        {subEvent === "dcc"  && <DccForm  f={f} set={set} />}

        {/* Informasi Umum */}
        <div>
          <SectionTitle title="Informasi Umum" />
          <div className="grid gap-4">
            <Field label="Alamat Lengkap" required note="Jalan, Kelurahan, Kecamatan, Kota, Provinsi">
              <TextArea
                placeholder="Masukkan alamat lengkap…"
                value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")}
              />
            </Field>
            <Field label="Dari mana Anda mengetahui DSCF 2026?">
              <SelectInput
                placeholder="-- Pilih Sumber Informasi --"
                value={f("INFORMATION_RESOURCES")} onChange={set("INFORMATION_RESOURCES")}
                options={["Instagram", "WhatsApp", "Teman / Guru", "Website ICGI", "YouTube", "Lainnya"]}
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