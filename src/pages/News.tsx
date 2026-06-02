// ================================================================
// News.tsx
// Path: src/pages/News.tsx
// ================================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Tag, Calendar } from "lucide-react";
import SiteShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import PageHero from "@/components/nesf/PageHero";
import { Newspaper } from "lucide-react";
import { newsItems, type NewsItem } from "@/config/newsData";

const NewsCard = ({ item, index }: { item: NewsItem; index: number }) => {
  const navigate = useNavigate();
  return (
    <SectionReveal delay={index * 0.08} className="h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        onClick={() => navigate(`/news/${item.slug}`)}
        className="tech-shell rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
      >
        {/* Cover */}
        {item.coverImage ? (
          <div className="h-44 overflow-hidden bg-primary/5">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-44 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <Newspaper className="w-10 h-10 text-primary/30" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-2.5 py-0.5">
              {item.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar className="w-3 h-3" /> {item.date}
            </span>
          </div>

          <h3 className="font-bold text-foreground text-base leading-snug mb-3 group-hover:text-primary transition-colors">
            {item.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-6 flex-1">
            {item.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-1 text-sm text-primary font-semibold">
            Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.article>
    </SectionReveal>
  );
};

const NewsDetail = ({ item }: { item: NewsItem }) => {
  const navigate = useNavigate();
  return (
    <SiteShell>
      <div className="container max-w-3xl py-12 md:py-20">
        <button
          onClick={() => navigate("/news")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to News
        </button>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-2.5 py-0.5">
              {item.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar className="w-3 h-3" /> {item.date}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">{item.title}</h1>
        </div>

        {item.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-8 h-56 md:h-72 bg-primary/5">
            <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
          {item.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-sm md:text-base text-muted-foreground leading-7 md:leading-8">
              {para}
            </p>
          ))}
        </div>

        {item.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-6 flex-wrap">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
};

const News = () => {
  const navigate = useNavigate();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Latest News"
        title="News & Announcements"
        description="Stay updated with the latest news, announcements, and highlights from IESF events around the world."
        icon={Newspaper}
      />
      <section className="container pb-16 md:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => (
            <NewsCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
};

export { NewsDetail };
export default News;