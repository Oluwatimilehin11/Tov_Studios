import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Import your logo image from the assets folder
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
        // 0.15 controls the fluid lag delay. 
        // Lower numbers make it looser, higher numbers make it tighter.
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

// ── STICKY NAVIGATION COMPONENT ──
const Navigation = ({ scrollToSection, refs }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="nav-logo-container" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={logoImg} alt="Tov Studios Logo" className="nav-logo-img" />
      </div>

      <ul className="nav-links">
        <li onClick={() => scrollToSection(refs.about)} style={{ cursor: 'pointer' }}>About</li>
        <li onClick={() => scrollToSection(refs.gallery)} style={{ cursor: 'pointer' }}>Gallery</li>
        <li onClick={() => scrollToSection(refs.pricing)} style={{ cursor: 'pointer' }}>Pricing</li>
        <li onClick={() => scrollToSection(refs.enquiry)} style={{ cursor: 'pointer' }}>Availability</li>
      </ul>
      <button onClick={() => scrollToSection(refs.enquiry)} className="nav-cta" style={{ border: 'none', cursor: 'pointer' }}>Book a Session</button>
    </nav>
  );
};

// ── MAIN APPLICATION LANDING ──
export default function App() {
  // References for vertical landing anchors
  const aboutRef = React.useRef(null);
  const galleryRef = React.useRef(null);
  const pricingRef = React.useRef(null);
  const enquiryRef = React.useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 80,
      behavior: 'smooth',
    });
  };

  return (
    <Router>
      <CustomCursor />
      <Navigation scrollToSection={scrollToSection} refs={{ about: aboutRef, gallery: galleryRef, pricing: pricingRef, enquiry: enquiryRef }} />

      {/* HERO SECTION */}
      <header style={{ padding: '12rem 6rem 8rem 6rem', background: '#f7f3ec', minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885', display: 'block', marginBottom: '1.5rem' }}>
            Photography with Purpose
          </span>
          <h1 style={{ fontFamily: 'serif', fontSize: '5rem', color: '#2c4a35', lineHeight: '1.1', marginBottom: '2.5rem', fontWeight: 'normal' }}>
            See yourself through a <em style={{ fontStyle: 'italic', fontFamily: 'serif' }}>good</em> lens.
          </h1>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#4a5e4e', maxWidth: '55ch', marginBottom: '3.5rem', fontFamily: 'serif' }}>
            At Tov Studios, every portrait is an act of affirmation. We capture who you truly are—confident, valuable, and beautifully made.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button onClick={() => scrollToSection(enquiryRef)} style={{ background: '#2c4a35', color: '#fff', border: 'none', padding: '1.2rem 2.5rem', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', cursor: 'pointer' }}>
              Book a Session
            </button>
            <div onClick={() => scrollToSection(galleryRef)} style={{ color: '#2c4a35', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
              ↓ View Work
            </div>
          </div>
        </div>
      </header>

      {/* ── LUXURY EDITORIAL ABOUT SECTION (JULIA & GIL STYLE) ── */}
      <section ref={aboutRef} style={{ padding: '12rem 6rem', background: '#ffffff', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Asymmetric Split Intro */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'start', marginBottom: '8rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: '#a39885', display: 'block', marginBottom: '1.5rem' }}>
                01 / The Manifesto
              </span>
              <h2 style={{ fontFamily: 'serif', fontSize: '4rem', color: '#2c4a35', lineHeight: '1.1', fontWeight: 'normal', margin: 0 }}>
                More than a <br /><span className="serif-italic">photograph.</span>
              </h2>
            </div>
            
            <div style={{ marginTop: '2.5rem' }}>
              <p style={{ fontSize: '1.4rem', lineHeight: '1.9', color: '#2c4a35', fontFamily: 'serif', margin: '0 0 2rem 0', fontWeight: 'normal' }}>
                The name <strong>Tov</strong> comes from a Hebrew word meaning <em>good, pleasant, and fit for a purpose</em>. That meaning is at the heart of everything we do.
              </p>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: '#7a7060', margin: 0 }}>
                We want every person who steps in front of our camera to see themselves through that lens—confident, valuable, and beautifully made. Photography isn't about stiff poses or forced smiles. It’s about holding space for your real, unforced history.
              </p>
            </div>
          </div>

          <div className="editorial-line"></div>

          {/* Asymmetrical Overlapping Core Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', marginTop: '6rem' }}>
            
            {/* Pillar 1 */}
            <div style={{ gridColumn: '1 / span 5', paddingRight: '2rem', marginBottom: '4rem' }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>✦ Intentional</span>
              <p style={{ color: '#7a7060', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
                Every single frame is composed with absolute care and deep meaning. We don't just click buttons; we plan the emotional landscape of your frame.
              </p>
            </div>

            {/* Pillar 2 - Offset vertically */}
            <div style={{ gridColumn: '7 / span 5', paddingTop: '4rem', paddingLeft: '2rem', marginBottom: '4rem' }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>◈ Affirming</span>
              <p style={{ color: '#7a7060', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
                We design an environment where you feel safe, calm, and fully seen. Your experience behind the lens matters just as much as the print.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ gridColumn: '2 / span 5', paddingRight: '2rem' }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>◇ Authentic</span>
              <p style={{ color: '#7a7060', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
                No rigid rules. Real moments, true raw expressions, and the absolute real version of you anchor our work.
              </p>
            </div>

            {/* Pillar 4 - Offset vertically */}
            <div style={{ gridColumn: '8 / span 5', paddingTop: '4rem', paddingLeft: '2rem' }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>❈ Purposeful</span>
              <p style={{ color: '#7a7060', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
                Documenting life transitions with a layout meant to outlast passing trends. Art made to remind you of your worth forever.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* MOMENTS PRESERVED / GALLERY IMAGES SECTION */}
      <section ref={galleryRef} style={{ padding: '10rem 6rem', background: '#f7f3ec' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885' }}>Our Work</span>
          <h2 style={{ fontFamily: 'serif', fontSize: '3.5rem', color: '#2c4a35', marginTop: '0.5rem', marginBottom: '4rem', fontWeight: 'normal' }}>
            Moments preserved
          </h2>

          {/* Editorial Photo Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <div style={{ position: 'relative', background: '#d0caae', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'serif' }}>Wedding</span>
            </div>
            <div style={{ position: 'relative', background: '#b1b69d', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'serif' }}>Portrait</span>
            </div>
            <div style={{ position: 'relative', background: '#bcaf9b', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'serif' }}>Maternity</span>
            </div>
            <div style={{ position: 'relative', background: '#a1a893', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'serif' }}>Graduation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGH-END EDITORIAL PRICING LAYOUT (JULIA & GIL STYLE) ── */}
      <section ref={pricingRef} style={{ padding: '12rem 6rem', background: '#2c4a35', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ maxWidth: '600px', marginBottom: '8rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: '#a39885', display: 'block', marginBottom: '1.5rem' }}>
              02 / The Investment
            </span>
            <h2 style={{ fontFamily: 'serif', fontSize: '4rem', color: '#f7f3ec', lineHeight: '1.1', fontWeight: 'normal', margin: 0 }}>
              Packages <br />& <span className="serif-italic">Rates.</span>
            </h2>
          </div>

          {/* Clean Magazine Style Row-By-Row Pricing */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* TIER 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1.5fr 1fr', gap: '2rem', alignItems: 'start', padding: '3rem 0', borderTop: '1px solid rgba(247, 243, 236, 0.15)' }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.2rem' }}>01</span>
              <div>
                <h3 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'normal', margin: '0 0 1rem 0', color: '#f7f3ec' }}>
                  🌿 Portrait Session
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', margin: 0, maxWidth: '45ch' }}>
                  Individual or small group sessions. Built seamlessly for timeless headshots, professional branding, or private transformations.
                </p>
              </div>
              <ul style={{ color: '#a39885', listStyleType: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.95rem' }}>
                <li>— 1 to 2 Hour Duration</li>
                <li>— 2 Outfit Changes</li>
                <li>— 30+ Curated Digital Prints</li>
              </ul>
              <div style={{ textAlign: 'right', fontFamily: 'serif', fontSize: '1.8rem', color: '#f7f3ec' }}>
                £250
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#a39885', textTransform: 'uppercase', letterSpacing: '0.05rem', marginTop: '0.25rem' }}>From</span>
              </div>
            </div>

            {/* TIER 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1.5fr 1fr', gap: '2rem', alignItems: 'start', padding: '3rem 0', borderTop: '1px solid rgba(247, 243, 236, 0.15)' }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.2rem' }}>02</span>
              <div>
                <h3 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'normal', margin: '0 0 1rem 0', color: '#f7f3ec' }}>
                  🎂 Events & Milestones
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', margin: 0, maxWidth: '45ch' }}>
                  Beautiful preservation for graduations, birthday celebrations, baby showers, or dynamic community moments.
                </p>
              </div>
              <ul style={{ color: '#a39885', listStyleType: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.95rem' }}>
                <li>— Up to 3 Hours Coverage</li>
                <li>— Candid & Posed Curation</li>
                <li>— 60+ High-Res Deliverables</li>
              </ul>
              <div style={{ textAlign: 'right', fontFamily: 'serif', fontSize: '1.8rem', color: '#f7f3ec' }}>
                £400
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#a39885', textTransform: 'uppercase', letterSpacing: '0.05rem', marginTop: '0.25rem' }}>From</span>
              </div>
            </div>

            {/* TIER 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1.5fr 1fr', gap: '2rem', alignItems: 'start', padding: '3rem 0', borderTop: '1px solid rgba(247, 243, 236, 0.15)', borderBottom: '1px solid rgba(247, 243, 236, 0.15)' }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a39885', fontSize: '1.2rem' }}>03</span>
              <div>
                <h3 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'normal', margin: '0 0 1rem 0', color: '#f7f3ec' }}>
                  💍 Wedding & Engagement
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', margin: 0, maxWidth: '45ch' }}>
                  Complete day or half-day luxury documentary storytelling coverage. Formatted beautifully from vows to the late night frames.
                </p>
              </div>
              <ul style={{ color: '#a39885', listStyleType: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.95rem' }}>
                <li>— Full Structural Timeline</li>
                <li>— 48-Hour Sneak Peek Prints</li>
                <li>— 100+ Final Curated Gallery</li>
              </ul>
              <div style={{ textAlign: 'right', fontFamily: 'serif', fontSize: '1.8rem', color: '#f7f3ec' }}>
                £1,200
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#a39885', textTransform: 'uppercase', letterSpacing: '0.05rem', marginTop: '0.25rem' }}>From</span>
              </div>
            </div>

          </div>

          {/* Asymmetric Bespoke Callout Section Below Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.51fr 1fr', gap: '4rem', marginTop: '8rem', alignItems: 'center' }}>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: '1.8', margin: 0 }}>
              Don't see a structure that perfectly mirrors your plans? We offer bespoke customization options where you control the timeline, image volume, and destination boundaries.
            </p>
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => scrollToSection(enquiryRef)} style={{ background: '#f7f3ec', color: '#2c4a35', border: 'none', padding: '1.2rem 2.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1rem', cursor: 'pointer', fontWeight: 'bold' }}>
                Request Custom Blueprint
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* PROCESS INTERMISSION */}
      <section style={{ padding: '10rem 6rem', background: '#f7f3ec', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885' }}>Book a Session</span>
          <h2 style={{ fontFamily: 'serif', fontSize: '3.5rem', color: '#2c4a35', marginTop: '0.5rem', marginBottom: '2.5rem', fontWeight: 'normal' }}>
            Let's create something <em style={{ fontFamily: 'serif' }}>beautiful</em>
          </h2>
          <p style={{ color: '#7a7060', fontSize: '1.15rem', lineHeight: '1.8', margin: 0 }}>
            Booking is simple. Fill in a few details and we'll reach out within 24–48 hours to confirm your session, discuss locations, and answer any questions.
          </p>
        </div>
      </section>

      {/* RESERVE YOUR DATE / ENQUIRY SYSTEM */}
      <section ref={enquiryRef} style={{ padding: '8rem 6rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', border: '1px solid #e0dbd3', padding: '4rem' }}>
          <h2 style={{ fontFamily: 'serif', fontSize: '2.5rem', color: '#2c4a35', marginBottom: '3rem', fontWeight: 'normal', textAlign: 'center' }}>
            Reserve Your Date
          </h2>
          
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
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

            <button type="submit" style={{ background: '#2c4a35', color: '#fff', border: 'none', padding: '1.2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1rem', marginTop: '1rem', cursor: 'pointer' }}>
              Submit Booking Request
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '6rem', background: '#2c4a35', color: '#fff', borderTop: '1px solid rgba(247, 243, 236, 0.1)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'serif', fontSize: '2rem', marginBottom: '0.5rem' }}>Tov Studios</div>
        <div style={{ color: '#a39885', fontSize: '0.9rem', marginBottom: '3rem', fontStyle: 'italic' }}>Good. Pleasant. Fit for a purpose.</div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(247, 243, 236, 0.4)' }}>
          © {new Date().getFullYear()} Tov Studios. All rights reserved.
        </div>
      </footer>
    </Router>
  );
}