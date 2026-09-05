import React from 'react';
import { Coins, Zap, Users, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="features-section-container" id="why-us">
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="title-gradient section-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800 }}>
          Why Creators Choose SmartAdverts
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
          Professional visual assets designed to help you stand out and save resources.
        </p>
      </div>

      <div className="features-grid">
        {/* Benefit 1: Affordable Pricing */}
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Coins size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Affordable Pricing
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Professional creative work without expensive agency-level pricing tags.
          </p>
        </div>

        {/* Benefit 2: Fast Delivery */}
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Zap size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Fast Delivery
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Get your completed thumbnails and video edits without unnecessary waiting.
          </p>
        </div>

        {/* Benefit 3: Creator-Focused */}
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Users size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Creator-Focused
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            We understand YouTube layouts, pacing, thumbnails, and what keeps viewers watching.
          </p>
        </div>

        {/* Benefit 4: Consistent Quality */}
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Sparkles size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Consistent Quality
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Build a cohesive and recognizable visual aesthetic style across your entire channel.
          </p>
        </div>
      </div>
    </section>
  );
}
