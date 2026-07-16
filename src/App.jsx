import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  // Assuming these are defined at the top of your component
  const [isMobile, setIsMobile] = useState(false); 
  const enquiryRef = React.useRef(null);

  // React state to handle showing the success message locally after submit
  const [submitted, setSubmitted] = useState(false);

  // We detect when the native browser form submits to toggle our local success state
  const handleSubmit = (e) => {
    setSubmitted(true);
  };

  return (
    <Router>
      {/* ... Your other sections, navigation, and portfolio sections go here ... */}

      {/* RESERVATION FORM SYSTEM */}
      <section ref={enquiryRef} style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 6rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', border: '1px solid #e0dbd3', padding: isMobile ? '2rem 1.5rem' : '4rem' }}>
          <h2 style={{ fontFamily: 'serif', fontSize: '2rem', color: '#2c4a35', marginBottom: '2.5rem', fontWeight: 'normal', textAlign: 'center' }}>
            Reserve Your Date
          </h2>

          {submitted ? (
            <div style={{ 
              background: '#e2ede4', 
              padding: '2.5rem', 
              borderLeft: '4px solid #2c4a35',
              color: '#2c4a35',
              textAlign: 'center'
            }}>
              <h3 style={{ fontFamily: 'serif', margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>Thank You</h3>
              <p style={{ margin: 0, color: '#4a5e4e', lineHeight: '1.5' }}>
                Your booking request has been securely sent! We will review your preferred date and get back to your email within 24 hours.
              </p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              action="https://formspree.io/f/xlgqgvrn" 
              method="POST" 
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                  First Name
                  <input required type="text" name="firstName" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                  Last Name
                  <input required type="text" name="lastName" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }} />
                </label>
              </div>
              <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                Email Address
                <input required type="email" name="email" placeholder="hello@example.com" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                Preferred Date
                <input required type="date" name="preferredDate" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }} />
              </label>

              {/* PACKAGE SELECTOR DROPDOWN */}
              <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                Select Session Package
                <select name="sessionPackage" style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec', color: '#4a5e4e' }}>
                  <option value="mini">Mini Session — £90 (30 mins)</option>
                  <option value="standard-1h">Standard Session — £150 (1 Hour)</option>
                  <option value="standard-2h">Standard Session — £250 (2 Hours)</option>
                  <option value="premium-3-4h">Premium Session — £350 (3 - 4 Hours)</option>
                  <option value="premium-5h">Premium Session — £400 (5 Hours)</option>
                  <option value="full-day">Full Day Session — £600</option>
                  <option value="bespoke">Bespoke / Custom Quote request</option>
                </select>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', color: '#2c4a35', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                Anything Else? (Optional)
                <textarea name="notes" rows="4" placeholder="Tell us about your preferred location, vision, or notes..." style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid #cbd5e1', background: '#f7f3ec' }}></textarea>
              </label>
              <button type="submit" style={{ background: '#2c4a35', color: '#fff', border: 'none', padding: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1rem', marginTop: '1rem', cursor: 'pointer' }}>
                Submit Booking Request
              </button>
            </form>
          )}
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