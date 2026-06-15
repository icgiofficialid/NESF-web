// ================================================================
// dscf.ts
// Path: src/config/events/dscf.ts
//
// Data event DSCF (Depok Science & Cultural Festival) 2026
// Portal: NESF  |  Peserta: Indonesia Only
// Sub-kompetisi: DESF · DMO · DCC
// Semua teks: Bahasa Indonesia
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const dscf: EventDetailData = {
  slug: "dscf-2026",
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
  ],
  guidebookUrl: "", // Isi URL guidebook PDF jika sudah tersedia

  email:   "icgi.official.id@gmail.com",
  website: "www.icgi.or.id",
  venue:   "Depok, Indonesia",

  labels: {
    eventBadge:     "ICGI · DSCF 2026",
    heroBadge:      "Kompetisi · Nasional · Depok, Indonesia",
    categoriesDesc:
      "Peserta dapat mendaftar pada tiga sub-kompetisi: Depok Engineering Science Fair (DESF), Depok Math Olympiad (DMO), dan Depok Cultural Competition (DCC).",
    scheduleDesc:
      "DSCF 2026 berlangsung pada 29 September – 1 Oktober 2026 di Depok, mencakup Seremoni Pembukaan, Sesi Penjurian, dan Upacara Penghargaan.",
  },

  stats: [
    { value: "3",          label: "Sub-Kompetisi" },
    { value: "29 Sep",     label: "Pembukaan" },
    { value: "24 Agt",     label: "Batas Pendaftaran" },
    { value: "Depok",      label: "Lokasi" },
  ],

  regSteps: [
    "Pilih sub-kompetisi yang ingin diikuti: DESF, DMO, atau DCC.",
    "Baca dan setujui Syarat & Ketentuan kompetisi.",
    "Isi Formulir Pendaftaran dengan data tim, sekolah, pembimbing, dan detail proyek/penampilan.",
    "Lakukan pembayaran dan unggah bukti transfer via Google Drive. Berita Transfer: IESF + Nama Lengkap.",
    "Surat Keputusan Penerimaan (LoA) akan dikirim ke email ketua tim dalam 3 hari kerja.",
  ],

  about: {
    welcome:
      "Depok Science & Cultural Festival (DSCF) 2026 hadir sebagai ajang kompetisi sekaligus apresiasi bagi pelajar untuk mengembangkan potensi di bidang sains, matematika, dan budaya. Kegiatan ini diharapkan dapat mendorong semangat inovasi, sportivitas, serta pelestarian budaya lokal di kalangan generasi muda.",
    background:
      "DSCF 2026 terdiri dari tiga sub-kompetisi: Depok Engineering Science Fair (DESF) dengan 8 kategori bidang sains dan rekayasa, Depok Math Olympiad (DMO) untuk kompetisi matematika individu, serta Depok Cultural Competition (DCC) yang mencakup lomba Tari dan MHQ (Marawis, Hadroh & Qasidah).",
    objectives: [
      "Meningkatkan minat dan bakat pelajar di bidang sains, matematika, dan budaya.",
      "Menjadi wadah kompetisi yang sehat, edukatif, dan mendorong kreativitas serta inovasi generasi muda.",
      "Melestarikan budaya lokal melalui kompetisi seni dan membangun jaringan antar pelajar dari berbagai jenjang pendidikan.",
    ],
  },

  divisions: [
    { level: "Sekolah Dasar (SD)",            age: "Tingkat SD"    },
    { level: "Sekolah Menengah (SMP/SMA)",    age: "Tingkat SMP/SMA" },
    { level: "Umum (khusus MHQ)",             age: "Semua usia"    },
  ],

  // ── Kategori mencakup semua sub-kompetisi ──────────────────────
  categories: [
    // DESF
    {
      letter: "DESF-1",
      title:       "Matematika, Sains & Teknologi",
      description: "Berfokus pada pengembangan inovasi berbasis konsep matematika, sains, dan teknologi untuk memecahkan masalah secara efektif dan praktis.",
      icon: "Cpu",
    },
    {
      letter: "DESF-2",
      title:       "Lingkungan",
      description: "Mencakup proyek yang menawarkan solusi atas masalah lingkungan seperti perubahan iklim, pengelolaan sampah, konservasi, dan keberlanjutan.",
      icon: "Leaf",
    },
    {
      letter: "DESF-3",
      title:       "IoT & Robotika",
      description: "Menampilkan pengembangan perangkat berbasis IoT dan robotika yang bertujuan meningkatkan efisiensi dan otomatisasi di berbagai bidang.",
      icon: "Cpu",
    },
    {
      letter: "DESF-4",
      title:       "Informatika & Kecerdasan Buatan",
      description: "Berfokus pada pengembangan perangkat lunak, sistem informasi, dan penerapan kecerdasan buatan untuk memecahkan masalah secara inovatif.",
      icon: "Cpu",
    },
    {
      letter: "DESF-5",
      title:       "Ilmu Hayati",
      description: "Mencakup penelitian biologi dan ilmu hayati, termasuk kesehatan, genetika, mikrobiologi, dan bioteknologi.",
      icon: "HeartPulse",
    },
    {
      letter: "DESF-6",
      title:       "Ilmu Sosial & Humaniora",
      description: "Menganalisis fenomena sosial, budaya, dan humaniora untuk memberikan solusi atas masalah sosial melalui pendekatan ilmiah.",
      icon: "Users",
    },
    {
      letter: "DESF-7",
      title:       "Fisika, Energi & Teknik",
      description: "Berfokus pada penerapan konsep fisika, energi, dan teknik untuk menciptakan inovasi teknologi yang efisien dan berkelanjutan.",
      icon: "FlaskConical",
    },
    {
      letter: "DESF-8",
      title:       "Kesehatan & Kedokteran",
      description: "Mencakup inovasi dan penelitian di bidang kesehatan dan kedokteran yang bertujuan meningkatkan kualitas hidup dan layanan kesehatan.",
      icon: "HeartPulse",
    },
    // DMO
    {
      letter: "DMO",
      title:       "Depok Math Olympiad",
      description: "Kompetisi matematika individu satu babak. Peserta mengerjakan soal pilihan ganda sesuai jenjang. Penilaian berdasarkan ketepatan dan jumlah jawaban benar.",
      icon: "FlaskConical",
    },
    // DCC
    {
      letter: "DCC-1",
      title:       "Tari",
      description: "Menampilkan kreativitas, kekompakan, dan keindahan gerakan tari sebagai bentuk pelestarian seni dan budaya. Durasi dan kategori (solo/grup) sesuai ketentuan panitia.",
      icon: "Users",
    },
    {
      letter: "DCC-2",
      title:       "MHQ (Marawis, Hadroh & Qasidah)",
      description: "Menampilkan seni musik islami melalui harmonisasi vokal dan tabuhan rebana. Maksimal 10 orang/tim, membawakan 1 sholawat dan 1 lagu bebas bernuansa islami. Waktu maksimal 7 menit.",
      icon: "Users",
    },
  ],

  // ── Kriteria penilaian gabungan (DESF sebagai utama) ──────────
  judgingCriteria: [
    // DESF
    { aspect: "Inovasi dan Orisinalitas (DESF)",          weight: "25%" },
    { aspect: "Kualitas Ilmiah (DESF)",                   weight: "25%" },
    { aspect: "Kreativitas (DESF)",                       weight: "25%" },
    { aspect: "Presentasi & Penguasaan Materi (DESF)",    weight: "25%" },
  ],

  awards: [
    // DESF
    { place: "DESF — Juara Pertama",   medal: "Sertifikat & Medali", extra: "Nilai: 86–100" },
    { place: "DESF — Juara Kedua",     medal: "Sertifikat & Medali", extra: "Nilai: 71–85"  },
    { place: "DESF — Juara Ketiga",    medal: "Sertifikat & Medali", extra: "Nilai: 55–70"  },
    { place: "DESF — Juara Keempat",   medal: "Sertifikat & Medali", extra: "Nilai: ≤54"    },
    // DMO
    { place: "DMO — Penghargaan Emas",   medal: "Sertifikat & Medali", extra: "Nilai > 80"    },
    { place: "DMO — Penghargaan Perak",  medal: "Sertifikat & Medali", extra: "Nilai 70–79"   },
    { place: "DMO — Penghargaan Perunggu", medal: "Sertifikat & Medali", extra: "Nilai < 69"  },
    // DCC Tari
    { place: "DCC Tari — Juara Pertama",   medal: "Hadiah & Sertifikat", extra: "" },
    { place: "DCC Tari — Juara Kedua",     medal: "Hadiah & Sertifikat", extra: "" },
    { place: "DCC Tari — Juara Ketiga",    medal: "Hadiah & Sertifikat", extra: "" },
    { place: "DCC Tari — Kostum Terbaik",  medal: "Hadiah & Sertifikat", extra: "" },
    // DCC MHQ
    { place: "DCC MHQ — 5–6 Tim Terpilih", medal: "Hadiah & Sertifikat", extra: "Sistem parade/undian" },
  ],

  scheduleOffline: [
    {
      day: 1,
      date:  "29 September 2026",
      title: "Seremoni Pembukaan",
      items: [
        { time: "TBA", description: "Seremoni Pembukaan DSCF 2026", location: "Depok" },
      ],
    },
    {
      day: 2,
      date:  "30 September 2026",
      title: "Hari Kompetisi (Jadwal Menyusul)",
      items: [
        { time: "TBA", description: "Sesi Kompetisi DESF / DMO / DCC (Jadwal Menyusul)", location: "Depok" },
      ],
    },
    {
      day: 3,
      date:  "1 Oktober 2026",
      title: "Hari Kompetisi (Jadwal Menyusul)",
      items: [
        { time: "TBA", description: "Sesi Kompetisi DESF / DMO / DCC (Jadwal Menyusul)", location: "Depok" },
      ],
    },
    {
      day: 4,
      date:  "2 Oktober 2026",
      title: "Hari Kompetisi (Jadwal Menyusul)",
      items: [
        { time: "TBA", description: "Sesi Kompetisi DESF / DMO / DCC (Jadwal Menyusul)", location: "Depok" },
      ],
    },
    {
      day: 5,
      date:  "3 Oktober 2026",
      title: "Upacara Penghargaan & Penutupan",
      items: [
        { time: "TBA", description: "Upacara Penghargaan & Penutupan DSCF 2026", location: "Depok" },
      ],
    },
  ],

  scheduleOnline: [], // DSCF hanya offline

  schedule: [], // kept for type compatibility
};

export default dscf;