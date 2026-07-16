import React, { useState } from 'react';

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Portraits',
    date: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send data to Formspree using fetch so your styled success state still triggers!
    try {
      const response = await fetch('https://formspree.io/f/xlgqgvrn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form. Please try again.");
    }
  };

  return (
    <section style={{ 
      padding: '7rem 6rem', 
      background: '#f7f3ec', 
      minHeight: '85vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '5rem',
      alignItems: 'start'
    }}>
      
      {/* ── LEFT COLUMN: THE BOOKING ENGINE ── */}
      <div>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'serif', fontSize: '3.5rem', color: '#2c4a35', margin: 0 }}>
            Request a Session
          </h2>
          <p style={{ color: '#7a7060', fontSize: '1.1rem', marginTop: '0.5rem' }}>
            Let’s frame your moments with purpose. Fill out the details below to check calendar availability.
          </p>
        </div>

        {submitted ? (
          <div style={{ 
            background: '#e2ede4', 
            padding: '2.5rem', 
            borderLeft: '4px solid #2c4a35',
            color: '#2c4a35' 
          }}>
            <h3 style={{ fontFamily: 'serif', margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>Thank You</h3>
            <p style={{ margin: 0, color: '#4a5e4e', lineHeight: '1.5' }}>
              Your enquiry has been securely logged. We will review the requested date and get back to your inbox within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            
            {/* Full Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: '#7a7060' }}>Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{ padding: '1rem', border: '1px solid #dcd6cd', background: '#fff', fontSize: '1rem', color: '#2c4a35' }}
              />
            </div>

            {/* Email Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: '#7a7060' }}>Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ padding: '1rem', border: '1px solid #dcd6cd', background: '#fff', fontSize: '1rem', color: '#2c4a35' }}
              />
            </div>

            {/* Session Focus Category Dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: '#7a7060' }}>Session Focus</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{ padding: '1rem', border: '1px solid #dcd6cd', background: '#fff', fontSize: '1rem', color: '#2c4a35', cursor: 'pointer' }}
              >
                <option value="Portraits">Portraits</option>
                <option value="Events">Events</option>
                <option value="Milestones">Milestones</option>
                <option value="Nature Pictures">Nature Pictures</option>
                <option value="Custom Build">Custom Bespoke Build</option>
              </select>
            </div>

            {/* Preferred Date */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: '#7a7060' }}>Preferred Date</label>
              <input 
                type="date" 
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                style={{ padding: '1rem', border: '1px solid #dcd6cd', background: '#fff', fontSize: '1rem', color: '#2c4a35', fontFamily: 'sans-serif' }}
              />
            </div>

            {/* Additional Project Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: '#7a7060' }}>Vision & Additional Details</label>
              <textarea 
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell us about your creative goals, budget targets, or timeline constraints..."
                style={{ padding: '1rem', border: '1px solid #dcd6cd', background: '#fff', fontSize: '1rem', color: '#2c4a35', resize: 'vertical', fontFamily: 'sans-serif' }}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              style={{
                background: '#2c4a35',
                color: '#fff',
                border: 'none',
                padding: '1.2rem',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1rem',
                cursor: 'pointer',
                marginTop: '0.5rem',
                transition: 'background 0.3s ease'
              }}
            >
              Send Enquiry
            </button>
          </form>
        )}
      </div>

      {/* ── RIGHT COLUMN: STUDIO RULES & PHILOSOPHY ── */}
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        <div>
          <h4 style={{ fontFamily: 'serif', fontSize: '1.6rem', color: '#2c4a35', margin: '0 0 1rem 0' }}>
            Availability Notes
          </h4>
          <p style={{ color: '#7a7060', lineHeight: '1.7', margin: 0 }}>
            To preserve the highest intentional standard of production, custom lighting setup, and editing workflow, we accept a selective amount of creative client bookings each month. 
          </p>
        </div>

        <div style={{ borderTop: '1px solid #dcd6cd', paddingTop: '2rem' }}>
          <h4 style={{ fontFamily: 'serif', fontSize: '1.2rem', color: '#2c4a35', margin: '0 0 0.8rem 0', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
            Turnaround Windows
          </h4>
          <ul style={{ color: '#7a7060', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', lineHeight: '1.5' }}>
            <li><strong>Portraits & Nature Focus:</strong> 5–7 business days</li>
            <li><strong>Milestones & Corporate Events:</strong> 10–14 business days</li>
            <li>All packages include private, authenticated digital vault proofing galleries.</li>
          </ul>
        </div>

        <div style={{ background: '#e0dbd3', padding: '2rem' }}>
          <h4 style={{ fontFamily: 'serif', fontSize: '1.3rem', color: '#2c4a35', margin: '0 0 0.5rem 0' }}>
            Studio Policy
          </h4>
          <p style={{ color: '#7a7060', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            Securing calendar space requires confirmed confirmation. Dates requested through this portal are held temporarily for a 24-hour consideration sequence while initial email consulting occurs.
          </p>
        </div>

      </div>
    </section>
  );
}