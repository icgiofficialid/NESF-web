import { LucideIcon } from "lucide-react";

import SectionReveal from "@/components/nesf/SectionReveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const PageHero = ({ eyebrow, title, description, icon: Icon }: PageHeroProps) => {
  return (
    <section className="container py-16 md:py-24">
      <SectionReveal className="hero-radar tech-shell rounded-[2rem] p-8 md:p-10">
        <div className="relative max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-panel/70 px-4 py-2 text-sm uppercase tracking-[0.24em] text-primary">
            <Icon className="h-4 w-4" />
            {eyebrow}
          </div>
          <h1 className="text-balance text-4xl leading-tight md:text-5xl">{title}</h1>
          <p className="max-w-2xl leading-8 text-muted-foreground">{description}</p>
        </div>
      </SectionReveal>
    </section>
  );
};

export default PageHero;