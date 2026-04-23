// import { motion } from "framer-motion";

// import { galleryItems, pageMeta } from "@/components/icc/iccData";
// import PageHero from "@/components/icc/PageHero";
// import SectionReveal from "@/components/icc/SectionReveal";
// import SiteShell from "@/components/icc/IccShell"; // BENAR

// import { useLang } from "@/components/LanguageProvider";

// const Galery = () => {
//   const meta = pageMeta.galery;
//   const { lang } = useLang();

//   return (
//     <SiteShell>
//       <PageHero eyebrow={meta.eyebrow[lang]} title={meta.title[lang]} description={meta.description[lang]} icon={meta.icon} />
//       <section className="container pb-16 md:pb-24">
//         <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//           {galleryItems.map((item, index) => (
//             <SectionReveal key={index} delay={index * 0.06} className="h-full">
//               <motion.div whileHover={{ y: -6 }} className="tech-shell group rounded-[1.75rem] p-6">
//                 <div className="flex h-52 items-end rounded-[1.25rem] border border-border/70 bg-hero p-5">
//                   <div>
//                     <p className="text-xs uppercase tracking-[0.25em] text-primary">IESF Scene</p>
//                     <h2 className="mt-2 text-xl text-foreground">{item[lang]}</h2>
//                   </div>
//                 </div>
//               </motion.div>
//             </SectionReveal>
//           ))}
//         </div>
//       </section>
//     </SiteShell>
//   );
// };

// export default Galery;