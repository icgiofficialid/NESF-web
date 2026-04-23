// ================================================================
// NesfRegister.tsx — NESF Registration Page (3-step flow)
//
// Step 1: Choose competition format (Online / Offline)
// Step 2: Terms & Conditions
// Step 3: Registration Form → submit to GAS
// ================================================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteShell from "@/components/nesf/NesfShell";
import { type CompetitionType } from "./register/nesfRegisterConfig";
import NesfStepCompetition from "./register/NesfStepCompetition";
import NesfStepTerms       from "./register/NesfStepTerms";
import NesfStepForm        from "./register/NesfStepForm";

// ── Step indicator ────────────────────────────────────────────────
const STEP_LABELS = ["Format", "Terms", "Form"];

const StepIndicator = ({ step }: { step: number }) => (
  <div className="flex items-center gap-2 mb-10">
    {STEP_LABELS.map((label, i) => (
      <div key={label} className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            step > i + 1
              ? "bg-primary text-primary-foreground"
              : step === i + 1
              ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
              : "bg-border text-muted-foreground"
          }`}>
            {step > i + 1 ? "✓" : i + 1}
          </div>
          <span className="text-[10px] text-muted-foreground hidden sm:block">{label}</span>
        </div>
        {i < STEP_LABELS.length - 1 && (
          <div className={`w-8 sm:w-16 h-0.5 mb-4 transition-all duration-300 ${
            step > i + 1 ? "bg-primary" : "bg-border"
          }`} />
        )}
      </div>
    ))}
  </div>
);

// ── Page ──────────────────────────────────────────────────────────
const NesfRegister = () => {
  const navigate = useNavigate();

  const [step, setStep]               = useState<1 | 2 | 3>(1);
  const [competition, setCompetition] = useState<CompetitionType | null>(null);

  const handleSuccess = () => {
    setStep(1);
    setCompetition(null);
    navigate("/");
  };

  return (
    <SiteShell>
      <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center">
        <StepIndicator step={step} />

        {step === 1 && (
          <NesfStepCompetition
            competition={competition}
            setCompetition={setCompetition}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && competition && (
          <NesfStepTerms
            competition={competition}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && competition && (
          <NesfStepForm
            competition={competition}
            onBack={() => setStep(2)}
            onSuccess={handleSuccess}
          />
        )}
      </section>
    </SiteShell>
  );
};

export default NesfRegister;