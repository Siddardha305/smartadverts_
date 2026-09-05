import React from 'react';
import { Check } from 'lucide-react';

export default function ServicesList() {
  return (
    <section className="services-section-container" id="services">
      <div className="services-grid">
        {/* Service 1: YouTube Thumbnails */}
        <div className="service-card">
          <div>
            <div className="service-num">01 — YouTube Thumbnails</div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.75rem)', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              YouTube Thumbnails
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Turn your raw photos into thumbnails that stand out on YouTube.
            </p>

            <ul className="service-bullet-list">
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Professional Photoshop editing</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Face & subject enhancement</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Background manipulation</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Creative typography</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Color & lighting correction</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>YouTube-ready exports</span>
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
            <div className="service-price-pill">
              Starting from ₹399 / thumbnail
            </div>
            <a 
              href="https://www.instagram.com/smartadverts_/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-cta"
              style={{ textAlign: 'center', width: '100%', padding: '0.7rem 0' }}
            >
              Get a Thumbnail
            </a>
          </div>
        </div>

        {/* Service 2: YouTube Vlog Editing */}
        <div className="service-card">
          <div>
            <div className="service-num">02 — YouTube Vlog Editing</div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.75rem)', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              YouTube Vlog Editing
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Give your vlogs a clean, engaging and professional feel.
            </p>

            <ul className="service-bullet-list">
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Cutting & pacing</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Transitions</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Background music</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Sound effects</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Color correction</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Text & subtitles</span>
              </li>
              <li className="service-bullet-item">
                <Check className="service-bullet-icon" size={16} />
                <span>Reels/Shorts cuts</span>
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
            <div className="service-price-pill">
              Affordable packages for regular creators
            </div>
            <a 
              href="https://www.instagram.com/smartadverts_/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-cta"
              style={{ 
                textAlign: 'center', 
                width: '100%', 
                padding: '0.7rem 0',
                background: 'transparent',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-main)',
                boxShadow: 'none'
              }}
            >
              Edit My Video
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
