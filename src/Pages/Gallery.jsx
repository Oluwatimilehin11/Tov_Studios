import React, { useState, useEffect } from 'react';

// Import your real, curated assets
import portraitEmerald from '../assets/portrait-emerald.jpg';
import detailClutch from '../assets/detail-clutch.jpg';
import portraitBlue from '../assets/portrait-blue.jpg';
import joyDance from '../assets/joy-dance.jpg';
import elegantCouple from '../assets/elegant-couple.jpg';
import pureEmotion from '../assets/pure-emotion.jpg';

// 1. Filter tags grouped beautifully
const CATEGORIES = ['All', 'Portraits & Branding', 'Events & Birthdays', 'Couples & Weddings'];

// 2. Portfolio dataset mapped to your curated images
const GALLERY_ITEMS = [
  { 
    id: 1, 
    category: 'Portraits & Branding', 
    title: 'Emerald Portrait Session', 
    src: portraitEmerald 
  },
  { 
    id: 2, 
    category: 'Portraits & Branding', 
    title: 'Radiant Studio Portrait', 
    src: portraitBlue 
  },
  { 
    id: 3, 
    category: 'Events & Birthdays', 
    title: 'Editorial Detail & Styling', 
    src: detailClutch 
  },
  { 
    id: 4, 
    category: 'Events & Birthdays', 
    title: 'Thanksgiving Celebration', 
    src: pureEmotion 
  },
  { 
    id: 5, 
    category: 'Events & Birthdays', 
    title: 'Traditional Celebration Dance', 
    src: joyDance 
  },
  { 
    id: 6, 
    category: 'Couples & Weddings', 
    title: 'Connection & Elegance', 
    src: elegantCouple 
  }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle dynamic layout scaling on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter comparison
  const filteredItems = activeFilter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section style={{ 
      padding: isMobile ? '5rem 1.5rem' : '7rem 6rem', 
      background: '#f7f3ec', 
      minHeight: '80vh' 
    }}>
      
      {/* Header Container */}
      <div style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}>
        <h2 style={{ 
          fontFamily: 'serif', 
          fontSize: isMobile ? '2.5rem' : '3.5rem', 
          color: '#2c4a35', 
          margin: 0,
          fontWeight: 'normal'
        }}>
          Moments Preserved
        </h2>
        <p style={{ color: '#7a7060', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Purposeful photography framed with intention.
        </p>
      </div>

      {/* ── FILTER BUTTONS BAR ── */}
      <div style={{ 
        display: 'flex', 
        gap: isMobile ? '1rem' : '1.5rem', 
        marginBottom: isMobile ? '2rem' : '3rem', 
        flexWrap: 'wrap' 
      }}>
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
              fontSize: isMobile ? '0.9rem' : '1rem',
              letterSpacing: '0.05rem',
              fontWeight: activeFilter === category ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'serif',
              textTransform: 'uppercase'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ── RESPONSIVE IMAGE GRID ── */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', 
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
            <div style={{ 
              width: '100%', 
              overflow: 'hidden', 
              background: '#e0dbd3',
              height: isMobile ? '380px' : '480px'
            }}>
              <img 
                src={item.src} 
                alt={item.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
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