import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components
import About from './pages/About';
import Gallery from './pages/Gallery';
import Enquiry from './pages/Enquiry';

// Import your logo image from the assets folder
import logoImg from './assets/Tovo_logo.jpg'; 

// Placeholder components for Home and Pricing 
const Home = () => (
  <section style={{ padding: '8rem 6rem', minHeight: '80vh' }}>
    <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '4rem', color: 'var(--forest)' }}>
      See yourself through a <em>good</em> lens.
    </h1>
  </section>
);

const Pricing = () => (
  <section style={{ padding: '7rem 6rem' }}>
    <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '3rem' }}>Packages & Pricing</h2>
  </section>
);

// ── CUSTOM CURSOR COMPONENT ──
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let idx = requestAnimationFrame(function animate() {
      setRingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.12,
        y: prev.y + (position.y - prev.y) * 0.12,
      }));
      idx = requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(idx);
  }, [position]);

  return (
    <>
      <div className="cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }}></div>
      <div className="cursor-ring" style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px` }}></div>
    </>
  );
};

// ── STICKY NAVIGATION COMPONENT (WITH LOGO IMAGE) ──
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <Link to="/" className="nav-logo-container">
        <img src={logoImg} alt="Tov Studios Logo" className="nav-logo-img" />
      </Link>

      <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/enquiry">Availability</Link></li>
      </ul>
      <Link to="/enquiry" className="nav-cta">Book a Session</Link>
    </nav>
  );
};

// ── MAIN APP WRAPPER ──
export default function App() {
  return (
    <Router>
      <CustomCursor />
      <Navigation />

      <main style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/enquiry" element={<Enquiry />} />
        </Routes>
      </main>

      <footer>
        <div>
          <div className="footer-logo">Tov<span>.</span>Studios</div>
          <div className="footer-tagline">Good. Pleasant. Fit for a purpose.</div>
        </div>
      </footer>
    </Router>
  );
}