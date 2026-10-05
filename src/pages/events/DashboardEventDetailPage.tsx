import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteShell from '@/components/nesf/NesfShell';
import EventDetailPage from './EventDetailPage';
import type { EventDetailData } from '../../config/eventDetailTypes';
import { groupTimelineByDay } from '../../lib/scheduleUtils';

const BE_ICGI_API_URL = import.meta.env.VITE_BE_ICGI_API_URL as string | undefined;

function mapEventApiToDetailData(sections: any[], slug: string): EventDetailData {
  const s = (key: string) => sections.find(x => x.key === key)?.isi;
  const identitas = s('identitas') ?? {};
  const pc = s('portal_content') ?? {};

  return {
    slug,
    email: pc.email ?? '',
    website: pc.website ?? identitas.situs ?? '',
    venue: pc.venue ?? '',
    guidebookUrl: s('guidebook')?.url ?? undefined,
    organizers: (identitas.mitra ?? []).map((m: any) => ({ name: m.nama, logo: m.logo ?? '' })),

    labels: {
      eventBadge:     pc.labels?.event_badge ?? identitas.akronim ?? '',
      heroBadge:      pc.labels?.hero_badge ?? identitas.nama ?? '',
      categoriesDesc: pc.labels?.categories_desc ?? '',
      scheduleDesc:   pc.labels?.schedule_desc ?? '',
    },

    stats: [],
    regSteps: pc.reg_steps ?? [],

    about: {
      welcome:    identitas.visi ?? '',
      background: identitas.latar ?? '',
      objectives: (identitas.tujuan ?? '').split('|').map((x: string) => x.trim()).filter(Boolean),
    },

    divisions: pc.divisions ?? [],

    categories: (identitas.kategori ?? []).map((k: any, i: number) => ({
      letter: String.fromCharCode(65 + i),
      title: k.nama,
      description: k.keterangan,
      icon: 'Cpu',
    })),

    judgingCriteria: pc.judging_criteria ?? [],

    awards: (s('awards') ?? []).map((a: any) => ({
      place: a.nama, medal: '', extra: a.manfaat,
    })),

    schedule: groupTimelineByDay(s('timeline') ?? []),
  };
}
// ── Komponen halaman — dipakai lewat route /events/:slug untuk event
//    yang eventRegistry-nya punya `dashboardAcronym` diisi. ────────
interface Props {
  slug: string;
  acronym: string;
}

const DashboardEventDetailPage = ({ slug, acronym }: Props) => {
  const navigate = useNavigate();
  const [data, setData] = useState<EventDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (!BE_ICGI_API_URL) throw new Error("VITE_BE_ICGI_API_URL belum di-set.");
        const res = await fetch(
          `${BE_ICGI_API_URL}/api/public/v1/${acronym}`,
          { cache: 'no-store' },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.status === 'error') throw new Error(json.message ?? 'Gagal memuat event.');
        const sections: any[] = json?.data?.sections ?? [];
        if (!cancelled) setData(mapEventApiToDetailData(sections, slug));
      } catch (err) {
        console.error('[DashboardEventDetailPage] gagal memuat:', err);
        if (!cancelled) setError('Gagal memuat detail event. Coba lagi nanti.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [acronym, slug]);

  if (loading) {
    return (
      <SiteShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Memuat event…</p>
        </div>
      </SiteShell>
    );
  }

  if (error || !data) {
    return (
      <SiteShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-6xl">🎭</p>
          <h1 className="text-2xl font-bold">Event tidak ditemukan</h1>
          <p className="text-muted-foreground text-sm max-w-xs">{error}</p>
          <button
            className="text-primary underline text-sm"
            onClick={() => navigate('/events')}
          >
            ← Kembali ke Events
          </button>
        </div>
      </SiteShell>
    );
  }

  return <EventDetailPage slug={slug} data={data} />;
};

export default DashboardEventDetailPage;