"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeProvider } from "../components/ThemeProvider";
import { SiteHeader } from "../components/SiteHeader";
import { FeatureGrid } from "../components/feature/FeatureGrid";

export default function Home() {
  return (
    <ThemeProvider>
      <MainLanding />
    </ThemeProvider>
  );
}

function MainLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[var(--color-primary-soft)] via-white to-[var(--color-accent-soft)] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 bg-grid-mask bg-noise">
      <SiteHeader />
      <HeroVideoBackground />
      <BackgroundGlow />
      <Hero />
  <Features />
  <Testimony />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 px-6 pt-40 md:pt-48 pb-10 md:pb-20 max-w-6xl mx-auto flex flex-col items-center text-center">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 dark:bg-slate-800/60 backdrop-blur px-4 py-1 text-xs font-medium text-[var(--color-primary)] shadow-sm"
      >
        Platform Komunitas Rohani Modern
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05 }}
        className="mt-8 font-bold tracking-tight text-4xl md:text-6xl leading-[1.05] bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-blue-600 to-[var(--color-accent)]"
      >
        Bertumbuh Bersama<br className="hidden md:block" /> Dalam Iman & Kasih
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.15 }}
        className="mt-6 max-w-2xl text-base md:text-lg text-[var(--color-muted)] leading-relaxed"
      >
        Ruang digital yang hening namun hidup: renungan mendalam, doa bersama, dan aksi pelayanan nyata – terjalin dalam satu alur rohani yang organik.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <a
          href="/daftar-awal"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] hover:brightness-110 text-white px-7 py-3.5 text-sm font-semibold shadow-md shadow-blue-500/30 transition"
        >
          Daftar Awal <ArrowRight className="size-4" />
        </a>
        <a
          href="/fitur"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 backdrop-blur px-7 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-[var(--color-primary)]/60 hover:text-[var(--color-primary)] transition"
        >
          Lihat Fitur
        </a>
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section id="fitur" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-blue-600 to-[var(--color-accent)]">Cuplikan Fitur Utama</h2>
        <p className="mt-3 text-sm md:text-base text-[var(--color-muted)]">Sekilas modul inti yang menggerakkan komunitas. Lebih lengkapnya ada di halaman fitur.</p>
      </div>
      <FeatureGrid limit={8} condensed />
      <div className="mt-12 text-center">
        <a href="/fitur" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline">
          Lihat Semua Fitur <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

function Testimony() {
  return (
    <section className="relative z-10 px-6 py-24 md:py-32 max-w-4xl mx-auto text-center">
      <blockquote className="relative">
  <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] blur-2xl opacity-30" />
        <p className="text-xl md:text-2xl font-medium tracking-tight text-slate-700 dark:text-slate-100 leading-relaxed">
          “Kami melihat generasi yang haus akan kebenaran dan pengharapan. Platform ini menolong kami saling menopang – bukan sekadar scroll, tetapi bertumbuh.”
        </p>
        <footer className="mt-8 flex flex-col items-center gap-2">
          <span className="font-semibold text-slate-800 dark:text-white">Tim Pelayanan Beta</span>
          <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Komunitas Perintis
          </span>
        </footer>
      </blockquote>
    </section>
  );
}



// Footer removed here (now global in layout)

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Central soft radial */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-radial from-[var(--color-primary)]/28 via-transparent to-transparent blur-3xl" />
      {/* Accent warm highlight */}
      <div className="absolute top-1/3 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-radial from-[var(--color-accent)]/25 via-transparent to-transparent blur-3xl" />
      {/* Cool balance */}
      <div className="absolute bottom-[-10%] -right-48 w-[800px] h-[800px] rounded-full bg-gradient-radial from-blue-400/25 via-transparent to-transparent blur-3xl" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.06))] dark:bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.35))]" />
    </div>
  );
}

// Video background for the upper (hero) section.
// Place the file at public/hero.mp4 (and optionally hero-poster.jpg/png for faster first paint).
function HeroVideoBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0">
      <div className="relative aspect-video w-full max-h-[70vh] md:max-h-[80vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay to darken and ensure text contrast */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,15,30,0.78)_0%,rgba(8,15,30,0.55)_45%,rgba(8,15,30,0.28)_65%,rgba(8,15,30,0)_85%)] dark:bg-[linear-gradient(to_bottom,rgba(2,4,10,0.9)_0%,rgba(2,4,10,0.6)_45%,rgba(2,4,10,0.3)_65%,rgba(2,4,10,0)_85%)]" />
        {/* Fade separator */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/70 to-white dark:via-slate-950/40 dark:to-slate-950" />
        {/* Optional wave divider (kept commented)
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg className="block w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 144">
            <path fill="currentColor" className="text-white dark:text-slate-950" d="M0 96l48-10.7C96 75 192 53 288 53.3c96 .3 192 22.3 288 21.4 96-.8 192-24.8 288-26.7 96-2 192 18 288 26.7 96 8.3 192 5.3 240 4l48-1.3V144H0z" />
          </svg>
        </div>*/}
      </div>
    </div>
  );
}
