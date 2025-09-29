"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface HeroProps { titleVariant?: 1|2|3 }

const TITLES: Record<number,string> = {
  1: "Sebuah Rumah Digital Baru untuk Komunitas Kristen Akan Segera Hadir.",
  2: "Membangun Persekutuan Online Sejati. Jadilah Bagian dari Awal Perjalanan Ini.",
  3: "Jadilah yang Pertama Bergabung dengan Platform Media Sosial Kristen Generasi Baru — Fokus pada Doa, Firman, Komunitas & Misi." 
};

export function WaitlistHero({ titleVariant = 1 }: HeroProps) {
  const fullText = TITLES[titleVariant];
  const enableType = titleVariant === 3; // only apply effect for variant 3 per request
  const [display, setDisplay] = useState(enableType ? "" : fullText);
  const [phase, setPhase] = useState<'typing'|'pausing'|'deleting'>(enableType ? 'typing' : 'pausing');
  const indexRef = useRef(0);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(()=>{
    if (!enableType) return;
    const typeSpeed = 40; // ms per char
    const deleteSpeed = 28; // ms per char when deleting
  // User request: pause ~5 detik setelah selesai mengetik penuh sebelum mulai menghapus
  const pauseAfterFull = 5000; // ms setelah kalimat lengkap sebelum mulai hapus
  const pauseAfterDelete = 600; // jeda singkat sebelum mulai mengetik lagi

    const step = () => {
      if (phase === 'typing') {
        if (indexRef.current < fullText.length) {
          indexRef.current += 1;
          setDisplay(fullText.slice(0, indexRef.current));
          setTimeout(step, typeSpeed);
        } else {
          setPhase('pausing');
          pauseTimeout.current = setTimeout(()=> setPhase('deleting'), pauseAfterFull);
        }
      } else if (phase === 'deleting') {
        if (indexRef.current > 0) {
          indexRef.current -= 1;
          setDisplay(fullText.slice(0, indexRef.current));
          setTimeout(step, deleteSpeed);
        } else {
          setPhase('pausing');
          pauseTimeout.current = setTimeout(()=> setPhase('typing'), pauseAfterDelete);
        }
      } else if (phase === 'pausing') {
        // do nothing, timers handle transition
      }
    };
    step();
    return () => { if (pauseTimeout.current) clearTimeout(pauseTimeout.current); };
  }, [enableType, fullText, phase]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28" aria-labelledby="waitlist-hero-title">
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-[var(--color-primary-soft)]/60 via-transparent to-transparent opacity-70" />
      {/* accent neon lines */}
      <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 w-[1100px] h-40 opacity-60" initial={{opacity:0}} animate={{opacity:.6}} transition={{duration:1.2, delay:.4}}>
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent blur-sm" />
          <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent" />
        </div>
      </motion.div>
      <div className="mx-auto max-w-3xl px-6 text-center space-y-6 relative">
        <motion.h1
          id="waitlist-hero-title"
          className="relative text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]"
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{duration:.6, ease:"easeOut"}}
        >
          {display}
          {enableType && <span className="ml-0.5 inline-block w-[2px] md:w-[3px] bg-[var(--color-primary)] animate-pulse translate-y-[3px] h-[1.15em] align-middle" aria-hidden />}
          <span className="sr-only">{fullText}</span>
        </motion.h1>
        <motion.p
          className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300 mx-auto max-w-2xl"
          initial={{opacity:0, y:16}}
          animate={{opacity:1, y:0}}
          transition={{delay:.15, duration:.5}}
  >Di tengah dunia digital yang bising, kami rindu menciptakan sebuah ruang yang aman, positif, dan membangun iman. Sebuah tempat di mana setiap koneksi berarti, setiap doa didukung, dan setiap kesaksian dapat menjadi berkat. Kami sedang membangun <strong>Veritas</strong>, dan kami ingin Anda menjadi bagian dari fondasinya.</motion.p>
      </div>
    </section>
  );
}

export default WaitlistHero;
