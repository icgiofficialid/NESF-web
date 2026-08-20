// ================================================================
// NesfStepTerms.tsx — Langkah 2: Syarat & Ketentuan
//
// Generik untuk semua event NESF (dipakai lewat /register/:slug).
// ================================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type CompetitionType, TERMS } from "./nesfRegisterConfig";

interface Props {
  eventTitle: string;
  competition: CompetitionType;
  onBack: () => void;
  onNext: () => void;
}

const NesfStepTerms = ({ eventTitle, competition, onBack, onNext }: Props) => {
  const [agreed, setAgreed] = useState(false);

  const terms     = TERMS[competition];
  const compLabel = competition === "offline" ? "Offline" : "Online";

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          Langkah 2 dari 3
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">Syarat & Ketentuan</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          {eventTitle} · {compLabel}
        </p>
      </div>

      <div className="tech-shell rounded-2xl overflow-hidden">
        {/* Scrollable terms */}
        <div className="h-72 overflow-y-auto p-6 text-sm text-muted-foreground leading-7 border-b border-border">
          <p className="font-semibold text-foreground mb-4">
            Baca dan setujui syarat berikut untuk {compLabel} peserta:
          </p>
          <ul className="space-y-3">
            {terms.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 shrink-0 text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Checkbox */}
        <div className="px-6 py-4 flex items-center gap-3 border-b border-border">
          <input
            type="checkbox"
            id="nesf-agree"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-primary"
          />
          <label htmlFor="nesf-agree" className="text-sm text-muted-foreground cursor-pointer select-none">
            Saya telah membaca dan menyetujui{" "}
            <span
              className="font-semibold underline cursor-pointer text-primary"
              onClick={() => window.open("/terms", "_blank")}
            >
              Syarat & Ketentuan
            </span>.
          </label>
        </div>

        {/* Actions */}
        <div className="px-4 py-5 flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={onBack}>
            ← Kembali
          </Button>
          <Button
            size="lg"
            className="w-full sm:flex-1 font-bold"
            disabled={!agreed}
            onClick={onNext}
          >
            Setuju & Lanjutkan →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NesfStepTerms;