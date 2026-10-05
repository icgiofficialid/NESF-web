// ================================================================
// dashboardRegistration.ts — NESF-web
//
// Alur pendaftaran resmi lewat dashboard ICGI, dipakai HANYA untuk
// event yang eventRegistry-nya punya `dashboardAcronym` diisi.
// Event lama (DSCF-2026, Borneo-NESF-2026) TIDAK memakai file ini —
// appscript-nya tetap jalan lewat nesfRegisterConfig.tsx.submitToSheet.
// ================================================================

const BE_ICGI_API_URL = import.meta.env.VITE_BE_ICGI_API_URL as string | undefined;

export interface RegoMeta {
  eventId: string;
  paket: Array<{ id: string; nama: string; moda: string; asal: string }>;
  kategori: Array<{ id: string; nama: string }>;
}

function requireApiUrl(): string {
  if (!BE_ICGI_API_URL) {
    throw new Error("VITE_BE_ICGI_API_URL belum di-set — pendaftaran dashboard tidak bisa jalan.");
  }
  return BE_ICGI_API_URL;
}

export async function fetchEventRegoMeta(acronym: string): Promise<RegoMeta> {
  const base = requireApiUrl();
  const res = await fetch(
    `${base}/api/public/v1/${acronym}?sections=identitas,pendaftaran`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Gagal memuat data event ${acronym} (HTTP ${res.status}).`);
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message ?? `Gagal memuat data ${acronym}.`);
  const sections: Array<{ key: string; isi: any }> = json?.data?.sections ?? [];
  const identitas = sections.find(s => s.key === "identitas")?.isi;
  const pendaftaran = sections.find(s => s.key === "pendaftaran")?.isi;
  if (!identitas?.id) throw new Error(`Edisi ${acronym} belum di-pin di dashboard.`);
  if (!pendaftaran?.dibuka) throw new Error(`Pendaftaran ${acronym} belum dibuka.`);
  return {
    eventId: identitas.id,
    paket: pendaftaran.paket ?? [],
    kategori: pendaftaran.kategori ?? [],
  };
}

export async function requestVerificationCode(email: string, eventId: string): Promise<void> {
  const base = requireApiUrl();
  const res = await fetch(`${base}/api/registration-access/request-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, event_id: eventId }),
  });
  const json = await res.json();
  if (!res.ok || json.status === "error") throw new Error(json.message || "Gagal mengirim kode verifikasi.");
}

export async function verifyCodeAndGetTicket(email: string, kode: string, eventId: string): Promise<string> {
  const base = requireApiUrl();
  const res = await fetch(`${base}/api/registration-access/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, kode, event_id: eventId, peran: "leader" }),
  });
  const json = await res.json();
  if (!res.ok || json.status === "error") throw new Error(json.message || "Kode salah atau kedaluwarsa.");
  const tiket = json.data?.tiket as string | null;
  if (!tiket) throw new Error("Verifikasi berhasil tapi tiket tidak terbit. Coba lagi.");
  return tiket;
}

export function cariPaket(meta: RegoMeta, moda: "online" | "offline") {
  const cocok = meta.paket.find(p => p.moda?.toLowerCase() === moda);
  if (!cocok) throw new Error(`Paket format "${moda}" belum ada di dashboard untuk event ini.`);
  return cocok;
}

export function cariKategori(meta: RegoMeta, namaKategori: string) {
  const rapikan = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const target = rapikan(namaKategori);
  const cocok = meta.kategori.find(k => rapikan(k.nama) === target);
  if (!cocok) throw new Error(`Kategori "${namaKategori}" belum ada di dashboard untuk event ini.`);
  return cocok;
}

export async function submitTeamRegistration(
  acronym: string,
  tiket: string,
  payload: Record<string, unknown>,
): Promise<unknown> {
  const base = requireApiUrl();
  const res = await fetch(`${base}/api/public/v1/${acronym}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tiket, ...payload }),
  });
  const json = await res.json();
  if (!res.ok || json.status === "error") throw new Error(json.message || "Pendaftaran gagal.");
  return json;
}

// ── Mapping field form NESF → payload teamRegistrationSchema ──────
const GRADE_MAP: Record<string, string> = {
  "SD / Sederajat": "elementary",
  "SMP–SMA / Sederajat": "secondary",
  "Perguruan Tinggi / Universitas": "university",
};

const baris = (s: string) => s.split(/\r?\n/).map(x => x.trim()).filter(Boolean);

export function buildNesfTeamPayload(
  acronym: string,
  competition: "online" | "offline",
  form: Record<string, string>,
  meta: RegoMeta,
) {
  const f = (key: string) => form[key] || "";
  const nama = baris(f("NAMA_LENGKAP"));
  const nisn = baris(f("NISN_NIM"));
  const sekolah = baris(f("NAMA_SEKOLAH"));
  const paket = cariPaket(meta, competition);
  const kategori = cariKategori(meta, f("CATEGORIES"));

  return {
    eventId: acronym, // diabaikan server, wajib diisi supaya lolos validasi
    packageId: paket.id,
    categoryId: kategori.id,
    participantType: "Indonesia Citizen",
    teamName: nama[0] || "",
    institution: sekolah[0] || "",
    npsn: f("NPSN"),
    grade: GRADE_MAP[f("GRADE")] || "secondary",
    province: f("PROVINCE"),
    country: "Indonesia",
    supervisor: {
      full_name: f("NAME_SUPERVISOR"),
      email: f("EMAIL_TEACHER_SUPERVISOR"),
      phone_number: f("SUPERVISOR_WA_NUM"),
      institution: sekolah[0] || "",
    },
    projectTitle: f("PROJECT_TITLE"),
    hasCompetedBefore: f("YES_NO") === "Ya",
    previousCompetitionName: f("JUDUL_PERNAH_BERPATISIPASI") || undefined,
    shippingAddress: f("COMPLETE_ADDRESS"),
    infoSource: f("INFORMATION_RESOURCES"),
    socialMediaContact: f("SOCIAL_MEDIA") || undefined,
    members: nama.map((full, i) => ({
      isLeader: i === 0,
      fullName: full,
      email: i === 0 ? f("LEADER_EMAIL") : undefined,
      phoneNumber: i === 0 ? f("LEADER_WHATSAPP_NUM") : undefined,
      school: sekolah[i] || sekolah[0] || "",
      nationalIdNumber: nisn[i] || null,
      tshirtSize: "none",
    })),
  };
}