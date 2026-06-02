// ================================================================
// newsData.ts
// Path: src/config/newsData.ts
// ================================================================

export interface NewsItem {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
}

export const newsItems: NewsItem[] = [
  {
    slug: "biesf-2026-official-launch",
    category: "Announcement",
    date: "May 10, 2026",
    title: "BIESF 2026 Officially Launched — Registration Now Open",
    excerpt: "Bali International Engineering Science Fair (BIESF) 2026 is officially launched. Students from around the world are invited to register and showcase their innovations in Bali.",
    content: `Bali International Engineering Science Fair (BIESF) 2026 is officially open for registration. Organized by ICGI in collaboration with IYSA and IPB University, BIESF is an international science competition held for the first time in Bali as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering — while fostering global collaboration and the development of critical and creative thinking skills.

The event will take place from November 16–20, 2026 in Denpasar, Bali, with a hybrid format. Offline participants will go through General Judging, Private Judging Session, Afternoon Tea & Cultural Exchange, Awarding Ceremony, and FunEdu Trip. Online participants may join via Zoom on November 25–27, 2026. Registration deadline is October 16th, 2026, with payment and submission deadline on October 23rd, 2026.

BIESF 2026 is open to students from Elementary, Secondary, and University levels — both Indonesian and international — across 8 competition categories: Mathematics Science & Technology, Environmental, IoT & Robotics, Informatics & Artificial Intelligence, Life Sciences, Social Sciences & Humanities, Physics Energy & Engineering, and Health & Medicine. Download the official guidebook or contact iesfofficial.icgi@gmail.com for full details.`,
    coverImage: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778214438/WhatsApp_Image_2026-05-08_at_11.26.51_jnzlti.jpg",
    tags: ["BIESF", "Registration", "2026"],
  },
];