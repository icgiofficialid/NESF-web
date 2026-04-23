// ================================================================
// nesfRegisterConfig.ts — NESF Registration Config
// Single source of truth: types, constants, submit logic, UI helpers
// ================================================================

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

// ── GAS Endpoint ─────────────────────────────────────────────────
export const NESF_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyR5h25ll0eDrld-0IcSzflrtMx501Je9kfuq3BS_t6aMqHzExp6IuAJoIMjX6W6GaE/exec";

// ── Types ─────────────────────────────────────────────────────────
export type CompetitionType = "online" | "offline";
export type FormData        = Record<string, string>;

// ── Competition categories NESF ───────────────────────────────────
export const COMPETITION_CATEGORIES = [
  "Engineering & Technology",
  "Environmental Science & Sustainability",
  "Health, Life Science & Biotechnology",
  "Applied Science & Experimental Research",
  "Social Innovation & Educational Technology",
];

export const PARTICIPANT_DIVISIONS = [
  "Elementary (Age 7–12)",
  "Junior High (Age 13–15)",
  "Senior High (Age 16–18)",
  "Open Division (University / Community / STEM Club)",
];

// ── Required fields for form validation ──────────────────────────
export const REQUIRED_FIELDS: string[] = [
  "NAMA_LENGKAP",
  "LEADER_WHATSAPP",
  "LEADER_EMAIL",
  "NAMA_SEKOLAH",
  "DIVISION",
  "NAME_SUPERVISOR",
  "WHATSAPP_NUMBER_SUPERVISOR",
  "EMAIL_SUPERVISOR",
  "COMPETITION_CATEGORY",
  "PROJECT_TITLE",
  "COMPLETE_ADDRESS",
];

// ── Terms & Conditions ────────────────────────────────────────────
export const TERMS: Record<CompetitionType, string[]> = {
  online: [
    "All submitted data cannot be modified after the submission deadline. Please review carefully before submitting.",
    "Participants must ensure a stable internet connection during the online presentation/judging session.",
    "All required project documents (abstract, full paper, poster image) must be submitted no later than H-14 before the event.",
    "Submitted projects must be original work. Plagiarism or misrepresentation will result in disqualification without refund.",
    "All jury decisions are final and cannot be contested.",
    "Registration fees that have been paid are non-refundable under any circumstances.",
  ],
  offline: [
    "All submitted data cannot be modified after the submission deadline. Please review carefully before submitting.",
    "Participants must bring an A0-sized poster, prototype/product, and a hard copy of their project paper to the judging session.",
    "All required project documents must be submitted no later than H-14 before the event.",
    "Prohibited materials in the booth include fire, smoke, liquids, sharp objects, glass, dangerous substances, live animals, or materials that may damage the venue.",
    "Plagiarism or misrepresentation will result in disqualification without refund.",
    "Participants are required to follow the entire series of activities according to the set schedule.",
    "All jury decisions are final and cannot be contested.",
    "Registration fees that have been paid are non-refundable under any circumstances.",
  ],
};

// ── Submit to GAS ─────────────────────────────────────────────────
export const submitToNesfSheet = async (
  competition: CompetitionType,
  form: FormData,
): Promise<void> => {
  const f = (key: string) => form[key] ?? "";

  const payload: Record<string, string> = {
    sheetTarget:                `nesf-${competition}`,   // e.g. "nesf-online" / "nesf-offline"
    timestamp:                  new Date().toISOString(),
    CATEGORY_COMPETITION:       competition,
    NAMA_LENGKAP:               f("NAMA_LENGKAP"),
    LEADER_WHATSAPP:            f("LEADER_WHATSAPP"),
    LEADER_EMAIL:               f("LEADER_EMAIL"),
    NAMA_SEKOLAH:               f("NAMA_SEKOLAH"),
    DIVISION:                   f("DIVISION"),
    PROVINCE:                   f("PROVINCE"),
    NAME_SUPERVISOR:            f("NAME_SUPERVISOR"),
    WHATSAPP_NUMBER_SUPERVISOR: f("WHATSAPP_NUMBER_SUPERVISOR"),
    EMAIL_SUPERVISOR:           f("EMAIL_SUPERVISOR"),
    COMPETITION_CATEGORY:       f("COMPETITION_CATEGORY"),
    PROJECT_TITLE:              f("PROJECT_TITLE"),
    PROJECT_ABSTRACT:           f("PROJECT_ABSTRACT"),
    MEMBER_COUNT:               f("MEMBER_COUNT"),
    DRIVE_LINK:                 f("DRIVE_LINK"),
    COMPLETE_ADDRESS:           f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:      f("INFORMATION_RESOURCES"),
    FILE:                       f("FILE"),
  };

  const url = `${NESF_SHEET_URL}?${new URLSearchParams(payload).toString()}`;

  try {
    await fetch(url, { method: "GET", mode: "no-cors" });
  } catch (e) {
    console.error("[NESF submit] fetch failed:", e);
    throw e;
  }
};

// ── Reusable UI components ────────────────────────────────────────

export const Field = ({
  label, note, required, children,
}: {
  label: string; note?: string; required?: boolean; children: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-foreground">
      {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
    {note && <p className="text-xs text-muted-foreground leading-5">{note}</p>}
    {children}
  </div>
);

export const TextInput = ({
  placeholder, value, onChange, type = "text",
}: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <Input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    className="rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm"
  />
);

export const TextArea = ({
  placeholder, value, onChange, maxLength,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; maxLength?: number;
}) => (
  <div className="relative">
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      rows={3}
      className="w-full rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:outline-none resize-none"
    />
    {maxLength && (
      <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
        {value.length}/{maxLength}
      </span>
    )}
  </div>
);

export const SelectInput = ({
  placeholder, value, onChange, options,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; options: string[];
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:outline-none text-foreground"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

export const SectionTitle = ({ title }: { title: string }) => (
  <div className="pb-2 mb-5 border-b border-primary/20">
    <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{title}</h3>
  </div>
);