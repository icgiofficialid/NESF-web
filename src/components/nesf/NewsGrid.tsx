// ================================================================
// NewsGrid.tsx
// Path: src/components/nesf/NewsGrid.tsx
//
// Berita utama (lebar penuh) + kartu berita lainnya.
// Dipakai di /news (semua event) dan /past-events/:slug/news.
// ================================================================
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "@/components/nesf/SectionReveal";
import type { NewsItem } from "@/config/newsData";

const NewsGrid = ({ items }: { items: NewsItem[] }) => {
  if (items.length === 0) return null;
  const [featured, ...rest] = items;

  return (
    <div className="space-y-6">
      <SectionReveal>
        <Link
          to={`/news/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-border/70 bg-panel shadow-sm outline-none transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary md:grid-cols-5"
        >
          <div className="relative h-56 bg-primary/5 md:col-span-2 md:h-full md:min-h-[18rem]">
            {featured.coverImage && (
              <img
                src={featured.coverImage}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 md:col-span-3 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-primary/30 px-2.5 py-0.5 font-semibold text-primary">{featured.category}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {featured.date}</span>
            </div>
            <h2 className="text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary md:text-3xl">{featured.title}</h2>
            <p className="leading-7 text-muted-foreground">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Baca selengkapnya <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </SectionReveal>

      {rest.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, i) => (
            <SectionReveal key={item.slug} delay={i * 0.06} className="h-full">
              <Link
                to={`/news/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-panel shadow-sm outline-none transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative h-44 bg-primary/5">
                  {item.coverImage ? (
                    <img src={item.coverImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <Newspaper className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-primary/30" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full border border-primary/30 px-2.5 py-0.5 font-semibold text-primary">{item.category}</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                  </div>
                  <h3 className="font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{item.title}</h3>
                  <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{item.excerpt}</p>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
