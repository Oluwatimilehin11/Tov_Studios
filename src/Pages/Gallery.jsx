import React, { useState } from 'react';

// 1. Filter tags grouped beautifully from your journal targets
const CATEGORIES = ['All', 'Portraits & Branding', 'Events & Birthdays', 'Graduations', 'Couples & Weddings'];

// 2. Portfolio dataset built directly from your handwritten project targets
const GALLERY_ITEMS = [
  { id: 1, category: 'Portraits & Branding', title: 'Personal Branding Session', src: 'https://via.placeholder.com/400x500' },
  { id: 2, category: 'Events & Birthdays', title: 'Intimate Birthday Gathering', src: 'https://via.placeholder.com/400x300' },
  { id: 3, category: 'Graduations', title: 'Student Graduation Portrait', src: 'https://via.placeholder.com/400x500' },
  { id: 4, category: 'Couples & Weddings', title: 'Editorial Couple Shoot', src: 'https://via.placeholder.com/400x300' },
  { id: 5, category: 'Portraits & Branding', title: 'Studio Portrait Session', src: 'https://via.placeholder.com/400x500' },
  { id: 6, category: 'Events & Birthdays', title: 'Small Gathering Coverage', src: 'https://via.placeholder.com/400x300' },
  { id: 7, category: 'Graduations', title: 'Milestone Achievement', src: 'https://via.placeholder.com/400x500' },
  { id: 8, category: 'Couples & Weddings', title: 'Wedding Celebration Day', src: 'https://via.placeholder.com/400x500' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Dynamic filter comparison matching the state token
  const filteredItems = activeFilter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section style={{ padding: '7rem 6rem', background: '#f7f3ec', minHeight: '80vh' }}>
      
      {/* Header Container */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--ff-display, serif)', fontSize: '3.5rem', color: '#2c4a35', margin: 0 }}>
          Moments Preserved
        </h2>
        <p style={{ color: '#7a7060', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Purposeful photography framed with intention.
        </p>
      </div>

      {/* ── DYNAMIC FILTER BUTTONS BAR ── */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeFilter === category ? '2px solid #2c4a35' : '2px solid transparent',
              color: activeFilter === category ? '#2c4a35' : '#7a7060',
              padding: '0.5rem 0',
              fontSize: '1rem',
              fontWeight: activeFilter === category ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'sans-serif'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ── RESPONSIVE IMAGE GRID ── */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="gallery-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.4s ease'
            }}
          >
            <div style={{ width: '100%', overflow: 'hidden', background: '#e0dbd3' }}>
              <img 
                src={item.src} 
                alt={item.title} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                className="gallery-img"
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1rem', color: '#a39885' }}>
                {item.category}
              </span>
              <h3 style={{ margin: '0.2rem 0 0 0', fontFamily: 'serif', fontSize: '1.3rem', color: '#2c4a35', fontWeight: 'normal' }}>
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}