// ================================================================
// DscfStepCompetition.tsx — Pilih Online/Offline (khusus DESF & DMO)
// Path: src/pages/nesf/register/DscfStepCompetition.tsx
// ================================================================
import { Laptop, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type DscfSubEvent, type CompetitionType, DSCF_SUB_LABELS } from "./dscfRegisterConfig";

interface Props {
  subEvent: DscfSubEvent;
  selected: CompetitionType | null;
  setSelected: (v: CompetitionType) => void;
  onBack: () => void;
  onNext: () => void;
}

const OPTIONS: { value: CompetitionType; label: string; desc: string; icon: React.ElementType }[] = [
  {
    value: "online",
    label: "Online",
    desc: "Pengumpulan dokumen & penilaian dilakukan secara daring, tanpa perlu hadir langsung di Depok.",
    icon: Laptop,
  },
  {
    value: "offline",
    label: "Offline",
    desc: "Peserta hadir langsung di lokasi acara (Depok, Jawa Barat) untuk presentasi/penilaian tatap muka.",
    icon: Building2,
  },
];

const DscfStepCompetition = ({ subEvent, selected, setSelected, onBack, onNext }: Props) => {
  const subLabel = DSCF_SUB_LABELS[subEvent];

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          Pilih Kategori Partisipasi
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Online atau Offline?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">{subLabel}</p>
      </div>

      <div className="flex flex-col gap-3">
        {OPTIONS.map(({ value, label, desc, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className={`w-full rounded-2xl p-5 text-left flex items-center gap-4 border-2 transition-all duration-150 bg-card ${
              selected === value ? "border-primary" : "border-border hover:border-primary/40"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selected === value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm leading-snug">{label}</p>
              <p className="text-muted-foreground text-xs mt-0.5 leading-5">{desc}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
              selected === value ? "border-primary" : "border-muted-foreground/30"
            }`}>
              {selected === value && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-between gap-3">
        <Button variant="outline" size="lg" onClick={onBack}>← Kembali</Button>
        <Button size="lg" disabled={!selected} onClick={onNext} className="px-8">Lanjutkan →</Button>
      </div>
    </div>
  );
};

export default DscfStepCompetition;