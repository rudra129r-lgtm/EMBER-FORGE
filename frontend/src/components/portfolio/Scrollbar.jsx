import { useEffect, useRef, useState } from 'react';

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  delay: Math.random() * 3,
  dur: 1.8 + Math.random() * 2.2,
}));

export default function Scrollbar() {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [active, setActive] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      const p = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
      setProgress(p);

      const v = Math.abs(window.scrollY - lastY.current);
      lastY.current = window.scrollY;
      setVelocity(v);
      setActive(true);
    };

    const decay = setInterval(() => {
      setVelocity(v => Math.max(0, v - 2));
      setActive(v => v ? Math.random() > 0.05 : false);
    }, 50);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(decay); };
  }, []);

  const thumbH = Math.max(14, Math.min(85, progress * 100 + (active ? velocity * 0.03 : 0)));
  const thumbT = (1 - progress) * 100;
  const glowIntensity = Math.min(1, (active ? velocity * 0.04 : velocity * 0.02));
  const particleOpacity = Math.min(1, 0.3 + glowIntensity * 0.7);

  return (
    <div className="fixed right-0 top-0 bottom-0 z-[60] w-8 flex items-center pointer-events-none">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-2 h-4/5 rounded-full overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(255,107,53,0.06), rgba(6,214,160,0.04))', boxShadow: 'inset 0 0 12px rgba(255,107,53,0.06)' }}>
          <div className="absolute inset-0 animate-[cascade-heat_3s_ease-in-out_infinite]" style={{ background: 'linear-gradient(0deg, transparent, rgba(255,107,53,0.04), transparent)' }} />

          <div
            className="absolute left-0 right-0 rounded-full transition-[top,height] duration-[60ms] ease-out"
            style={{ top: `${thumbT}%`, height: `${thumbH}%` }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden" style={{ background: 'linear-gradient(180deg, #FF6B35, #FFD166, #06D6A0)' }}>
              <div className="absolute inset-0 animate-[cascade-glow_1.5s_ease-in-out_infinite]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.12), transparent, rgba(255,255,255,0.06))' }} />
              <div className="absolute inset-0 animate-[cascade-gradient_3s_ease-in-out_infinite]" style={{ background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.2), transparent 80%)' }} />
              <div className="absolute left-0 right-0 animate-[cascade-scan_1.2s_linear_infinite]" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.03) 70%, transparent)', filter: 'blur(2px)' }} />
              <div className="absolute -top-1 left-0 right-0 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.35)', filter: 'blur(3px)', boxShadow: '0 0 12px rgba(255,255,255,0.2)' }} />
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-[200%] h-6 rounded-full transition-opacity duration-200"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(255,107,53,${0.2 + glowIntensity * 0.5}), transparent)`,
                  filter: 'blur(8px)',
                  opacity: 0.4 + glowIntensity * 0.6,
                }}
              />
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[200%] h-6 rounded-full transition-opacity duration-200"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(6,214,160,${0.1 + glowIntensity * 0.3}), transparent)`,
                  filter: 'blur(8px)',
                  opacity: 0.2 + glowIntensity * 0.4,
                }}
              />
            </div>
          </div>

          {progress > 0 && PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute w-1 h-1 rounded-full animate-[cascade-particle_var(--dur)_ease-out_infinite]"
              style={{
                left: `${p.x}%`,
                '--dur': `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                top: `${Math.max(0, thumbT)}%`,
                opacity: particleOpacity,
                background: p.id % 3 === 0 ? '#06D6A0' : p.id % 3 === 1 ? '#FFD166' : '#FF6B35',
                boxShadow: p.id % 3 === 0
                  ? `0 0 4px rgba(6,214,160,${particleOpacity})`
                  : p.id % 3 === 1
                    ? `0 0 4px rgba(255,209,102,${particleOpacity})`
                    : `0 0 4px rgba(255,107,53,${particleOpacity * 1.2})`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute top-[10%] w-2.5 h-2.5 rounded-full animate-[cascade-orb_2s_ease-in-out_infinite]"
          style={{
            color: '#FF6B35',
            background: '#FF6B35',
            transition: 'box-shadow 200ms',
            boxShadow: `0 0 ${6 + glowIntensity * 12}px rgba(255,107,53,${0.6 + glowIntensity * 0.4})`,
          }}
        />
        <div
          className="absolute bottom-[10%] w-2.5 h-2.5 rounded-full animate-[cascade-orb_2.5s_ease-in-out_infinite]"
          style={{
            color: '#06D6A0',
            background: '#06D6A0',
            animationDelay: '0.5s',
            transition: 'box-shadow 200ms',
            boxShadow: `0 0 ${4 + glowIntensity * 8}px rgba(6,214,160,${0.4 + glowIntensity * 0.3})`,
          }}
        />
      </div>
    </div>
  );
}
