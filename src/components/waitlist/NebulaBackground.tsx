"use client";
import { useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
  Decorative animated nebula + neon line background for the waitlist page.
  Purely presentational. Layer behind content (z-0) while content sits above (relative z-10 etc).
*/
export function NebulaBackground() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lowPower = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    // Heuristic: very low HW concurrency or memory < 4GB (if API exists)
    // @ts-expect-error deviceMemory is experimental in some browsers
    const deviceMemory = navigator.deviceMemory || 8;
    return (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || deviceMemory <= 4;
  }, []);

  // Parallax via CSS custom properties so React does not re-render each pointer move
  useEffect(() => {
    if (prefersReducedMotion) return; // skip
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    let targetX = 0, targetY = 0; // normalized -0.5..0.5
    let currentX = 0, currentY = 0;
    const spring = 0.08;
    const pointerMove = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
      if (!raf) loop();
    };
    const loop = () => {
      currentX += (targetX - currentX) * spring;
      currentY += (targetY - currentY) * spring;
      el.style.setProperty('--px', currentX.toString());
      el.style.setProperty('--py', currentY.toString());
      if (Math.abs(targetX-currentX) > 0.001 || Math.abs(targetY-currentY) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0; // stop
      }
    };
    window.addEventListener('pointermove', pointerMove, { passive: true });
    return () => { window.removeEventListener('pointermove', pointerMove); if (raf) cancelAnimationFrame(raf); };
  }, [prefersReducedMotion]);

  // Generate stars only once (no framer-motion per star if lowPower)
  const stars = useMemo(() => {
    const count = lowPower ? 25 : 45; // trimmed from 60
    const colors = ["#67e8f9", "#38bdf8", "#818cf8", "#a855f7", "#22d3ee"];
    return Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.6,
      delay: Math.random() * 6,
      dur: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random()*colors.length)]
    }));
  }, [lowPower]);

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#020617] dark:bg-[#020617] [--px:0] [--py:0]">
      {/* Base subtle gradient wash & vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(30,58,138,0.35),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0)_0%,rgba(2,6,23,0.65)_80%,#020617_100%)]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />

      {/* LARGE GLOW BLOBS (layered with parallax) */}
      <div className="absolute -top-64 -left-40 w-[55rem] h-[55rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.55),rgba(56,189,248,0)_70%)] blur-[140px] will-change-transform"
           style={{ transform: prefersReducedMotion ? undefined : 'translate3d(calc(var(--px)*60px), calc(var(--py)*60px),0)' }} />
      <div className="absolute top-1/3 -right-60 w-[60rem] h-[60rem] rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(168,85,247,0.55),rgba(168,85,247,0)_65%)] blur-[150px] opacity-90 will-change-transform"
           style={{ transform: prefersReducedMotion ? undefined : 'translate3d(calc(var(--px)*-45px), calc(var(--py)*-45px),0)' }} />
      <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.35),rgba(14,165,233,0)_60%)] blur-[160px] will-change-transform"
           style={{ transform: prefersReducedMotion ? undefined : 'translate3d(calc(var(--px)*25px), calc(var(--py)*25px),0)' }} />

      {/* Rotating faint color swirl */}
      {!prefersReducedMotion && !lowPower && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110rem] h-[110rem] opacity-[0.14] animate-[spin_120s_linear_infinite] will-change-transform"
             style={{ transform: 'translate(-50%, -50%)', maskImage: 'radial-gradient(circle at center, rgba(0,0,0,.9), transparent 70%)' }}>
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(56,189,248,0.18),rgba(168,85,247,0.18),rgba(34,211,238,0.18),rgba(56,189,248,0.18))] blur-3xl" />
        </div>
      )}

      {/* Neon flowing lines (svg) */}
      {!prefersReducedMotion && (
        <motion.svg
          className="absolute inset-x-0 top-24 w-[140%] -left-[20%] h-[550px] opacity-50 mix-blend-screen will-change-transform"
          viewBox="0 0 1600 600"
          fill="none"
          initial={{opacity:0}}
          animate={{opacity:.55}}
          transition={{duration:1.4, delay:.4}}
          style={{ transform: 'translate3d(calc(var(--px)*10px), calc(var(--py)*10px),0)' }}
        >
          <defs>
            <linearGradient id="nebula-line" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="b1" />
              <feGaussianBlur stdDeviation="18" result="b2" />
              <feMerge>
                <feMergeNode in="b1" />
                <feMergeNode in="b2" />
              </feMerge>
            </filter>
          </defs>
          {Array.from({ length: lowPower ? 2 : 3 }).map((_,i)=>{
            const yOffset = 80 + i*110;
            const variance = 45 + i*15;
            return (
              <motion.path
                key={i}
                d={`M0 ${yOffset} C 340 ${yOffset-variance}, 640 ${yOffset+variance}, 940 ${yOffset-variance} S 1280 ${yOffset+variance}, 1600 ${yOffset}`}
                stroke="url(#nebula-line)"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{pathLength:0, opacity:0}}
                animate={{pathLength:1, opacity:1}}
                transition={{duration:4.2 + i*.4, delay:.3 + i*.25, ease:"easeInOut"}}
              />
            );
          })}
        </motion.svg>
      )}

      {/* Star field */}
      <div className="absolute inset-0">
        {stars.map((s,i)=> (
          <span
            key={i}
            className="absolute animate-twinkle will-change-opacity rounded-full"
            style={{
              top: `${s.y}%`,
              left: `${s.x}%`,
              width: s.size,
              height: s.size,
              background: s.color,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
              boxShadow: `0 0 6px 2px ${s.color}55, 0 0 14px 4px ${s.color}25`
            }}
          />
        ))}
      </div>

      {/* Grain / Noise overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:3px_3px]" />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay [background:repeating-linear-gradient(45deg,rgba(255,255,255,0.15)_0px,rgba(255,255,255,0.15)_1px,transparent_1px,transparent_3px)]" />
    </div>
  );
}

export default NebulaBackground;
