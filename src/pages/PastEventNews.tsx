// ================================================================
// PastEventNews.tsx
// Path: src/pages/PastEventNews.tsx
// Route: /past-events/:slug/news
// Data : eventRegistry → newsSlugs  (isi berita tetap di newsData.ts)
// ================================================================
import { Newspaper } from "lucide-react";
import PastEventPage, { PastEventEmpty } from "@/components/nesf/PastEventPage";
import NewsGrid from "@/components/nesf/NewsGrid";
import { newsItems, type NewsItem } from "@/config/newsData";

const PastEventNews = () => (
  <PastEventPage
    section="news"
    title="Berita"
    description="Kabar dan publikasi resmi seputar event ini."
  >
    {(meta) => {
      // Urutan mengikuti newsSlugs di registry; slug yang tidak ada di newsData diabaikan
      const items = (meta.newsSlugs ?? [])
        .map((slug) => newsItems.find((n) => n.slug === slug))
        .filter((n): n is NewsItem => Boolean(n));

      if (items.length === 0) {
        return (
          <PastEventEmpty
            icon={Newspaper}
            title="Belum ada berita untuk event ini"
            description="Tambahkan slug berita di newsSlugs pada eventRegistry.ts agar muncul di sini."
          />
        );
      }

      return <NewsGrid items={items} />;
    }}
  </PastEventPage>
);

export default PastEventNews;
