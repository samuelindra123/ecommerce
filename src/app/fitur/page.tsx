"use client";
import { ThemeProvider } from "../../components/ThemeProvider";
import { SiteHeader } from "../../components/SiteHeader";
import { FeatureGrid } from "../../components/feature/FeatureGrid";
import { UpcomingFeatures } from "../../components/feature/UpcomingFeatures";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FiturPage() {
  return (
    <ThemeProvider>
      <div className="relative flex-1 bg-gradient-to-b from-[var(--color-primary-soft)] via-white to-[var(--color-accent-soft)] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
        <SiteHeader />
        <HeroFitur />
        <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <ComingSoonNotice />
          <section className="mt-8 md:mt-12 py-10 md:py-14 border-t border-[var(--color-border)]/80 dark:border-slate-700/60">
            <FeatureGrid showFilter />
            <UpcomingFeatures />
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

function HeroFitur() {
  return (
    <header className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-16 md:pb-20 text-center flex flex-col items-center">
      <motion.span initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 dark:bg-slate-800/60 backdrop-blur px-4 py-1 text-xs font-medium text-[var(--color-primary)] shadow-sm">
        Fitur Platform
      </motion.span>
      <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.65,delay:.05}} className="mt-8 font-bold tracking-tight text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-blue-600 to-[var(--color-accent)]">
        Dirancang Untuk Pertumbuhan Sejati
      </motion.h1>
      <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.55,delay:.15}} className="mt-6 max-w-2xl text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
        Semua modul saling terhubung: renungan memicu diskusi, diskusi menggerakkan doa, doa melahirkan aksi. Integrasi lembut tanpa memaksa alurmu.
      </motion.p>
    </header>
  );
}

function ComingSoonNotice() {
  return (
    <motion.div
      initial={{opacity:0, y:20}}
      animate={{opacity:1, y:0}}
      transition={{duration:.6, delay:.1}}
      className="relative mt-4 md:mt-6 rounded-2xl overflow-hidden border border-[var(--color-border)]/80 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 backdrop-blur shadow-sm"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 w-80 h-80 bg-gradient-radial from-[var(--color-primary)]/20 to-transparent blur-2xl" />
        <div className="absolute -bottom-40 -left-10 w-[26rem] h-[26rem] bg-gradient-radial from-[var(--color-accent)]/15 to-transparent blur-3xl" />
      </div>
      <div className="relative z-10 px-6 md:px-10 py-8 md:py-10 flex flex-col gap-6 md:gap-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full border border-[var(--color-border)]/80 bg-white/70 dark:bg-slate-800/70 text-[var(--color-primary)]">
              Tahap Pra-Peluncuran
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Akses Sosial Penuh Datang Saat Public Launch
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Saat ini kamu berada di versi landing & eksplorasi fitur. Interaksi sosial real-time (posting terbuka, feed dinamis, grup publik) akan dibuka bertahap setelah peluncuran publik. Bergabung daftar awal untuk prioritas akses dan undangan sesi komunitas pertama.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[220px]">
            <Link href="/daftar-awal" className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold px-6 py-3 shadow-md shadow-blue-500/30 hover:brightness-110 transition">
              Daftar Akses Awal
            </Link>
            <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 backdrop-blur text-xs font-semibold px-6 py-3 text-slate-700 dark:text-slate-200 hover:border-[var(--color-primary)]/60 hover:text-[var(--color-primary)] transition">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[{
            label: 'Modul Aktif', value: '12'
          }, {
            label: 'Coming Soon', value: '5+'
          }, {
            label: 'Waiting List', value: '1.2K'
          }, {
            label: 'Target Beta', value: 'Q4 2025'
          }].map(stat => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)]/70 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/50 backdrop-blur p-4 text-center">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-tight">{stat.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
