import { useState, useEffect, useRef, useMemo } from 'react';
import { PROFILE, SKILLS, PROJECTS, EXPERIENCE, SOCIAL, STUDIES, PERSONAL_INFO, HOBBIES } from '@/data/portfolio';

const WELCOME = [
  'EMBER_FORGE TERMINAL v1.0',
  'Type "help" to see available commands.',
];

const HELP = [
  'Available commands:',
  '  help      — show this list',
  '  whoami    — display profile info',
  '  studies   — show education details',
  '  personal  — show personal information',
  '  hobbies   — list hobbies',
  '  social    — show social handles',
  '  skills    — list skill categories',
  '  projects  — show shipped projects',
  '  experience— show work experience',
  '  clear     — clear terminal',
];

function formatOutput(lines) {
  return lines;
}

function cmdWhoami() {
  return [
    `HANDLE ........ ${PROFILE.handle}`,
    `ROLE .......... ${PROFILE.role}`,
    `TAGLINE ....... ${PROFILE.tagline}`,
    `LOCATION ...... ${PROFILE.location}`,
    `STATUS ........ ${PROFILE.status}`,
  ];
}

function cmdStudies() {
  return STUDIES.map(s => `${s.label} ${'.'.repeat(Math.max(1, 14 - s.label.length))} ${s.value}`);
}

function cmdPersonal() {
  return PERSONAL_INFO.map(p => `${p.label} ${'.'.repeat(Math.max(1, 14 - p.label.length))} ${p.value}`);
}

function cmdHobbies() {
  return [HOBBIES.join('  ·  ')];
}

function cmdSocial() {
  return SOCIAL.map(s => `[${s.key}] ${s.label} ${'.'.repeat(Math.max(1, 12 - s.label.length))} ${s.handle}`);
}

function cmdSkills() {
  return SKILLS.map(s => `${s.label} ${'.'.repeat(Math.max(1, 14 - s.label.length))} ${s.xp}/100  [${s.items.join(', ')}]`);
}

function cmdProjects() {
  return PROJECTS.map(p => `${p.code} ${p.year}  ${p.title}`);
}

function cmdExperience() {
  return EXPERIENCE.map(e => `${e.rank}  ${e.role} @ ${e.org}  (${e.year})`);
}

const CMD_MAP = {
  whoami: cmdWhoami,
  studies: cmdStudies,
  personal: cmdPersonal,
  hobbies: cmdHobbies,
  social: cmdSocial,
  skills: cmdSkills,
  projects: cmdProjects,
  experience: cmdExperience,
};

export default function Terminal() {
  const [lines, setLines] = useState(() => WELCOME.map(t => ({ type: 'output', text: t })));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const sparks = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    x: `${Math.random() * 100}%`,
    dur: `${2 + Math.random() * 3}s`,
    delay: `${Math.random() * 4}s`,
    drift: `${-30 + Math.random() * 60}px`,
  })), []);
  const smoke = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    x: `${18 + i * 22 + Math.random() * 12}%`,
    dur: `${6 + Math.random() * 5}s`,
    delay: `${Math.random() * 7}s`,
    drift: `${-12 + Math.random() * 24}px`,
  })), []);
  const embers = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    x: `${10 + i * 16 + Math.random() * 8}%`,
    dur: `${1.2 + Math.random() * 1.5}s`,
    del: `${Math.random() * 3}s`,
  })), []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const process = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    const newLines = [...lines, { type: 'prompt', text: `rudra@dev:~$ ${cmd}` }];
    setHistory(h => [...h, cmd]);
    setHistoryIdx(-1);
    if (trimmed === 'help') {
      setLines([...newLines, ...HELP.map(t => ({ type: 'output', text: t }))]);
    } else if (trimmed === 'clear') {
      setLines([]);
    } else if (CMD_MAP[trimmed]) {
      setLines([...newLines, ...CMD_MAP[trimmed]().map(t => ({ type: 'output', text: t }))]);
    } else {
      setLines([...newLines, { type: 'output', text: `bash: ${trimmed}: command not found` }]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      process(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <div className="panel panel-corner pt-8 p-4 flex flex-col mt-8" style={{ height: 800 }} onClick={() => inputRef.current?.focus()}>
      <div className="text-[10px] tracking-[0.3em] text-ember mb-3">// TERMINAL · v1.0</div>
      <div ref={outputRef} className="flex-1 bg-void border border-panel p-3 font-mono text-xs overflow-y-auto space-y-0.5 terminal-scroll relative" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-bg">
          <div className="terminal-heat" />
          {smoke.map((s, i) => (
            <div key={`smoke-${i}`} className="terminal-smoke" style={{ '--x': s.x, '--dur': s.dur, '--delay': s.delay, '--drift': s.drift }} />
          ))}
          {sparks.map((s, i) => (
            <div key={`spark-${i}`} className="terminal-spark" style={{ '--x': s.x, '--dur': s.dur, '--delay': s.delay, '--drift': s.drift }} />
          ))}
        </div>
        {lines.map((l, i) => (
          <div key={i} className={l.type === 'prompt' ? 'text-ember/90' : 'text-bone/85'} style={{ whiteSpace: 'pre-wrap' }}>{l.text}</div>
        ))}
      </div>
      <div className="terminal-input-bar flex items-center px-3 py-1.5 font-mono text-xs" onClick={() => inputRef.current?.focus()}>
        <div className="input-datastream" />
        <div className="input-sheen" />
        <div className="input-scanline" />
        <div className="input-corner tl" /><div className="input-corner tr" />
        <div className="input-corner bl" /><div className="input-corner br" />
        {embers.map((e, i) => (
          <div key={`ie-${i}`} className="input-ember" style={{ '--x': e.x, '--dur': e.dur, '--del': e.del }} />
        ))}
        <span className="input-prompt shrink-0">rudra@dev:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="ml-1 flex-1 bg-transparent border-none outline-none text-bone/90 caret-ember input-glow"
        />
      </div>
    </div>
  );
}
