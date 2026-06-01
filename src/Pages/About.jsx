import React from 'react';

export default function About() {
  return (
    <section style={{ padding: '7rem 6rem', background: '#fdfaf5', minHeight: '80vh' }}>
      <h2 style={{ fontFamily: 'serif', fontSize: '3rem', color: '#2c4a35' }}>
        The Meaning of Tov
      </h2>
      <p style={{ maxWidth: '52ch', lineHeight: '1.9', color: '#7a7060', marginTop: '1.5rem' }}>
        At Tov Studios, the name “Tov” comes from a Hebrew word meaning <strong>good, pleasant, and fit for a purpose</strong>. 
        That meaning is at the heart of everything we do. We want every person who steps in front of our camera 
        to see themselves through that lens — confident, valuable, and beautifully made.
      </p>
    </section>
  );
}