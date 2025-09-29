import { Users, Heart, Star, Globe2, BookOpen, Share2, Layers3, MessageSquare, Sparkle, ShieldCheck, BellRing, Target, Flame, Brain, Radio, Mic, Video, Wand2, BadgeCheck } from "lucide-react";
import type { ReactNode } from 'react';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  category: string;
  highlight?: boolean;
  comingSoon?: boolean;
  stage?: "launch" | "beta"; // tahap perencanaan peluncuran
}

export const featureItems: FeatureItem[] = [
  {
    id: "komunitas",
    title: "Komunitas Rohani",
    description: "Forum & lingkar sharing Alkitab terfokus dengan moderasi sehat.",
    icon: <Users className="size-6" />, category: "Inti", highlight: true
  },
  {
    id: "doa",
    title: "Ruang Doa Live",
    description: "Mode fokus doa realtime + hitung mundur dan reaksi amin.",
    icon: <Heart className="size-6" />, category: "Inti", highlight: true
  },
  {
    id: "renungan",
    title: "Renungan Kurasi",
    description: "Refleksi harian personalisasi berdasarkan preferensi bacaan.",
    icon: <BookOpen className="size-6" />, category: "Konten", highlight: true
  },
  {
    id: "misi",
    title: "Aksi & Misi",
    description: "Kolaborasi proyek pelayanan lokal & global dengan progress.",
    icon: <Globe2 className="size-6" />, category: "Gerakan"
  },
  {
    id: "tantangan",
    title: "Tantangan Kasih",
    description: "Weekly challenge menghidupi firman bersama komunitas.",
    icon: <Target className="size-6" />, category: "Engagement"
  },
  {
    id: "diskusi",
    title: "Diskusi Moderasi",
    description: "Thread mendalam dengan ringkasan AI yang netral & ringkas.",
    icon: <MessageSquare className="size-6" />, category: "Konten"
  },
  {
    id: "share",
    title: "Share Ayat Kreatif",
    description: "Generator kartu ayat estetis siap bagikan ke sosial media.",
    icon: <Share2 className="size-6" />, category: "Kreatif"
  },
  {
    id: "layer",
    title: "Lapis Pembelajaran",
    description: "Catatan pribadi berlapis: insight, aplikasi, doa.",
    icon: <Layers3 className="size-6" />, category: "Belajar"
  },
  {
    id: "notifikasi",
    title: "Notifikasi Pintar",
    description: "Pengingat doa & renungan adaptif ritme harianmu.",
    icon: <BellRing className="size-6" />, category: "Utility"
  },
  {
    id: "keamanan",
    title: "Keamanan & Etika",
    description: "Moderasi ganda + trust layer anti misinformasi.",
    icon: <ShieldCheck className="size-6" />, category: "Keamanan"
  },
  {
    id: "spark",
    title: "Inspirasi Cepat",
    description: "Snippet ayat & doa singkat saat butuh penguatan.",
    icon: <Sparkle className="size-6" />, category: "Engagement", comingSoon: true
  },
  {
    id: "badge",
    title: "Lencana Pelayanan",
    description: "Gamifikasi sehat apresiasi kontribusi rohani, bukan ego.",
    icon: <Star className="size-6" />, category: "Engagement", comingSoon: true
  },
  // --- Launch Wave Features ---
  {
    id: "smart-feed",
    title: "Smart Feed Rohani",
    description: "Aliran konten renungan & doa terkurasi adaptif tanpa kecanduan scroll.",
    icon: <Wand2 className="size-6" />, category: "Inti", comingSoon: true, stage: "launch"
  },
  {
    id: "live-stream",
    title: "Live Stream Ibadah",
    description: "Ruang siaran ibadah & sharing kesaksian dengan chat amin terfokus.",
    icon: <Radio className="size-6" />, category: "Gerakan", comingSoon: true, stage: "launch"
  },
  {
    id: "voice-prayer",
    title: "Ruang Doa Suara",
    description: "Channel audio doa spontan / terjadwal yang hangat & moderasi ringan.",
    icon: <Mic className="size-6" />, category: "Engagement", comingSoon: true, stage: "launch"
  },
  {
    id: "mentoring",
    title: "Mentoring Terarah",
    description: "Pencocokan mentor rohani berdasarkan fokus pertumbuhan & ritme.",
    icon: <Users className="size-6" />, category: "Belajar", comingSoon: true, stage: "launch"
  },
  {
    id: "verse-ai",
    title: "Verse Insight AI",
    description: "Ringkasan konteks ayat & refleksi aman teologis (human-reviewed).",
    icon: <Brain className="size-6" />, category: "Konten", comingSoon: true, stage: "launch"
  },
  {
    id: "event-rooms",
    title: "Event Rooms",
    description: "Sesi fokus: hafalan, apologetika, doa misi, semua terjadwal.",
    icon: <Video className="size-6" />, category: "Gerakan", comingSoon: true, stage: "launch"
  },
  {
    id: "daily-streak",
    title: "Daily Streak Lembut",
    description: "Penguatan konsistensi renungan tanpa tekanan atau rasa bersalah.",
    icon: <Flame className="size-6" />, category: "Utility", comingSoon: true, stage: "launch"
  },
  {
    id: "trust-layer",
    title: "Trust & Credibility",
    description: "Badge kontribusi bermakna & verifikasi sumber untuk cegah misinfo.",
    icon: <BadgeCheck className="size-6" />, category: "Keamanan", comingSoon: true, stage: "launch"
  }
];

export const featureCategories = Array.from(new Set(featureItems.map(f => f.category)));
