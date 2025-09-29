"use client";
import { motion } from "framer-motion";
import { HandHeart, Users, BookOpen, Sparkles } from "lucide-react";

const FEATURES = [
  {
  icon: HandHeart,
    title: "Dinding Doa Interaktif",
    desc: "Tempat khusus untuk membagikan permohonan doa dan saling mendoakan sebagai satu tubuh Kristus."
  },
  {
    icon: BookOpen,
    title: "Grup Pendalaman Alkitab",
    desc: "Bertumbuh bersama dalam firman melalui grup-grup diskusi yang terfokus dan dipandu."
  },
  {
    icon: Sparkles,
    title: "Berbagi Kesaksian & Renungan",
    desc: "Bagikan karya Tuhan dan kuatkan iman sesama melalui tulisan atau video singkat."
  },
  {
    icon: Users,
    title: "Profil Berpusat pada Iman",
    desc: "Bukan hanya tentang siapa Anda, tapi perjalanan iman Anda bersama Kristus."
  }
];

export function FeatureTeasers() {
  return (
    <section className="py-12 md:py-20 border-t border-[var(--color-border)]/60 dark:border-slate-700/60" aria-labelledby="teaser-title">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="teaser-title" className="text-center text-sm font-semibold tracking-wider text-[var(--color-muted)] mb-10">APA YANG AKAN HADIR</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f,i)=>{
            const Icon = f.icon; // lucide icon component
            return (
              <motion.div key={f.title} className="group relative rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-[var(--color-border)]/70 dark:border-slate-700/70 p-5 flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true, margin:"-40px"}} transition={{delay:i*.05}}>
                <div className="size-11 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 via-fuchsia-400/20 to-indigo-500/20 text-[var(--color-primary)] mb-4 shadow-inner ring-1 ring-cyan-400/40 dark:ring-cyan-300/30 group-hover:ring-fuchsia-400/50 transition relative overflow-hidden">
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-60 transition bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_70%)]" />
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 text-sm tracking-tight">{f.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 flex-1">{f.desc}</p>
                <span className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500 [background:linear-gradient(140deg,rgba(56,189,248,0.5),rgba(168,85,247,0.5),rgba(34,211,238,0.4))] blur-sm" />
                <span className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-cyan-300/50 group-hover:shadow-[0_0_15px_-2px_rgba(56,189,248,0.5)] transition" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureTeasers;
