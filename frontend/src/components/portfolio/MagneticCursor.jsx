import { useEffect, useRef } from 'react';
const TRAIL_COUNT = 5;
const lerp = (a, b, t) => a + (b - a) * t;
export default function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ current: null })));
  const orbitRef = useRef(null);
  const stateRef = useRef({ angle: 0, mx: 0, my: 0, rx: 0, ry: 0, hovering: false, trail: [] });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const orbit = orbitRef.current;
    const trailEls = trailRefs.current.map(r => r.current);
    const s = stateRef.current;
    s.mx = window.innerWidth / 2;
    s.my = window.innerHeight / 2;
    s.rx = s.mx;
    s.ry = s.my;
    s.trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: s.mx, y: s.my }));
    const onMove = (e) => { s.mx = e.clientX; s.my = e.clientY; dot.style.transform = `translate3d(${s.mx}px, ${s.my}px, 0) translate(-50%, -50%)`; };
    const onOver = (e) => {
      s.hovering = !!e.target.closest('a, button, [data-magnetic], input, textarea, [role="button"]');
      ring.classList.toggle('hover', s.hovering);
    };
    let raf;
    const tick = (time) => {
      s.rx += (s.mx - s.rx) * 0.12;
      s.ry += (s.my - s.ry) * 0.12;
      if (Math.abs(s.mx - s.rx) < 1 && Math.abs(s.my - s.ry) < 1) { s.rx = s.mx; s.ry = s.my; }
      ring.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%)`;
      const leads = [{ x: s.rx, y: s.ry }, ...s.trail];
      const lerps = [0.12, 0.09, 0.07, 0.05, 0.03];
      s.trail = s.trail.map((t, i) => ({
        x: lerp(t.x, leads[i].x, lerps[i]),
        y: lerp(t.y, leads[i].y, lerps[i]),
      }));
      trailEls.forEach((el, i) => {
        if (el) el.style.transform = `translate3d(${s.trail[i].x}px, ${s.trail[i].y}px, 0) translate(-50%, -50%)`;
      });
      const orbitSpeed = s.hovering ? 0.0045 : 0.0025;
      const orbitRadius = s.hovering ? 28 : 18;
      s.angle = (s.angle + orbitSpeed * 16.67) % (Math.PI * 2);
      const ox = s.rx + Math.cos(s.angle) * orbitRadius;
      const oy = s.ry + Math.sin(s.angle) * orbitRadius;
      orbit.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); };
  }, []);
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div key={i} ref={el => { trailRefs.current[i].current = el; }} className="cursor-trail" style={{ width: `${5 - i * 0.6}px`, height: `${5 - i * 0.6}px`, opacity: 0.5 - i * 0.09 }} />
      ))}
      <div ref={orbitRef} className="cursor-orbit" />
    </>
  );
}
