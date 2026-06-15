// ================================================================
// DscfRegister.tsx — DSCF Registration Page (3-step flow)
// Path: src/pages/nesf/DscfRegister.tsx
//
// Flow khusus DSCF — BERBEDA dari NesfRegister.tsx (tetap ada).
// Step 1: Pilih Sub-Kompetisi (DESF / DMO / DCC)
// Step 2: Syarat & Ketentuan per sub-kompetisi
// Step 3: Form Pendaftaran → submit ke GAS
// Step 4: Halaman Ringkasan / Sukses
//
// DSCF hanya offline → tidak ada pilihan online/offline.
// ================================================================
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteShell from "@/components/nesf/NesfShell";
import { type DscfSubEvent, type FormData, DSCF_SUB_LABELS, DSCF_PRICE_MAP } from "./register/dscfRegisterConfig";
import DscfStepParticipant from "./register/DscfStepParticipant";
import DscfStepTerms       from "./register/DscfStepTerms";
import DscfStepForm        from "./register/DscfStepForm";

// ── Step indicator ────────────────────────────────────────────────
const STEP_LABELS = ["Sub-Kompetisi", "Syarat", "Formulir"];

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

// ── Halaman Ringkasan / Sukses ────────────────────────────────────
const SummaryPage = ({
  subEvent,
  form,
  onHome,
}: {
  subEvent: DscfSubEvent;
  form: FormData;
  onHome: () => void;
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (boxRef.current) {
        const top =
          boxRef.current.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight / 2 +
          boxRef.current.offsetHeight / 2;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const rows = [
    { label: "Sub-Kompetisi",      value: DSCF_SUB_LABELS[subEvent] },
    { label: "Nama Ketua / Peserta", value: form["NAMA_LENGKAP"] },
    { label: "Email Ketua",        value: form["LEADER_EMAIL"] },
    { label: "WhatsApp Ketua",     value: form["LEADER_WHATSAPP"] },
    { label: "Asal Sekolah",       value: form["NAMA_SEKOLAH"] },
    { label: "Jenjang",            value: form["GRADE"] },
    { label: "Kategori / Bidang",  value: form["CATEGORIES"] },
    { label: "Judul Proyek / Penampilan", value: form["PROJECT_TITLE"] },
    { label: "Biaya Pendaftaran",  value: DSCF_PRICE_MAP[subEvent] },
  ].filter(r => r.value);

  return (
    <div ref={boxRef} className="w-full max-w-xl mx-auto text-center px-4">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Pendaftaran Berhasil!</h2>
        <p className="text-muted-foreground text-sm">
          LoA akan dikirimkan ke email ketua tim dalam 3 hari kerja.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-3 mb-6">
        <h3 className="font-bold text-primary uppercase tracking-wide text-sm border-b border-border pb-2 mb-4">
          Ringkasan Pendaftaran
        </h3>
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col sm:flex-row sm:justify-between gap-0.5 py-1 border-b border-border/40 last:border-0"
          >
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-sm text-foreground font-semibold sm:text-right sm:max-w-[60%] whitespace-pre-wrap">
              {value || "—"}
            </span>
          </div>
        ))}
      </div>

      <Button variant="hero" size="lg" className="w-full" onClick={onHome}>
        Kembali ke Beranda
      </Button>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4;

const DscfRegister = () => {
  const navigate = useNavigate();

  const [step, setStep]       = useState<Step>(1);
  const [subEvent, setSubEvent] = useState<DscfSubEvent | null>(null);
  const [summaryForm, setSummaryForm] = useState<FormData>({});

  const handleSuccess = (sv: DscfSubEvent, form: FormData) => {
    setSummaryForm(form);
    setStep(4);
  };

  const handleHome = () => {
    navigate("/");
  };

  // Step 4: Ringkasan
  if (step === 4 && subEvent) {
    return (
      <SiteShell>
        <section className="w-full min-h-screen py-24 md:py-32 px-4 flex flex-col items-center justify-center">
          <SummaryPage subEvent={subEvent} form={summaryForm} onHome={handleHome} />
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center">
        <StepIndicator step={step} />

        {step === 1 && (
          <DscfStepParticipant
            selected={subEvent}
            setSelected={setSubEvent}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && subEvent && (
          <DscfStepTerms
            subEvent={subEvent}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && subEvent && (
          <DscfStepForm
            subEvent={subEvent}
            onBack={() => setStep(2)}
            onSuccess={handleSuccess}
          />
        )}
      </section>
    </SiteShell>
  );
};

export default DscfRegister;