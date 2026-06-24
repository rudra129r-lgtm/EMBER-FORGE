import { useEffect, useState, useRef } from 'react';
import { BOOT } from '@/constants/testIds';
const LINES = [
  '> ember_forge.init()',
  '> mounting /rudra_darji on void://0A0A0A',
  '> loading typography ............. ok',
  '> loading shaders ................ ok',
  '> calibrating ember channel ...... ok',
  '> hud handshake .................. ok',
  '> ready_to_play',
];
export default function BootSequence({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef(Date.now());
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setProgress(100); setLineIdx(LINES.length); setTimeout(() => { setDone(true); onDone?.(); }, 150); return; }
    const DURATION = 2500;
    let raf;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(p);
      setLineIdx(Math.min(LINES.length, Math.floor((p / 100) * LINES.length) + 1));
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => { setDone(true); onDone?.(); }, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  const skip = () => { setDone(true); onDone?.(); };
  if (done) return null;
  return (
    <div data-testid={BOOT.container} className="fixed inset-0 z-[100] bg-void flex flex-col items-stretch justify-between px-8 py-10 animate-flicker">
      <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-ember/80">
        <span>EMBER_FORGE / BOOT_SEQUENCE</span>
        <span className="text-bone/40">v1.0 · RUDRA DARJI.DEV</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-6xl sm:text-7xl lg:text-8xl text-bone tracking-tight leading-none">
            RUDRA DARJI
          </div>
          <div className="mt-4 text-[11px] tracking-[0.4em] text-bone/50">FULL · STACK · DEVELOPER</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
        <div className="font-mono text-xs text-bone/70 space-y-1 min-h-[140px]">
          {LINES.slice(0, lineIdx).map((l, i) => <div key={i} className={i === lineIdx - 1 ? 'text-ember' : ''}>{l}</div>)}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-bone/50">
            <span>BOOT</span><span>{Math.floor(progress)}%</span>
          </div>
          <div className="h-2 bg-surface border border-panel relative overflow-hidden">
            <div data-testid={BOOT.bar} className="boot-stripe h-full" style={{ width: `${progress}%`, transition: 'width 60ms linear' }} />
          </div>
          <button data-testid={BOOT.skip} onClick={skip} className="text-[10px] tracking-[0.3em] text-bone/40 hover:text-ember transition-colors link-underline">SKIP_BOOT →</button>
        </div>
      </div>
    </div>
  );
}
