'use client';

import React, { useState, useEffect } from 'react';
import ImageSlider from './ImageSlider';

export interface GalleryItem {
  id: number;
  beforeImage: string;
  afterImage: string;
  thumbnail: string;
  label: string;
}

interface ShowcaseGalleryProps {
  initialItems?: GalleryItem[];
}

export default function ShowcaseGallery({ initialItems = [] }: ShowcaseGalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [activeIndex, setActiveIndex] = useState(0);

  const [prevInitialItems, setPrevInitialItems] = useState(initialItems);
  if (initialItems !== prevInitialItems) {
    setItems(initialItems);
    setPrevInitialItems(initialItems);
  }

  useEffect(() => {
    if (items.length === 0) {
      fetch('/api/admin/works')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setItems(data);
          }
        })
        .catch((err) => console.error('Error fetching works:', err));
    }
  }, [items.length]);

  const currentItem = items[activeIndex];

  if (!currentItem || items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
        Loading showcase gallery...
      </div>
    );
  }

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
              src="https://res.cloudinary.com/drfiuipgl/image/upload/v1781253017/arrows-png_ok37yk.png" 
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
              src="https://res.cloudinary.com/drfiuipgl/image/upload/v1781253017/arrows-png_ok37yk.png" 
              alt="" 
              className="arrow-image arrow-image-right" 
            />
          </div>
        </div>

        {/* Clickable Thumbnail Selector Strip */}
        <div className="thumbnail-strip" id="gallery-thumbnail-selector">
          {items.map((item, index) => (
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
