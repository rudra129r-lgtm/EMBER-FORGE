import { useEffect, useState } from 'react';
import { HUD } from '@/constants/testIds';
import { SECTIONS as SECTION_LIST } from '@/data/portfolio';
import useLiveStats from '@/hooks/useLiveStats';
import { lenisInstance } from './SmoothScroll';
export default function PersistentHUD() {
  const [active, setActive] = useState('hero');
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState('');
  const { fps, latency } = useLiveStats();
  useEffect(() => {
    const onScroll = () => {
      const sections = SECTION_LIST.map((s) => document.getElementById(s.id));
      const vh = window.innerHeight;
      let current = SECTION_LIST[0].id;
      sections.forEach((el, idx) => { if (!el) return; const r = el.getBoundingClientRect(); if (r.top <= vh * 0.4) current = SECTION_LIST[idx].id; });
      setActive(current);
      const docH = document.documentElement.scrollHeight - vh;
      setProgress(docH > 0 ? Math.min(100, Math.max(0, (window.scrollY / docH) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const tick = () => { const d = new Date(); setTime(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`); };
    tick();
    const id = setInterval(tick, 1000);
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(id); };
  }, []);
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) { if (lenisInstance) lenisInstance.scrollTo(el); else el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
  const activeLabel = SECTION_LIST.find((s) => s.id === active)?.label || 'BOOT';
  return (
    <>
      <div data-testid={HUD.container} className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-4 flex items-center justify-between text-[10px] tracking-[0.3em] text-bone/70 bg-gradient-to-b from-void to-transparent">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-jade rounded-full animate-blink" data-testid={HUD.status} />
          <span className="text-bone/90">RUDRA DARJI<span className="text-ember">.</span>DEV</span>
          <span className="hidden sm:inline text-bone/30">/</span>
          <span className="hidden sm:inline text-ember" data-testid={HUD.section}>{activeLabel}</span>
        </div>
        <nav className="hidden md:flex items-center gap-5">
          {SECTION_LIST.map((s, i) => (
            <button key={s.id} data-testid={HUD.navLink(s.id)} onClick={() => scrollTo(s.id)} className={`link-underline transition-colors ${active === s.id ? 'text-ember' : 'text-bone/60 hover:text-bone'}`} data-magnetic>
              {String(i + 1).padStart(2, '0')} · {s.label}
            </button>
          ))}
        </nav>
        <div className="hidden sm:block text-bone/40 tabular-nums">{time}</div>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 px-5 sm:px-8 py-3 flex items-center justify-between text-[10px] tracking-[0.3em] text-bone/40 bg-gradient-to-t from-void to-transparent">
        <span>EMBER_FORGE · v1.0</span>
        <span className="hidden sm:inline-flex items-center gap-2">
          <span className="text-[9px] tracking-[0.3em] text-bone/50">FUEL</span>
          <div className="w-24 h-1.5 bg-surface border border-panel relative rounded-sm overflow-hidden">
            <div data-testid={HUD.fuel} className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-ember to-amber rounded-sm" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px] tracking-[0.2em] text-ember tabular-nums">{Math.floor(progress).toString().padStart(2, '0')}%</span>
        </span>
        <span>{fps} FPS · {latency}ms</span>
      </div>
    </>
  );
}
