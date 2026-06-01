import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components
import About from './pages/About';
import Gallery from './pages/Gallery';
import Enquiry from './pages/Enquiry';

// Import your logo image from the assets folder
import logoImg from './assets/Tovo_logo.jpg'; 

// Placeholder components for Home
const Home = () => (
  <section style={{ padding: '8rem 6rem', minHeight: '80vh' }}>
    <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '4rem', color: 'var(--forest)' }}>
      See yourself through a <em>good</em> lens.
    </h1>
  </section>
);

// ── DYNAMIC PRICING COMPONENT (4-TIER MATRIX) ──
const Pricing = () => (
  <section style={{ padding: '7rem 6rem', background: '#f7f3ec' }}>
    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1rem', color: '#a39885' }}>Investment</span>
      <h2 style={{ fontFamily: 'var(--ff-display, serif)', fontSize: '3.5rem', color: '#2c4a35', margin: '0.5rem 0' }}>Packages & Rates</h2>
      <p style={{ color: '#7a7060' }}>Transparent tiers or a tailored experience built entirely by you.</p>
    </div>

    {/* Pricing Cards Grid — Optimized for 4-cards spacing */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '2rem', 
      maxWidth: '1300px', 
      margin: '0 auto' 
    }}>
      
      {/* 1. MINI SESSION */}
      <div style={{ background: '#fff', padding: '2.5rem', border: '1px solid #e0dbd3', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#2c4a35', margin: '0 0 0.5rem 0' }}>Mini Session</h3>
        <p style={{ color: '#a39885', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>Great for social media or quick portraits.</p>
        <div style={{ fontSize: '2rem', fontFamily: 'serif', color: '#2c4a35', marginBottom: '2rem' }}>£50 – £90</div>
        <ul style={{ color: '#7a7060', paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.95rem', flexGrow: 1 }}>
          <li>30 minutes session</li>
          <li>1 location choice</li>
          <li>10 professionally edited photos</li>
        </ul>
        <Link to="/enquiry" style={{ textAlign: 'center', background: '#2c4a35', color: '#fff', textDecoration: 'none', padding: '1rem', marginTop: '2rem', fontSize: '0.9rem', letterSpacing: '0.05rem', textTransform: 'uppercase' }}>Book Mini</Link>
      </div>

      {/* 2. STANDARD SESSION */}
      <div style={{ background: '#fff', padding: '2.5rem', border: '2px solid #2c4a35', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <h3 style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#2c4a35', margin: '0 0 0.5rem 0' }}>Standard Session</h3>
        <p style={{ color: '#a39885', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>The quintessential portfolio build experience.</p>
        <div style={{ fontSize: '2rem', fontFamily: 'serif', color: '#2c4a35', marginBottom: '2rem' }}>£120 – £200</div>
        <ul style={{ color: '#7a7060', paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.95rem', flexGrow: 1 }}>
          <li>1 – 2 hours coverage</li>
          <li>1 – 2 outfit variations</li>
          <li>20 – 30 edited photos</li>
          <li>Light retouching & color grading</li>
        </ul>
        <Link to="/enquiry" style={{ textAlign: 'center', background: '#2c4a35', color: '#fff', textDecoration: 'none', padding: '1rem', marginTop: '2rem', fontSize: '0.9rem', letterSpacing: '0.05rem', textTransform: 'uppercase' }}>Book Standard</Link>
      </div>

      {/* 3. PREMIUM SESSION */}
      <div style={{ background: '#fff', padding: '2.5rem', border: '1px solid #e0dbd3', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#2c4a35', margin: '0 0 0.5rem 0' }}>Premium Session</h3>
        <p style={{ color: '#a39885', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>Complete artistic editorial production.</p>
        <div style={{ fontSize: '2rem', fontFamily: 'serif', color: '#2c4a35', marginBottom: '2rem' }}>£350 – £2500</div>
        <ul style={{ color: '#7a7060', paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.95rem', flexGrow: 1 }}>
          <li>2 – 4 hours complete coverage</li>
          <li>Creative direction & mood board layout</li>
          <li>5+ outfit changes</li>
          <li>40 – 60+ editorial styled photos</li>
          <li>Advanced deep-retouching profile workflow</li>
        </ul>
        <Link to="/enquiry" style={{ textAlign: 'center', background: '#2c4a35', color: '#fff', textDecoration: 'none', padding: '1rem', marginTop: '2rem', fontSize: '0.9rem', letterSpacing: '0.05rem', textTransform: 'uppercase' }}>Book Premium</Link>
      </div>

      {/* 4. CUSTOM BESPOKE BUILDER CARD */}
      <div style={{ background: '#e0dbd3', padding: '2.5rem', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#2c4a35', margin: '0 0 0.5rem 0' }}>Bespoke Build</h3>
        <p style={{ color: '#7a7060', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>Don't see exactly what you need? Design your own custom blueprint.</p>
        <div style={{ fontSize: '2rem', fontFamily: 'serif', color: '#2c4a35', marginBottom: '2rem' }}>Custom Quote</div>
        <ul style={{ color: '#5a5040', paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.95rem', flexGrow: 1, listStyleType: 'square' }}>
          <li>Choose your own timeline duration</li>
          <li>Specify exact image delivery counts</li>
          <li>Tailor specific location numbers</li>
          <li>Perfect for unique concepts or large events</li>
        </ul>
        <Link 
          to="/enquiry" 
          style={{ 
            textAlign: 'center', 
            background: 'transparent', 
            color: '#2c4a35', 
            border: '2px solid #2c4a35',
            textDecoration: 'none', 
            padding: '1rem', 
            marginTop: '2rem', 
            fontSize: '0.9rem', 
            fontWeight: 'bold',
            letterSpacing: '0.05rem', 
            textTransform: 'uppercase',
            transition: 'all 0.3s ease'
          }}
        >
          Build Package
        </Link>
      </div>

    </div>

    {/* Extras Section */}
    <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', background: '#e0dbd3', padding: '2rem', textAlign: 'center' }}>
      <h4 style={{ fontFamily: 'serif', fontSize: '1.3rem', color: '#2c4a35', margin: '0 0 1rem 0' }}>Available Production Add-ons</h4>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem', color: '#7a7060', fontSize: '0.95rem' }}>
        <div><strong>24-Hour Express Delivery:</strong> £30</div>
        <div><strong>Travel Fees:</strong> Calculated dynamically (Based on Uber Fee pricing)</div>
      </div>
    </div>
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

// ── STICKY NAVIGATION COMPONENT ──
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