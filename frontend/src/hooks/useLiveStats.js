import { useState, useEffect } from 'react';

let sharedFps = 60;
let sharedLatency = 12;
let frameCount = 0;
let lastTime = performance.now();
let rafId = null;
let watchers = new Set();
let latencyInterval = null;
let fpsInterval = null;

function startRaf() {
  if (rafId) return;
  const tick = () => { frameCount++; rafId = requestAnimationFrame(tick); };
  rafId = requestAnimationFrame(tick);
}

function stopRaf() {
  if (rafId && watchers.size === 0) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function notify() {
  watchers.forEach(fn => fn());
}

export default function useLiveStats() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const update = () => setTick(t => t + 1);
    watchers.add(update);
    startRaf();
    if (!fpsInterval) {
      fpsInterval = setInterval(() => {
        const now = performance.now();
        const elapsed = now - lastTime;
        sharedFps = elapsed > 0 ? Math.round((frameCount / elapsed) * 1000) : 60;
        frameCount = 0;
        lastTime = now;
        notify();
      }, 1000);
    }
    if (!latencyInterval) {
      latencyInterval = setInterval(() => {
        sharedLatency = Math.round(Math.max(5, Math.min(50, sharedLatency + (Math.random() - 0.5) * 6)));
        notify();
      }, 1500);
    }
    return () => {
      watchers.delete(update);
      stopRaf();
    };
  }, []);

  return { fps: watchers.size ? sharedFps : 60, latency: watchers.size ? sharedLatency : 12 };
}
