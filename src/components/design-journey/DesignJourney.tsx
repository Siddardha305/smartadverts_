import React from 'react';
import { Instagram } from 'lucide-react';
import InstagramMockup from './InstagramMockup';

export default function DesignJourney() {
  return (
    <section 
      className="design-journey-section"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '4rem auto',
        maxWidth: '1100px',
        width: '100%',
        padding: '2.5rem 1.5rem',
        position: 'relative'
      }}
    >
      {/* Left Column: Branding Copy & Follow Button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
        }}>
          Follow Our<br />
          <span className="title-gradient">Design Journey</span>
        </h2>
        
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.05rem',
          lineHeight: 1.6,
          maxWidth: '500px'
        }}>
          We constantly update our Instagram with our latest designs, client projects, and 
          creative experiments. Follow us to see exactly what we can do for your brand!
        </p>

        {/* Instagram Gradient CTA Button */}
        <div>
          <a
            href="https://www.instagram.com/smartadverts_/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-btn"
          >
            <Instagram size={18} />
            <span>Follow @smartadverts_</span>
          </a>
        </div>
      </div>

      {/* Right Column: High-fidelity Smartphone Mockup */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <InstagramMockup />

        {/* Floating script font label and arrow */}
        <div className="mockup-follow-badge">
          <span className="mockup-follow-script">
            <div>Follow</div>
            <div>For More</div>
            <div>Updates</div>
          </span>
          <svg viewBox="0 0 50 50" className="mockup-follow-arrow" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44,10 Q28,34 12,24" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
            <path d="M12,24 L21,22 M12,24 L16,31" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
