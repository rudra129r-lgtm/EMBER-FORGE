import HeroScene from './HeroScene';
import { HERO } from '@/constants/testIds';
import { PROFILE } from '@/data/portfolio';
import Reveal from './Reveal';
import useLiveStats from '@/hooks/useLiveStats';
import { lenisInstance } from './SmoothScroll';
export default function Hero() {
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) { if (lenisInstance) lenisInstance.scrollTo(el); else el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
  const { fps, latency } = useLiveStats();
  return (
    <section id="hero" data-testid={HERO.section} className="relative min-h-screen w-full flex items-center px-5 sm:px-10 pt-24 pb-2.5">
      <HeroScene />
      <div className="relative z-10 grid lg:grid-cols-12 gap-10 w-full">
        <div className="lg:col-span-7 space-y-8">
          <Reveal variant="terminal" as="div" className="divider-bracket">SESSION_01 · NOW_PLAYING</Reveal>
          <Reveal variant="ember" duration={1} as="h1" data-testid={HERO.title} className="font-display text-5xl sm:text-7xl lg:text-[8.5rem] leading-[0.92] text-bone">
            {PROFILE.handle}
            <span className="block text-bone/50 text-3xl sm:text-5xl lg:text-7xl mt-2">builds the<span className="text-ember"> ember.</span></span>
          </Reveal>
          <Reveal variant="float" delay={0.3} as="p" className="max-w-xl text-bone/70 text-sm sm:text-base leading-relaxed">{PROFILE.tagline} I design and ship full-stack experiences that feel less like web pages and more like consoles — <span className="text-amber">tactile, fast, and a little dangerous.</span></Reveal>
          <Reveal.Group stagger={0.12}>
            <Reveal.Item className="flex items-center gap-6 flex-wrap pt-2">
              <button data-testid={HERO.cta} onClick={() => scrollTo('projects')} data-magnetic className="group inline-flex items-center gap-3 px-5 py-3 bg-ember text-void font-mono text-xs tracking-[0.25em] hover:bg-amber transition-colors">▶ PRESS_START · VIEW_PROJECTS</button>
              <button onClick={() => scrollTo('contact')} data-magnetic className="inline-flex items-center gap-3 px-5 py-3 border border-panel text-bone/80 font-mono text-xs tracking-[0.25em] hover:border-ember hover:text-ember transition-colors">◆ OPEN_LOBBY</button>
            </Reveal.Item>
          </Reveal.Group>
          <Reveal.Group stagger={0.08}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-2xl">
              {PROFILE.stats.map((s) => (
                <Reveal.Item key={s.label} variant="hologram">
                  <div className="panel px-4 py-3 hover:-translate-y-1 hover:border-ember/50 hover:shadow-[0_0_16px_rgba(255,107,53,0.25)] transition-all duration-300 fuel-card"><div className="text-[9px] tracking-[0.25em] text-bone/40 transition-colors duration-300 fuel-label">{s.label}</div><div className="font-display text-2xl text-bone mt-1 transition-colors duration-300 fuel-value">{s.value}</div></div>
                </Reveal.Item>
              ))}
            </div>
          </Reveal.Group>
        </div>
        <Reveal variant="beam" delay={0.6} as="div" className="lg:col-span-5 hidden lg:flex items-end justify-end">
          <div className="font-mono text-[10px] text-bone/40 space-y-1 text-right max-w-xs">
            <div className="text-ember">// SYSTEM_STATUS</div>
            <div>renderer ........ webgl2</div><div>fps ............. {fps}</div>
            <div>latency ......... {latency} ms</div><div>session ......... live</div>
            <div className="text-amber">player .......... {PROFILE.handle.toLowerCase()}</div>
            <div>location ........ {PROFILE.location}</div>
          </div>
        </Reveal>
      </div>
      <Reveal variant="float" delay={1} as="div" data-testid={HERO.scrollHint} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] text-bone/40 flex flex-col items-center gap-2 z-10">
        <span>SCROLL</span><span className="block w-px h-10 bg-gradient-to-b from-ember to-transparent" />
      </Reveal>
    </section>
  );
}
