import { createContext, useContext, useState } from "react";

type Language = "en" | "id";

const translations = {
  // ── NAVBAR ────────────────────────────────────────────────
  "nav.home":         { en: "Home",         id: "Beranda" },
  "nav.about":        { en: "About",        id: "Tentang" },
  "nav.sertifikat":   { en: "Certificate",  id: "Sertifikat" },
  "nav.curation":     { en: "Curation",     id: "Kurasi" },
  "nav.faq":          { en: "FAQ",          id: "FAQ" },
  "nav.contact":      { en: "Contact",      id: "Kontak" },
  "nav.register_now": { en: "Register Now", id: "Daftar Sekarang" },

  // ── INDEX — HERO ──────────────────────────────────────────
  "hero.title":     { en: "International Engineering Science Fair (IESF)", id: "Pekan Ilmiah Teknik Internasional (IESF)" },
  "hero.subtitle":  { en: "high-performance registration hub for future engineers, researchers, and innovators to present breakthrough ideas with global reach.", id: "platform pendaftaran berperforma tinggi bagi para insinyur, peneliti, dan inovator masa depan untuk mempresentasikan ide terobosan dengan jangkauan global." },
  "hero.register":  { en: "Register Now",  id: "Daftar Sekarang" },
  "hero.guidebook": { en: "Guide Book",    id: "Buku Panduan" },

  // ── INDEX — ABOUT SECTION ─────────────────────────────────
  "about.eyebrow":     { en: "About", id: "Tentang" },
  "about.title":       { en: "A modern science fair platform engineered for global participation.", id: "Platform pekan ilmiah modern yang dirancang untuk partisipasi global." },
  "about.description": { en: "IESF blends academic rigor, innovation storytelling, and clean digital registration to help students and institutions showcase impactful work in science and engineering.", id: "IESF memadukan ketelitian akademik, narasi inovasi, dan pendaftaran digital yang bersih untuk membantu siswa dan institusi menampilkan karya berdampak di bidang sains dan teknik." },
  "about.learn_more":  { en: "Learn More", id: "Pelajari Lebih" },

  // ── INDEX — GOALS ─────────────────────────────────────────
  "goal.1": { en: "Encouraging a culture of research and engineering-based problem solving from an early age.", id: "Mendorong budaya penelitian dan pemecahan masalah berbasis teknik sejak dini." },
  "goal.2": { en: "Bringing together students, mentors, and institutions in a global innovation ecosystem.", id: "Mempertemukan siswa, mentor, dan institusi dalam ekosistem inovasi global." },
  "goal.3": { en: "Accelerating ideas into real solutions through structured curation and feedback.", id: "Mempercepat ide menjadi solusi nyata melalui kurasi dan umpan balik terstruktur." },
  "goal.4": { en: "Increasing exposure of participants' work through media, certificates, and professional showcases.", id: "Meningkatkan eksposur karya peserta melalui media, sertifikat, dan pameran profesional." },

  // ── INDEX — CATEGORIES ────────────────────────────────────
  "categories.title": { en: "Categories", id: "Kategori" },
  "cat.science_project.title":       { en: "Science Project",   id: "Proyek Sains" },
  "cat.science_project.description": { en: "Research-based experiments with engineering approach and measurable validation.", id: "Eksperimen berbasis penelitian dengan pendekatan teknik dan validasi terukur." },
  "cat.scientific_paper.title":       { en: "Scientific Paper",  id: "Karya Ilmiah" },
  "cat.scientific_paper.description": { en: "Academic papers and scientific analysis for participants excelling in methodology and presentation.", id: "Makalah akademik dan analisis ilmiah bagi peserta yang unggul dalam metodologi dan presentasi." },
  "cat.invention.title":       { en: "Invention",  id: "Penemuan" },
  "cat.invention.description": { en: "New findings with high novelty value, focused on prototyping and feasibility.", id: "Temuan baru dengan nilai kebaruan tinggi, berfokus pada pembuatan prototipe dan kelayakan." },
  "cat.innovation.title":       { en: "Innovation",  id: "Inovasi" },
  "cat.innovation.description": { en: "Applied solutions for real challenges through product design, systems, or business models.", id: "Solusi terapan untuk tantangan nyata melalui desain produk, sistem, atau model bisnis." },

  // ── INDEX — NEWSLETTER ────────────────────────────────────
  "newsletter.eyebrow":     { en: "Newsletter", id: "Newsletter" },
  "newsletter.title":       { en: "Stay updated with IESF announcements.", id: "Tetap update dengan pengumuman IESF." },
  "newsletter.description": { en: "Subscribe our monthly newsletter to get updated. Don't be afraid your mail is secure it no will be shared anywhere or everywhere.", id: "Langganan newsletter bulanan kami untuk terus mendapat info terbaru. Email Anda aman dan tidak akan dibagikan ke mana pun." },
  "newsletter.placeholder": { en: "Enter your email address", id: "Masukkan alamat email Anda" },
  "newsletter.submit":      { en: "Submit Now", id: "Kirim Sekarang" },

  // ── INDEX — ORGANIZED BY ──────────────────────────────────
  "organized_by": { en: "Organized By :", id: "Diselenggarakan Oleh :" },

  // ── FOOTER ────────────────────────────────────────────────
  "footer.cta":         { en: "Ready to bring your research to an international audience?", id: "Siap membawa riset Anda ke audiens internasional?" },
  "footer.description": { en: "Connect with the organizing team for registration support, institution collaboration, media requests, or event information.", id: "Hubungi tim penyelenggara untuk dukungan pendaftaran, kolaborasi institusi, permintaan media, atau informasi acara." },
  "footer.copyright":   { en: "© International Engineering Science Fair (IESF). All rights reserved.", id: "© International Engineering Science Fair (IESF). Hak cipta dilindungi." },
  "footer.event":       { en: "Event",     id: "Acara" },
  "footer.resources":   { en: "Resources", id: "Sumber Daya" },
  "footer.support":     { en: "Support",   id: "Dukungan" },
  "footer.social":      { en: "Social",    id: "Sosial" },
  "footer.about_iesf":      { en: "About IESF",    id: "Tentang IESF" },
  "footer.tracks":          { en: "Tracks",         id: "Jalur" },
  "footer.timeline":        { en: "Timeline",       id: "Timeline" },
  "footer.registration":    { en: "Registration",   id: "Pendaftaran" },
  "footer.guidebook":       { en: "Guidebook",      id: "Buku Panduan" },
  "footer.certificates":    { en: "Certificates",   id: "Sertifikat" },
  "footer.media_kit":       { en: "Media Kit",      id: "Media Kit" },
  "footer.faq":             { en: "FAQ",            id: "FAQ" },
  "footer.contact_team":    { en: "Contact Team",   id: "Tim Kontak" },
  "footer.whatsapp_help":   { en: "WhatsApp Help",  id: "Bantuan WhatsApp" },
  "footer.email_support":   { en: "Email Support",  id: "Dukungan Email" },
  "footer.venue_info":      { en: "Venue Info",     id: "Info Venue" },

  // ── ABOUT PAGE ────────────────────────────────────────────
  "about.page.eyebrow":     { en: "About", id: "Tentang" },
  "about.page.title":       { en: "A modern science fair platform engineered for global participation.", id: "Platform pekan ilmiah modern yang dirancang untuk partisipasi global." },
  "about.page.description": { en: "IESF blends academic rigor, innovation storytelling, and clean digital registration to help students and institutions showcase impactful work in science and engineering.", id: "IESF memadukan ketelitian akademik, narasi inovasi, dan pendaftaran digital yang bersih untuk membantu siswa dan institusi menampilkan karya berdampak di bidang sains dan teknik." },
  "about.explore_track":    { en: "Explore track", id: "Jelajahi jalur" },

  // ── FAQ PAGE ──────────────────────────────────────────────
  "faq.q1": { en: "Who can join IESF?",              id: "Siapa yang bisa mengikuti IESF?" },
  "faq.a1": { en: "IESF welcomes students, school teams, and young innovators ready to present engineering and science-based work.", id: "IESF menyambut siswa, tim sekolah, dan inovator muda yang siap mempresentasikan karya berbasis teknik dan sains." },
  "faq.q2": { en: "Do participants receive certificates?", id: "Apakah peserta mendapat sertifikat?" },
  "faq.a2": { en: "Yes. All verified participants receive digital certificates, with additional recognitions for winning teams and special mentions.", id: "Ya. Semua peserta terverifikasi mendapatkan sertifikat digital, dengan penghargaan tambahan untuk tim pemenang dan penyebutan khusus." },
  "faq.q3": { en: "Can I submit in a team?",         id: "Bisakah saya mendaftar sebagai tim?" },
  "faq.a3": { en: "Absolutely. Individual and team-based submissions are both supported as long as the project ownership is clearly stated.", id: "Tentu saja. Pengiriman individu maupun tim keduanya didukung selama kepemilikan proyek dinyatakan dengan jelas." },
  "faq.q4": { en: "Where can I find the guidebook?", id: "Di mana saya bisa menemukan buku panduan?" },
  "faq.a4": { en: "Use the Book Guide CTA in the hero section to jump to the curation and preparation information area.", id: "Gunakan tombol Buku Panduan di bagian hero untuk langsung ke area informasi kurasi dan persiapan." },

  // ── CONTACT PAGE ─────────────────────────────────────────
  "contact.lets_talk":   { en: "Let's get in touch",  id: "Mari Terhubung" },
  "contact.description": { en: "Feel free to contact us. We are here to assist you with all your needs.", id: "Jangan ragu untuk menghubungi kami. Kami siap membantu semua kebutuhan Anda." },
  "contact.connect":     { en: "Connect with us :",   id: "Terhubung dengan kami :" },
  "contact.title":       { en: "Contact us",          id: "Hubungi Kami" },
  "contact.name":        { en: "name",                id: "nama" },
  "contact.email":       { en: "Email",               id: "Email" },
  "contact.message":     { en: "Message",             id: "Pesan" },
  "contact.send":        { en: "Send",                id: "Kirim" },
  "contact.sent":        { en: "Sent!",               id: "Terkirim!" },

  // ── GUIDE PAGE ────────────────────────────────────────────
  "guide.title":  { en: "Guide Book",            id: "Buku Panduan" },
  "guide.button": { en: "VIEW Guide Book 2026",  id: "LIHAT Buku Panduan 2026" },

  // ── TERMS PAGE ────────────────────────────────────────────
  "terms.title":  { en: "Terms & Conditions",  id: "Syarat & Ketentuan" },
  "terms.button": { en: "VIEW TERMS 2026",     id: "LIHAT SYARAT 2026" },

  // ── REGISTER — STEP LABELS ───────────────────────────────
  "step.participant": { en: "Participant", id: "Peserta" },
  "step.competition": { en: "Competition", id: "Kompetisi" },
  "step.terms":       { en: "Terms",       id: "Syarat" },
  "step.form":        { en: "Form",        id: "Formulir" },

  // ── REGISTRATION FORM ─────────────────────────────────────
  "form.step":              { en: "Step 4 of 4",        id: "Langkah 4 dari 4" },
  "form.title":             { en: "Registration Form",  id: "Formulir Pendaftaran" },
  "form.hello":             { en: "HELLO IESF",         id: "HALO IESF" },
  "form.info.1":            { en: "Please fill in the required data correctly. Data submitted is final and cannot be changed.", id: "Harap isi data yang diperlukan dengan benar. Data yang dikirim bersifat final dan tidak dapat diubah." },
  "form.info.2":            { en: "After verifying your data, click the SUBMIT FORM button.", id: "Setelah memverifikasi data Anda, klik tombol KIRIM FORMULIR." },
  "form.info.3":            { en: "The Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.", id: "Surat Penerimaan (LoA) akan dikirim ke email ketua tim dalam 3 hari kerja." },
  "form.submit":            { en: "Submit Form",        id: "Kirim Formulir" },
  "form.submitting":        { en: "Submitting...",      id: "Mengirim..." },
  "form.back_to_terms":     { en: "← Back to Terms",   id: "← Kembali ke Syarat" },
  "form.error":             { en: "Failed to submit. Please try again.", id: "Gagal mengirim. Silakan coba lagi." },

  // ── TERMS BOX ─────────────────────────────────────────────
  "termsbox.step":        { en: "Step 3 of 4",           id: "Langkah 3 dari 4" },
  "termsbox.title":       { en: "Terms & Conditions",    id: "Syarat & Ketentuan" },
  "termsbox.intro":       { en: "Before proceeding, please read and agree to the following terms and conditions for", id: "Sebelum melanjutkan, harap baca dan setujui syarat dan ketentuan berikut untuk" },
  "termsbox.offline":     { en: "Offline Participants:", id: "Peserta Offline:" },
  "termsbox.online":      { en: "Online Participants:",  id: "Peserta Online:" },
  "termsbox.agree":       { en: "I have read and agree to the", id: "Saya telah membaca dan menyetujui" },
  "termsbox.agree_link":  { en: "Terms & Conditions",   id: "Syarat & Ketentuan" },
  "termsbox.back":        { en: "← Back",               id: "← Kembali" },
  "termsbox.accept":      { en: "Accept & Continue",    id: "Setuju & Lanjutkan" },
} as const;

type TranslationKey = keyof typeof translations;

const LanguageContext = createContext<{
  lang: Language;
  toggle: () => void;
  tr: (key: TranslationKey) => string;
}>({
  lang: "en",
  toggle: () => {},
  tr: (k) => k,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>(
    () => (localStorage.getItem("lang") as Language) || "en"
  );

  const toggle = () => {
    const next = lang === "en" ? "id" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const tr = (key: TranslationKey): string => translations[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggle, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
export type { TranslationKey };