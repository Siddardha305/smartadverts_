import React from 'react';
import MockupHeader from './MockupHeader';
import MockupStats from './MockupStats';
import MockupBio from './MockupBio';
import MockupActions from './MockupActions';
import MockupHighlights from './MockupHighlights';
import MockupGrid from './MockupGrid';

export default function InstagramMockup() {
  return (
    <div style={{
      width: '270px',
      background: '#000',
      border: '8px solid #1c1c1c',
      borderRadius: '30px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--primary-glow)',
      position: 'relative',
      userSelect: 'none',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* Camera Notch / Notch Island */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90px',
        height: '10px',
        background: '#1c1c1c',
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Speaker piece */}
        <div style={{ width: '30px', height: '2px', background: '#2c2c2c', borderRadius: '1px' }} />
      </div>

      {/* Spacer to clear the notch */}
      <div style={{ height: '6px', background: '#000' }} />

      {/* Header bar component */}
      <MockupHeader />

      {/* Stats row component */}
      <MockupStats />

      {/* Bio text component */}
      <MockupBio />

      {/* Actions buttons component */}
      <MockupActions />

      {/* Highlights circle component */}
      <MockupHighlights />

      {/* Feed grid component */}
      <MockupGrid />

      {/* Bottom bar indicator mockup */}
      <div style={{
        height: '24px',
        background: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          width: '100px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '2px'
        }} />
      </div>
    </div>
  );
}
