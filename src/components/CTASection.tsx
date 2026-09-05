import React from 'react';

export default function CTASection() {
  return (
    <section 
      className="premium-glow-card"
      style={{ 
        margin: '3rem auto 1.5rem auto', 
        maxWidth: '1000px', 
        width: '100%',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}
    >
      {/* Decorative top-right glow */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      
      <h2 className="title-gradient" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
        Ready to Upgrade Your YouTube Content?
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
        Whether you need a single thumbnail, regular thumbnail support, or complete vlog editing, SmartAdverts is here to help.
      </p>
      
      {/* Tagline */}
      <div style={{
        fontSize: '0.85rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: 'var(--secondary)',
        marginBottom: '2rem'
      }}>
        Affordable. Professional. Creator-focused.
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a 
          href="https://www.instagram.com/smartadverts_/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-cta" 
          style={{ padding: '0.75rem 2.5rem' }}
        >
          Start Your Project
        </a>
      </div>
    </section>
  );
}
