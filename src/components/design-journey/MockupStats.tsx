import React from 'react';
import Image from 'next/image';

export default function MockupStats() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.85rem 0.85rem 0.4rem 0.85rem',
      gap: '1.25rem',
      background: '#000',
      color: '#fff'
    }}>
      {/* Profile Picture */}
      <div style={{
        position: 'relative',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#000',
          border: '1.5px solid #000'
        }}>
          <Image 
            src="https://res.cloudinary.com/drfiuipgl/image/upload/v1781253018/instaprofile_pkmgp8.webp" 
            alt="SmartAdverts Profile" 
            fill
            sizes="44px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Stats Columns */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 1,
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.1 }}>445</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400 }}>Posts</div>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.1 }}>4,665</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400 }}>Followers</div>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.1 }}>27</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400 }}>Following</div>
        </div>
      </div>
    </div>
  );
}
