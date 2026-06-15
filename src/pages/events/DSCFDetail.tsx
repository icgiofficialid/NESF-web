// ================================================================
// DSCFDetail.tsx  (slim wrapper)
// Path: src/pages/events/DSCFDetail.tsx
//
// Cukup import data & template. Tidak ada logic di sini.
// Untuk event baru di portal NESF, copy pola ini dan ganti slug + data.
// ================================================================

import dscf from "@/config/events/dscf";
import EventDetailPage from "./EventDetailPage";

const DSCFDetail = () => <EventDetailPage slug="dscf-2026" data={dscf} />;

export default DSCFDetail;