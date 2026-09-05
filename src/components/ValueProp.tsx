import React from 'react';

export default function ValueProp() {
  return (
    <section 
      style={{ 
        margin: '5rem auto 3rem auto', 
        maxWidth: '1000px', 
        width: '100%',
        padding: '0 1.5rem',
        textAlign: 'center' 
      }}
    >
      <h2 
        className="title-gradient" 
        style={{ 
          fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)', 
          fontWeight: 800, 
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em'
        }}
      >
        High-Quality Content Without the High Price
      </h2>
      <h3 
        style={{ 
          fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', 
          fontWeight: 600, 
          color: 'var(--text-main)', 
          marginBottom: '1.25rem',
          lineHeight: 1.4
        }}
      >
        You don't need an expensive agency to make your YouTube channel look professional.
      </h3>
      <p 
        style={{ 
          color: 'var(--text-muted)', 
          fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', 
          lineHeight: 1.7, 
          maxWidth: '750px', 
          margin: '0 auto' 
        }}
      >
        At SmartAdverts, we create attention-grabbing thumbnails and professional vlog edits at creator-friendly prices — so you can focus on making content while we handle the visuals.
      </p>
    </section>
  );
}
