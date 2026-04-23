// ================================================================
// nesfEventsData.ts
// Path: src/components/nesf/nesfEventsData.ts
//
// ⚠️ FILE INI HANYA BERISI DATA FALLBACK LOKAL.
//    Data live diambil dari GAS Public API via gasClient.ts.
//    Lokasi NESF masih TBA — update melalui Dashboard ICGI.
// ================================================================

import type { ICCEvent } from "@/lib/gasClient";

export type { ICCEvent, EventType, EventStatus } from "@/lib/gasClient";

// ── LOCAL FALLBACK DATA ───────────────────────────────────────────
export const localNesfEvents: ICCEvent[] = [
  {
    id:                   "nesf-2026",
    slug:                 "nesf",
    type:                 "Competition",
    status:               "upcoming",
    title:                "National Engineering Science Fair",
    subtitle:             "NESF 2026",
    location:             "Indonesia (Venue TBA)",
    country:              "Indonesia",
    dateRange:            "TBA, 2026",
    year:                 2026,
    registrationDeadline: "TBA",
    coverGradient:        "from-cyan-900 via-blue-900 to-slate-900",
    accentColor:          "hsl(195 100% 50%)",
    description:
      "A national science and engineering fair for Indonesian students and young innovators, covering engineering & technology, environmental science, health & life science, applied science, and social innovation categories.",
    tags:                 ["Engineering", "Science", "Innovation", "Research", "National"],
    platform:             "nesf",
    posterUrl:            "",
    guidebookUrl:         "",
    registrationUrl:      "",
    spreadsheetId:        "",
  },
];

export const nesfEvents = localNesfEvents;