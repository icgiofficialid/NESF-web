// ================================================================
// EventCard.tsx — Kartu event bersama (Index, Upcoming, Past)
// Path: src/components/nesf/EventCard.tsx
//
// Satu komponen dipakai di 3 tempat supaya ukuran & style selaras.
// Gambar diambil dari event.coverImage (sudah ada, dari registry).
// ================================================================
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionReveal from "@/components/nesf/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import type { NESFEvent } from "@/lib/gasClient";

type EnrichedEvent = NESFEvent & { coverImage?: string; heroGradient?: string };

interface EventCardProps {
  event: EnrichedEvent;
  index?: number;
  variant?: "default" | "past";
  showTags?: boolean;
  showDeadline?: boolean;
}

const LABELS = {
  deadline: { en: "Registration Deadline:", id: "Batas Pendaftaran:" },
  ongoing:  { en: "Ongoing Now", id: "Sedang Berlangsung" },
};

const EventCard = ({
  event, index = 0, variant = "default", showTags = false, showDeadline = false,
}: EventCardProps) => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const isOngoing = (event.status as string) === "ongoing";
  const isPast = variant === "past";

  return (
    <SectionReveal delay={index * 0.07} className="h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.22 }}
        onClick={() => navigate(`/events/${event.slug}`)}
        className={`group relative h-full cursor-pointer rounded-2xl overflow-hidden border border-border/70 bg-panel shadow-sm hover:shadow-xl transition-all duration-300 ${
          isPast ? "opacity-80 grayscale hover:grayscale-0 hover:opacity-100" : ""
        }`}
      >
        {isOngoing && !isPast && (
          <div className="absolute inset-0 rounded-2xl border-2 border-green-400/50 pointer-events-none z-10" />
        )}

        {/* Ukuran cover DISAMAKAN: h-48 untuk semua tempat */}
        <div className={`relative h-48 bg-gradient-to-br ${event.heroGradient ?? event.coverGradient ?? "from-primary/80 to-primary"} flex items-end p-0`}>
          {event.coverImage && (
            <img
              src={event.coverImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}

          {isOngoing && !isPast && (
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center gap-2 bg-green-400/90 backdrop-blur-sm py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span className="text-[10px] font-bold text-black uppercase tracking-widest">
                {LABELS.ongoing[lang]}
              </span>
            </div>
          )}

          <div className={`absolute left-3 flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white ${isOngoing && !isPast ? "top-10" : "top-3"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOngoing ? "bg-green-400" : "bg-amber-400"}`} />
            {event.type}
          </div>
          {/* FIX: dulu hardcode "IESF", sekarang dinamis */}
          <div className="absolute top-3 right-3 text-white/50 text-[10px] tracking-widest font-bold uppercase">
            {event.platform ?? "NESF"}
          </div>
          <div className="w-full bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
            <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-1">{event.subtitle}</p>
            <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 font-display">{event.title}</h3>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /><span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" /><span>{event.dateRange}</span>
          </div>
          {showDeadline && !isPast && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>⏰</span><span>{LABELS.deadline[lang]} {event.registrationDeadline}</span>
            </div>
          )}
          {showTags && event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {event.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </SectionReveal>
  );
};

export default EventCard;