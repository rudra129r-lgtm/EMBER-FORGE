import { useEffect, useRef, useState } from 'react';
import { SKILLS as TID } from '@/constants/testIds';
import { SKILLS } from '@/data/portfolio';
import Reveal from './Reveal';

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const ob = new IntersectionObserver((entries) => entries.forEach((e) => setInView(e.isIntersecting)), { threshold: 0.25 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, [ref]);
  return inView;
}

function CountUp({ to, active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) { setN(0); return; }
    let raf; const start = performance.now(); const dur = 1200;
    const step = (t) => { const p = Math.min(1, (t - start) / dur); setN(Math.round(p * to)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, active]);
  return <span className="tabular-nums">{n}</span>;
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="skills" ref={ref} data-testid="skills-section" className="relative min-h-screen w-full px-5 sm:px-10 pt-2.5 pb-2.5 flex items-center">
      <div className="w-full">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <Reveal variant="terminal" as="div" className="divider-bracket mb-4">03 · LOADOUT</Reveal>
            <Reveal variant="ember" as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone">Skill <span className="text-ember">tree</span>, but honest.</Reveal>
          </div>
          <Reveal variant="float" delay={0.3} as="div" className="font-mono text-[10px] tracking-[0.3em] text-bone/40">LVL_AVG · {Math.round(SKILLS.reduce((a,b)=>a+b.xp,0)/SKILLS.length)}/100</Reveal>
        </div>
        <Reveal.Group stagger={0.1}>
          <div className="grid lg:grid-cols-2 gap-6">
            {SKILLS.map((s, idx) => (
              <Reveal.Item key={s.id} variant="hologram">
                <div className="panel p-6 fuel-card hover:-translate-y-1 hover:border-ember/50 hover:shadow-[0_0_16px_rgba(255,107,53,0.25)] transition-all duration-300">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-3"><span className="text-ember font-mono text-xs">{String(idx+1).padStart(2,'0')}</span><span className="font-display text-2xl text-bone tracking-tight fuel-value">{s.label}</span></div>
                    <span className="font-mono text-xs text-amber fuel-value"><CountUp to={s.xp} active={inView} />/100 XP</span>
                  </div>
                  <div className="xpbar" data-testid={TID.bar(s.id)}><div className="xpbar-fill" style={{ width: inView ? `${s.xp}%` : '0%' }} /></div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((it) => (<span key={it} className="text-[10px] tracking-[0.18em] uppercase px-2 py-1 border border-panel text-bone/70 hover:border-ember hover:text-ember transition-colors">{it}</span>))}
                  </div>
                </div>
              </Reveal.Item>
            ))}
          </div>
        </Reveal.Group>
      </div>
    </section>
  );
}
