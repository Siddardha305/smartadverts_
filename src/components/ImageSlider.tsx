'use client';

import React, { useState } from 'react';

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  viewMode?: 'slider' | 'side-by-side';
}

export default function ImageSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  viewMode = 'slider',
}: ImageSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  if (viewMode === 'side-by-side') {
    return (
      <div className="side-by-side-container">
        <div className="side-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={beforeImage} alt={beforeLabel} className="compare-img" />
          <span className="image-label label-before">{beforeLabel}</span>
        </div>
        <div className="side-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={afterImage} alt={afterLabel} className="compare-img" />
          <span className="image-label label-after">{afterLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="compare-container" 
      style={{ '--slider-pos': `${sliderPos}%` } as React.CSSProperties}
    >
      {/* After image is base */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={afterImage} alt={afterLabel} className="compare-img img-after" />
      
      {/* Before image is clipped */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={beforeImage} alt={beforeLabel} className="compare-img img-before" />
      
      {/* Labels */}
      <span className="image-label label-before">{beforeLabel}</span>
      <span className="image-label label-after">{afterLabel}</span>
      
      {/* Visual Slider Line */}
      <div className="slider-line"></div>
      
      {/* Visual Handle */}
      <div className="slider-handle">
        <div className="handle-arrows">
          <span>&larr;</span>
          <span>&rarr;</span>
        </div>
      </div>
      
      {/* Interactive Range Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleSliderChange}
        className="slider-input"
        aria-label="Before and after image comparison slider"
      />
    </div>
  );
}
