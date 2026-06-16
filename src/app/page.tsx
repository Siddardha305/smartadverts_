import ShowcaseGallery from '@/components/ShowcaseGallery';
import Link from 'next/link';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import DesignJourney from '@/components/design-journey/DesignJourney';
import TrustBanner from '@/components/TrustBanner';
import { ROW_1_TESTIMONIALS, ROW_2_TESTIMONIALS, ROW_3_TESTIMONIALS } from '@/data/testimonials';
import { Sparkles } from 'lucide-react';
import fs from 'fs/promises';
import path from 'path';

async function getWorks() {
  const filePath = path.join(process.cwd(), 'src/data/works.json');
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading works.json:', error);
    return [];
  }
}

export default async function Home() {
  const works = await getWorks();
  return (
    <div className="container">
      {/* Header Section */}
      <header className="header" id="main-header" style={{ marginTop: '1.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--primary-glow)',
          border: '1px solid var(--border-glass-active)',
          padding: '0.35rem 1rem',
          borderRadius: '9999px',
          color: 'var(--secondary)',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Sparkles size={12} /> Thumbnail CTR Optimization Engine
        </div>
        
        <h1 className="title-gradient" id="main-page-title" style={{ fontSize: '3.5rem', fontWeight: 800 }}>
          High-Converting Thumbnail Visuals
        </h1>
        <p className="subtitle" id="main-page-subtitle" style={{ maxWidth: '650px' }}>
          Explore high-fidelity visual transformations. Slide to compare original, raw photos 
          against our professional, conversion-optimized marketing assets.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/smartadverts_/" target="_blank" rel="noopener noreferrer" className="nav-cta" style={{ padding: '0.65rem 2rem' }}>
            Book CTR Audit
          </a>
          <Link href="/works" className="nav-cta" style={{ 
            padding: '0.65rem 2rem', 
            background: 'transparent', 
            border: '1px solid var(--border-glass)',
            color: 'var(--text-main)',
            boxShadow: 'none'
          }}>
            Explore Showcase
          </Link>
        </div>
      </header>

      {/* Interactive Hero Gallery Showcase with Thumbnails */}
      <ShowcaseGallery initialItems={works} />

      {/* Reusable TrustBanner component */}
      <TrustBanner />

      {/* Instagram Design Journey Section */}
      <DesignJourney />

      {/* Our Clients Section (Testimonials Marquee Only) */}
      <section className="clients-section" id="our-clients" style={{ borderTop: 'none', paddingTop: '1rem', marginTop: 0 }}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <h2 className="title-gradient section-title">What Creators Say</h2>
          <p className="section-subtitle">
            Read real feedback from creators who optimized their layouts and click-through rates.
          </p>
        </div>

        {/* Testimonials Marquee Section */}
        <div className="testimonials-marquee-container">
          {/* Row 1 (scrolls left) */}
          <div className="marquee-track">
            <div className="marquee-group">
              {ROW_1_TESTIMONIALS.map((testimonial, idx) => (
                <TestimonialCard key={`row1-${idx}`} {...testimonial} />
              ))}
            </div>
            <div className="marquee-group" aria-hidden="true">
              {ROW_1_TESTIMONIALS.map((testimonial, idx) => (
                <TestimonialCard key={`row1-dup-${idx}`} {...testimonial} />
              ))}
            </div>
          </div>

          {/* Row 2 (scrolls right) */}
          <div className="marquee-track">
            <div className="marquee-group marquee-group-reverse">
              {ROW_2_TESTIMONIALS.map((testimonial, idx) => (
                <TestimonialCard key={`row2-${idx}`} {...testimonial} />
              ))}
            </div>
            <div className="marquee-group marquee-group-reverse" aria-hidden="true">
              {ROW_2_TESTIMONIALS.map((testimonial, idx) => (
                <TestimonialCard key={`row2-dup-${idx}`} {...testimonial} />
              ))}
            </div>
          </div>

          {/* Row 3 (scrolls left) */}
          <div className="marquee-track">
            <div className="marquee-group">
              {ROW_3_TESTIMONIALS.map((testimonial, idx) => (
                <TestimonialCard key={`row3-${idx}`} {...testimonial} />
              ))}
            </div>
            <div className="marquee-group" aria-hidden="true">
              {ROW_3_TESTIMONIALS.map((testimonial, idx) => (
                <TestimonialCard key={`row3-dup-${idx}`} {...testimonial} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Card Section */}
      <CTASection />

    </div>
  );
}
