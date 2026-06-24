import { useState, useEffect, useRef } from 'react';

export default function useLiveStats() {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(12);
  const frameTimes = useRef([]);
  const latencyRef = useRef(12);

  useEffect(() => {
    let raf;
    const tick = (time) => {
      const now = performance.now();
      frameTimes.current.push(now);
      if (frameTimes.current.length > 60) frameTimes.current.shift();
      if (frameTimes.current.length > 1) {
        const deltas = [];
        for (let i = 1; i < frameTimes.current.length; i++) {
          deltas.push(frameTimes.current[i] - frameTimes.current[i - 1]);
        }
        const avg = deltas.reduce((a, b) => a + b, 0) / deltas.length;
        if (avg > 0) setFps(Math.round(Math.min(144, 1000 / avg)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 6;
      latencyRef.current = Math.max(5, Math.min(50, latencyRef.current + delta));
      setLatency(Math.round(latencyRef.current));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return { fps, latency };
}
