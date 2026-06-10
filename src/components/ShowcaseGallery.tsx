'use client';

import React, { useState } from 'react';
import ImageSlider from './ImageSlider';

interface GalleryItem {
  id: number;
  beforeImage: string;
  afterImage: string;
  thumbnail: string;
  label: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    beforeImage: '/thumbnail/thumbnail-1-before.webp',
    afterImage: '/thumbnail/thumbnail-1-after.webp',
    thumbnail: '/thumbnail/thumbnail-1-after.webp',
    label: 'Set 1',
  },
  {
    id: 2,
    beforeImage: '/thumbnail/thumbnail-2-before.webp',
    afterImage: '/thumbnail/thumbnail-2-after.webp',
    thumbnail: '/thumbnail/thumbnail-2-after.webp',
    label: 'Set 2',
  },
  {
    id: 3,
    beforeImage: '/thumbnail/thumbnail-3-before.webp',
    afterImage: '/thumbnail/thumbnail-3-after.webp',
    thumbnail: '/thumbnail/thumbnail-3-after.webp',
    label: 'Set 3',
  },
  {
    id: 4,
    beforeImage: '/thumbnail/thumbnail-4-before.webp',
    afterImage: '/thumbnail/thumbnail-4-after.webp',
    thumbnail: '/thumbnail/thumbnail-4-after.webp',
    label: 'Set 4',
  },
  {
    id: 5,
    beforeImage: '/thumbnail/thumbnail-5-before.webp',
    afterImage: '/thumbnail/thumbnail-5-after.webp',
    thumbnail: '/thumbnail/thumbnail-5-after.webp',
    label: 'Set 5',
  }
];

export default function ShowcaseGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentItem = GALLERY_ITEMS[activeIndex];

  return (
    <div style={{ width: '100%' }}>
      {/* Hero Section with Large Slider & Handwritten Labels */}
      <section className="hero-section" id="hero-showcase">
        <div className="hero-slider-wrapper">
          {/* Left Label: Before */}
          <div className="hero-label-container hero-label-left" id="label-before-hero">
            <span className="hero-script-text before-text">Before</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/arrows-png.png" 
              alt="" 
              className="arrow-image arrow-image-left" 
            />
          </div>

          {/* Dynamic Slider Frame */}
          <div className="hero-slider-container">
            {/* Key prop ensures the slider resets its state (like handle position) when the image changes */}
            <ImageSlider 
              key={currentItem.id}
              beforeImage={currentItem.beforeImage} 
              afterImage={currentItem.afterImage}
              beforeLabel="Raw Image"
              afterLabel="Optimized Ad"
              viewMode="slider"
            />
          </div>

          {/* Right Label: After */}
          <div className="hero-label-container hero-label-right" id="label-after-hero">
            <span className="hero-script-text after-text">After</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/arrows-png.png" 
              alt="" 
              className="arrow-image arrow-image-right" 
            />
          </div>
        </div>

        {/* Clickable Thumbnail Selector Strip */}
        <div className="thumbnail-strip" id="gallery-thumbnail-selector">
          {GALLERY_ITEMS.map((item, index) => (
            <button
              key={item.id}
              className={`thumbnail-wrapper ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Switch to comparison ${item.label}`}
              type="button"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={item.thumbnail} 
                alt={`Thumbnail of ${item.label}`} 
                className="thumbnail-img" 
              />
              <span className="thumbnail-label">{item.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
