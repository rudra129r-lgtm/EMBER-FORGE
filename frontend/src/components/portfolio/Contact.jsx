import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { CONTACT } from '@/constants/testIds';
import { SOCIAL, PROFILE } from '@/data/portfolio';
import Reveal from './Reveal';

const API = process.env.NODE_ENV === 'production' ? '/api' : `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { toast.error('Fill in all fields, player.'); return; }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success('Message received. Ember sent.', { description: "I'll reply within 1-2 days." });
      setForm({ name: '', email: '', message: '' });
    } catch { toast.error('Transmission failed. Try again.'); }
    finally { setSubmitting(false); }
  };
  return (
    <section id="contact" data-testid="contact-section" className="relative min-h-screen w-full px-5 sm:px-10 pt-2.5 pb-28">
      <div className="mb-12">
        <Reveal variant="terminal" as="div" className="divider-bracket mb-4">06 · MULTIPLAYER_LOBBY</Reveal>
        <Reveal variant="ember" as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone">Drop into the <span className="text-ember">lobby</span>.</Reveal>
        <Reveal variant="float" delay={0.2} as="p" className="text-bone/60 mt-3 max-w-xl text-sm">Hiring, collaborating, or just want to talk shaders? Send a packet.</Reveal>
      </div>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <Reveal variant="glitch" as="div" className="panel panel-corner p-6">
            <div className="flex items-center gap-3 mb-4"><span className="w-2.5 h-2.5 bg-jade rounded-full animate-blink" /><span className="text-[10px] tracking-[0.3em] text-jade">ONLINE_NOW</span></div>
            <div className="font-display text-2xl text-bone">{PROFILE.handle}</div>
            <div className="text-xs text-bone/50 mt-1">{PROFILE.location}</div>
            <div className="mt-5 space-y-1 font-mono text-[11px] text-bone/60"><div>ping ............ 14ms</div><div>region .......... ap-south-1</div><div>availability .... <span className="text-amber">open_to_work</span></div></div>
          </Reveal>
          <Reveal variant="float" as="div" className="panel panel-corner p-6 space-y-3">
            <div className="text-[10px] tracking-[0.3em] text-ember mb-2">// CONTROLLER_LINKS</div>
            <Reveal.Group stagger={0.06}>
              {SOCIAL.map((s) => (
                <Reveal.Item key={s.id}>
                  <a href={s.url} target="_blank" rel="noreferrer" data-magnetic className="flex items-center justify-between py-2 border-b border-panel last:border-b-0 group"><div className="flex items-center gap-3"><span className="w-7 h-7 grid place-items-center border border-panel text-ember text-xs font-bold group-hover:bg-ember group-hover:text-void transition-colors">{s.key}</span><span className="text-bone/80 text-sm group-hover:text-ember transition-colors">{s.label}</span></div><span className="text-bone/40 text-xs">{s.handle} →</span></a>
                </Reveal.Item>
              ))}
            </Reveal.Group>
          </Reveal>
        </div>
        <Reveal variant="float" delay={0.3} as="div" className="lg:col-span-8">
          <form onSubmit={onSubmit} data-testid={CONTACT.form} className="panel panel-corner p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between mb-2"><div className="text-[10px] tracking-[0.3em] text-ember">// PACKET_FORM</div><div className="text-[10px] tracking-[0.3em] text-bone/40">ENCRYPTED · TLS_1.3</div></div>
            <Reveal.Group stagger={0.1}>
              <div className="grid sm:grid-cols-2 gap-5">
                <Reveal.Item><Field id="name" label="HANDLE" value={form.name} onChange={(v)=>setForm({...form,name:v})} placeholder="player_one" testId={CONTACT.name} /></Reveal.Item>
                <Reveal.Item><Field id="email" label="RETURN_ADDRESS" type="email" value={form.email} onChange={(v)=>setForm({...form,email:v})} placeholder="you@studio.dev" testId={CONTACT.email} /></Reveal.Item>
              </div>
              <Reveal.Item>
                <div>
                  <label className="text-[10px] tracking-[0.3em] text-bone/50">MESSAGE_PAYLOAD</label>
                  <textarea data-testid={CONTACT.message} value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} rows={5} placeholder="describe the mission..." className="mt-2 w-full bg-surface border border-panel focus:border-ember focus:outline-none text-bone text-sm p-3 font-mono placeholder:text-bone/30 transition-colors" />
                </div>
              </Reveal.Item>
              <Reveal.Item variant="float">
                <div className="flex items-center justify-between pt-2">
                  <div className="text-[10px] tracking-[0.25em] text-bone/40">{form.message.length} CHARS</div>
                  <button type="submit" disabled={submitting} data-testid={CONTACT.submit} data-magnetic className="inline-flex items-center gap-3 px-6 py-3 bg-ember text-void font-mono text-xs tracking-[0.25em] hover:bg-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{submitting?'TRANSMITTING...':'▶ SEND_PACKET'}</button>
                </div>
              </Reveal.Item>
            </Reveal.Group>
          </form>
        </Reveal>
      </div>
      <Reveal variant="float" delay={0.5} as="div" className="mt-16 pt-8 border-t border-panel flex items-center justify-between text-[10px] tracking-[0.3em] text-bone/40 flex-wrap gap-3"><span>PRD_v1.0 · PATTRADHARA.DEV · EMBER_FORGE</span><span className="text-ember">READY_TO_BUILD</span></Reveal>
    </section>
  );
}

function Field({ id, label, type='text', value, onChange, placeholder, testId }) {
  return (<div><label htmlFor={id} className="text-[10px] tracking-[0.3em] text-bone/50">{label}</label><input id={id} data-testid={testId} type={type} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="mt-2 w-full bg-surface border border-panel focus:border-ember focus:outline-none text-bone text-sm p-3 font-mono placeholder:text-bone/30 transition-colors" /></div>);
}
