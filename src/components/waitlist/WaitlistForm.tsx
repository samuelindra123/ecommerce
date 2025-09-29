"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Share2 } from "lucide-react";

interface WaitlistFormProps {
  onJoined?: (email:string)=>void;
}

const generateReferralCode = () => Math.random().toString(36).slice(2,10);

export function WaitlistForm({ onJoined }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats] = useState(()=>({ position: Math.floor(Math.random()*900)+100, invited: 0 })); // placeholder

  const referralUrl = typeof window !== 'undefined' && refCode ? `${window.location.origin}/daftar-awal?r=${refCode}` : "";

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoining(true);
    // simulate api
    await new Promise(r=>setTimeout(r, 900));
    const code = generateReferralCode();
    setRefCode(code);
    setJoined(true);
    setJoining(false);
    onJoined?.(email);
  };

  const copy = async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(()=>setCopied(false), 1800);
  };

  return (
    <section id="cta" className="py-16 md:py-24 relative" aria-labelledby="cta-title">
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_70%)]" />
        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
      </div>
      <div className="mx-auto max-w-3xl px-6">
        <AnimatePresence mode="wait">
          {!joined && (
            <motion.div
              key="form"
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-20}}
              transition={{duration:.4}}
              className="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur border border-[var(--color-border)]/70 dark:border-slate-700/70 p-8 shadow-lg shadow-cyan-500/10 relative overflow-hidden"
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent [background:linear-gradient(140deg,rgba(56,189,248,0.35),rgba(168,85,247,0.35),rgba(34,211,238,0.3))] opacity-0 mix-blend-overlay animate-pulse [animation-duration:5s]" />
              <h2 id="cta-title" className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-slate-800 dark:text-slate-100">Masuk dalam Daftar Tunggu</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Dapatkan akses eksklusif lebih awal ketika platform ini siap. Kami akan mengundang tahap demi tahap.</p>
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-medium tracking-wide text-[var(--color-muted)] uppercase">Alamat Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="nama@contoh.com"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-border)] dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/60"
                  />
                </div>
                <button disabled={joining} type="submit" className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-indigo-500 hover:brightness-110 disabled:opacity-60 text-white px-6 py-3 text-sm font-semibold shadow shadow-cyan-500/30 transition ring-1 ring-cyan-300/40">
                  {joining ? 'Mendaftarkan...' : 'Saya Mau Bergabung!'}
                </button>
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-500">Dengan bergabung Anda setuju menerima email pembaruan tentang peluncuran platform. Kami tidak akan mengirim spam.</p>
              </form>
            </motion.div>
          )}
          {joined && (
            <motion.div
              key="thanks"
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-20}}
              transition={{duration:.4}}
              className="rounded-2xl bg-white/85 dark:bg-slate-900/70 backdrop-blur border border-[var(--color-border)]/70 dark:border-slate-700/70 p-8 shadow-lg shadow-fuchsia-500/10 relative overflow-hidden"
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent [background:linear-gradient(160deg,rgba(168,85,247,0.35),rgba(56,189,248,0.35),rgba(34,211,238,0.3))] opacity-0 md:opacity-70 mix-blend-overlay" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">Terima Kasih! 🎉</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Anda sudah masuk dalam daftar tunggu. Ajak teman untuk mendapatkan akses lebih cepat.</p>
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <div className="rounded-xl bg-gradient-to-br from-cyan-500/15 via-fuchsia-500/15 to-indigo-500/15 p-4 flex flex-col items-center ring-1 ring-cyan-300/30">
                  <span className="text-[10px] font-medium tracking-wide text-[var(--color-muted)] mb-1">POSISI</span>
                  <span className="text-lg font-bold">#{stats.position}</span>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-cyan-500/15 via-fuchsia-500/15 to-indigo-500/15 p-4 flex flex-col items-center ring-1 ring-fuchsia-300/30">
                  <span className="text-[10px] font-medium tracking-wide text-[var(--color-muted)] mb-1">TEMAN DIAJAK</span>
                  <span className="text-lg font-bold">{stats.invited}</span>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-cyan-500/15 via-fuchsia-500/15 to-indigo-500/15 p-4 flex flex-col items-center text-center ring-1 ring-indigo-300/30">
                  <span className="text-[10px] font-medium tracking-wide text-[var(--color-muted)] mb-1">STATUS</span>
                  <span className="text-xs font-semibold text-[var(--color-primary)]">AKTIF</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-medium tracking-wide text-[var(--color-muted)] uppercase">Link Referral Anda</label>
                  <div className="flex items-stretch gap-2">
                    <input readOnly value={referralUrl} className="flex-1 rounded-lg border border-[var(--color-border)] dark:border-slate-600 bg-white/60 dark:bg-slate-800/70 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
                    <button onClick={copy} type="button" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white hover:brightness-110 px-3 shadow shadow-cyan-500/30">
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent('Bergabung dengan saya di Veritas: '+referralUrl)}`,'_blank')} className="text-[10px] font-medium px-3 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:brightness-110 shadow shadow-emerald-500/30">WhatsApp</button>
                  <button onClick={()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`,'_blank')} className="text-[10px] font-medium px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110 shadow shadow-blue-600/30">Facebook</button>
                  <button onClick={()=>copy()} className="text-[10px] font-medium px-3 py-2 rounded-lg bg-slate-200/70 dark:bg-slate-700/80 text-slate-800 dark:text-slate-100 hover:brightness-110 inline-flex items-center gap-1 ring-1 ring-cyan-300/30"><Share2 className="size-3" /> Salin Link</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default WaitlistForm;
