"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// BrandMark now uses /logo.png placed in the public/ directory.
// IMPORTANT: Add your actual logo file at public/logo.png (this patch cannot upload binaries).
function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <Image
        src="/logo.png"
        alt="Veritas Logo"
        width={size}
        height={size}
        priority
        className="object-contain"
      />
      <span className="absolute -bottom-1 -right-1 size-3 rounded-full bg-[var(--color-accent)] shadow" />
    </div>
  );
}

interface SiteHeaderProps { variant?: "marketing" | "auth" }

export function SiteHeader({ variant = "marketing" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  // Dark mode toggle removed per request
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = "fixed top-0 inset-x-0 z-30 transition-all duration-300";
  const h = variant === "marketing" ? (scrolled ? "h-16" : "h-24 md:h-28") : "h-16";
  return (
    <header className={`${base} ${h} backdrop-blur border-b border-[var(--color-border)]/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 supports-[backdrop-filter]:bg-white/55 dark:supports-[backdrop-filter]:bg-slate-900/45`}> 
  <div className="mx-auto h-full w-full max-w-7xl px-6 flex items-center justify-between gap-4 relative">
        <Link href="/" className="flex items-center gap-3 group">
          <BrandMark />
          <div className="flex flex-col leading-tight">
            <span className="font-bold tracking-tight text-base md:text-lg text-slate-800 dark:text-slate-100 group-hover:text-[var(--color-primary)] transition">Veritas</span>
            {variant === "marketing" && (
              <span className="text-[10px] uppercase tracking-wide text-[var(--color-muted)] hidden md:inline">Faith • Community • Mission</span>
            )}
          </div>
        </Link>
        {variant === "marketing" && (
          <>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              {[
                { href : "/" , label: "Beranda" },
                { href: "/fitur", label: "Fitur" },
                { href: "/daftar-awal", label: "Daftar Awal" },
                
              ].map(item => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 hover:text-[var(--color-primary)] transition ${active ? "text-[var(--color-primary)]" : ""}`}
                  >
                    {item.label}
                    {active && <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-[var(--color-primary)]" />}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              {/* Dark mode toggle removed */}
              <Link href="/daftar-awal" className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] hover:brightness-110 text-white px-5 py-2.5 text-sm font-semibold shadow shadow-blue-500/25 transition ring-1 ring-blue-500/30">
                Mulai <ArrowRight className="size-4" />
              </Link>
              <button
                onClick={() => setMobileOpen(o=>!o)}
                className="md:hidden inline-flex items-center justify-center size-10 rounded-xl border border-[var(--color-border)] dark:border-slate-600 hover:bg-[var(--color-primary-soft)]/70 dark:hover:bg-slate-800/70 transition"
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </>
        )}
        {variant === "auth" && (
          <div className="flex items-center gap-2">
            {/* Dark mode toggle removed */}
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-primary-soft)]/70 dark:hover:bg-slate-800/70 px-4 py-2 text-xs font-medium">← Kembali</Link>
          </div>
        )}
        <AnimatePresence>
        {mobileOpen && variant === "marketing" && (
          <motion.div 
            initial={{opacity:0, y:-8}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:-8}}
            transition={{duration:0.18, ease:"easeOut"}}
            className="md:hidden absolute top-full inset-x-0 mt-2 px-4 pb-6"
          >
            <motion.div 
              initial={{scale:.98, opacity:0}}
              animate={{scale:1, opacity:1}}
              exit={{scale:.97, opacity:0}}
              transition={{duration:.18}}
              className="rounded-2xl border border-[var(--color-border)] dark:border-slate-700 bg-white/90 dark:bg-slate-900/85 backdrop-blur p-4 shadow-lg space-y-2"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold tracking-wide text-[var(--color-muted)]">NAVIGASI</span>
                {/* Dark mode toggle removed */}
              </div>
              <motion.div layout className="flex flex-col gap-1">
                {[
                  { href: "/fitur", label: "Fitur" },
                  { href: "/daftar-awal", label: "Daftar Awal" },
                  { href: "/login", label: "Masuk" }
                ].map(item => (
                  <motion.div key={item.href} initial={{opacity:0, x:-6}} animate={{opacity:1, x:0}} transition={{duration:.15}}>
                    <Link onClick={()=>setMobileOpen(false)} href={item.href} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--color-primary-soft)]/80 dark:hover:bg-slate-800/80">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <motion.a
                href="/daftar-awal"
                onClick={()=>setMobileOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] hover:brightness-110 text-white px-4 py-2.5 text-sm font-semibold shadow shadow-blue-500/25 transition"
                initial={{opacity:0, y:6}}
                animate={{opacity:1, y:0}}
                transition={{delay:.05}}
              >Mulai Sekarang <ArrowRight className="size-4" /></motion.a>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      {variant === "marketing" && !scrolled && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent" />
      )}
    </header>
  );
}

export default SiteHeader;
