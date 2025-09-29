"use client";
import { useMemo, useState } from "react";
import { featureItems, featureCategories, FeatureItem } from "./featureData";
import { motion } from "framer-motion";

interface FeatureGridProps {
  limit?: number;
  condensed?: boolean;
  showFilter?: boolean;
  includeComingSoon?: boolean; // override to also show comingSoon in grid
}

export function FeatureGrid({ limit, condensed, showFilter, includeComingSoon }: FeatureGridProps) {
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
  let list: FeatureItem[] = featureItems.filter(f => includeComingSoon ? true : !f.comingSoon);
    if (category) list = list.filter(f => f.category === category);
    if (limit) list = list.slice(0, limit);
    return list;
  }, [category, limit, includeComingSoon]);

  return (
    <div className="flex flex-col gap-8">
      {showFilter && (
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${!category ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-[var(--color-border)] hover:bg-[var(--color-primary-soft)]/70'}`}
          >Semua</button>
          {featureCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat === category ? null : cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${category===cat ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-[var(--color-border)] hover:bg-[var(--color-primary-soft)]/70'}`}
            >{cat}</button>
          ))}
        </div>
      )}
      <div className={`grid gap-6 sm:gap-7 ${condensed ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
        {filtered.map((f,i) => (
          <motion.div
            key={f.id}
            initial={{opacity:0, y:24, scale:.97}}
            whileInView={{opacity:1, y:0, scale:1}}
            viewport={{once:true, margin:"-80px"}}
            transition={{duration:.45, delay:i*0.04}}
            className={`relative group rounded-2xl border p-5 flex flex-col gap-4 bg-white/80 dark:bg-slate-800/60 backdrop-blur border-[var(--color-border)] dark:border-slate-700/60 shadow-sm hover:shadow-xl transition overflow-hidden ${f.highlight ? 'ring-1 ring-blue-500/30' : ''}`}
          >
            <div className="size-12 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/90 to-purple-600/90 text-white shadow-md">
              {f.icon}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold tracking-tight text-slate-800 dark:text-slate-100 flex flex-wrap items-center gap-2 text-base">
                {f.title}
                {f.stage && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-[var(--color-primary)]/90 to-blue-600/90 text-white shadow-sm">{f.stage === 'launch' ? 'Launch' : f.stage}</span>}
                {f.comingSoon && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">Soon</span>}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {f.description}
              </p>
            </div>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] via-blue-500 to-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeatureGrid;
