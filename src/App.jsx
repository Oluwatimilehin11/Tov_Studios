import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// Import your logo image from the assets folder
import logoImg from './assets/Tovo_logo.jpg'; 

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

      {/* OUR STORY / ABOUT SECTION */}
      <section ref={aboutRef} style={{ padding: '10rem 6rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885' }}>Our Story</span>
          <h2 style={{ fontFamily: 'serif', fontSize: '3.5rem', color: '#2c4a35', marginTop: '0.5rem', marginBottom: '3.3rem', fontWeight: 'normal' }}>
            More than a photograph
          </h2>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.9', color: '#4a5e4e', fontFamily: 'serif', marginBottom: '2.5rem' }}>
            The name <strong>Tov</strong> comes from a Hebrew word meaning <em>good, pleasant, and fit for a purpose</em>. That meaning is at the heart of everything we do. We want every person who steps in front of our camera to see themselves through that lens confident, valuable, and beautifully made.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: '#7a7060', marginBottom: '5rem' }}>
            Photography is more than taking pictures. It's about capturing people in a way that reminds them of their worth and allows their true personality to shine. Whether it's a wedding, a milestone birthday, or a quiet portrait — we hold space for your story.
          </p>

          {/* Philosophy Core Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            <div style={{ border: '1px solid #e0dbd3', padding: '2.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>✦</div>
              <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', color: '#2c4a35', marginBottom: '0.75rem', fontWeight: 'normal' }}>Intentional</h3>
              <p style={{ color: '#7a7060', lineHeight: '1.7' }}>Every frame is composed with care and meaning.</p>
            </div>
            <div style={{ border: '1px solid #e0dbd3', padding: '2.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>◈</div>
              <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', color: '#2c4a35', marginBottom: '0.75rem', fontWeight: 'normal' }}>Affirming</h3>
              <p style={{ color: '#7a7060', lineHeight: '1.7' }}>We create space where you feel safe and seen.</p>
            </div>
            <div style={{ border: '1px solid #e0dbd3', padding: '2.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>◇</div>
              <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', color: '#2c4a35', marginBottom: '0.75rem', fontWeight: 'normal' }}>Authentic</h3>
              <p style={{ color: '#7a7060', lineHeight: '1.7' }}>Real moments, real emotion, real you.</p>
            </div>
            <div style={{ border: '1px solid #e0dbd3', padding: '2.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>❈</div>
              <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', color: '#2c4a35', marginBottom: '0.75rem', fontWeight: 'normal' }}>Purposeful</h3>
              <p style={{ color: '#7a7060', lineHeight: '1.7' }}>Photography that reminds you of your worth.</p>
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

      {/* PACKAGES & RATES SECTION (VERTICAL VIDEO MATCH) */}
      <section ref={pricingRef} style={{ padding: '10rem 6rem', background: '#2c4a35', color: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885' }}>Investment</span>
          <h2 style={{ fontFamily: 'serif', fontSize: '3.5rem', color: '#f7f3ec', marginTop: '0.5rem', marginBottom: '5rem', fontWeight: 'normal' }}>
            Packages & Pricing
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {/* TIER 1 */}
            <div style={{ borderBottom: '1px solid rgba(247, 243, 236, 0.2)', paddingBottom: '4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', color: '#a39885', display: 'block', marginBottom: '0.5rem', fontFamily: 'serif' }}>01</span>
                  <h3 style={{ fontFamily: 'serif', fontSize: '2.2rem', fontWeight: 'normal', margin: 0 }}>
                    🌿 Portrait Session
                  </h3>
                </div>
                <div style={{ fontSize: '1.8rem', fontFamily: 'serif', color: '#f7f3ec' }}>£250 <span style={{ fontSize: '0.85rem', color: '#a39885', textTransform: 'uppercase' }}>Starting From</span></div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '70ch', lineHeight: '1.8', margin: 0 }}>
                Individual or small group portraits. Perfect for headshots, personal branding, or a moment just for you. Includes 1–2 hour session, 2 outfit changes, and a curated gallery of 30+ edited images.
              </p>
            </div>

            {/* TIER 2 */}
            <div style={{ borderBottom: '1px solid rgba(247, 243, 236, 0.2)', paddingBottom: '4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', color: '#a39885', display: 'block', marginBottom: '0.5rem', fontFamily: 'serif' }}>02</span>
                  <h3 style={{ fontFamily: 'serif', fontSize: '2.2rem', fontWeight: 'normal', margin: 0 }}>
                    🎂 Events & Milestones
                  </h3>
                </div>
                <div style={{ fontSize: '1.8rem', fontFamily: 'serif', color: '#f7f3ec' }}>£400 <span style={{ fontSize: '0.85rem', color: '#a39885', textTransform: 'uppercase' }}>Starting From</span></div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '70ch', lineHeight: '1.8', margin: 0 }}>
                Birthdays, graduations, baby showers, gender reveals & more. Full event coverage up to 3 hours, candid and posed shots, 60+ edited images, and a secure online delivery gallery.
              </p>
            </div>

            {/* TIER 3 */}
            <div style={{ borderBottom: '1px solid rgba(247, 243, 236, 0.2)', paddingBottom: '4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', color: '#a39885', display: 'block', marginBottom: '0.5rem', fontFamily: 'serif' }}>03</span>
                  <h3 style={{ fontFamily: 'serif', fontSize: '2.2rem', fontWeight: 'normal', margin: 0 }}>
                    💍 Wedding & Engagement
                  </h3>
                </div>
                <div style={{ fontSize: '1.8rem', fontFamily: 'serif', color: '#f7f3ec' }}>£1,200 <span style={{ fontSize: '0.85rem', color: '#a39885', textTransform: 'uppercase' }}>Starting From</span></div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '70ch', lineHeight: '1.8', margin: 0 }}>
                Full-day or half-day wedding coverage. Engagement sessions, ceremony, reception. 100+ edited gallery images, sneak peeks within 48 hours, and full delivery in 4 weeks.
              </p>
            </div>

            {/* BESPOKE BUILDER CALLOUT */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(247, 243, 236, 0.05)', padding: '3rem' }}>
              <div>
                <h4 style={{ fontFamily: 'serif', fontSize: '1.8rem', fontWeight: 'normal', margin: '0 0 0.5rem 0' }}>Need something tailored?</h4>
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: '1rem' }}>Every story is unique. Let's build a custom package around your specific vision, timeline, and budget.</p>
              </div>
              <button onClick={() => scrollToSection(enquiryRef)} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '1rem 2rem', textTransform: 'uppercase', letterSpacing: '0.05rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                Get a Custom Quote
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