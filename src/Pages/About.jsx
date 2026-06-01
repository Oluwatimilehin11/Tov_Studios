import React from 'react';

export default function About() {
  return (
    <section style={{ padding: '8rem 6rem', background: '#f7f3ec', minHeight: '80vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Label */}
        <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: '#a39885' }}>
          The Philosophy
        </span>
        
        {/* Main Heading */}
        <h2 style={{ fontFamily: 'serif', fontSize: '3.5rem', color: '#2c4a35', marginTop: '0.5rem', marginBottom: '3rem' }}>
          The Meaning of Tov
        </h2>

        {/* Cleaned Narrative Intro Block */}
        <p style={{ maxWidth: '75ch', fontSize: '1.2rem', lineHeight: '1.9', color: '#4a5e4e', marginBottom: '4rem', fontFamily: 'serif' }}>
          At Tov Studios, the name “Tov” comes from a Hebrew word meaning <strong>good, pleasant, and fit for a purpose</strong>. 
          That meaning is at the heart of everything we do. We want every person who steps in front of our camera 
          to see themselves through that lens confident, valuable, and beautifully made.
        </p>

        {/* Two-Column Philosophy Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', lineHeight: '1.8' }}>
          
          <div>
            <h3 style={{ fontFamily: 'serif', fontSize: '1.6rem', color: '#2c4a35', fontWeight: 'normal', marginBottom: '1rem' }}>
              A Presence That Brings Comfortability
            </h3>
            <p style={{ color: '#7a7060' }}>
              Rigid poses have no place here. We are deeply committed to providing an intentional, relaxed environment during our shoots. By offering a calm presence that brings true comfortability behind the camera, we allow your most natural, unforced self to anchor the frame.
            </p>
          </div>

          <div>
            <h3 style={{ fontFamily: 'serif', fontSize: '1.6rem', color: '#2c4a35', fontWeight: 'normal', marginBottom: '1rem' }}>
              Joy That Lasts Long
            </h3>
            <p style={{ color: '#7a7060' }}>
              We create through love because we care about the experience as much as the final print. Our purpose is rooted in raising awareness of life's passing milestones through our lens capturing live, genuine smiles that reflect real joy and transforming them into timeless photographs that stay with you forever.
            </p>
          </div>

        </div>

        {/* Specialties Grid Footer */}
        <div style={{ marginTop: '5rem', borderTop: '1px solid #dcd6cd', paddingTop: '2.5rem', textAlign: 'center' }}>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1rem', color: '#a39885', marginBottom: '1rem' }}>
            What We Document
          </h4>
          <p style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.25rem', color: '#2c4a35', margin: 0 }}>
            Portraits, Student Events, Birthdays, Graduations, Couple Shoots, Weddings, and Personal Branding.
          </p>
        </div>

      </div>
    </section>
  );
}