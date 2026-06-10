import React from 'react';
import { UserPlus } from 'lucide-react';

export default function MockupActions() {
  return (
    <div style={{
      display: 'flex',
      gap: '0.4rem',
      padding: '0 0.85rem 0.85rem 0.85rem',
      background: '#000',
      color: '#fff'
    }}>
      {/* Following Button */}
      <button 
        className="mockup-action-btn"
        style={{
          flexGrow: 1,
          background: '#313131',
          border: 'none',
          color: '#fff',
          padding: '0.4rem 0.4rem',
          borderRadius: '6px',
          fontWeight: 600,
          fontSize: '0.75rem',
          cursor: 'pointer'
        }}
      >
        Following
      </button>

      {/* Message Button */}
      <button 
        className="mockup-action-btn"
        style={{
          flexGrow: 1,
          background: '#313131',
          border: 'none',
          color: '#fff',
          padding: '0.4rem 0.4rem',
          borderRadius: '6px',
          fontWeight: 600,
          fontSize: '0.75rem',
          cursor: 'pointer'
        }}
      >
        Message
      </button>

      {/* Add User Icon Button */}
      <button 
        className="mockup-action-btn"
        style={{
          background: '#313131',
          border: 'none',
          color: '#fff',
          padding: '0.4rem 0.5rem',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <UserPlus size={12} />
      </button>
    </div>
  );
}
