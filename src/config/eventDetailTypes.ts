// ================================================================
// eventDetailTypes.ts
// Path: src/config/eventDetailTypes.ts
//
// Tipe bersama untuk semua data detail event.
// Import tipe ini di file data event (src/config/events/<slug>.ts)
// dan di EventDetailPage.tsx.
// ================================================================

export interface EventDetailData {
  slug:         string;
  email:        string;
  website:      string;
  venue:        string;
  /** URL ke file guidebook (PDF/Drive). Jika kosong, tombol tidak ditampilkan. */
  guidebookUrl?: string;
  organizers?: { name: string; logo: string }[];

  labels: {
    eventBadge:     string;
    heroBadge:      string;
    categoriesDesc: string;
    scheduleDesc:   string;
  };

  stats: Array<{
    value: string;
    label: string;
  }>;

  regSteps: string[];

  about: {
    welcome:    string;
    background: string;
    objectives: string[];
  };

  divisions: Array<{
    level: string;
    age:   string;
  }>;

  categories: Array<{
    letter:      string;
    title:       string;
    description: string;
    /** Nama ikon dari lucide-react */
    icon:        string;
  }>;

  judgingCriteria: Array<{
    aspect: string;
    weight: string;
  }>;

  awards: Array<{
    place: string;
    medal: string;
    extra: string;
  }>;

  schedule: Array<{
    day:   number;
    title: string;
    items: string[];
  }>;

  scheduleOffline?: Array<{
    day:   number;
    date:  string;
    title: string;
    items: {
      time:        string;
      description: string;
      location:    string;
    }[];
  }>;

  scheduleOnline?: Array<{
    day:   number;
    date:  string;
    title: string;
    items: {
      time:        string;
      description: string;
      location:    string;
    }[];
  }>;
}