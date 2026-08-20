// ================================================================
// NesfStepCompetition.tsx — Langkah 1: Pilih Format Kompetisi
//
// Generik untuk semua event NESF (dipakai lewat /register/:slug).
// TIDAK ada langkah "Pilih Kewarganegaraan" — NESF selalu kompetisi
// nasional (mengikuti permintaan: flow sama seperti IESF, minus
// step Choose Participant Citizen).
// ================================================================
import { Monitor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CompetitionType } from "./nesfRegisterConfig";

interface Props {
  eventTitle: string;
  competition: CompetitionType | null;
  setCompetition: (v: CompetitionType) => void;
  onNext: () => void;
}

const OPTIONS = [
  {
    value: "online" as CompetitionType,
    label: "Online",
    desc:  "Kirim & presentasi dari mana saja",
    icon:  Monitor,
  },
  {
    value: "offline" as CompetitionType,
    label: "Offline",
    desc:  "Hadir langsung di lokasi acara",
    icon:  Users,
  },
];

const NesfStepCompetition = ({ eventTitle, competition, setCompetition, onNext }: Props) => (
  <div className="w-full max-w-2xl">
    <div className="text-center mb-8">
      <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
        Langkah 1 dari 3
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
        Pilih Format Kompetisi
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">{eventTitle}</p>
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
            <h3 className="font-bold text-foreground text-lg">{label}</h3>
            <p className="text-muted-foreground text-sm mt-1">{desc}</p>
          </div>
        </button>
      ))}
    </div>

    <div className="mt-8 flex justify-end">
      <Button variant="hero" size="lg" disabled={!competition} onClick={onNext}>
        Lanjutkan →
      </Button>
    </div>
  </div>
);

export default NesfStepCompetition;