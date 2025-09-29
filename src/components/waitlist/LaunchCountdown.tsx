"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// 26 Okt 2025 12:00 WIB => 05:00 UTC
const TARGET_DATE_UTC = Date.UTC(2025, 9, 26, 5, 0, 0);

interface TimeLeft { total: number; days: number; hours: number; minutes: number; seconds: number; }
const pad = (n:number) => n.toString().padStart(2,'0');
function compute(nowOverride?:number): TimeLeft {
  const now = nowOverride ?? Date.now();
  const diff = TARGET_DATE_UTC - now;
  const clamped = diff > 0 ? diff : 0;
  return {
    total: diff,
    days: Math.floor(clamped/86400000),
    hours: Math.floor((clamped/3600000)%24),
    minutes: Math.floor((clamped/60000)%60),
    seconds: Math.floor((clamped/1000)%60)
  };
}

export function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(()=>compute());
  const [synced, setSynced] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const offsetRef = useRef(0); // server - client midpoint
  const sectionRef = useRef<HTMLElement|null>(null);
  const analyticsSentRef = useRef(false);

  // Progressive drift correction (initial + every 7 minutes)
  useEffect(()=>{
    let cancelled = false;
    const fetchServer = async ()=>{
      try {
        const t0 = Date.now();
        const res = await fetch('/api/time', { cache:'no-store' });
        const json = await res.json();
        const t1 = Date.now();
        const clientMid = t0 + (t1 - t0)/2;
        const serverNow: number = json.now;
        const newOffset = serverNow - clientMid;
        offsetRef.current = synced ? (offsetRef.current*0.7 + newOffset*0.3) : newOffset;
        if (!cancelled) {
          setSynced(true);
          setTimeLeft(compute(clientMid + offsetRef.current));
        }
      } catch {
        if (!synced) setSynced(false);
      }
    };
    fetchServer();
    const interval = setInterval(fetchServer, 7*60*1000);
    return ()=>{ cancelled = true; clearInterval(interval); };
  }, [synced]);

  // tick each second
  useEffect(()=>{
    const id = setInterval(()=> setTimeLeft(compute(Date.now()+offsetRef.current)), 1000);
    return ()=> clearInterval(id);
  }, []);

  // analytics once visible
  useEffect(()=>{
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if (e.isIntersecting && !analyticsSentRef.current) {
          analyticsSentRef.current = true;
          fetch('/api/analytics/countdown', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ clientTs: Date.now() }) }).catch(()=>{});
        }
      })
    }, { threshold:.4 });
    io.observe(sectionRef.current);
    return ()=> io.disconnect();
  }, []);

  const generateICS = useCallback(()=>{
    const dtStamp = new Date().toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Veritas//Launch//ID\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nUID:launch-20251026@veritas\nDTSTAMP:${dtStamp}\nDTSTART:20251026T050000Z\nDTEND:20251026T060000Z\nSUMMARY:Peluncuran Veritas\nDESCRIPTION:Bergabung dalam peluncuran publik Veritas pada 26 Oktober 2025 pukul 12:00 WIB.\nURL:https://veritas.id/?utm_source=ics&utm_medium=reminder&utm_campaign=launch_2025\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type:'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='veritas-launch.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 4000);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setShowToast(true);
    toastTimeoutRef.current = setTimeout(()=> setShowToast(false), 3200);
  }, []);

  const googleCalUrl = 'https://www.google.com/calendar/render?action=TEMPLATE&text='+
    encodeURIComponent('Peluncuran Veritas')+
    '&dates=20251026T050000Z/20251026T060000Z&details='+
  encodeURIComponent('Bergabung dalam peluncuran publik Veritas pada 26 Oktober 2025 pukul 12:00 WIB.\n\nhttps://veritas.id/?utm_source=google_calendar&utm_medium=reminder&utm_campaign=launch_2025')+
  '&location='+encodeURIComponent('https://veritas.id/?utm_source=google_calendar&utm_medium=reminder&utm_campaign=launch_2025')+
    '&ctz=Asia/Jakarta';

  const launched = timeLeft.total <= 0;

  return (
    <section ref={sectionRef} aria-labelledby="launch-countdown-title" className="relative py-10 md:py-14 -mt-6 md:-mt-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white dark:via-slate-800/30 dark:to-slate-950" />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
        <motion.h2 id="launch-countdown-title" className="text-base font-semibold tracking-wide text-[var(--color-primary)]" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-40px'}} transition={{duration:.5}}>
          {launched ? 'SUDAH TAYANG' : 'MENUJU PELUNCURAN PUBLIK'}
        </motion.h2>
        <motion.div className="flex flex-col items-center gap-6" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-40px'}} transition={{duration:.6, delay:.1}}>
          {!launched && (
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {[
                {label:'HARI', value: timeLeft.days},
                {label:'JAM', value: timeLeft.hours},
                {label:'MENIT', value: timeLeft.minutes},
                {label:'DETIK', value: timeLeft.seconds},
              ].map(b=> (
                <div key={b.label} className="relative group rounded-2xl px-5 py-4 md:px-7 md:py-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur border border-[var(--color-border)]/70 dark:border-slate-700/60 shadow shadow-cyan-500/10" aria-label={`${b.value} ${b.label}`}>
                  <span className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 [background:linear-gradient(140deg,rgba(56,189,248,0.4),rgba(168,85,247,0.4),rgba(34,211,238,0.35))] blur-sm" />
                  <div className="relative flex flex-col items-center">
                    <span className="font-mono text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-indigo-500 drop-shadow-[0_0_8px_rgba(56,189,248,0.35)]">{b.label==='HARI'? b.value : pad(b.value)}</span>
                    <span className="mt-2 text-[10px] md:text-[11px] font-semibold tracking-wider text-[var(--color-muted)]">{b.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {launched && (
            <motion.div initial={{scale:.9, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:'spring', stiffness:160, damping:20}} className="inline-flex items-center gap-3 rounded-2xl px-8 py-6 bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-indigo-500 text-white shadow-lg shadow-fuchsia-500/30 ring-1 ring-cyan-200/40">
              <span className="text-xl md:text-2xl font-bold tracking-tight">Veritas Resmi Diluncurkan ✨</span>
            </motion.div>
          )}
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Tanggal Peluncuran: <span className="font-semibold">26 Oktober 2025 • 12:00 WIB</span>
            {!launched && (
              <span className="ml-2 inline-flex items-center gap-1 text-[10px] md:text-[11px] px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 border border-[var(--color-border)]/60 dark:border-slate-700/60">{synced ? 'Sinkron Waktu Server' : 'Mode Jam Perangkat'}</span>
            )}
          </p>
          {!launched && (
            <div className="flex flex-col items-center gap-3">
              <button type="button" onClick={()=>setShowReminder(r=>!r)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-indigo-500 hover:brightness-110 text-white px-5 py-2.5 text-xs md:text-sm font-semibold shadow shadow-cyan-500/30 ring-1 ring-cyan-300/40">Ingatkan Saya</button>
              {showReminder && (
                <div className="relative">
                  <div className="mt-1 w-72 rounded-xl bg-white/90 dark:bg-slate-900/80 backdrop-blur border border-[var(--color-border)]/70 dark:border-slate-700/70 p-4 text-left shadow-lg shadow-cyan-500/10 space-y-3">
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">Tambahkan pengingat peluncuran ke kalender Anda atau buat draf email untuk diri sendiri.</p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={generateICS} className="text-[11px] font-medium px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:brightness-110 shadow shadow-fuchsia-500/30">Unduh iCal (.ics)</button>
                      <a href={googleCalUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:brightness-110 shadow shadow-amber-500/30">Google Calendar</a>
                      <a href={`mailto:?subject=${encodeURIComponent('Reminder Peluncuran Veritas')}&body=${encodeURIComponent('Tolong ingatkan saya tentang peluncuran Veritas pada 26 Okt 2025 12:00 WIB. Tambahkan juga ke kalender: https://www.google.com/calendar/render?action=TEMPLATE&text=Peluncuran%20Veritas&dates=20251026T050000Z/20251026T060000Z&ctz=Asia/Jakarta&utm_source=email&utm_medium=reminder&utm_campaign=launch_2025')}`} className="text-[11px] font-medium px-3 py-2 rounded-lg bg-slate-200/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-100 hover:brightness-110 ring-1 ring-cyan-300/30">Email Draft</a>
                    </div>
                    <button type="button" onClick={()=>setShowReminder(false)} className="text-[10px] font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">Tutup</button>
                  </div>
                </div>
              )}
            </div>
          )}
          {showToast && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-indigo-600 text-white text-xs shadow-lg shadow-fuchsia-500/30 ring-1 ring-cyan-300/40">File iCal berhasil diunduh.</div>
          )}
          {!launched && (<p aria-live="polite" className="sr-only">Sisa waktu {timeLeft.days} hari {timeLeft.hours} jam {timeLeft.minutes} menit {timeLeft.seconds} detik menuju peluncuran.</p>)}
        </motion.div>
      </div>
    </section>
  );
}

export default LaunchCountdown;
//
