// ================================================================
// nesfData.ts — NESF Portal Site Data
// Based on YIESF Guidebook Draft Stage 3 (National version)
// ================================================================

import {
  Cpu,
  Leaf,
  HeartPulse,
  FlaskConical,
  Lightbulb,
  Globe2,
  Mail,
  Instagram,
  Youtube,
  CircleHelp,
  BookOpen,
  Award,
  CalendarDays,
  MapPin,
  Microscope,
  Zap,
  Users,
} from "lucide-react";

export type Lang = "en" | "id";
export type BilingualText = { en: string; id: string };

// ── COMPETITION CATEGORIES ────────────────────────────────────────
export const competitionCategories = [
  {
    letter: "A",
    title: {
      en: "Engineering & Technology",
      id: "Teknik & Teknologi",
    },
    description: {
      en: "Projects focused on engineering design, machinery, electronics, robotics, renewable systems, applied technology, smart devices, or technical innovation.",
      id: "Proyek terfokus pada desain teknik, mesin, elektronik, robotika, sistem terbarukan, teknologi terapan, perangkat pintar, atau inovasi teknis.",
    },
    icon: Cpu,
    color: "from-cyan-500 to-blue-600",
    participants: { en: "1–3 members per team", id: "1–3 anggota per tim" },
    duration:     { en: "15 min presentation", id: "15 menit presentasi" },
  },
  {
    letter: "B",
    title: {
      en: "Environmental Science & Sustainability",
      id: "Ilmu Lingkungan & Keberlanjutan",
    },
    description: {
      en: "Projects related to environmental protection, waste management, water treatment, renewable energy, green innovation, biodiversity, or climate solutions.",
      id: "Proyek terkait perlindungan lingkungan, pengelolaan limbah, pengolahan air, energi terbarukan, inovasi hijau, keanekaragaman hayati, atau solusi iklim.",
    },
    icon: Leaf,
    color: "from-emerald-500 to-teal-600",
    participants: { en: "1–3 members per team", id: "1–3 anggota per tim" },
    duration:     { en: "15 min presentation", id: "15 menit presentasi" },
  },
  {
    letter: "C",
    title: {
      en: "Health, Life Science & Biotechnology",
      id: "Kesehatan, Ilmu Hayati & Bioteknologi",
    },
    description: {
      en: "Projects related to biology, public health, nutrition, microbiology, biomedical innovation, biotechnology, or life-science applications.",
      id: "Proyek terkait biologi, kesehatan publik, gizi, mikrobiologi, inovasi biomedis, bioteknologi, atau aplikasi ilmu hayati.",
    },
    icon: HeartPulse,
    color: "from-rose-500 to-pink-600",
    participants: { en: "1–3 members per team", id: "1–3 anggota per tim" },
    duration:     { en: "15 min presentation", id: "15 menit presentasi" },
  },
  {
    letter: "D",
    title: {
      en: "Applied Science & Experimental Research",
      id: "Sains Terapan & Penelitian Eksperimental",
    },
    description: {
      en: "Projects emphasizing scientific experiments, chemistry, physics, mathematics applications, materials testing, or interdisciplinary scientific analysis.",
      id: "Proyek yang menekankan eksperimen ilmiah, kimia, fisika, aplikasi matematika, pengujian material, atau analisis ilmiah interdisiplin.",
    },
    icon: FlaskConical,
    color: "from-violet-500 to-purple-600",
    participants: { en: "1–3 members per team", id: "1–3 anggota per tim" },
    duration:     { en: "15 min presentation", id: "15 menit presentasi" },
  },
  {
    letter: "E",
    title: {
      en: "Social Innovation & Educational Technology",
      id: "Inovasi Sosial & Teknologi Pendidikan",
    },
    description: {
      en: "Projects combining STEM thinking with social impact, digital learning tools, community-based innovation, accessibility, or educational problem solving.",
      id: "Proyek yang menggabungkan pemikiran STEM dengan dampak sosial, alat pembelajaran digital, inovasi berbasis komunitas, aksesibilitas, atau pemecahan masalah pendidikan.",
    },
    icon: Lightbulb,
    color: "from-amber-500 to-orange-600",
    participants: { en: "1–3 members per team", id: "1–3 anggota per tim" },
    duration:     { en: "15 min presentation", id: "15 menit presentasi" },
  },
];

// ── HIGHLIGHTS ────────────────────────────────────────────────────
export const highlights = [
  { value: "5",    label: { en: "Competition Categories", id: "Kategori Kompetisi" } },
  { value: "5",    label: { en: "Days of Innovation",     id: "Hari Inovasi" } },
  { value: "500+", label: { en: "Target Teams",           id: "Target Tim" } },
  { value: "🇮🇩",  label: { en: "National Stage",         id: "Panggung Nasional" } },
];

// ── PARTICIPANT DIVISIONS ─────────────────────────────────────────
export const divisions = [
  {
    level: { en: "Primary / Elementary School", id: "SD / Sekolah Dasar" },
    age:   { en: "7–12 years old",              id: "7–12 tahun" },
    note:  { en: "Student Division",            id: "Divisi Pelajar" },
  },
  {
    level: { en: "Junior High School",          id: "SMP / Madrasah Tsanawiyah" },
    age:   { en: "13–15 years old",             id: "13–15 tahun" },
    note:  { en: "Student Division",            id: "Divisi Pelajar" },
  },
  {
    level: { en: "Senior High School",          id: "SMA / SMK / Madrasah Aliyah" },
    age:   { en: "16–18 years old",             id: "16–18 tahun" },
    note:  { en: "Student Division",            id: "Divisi Pelajar" },
  },
  {
    level: { en: "Open Division",               id: "Divisi Terbuka" },
    age:   { en: "No age limit",                id: "Tidak ada batasan usia" },
    note:  { en: "University / Community / STEM Club", id: "Universitas / Komunitas / Klub STEM" },
  },
];

// ── JUDGING CRITERIA ─────────────────────────────────────────────
export const judgingCriteria = [
  { aspect: { en: "Originality & Innovation",       id: "Originalitas & Inovasi" },           weight: "25%" },
  { aspect: { en: "Scientific / Technical Quality", id: "Kualitas Ilmiah / Teknis" },          weight: "25%" },
  { aspect: { en: "Methodology / Engineering Process", id: "Metodologi / Proses Rekayasa" },   weight: "20%" },
  { aspect: { en: "Practical Application / Impact", id: "Aplikasi Praktis / Dampak" },         weight: "15%" },
  { aspect: { en: "Presentation & Communication",   id: "Presentasi & Komunikasi" },           weight: "10%" },
  { aspect: { en: "Booth / Poster / Visual Display",id: "Booth / Poster / Tampilan Visual" }, weight: "5%" },
];

// ── AWARDS ────────────────────────────────────────────────────────
export const awards = [
  { label: { en: "Gold Award",        id: "Penghargaan Emas" },         icon: "🥇", color: "text-yellow-400" },
  { label: { en: "Silver Award",      id: "Penghargaan Perak" },        icon: "🥈", color: "text-slate-300" },
  { label: { en: "Bronze Award",      id: "Penghargaan Perunggu" },     icon: "🥉", color: "text-amber-600" },
  { label: { en: "4th Place",         id: "Peringkat 4" },              icon: "🏅", color: "text-blue-400" },
  { label: { en: "Honorable Mention", id: "Penghargaan Khusus" },       icon: "📜", color: "text-muted-foreground" },
  { label: { en: "Finalist",          id: "Finalis" },                  icon: "⭐", color: "text-cyan-400" },
];

// ── POTENTIAL PRIZES (TBD) ────────────────────────────────────────
export const potentialPrizes = [
  { en: "Cash Prize (TBD)",             id: "Hadiah Uang Tunai (TBD)" },
  { en: "Education Scholarship (TBD)",  id: "Beasiswa Pendidikan (TBD)" },
  { en: "Gadget Prize (TBD)",           id: "Hadiah Gadget (TBD)" },
  { en: "Best Innovation Award",        id: "Penghargaan Inovasi Terbaik" },
  { en: "Best Presentation Award",      id: "Penghargaan Presentasi Terbaik" },
  { en: "Most Impactful Project Award", id: "Penghargaan Proyek Paling Berdampak" },
];

// ── ITINERARY ────────────────────────────────────────────────────
export const itinerary = [
  {
    day: 1,
    title: { en: "Registration & Opening", id: "Registrasi & Pembukaan" },
    highlights: {
      en: ["Participant registration", "Booth setup preparation", "Opening Ceremony", "Welcoming Party"],
      id: ["Registrasi peserta", "Persiapan booth", "Upacara Pembukaan", "Welcome Party"],
    },
    icon: "🚀",
  },
  {
    day: 2,
    title: { en: "Main Academic Competition", id: "Kompetisi Akademik Utama" },
    highlights: {
      en: ["Innovation project presentation", "Poster / booth presentation", "Jury evaluation", "Short interview with judges"],
      id: ["Presentasi proyek inovasi", "Presentasi poster / booth", "Penilaian juri", "Wawancara singkat dengan juri"],
    },
    icon: "🔬",
  },
  {
    day: 3,
    title: { en: "Workshop & Seminar", id: "Workshop & Seminar" },
    highlights: {
      en: ["Innovation & Research Method workshop", "Youth Entrepreneurship session", "STEM Project Development", "Scientific Communication"],
      id: ["Workshop Metode Inovasi & Penelitian", "Sesi Kewirausahaan Muda", "Pengembangan Proyek STEM", "Komunikasi Ilmiah"],
    },
    icon: "💡",
  },
  {
    day: 4,
    title: { en: "Networking & Expo Day",   id: "Hari Networking & Expo" },
    highlights: {
      en: ["Delegation networking", "Innovation exchange", "Project appreciation session", "Partner / sponsor interaction"],
      id: ["Networking delegasi", "Pertukaran inovasi", "Sesi apresiasi proyek", "Interaksi mitra / sponsor"],
    },
    icon: "🤝",
  },
  {
    day: 5,
    title: { en: "Awarding Ceremony",   id: "Upacara Penghargaan" },
    highlights: {
      en: ["Academic Awards Session", "Medal & certificate ceremony", "Closing Ceremony", "Official photo session"],
      id: ["Sesi Penghargaan Akademik", "Upacara medali & sertifikat", "Upacara Penutupan", "Sesi foto resmi"],
    },
    icon: "🏆",
  },
];

// ── FAQ ───────────────────────────────────────────────────────────
export const faqItems = [
  {
    question: { en: "Who can join NESF?", id: "Siapa yang bisa mengikuti NESF?" },
    answer:   { en: "NESF is open to primary/elementary school students (7–12), junior high (13–15), senior high (16–18), and Open Division (university, communities, STEM clubs) with no strict age limit.", id: "NESF terbuka untuk siswa SD (7–12 tahun), SMP (13–15 tahun), SMA/SMK (16–18 tahun), dan Divisi Terbuka (universitas, komunitas, klub STEM) tanpa batasan usia ketat." },
  },
  {
    question: { en: "What competition categories are available?", id: "Apa saja kategori kompetisi?" },
    answer:   { en: "There are 5 categories: Engineering & Technology, Environmental Science & Sustainability, Health, Life Science & Biotechnology, Applied Science & Experimental Research, and Social Innovation & Educational Technology.", id: "Ada 5 kategori: Teknik & Teknologi, Ilmu Lingkungan & Keberlanjutan, Kesehatan, Ilmu Hayati & Bioteknologi, Sains Terapan & Penelitian Eksperimental, dan Inovasi Sosial & Teknologi Pendidikan." },
  },
  {
    question: { en: "What is the recommended team size?", id: "Berapa ukuran tim yang direkomendasikan?" },
    answer:   { en: "Recommended team size is 1–3 students per team. Each team may be accompanied by 1 mentor/teacher/advisor. One participant may only represent one main project entry.", id: "Ukuran tim yang direkomendasikan adalah 1–3 siswa per tim. Setiap tim boleh didampingi 1 mentor/guru/pembimbing. Satu peserta hanya dapat mewakili satu proyek utama." },
  },
  {
    question: { en: "What is the submission deadline?", id: "Apa batas waktu pengiriman dokumen?" },
    answer:   { en: "All required registration data and project documents must be submitted no later than H-14 (14 days before the event) unless otherwise stated by the committee.", id: "Semua data registrasi dan dokumen proyek harus dikirimkan paling lambat H-14 (14 hari sebelum acara) kecuali dinyatakan lain oleh panitia." },
  },
  {
    question: { en: "What awards are given?", id: "Penghargaan apa yang diberikan?" },
    answer:   { en: "Awards include Gold, Silver, Bronze Medal + Certificate, 4th Place Medal + Certificate, Honorable Mention Certificate, and Finalist recognition. Additional special awards (cash prize, scholarship, gadget) are under discussion.", id: "Penghargaan meliputi Medali Emas, Perak, Perunggu + Sertifikat, Medali Peringkat 4 + Sertifikat, Sertifikat Honorable Mention, dan pengakuan Finalis. Penghargaan khusus tambahan (uang tunai, beasiswa, gadget) sedang dalam pembahasan." },
  },
  {
    question: { en: "Is there a booth/poster requirement?", id: "Apakah ada persyaratan booth/poster?" },
    answer:   { en: "Yes. Each team is expected to prepare a project poster/display board including project background, methodology, results/prototype, and conclusion. Booth size will be confirmed by the committee.", id: "Ya. Setiap tim diharapkan menyiapkan poster proyek/display board yang mencakup latar belakang proyek, metodologi, hasil/prototipe, dan kesimpulan. Ukuran booth akan dikonfirmasi oleh panitia." },
  },
  {
    question: { en: "Are there safety regulations for booths?", id: "Apakah ada peraturan keamanan untuk booth?" },
    answer:   { en: "Yes. Sharp, dangerous, explosive, flammable, or toxic materials are prohibited. Live animals are not allowed unless specifically approved. Electrical devices must comply with venue regulations.", id: "Ya. Material tajam, berbahaya, eksplosif, mudah terbakar, atau beracun dilarang. Hewan hidup tidak diperbolehkan kecuali mendapat persetujuan khusus. Perangkat listrik harus mematuhi peraturan venue." },
  },
  {
    question: { en: "Where will NESF be held?", id: "Di mana NESF akan diadakan?" },
    answer:   { en: "The venue for NESF is currently to be announced (TBA). Stay tuned for official updates on our website and social media.", id: "Lokasi NESF saat ini masih akan diumumkan (TBA). Pantau terus pembaruan resmi di website dan media sosial kami." },
  },
];

// ── FOOTER COLUMNS ────────────────────────────────────────────────
export const footerColumns = [
  {
    title: { en: "Event",      id: "Acara" },
    links: [
      { en: "About NESF",   id: "Tentang NESF" },
      { en: "Timeline",     id: "Timeline" },
    ],
  },
  {
    title: { en: "Resources", id: "Sumber Daya" },
    links: [
      { en: "Guidebook",    id: "Buku Panduan" },
      { en: "FAQ",          id: "FAQ" },
    ],
  },
  {
    title: { en: "Support",   id: "Dukungan" },
    links: [
      { en: "Contact Team", id: "Tim Kontak" },
      { en: "Email Support", id: "Dukungan Email" },
      { en: "WhatsApp Help", id: "Bantuan WhatsApp" },
    ],
  },
  {
    title: { en: "Social",    id: "Sosial" },
    links: [
      { en: "Instagram",    id: "Instagram" },
      { en: "YouTube",      id: "YouTube" },
    ],
  },
];

export const footerLinkMap: Record<string, string> = {
  "About NESF":    "/about",
  "Tentang NESF":  "/about",
  "Timeline":      "/events",
  "Guidebook":     "/guide",
  "Buku Panduan":  "/guide",
  "FAQ":           "/faq",
  "Contact Team":  "/contact",
  "Tim Kontak":    "/contact",
  "Email Support": "mailto:icgi.official.id@gmail.com",
  "Dukungan Email":"mailto:icgi.official.id@gmail.com",
  "WhatsApp Help": "https://wa.me/628139905880",
  "Bantuan WhatsApp": "https://wa.me/628139905880",
  "Instagram":     "https://www.instagram.com/icgi.id",
  "YouTube":       "/",
};

// ── SOCIAL ICONS ──────────────────────────────────────────────────
export const socialItems = [Globe2, Mail, Instagram, Youtube] as const;

// ── GOALS ─────────────────────────────────────────────────────────
export const goals: BilingualText[] = [
  { en: "Provide a national competition platform for engineering, science, research, and innovation projects.", id: "Menyediakan platform kompetisi nasional untuk proyek teknik, sains, penelitian, dan inovasi." },
  { en: "Encourage students and young innovators to develop critical thinking, creativity, and problem-solving skills.", id: "Mendorong pelajar dan inovator muda untuk mengembangkan pemikiran kritis, kreativitas, dan keterampilan pemecahan masalah." },
  { en: "Promote research culture and innovation mindset among school and university participants.", id: "Mempromosikan budaya penelitian dan pola pikir inovasi di kalangan peserta sekolah dan universitas." },
  { en: "Facilitate academic exchange between participants, mentors, institutions, and judges across Indonesia.", id: "Memfasilitasi pertukaran akademik antara peserta, mentor, institusi, dan juri di seluruh Indonesia." },
];

// ── SUBMISSION REQUIREMENTS ───────────────────────────────────────
export const submissionRequirements = [
  { en: "Project Title",                       id: "Judul Proyek" },
  { en: "Category Selection",                  id: "Pilihan Kategori" },
  { en: "Participant / Team Member Names",     id: "Nama Peserta / Anggota Tim" },
  { en: "Institution / School / University",   id: "Institusi / Sekolah / Universitas" },
  { en: "Province / Region",                   id: "Provinsi / Daerah" },
  { en: "Abstract / Project Summary",          id: "Abstrak / Ringkasan Proyek" },
  { en: "Problem Statement",                   id: "Pernyataan Masalah" },
  { en: "Objectives",                          id: "Tujuan" },
  { en: "Method / Research Procedure",         id: "Metode / Prosedur Penelitian" },
  { en: "Results / Findings / Prototype",      id: "Hasil / Temuan / Prototipe" },
  { en: "Conclusion & Practical Impact",       id: "Kesimpulan & Dampak Praktis" },
  { en: "Project Photos or Documentation",     id: "Foto Proyek atau Dokumentasi" },
  { en: "Mentor / Advisor Information",        id: "Informasi Mentor / Pembimbing" },
];

// ── ICC JUDGING CRITERIA (per performance category) ───────────────
export const iccJudgingCriteria = {
  dance: [
    { aspect: { en: "Technique & Skill",         id: "Teknik & Keahlian" },       weight: "30%" },
    { aspect: { en: "Artistry & Expression",     id: "Artistik & Ekspresi" },     weight: "25%" },
    { aspect: { en: "Cultural Authenticity",     id: "Keaslian Budaya" },         weight: "25%" },
    { aspect: { en: "Costume & Presentation",    id: "Kostum & Presentasi" },     weight: "20%" },
  ],
  costume: [
    { aspect: { en: "Design & Creativity",       id: "Desain & Kreativitas" },    weight: "35%" },
    { aspect: { en: "Cultural Representation",   id: "Representasi Budaya" },     weight: "35%" },
    { aspect: { en: "Stage Presence",            id: "Kehadiran Panggung" },      weight: "30%" },
  ],
  vocal: [
    { aspect: { en: "Vocal Technique",           id: "Teknik Vokal" },            weight: "30%" },
    { aspect: { en: "Pronunciation & Diction",   id: "Pengucapan & Diksi" },      weight: "25%" },
    { aspect: { en: "Emotional Expression",      id: "Ekspresi Emosional" },      weight: "25%" },
    { aspect: { en: "Cultural Understanding",    id: "Pemahaman Budaya" },        weight: "20%" },
  ],
};

// ── DOMESTIC SONGS (Traditional Song Solo) ────────────────────────
export const domesticSongs = [
  { title: "Bengawan Solo",      region: { en: "Central Java",    id: "Jawa Tengah" } },
  { title: "Ampar-Ampar Pisang", region: { en: "South Kalimantan",id: "Kalimantan Selatan" } },
  { title: "Apuse",              region: { en: "Papua",           id: "Papua" } },
  { title: "Bubuy Bulan",        region: { en: "West Java",       id: "Jawa Barat" } },
  { title: "Cik-Cik Periuk",     region: { en: "West Kalimantan", id: "Kalimantan Barat" } },
  { title: "Cing Cangkeling",    region: { en: "West Java",       id: "Jawa Barat" } },
  { title: "Gending Sriwijaya",  region: { en: "South Sumatra",   id: "Sumatera Selatan" } },
  { title: "Injit-Injit Semut",  region: { en: "Jambi",           id: "Jambi" } },
];