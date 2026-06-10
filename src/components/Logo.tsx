import React from 'react';
import Image from 'next/image';
import logoImg from '../../public/smartadverts-color.webp';

interface LogoProps {
  height?: number;
  className?: string;
}

export default function Logo({ height = 52, className = '' }: LogoProps) {
  // Statically imported image provides height and width details automatically
  const imageWidth = logoImg.width;
  const imageHeight = logoImg.height;
  const aspectRatio = imageWidth / imageHeight;
  
  // Calculate width preserving the exact aspect ratio
  const width = Math.round(height * aspectRatio);

  return (
    <div className={`logo-wrapper ${className}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Image
        src={logoImg}
        alt="SmartAdverts Logo"
        width={width}
        height={height}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
}
