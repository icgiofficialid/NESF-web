// ================================================================
// DscfStepTerms.tsx — Step 2: Syarat & Ketentuan DSCF
// Path: src/pages/nesf/register/DscfStepTerms.tsx
// ================================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type DscfSubEvent, DSCF_TERMS, DSCF_SUB_LABELS } from "./dscfRegisterConfig";

interface Props {
  subEvent: DscfSubEvent;
  onBack: () => void;
  onNext: () => void;
}

const DscfStepTerms = ({ subEvent, onBack, onNext }: Props) => {
  const [agreed, setAgreed] = useState(false);

  const terms    = DSCF_TERMS[subEvent];
  const subLabel = DSCF_SUB_LABELS[subEvent];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          Langkah 2 dari 3
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">Syarat &amp; Ketentuan</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          DSCF 2026 · {subLabel}
        </p>
      </div>

      <div className="tech-shell rounded-2xl overflow-hidden">
        {/* Scrollable terms */}
        <div className="h-72 overflow-y-auto p-6 text-sm text-muted-foreground leading-7 border-b border-border">
          <p className="font-semibold text-foreground mb-4">
            Syarat &amp; Ketentuan untuk peserta {subLabel}:
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
            id="dscf-agree"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-primary"
          />
          <label htmlFor="dscf-agree" className="text-sm text-muted-foreground cursor-pointer select-none">
            Saya telah membaca dan menyetujui{" "}
            <span
              className="font-semibold underline cursor-pointer text-primary"
              onClick={() => window.open("/terms", "_blank")}
            >
              Syarat &amp; Ketentuan
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
            Setuju &amp; Lanjutkan →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DscfStepTerms;