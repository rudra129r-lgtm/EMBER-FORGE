import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import '@/App.css';
import SmoothScroll from '@/components/portfolio/SmoothScroll';
import MagneticCursor from '@/components/portfolio/MagneticCursor';
import BootSequence from '@/components/portfolio/BootSequence';
import PersistentHUD from '@/components/portfolio/PersistentHUD';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Experience from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';
function Portfolio() {
  const [booted, setBooted] = useState(false);
  useEffect(() => { if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }, [booted]);
  return (
    <div className="relative bg-void min-h-screen text-bone grain scanlines">
      <BootSequence onDone={() => setBooted(true)} />
      {booted && (
        <>
          <SmoothScroll />
          <MagneticCursor />
          <PersistentHUD />
          <main className="relative">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#141414', border: '1px solid #1C1C1C', color: '#F2E8DC',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.05em',
              },
            }}
          />
        </>
      )}
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
