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
  const [submitted, setSubmitted] = useState(false);

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

  // Handles submitting via AJAX fetch to Formspree so we don't reload the page
  const handleSubmit = async (e) => {
    e.preventDefault(); // Keeps page from reloading or redirecting to Formspree
    
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xlgqgvrn', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: data
      });

      if (response.ok) {
        setSubmitted(true); // Triggers your beautifully styled green success message!
        form.reset();       // Clears inputs in the background
      } else {
        alert("Oops! There was a problem submitting your request. Please try again.");
      }
    } catch (error) {
      alert("Connection error. Please check your internet and try again.");
    }
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
            At Tov Studios, every portrait is an act of affirmation. We capture who you truly are, confident, valuable, and beautifully made.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <button onClick={() => scrollToSection(enquiryRef)} style={{ background: