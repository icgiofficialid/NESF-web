// ================================================================
// dscf.ts
// Path: src/config/events/dscf.ts
//
// Data event DSCF (Depok Science & Cultural Festival) 2026
// Portal: NESF  |  Peserta: Indonesia Only
// Sub-kompetisi: DESF · DMO · DCC
// Semua teks: Bahasa Indonesia
//
// Disesuaikan dengan JUKNIS DSCF 2026 resmi terbaru (Kompetisi Hybrid).
// DESF & DMO: tersedia Daring dan Luring. DCC: hanya Luring (offline).
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const dscf: EventDetailData = {
  slug: "Depok Science & Cultural Festival 2026",
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
    { name: "IYSA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png" },
    { name: "DSCF", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1783935566/logo_dcsf.pdf_glnqma.png" },
  ],
  guidebookUrl: "",

  email:   "icgi.official.id@gmail.com",
  website: "www.icgi.or.id",
  venue:   "Depok, Jawa Barat",

  labels: {
    eventBadge:     "ICGI · DSCF 2026",
    heroBadge:      "Kompetisi Hybrid · Nasional · Depok, Jawa Barat",
    categoriesDesc:
      "Peserta dapat mendaftar pada tiga sub-kompetisi: Depok Engineering Science Fair (DESF), Depok Math Olympiad (DMO), dan Depok Cultural Competition (DCC). DESF dan DMO tersedia dalam format Daring maupun Luring, sedangkan DCC hanya diselenggarakan secara Luring di Depok.",
    scheduleDesc:
      "DSCF 2026 berlangsung pada 29 September – 3 Oktober 2026. Peserta Luring mengikuti seluruh rangkaian di Depok, Jawa Barat, sementara peserta Daring (DESF & DMO) mengikuti sesi penilaian melalui Zoom pada 29–30 September 2026, dengan pengumuman penghargaan pada 1 Oktober 2026.",
  },

  stats: [
    { value: "3",      label: "Sub-Kompetisi" },
    { value: "6 Jul",  label: "Pendaftaran Dibuka" },
    { value: "24 Agt", label: "Batas Pendaftaran" },
    { value: "27 Agt", label: "Batas Pembayaran" },
  ],

  regSteps: [
    "Pilih sub-kompetisi yang ingin diikuti: DESF, DMO, atau DCC.",
    "Khusus DESF dan DMO: pilih format partisipasi — Daring atau Luring. DCC hanya tersedia Luring.",
    "Baca dan setujui Syarat & Ketentuan sesuai sub-kompetisi dan format yang dipilih.",
    "Isi Formulir Pendaftaran dengan data tim, sekolah, pembimbing, dan detail proyek/penampilan secara lengkap dan benar. Peserta wajib dibuktikan dengan identitas resmi yang masih berlaku sesuai jenjang lomba (SD/SMP/SMA) atau umum khusus kategori MHQ.",
    "Lakukan pembayaran paling lambat 26–27 Agustus 2026 dan unggah bukti transfer via Google Drive. Berita Transfer: DSCF + Nama Lengkap.",
    "Khusus peserta DESF (Daring maupun Luring): kirimkan makalah lengkap (format PDF/Word, maks. 12 halaman, template resmi) sebelum hari pelaksanaan.",
    "Khusus peserta DESF Luring: siapkan standing banner/X-banner ukuran 60×160 cm untuk hari-H. Peserta DESF Daring mengikuti presentasi melalui Zoom dan wajib menunjukkan produk yang dibuat.",
    "Khusus peserta DCC kategori Tari: kirimkan file musik (MP3/WAV) beserta file cadangan selambat-lambatnya H-14 sebelum acara.",
    "Seluruh peserta wajib mematuhi peraturan dan tata tertib panitia selama rangkaian kegiatan berlangsung; keputusan panitia dan dewan juri bersifat final.",
  ],

  about: {
    welcome:
      "Depok Science & Cultural Festival (DSCF) 2026 hadir sebagai ajang kompetisi sekaligus apresiasi bagi pelajar untuk mengembangkan potensi di bidang sains, matematika, dan budaya. Kegiatan ini diharapkan dapat mendorong semangat inovasi, sportivitas, serta pelestarian budaya lokal di kalangan generasi muda.",
    background:
      "Perkembangan ilmu pengetahuan dan teknologi yang pesat harus diimbangi dengan penguatan nilai budaya serta kreativitas generasi muda. Oleh karena itu, diperlukan suatu wadah yang mampu mengakomodasi keduanya dalam satu kegiatan yang terpadu. DSCF 2026 diselenggarakan sebagai kompetisi hybrid dan terdiri dari tiga sub-kompetisi: Depok Engineering Science Fair (DESF, maksimal 4 orang/tim) dengan 8 kategori bidang sains dan rekayasa, tersedia format Daring maupun Luring; Depok Math Olympiad (DMO) untuk kompetisi matematika individu satu babak, juga tersedia Daring maupun Luring; serta Depok Cultural Competition (DCC) yang mencakup lomba Tari dan MHQ (Marawis, Hadroh & Qasidah), diselenggarakan secara Luring di Depok. Ketentuan umum: peserta merupakan pelajar aktif sesuai jenjang lomba (SD, SMP, SMA) atau umum untuk kategori MHQ, dibuktikan dengan identitas resmi yang masih berlaku; peserta wajib mendaftar secara lengkap dan benar serta menyelesaikan pembayaran sesuai ketentuan panitia; dan seluruh peserta wajib mematuhi peraturan serta tata tertib yang berlaku selama rangkaian kegiatan.",
    objectives: [
      "Meningkatkan minat dan bakat pelajar di bidang sains, matematika, dan budaya.",
      "Menjadi wadah kompetisi yang sehat, edukatif, dan mendorong kreativitas serta inovasi generasi muda.",
      "Melestarikan budaya lokal melalui kompetisi seni dan membangun jaringan antar pelajar dari berbagai jenjang pendidikan.",
    ],
  },

  divisions: [
    { level: "Sekolah Dasar (SD)",         age: "Tingkat SD"      },
    { level: "Sekolah Menengah (SMP/SMA)", age: "Tingkat SMP/SMA" },
    { level: "Umum (khusus MHQ)",          age: "Semua usia"      },
  ],

  categories: [
    {
      letter: "DESF-1", title: "Matematika, Sains & Teknologi",
      description: "Berfokus pada pengembangan inovasi berbasis konsep matematika, sains, dan teknologi untuk memecahkan masalah secara efektif dan praktis.",
      icon: "Cpu",
    },
    {
      letter: "DESF-2", title: "Lingkungan",
      description: "Mencakup proyek yang menawarkan solusi atas masalah lingkungan seperti perubahan iklim, pengelolaan sampah, konservasi, dan keberlanjutan.",
      icon: "Leaf",
    },
    {
      letter: "DESF-3", title: "IoT & Robotika",
      description: "Menampilkan pengembangan perangkat berbasis IoT dan robotika yang bertujuan meningkatkan efisiensi dan otomatisasi di berbagai bidang.",
      icon: "Cpu",
    },
    {
      letter: "DESF-4", title: "Informatika & Kecerdasan Buatan",
      description: "Berfokus pada pengembangan perangkat lunak, sistem informasi, dan penerapan kecerdasan buatan untuk memecahkan masalah secara inovatif.",
      icon: "Cpu",
    },
    {
      letter: "DESF-5", title: "Ilmu Hayati",
      description: "Mencakup penelitian biologi dan ilmu hayati, termasuk kesehatan, genetika, mikrobiologi, dan bioteknologi.",
      icon: "HeartPulse",
    },
    {
      letter: "DESF-6", title: "Ilmu Sosial & Humaniora",
      description: "Menganalisis fenomena sosial, budaya, dan humaniora untuk memberikan solusi atas masalah sosial melalui pendekatan ilmiah.",
      icon: "Users",
    },
    {
      letter: "DESF-7", title: "Fisika, Energi & Teknik",
      description: "Berfokus pada penerapan konsep fisika, energi, dan teknik untuk menciptakan inovasi teknologi yang efisien dan berkelanjutan.",
      icon: "FlaskConical",
    },
    {
      letter: "DESF-8", title: "Kesehatan & Kedokteran",
      description: "Mencakup inovasi dan penelitian di bidang kesehatan dan kedokteran yang bertujuan meningkatkan kualitas hidup dan layanan kesehatan.",
      icon: "HeartPulse",
    },
    {
      letter: "DMO", title: "Depok Math Olympiad",
      description: "Menampilkan kemampuan berpikir logis, analitis, dan kreativitas dalam pemecahan masalah matematika tingkat tinggi guna menjaring talenta muda berbakat di bidang numerasi. Kompetisi dilaksanakan dalam satu babak (single round) secara individu sesuai jenjang, tersedia Daring maupun Luring.",
      icon: "FlaskConical",
    },
    {
      letter: "DCC-1", title: "Tari",
      description: "Menampilkan kreativitas, kekompakan, dan keindahan gerakan tari sebagai bentuk pelestarian seni dan budaya. Peserta tampil sesuai kategori (solo/grup, maksimal 10 orang) dengan durasi maksimal 5 menit.",
      icon: "Users",
    },
    {
      letter: "DCC-2", title: "MHQ (Marawis, Hadroh & Qasidah)",
      description: "Menampilkan seni musik islami melalui harmonisasi vokal dan tabuhan rebana yang bernilai religi dan kreatif. Maksimal 10 orang/tim, membawakan 1 sholawat dan 1 lagu bebas bernuansa islami. Waktu maksimal 5 menit.",
      icon: "Users",
    },
  ],

  judgingCriteria: [
    { aspect: "Inovasi & Orisinalitas (DESF)",   weight: "30%" },
    { aspect: "Metodologi (DESF)",               weight: "25%" },
    { aspect: "Dampak / Efek (DESF)",            weight: "20%" },
    { aspect: "Presentasi (DESF)",               weight: "15%" },
    { aspect: "Booth & Standing Banner (DESF)",  weight: "10%" },
    { aspect: "Teknik Gerak (Tari)",             weight: "30%" },
    { aspect: "Ekspresi & Penjiwaan (Tari)",     weight: "20%" },
    { aspect: "Kreativitas Koreografi (Tari)",   weight: "20%" },
    { aspect: "Kostum & Penampilan (Tari)",      weight: "20%" },
    { aspect: "Kekompakan (Tari)",               weight: "10%" },
    { aspect: "Kekompakan Tim (MHQ)",            weight: "30%" },
    { aspect: "Vokal & Harmonisasi (MHQ)",       weight: "30%" },
    { aspect: "Aransemen Musik (MHQ)",           weight: "20%" },
    { aspect: "Penampilan Panggung (MHQ)",       weight: "20%" },
    { aspect: "Setiap Soal Pilihan Ganda (DMO)", weight: "1 poin/soal" },
  ],

  awards: [
    { place: "DESF — Juara Pertama",       medal: "Sertifikat & Medali", extra: "ICGI Platinum / Achievement Award (selektif)" },
    { place: "DESF — Juara Kedua",         medal: "Sertifikat & Medali", extra: "" },
    { place: "DESF — Juara Ketiga",        medal: "Sertifikat & Medali", extra: "" },
    { place: "DESF — Juara Keempat",       medal: "Sertifikat & Medali", extra: "" },
    { place: "DMO — Penghargaan Emas",     medal: "Sertifikat & Medali", extra: "KKM > 80"  },
    { place: "DMO — Penghargaan Perak",    medal: "Sertifikat & Medali", extra: "KKM 70–79" },
    { place: "DMO — Penghargaan Perunggu", medal: "Sertifikat & Medali", extra: "KKM < 69"  },
    { place: "DMO — Penghargaan Terbaik",  medal: "Sertifikat & Medali", extra: "Nilai Kelulusan tertinggi" },
    { place: "DCC Tari — Juara Pertama",   medal: "Hadiah & Sertifikat", extra: "" },
    { place: "DCC Tari — Juara Kedua",     medal: "Hadiah & Sertifikat", extra: "" },
    { place: "DCC Tari — Juara Ketiga",    medal: "Hadiah & Sertifikat", extra: "" },
    { place: "DCC Tari — Kostum Terbaik",  medal: "Hadiah & Sertifikat", extra: "" },
    { place: "DCC MHQ — 5–6 Tim Terpilih", medal: "Hadiah & Sertifikat", extra: "Sistem parade/undian, seluruh peserta berkesempatan sama" },
  ],

  // ── Jadwal Luring (Depok) ──────────────────────────────────────
  scheduleOffline: [
    {
      day: 1, date: "29 September 2026", title: "Seremoni Pembukaan & DMO (Luring)",
      items: [
        { time: "10.00 – 11.00", description: "Seremoni Pembukaan DSCF 2026", location: "Depok" },
        { time: "12.30 – Selesai", description: "Depok Math Olympiad (DMO)", location: "Depok" },
      ],
    },
    {
      day: 2, date: "30 September 2026", title: "Depok Engineering Science Fair (DESF) — Luring",
      items: [
        { time: "07.00 – 09.00", description: "Set up Booth", location: "Depok" },
        { time: "09.00 – 10.00", description: "Briefing Juri", location: "Depok" },
        { time: "10.00 – 16.00", description: "Penilaian DESF", location: "Depok" },
      ],
    },
    {
      day: 3, date: "1 Oktober 2026", title: "Depok Cultural Competition (DCC)",
      items: [
        { time: "09.00 – 12.00", description: "Lomba Tari (Solo & Grup)", location: "Depok" },
        { time: "13.00 – Selesai", description: "MHQ (Marawis, Hadroh & Qasidah)", location: "Depok" },
      ],
    },
    {
      day: 4, date: "2 Oktober 2026", title: "Waktu Bebas",
      items: [
        { time: "Seharian", description: "Waktu Bebas", location: "Depok" },
      ],
    },
    {
      day: 5, date: "3 Oktober 2026", title: "Awarding DSCF 2026 (Luring)",
      items: [
        { time: "09.30 – Selesai", description: "Upacara Penghargaan & Penutupan DSCF 2026", location: "Depok" },
      ],
    },
  ],

  // ── Jadwal Daring (Zoom) — khusus DESF & DMO ────────────────────
  scheduleOnline: [
    {
      day: 1, date: "29 September 2026", title: "Seremoni Pembukaan & DESF (Daring)",
      items: [
        { time: "09.00 – 10.00", description: "Seremoni Pembukaan (peserta Daring)", location: "Zoom" },
        { time: "10.00 – Selesai", description: "Sesi Penjurian Depok Engineering Science Fair (DESF)", location: "Zoom" },
      ],
    },
    {
      day: 2, date: "30 September 2026", title: "Depok Math Olympiad (DMO) — Daring",
      items: [
        { time: "09.00 – Selesai", description: "Sesi Depok Math Olympiad (DMO)", location: "Zoom" },
      ],
    },
    {
      day: 3, date: "1 Oktober 2026", title: "Awarding DSCF 2026 (Daring)",
      items: [
        { time: "14.00 – Selesai", description: "Pengumuman Penghargaan DSCF 2026 (peserta Daring)", location: "Zoom" },
      ],
    },
  ],

  schedule: [], // kept for type compatibility
};

export default dscf;