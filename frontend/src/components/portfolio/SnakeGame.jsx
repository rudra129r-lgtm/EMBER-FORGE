import { useState, useEffect, useRef, useCallback } from 'react';

const SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIR = { x: 1, y: 0 };
const SPEED = 140;

function randomFood(snake) {
  const free = [];
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (!snake.some(s => s.x === x && s.y === y)) free.push({ x, y });
    }
  }
  if (free.length === 0) return null;
  return free[Math.floor(Math.random() * free.length)];
}

function cellKey(x, y) {
  return `${x}-${y}`;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [dir, setDir] = useState(INITIAL_DIR);
  const [food, setFood] = useState(() => randomFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const dirRef = useRef(INITIAL_DIR);
  const gameOverRef = useRef(false);
  const pausedRef = useRef(false);
  const startedRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const start = useCallback(() => {
    setStarted(true);
    startedRef.current = true;
  }, []);

  const reset = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDir(INITIAL_DIR);
    setFood(randomFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setPaused(false);
    setStarted(true);
    dirRef.current = INITIAL_DIR;
    gameOverRef.current = false;
    pausedRef.current = false;
    startedRef.current = true;
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const key = e.key;
      if (!startedRef.current) {
        start();
        return;
      }
      if (key === ' ' || key === 'Escape') {
        e.preventDefault();
        if (gameOverRef.current) { reset(); return; }
        setPaused(p => { pausedRef.current = !p; return !p; });
        return;
      }
      if (gameOverRef.current || pausedRef.current) return;
      const dirKeys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','W','a','A','s','S','d','D'];
      if (dirKeys.includes(key)) e.preventDefault();
      const d = dirRef.current;
      if ((key === 'ArrowUp' || key === 'w' || key === 'W') && d.y !== 1) {
        dirRef.current = { x: 0, y: -1 }; setDir({ x: 0, y: -1 });
      } else if ((key === 'ArrowDown' || key === 's' || key === 'S') && d.y !== -1) {
        dirRef.current = { x: 0, y: 1 }; setDir({ x: 0, y: 1 });
      } else if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && d.x !== 1) {
        dirRef.current = { x: -1, y: 0 }; setDir({ x: -1, y: 0 });
      } else if ((key === 'ArrowRight' || key === 'd' || key === 'D') && d.x !== -1) {
        dirRef.current = { x: 1, y: 0 }; setDir({ x: 1, y: 0 });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reset, start]);

  useEffect(() => {
    if (reducedRef.current) return;
    let interval;
    const tick = () => {
      if (!startedRef.current || gameOverRef.current || pausedRef.current) return;
      setSnake(prev => {
        const head = prev[0];
        const d = dirRef.current;
        const nx = head.x + d.x;
        const ny = head.y + d.y;
        if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) {
          gameOverRef.current = true; setGameOver(true); return prev;
        }
        if (prev.some(s => s.x === nx && s.y === ny)) {
          gameOverRef.current = true; setGameOver(true); return prev;
        }
        const newSnake = [{ x: nx, y: ny }, ...prev];
        if (food && nx === food.x && ny === food.y) {
          setFood(f => randomFood(newSnake));
          setScore(s => s + 1);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    };
    interval = setInterval(tick, SPEED);
    return () => clearInterval(interval);
  }, [food]);

  const snakeSet = new Set(snake.map(s => cellKey(s.x, s.y)));
  const headKey = snake.length > 0 ? cellKey(snake[0].x, snake[0].y) : null;

  const move = (dx, dy) => {
    if (!startedRef.current) { start(); return; }
    if (gameOverRef.current) { reset(); return; }
    const d = dirRef.current;
    if ((dx === 0 && dy === -1 && d.y !== 1) ||
        (dx === 0 && dy === 1 && d.y !== -1) ||
        (dx === -1 && dy === 0 && d.x !== 1) ||
        (dx === 1 && dy === 0 && d.x !== -1)) {
      dirRef.current = { x: dx, y: dy }; setDir({ x: dx, y: dy });
    }
  };

  return (
    <div className="panel panel-corner p-4 mt-8 flex flex-col" style={{ height: 800 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] tracking-[0.3em] text-ember">// SNAKE</span>
        <span className="font-mono text-xs text-amber tabular-nums">SCORE: {String(score).padStart(2, '0')}</span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col items-center bg-void border border-panel p-1 select-none relative">
        <div className="grid flex-1 w-full" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, gridTemplateRows: `repeat(${SIZE}, 1fr)` }}>
          {Array.from({ length: SIZE * SIZE }, (_, i) => {
            const x = i % SIZE;
            const y = Math.floor(i / SIZE);
            const k = cellKey(x, y);
            const isHead = k === headKey;
            const isSnake = snakeSet.has(k);
            const isFood = food && food.x === x && food.y === y;
            let cls = '';
            if (!started) cls += 'opacity-0';
            else if (isHead) cls += 'bg-ember rounded-sm';
            else if (isSnake) cls += 'bg-amber/70 rounded-sm';
            else if (isFood) cls += 'bg-jade rounded-full animate-blink';
            else cls += 'bg-void';
            return <div key={k} className={cls} />;
          })}
        </div>
        {!started && (
          <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10" onClick={start}>
            <div className="font-display text-4xl text-ember hover:text-amber transition-colors">▶ PLAY</div>
            <div className="text-[10px] tracking-[0.3em] text-bone/40 mt-3">CLICK_OR_PRESS_ANY_KEY</div>
          </div>
        )}
      </div>
      {gameOver && (
        <div className="mt-3 text-center">
          <div className="font-display text-2xl text-bone">GAME_OVER</div>
          <div className="text-[10px] tracking-[0.3em] text-bone/40 mt-1">FINAL_SCORE: {String(score).padStart(2, '0')}</div>
          <button onClick={reset} className="mt-2 text-[10px] tracking-[0.3em] text-ember link-underline">PLAY_AGAIN →</button>
        </div>
      )}
      {paused && !gameOver && (
        <div className="mt-3 text-center">
          <div className="font-mono text-xs text-amber">// PAUSED</div>
          <div className="text-[10px] tracking-[0.25em] text-bone/40">PRESS_SPACE_OR_ESC_TO_RESUME</div>
        </div>
      )}
      <div className="flex justify-center gap-2 mt-3">
        <button onPointerDown={() => move(0, -1)} className="w-8 h-8 border border-panel text-bone/60 grid place-items-center text-xs hover:border-ember hover:text-ember transition-colors">W</button>
        <button onPointerDown={() => move(-1, 0)} className="w-8 h-8 border border-panel text-bone/60 grid place-items-center text-xs hover:border-ember hover:text-ember transition-colors">A</button>
        <button onPointerDown={() => move(0, 1)} className="w-8 h-8 border border-panel text-bone/60 grid place-items-center text-xs hover:border-ember hover:text-ember transition-colors">S</button>
        <button onPointerDown={() => move(1, 0)} className="w-8 h-8 border border-panel text-bone/60 grid place-items-center text-xs hover:border-ember hover:text-ember transition-colors">D</button>
      </div>
      <div className="text-[9px] tracking-[0.25em] text-bone/30 text-center mt-2">WASD · SPACE TO PAUSE</div>
    </div>
  );
}
