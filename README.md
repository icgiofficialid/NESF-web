# DSCF 2026 — Struktur Google Spreadsheet & GAS

## Nama Sheet (Tab) yang Diperlukan

GAS deployment Anda perlu membaca `sheetTarget` dari query param dan menulis ke tab yang sesuai.
Buat **3 tab** berikut di satu Google Spreadsheet:

| Nama Tab (sheetTarget) | Sub-Kompetisi                        |
|------------------------|--------------------------------------|
| `dscf-desf`            | Depok Engineering Science Fair (DESF)|
| `dscf-dmo`             | Depok Math Olympiad (DMO)            |
| `dscf-dcc`             | Depok Cultural Competition (DCC)     |

---

## Header Kolom — Tab `dscf-desf` (DESF)

| Kolom (Header)               | Isi                                                     | Wajib |
|------------------------------|---------------------------------------------------------|-------|
| `timestamp`                  | ISO timestamp saat submit                               | ✅    |
| `sheetTarget`                | Selalu "dscf-desf"                                      | ✅    |
| `SUB_EVENT`                  | "Depok Engineering Science Fair (DESF)"                 | ✅    |
| `CATEGORY_COMPETITION`       | Sama dengan SUB_EVENT                                   | ✅    |
| `CATEGORY_PRICE`             | "Rp 350.000 / tim"                                      | ✅    |
| `NAMA_LENGKAP`               | Nama Ketua / Anggota1 / Anggota2 (format: A / B / C)   | ✅    |
| `LEADER_WHATSAPP`            | No. WA ketua tim (+62…)                                 | ✅    |
| `LEADER_EMAIL`               | Email ketua (LoA dikirim ke sini)                       | ✅    |
| `SOCIAL_MEDIA`               | Instagram / media sosial tim                            | ❌    |
| `NAMA_SEKOLAH`               | Nama sekolah / institusi                                | ✅    |
| `GRADE`                      | Jenjang (SD / SMP / SMA/SMK)                            | ✅    |
| `NISN_NIM`                   | NISN / nomor identitas siswa                            | ❌    |
| `PROVINCE`                   | Provinsi / Kota                                         | ❌    |
| `NAME_SUPERVISOR`            | Nama guru pembimbing                                    | ✅    |
| `WHATSAPP_NUMBER_SUPERVISOR` | WA guru pembimbing                                      | ✅    |
| `EMAIL_TEACHER_SUPERVISOR`   | Email guru pembimbing                                   | ✅    |
| `CATEGORIES`                 | Kategori bidang proyek (8 pilihan DESF)                 | ✅    |
| `PROJECT_TITLE`              | Judul proyek / penelitian                               | ✅    |
| `PROJECT_ABSTRACT`           | Abstrak / ringkasan proyek (maks. 300 kata)             | ❌    |
| `DRIVE_LINK`                 | Link Drive ke makalah, poster A0, dokumen pendukung     | ❌    |
| `MEMBER_COUNT`               | Jumlah anggota tim                                      | ❌    |
| `COMPLETE_ADDRESS`           | Alamat lengkap (Jalan, Kota, Provinsi)                  | ✅    |
| `INFORMATION_RESOURCES`      | Sumber info tentang DSCF                                | ❌    |
| `FILE`                       | Link Drive bukti pembayaran                             | ❌    |
| `YES_NO`                     | Pernah ikut kompetisi sebelumnya? (Ya/Tidak)            | ❌    |
| `JUDUL_PERNAH_BERPARTISIPASI`| Judul proyek sebelumnya (jika pernah)                   | ❌    |

---

## Header Kolom — Tab `dscf-dmo` (DMO)

| Kolom (Header)               | Isi                                                     | Wajib |
|------------------------------|---------------------------------------------------------|-------|
| `timestamp`                  | ISO timestamp saat submit                               | ✅    |
| `sheetTarget`                | Selalu "dscf-dmo"                                       | ✅    |
| `SUB_EVENT`                  | "Depok Math Olympiad (DMO)"                             | ✅    |
| `CATEGORY_COMPETITION`       | Sama dengan SUB_EVENT                                   | ✅    |
| `CATEGORY_PRICE`             | "Rp 175.000 / peserta"                                  | ✅    |
| `NAMA_LENGKAP`               | Nama lengkap peserta (individu)                         | ✅    |
| `LEADER_WHATSAPP`            | WA peserta / orang tua (+62…)                           | ✅    |
| `LEADER_EMAIL`               | Email peserta / orang tua (LoA dikirim ke sini)         | ✅    |
| `SOCIAL_MEDIA`               | Media sosial (opsional)                                 | ❌    |
| `NAMA_SEKOLAH`               | Nama sekolah                                            | ✅    |
| `GRADE`                      | Jenjang / kelas (Kelas 4 SD – Kelas 12 SMA/SMK)        | ✅    |
| `NISN_NIM`                   | NISN peserta                                            | ❌    |
| `PROVINCE`                   | Provinsi / Kota                                         | ❌    |
| `NAME_SUPERVISOR`            | Nama guru pembimbing                                    | ✅    |
| `WHATSAPP_NUMBER_SUPERVISOR` | WA guru pembimbing                                      | ✅    |
| `EMAIL_TEACHER_SUPERVISOR`   | Email guru pembimbing                                   | ✅    |
| `CATEGORIES`                 | Selalu "Depok Math Olympiad (DMO)"                      | ✅    |
| `PROJECT_TITLE`              | Tema / judul (opsional, bisa kosong)                    | ❌    |
| `PROJECT_ABSTRACT`           | Tidak dipakai untuk DMO                                 | ❌    |
| `DRIVE_LINK`                 | Tidak dipakai untuk DMO                                 | ❌    |
| `MEMBER_COUNT`               | Selalu "1" (individu)                                   | ❌    |
| `COMPLETE_ADDRESS`           | Alamat lengkap                                          | ✅    |
| `INFORMATION_RESOURCES`      | Sumber info tentang DSCF                                | ❌    |
| `FILE`                       | Link Drive bukti pembayaran                             | ❌    |
| `YES_NO`                     | Tidak dipakai untuk DMO                                 | ❌    |
| `JUDUL_PERNAH_BERPARTISIPASI`| Tidak dipakai untuk DMO                                 | ❌    |

---

## Header Kolom — Tab `dscf-dcc` (DCC)

| Kolom (Header)               | Isi                                                            | Wajib |
|------------------------------|----------------------------------------------------------------|-------|
| `timestamp`                  | ISO timestamp saat submit                                      | ✅    |
| `sheetTarget`                | Selalu "dscf-dcc"                                              | ✅    |
| `SUB_EVENT`                  | "Depok Cultural Competition (DCC)"                             | ✅    |
| `CATEGORY_COMPETITION`       | Sama dengan SUB_EVENT                                          | ✅    |
| `CATEGORY_PRICE`             | "Rp 50.000 / tim"                                              | ✅    |
| `NAMA_LENGKAP`               | Nama ketua + semua anggota (format: A / B / C / …)             | ✅    |
| `LEADER_WHATSAPP`            | WA ketua tim (+62…)                                            | ✅    |
| `LEADER_EMAIL`               | Email ketua (LoA dikirim ke sini)                              | ✅    |
| `SOCIAL_MEDIA`               | Instagram / media sosial tim                                   | ❌    |
| `NAMA_SEKOLAH`               | Nama sekolah / komunitas / sanggar                             | ✅    |
| `GRADE`                      | Jenjang (SD / SMP / SMA/SMK / Umum)                            | ✅    |
| `NISN_NIM`                   | NISN / identitas (opsional untuk umum/komunitas)               | ❌    |
| `PROVINCE`                   | Provinsi / Kota                                                | ❌    |
| `NAME_SUPERVISOR`            | Nama guru pembimbing / penanggung jawab                        | ✅    |
| `WHATSAPP_NUMBER_SUPERVISOR` | WA pembimbing / PJ                                             | ✅    |
| `EMAIL_TEACHER_SUPERVISOR`   | Email pembimbing / PJ                                          | ✅    |
| `CATEGORIES`                 | Kategori: "DCC — Tari (Solo)" / "DCC — Tari (Grup)" / "DCC — MHQ" | ✅ |
| `PROJECT_TITLE`              | Tari: judul tari / MHQ: nama sholawat + lagu bebas             | ✅    |
| `PROJECT_ABSTRACT`           | Tidak dipakai untuk DCC                                        | ❌    |
| `DRIVE_LINK`                 | Tari: link file musik (MP3/WAV) / MHQ: daftar peralatan        | ❌    |
| `MEMBER_COUNT`               | Jumlah anggota tim (MHQ maks. 10)                              | ❌    |
| `COMPLETE_ADDRESS`           | Alamat lengkap                                                 | ✅    |
| `INFORMATION_RESOURCES`      | Sumber info tentang DSCF                                       | ❌    |
| `FILE`                       | Link Drive bukti pembayaran                                    | ❌    |
| `YES_NO`                     | Tidak dipakai untuk DCC                                        | ❌    |
| `JUDUL_PERNAH_BERPARTISIPASI`| Tidak dipakai untuk DCC                                        | ❌    |

---

## Cara Setup GAS

1. Buka Google Spreadsheet baru → buat 3 tab: `dscf-desf`, `dscf-dmo`, `dscf-dcc`
2. Copy header kolom (sesuai tabel di atas) ke baris pertama masing-masing tab
3. Di GAS editor, baca `sheetTarget` dari `e.parameter.sheetTarget`
4. Tulis ke tab yang namanya sama dengan nilai `sheetTarget`
5. Deploy sebagai Web App (akses: Anyone) → copy URL
6. Ganti `DSCF_SHEET_URL` di `dscfRegisterConfig.tsx` dengan URL tersebut

## Contoh GAS Handler

```javascript
function doGet(e) {
  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  const target = e.parameter.sheetTarget || "dscf-desf";
  const sheet  = ss.getSheetByName(target);
  if (!sheet) return ContentService.createTextOutput("Sheet not found");

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row     = headers.map(h => e.parameter[h] || "");
  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Route yang Perlu Ditambahkan di App.tsx

```tsx
// Di src/App.tsx — tambahkan route ini
import DscfRegister from "@/pages/nesf/DscfRegister";

// Di dalam <Routes>:
<Route path="/dscf/register" element={<DscfRegister />} />
// atau jika DSCF punya halaman detail event sendiri:
<Route path="/events/dscf-2026/register" element={<DscfRegister />} />
```

## Tombol "Daftar Sekarang" di DSCFDetail.tsx

Di `DSCFDetail.tsx` (atau `EventDetailPage.tsx`), pastikan tombol Daftar mengarah ke:
```
/dscf/register
```
bukan ke `/register` (flow IESF/NESF umum).