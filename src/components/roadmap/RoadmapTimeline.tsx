"use client";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { roadmapItems, RoadmapItem } from './roadmapData';

const statusLabels: Record<RoadmapItem['status'], string> = {
  now: 'Sekarang',
  next: 'Berikutnya',
  later: 'Nantinya',
  done: 'Selesai'
};

const statusOrder: RoadmapItem['status'][] = ['now','next','later','done'];

export function RoadmapTimeline() {
  const [active, setActive] = useState<RoadmapItem['status'] | 'all'>('now');

  const filtered = useMemo(() => {
    if (active === 'all') return roadmapItems;
    return roadmapItems.filter(i => i.status === active);
  }, [active]);

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 mb-8">
        {(['now','next','later','done','all'] as const).map(s => (
          <button
            key={s}
            onClick={() => setActive(s as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition backdrop-blur
              ${active === s ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-[var(--color-border)] dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-[var(--color-primary-soft)]/60'}
            `}
          >
            {s === 'all' ? 'Semua' : statusLabels[s as RoadmapItem['status']]}
          </button>
        ))}
      </div>
      <ol className="relative border-l border-dashed border-[var(--color-border)] dark:border-slate-600 pl-6 space-y-10">
        <AnimatePresence initial={false}>
          {filtered
            .sort((a,b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
            .map(item => (
            <motion.li
              key={item.id}
              layout
              initial={{opacity:0, x:-12}}
              animate={{opacity:1, x:0}}
              exit={{opacity:0, x:-12}}
              transition={{duration:.25}}
              className="group relative"
            >
              <span className={`absolute -left-[34px] top-1.5 size-4 rounded-full ring-4 ring-white dark:ring-slate-900 shadow
                ${item.status === 'now' ? 'bg-[var(--color-primary)]' : item.status === 'next' ? 'bg-blue-500' : item.status === 'later' ? 'bg-amber-500' : 'bg-emerald-500'}
              `} />
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 tracking-tight">{item.title}</h3>
                  <span className="text-[10px] uppercase font-semibold tracking-wide px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-[var(--color-border)] dark:border-slate-700">{item.quarter}</span>
                  {item.category && (
                    <span className="text-[10px] uppercase font-semibold tracking-wide px-2 py-0.5 rounded-full bg-[var(--color-primary-soft)]/60 dark:bg-slate-800 text-[var(--color-primary)] border border-[var(--color-primary)]/30">{item.category}</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </div>
  );
}
