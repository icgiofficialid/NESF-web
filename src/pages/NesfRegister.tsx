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
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SiteShell from "@/components/nesf/NesfShell";
import { type CompetitionType } from "./register/nesfRegisterConfig";
import NesfStepCompetition from "./register/NesfStepCompetition";
import NesfStepTerms       from "./register/NesfStepTerms";
import NesfStepForm, { type SummaryData } from "./register/NesfStepForm";
import { getEventMeta, getSheetConfig } from "@/config/eventRegistry";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

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

// ── Halaman Ringkasan (Step 4) — desain disamakan persis dengan
//    SummaryPage milik IESF (Register.tsx) ─────────────────────────
const SummaryPage = ({
  data, eventTitle, onHome,
}: { data: SummaryData; eventTitle: string; onHome: () => void }) => {
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
    { label: "Event",               value: eventTitle },
    { label: "Kategori Peserta",    value: "Indonesia" },
    ...(data.competitionCategory ? [{ label: "Paket Kompetisi", value: data.competitionCategory }] : []),
    { label: "Nama Tim",            value: data.namaLengkap },
    { label: "Sekolah/Universitas", value: data.namaSekolah },
    { label: "Jenjang",             value: data.grade },
    { label: "Kategori Proyek",     value: data.categories },
    { label: "Judul Proyek",        value: data.projectTitle },
  ];

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
          <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-0.5 py-1 border-b border-border/40 last:border-0">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-sm text-foreground font-semibold sm:text-right sm:max-w-[60%] whitespace-pre-wrap">{value || "-"}</span>
          </div>
        ))}
      </div>

      <Button variant="hero" size="lg" className="w-full" onClick={onHome}>
        Kembali ke Beranda
      </Button>
    </div>
  );
};

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

  const [step, setStep]               = useState<1 | 2 | 3 | 4>(1);
  const [competition, setCompetition] = useState<CompetitionType | null>(null);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);

  const handleSuccess = (data: SummaryData) => {
    setSummaryData(data);
    setStep(4);
  };

  const handleHome = () => {
    setStep(1);
    setCompetition(null);
    setSummaryData(null);
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

  // ── Step 4 — Ringkasan pendaftaran (setelah submit sukses) ────────
  if (step === 4 && summaryData) {
    return (
      <SiteShell>
        <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center justify-center">
          <SummaryPage data={summaryData} eventTitle={eventTitle} onHome={handleHome} />
        </section>
      </SiteShell>
    );
  }

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