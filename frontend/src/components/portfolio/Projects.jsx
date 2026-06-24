import { useState } from 'react';
import { PROJECTS as TID } from '@/constants/testIds';
import { PROJECTS } from '@/data/portfolio';
import Reveal from './Reveal';

const accentMap = { ember: 'text-ember', amber: 'text-amber', jade: 'text-jade' };

function Card({ project }) {
  const [flipped, setFlipped] = useState(false);
  const accent = accentMap[project.accent] || 'text-ember';
  return (
    <div className={`proj-card ${flipped?'flipped':''} relative h-[360px]`} data-testid={TID.card(project.id)} onClick={() => setFlipped(v=>!v)} data-magnetic>
      <div className="inner relative h-full">
        <div className="proj-face front absolute inset-0 panel panel-corner p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div><div className={`text-[10px] tracking-[0.3em] ${accent}`}>{project.code} · {project.year}</div><div className="font-display text-3xl text-bone mt-2 leading-tight">{project.title}</div><div className="text-xs text-bone/50 mt-1">{project.genre}</div></div>
            <div className="w-12 h-12 border border-panel grid place-items-center"><div className={`w-2 h-2 ${accent==='text-jade'?'bg-jade':accent==='text-amber'?'bg-amber':'bg-ember'} animate-blink`} /></div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">{project.tags.map((t)=>(<span key={t} className="text-[10px] tracking-[0.18em] uppercase px-2 py-1 border border-panel text-bone/60">{t}</span>))}</div>
            <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-bone/40"><span>HOVER · CLICK_TO_FLIP</span><span className={accent}>▶</span></div>
          </div>
        </div>
        <div className="proj-face back panel panel-corner p-6 flex flex-col justify-between">
          <div><div className={`text-[10px] tracking-[0.3em] ${accent}`}>// MISSION_BRIEF</div><p className="text-bone/85 text-sm mt-4 leading-relaxed">{project.summary}</p></div>
          <div className="space-y-3">
            <div className="text-[10px] tracking-[0.25em] text-bone/40">RATING · S-TIER</div>
            <div className="flex items-center gap-1">{[1,2,3,4,5].map((i)=>(<span key={i} className={`text-base ${accent}`}>◆</span>))}</div>
            <button className="text-[10px] tracking-[0.25em] text-ember link-underline">VIEW_FULL_LOG →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" data-testid="projects-section" className="relative min-h-screen w-full px-5 sm:px-10 pt-2.5 pb-2.5">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <Reveal variant="terminal" as="div" className="divider-bracket mb-4">04 · GAME_LIBRARY</Reveal>
          <Reveal variant="ember" as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone">Shipped <span className="text-ember">titles</span>, hand-forged.</Reveal>
        </div>
        <Reveal variant="float" delay={0.3} as="div" className="font-mono text-[10px] tracking-[0.3em] text-bone/40">{PROJECTS.length.toString().padStart(2,'0')} ENTRIES · SORTED_BY_YEAR</Reveal>
      </div>
      <Reveal.Group stagger={0.1}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <Reveal.Item key={p.id} variant="glitch">
              <Card project={p} />
            </Reveal.Item>
          ))}
        </div>
      </Reveal.Group>
    </section>
  );
}
