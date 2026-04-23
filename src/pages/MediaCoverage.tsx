// import { mediaItems, pageMeta } from "@/components/icc/iccData";
// import PageHero from "@/components/icc/PageHero";
// import SectionReveal from "@/components/icc/SectionReveal";
// import SiteShell from "@/components/icc/IccShell"; // BENAR
// import { useLang } from "@/components/LanguageProvider";

// const MediaCoverage = () => {
//   const meta = pageMeta.media;
//   const { lang } = useLang();

//   return (
//     <SiteShell>
//       <PageHero {...meta} eyebrow={meta.eyebrow[lang]} title={meta.title[lang]} description={meta.description[lang]} icon={meta.icon} />
//       <section className="container pb-16 md:pb-24">
//         <SectionReveal className="grid gap-4 md:grid-cols-3">
//           {mediaItems.map((item, index) => (
//             <div key={index} className="rounded-[1.5rem] border border-border/80 bg-panel/70 p-5">
//               <p className="text-sm leading-7 text-muted-foreground">{typeof item === 'string' ? item : item[lang]}</p>
//             </div>
//           ))}
//         </SectionReveal>
//       </section>
//     </SiteShell>
//   );
// };

// export default MediaCoverage;