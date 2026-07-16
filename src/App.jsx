import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import logoImg from './assets/Tovo_logo.jpg'; 

// ── INERTIA CURSOR TRACKER ──
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const updateRing = () => {
      setRingPosition((prev) => {
        const easeFactor = 0.15; 
        const nextX = prev.x + (position.x - prev.x) * easeFactor;
        const nextY = prev.y + (position.y - prev.y) * easeFactor;
        return { x: nextX, y: nextY };
      });
      animationFrameId = requestAnimationFrame(updateRing);
    };
    animationFrameId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <>
      <div className="custom-cursor-dot" style={{ left: `${position.x}px`, top: `${position.y}px` }}></div>
      <div className="custom-cursor-ring" style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px` }}></div>
    </>
  );
};

// ── NAVIGATION COMPONENT ──
const Navigation = ({ scrollToSection, refs }) => {
  return (
    <nav>
      <div className="nav-logo-container" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={logoImg} alt="Tov Studios Logo" className="nav-logo-img" />
      </div>

      <div className="nav-links-wrapper">
        <ul className="nav-links">
          <li onClick={() => scrollToSection(refs.gallery)} style={{ cursor: 'pointer' }}>Gallery</li>
          <li onClick={() => scrollToSection(refs.about)} style={{ cursor: 'pointer' }}>About</li>
          <li onClick={() => scrollToSection(refs.pricing)} style={{ cursor: 'pointer' }}>Pricing</li>
          <li onClick={() => scrollToSection(refs.enquiry)} style={{ cursor: 'pointer' }}>Availability</li>
        </ul>

        <button onClick={() => scrollToSection(refs.enquiry)} className="nav-cta" style={{ cursor: 'pointer' }}>
          Book a Session
        </button>
      </div>
    </nav>
  );
};

// ── MAIN APPLICATION LANDING ──
export default function App() {
  const aboutRef = React.useRef(null);
  const galleryRef = React.useRef(null);
  const pricingRef = React.useRef(null);
  const enquiryRef = React.useRef(null);

  // Dynamic state hooks to track layout size changes on device orientation swaps
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (elementRef) => {
    const offset = isMobile ? 75 : 90;
    window.scrollTo({
      top: elementRef.current.offsetTop - offset,
      behavior: 'smooth',
    });
  };

  return (
    <Router>
      <CustomCursor />
      <Navigation scrollToSection={scrollToSection} refs={{ about: aboutRef, gallery: galleryRef, pricing: pricingRef, enquiry: enquiryRef }} />

      {/* HERO SECTION */}
      <header style={{ 
        padding: isMobile ? '8rem 1.5rem 5rem 1.5rem' : '15rem 6rem 8rem 6rem', 
        background: '#f7f3ec', 
        minHeight: '85vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
      }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885', display: 'block', marginBottom: '1.5rem' }}>
            Photography with Purpose
          </span>
          <h1 style={{ fontFamily: 'serif', fontSize: isMobile ? '2.8rem' : '5rem', color: '#2c4a35', lineHeight: '1.1', marginBottom: '2.5rem', fontWeight: 'normal' }}>
            See yourself through a <em style={{ fontStyle: 'italic', fontFamily: 'serif' }}>good</em> lens.
          </h1>
          <p style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', lineHeight: '1.8', color: '#4a5e4e', maxWidth: '55ch', marginBottom: '3.5rem', fontFamily: 'serif' }}>
            At Tov Studios, every portrait is an act of affirmation. We capture who you truly are—confident, valuable, and beautifully made.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <button onClick={() => scrollToSection(enquiryRef)} style={{ background: '#2c4a35', color: '#fff', border: 'none', padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', cursor: 'pointer' }}>
              Book a Session
            </button>
            <div onClick={() => scrollToSection(galleryRef)} style={{ color: '#2c4a35', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
              ↓ View Work
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT SECTION (JULIA & GIL STYLE) */}
      <section ref={aboutRef} style={{ padding: isMobile ? '5rem 1.5rem' : '12rem 6rem', background: '#ffffff', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Top layout stacks vertically on phone display columns */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '2rem' : '6rem', alignItems: 'start', marginBottom: isMobile ? '3rem' : '8rem' }}>
            <div style={{ width: isMobile ? '100%' : '45%' }}>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: '#a39885', display: 'block', marginBottom: '1rem' }}>
                01 / The Manifesto
              </span>
              <h2 style={{ fontFamily: 'serif', fontSize: isMobile ? '2.4rem' : '4rem', color: '#2c4a35', lineHeight: '1.1', fontWeight: 'normal', margin: 0 }}>
                More than a <br /><span className="serif-italic">photograph.</span>
              </h2>
            </div>
            
            <div style={{ width: '100%', marginTop: isMobile ? '0' : '2.5rem' }}>
              <p style={{ fontSize: isMobile ? '1.2rem' : '1.4rem', lineHeight: '1.8', color: '#2c4a35', fontFamily: 'serif', margin: '0 0 1.5rem 0' }}>
                The name <strong>Tov</strong> comes from a Hebrew word meaning <em>good, pleasant, and fit for a purpose</em>. That meaning is at the heart of everything we do.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#7a7060', margin: 0 }}>
                We want every person who steps in front of our camera to see themselves through that lens—confident, valuable, and beautifully made. Photography isn't about stiff poses or forced smiles. It’s about holding space for your real, unforced history.
              </p>
            </div>
          </div>

          <div className="editorial-line"></div>

          {/* Core pillars stack cleanly as individual card listings on mobile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '3rem' : '0', position: 'relative', marginTop: '2rem' }}>
            {isMobile ? (
              // Stacking mobile list version
              <>
                <div>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.3rem', display: 'block', marginBottom: '0.5rem' }}>✦ Intentional</span>
                  <p style={{ color: '#7a7060', lineHeight: '1.7', fontSize: '1rem' }}>Every single frame is composed with absolute care and deep meaning. We plan the emotional landscape of your frame.</p>
                </div>
                <div>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.3rem', display: 'block', marginBottom: '0.5rem' }}>◈ Affirming</span>
                  <p style={{ color: '#7a7060', lineHeight: '1.7', fontSize: '1rem' }}>We design an environment where you feel safe, calm, and fully seen. Your experience behind the lens matters.</p>
                </div>
                <div>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.3rem', display: 'block', marginBottom: '0.5rem' }}>◇ Authentic</span>
                  <p style={{ color: '#7a7060', lineHeight: '1.7', fontSize: '1rem' }}>No rigid rules. Real moments, true raw expressions, and the absolute real version of you anchor our work.</p>
                </div>
                <div>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.3rem', display: 'block', marginBottom: '0.5rem' }}>❈ Purposeful</span>
                  <p style={{ color: '#7a7060', lineHeight: '1.7', fontSize: '1rem' }}>Documenting life transitions with a layout meant to outlast passing trends. Art made to remind you of your worth.</p>
                </div>
              </>
            ) : (
              // Asymmetrical desktop layout
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
                <div style={{ gridColumn: '1 / span 5', paddingRight: '2rem', marginBottom: '4rem' }}>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>✦ Intentional</span>
                  <p style={{ color: '#7a7060', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>Every single frame is composed with absolute care and deep meaning. We plan the emotional landscape of your frame.</p>
                </div>
                <div style={{ gridColumn: '7 / span 5', paddingTop: '4rem', paddingLeft: '2rem', marginBottom: '4rem' }}>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>◈ Affirming</span>
                  <p style={{ color: '#7a7060', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>We design an environment where you feel safe, calm, and fully seen. Your experience behind the lens matters.</p>
                </div>
                <div style={{ gridColumn: '2 / span 5', paddingRight: '2rem' }}>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>◇ Authentic</span>
                  <p style={{ color: '#7a7060', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>No rigid rules. Real moments, true raw expressions, and the absolute real version of you anchor our work.</p>
                </div>
                <div style={{ gridColumn: '8 / span 5', paddingTop: '4rem', paddingLeft: '2rem' }}>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>❈ Purposeful</span>
                  <p style={{ color: '#7a7060', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>Documenting life transitions with a layout meant to outlast passing trends. Art made to remind you of your worth.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY IMAGES SECTION */}
      <section ref={galleryRef} style={{ padding: isMobile ? '5rem 1.5rem' : '10rem 6rem', background: '#f7f3ec' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885' }}>Our Work</span>
          <h2 style={{ fontFamily: 'serif', fontSize: isMobile ? '2.4rem' : '3.5rem', color: '#2c4a35', marginTop: '0.5rem', marginBottom: '3rem', fontWeight: 'normal' }}>
            Moments preserved
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div style={{ position: 'relative', background: '#d0caae', minHeight: isMobile ? '350px' : '500px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'serif' }}>Wedding</span>
            </div>
            <div style={{ position: 'relative', background: '#b1b69d', minHeight: isMobile ? '350px' : '500px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'serif' }}>Portrait</span>
            </div>
            <div style={{ position: 'relative', background: '#bcaf9b', minHeight: isMobile ? '350px' : '500px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'serif' }}>Maternity</span>
            </div>
            <div style={{ position: 'relative', background: '#a1a893', minHeight: isMobile ? '350px' : '500px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'serif' }}>Graduation</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION (UPDATED WITH HANDWRITTEN PRICING NOTES) */}
      <section ref={pricingRef} style={{ padding: isMobile ? '5rem 1.5rem' : '12rem 6rem', background: '#2c4a35', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ maxWidth: '600px', marginBottom: isMobile ? '4rem' : '8rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: '#a39885', display: 'block', marginBottom: '1.5rem' }}>
              02 / The Investment
            </span>
            <h2 style={{ fontFamily: 'serif', fontSize: isMobile ? '2.4rem' : '4rem', color: '#f7f3ec', lineHeight: '1.1', fontWeight: 'normal', margin: 0 }}>
              Packages <br />& <span className="serif-italic">Rates.</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* TIER 1: MINI SESSION */}
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              gap: isMobile ? '1rem' : '2rem', 
              padding: '3rem 0', 
              borderTop: '1px solid rgba(247, 243, 236, 0.15)',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', gap: '1.5rem', flex: '1.2' }}>
                <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.2rem' }}>01</span>
                <div>
                  <h3 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'normal', margin: '0 0 1rem 0', color: '#f7f3ec' }}>
                    ⚡ Mini Session
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', margin: 0, maxWidth: '45ch' }}>
                    Quick portraits, profile refreshes, or intimate couples pictures. A streamlined capture session for timeless results.
                  </p>
                </div>
              </div>
              <ul style={{ color: '#a39885', listStyleType: 'none', padding: isMobile ? '0 0 0 2.5rem' : '0', margin: 0, lineHeight: '2', fontSize: '0.95rem', minWidth: '220px' }}>
                <li>— 30 Minutes Duration</li>
                <li>— 5 Professionally Edited Prints</li>
                <li>— Perfect for Portraits & Couples</li>
              </ul>
              <div style={{ textAlign: isMobile ? 'left' : 'right', paddingLeft: isMobile ? '2.5rem' : '0', fontFamily: 'serif', fontSize: '1.8rem', color: '#f7f3ec', minWidth: '150px' }}>
                £90
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#a39885', textTransform: 'uppercase', letterSpacing: '0.05rem', marginTop: '0.25rem' }}>Fixed Rate</span>
              </div>
            </div>

            {/* TIER 2: STANDARD SESSION */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              padding: '3rem 0', 
              borderTop: '1px solid rgba(247, 243, 236, 0.15)'
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                gap: isMobile ? '1rem' : '2rem', 
                justifyContent: 'space-between',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', gap: '1.5rem', flex: '1.2' }}>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.2rem' }}>02</span>
                  <div>
                    <h3 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'normal', margin: '0 0 1rem 0', color: '#f7f3ec' }}>
                      🌿 Standard Session
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', margin: 0, maxWidth: '45ch' }}>
                      Flexible mid-length coverage designed for social events, birthdays, bridal showers, baby dedications, or comprehensive couple work.
                    </p>
                  </div>
                </div>
                <div style={{ color: '#a39885', fontSize: '0.95rem', minWidth: '220px', paddingLeft: isMobile ? '2.5rem' : '0' }}>
                  <span style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Options Available:</span>
                  <div style={{ color: '#f7f3ec', lineHeight: '1.8' }}>
                    • 1-Hour Coverage<br />
                    • 2-Hour Coverage
                  </div>
                </div>
                <div style={{ textAlign: isMobile ? 'left' : 'right', paddingLeft: isMobile ? '2.5rem' : '0', fontFamily: 'serif', fontSize: '1.8rem', color: '#f7f3ec', minWidth: '150px' }}>
                  £150 – £250
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#a39885', textTransform: 'uppercase', letterSpacing: '0.05rem', marginTop: '0.25rem' }}>Range</span>
                </div>
              </div>

              {/* Nested Standard Sub-tiers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: isMobile ? '2.5rem' : '3.5rem', background: 'rgba(247, 243, 236, 0.03)', padding: '2rem', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(247, 243, 236, 0.08)', paddingBottom: '1rem' }}>
                  <div>
                    <strong style={{ color: '#f7f3ec', display: 'block', fontFamily: 'serif', fontSize: '1.15rem' }}>Option A: 1-Hour Session</strong>
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Great for quick events, family dinners, birthdays, and couple portraits.</span>
                  </div>
                  <div style={{ textAlign: isMobile ? 'left' : 'right', minWidth: '120px' }}>
                    <span style={{ color: '#a39885', fontSize: '0.95rem', display: 'block' }}>10 Edited Pictures</span>
                    <strong style={{ color: '#f7f3ec', fontSize: '1.25rem' }}>£150</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong style={{ color: '#f7f3ec', display: 'block', fontFamily: 'serif', fontSize: '1.15rem' }}>Option B: 2-Hour Session</strong>
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Perfect for dedicated birthday parties, bridal showers, and baby dedications.</span>
                  </div>
                  <div style={{ textAlign: isMobile ? 'left' : 'right', minWidth: '120px' }}>
                    <span style={{ color: '#a39885', fontSize: '0.95rem', display: 'block' }}>30 Edited Pictures</span>
                    <strong style={{ color: '#f7f3ec', fontSize: '1.25rem' }}>£250</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* TIER 3: PREMIUM SESSION */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              padding: '3rem 0', 
              borderTop: '1px solid rgba(247, 243, 236, 0.15)'
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                gap: isMobile ? '1rem' : '2rem', 
                justifyContent: 'space-between',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', gap: '1.5rem', flex: '1.2' }}>
                  <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.2rem' }}>03</span>
                  <div>
                    <h3 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'normal', margin: '0 0 1rem 0', color: '#f7f3ec' }}>
                      👑 Premium Session
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', margin: 0, maxWidth: '45ch' }}>
                      Deep editorial production, extensive event coverage, and premium creative styling assets built to stand out.
                    </p>
                  </div>
                </div>
                <div style={{ color: '#a39885', fontSize: '0.95rem', minWidth: '220px', paddingLeft: isMobile ? '2.5rem' : '0' }}>
                  <span style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Coverage:</span>
                  <div style={{ color: '#f7f3ec', lineHeight: '1.8' }}>
                    • 3 to 4 Hours<br />
                    • 5 Hours
                  </div>
                </div>
                <div style={{ textAlign: isMobile ? 'left' : 'right', paddingLeft: isMobile ? '2.5rem' : '0', fontFamily: 'serif', fontSize: '1.8rem', color: '#f7f3ec', minWidth: '150px' }}>
                  £350 – £400
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#a39885', textTransform: 'uppercase', letterSpacing: '0.05rem', marginTop: '0.25rem' }}>Range</span>
                </div>
              </div>

              {/* Nested Premium Sub-tiers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: isMobile ? '2.5rem' : '3.5rem', background: 'rgba(247, 243, 236, 0.03)', padding: '2rem', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(247, 243, 236, 0.08)', paddingBottom: '1rem' }}>
                  <div>
                    <strong style={{ color: '#f7f3ec', display: 'block', fontFamily: 'serif', fontSize: '1.15rem' }}>Option A: 3 to 4 Hours</strong>
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Ideal for comprehensive event modules, weddings, or stylized visual campaigns.</span>
                  </div>
                  <div style={{ textAlign: isMobile ? 'left' : 'right', minWidth: '120px' }}>
                    <span style={{ color: '#a39885', fontSize: '0.95rem', display: 'block' }}>35 to 40 Edited Pictures</span>
                    <strong style={{ color: '#f7f3ec', fontSize: '1.25rem' }}>£350</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong style={{ color: '#f7f3ec', display: 'block', fontFamily: 'serif', fontSize: '1.15rem' }}>Option B: 5 Hours</strong>
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Complete, long-form documentary asset gathering for extended milestones.</span>
                  </div>
                  <div style={{ textAlign: isMobile ? 'left' : 'right', minWidth: '120px' }}>
                    <span style={{ color: '#a39885', fontSize: '0.95rem', display: 'block' }}>50 Edited Pictures</span>
                    <strong style={{ color: '#f7f3ec', fontSize: '1.25rem' }}>£400</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* TIER 4: 1 DAY PHOTOGRAPHY SESSION */}
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              gap: isMobile ? '1rem' : '2rem', 
              padding: '3rem 0', 
              borderTop: '1px solid rgba(247, 243, 236, 0.15)',
              borderBottom: '1px solid rgba(247, 243, 236, 0.15)',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', gap: '1.5rem', flex: '1.2' }}>
                <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.2rem' }}>04</span>
                <div>
                  <h3 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'normal', margin: '0 0 1rem 0', color: '#f7f3ec' }}>
                    🎬 Full Day Session
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', margin: 0, maxWidth: '45ch' }}>
                    Full structural timeline coverage. Ideal for complete wedding narratives, brand catalogs, or absolute day-long editorial events.
                  </p>
                </div>
              </div>
              <ul style={{ color: '#a39885', listStyleType: 'none', padding: isMobile ? '0 0 0 2.5rem' : '0', margin: 0, lineHeight: '2', fontSize: '0.95rem', minWidth: '220px' }}>
                <li>— Extensive All-Day Coverage</li>
                <li>— Custom Curated Layout Plan</li>
                <li>— Max Edited Image Delivery Bundle</li>
              </ul>
              <div style={{ textAlign: isMobile ? 'left' : 'right', paddingLeft: isMobile ? '2.5rem' : '0', fontFamily: 'serif', fontSize: '1.8rem', color: '#f7f3ec', minWidth: '150px' }}>
                £600
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#a39885', textTransform: 'uppercase', letterSpacing: '0.05rem', marginTop: '0.25rem' }}>Fixed Rate</span>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2rem', marginTop: '5rem', alignItems: isMobile ? 'start' : 'center', justifyContent: 'space-between' }}>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', margin: 0, maxWidth: '60ch' }}>
              Don't see a structure that perfectly mirrors your plans? We offer custom quotes.
            </p>
            <button onClick={() => scrollToSection(enquiryRef)} style={{ background: '#f7f3ec', color: '#2c4a35', border: 'none', padding: '1rem 2rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1rem', cursor: 'pointer', fontWeight: 'bold', width: isMobile ? '100%' : 'auto' }}>
              Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* PROCESS INTERMISSION */}
      <section style={{ padding: isMobile ? '4rem 1.5rem' : '10rem 6rem', background: '#f7f3ec', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885' }}>Book a Session</span>
          <h2 style={{ fontFamily: 'serif', fontSize: isMobile ? '2.2rem' : '3.5rem', color: '#2c4a35', marginTop: '0.5rem', marginBottom: '2rem', fontWeight: 'normal' }}>
            Let's create something <em style={{ fontFamily: 'serif' }}>beautiful</em>
          </h2>
          <p style={{ color: '#7a7060', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
            Booking is simple. Fill in a few details and we'll reach out within 24–48 hours to confirm your session, discuss locations, and answer any questions.
          </p>
        </div>
      </section>

      {/* RESERVATION FORM SYSTEM */}
      <section ref={enquiryRef} style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 6rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', border: '1px solid #e0dbd3', padding: isMobile ? '2rem 1.5rem' : '4rem' }}>
          <h2 style={{ fontFamily: 'serif', fontSize: '2rem', color: '#2c4a35', marginBottom: '2.5rem', fontWeight: 'normal', textAlign: 'center' }}>
            Reserve Your Date
          </h2>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                First Name
                <input type="text" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                Last Name
                <input type="text" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }} />
              </label>
            </div>
            <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
              Email Address
              <input type="email" placeholder="hello@example.com" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
              Preferred Date
              <input type="date" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
              Preferred Location
              <select style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec', color: '#4a5e4e' }}>
                <option>Outdoor / Natural Setting</option>
                <option>Studio (Indoor)</option>
                <option>Client's Home</option>
                <option>Beach / Waterfront</option>
                <option>Urban / City</option>
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
              Anything Else? (Optional)
              <textarea rows="4" placeholder="Tell us about your vision..." style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }}></textarea>
            </label>
            <button type="submit" style={{ background: '#2c4a35', color: '#fff', border: 'none', padding: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1rem', marginTop: '1rem', cursor: 'pointer' }}>
              Submit Booking Request
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: isMobile ? '4rem 1.5rem' : '6rem', background: '#2c4a35', color: '#fff', textAlign: 'center' }}>
        <div style={{ fontFamily: 'serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Tov Studios</div>
        <div style={{ color: '#a39885', fontSize: '0.9rem', marginBottom: '2rem', fontStyle: 'italic' }}>Good. Pleasant. Fit for a purpose.</div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(247, 243, 236, 0.4)' }}>
          © {new Date().getFullYear()} Tov Studios. All rights reserved.
        </div>
      </footer>
    </Router>
  );
}