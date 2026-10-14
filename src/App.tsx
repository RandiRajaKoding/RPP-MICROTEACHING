import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Module from './components/Module';
import Simulation from './components/Simulation';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  useEffect(() => {
    // Add smooth scrolling to all links
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const elem = document.querySelector(targetId);
          if (elem) {
            elem.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <section id="beranda">
          <Hero />
        </section>
        
        <section id="materi">
          <Module />
        </section>
        
        <section id="simulasi">
          <Simulation />
        </section>
        
        <section id="galeri">
          <Gallery />
        </section>
      </main>
      <footer className="footer glass-panel">
        <div className="container">
          <p>&copy; 2026 Simulasi Detektif Siber - Dampak Sosial Informatika SMA. Dibuat untuk pembelajaran interaktif.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
