import { useState } from 'react';
import { ABOUT } from '@/constants/testIds';
import { PROFILE } from '@/data/portfolio';
import SnakeGame from './SnakeGame';
import EmberDivider from './EmberDivider';
import Terminal from './Terminal';
import Reveal from './Reveal';

export default function About() {
  const [gameFlipped, setGameFlipped] = useState(false);
  const [termFlipped, setTermFlipped] = useState(false);
  return (
    <section id="about" data-testid={ABOUT.section} className="relative min-h-screen w-full px-5 sm:px-10 pt-[90px] pb-2.5 flex items-center">
      <div className="w-full">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal variant="terminal" as="div" className="divider-bracket mb-[100px]">02 · PLAYER_PROFILE</Reveal>
            <Reveal variant="ember" as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone leading-[1.05]">A profile card,<br/><span className="text-ember">not a paragraph.</span></Reveal>
            <Reveal variant="glitch" delay={0.3} as="div" className="mt-10 panel panel-corner p-5 max-w-md" data-testid={ABOUT.avatar}>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-surface border border-panel grid place-items-center font-display text-3xl text-ember">R</div>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-jade rounded-full border-2 border-void animate-blink" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] tracking-[0.3em] text-bone/40">HANDLE</div>
                  <div className="font-display text-xl text-bone">{PROFILE.handle}</div>
                  <div className="text-[10px] tracking-[0.3em] text-amber mt-1">{PROFILE.role}</div>
                  <div className="text-xs text-bone/50 mt-2">{PROFILE.location} · <span className="text-jade">{PROFILE.status}</span></div>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-8" data-testid={ABOUT.bio}>
            <Reveal variant="float" as="div" className="panel panel-corner p-6 sm:p-8 space-y-4">
              <div className="text-[10px] tracking-[0.3em] text-ember">// BIO_LOG</div>
              <Reveal.Group stagger={0.12}>
                {PROFILE.bio.map((line, i) => (<Reveal.Item key={i} variant="hologram"><div className="panel px-4 py-3 hover:-translate-y-1 hover:border-ember/50 hover:shadow-[0_0_16px_rgba(255,107,53,0.25)] transition-all duration-300 fuel-card"><p className="text-bone/80 text-base sm:text-lg leading-relaxed"><span className="text-ember/60 font-mono text-xs mr-3">{String(i+1).padStart(2,'0')}</span>{line}</p></div></Reveal.Item>))}
              </Reveal.Group>
            </Reveal>
            <Reveal.Group stagger={0.06}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[['DISCIPLINE','Computer Engineering'],['LANGUAGE','EN · HI'],['CLASS','BUILDER'],['ALIGNMENT','LAWFUL_GOOD'],['SPECIALIZATION','Full Stack'],['EDUCATION','B.Tech CSE'],['CERTIFICATION','To Be Achieved'],['STATUS','Open to Work']].map(([k,v]) => (
                  <Reveal.Item key={k} variant="hologram">
                    <div className="panel px-4 py-3 hover:-translate-y-1 hover:border-ember/50 hover:shadow-[0_0_16px_rgba(255,107,53,0.25)] transition-all duration-300 fuel-card"><div className="text-[9px] tracking-[0.3em] text-bone/40 transition-colors duration-300 fuel-label">{k}</div><div className="text-bone text-sm mt-1 transition-colors duration-300 fuel-value">{v}</div></div>
                  </Reveal.Item>
                ))}
              </div>
            </Reveal.Group>
          </div>
        </div>
        <Reveal variant="float" as="div" className="mt-16"><EmberDivider /></Reveal>
        <div className="grid lg:grid-cols-12 gap-12 mt-4">
          <div className="lg:col-span-5">
            <Reveal variant="terminal" as="div" className="divider-bracket mb-4">THE_FAVORITE_GAME</Reveal>
            <Reveal variant="hologram" as="div" className={`flip-game ${gameFlipped ? 'flipped' : ''}`} onClick={() => { if (!gameFlipped) setGameFlipped(true); }} onDoubleClick={() => { if (gameFlipped) setGameFlipped(false); }}>
              <div className="inner">
                <div className="face front panel panel-corner flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(255,107,53,0.03) 7px, rgba(255,107,53,0.03) 8px), repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255,107,53,0.03) 7px, rgba(255,107,53,0.03) 8px)' }}>
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 animate-[grid-scan_4s_linear_infinite]" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,107,53,0.08) 45%, rgba(255,107,53,0.12) 50%, rgba(255,107,53,0.08) 55%, transparent 60%)' }} />
                  </div>
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-ember rounded-full animate-[snake-pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0s', color: '#FF6B35' }} />
                    <div className="absolute top-[35%] left-[28%] w-1.5 h-1.5 bg-ember rounded-full animate-[snake-pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.2s', color: '#FF6B35' }} />
                    <div className="absolute top-[40%] left-[35%] w-1.5 h-1.5 bg-ember rounded-full animate-[snake-pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s', color: '#FF6B35' }} />
                    <div className="absolute top-[42%] left-[42%] w-1.5 h-1.5 bg-ember rounded-full animate-[snake-pulse-head_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.6s', color: '#FF6B35' }} />
                    <div className="absolute top-[40%] left-[50%] w-1.5 h-1.5 bg-ember rounded-full animate-[snake-pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.8s', color: '#FF6B35' }} />
                    <div className="absolute top-[35%] left-[58%] w-1.5 h-1.5 bg-ember rounded-full animate-[snake-pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '1.0s', color: '#FF6B35' }} />
                    <div className="absolute top-[30%] left-[65%] w-2 h-2 bg-ember rounded-full animate-[snake-pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '1.2s', color: '#FF6B35' }} />
                    <div className="absolute top-[55%] left-[70%] w-2.5 h-2.5 bg-jade rounded-full animate-[snake-pulse-head_1.5s_ease-in-out_infinite]" style={{ animationDelay: '1.4s', boxShadow: '0 0 8px rgba(6,214,160,0.6)' }} />
                  </div>
                  <div className="text-center relative z-10">
                    <div className="font-display text-5xl text-ember">SNAKE.GAME</div>
                    <div className="text-[10px] tracking-[0.3em] text-bone/40 mt-4">CLICK_TO_PLAY</div>
                  </div>
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 overflow-hidden whitespace-nowrap">
                    <span className="font-mono text-[9px] text-ember/50 animate-[cmd-type_4s_ease-in-out_infinite] inline-block">&gt; START_GAME</span>
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 z-10">
                    {['W','A','S','D'].map((k,i) => (
                      <span key={k} className="w-5 h-5 border text-ember/60 grid place-items-center text-[8px] font-mono animate-[key-cycle_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.5}s` }}>{k}</span>
                    ))}
                  </div>
                </div>
                <div className="face back"><SnakeGame /></div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal variant="terminal" as="div" className="divider-bracket mb-4">PERSONAL_SPACE_ACCESS</Reveal>
            <Reveal variant="hologram" delay={0.2} as="div" className={`flip-game ${termFlipped ? 'flipped' : ''}`} onClick={() => { if (!termFlipped) setTermFlipped(true); }} onDoubleClick={() => { if (termFlipped) setTermFlipped(false); }}>
              <div className="inner">
                <div className="face front panel panel-corner flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="input-corner tl" /><div className="input-corner tr" />
                  <div className="input-corner bl" /><div className="input-corner br" />
                  <div className="absolute inset-0 pointer-events-none opacity-15">
                    {[0,1,2,3,4,5,6,7].map(i => (
                      <div key={i} className="absolute font-mono text-[7px] text-jade/30" style={{ left: `${10 + i * 10}%`, top: '-10%', animation: `data-fall ${4 + Math.random() * 3}s linear infinite`, animationDelay: `${Math.random() * 5}s`, writingMode: 'vertical-rl' }}>
                        {Array.from({ length: 20 }, () => ['0','1'][Math.floor(Math.random() * 2)]).join('')}
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 pointer-events-none opacity-25">
                    {[0,1,2,3,4].map(i => (
                      <div key={`line-${i}`} className="absolute h-[1px] bg-gradient-to-r from-transparent via-jade/20 to-transparent animate-[data-fall-2_5s_linear_infinite]" style={{ left: `${5 + i * 20}%`, width: '60px', top: '-2px', animationDelay: `${i * 1.2}s` }} />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 flex items-end gap-[3px] z-10">
                    {[0,1,2].map(i => (
                      <div key={`sig-${i}`} className="w-[3px] bg-gradient-to-t from-ember to-amber rounded-t-sm animate-[signal-bar_1.2s_ease-in-out_infinite]" style={{ height: '10px', animationDelay: `${i * 0.15}s`, animationName: i === 1 ? 'signal-bar-2' : 'signal-bar' }} />
                    ))}
                  </div>
                  <div className="orbit-ring" style={{ top: '22%' }} />
                  <div className="text-center relative z-10">
                    <div className="font-display text-5xl text-amber relative inline-block animate-[glitch-stutter_4s_ease-in-out_infinite]">TERMINAL<span className="inline-block w-2 h-6 bg-amber ml-1 animate-blink align-middle" /></div>
                    <div className="text-[10px] tracking-[0.3em] text-bone/40 mt-4">CLICK_TO_ACCESS</div>
                  </div>
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 overflow-hidden whitespace-nowrap w-[160px]">
                    <div className="font-mono text-[8px] text-jade/40 animate-[line-type_5s_ease-in-out_infinite] overflow-hidden">&gt; init_session<span className="animate-blink">_</span></div>
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10 text-[8px] tracking-[0.25em] text-bone/30 font-mono">
                    <span>ROOT@DEV</span>
                    <span className="text-ember/50">◆</span>
                    <span>~$ <span className="animate-blink">_</span></span>
                  </div>
                </div>
                <div className="face back"><Terminal /></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
