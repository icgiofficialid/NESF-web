// ================================================================
// BorneoNESFDetail.tsx — HALAMAN CUSTOM PENUH untuk Borneo-NESF
// Path: src/pages/events/BorneoNESFDetail.tsx
//
// Halaman mandiri, desain sendiri — TIDAK memakai EventDetailPage
// generik. Style/desain SENGAJA disamakan persis dengan
// BorneoIESFDetail.tsx (versi internasional) — bedanya hanya
// bahasa (full Bahasa Indonesia) & target registrasi.
//
// ── Design brief (sama seperti BorneoIESF) ─────────────────────
// Subjek   : Borneo — Palangka Raya, Kalimantan Tengah.
//            Hutan hujan tropis, lahan gambut, Sungai Kahayan,
//            warisan Dayak (burung Enggang/Rangkong, ukiran totem).
// Warna    : Kanopi rimba gelap → hijau lumut → amber kayu ukir.
// Tipografi: Bricolage Grotesque (display, tegas & berkarakter)
//            dipasangkan Work Sans (body, netral & jernih).
// Signature: Siluet burung Enggang bertengger di hero + pita
//            "sungai" berkelok. Awards jadi totem vertikal
//            (rank asli, bukan dekorasi). Kriteria jadi cincin
//            persentase (conic-gradient). Kategori jadi grid
//            kanopi berjenjang (staggered).
// ================================================================

import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Mail, Globe, Trophy, Cpu, Leaf, HeartPulse,
  FlaskConical, Users, ArrowRight, CheckCircle2, Clock, Award,
} from "lucide-react";
import SiteShell from "@/components/nesf/NesfShell";
import { Button } from "@/components/ui/button";
import { getEventMeta } from "@/config/eventRegistry";
import borneonesf from "@/config/events/borneonesf";

const iconMap: Record<string, React.ElementType> = { Cpu, Leaf, HeartPulse, FlaskConical, Users };

// ── Palet rimba Kalimantan (identik dengan Borneo-IESF) ─────────
const C = {
  canopy: "#0B2B1E", // hijau kanopi gelap
  moss:   "#2F6B4F", // hijau lumut
  river:  "#1C6E8C", // biru sungai Kahayan
  amber:  "#C98A2B", // amber kayu ukir
  bark:   "#EFE8D6", // krem kulit kayu
  clay:   "#A6462B", // terakota Dayak
};

const BorneoNESFDetail = () => {
  const navigate = useNavigate();
  const meta = getEventMeta("borneo-nesf-2026");
  const data = borneonesf;
  const registrationOpen = !!meta?.registrationOpen;

  const goRegister = () => {
    navigate("/register/borneo-nesf-2026");
  };

  const rankedAwards  = data.awards.slice(0, 4);
  const specialAwards = data.awards.slice(4);

  const pctToDeg = (w: string) => (parseFloat(w) / 100) * 360;

  return (
    <SiteShell>
      {/* Font khusus halaman ini — Bricolage Grotesque (display) + Work Sans (body) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap');
        .borneo-page { font-family: 'Work Sans', ui-sans-serif, system-ui, sans-serif; }
        .borneo-display { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="borneo-page w-full min-h-screen" style={{ background: C.bark }}>

        {/* ── Top bar ─────────────────────────────────────────── */}
        <div className="sticky top-0 z-40 backdrop-blur-xl border-b" style={{ background: `${C.bark}EE`, borderColor: `${C.canopy}22` }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate("/events")}
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: C.canopy }}
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Acara Mendatang
            </button>
            <span
              className="text-[10px] font-bold tracking-[0.25em] uppercase rounded-full px-3 py-1.5 hidden sm:block"
              style={{ color: C.moss, border: `1px solid ${C.moss}55` }}
            >
              BORNEO-NESF · Palangka Raya 2026
            </span>
          </div>
        </div>

        {/* ── HERO — kanopi rimba + burung Enggang + sungai ──────── */}
        <section className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.canopy} 0%, #133326 55%, ${C.moss} 100%)` }}>
          <div className="max-w-6xl mx-auto px-4 pt-16 pb-28 md:pt-24 md:pb-36 relative">

            {/* Lapisan kanopi — baris siluet daun bertumpuk, memberi kedalaman */}
            <svg className="absolute inset-x-0 top-0 w-full h-40 md:h-56 opacity-30 pointer-events-none" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <path d="M0 0 H1200 V80 Q1100 140 1000 90 Q900 150 800 85 Q700 145 600 90 Q500 150 400 85 Q300 145 200 90 Q100 150 0 80 Z" fill={C.moss} />
            </svg>

            {/* Siluet burung Enggang (Rangkong) — bertengger kanan atas */}
            <svg className="absolute top-8 right-4 md:right-12 w-24 md:w-36 h-auto opacity-90 pointer-events-none" viewBox="0 0 140 120" fill="none">
              <rect x="0" y="92" width="140" height="6" rx="3" fill={C.amber} opacity="0.6" />
              <path d="M40 70 Q10 78 5 100 Q22 92 42 78 Z" fill={C.canopy} />
              <ellipse cx="70" cy="65" rx="30" ry="24" fill={C.canopy} />
              <circle cx="98" cy="48" r="15" fill={C.canopy} />
              <path d="M96 34 Q108 24 122 30 Q112 36 104 40 Z" fill={C.clay} />
              <path d="M110 46 Q135 44 138 52 Q132 58 110 56 Z" fill={C.amber} />
              <path d="M62 88 L58 98 M78 88 L80 98" stroke={C.canopy} strokeWidth="3" strokeLinecap="round" />
            </svg>

            {/* Konten hero */}
            <div className="relative z-10 max-w-2xl pt-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase text-white/90 border border-white/25 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8">
                {data.labels.heroBadge}
              </span>
              <h1 className="borneo-display text-white text-4xl md:text-6xl font-extrabold leading-[1.02] mb-4">
                Borneo<br />
                <span style={{ color: C.amber }}>National</span><br />
                Science Fair
              </h1>
              <p className="text-white/70 text-base md:text-lg mb-10 mt-6">{meta?.dateRange ?? "27–30 November 2026"} · Palangka Raya, Kalimantan Tengah</p>

              <div className="flex flex-wrap items-center gap-3">
                {registrationOpen ? (
                  <Button size="lg" onClick={goRegister} style={{ background: C.amber, color: C.canopy }} className="hover:opacity-90 border-0 font-bold">
                    Daftar Sekarang <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button size="lg" disabled className="opacity-60">Pendaftaran saat ini ditutup</Button>
                )}
                {data.guidebookUrl && (
                  <Button
                    size="lg" variant="outline"
                    className="bg-white/10 border-white/25 text-white hover:bg-white/20"
                    onClick={() => window.open(data.guidebookUrl, "_blank")}
                  >
                    Buku Panduan
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Pita sungai — pemisah menuju section berikutnya */}
          <svg className="w-full h-10 md:h-16 block" viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path d="M0 20 Q300 60 600 20 T1200 20 V60 H0 Z" fill={C.river} opacity="0.35" />
            <path d="M0 35 Q300 5 600 35 T1200 35 V60 H0 Z" fill={C.bark} />
          </svg>
        </section>

        {/* ── Stats strip ─────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 -mt-2 md:-mt-4 relative z-10 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-4 md:p-5 text-center"
                style={{ background: C.canopy, border: `1px solid ${C.amber}44` }}
              >
                <p className="borneo-display text-2xl md:text-3xl font-extrabold" style={{ color: C.amber }}>{s.value}</p>
                <p className="text-[11px] uppercase tracking-wide mt-1 text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Diselenggarakan oleh ────────────────────────────────── */}
        {data.organizers && data.organizers.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4 text-center" style={{ color: `${C.canopy}80` }}>
              Diselenggarakan oleh
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {data.organizers.map((org) => (
                <div key={org.name} className="rounded-xl px-6 py-4 bg-white flex items-center justify-center" style={{ border: `1px solid ${C.canopy}1A` }}>
                  <img src={org.logo} alt={org.name} className="h-8 w-auto object-contain opacity-90" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Tentang ──────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: C.river }}>Tentang Kompetisi</p>
              <h2 className="borneo-display text-2xl md:text-3xl font-extrabold mb-6" style={{ color: C.canopy }}>
                Di mana hutan hujan bertemu inovasi muda.
              </h2>
              <p className="leading-8 text-sm md:text-[15px]" style={{ color: `${C.canopy}CC` }}>{data.about.welcome}</p>
              <p className="leading-8 text-sm md:text-[15px] mt-4" style={{ color: `${C.canopy}CC` }}>{data.about.background}</p>

              <div className="mt-8 space-y-3">
                {data.about.objectives.map((obj, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: C.moss }} />
                    <p className="text-sm leading-6" style={{ color: `${C.canopy}CC` }}>{obj}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              {[
                { icon: MapPin, label: "Lokasi",  value: data.venue },
                { icon: Mail,   label: "Kontak",  value: data.email },
                { icon: Globe,  label: "Website",  value: data.website },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl p-5 flex items-start gap-4" style={{ background: "white", border: `1px solid ${C.canopy}14` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${C.moss}1A` }}>
                    <Icon className="w-5 h-5" style={{ color: C.moss }} />
                  </div>
                  <div>
                    <p className="text-[11px]" style={{ color: `${C.canopy}80` }}>{label}</p>
                    <p className="text-sm font-semibold" style={{ color: C.canopy }}>{value}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl p-5" style={{ background: C.canopy }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: C.amber }}>Jenjang Peserta</p>
                <div className="space-y-2">
                  {data.divisions.map((d, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/10 last:border-0">
                      <span className="text-sm text-white/90">{d.level}</span>
                      <span className="text-xs text-white/50">{d.age}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Kategori — grid kanopi berjenjang (staggered) ──────── */}
        <section className="py-14" style={{ background: "white" }}>
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: C.river }}>Kategori Kompetisi</p>
            <h2 className="borneo-display text-2xl md:text-3xl font-extrabold mb-3" style={{ color: C.canopy }}>
              Delapan Kategori Penemuan
            </h2>
            <p className="text-sm max-w-2xl mb-10" style={{ color: `${C.canopy}99` }}>{data.labels.categoriesDesc}</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {data.categories.map((cat, i) => {
                const Icon = iconMap[cat.icon] ?? Cpu;
                const stagger = i % 4 === 1 || i % 4 === 3; // efek kanopi berjenjang
                return (
                  <div
                    key={cat.letter}
                    className="rounded-2xl p-5"
                    style={{
                      background: C.bark,
                      border: `1px solid ${C.canopy}14`,
                      transform: stagger ? "translateY(20px)" : undefined,
                    }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: `${C.moss}1F` }}>
                      <Icon className="w-5 h-5" style={{ color: C.moss }} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.moss }}>
                      Kategori {cat.letter}
                    </p>
                    <h4 className="borneo-display font-bold mb-2 text-sm leading-tight" style={{ color: C.canopy }}>{cat.title}</h4>
                    <p className="text-xs leading-5" style={{ color: `${C.canopy}99` }}>{cat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Kriteria Penilaian — cincin persentase ─────────────── */}
        <section className="py-16" style={{ background: C.bark }}>
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: C.river }}>Evaluasi</p>
            <h2 className="borneo-display text-2xl md:text-3xl font-extrabold mb-10" style={{ color: C.canopy }}>Kriteria Penilaian</h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {data.judgingCriteria.map((c) => (
                <div key={c.aspect} className="flex flex-col items-center text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-3"
                    style={{ background: `conic-gradient(${C.amber} ${pctToDeg(c.weight)}deg, ${C.canopy}1A 0deg)` }}
                  >
                    <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ background: C.bark }}>
                      <span className="borneo-display font-extrabold text-lg" style={{ color: C.canopy }}>{c.weight}</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold leading-4" style={{ color: C.canopy }}>{c.aspect}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Penghargaan — totem vertikal (rank asli) + plakat khusus ── */}
        <section className="py-16" style={{ background: C.canopy }}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <Trophy className="w-6 h-6" style={{ color: C.amber }} />
              <h2 className="borneo-display text-2xl md:text-3xl font-extrabold text-white">Penghargaan</h2>
            </div>

            {/* Totem Juara 1→4 */}
            <div className="max-w-md mx-auto mb-14 space-y-2">
              {rankedAwards.map((a, i) => (
                <div
                  key={a.place}
                  className="rounded-xl px-6 flex items-center justify-between"
                  style={{
                    background: i === 0 ? C.amber : `${C.amber}${["", "CC", "99", "66"][i] ?? "66"}`,
                    height: `${72 - i * 8}px`,
                  }}
                >
                  <span className="borneo-display font-extrabold" style={{ color: C.canopy }}>{a.place}</span>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: C.canopy }}>{a.medal}</p>
                    <p className="text-[11px]" style={{ color: `${C.canopy}CC` }}>{a.extra}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Plakat penghargaan khusus */}
            {specialAwards.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] mb-5 text-center" style={{ color: `${C.amber}CC` }}>
                  Penghargaan Tertinggi — Khusus Offline
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {specialAwards.map((a) => (
                    <div key={a.place} className="rounded-xl p-4 flex gap-3 items-start" style={{ background: "#133326", border: `1px solid ${C.amber}33` }}>
                      <Award className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.amber }} />
                      <div>
                        <p className="text-sm font-bold text-white">{a.place}</p>
                        <p className="text-xs text-white/60 mt-0.5">{a.medal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Jadwal — jalur berkelok ala sungai ──────────────────── */}
        <section className="py-16" style={{ background: C.bark }}>
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: C.river }}>Rangkaian Acara</p>
            <h2 className="borneo-display text-2xl md:text-3xl font-extrabold mb-3" style={{ color: C.canopy }}>Jadwal</h2>
            <p className="text-sm max-w-2xl mb-10" style={{ color: `${C.canopy}99` }}>{data.labels.scheduleDesc}</p>

            {[
              { title: "Kompetisi Offline — Palangka Raya", days: data.scheduleOffline },
              { title: "Kompetisi Online — via Zoom",       days: data.scheduleOnline  },
            ].map(({ title, days }) => days && days.length > 0 && (
              <div key={title} className="mb-12 last:mb-0">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-6" style={{ color: C.river }}>{title}</h3>
                <div className="space-y-3">
                  {days.map((day, idx) => (
                    <div
                      key={day.day}
                      className="rounded-2xl p-5 flex flex-col sm:flex-row gap-4"
                      style={{
                        background: "white",
                        border: `1px solid ${C.canopy}14`,
                        borderLeft: `4px solid ${idx % 2 === 0 ? C.river : C.moss}`,
                      }}
                    >
                      <div className="flex items-center gap-3 sm:w-56 shrink-0">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                          style={{ background: idx % 2 === 0 ? C.river : C.moss }}
                        >
                          {day.day}
                        </div>
                        <div>
                          <p className="text-xs" style={{ color: `${C.canopy}80` }}>{day.date}</p>
                          <h4 className="font-bold text-sm" style={{ color: C.canopy }}>{day.title}</h4>
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {day.items.map((item, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 rounded-lg px-3 py-2" style={{ background: C.bark }}>
                            <span className="flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0" style={{ color: C.river }}>
                              <Clock className="w-3 h-3" /> {item.time}
                            </span>
                            <span className="flex-1 text-sm" style={{ color: C.canopy }}>{item.description}</span>
                            <span className="text-xs whitespace-nowrap shrink-0" style={{ color: `${C.canopy}80` }}>{item.location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pendaftaran ─────────────────────────────────────────── */}
        <section className="py-16" style={{ background: `linear-gradient(180deg, ${C.bark} 0%, ${C.canopy} 100%)` }}>
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-center" style={{ color: C.amber }}>Bergabung di Fair Ini</p>
            <h2 className="borneo-display text-2xl md:text-3xl font-extrabold mb-10 text-center" style={{ color: C.canopy }}>Cara Mendaftar</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              {data.regSteps.map((step, i) => (
                <div key={i} className="rounded-2xl p-5 bg-white/90 backdrop-blur-sm" style={{ border: `1px solid ${C.canopy}14` }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mb-3" style={{ background: C.moss }}>
                    {i + 1}
                  </div>
                  <p className="text-xs leading-5" style={{ color: C.canopy }}>{step}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl p-10 text-center" style={{ background: C.canopy, border: `1px solid ${C.amber}33` }}>
              {registrationOpen ? (
                <>
                  <p className="text-white/70 text-sm mb-5">Pendaftaran telah dibuka — amankan slot tim Anda sekarang.</p>
                  <Button size="lg" onClick={goRegister} style={{ background: C.amber, color: C.canopy }} className="hover:opacity-90 border-0 font-bold">
                    Daftar Sekarang <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </>
              ) : (
                <p className="text-white/60 text-sm">Pendaftaran saat ini ditutup.</p>
              )}
            </div>
          </div>
        </section>

      </div>
    </SiteShell>
  );
};

export default BorneoNESFDetail;