import { Metadata } from 'next';
import { SiteHeader } from '../../components/SiteHeader';
import { Footer } from '../../components/Footer';
import { RoadmapTimeline } from '../../components/roadmap/RoadmapTimeline';

export const metadata: Metadata = {
  title: 'Roadmap • Veritas',
  description: 'Rencana fitur yang sedang dan akan kami bangun untuk platform komunitas rohani Veritas.'
};

export default function RoadmapPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[var(--color-primary-soft)] via-white to-[var(--color-accent-soft)] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 bg-grid-mask bg-noise">
      <SiteHeader />
      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-blue-600 to-[var(--color-accent)]">Roadmap Veritas</h1>
            <p className="text-sm md:text-base text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
              Transparansi perkembangan: fitur yang sedang dibangun, berikutnya, dan jangka menengah. Masukan Anda membantu kami memprioritaskan apa yang paling berdampak bagi pertumbuhan iman komunitas.
            </p>
          </div>
          <RoadmapTimeline />
          <div className="mt-16 text-center text-[11px] tracking-wide text-slate-500 dark:text-slate-400">
            Ingin mengusulkan ide? <a href="#" className="text-[var(--color-primary)] font-semibold hover:underline">Kirim masukan</a>.
          </div>
        </div>
      </main>

    </div>
  );
}
