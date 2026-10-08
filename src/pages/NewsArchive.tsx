// ================================================================
// NewsArchive.tsx
// Path: src/pages/NewsArchive.tsx
// Route: /news   (navbar utama — semua berita, per tahun)
// Data : newsData.ts (tahun diambil dari field `date`)
// ================================================================
import { Newspaper } from "lucide-react";
import NewsGrid from "@/components/nesf/NewsGrid";
import { ArchiveEmpty, ArchiveShell } from "@/components/nesf/YearArchive";
import { getEventYears } from "@/config/eventRegistry";
import { newsItems, type NewsItem } from "@/config/newsData";

const yearOf = (item: NewsItem): number | undefined => {
  const m = item.date.match(/\b(20\d{2})\b/);
  return m ? Number(m[1]) : undefined;
};

const NewsArchive = () => {
  // Gabungan: tahun dari event di registry + tahun dari tanggal berita
  const years = Array.from(
    new Set([...getEventYears(), ...newsItems.map(yearOf).filter((y): y is number => typeof y === "number")])
  ).sort((a, b) => b - a);

  const counts = Object.fromEntries(
    years.map((y) => [y, newsItems.filter((n) => yearOf(n) === y).length])
  ) as Record<number, number>;

  return (
    <ArchiveShell
      title="Berita"
      description="Kabar dan pengumuman resmi dari seluruh event NESF. Pilih tahun untuk melihat beritanya."
      icon={Newspaper}
      years={years}
      counts={counts}
      countUnit="berita"
    >
      {(year) => {
        const items = newsItems.filter((n) => yearOf(n) === year);
        if (items.length === 0) {
          return <ArchiveEmpty icon={Newspaper} title={`Belum ada berita ${year}`} description="Berita akan muncul di sini setelah dipublikasikan." />;
        }
        return <NewsGrid items={items} />;
      }}
    </ArchiveShell>
  );
};

export default NewsArchive;
