import React from 'react';
import { Grid, Contact } from 'lucide-react';

export default function MockupGrid() {
  return (
    <div style={{ background: '#000', color: '#fff' }}>
      {/* Grid Tabs Header */}
      <div style={{
        display: 'flex',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        {/* Active Tab: Grid */}
        <div style={{
          padding: '0.75rem 0',
          borderBottom: '1px solid #fff',
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer'
        }}>
          <Grid size={18} />
        </div>
        
        {/* Inactive Tab: Tagged/Saved */}
        <div style={{
          padding: '0.75rem 0',
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.4)',
          cursor: 'pointer'
        }}>
          <Contact size={18} />
        </div>
      </div>

      {/* Grid Content Images (3 squares) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2px',
        paddingTop: '2px'
      }}>
        {/* Tile 1: Orange/Red Gradient */}
        <div 
          className="mockup-grid-tile"
          style={{
            aspectRatio: '1/1',
            background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.95,
            cursor: 'pointer'
          }} 
        />

        {/* Tile 2: Dark Grey/Carbon Gradient */}
        <div 
          className="mockup-grid-tile"
          style={{
            aspectRatio: '1/1',
            background: 'linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.95,
            cursor: 'pointer'
          }} 
        />

        {/* Tile 3: Yellow/Orange Gradient */}
        <div 
          className="mockup-grid-tile"
          style={{
            aspectRatio: '1/1',
            background: 'linear-gradient(135deg, #f39c12 0%, #d35400 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.95,
            cursor: 'pointer'
          }} 
        />
      </div>
    </div>
  );
}
