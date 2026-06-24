import { useState } from 'react';
import { EXPERIENCE as TID } from '@/constants/testIds';
import { EXPERIENCE } from '@/data/portfolio';
import Reveal from './Reveal';

const RANKS = ['RECRUIT', 'OPERATOR', 'CAPTAIN', 'COMMANDER'];

function scrambleText(text) {
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  return text.split('').map(c => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function RankBadge({ rank, index }) {
  const [scrambled, setScrambled] = useState(false);
  const [display, setDisplay] = useState(rank);
  const handleEnter = () => {
    if (scrambled) return;
    setScrambled(true);
    let count = 0;
    const interval = setInterval(() => {
      setDisplay(scrambleText(rank));
      count++;
      if (count >= 6) { clearInterval(interval); setDisplay(rank); setTimeout(() => setScrambled(false), 200); }
    }, 50);
  };
  return (
    <span onMouseEnter={handleEnter} className="rank-scramble font-mono text-[10px] text-amber cursor-default transition-colors duration-200">{display}</span>
  );
}

export default function Experience() {
  return (
    <section id="experience" data-testid="experience-section" className="relative min-h-screen w-full px-5 sm:px-10 pt-2.5 pb-2.5">
      <div className="mb-12">
        <Reveal variant="terminal" as="div" className="divider-bracket mb-4">05 · CAMPAIGN_MAP</Reveal>
        <Reveal variant="ember" as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone">Missions <span className="text-ember">completed</span>, in order.</Reveal>
      </div>
      <div className="relative">
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ember via-panel to-transparent" />
        <Reveal.Group stagger={0.15}>
          <div className="space-y-12">
            {EXPERIENCE.map((m, idx) => {
              const side = idx % 2 === 0 ? 'left' : 'right';
              const particles = Array.from({ length: 6 }, (_, i) => ({
                dx: `${-30 + Math.random() * 60}px`,
                dy: `${-40 + Math.random() * 40}px`,
                delay: `${Math.random() * 0.4}s`,
                size: 2 + Math.random() * 3,
              }));
              return (
                <Reveal.Item key={m.id}>
                  <div data-testid={TID.node(m.id)} className="relative grid sm:grid-cols-2 gap-6 items-center mission-card">
                    <span className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-3 h-3 bg-ember rounded-full border-2 border-void shadow-[0_0_0_4px_rgba(255,107,53,0.15)] mission-dot transition-shadow duration-300 z-10" />
                    <span className="mission-dot-ring mission-dot-ring-1" />
                    <span className="mission-dot-ring mission-dot-ring-2" />
                    <span className="mission-dot-ring mission-dot-ring-3" />
                    <div className={`${side==='right'?'sm:order-2':''} pl-14 sm:pl-0 sm:pr-10`}>
                      <div className="panel p-5 relative overflow-hidden" style={{ borderColor: '#1C1C1C', transition: 'border-color 300ms ease' }}>
                        <div className="mission-shine" />
                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-ember to-transparent mission-border" style={{ backgroundSize: '200% 100%', backgroundPosition: '200% 0', transition: 'background-position 400ms ease' }} />
                        {particles.map((p, i) => (
                          <div key={i} className="mission-ember" style={{ '--dx': p.dx, '--dy': p.dy, animationDelay: p.delay, width: `${p.size}px`, height: `${p.size}px`, top: `${50 + (Math.random() - 0.5) * 60}%`, left: `${50 + (Math.random() - 0.5) * 60}%` }} />
                        ))}
                        <div className="flex items-center justify-between text-[10px] tracking-[0.25em]"><span className="text-ember">{m.year}</span><RankBadge rank={m.rank} index={idx} /></div>
                        <div className="font-display text-2xl text-bone mt-3 leading-tight transition-colors duration-300" style={{ transition: 'text-shadow 300ms ease' }}>{m.role}</div>
                        <div className="text-xs text-bone/50 mt-1">@ {m.org}</div>
                        <p className="text-sm text-bone/75 mt-3 leading-relaxed mission-desc">{m.mission}</p>
                      </div>
                    </div>
                    <div className={`${side==='right'?'sm:order-1 sm:text-right sm:pr-10':'sm:text-left sm:pl-10'} hidden sm:block text-[10px] tracking-[0.3em] text-bone/40 mission-flag-text transition-colors duration-300`}>MISSION_{String(EXPERIENCE.length-idx).padStart(2,'0')}</div>
                  </div>
                </Reveal.Item>
              );
            })}
          </div>
        </Reveal.Group>
      </div>
    </section>
  );
}
