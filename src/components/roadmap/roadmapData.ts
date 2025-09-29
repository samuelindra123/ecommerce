export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  quarter: string; // e.g. Q1 2025
  status: 'now' | 'next' | 'later' | 'done';
  category?: string;
};

export const roadmapItems: RoadmapItem[] = [
  {
    id: 'scripture-reflection',
    title: 'Modul Renungan & Bacaan Harian',
    description: 'Kurasi bacaan dan renungan terstruktur dengan progres harian.',
    quarter: 'Q4 2025',
    status: 'now',
    category: 'Spiritualitas'
  },
  {
    id: 'prayer-circle',
    title: 'Ruang Doa Langsung',
    description: 'Bergabung dalam ruang doa waktu nyata dengan fokus tematik.',
    quarter: 'Q4 2025',
    status: 'now',
    category: 'Komunitas'
  },
  {
    id: 'service-tracker',
    title: 'Pelayanan & Aksi Nyata',
    description: 'Koordinasi kegiatan pelayanan & catat keterlibatan jemaat.',
    quarter: 'Q1 2026',
    status: 'next',
    category: 'Misi'
  },
  {
    id: 'ai-discipleship',
    title: 'Asisten Pendamping Pertumbuhan (AI)',
    description: 'Rekomendasi konten rohani yang personal & kontekstual.',
    quarter: 'Q2 2026',
    status: 'later',
    category: 'Inteligensi'
  },
  {
    id: 'multi-church',
    title: 'Multi-Komunitas / Multi-Gereja',
    description: 'Struktur organisasi bertingkat untuk jaringan pelayanan.',
    quarter: 'Q2 2026',
    status: 'later',
    category: 'Skalabilitas'
  },
];
