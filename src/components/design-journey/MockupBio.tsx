import React from 'react';

export default function MockupBio() {
  return (
    <div style={{
      padding: '0.2rem 0.85rem 0.75rem 0.85rem',
      background: '#000',
      color: '#fff',
      fontSize: '0.775rem',
      lineHeight: 1.4
    }}>
      {/* Title / Name */}
      <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>SmartAdverts | Creative Partner</div>
      
      {/* Category Tag */}
      <div style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.7rem', marginBottom: '0.25rem' }}>
        Marketing Agency
      </div>

      {/* Bio Description lines */}
      <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
        <div>
          Admin{' '}
          <a
            href="https://www.instagram.com/siddardha_chitturi/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0095f6', textDecoration: 'none', cursor: 'pointer' }}
          >
            @siddardha_chitturi
          </a>
        </div>
        <div>🎯 Thumbnail editing</div>
        <div>🎬 Video editing</div>
        <div>⚡ We build brands.</div>
      </div>

      {/* Website Link */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.25rem', 
        color: '#0095f6', 
        fontWeight: 600,
        marginTop: '0.2rem',
        cursor: 'pointer'
      }}>
        <span>🔗</span>
        <span>smartadverts.in</span>
      </div>
    </div>
  );
}
