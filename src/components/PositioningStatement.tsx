import React from 'react';

export default function PositioningStatement() {
  return (
    <section className="positioning-statement-container">
      <div className="positioning-glow-card">
        <h2 
          className="title-gradient" 
          style={{ 
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.2,
            marginBottom: '2rem',
            maxWidth: '850px',
            margin: '0 auto 2rem auto'
          }}
        >
          We help YouTubers look more professional — without spending too much.
        </h2>

        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2.5rem', 
            flexWrap: 'wrap',
            marginTop: '1rem' 
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Thumbnails
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              that get noticed.
            </span>
          </div>

          {/* Separator */}
          <div style={{ 
            width: '1px', 
            background: 'var(--border-glass)', 
            alignSelf: 'stretch',
            display: 'block'
          }} className="hidden-mobile" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Videos
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              that keep viewers watching.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
