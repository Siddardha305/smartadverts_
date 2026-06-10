import React from 'react';
import { ChevronLeft, MoreVertical, Check } from 'lucide-react';

export default function MockupHeader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.7rem 0.85rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      background: '#000',
      color: '#fff'
    }}>
      {/* Back Button */}
      <div style={{ cursor: 'pointer', opacity: 0.8 }}>
        <ChevronLeft size={18} />
      </div>

      {/* Username & Verified Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.2rem',
        fontWeight: 700,
        fontSize: '0.85rem'
      }}>
        <span>smartadverts_</span>
        <div style={{
          background: '#0095f6',
          color: '#fff',
          borderRadius: '50%',
          width: '11px',
          height: '11px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1px'
        }}>
          <Check size={8} strokeWidth={4} />
        </div>
      </div>

      {/* More Options */}
      <div style={{ cursor: 'pointer', opacity: 0.8 }}>
        <MoreVertical size={18} />
      </div>
    </div>
  );
}
