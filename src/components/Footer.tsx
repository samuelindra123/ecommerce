"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto border-t border-[var(--color-border)]/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl overflow-hidden">
      {/* subtle background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-10 w-72 h-72 rounded-full bg-gradient-radial from-[var(--color-primary)]/18 to-transparent blur-2xl" />
        <div className="absolute -bottom-40 left-0 w-[26rem] h-[26rem] rounded-full bg-gradient-radial from-[var(--color-accent)]/14 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(110deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0)_100%)] dark:opacity-[0.3] mix-blend-overlay" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <motion.h2 initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}} className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
              Veritas
            </motion.h2>
            <motion.p initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.55,delay:.05}} className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-md">
              Menghubungkan hati, memperdalam firman, menggerakkan pelayanan. Ruang digital yang menumbuhkan iman secara otentik – bukan sekadar timeline.
            </motion.p>
            <motion.div initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.55,delay:.1}} className="flex gap-3 pt-2">
              {[
                { label: "GitHub", href: "#" },
                { label: "X", href: "#" },
                { label: "Instagram", href: "#" }
              ].map(s => (
                <a key={s.label} href={s.href} className="text-[11px] tracking-wide uppercase font-medium rounded-full border border-[var(--color-border)] dark:border-slate-600 px-3 py-1.5 hover:bg-[var(--color-primary-soft)]/70 hover:text-[var(--color-primary)] transition text-slate-600 dark:text-slate-300">
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-10 md:col-span-2 sm:max-md:order-first">
            <FooterColumn
              title="Platform"
              links={[
                { label: "Beranda", href: "/" },
                { label: "Fitur", href: "/fitur" },
                { label: "Masuk", href: "/login" },
              ]}
              delay={0}
            />
            <FooterColumn
              title="Sumber"
              links={[
                { label: "Roadmap", href: "/roadmap" },
                { label: "Changelog", href: "#" },
                { label: "Dukungan", href: "#" },
              ]}
              delay={0.05}
            />
          </div>
        </div>
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.6,delay:.1}} className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] tracking-wide text-slate-500 dark:text-slate-400">
          <p className="order-2 md:order-1">© {year} Veritas. Dibangun untuk memuliakan Tuhan.</p>
          <div className="flex items-center gap-4 order-1 md:order-2">
            <a href="#" className="hover:text-[var(--color-primary)] transition">Privasi</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition">Ketentuan</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition">Kontak</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, delay }: { title: string; links: { label: string; href: string }[]; delay: number }) {
  return (
    <div className="space-y-4">
      <motion.h3 initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5, delay}} className="text-[13px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </motion.h3>
      <ul className="space-y-2.5">
        {links.map((l,i) => (
          <motion.li key={l.label} initial={{opacity:0,y:6}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.45, delay: delay + 0.04 + i*0.04}}>
            <Link href={l.href} className="text-sm text-slate-600 dark:text-slate-300 hover:text-[var(--color-primary)] transition">
              {l.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
