"use client";
import { featureItems } from "./featureData";
import { motion } from "framer-motion";

export function UpcomingFeatures() {
  const upcoming = featureItems.filter(f => f.comingSoon);
  if (!upcoming.length) return null;
  return (
    <section className="mt-20 md:mt-28" aria-labelledby="upcoming-heading">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <h2 id="upcoming-heading" className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-blue-600 to-[var(--color-accent)]">Gelombang Fitur Akan Hadir</h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">Rangkaian kemampuan sosial & pertumbuhan mendalam yang sedang kami siapkan untuk peluncuran publik. Dibangun bertahap dengan pendekatan sehat & berfokus pada kedewasaan rohani, bukan sekadar engagement dangkal.</p>
        </div>
        <div className="flex gap-3 flex-wrap text-[10px] uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[var(--color-border)] bg-white/70 dark:bg-slate-800/60 backdrop-blur">Launch = Gelombang Awal</span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[var(--color-border)] bg-white/70 dark:bg-slate-800/60 backdrop-blur">Soon = Sedang Disiapkan</span>
        </div>
      </div>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {upcoming.map((f,i) => (
          <motion.div
            key={f.id}
            initial={{opacity:0, y:28, scale:.96}}
            whileInView={{opacity:1, y:0, scale:1}}
            viewport={{once:true, margin:"-80px"}}
            transition={{duration:.55, delay:i*0.05}}
            className="group relative rounded-2xl border border-[var(--color-border)]/80 dark:border-slate-700/60 bg-gradient-to-br from-white/85 to-white/60 dark:from-slate-900/70 dark:to-slate-800/50 backdrop-blur-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-[var(--color-primary)]/50 transition overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_70%)]" />
            <div className="flex items-start justify-between gap-3">
              <div className="size-12 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md">
                {f.icon}
              </div>
              <div className="flex flex-col items-end gap-1">
                {f.stage && <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-blue-600 text-white shadow">{f.stage === 'launch' ? 'Launch' : f.stage}</span>}
                {f.comingSoon && <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">Soon</span>}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold tracking-tight text-slate-800 dark:text-slate-100 text-base">
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {f.description}
              </p>
            </div>
            <div className="mt-auto pt-2">
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)]/70 to-transparent dark:via-slate-600/60" />
              <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <span>Kesiapan: {f.stage === 'launch' ? 'Gelombang Awal' : 'Pra-Launch'}</span>
                <span className="font-medium text-[var(--color-primary)]">Dipantau</span>
              </div>
            </div>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] via-blue-500 to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
