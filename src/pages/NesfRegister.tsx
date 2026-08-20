// ================================================================
// NesfRegister.tsx — Halaman Registrasi Generik NESF (3 langkah)
//
// ⚠️ REWRITE — sekarang generik & slug-aware, dipakai lewat route
// /register/:slug untuk SEMUA event NESF (Borneo-NESF, dan event
// berikutnya) KECUALI DSCF (DSCF punya flow terpisah, tetap di
// /register/dscf-2026 → DscfRegister, sengaja tidak disentuh).
//
// Flow (3 langkah, TANPA "Choose Participant Citizen" — semua event
// NESF adalah kompetisi nasional):
//   1) Format Kompetisi (Online/Offline)
//   2) Syarat & Ketentuan
//   3) Formulir → submit ke GAS
//
// Untuk event baru: TIDAK PERLU bikin file register baru lagi.
// Cukup tambahkan entry di src/config/eventRegistry.ts (slug,
// pricing, sheet.sheetUrl, sheet.targets), lalu arahkan tombol
// "Daftar" di halaman detail event ke `/register/<slug>` — halaman
// ini otomatis membaca sisanya dari eventRegistry.
// ================================================================
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SiteShell from "@/components/nesf/NesfShell";
import { type CompetitionType } from "./register/nesfRegisterConfig";
import NesfStepCompetition from "./register/NesfStepCompetition";
import NesfStepTerms       from "./register/NesfStepTerms";
import NesfStepForm, { type SummaryData } from "./register/NesfStepForm";
import { getEventMeta, getSheetConfig } from "@/config/eventRegistry";
import { Button } from "@/components/ui/button";

// ── Step indicator ────────────────────────────────────────────────
const STEP_LABELS = ["Format", "Syarat", "Formulir"];

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

// ── Halaman "event tidak ditemukan / belum dibuka" ─────────────────
const EventUnavailable = ({ message }: { message: string }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md text-center">
      <p className="text-muted-foreground text-sm mb-6">{message}</p>
      <Button variant="hero" onClick={() => navigate("/events")}>← Kembali ke Daftar Event</Button>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────
const NesfRegister = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const eventMeta = slug ? getEventMeta(slug) : undefined;
  const eventTitle = eventMeta?.subtitle || eventMeta?.title || "NESF 2026";

  const [step, setStep]               = useState<1 | 2 | 3>(1);
  const [competition, setCompetition] = useState<CompetitionType | null>(null);

  const handleSuccess = (_data: SummaryData) => {
    setStep(1);
    setCompetition(null);
    navigate("/");
  };

  // ── Event tidak ditemukan (slug salah / shutdown) ────────────────
  if (!slug || !eventMeta) {
    return (
      <SiteShell>
        <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center justify-center">
          <EventUnavailable message="Event tidak ditemukan. Silakan daftar melalui halaman event." />
        </section>
      </SiteShell>
    );
  }

  // ── Pendaftaran belum dibuka ──────────────────────────────────────
  if (!eventMeta.registrationOpen) {
    return (
      <SiteShell>
        <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center justify-center">
          <EventUnavailable message={`Pendaftaran ${eventTitle} belum dibuka. Silakan cek kembali nanti.`} />
        </section>
      </SiteShell>
    );
  }

  const sheetConfig = competition ? getSheetConfig(slug, "indonesian", competition) : null;

  return (
    <SiteShell>
      <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center">
        <StepIndicator step={step} />

        {step === 1 && (
          <NesfStepCompetition
            eventTitle={eventTitle}
            competition={competition}
            setCompetition={setCompetition}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && competition && (
          <NesfStepTerms
            eventTitle={eventTitle}
            competition={competition}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && competition && sheetConfig && (
          <NesfStepForm
            eventSlug={slug}
            eventTitle={eventTitle}
            competition={competition}
            sheetUrl={sheetConfig.sheetUrl}
            sheetTarget={sheetConfig.sheetTarget}
            pricing={eventMeta.pricing}
            onBack={() => setStep(2)}
            onSuccess={handleSuccess}
          />
        )}
        {step === 3 && competition && !sheetConfig && (
          <EventUnavailable message="Konfigurasi pendaftaran event ini belum lengkap. Hubungi panitia." />
        )}
      </section>
    </SiteShell>
  );
};

export default NesfRegister;