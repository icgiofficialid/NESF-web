// ================================================================
// borneonesf.ts
// Path: src/config/events/borneonesf.ts
//
// Data event Borneo National Science Fair (BorneoNESF) 2026.
// Diadaptasi dari guidebook Borneo-IESF (event serupa versi
// internasional) — isi diterjemahkan penuh ke Bahasa Indonesia
// dan disesuaikan untuk kompetisi tingkat NASIONAL (tanpa
// kategori peserta Internasional).
//
// ⚠️ Sama seperti event lain: begitu guidebook resmi BorneoNESF
//    (versi terjemahan) sudah jadi, cek ulang tanggal & harga di
//    sini — sekarang masih mengikuti data acuan Borneo-IESF.
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const borneonesf: EventDetailData = {
  slug: "borneo-nesf-2026",

  // TODO: lengkapi logo mitra lain (lihat halaman "Partnership" guidebook).
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
    { name: "Borneo-NESF", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1787297080/BorneoNESF_osr6mv.png" },
    { name: "IYSA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png" },
    { name: "CBSO", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1787287795/cbso_cbywxn.png" },
    { name: "FMIPA-UPR", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1787295792/fmipa-upr_icjami.png" },
  ],

  // TODO: ganti dengan link guidebook BorneoNESF versi Bahasa Indonesia
  // setelah kamu selesai menerjemahkan PDF-nya.
  guidebookUrl: "https://drive.google.com/file/d/1NgrvwYV_BpRQSFqCpwFJC4ucpIyPX6fM/view?usp=drive_link",

  email:   "icgi.official.id@gmail.com",
  website: "icgi.or.id",
  venue:   "Gedung Pusat Pengembangan Iptek dan Inovasi Gambut, Universitas Palangka Raya",

  labels: {
    eventBadge:     "NESF · Borneo-NESF 2026",
    heroBadge:      "Kompetisi Hybrid · Palangka Raya, Indonesia",
    categoriesDesc: "Peserta dapat mendaftarkan proyeknya ke dalam 8 kategori kompetisi berikut.",
    scheduleDesc:   "Borneo-NESF 2026 berlangsung 27–30 November 2026, meliputi sesi penjurian, penjurian privat (selektif), dan upacara penganugerahan — untuk peserta offline (Palangka Raya) maupun online (Zoom).",
  },

  stats: [
    { value: "8", label: "Kategori Kompetisi" },
    { value: "4", label: "Hari Inovasi" },
  ],

  regSteps: [
    "Pilih format kompetisi (Online atau Offline).",
    "Baca dan setujui Syarat & Ketentuan sesuai format yang dipilih.",
    "Isi Formulir Pendaftaran dengan data tim, data sekolah, data pembimbing, dan detail proyek sebelum Batas Pendaftaran (27 Oktober 2026).",
    "Selesaikan pembayaran sebelum Batas Pembayaran (3 November 2026) via transfer bank atau QRIS, lalu unggah bukti pembayaran. Keterangan transfer: BORNEONESF2026_Nama Ketua_Nama Sekolah.",
    "Kirim Full Paper (maks. 12 halaman, Arial 12, A4) dan poster sebelum Batas Pengumpulan (3 November 2026). LoA akan dikirim ke email ketua tim dalam 3 hari kerja.",
  ],

  about: {
    welcome:
      "Borneo National Science Fair (Borneo-NESF) adalah kompetisi sains tingkat nasional yang diselenggarakan untuk pertama kalinya di Palangka Raya, sebagai wadah bagi pelajar Indonesia untuk menampilkan inovasi, riset, dan proyek mereka di bidang sains, teknologi, dan rekayasa, sekaligus membangun kolaborasi serta kemampuan berpikir kritis dan kreatif. Acara berlangsung 27–30 November 2026 sebagai Kompetisi Hybrid, dengan Upacara Pembukaan & Sesi Penjurian Hari 1 (27 Nov), Sesi Penjurian Hari 2 (28 Nov), Sesi Penjurian Privat/Selektif (29 Nov), dan Upacara Penganugerahan (30 Nov).",
    background:
      "Kategori kompetisi Borneo-NESF meliputi: Matematika, Sains & Teknologi; Lingkungan; IoT & Robotika; Informatika & Kecerdasan Buatan; Ilmu Hayati; Ilmu Sosial & Humaniora; Fisika, Energi & Teknik; serta Kesehatan & Kedokteran. Peserta merupakan pelajar jenjang SD, SMP/SMA, hingga Perguruan Tinggi. Setiap tim beranggotakan maksimal 4 orang (1 ketua & 3 anggota), didampingi 1 pembimbing.",
    objectives: [
      "Memberikan panggung nasional yang prestisius bagi pelajar untuk mempresentasikan riset, penemuan, dan rancangan rekayasa orisinal.",
      "Mendorong pemikiran kritis, kreativitas, dan penyelesaian masalah secara profesional melalui evaluasi dewan juri ahli.",
      "Memfasilitasi jejaring akademik dan pertukaran pengetahuan antar-inovator muda di seluruh Indonesia.",
    ],
  },

  divisions: [
    { level: "Sekolah Dasar",        age: "Jenjang SD" },
    { level: "Sekolah Menengah",     age: "Jenjang SMP/SMA" },
    { level: "Perguruan Tinggi",     age: "Jenjang Universitas" },
  ],

  categories: [
    {
      letter: "1",
      title:       "Matematika, Sains & Teknologi",
      description: "Berfokus pada pengembangan inovasi berbasis konsep matematika, sains, dan teknologi untuk menyelesaikan berbagai masalah secara efektif dan praktis.",
      icon: "Cpu",
    },
    {
      letter: "2",
      title:       "Lingkungan",
      description: "Mencakup proyek yang menawarkan solusi atas isu lingkungan seperti perubahan iklim, pengelolaan sampah, konservasi, dan keberlanjutan.",
      icon: "Leaf",
    },
    {
      letter: "3",
      title:       "IoT & Robotika",
      description: "Menampilkan pengembangan perangkat berbasis Internet of Things (IoT) dan robotika untuk meningkatkan efisiensi dan otomasi di berbagai bidang.",
      icon: "Cpu",
    },
    {
      letter: "4",
      title:       "Informatika & Kecerdasan Buatan",
      description: "Berfokus pada pengembangan perangkat lunak, sistem informasi, dan penerapan kecerdasan buatan untuk menyelesaikan masalah secara inovatif.",
      icon: "Cpu",
    },
    {
      letter: "5",
      title:       "Ilmu Hayati",
      description: "Mencakup riset di bidang biologi dan ilmu hayati, termasuk kesehatan, genetika, mikrobiologi, dan bioteknologi.",
      icon: "HeartPulse",
    },
    {
      letter: "6",
      title:       "Ilmu Sosial & Humaniora",
      description: "Mengkaji fenomena sosial, budaya, dan humaniora untuk memberikan solusi atas permasalahan masyarakat melalui pendekatan ilmiah.",
      icon: "Users",
    },
    {
      letter: "7",
      title:       "Fisika, Energi & Teknik",
      description: "Berfokus pada penerapan konsep fisika, energi, dan teknik untuk menciptakan inovasi teknologi yang efisien dan berkelanjutan.",
      icon: "FlaskConical",
    },
    {
      letter: "8",
      title:       "Kesehatan & Kedokteran",
      description: "Mencakup inovasi dan riset di bidang kesehatan dan kedokteran untuk meningkatkan kualitas hidup dan layanan kesehatan.",
      icon: "HeartPulse",
    },
  ],

  judgingCriteria: [
    { aspect: "Orisinalitas & Inovasi",        weight: "30%" },
    { aspect: "Metodologi / Proses Rekayasa",  weight: "25%" },
    { aspect: "Dampak / Penerapan Praktis",    weight: "20%" },
    { aspect: "Presentasi & Komunikasi",       weight: "15%" },
    { aspect: "Booth / Poster / Tampilan Visual", weight: "10%" },
  ],

  awards: [
    { place: "Juara 1", medal: "Sertifikat & Medali", extra: "Skor: 86–100" },
    { place: "Juara 2", medal: "Sertifikat & Medali", extra: "Skor: 71–85"  },
    { place: "Juara 3", medal: "Sertifikat & Medali", extra: "Skor: 55–70"  },
    { place: "Juara 4", medal: "Sertifikat & Medali", extra: "Skor: ≤54"    },
  ],

  scheduleOffline: [
    {
      day: 1,
      date:  "27 November 2026",
      title: "Upacara Pembukaan & Sesi Penjurian Hari 1",
      items: [
        { time: "08.00 – 09.00",  description: "Upacara Pembukaan untuk Peserta Offline", location: "Palangka Raya, Kalimantan Tengah" },
        { time: "10.00 – 16.00",  description: "Sesi Penjurian Offline Hari 1",            location: "Palangka Raya, Kalimantan Tengah" },
      ],
    },
    {
      day: 2,
      date:  "28 November 2026",
      title: "Sesi Penjurian Hari 2 (Tentatif)",
      items: [
        { time: "10.00 – 16.00", description: "Sesi Penjurian Offline Hari 2 (Tentatif)", location: "Palangka Raya, Kalimantan Tengah" },
      ],
    },
    {
      day: 3,
      date:  "29 November 2026",
      title: "Sesi Penjurian Privat (Selektif)",
      items: [
        { time: "08.00 – 11.00", description: "Sesi Penjurian Privat untuk Peserta Offline (PowerPoint, 5 menit presentasi + 5 menit tanya-jawab)", location: "Palangka Raya, Kalimantan Tengah" },
      ],
    },
    {
      day: 4,
      date:  "30 November 2026",
      title: "Upacara Penganugerahan",
      items: [
        { time: "10.00 – selesai", description: "Upacara Penganugerahan untuk Peserta Offline", location: "Palangka Raya, Kalimantan Tengah" },
      ],
    },
  ],

  scheduleOnline: [
    {
      day: 1,
      date:  "28 November 2026",
      title: "Upacara Pembukaan & Sesi Penjurian Hari 1",
      items: [
        { time: "08.30 – selesai", description: "Upacara Pembukaan & Sesi Penjurian Online Hari 1", location: "ZOOM (WIB / GMT+7)" },
      ],
    },
    {
      day: 2,
      date:  "29 November 2026",
      title: "Sesi Penjurian Hari 2 (Tentatif)",
      items: [
        { time: "10.00 – selesai", description: "Sesi Penjurian Online Hari 2 (Tentatif)", location: "ZOOM (WIB / GMT+7)" },
      ],
    },
    {
      day: 3,
      // Catatan: guidebook acuan (Borneo-IESF) punya sedikit ambiguitas tanggal
      // di tabel "Tentative Time Schedule Online" untuk Awarding Ceremony.
      // Dipakai 29 Nov mengikuti tabel "Event Itinerary" yang lebih lengkap.
      date:  "29 November 2026",
      title: "Upacara Penganugerahan",
      items: [
        { time: "14.00 – selesai", description: "Upacara Penganugerahan untuk Peserta Online", location: "ZOOM (WIB / GMT+7)" },
      ],
    },
  ],

  schedule: [], // dipertahankan untuk kompatibilitas tipe
};

export default borneonesf;