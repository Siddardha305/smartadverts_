import React from 'react';

interface MockupBioProps {
  fullName?: string;
  category?: string;
  adminText?: string;
  adminLink?: string;
  bioLine1?: string;
  bioLine2?: string;
  bioLine3?: string;
  websiteLabel?: string;
  websiteUrl?: string;
}

export default function MockupBio({
  fullName = 'SmartAdverts | Creative Partner',
  category = 'Marketing Agency',
  adminText = 'Admin @siddardha_chitturi',
  adminLink = 'https://www.instagram.com/siddardha_chitturi/',
  bioLine1 = '🎯 Thumbnail editing',
  bioLine2 = '🎬 Video editing',
  bioLine3 = '⚡ We build brands.',
  websiteLabel = 'smartadverts.in',
  websiteUrl = 'https://smartadverts.in',
}: MockupBioProps) {
  // Parse admin username from adminText if it contains @
  const parts = adminText.split(' ');
  const usernamePart = parts.find(p => p.startsWith('@'));
  const prefixText = parts.filter(p => !p.startsWith('@')).join(' ');

  return (
    <div style={{
      padding: '0.2rem 0.85rem 0.75rem 0.85rem',
      background: '#000',
      color: '#fff',
      fontSize: '0.775rem',
      lineHeight: 1.4
    }}>
      {/* Title / Name */}
      <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>{fullName}</div>
      
      {/* Category Tag */}
      <div style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.7rem', marginBottom: '0.25rem' }}>
        {category}
      </div>

      {/* Bio Description lines */}
      <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
        <div>
          {prefixText}{' '}
          {usernamePart && (
            <a
              href={adminLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0095f6', textDecoration: 'none', cursor: 'pointer' }}
            >
              {usernamePart}
            </a>
          )}
          {!usernamePart && adminText}
        </div>
        {bioLine1 && <div>{bioLine1}</div>}
        {bioLine2 && <div>{bioLine2}</div>}
        {bioLine3 && <div>{bioLine3}</div>}
      </div>

      {/* Website Link */}
      {websiteLabel && (
        <a 
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.25rem', 
            color: '#0095f6', 
            fontWeight: 600,
            marginTop: '0.2rem',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          <span>🔗</span>
          <span>{websiteLabel}</span>
        </a>
      )}
    </div>
  );
}
