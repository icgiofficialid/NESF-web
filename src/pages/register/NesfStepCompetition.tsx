// ================================================================
// NesfStepCompetition.tsx — Step 1: Pilih Online / Offline
// ================================================================
import { Monitor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CompetitionType } from "./nesfRegisterConfig";
import { useLang } from "@/components/LanguageProvider";

interface Props {
  competition: CompetitionType | null;
  setCompetition: (v: CompetitionType) => void;
  onNext: () => void;
}

const L = {
  step:   { en: "Step 1 of 3",                       id: "Langkah 1 dari 3" },
  title:  { en: "Choose Competition Format",          id: "Pilih Format Kompetisi" },
  sub:    { en: "Select how you will participate",    id: "Pilih cara Anda berpartisipasi" },
  next:   { en: "Continue →",                         id: "Lanjutkan →" },
};

const OPTIONS = [
  {
    value:  "online" as CompetitionType,
    label:  { en: "Online",                               id: "Online" },
    desc:   { en: "Submit & present remotely from anywhere", id: "Kirim & presentasi dari mana saja" },
    icon:   Monitor,
  },
  {
    value:  "offline" as CompetitionType,
    label:  { en: "Offline",                              id: "Offline" },
    desc:   { en: "Attend in-person at the event venue",  id: "Hadir langsung di lokasi acara" },
    icon:   Users,
  },
];

const NesfStepCompetition = ({ competition, setCompetition, onNext }: Props) => {
  const { lang } = useLang();

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          {L.step[lang]}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
          {L.title[lang]}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">{L.sub[lang]}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPTIONS.map(({ value, label, desc, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setCompetition(value)}
            className={`tech-shell rounded-2xl p-6 text-left flex flex-col gap-4 border-2 transition-all duration-200 ${
              competition === value
                ? "border-primary bg-primary/10"
                : "border-transparent hover:border-primary/40"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              competition === value
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary"
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">{label[lang]}</h3>
              <p className="text-muted-foreground text-sm mt-1">{desc[lang]}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="hero" size="lg" disabled={!competition} onClick={onNext}>
          {L.next[lang]}
        </Button>
      </div>
    </div>
  );
};

export default NesfStepCompetition;