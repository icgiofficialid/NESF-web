// ================================================================
// DscfStepParticipant.tsx — Step 1: Pilih Sub-Kompetisi DSCF
// Path: src/pages/nesf/register/DscfStepParticipant.tsx
// ================================================================
import { FlaskConical, Calculator, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type DscfSubEvent } from "./dscfRegisterConfig";

interface Props {
  selected: DscfSubEvent | null;
  setSelected: (v: DscfSubEvent) => void;
  onNext: () => void;
}

const OPTIONS: {
  value: DscfSubEvent;
  label: string;
  badge: string;
  desc: string;
  price: string;
  icon: React.ElementType;
}[] = [
  {
    value: "desf",
    label: "Depok Engineering Science Fair",
    badge: "DESF",
    desc: "Kompetisi sains & rekayasa antar pelajar dengan 8 kategori bidang ilmu. Presentasi proyek di hadapan juri.",
    price: "",
    icon: FlaskConical,
  },
  {
    value: "dmo",
    label: "Depok Math Olympiad",
    badge: "DMO",
    desc: "Olimpiade matematika individu satu babak. Soal pilihan ganda sesuai jenjang pendidikan.",
    price: " ",
    icon: Calculator,
  },
  {
    value: "dcc",
    label: "Depok Cultural Competition",
    badge: "DCC",
    desc: "Kompetisi seni budaya: Tari (kreasi/tradisional) dan MHQ (Marawis, Hadroh & Qasidah).",
    price: " ",
    icon: Music,
  },
];

const DscfStepParticipant = ({ selected, setSelected, onNext }: Props) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          Langkah 1 dari 3
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Pilih Sub-Kompetisi
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          DSCF 2026 · Depok, Indonesia · Offline
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {OPTIONS.map(({ value, label, badge, desc, price, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className={`w-full rounded-2xl p-5 text-left flex items-center gap-4 border-2 transition-all duration-150 bg-card ${
              selected === value
                ? "border-primary"
                : "border-border hover:border-primary/40"
            }`}
          >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selected === value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}>
              <Icon className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border transition-colors ${
                  selected === value
                    ? "text-primary border-primary/40 bg-primary/5"
                    : "text-muted-foreground border-border"
                }`}>
                  {badge}
                </span>
              </div>
              <p className="font-semibold text-foreground text-sm leading-snug">{label}</p>
              <p className="text-muted-foreground text-xs mt-0.5 leading-5 line-clamp-2">{desc}</p>
              <p className="text-xs font-semibold text-primary mt-1">{price}</p>
            </div>

            {/* Radio indicator */}
            <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
              selected === value
                ? "border-primary"
                : "border-muted-foreground/30"
            }`}>
              {selected === value && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Note */}
      <p className="mt-4 text-xs text-muted-foreground text-center leading-5">
         DSCF 2026 hanya diselenggarakan secara <strong className="text-foreground">offline</strong> di Depok, Indonesia.
        Peserta dapat mendaftar lebih dari satu sub-kompetisi dengan pendaftaran terpisah.
      </p>

      {/* Action */}
      <div className="mt-6 flex justify-end">
        <Button size="lg" disabled={!selected} onClick={onNext} className="px-8">
          Lanjutkan →
        </Button>
      </div>
    </div>
  );
};

export default DscfStepParticipant;