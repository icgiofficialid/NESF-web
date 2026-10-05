interface TimelineRow {
  milestone: string;
  tanggal: string; // YYYY-MM-DD
  jalur: string;
  lokasi: string;
}

export function groupTimelineByDay(rows: TimelineRow[]): Array<{
  day: number;
  title: string;
  items: string[];
}> {
  const byDate = new Map<string, TimelineRow[]>();
  for (const r of rows) {
    const key = r.tanggal || 'TBA';
    if (!byDate.has(key)) byDate.set(key, []);
    byDate.get(key)!.push(r);
  }

  return [...byDate.keys()].sort().map((date, i) => {
    const items = byDate.get(date)!;
    const lines = items.map(r => r.lokasi ? `${r.milestone} (${r.lokasi})` : r.milestone);
    const title = date === 'TBA'
      ? 'TBA'
      : new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return { day: i + 1, title, items: lines };
  });
}