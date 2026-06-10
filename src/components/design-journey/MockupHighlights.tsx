import React from 'react';
import { Sparkle } from 'lucide-react';

const HIGHLIGHTS = [
  { label: 'Designs', icon: <Sparkle size={16} /> },
  { label: 'Clients', icon: <Sparkle size={16} /> },
  { label: 'Process', icon: <Sparkle size={16} /> },
  { label: 'Reviews', icon: <Sparkle size={16} /> }
];

export default function MockupHighlights() {
  return (
    <div style={{
      display: 'flex',
      gap: '1.25rem',
      padding: '0.25rem 1rem 1rem 1rem',
      background: '#000',
      color: '#fff',
      overflowX: 'auto',
      scrollbarWidth: 'none' // Hide scrollbar for clean look
    }}>
      {HIGHLIGHTS.map((hl, idx) => (
        <div 
          key={idx} 
          className="mockup-highlight-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            minWidth: '56px',
            cursor: 'pointer'
          }}
        >
          {/* Highlight Circle */}
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: '#1c1c1c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--secondary)'
          }}>
            {hl.icon}
          </div>

          {/* Highlight Label */}
          <span style={{
            fontSize: '0.7rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 500
          }}>
            {hl.label}
          </span>
        </div>
      ))}
    </div>
  );
}
