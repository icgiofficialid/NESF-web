import { motion } from "framer-motion";
import { ArrowLeft, FolderOpen, ExternalLink, ImageOff, Images } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NesfShell from "@/components/nesf/NesfShell";
import SectionReveal from "@/components/nesf/SectionReveal";
import PastEventSubNav from "@/components/nesf/PastEventSubNav";
import { getEventMeta } from "@/config/eventRegistry";

/**
 * Struktur album. `photos` bersifat opsional dan boleh berisi:
 *  - ID file Google Drive            -> "1AbC...xyz"
 *  - Link file Google Drive          -> "https://drive.google.com/file/d/1AbC.../view"
 *  - URL gambar biasa (https://...)  -> dipakai apa adanya
 * Jika `photos` kosong, `coverImage` dipakai sebagai satu-satunya foto.
 */
type Album = {
  title: string;
  driveUrl: string;
  coverImage?: string;
  description?: string;
  photos?: string[];
};

/** Ubah ID / link Drive menjadi URL thumbnail yang bisa dipakai di <img>. */
const toImageUrl = (src: string, width = 640) => {
  if (!src) return "";
  const fileMatch = src.match(/\/file\/d\/([\w-]+)/) ?? src.match(/[?&]id=([\w-]+)/);
  if (fileMatch) return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w${width}`;
  if (/^https?:\/\//.test(src) || src.startsWith("/")) return src;
  return `https://drive.google.com/thumbnail?id=${src}&sz=w${width}`;
};

// Variasi lebar tile supaya barisan foto terlihat berirama, bukan seragam.
const TILE_WIDTHS = ["w-56 md:w-72", "w-44 md:w-56", "w-64 md:w-80", "w-48 md:w-60", "w-56 md:w-64"];

const MIN_TILES = 8; // minimal jumlah tile agar marquee selalu terisi penuh

const PhotoMarquee = ({
  photos,
  fallbackGradient,
  duration,
}: {
  photos: string[];
  fallbackGradient: string;
  duration: number;
}) => {
  // Gandakan daftar foto sampai cukup panjang
  const base = photos.length > 0 ? photos : [""];
  const row: string[] = [];
  while (row.length < Math.max(MIN_TILES, base.length)) row.push(...base);

  const renderRow = (ariaHidden: boolean) => (
    <div className="flex shrink-0 gap-3 pr-3" aria-hidden={ariaHidden}>
      {row.map((src, i) => (
        <div
          key={`${ariaHidden ? "b" : "a"}-${i}`}
          className={`relative h-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${fallbackGradient} ${
            TILE_WIDTHS[i % TILE_WIDTHS.length]
          }`}
        >
          {src && (
            <img
              src={toImageUrl(src)}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              draggable={false}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
      <div className="nesf-marquee-track flex h-full w-max" style={{ animationDuration: `${duration}s` }}>
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
};

const PastEventGallery = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const meta = slug ? getEventMeta(slug) : undefined;

  if (!meta) return <Navigate to="/past-events" replace />;
  // Event belum selesai → arahkan ke halaman detail biasa
  if (meta.status !== "past") return <Navigate to={`/events/${meta.slug}`} replace />;

  const albums = (meta.gallery ?? []) as Album[];
  const gradient = meta.heroGradient ?? "from-slate-800 to-slate-900";
  const totalPhotos = albums.reduce((sum, a) => sum + (a.photos?.length || (a.coverImage ? 1 : 0)), 0);

  return (
    <NesfShell>
      {/* Animasi marquee: bergerak ke kanan, berhenti saat di-hover, mati jika user minta reduced motion */}
      <style>{`
        @keyframes nesf-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .nesf-marquee-track {
          animation: nesf-marquee-right 40s linear infinite;
          will-change: transform;
        }
        .nesf-album:hover .nesf-marquee-track,
        .nesf-album:focus-visible .nesf-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .nesf-marquee-track { animation: none; transform: none; }
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden">
        {/* Cahaya latar dari warna hero event */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br ${gradient} opacity-25 blur-3xl`}
        />

        <section className="container relative pt-16 pb-10 md:pt-20 md:pb-14">
          <button
            onClick={() => navigate("/past-events")}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Event Lalu
          </button>

          <SectionReveal className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold text-primary">{meta.subtitle}</p>
            <h1 className="text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
              Dokumentasi
              <span className="block font-light text-muted-foreground">{meta.title}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-sm text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-panel/70 px-3 py-1 backdrop-blur">
                {meta.location}
              </span>
              <span className="rounded-full border border-border/70 bg-panel/70 px-3 py-1 backdrop-blur">
                {meta.dateRange}
              </span>
              {albums.length > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-medium text-primary">
                  <Images className="h-3.5 w-3.5" />
                  {albums.length} album{totalPhotos > 0 ? ` · ${totalPhotos}+ foto` : ""}
                </span>
              )}
            </div>
          </SectionReveal>
        </section>

        <div className="container relative pb-8">
          <PastEventSubNav slug={meta.slug} />
        </div>

        <section className="container relative pb-24">
          {albums.length === 0 ? (
            <SectionReveal className="space-y-3 py-24 text-center">
              <ImageOff className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="text-lg font-semibold text-foreground">Dokumentasi belum tersedia</p>
              <p className="text-sm text-muted-foreground">
                Album foto akan ditambahkan setelah proses kurasi selesai.
              </p>
            </SectionReveal>
          ) : (
            <div className="flex flex-col gap-8 md:gap-10">
              {albums.map((album, i) => {
                const photos = album.photos?.length ? album.photos : album.coverImage ? [album.coverImage] : [];
                // Durasi disesuaikan dengan jumlah foto & dibuat sedikit berbeda tiap card
                const duration = Math.max(30, Math.max(photos.length, MIN_TILES) * 5) + (i % 3) * 6;

                return (
                  <SectionReveal key={album.driveUrl} delay={i * 0.08}>
                    <motion.a
                      href={album.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buka folder Google Drive: ${album.title}`}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="nesf-album group relative block overflow-hidden rounded-[2rem] border border-border/70 bg-panel shadow-sm outline-none transition-shadow duration-300 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {/* Strip foto otomatis bergeser ke kanan */}
                      <div className="relative h-60 bg-black/5 p-3 md:h-80 md:p-4">
                        <PhotoMarquee photos={photos} fallbackGradient={gradient} duration={duration} />

                        {/* Pill "Google Drive" */}
                        <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md md:left-8 md:top-8">
                          <FolderOpen className="h-3.5 w-3.5" /> Google Drive
                        </span>

                        {/* Muncul saat hover: ajakan membuka folder */}
                        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-xl">
                            Buka semua foto <ExternalLink className="h-4 w-4" />
                          </span>
                        </div>
                      </div>

                      {/* Info album */}
                      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-7">
                        <div className="min-w-0 space-y-1.5">
                          <h2 className="text-xl font-bold leading-snug text-foreground md:text-2xl">{album.title}</h2>
                          {album.description && (
                            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{album.description}</p>
                          )}
                        </div>

                        <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 group-hover:scale-105">
                          Lihat di Drive
                          <ExternalLink className="h-4 w-4" />
                        </span>
                      </div>
                    </motion.a>
                  </SectionReveal>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </NesfShell>
  );
};

export default PastEventGallery;