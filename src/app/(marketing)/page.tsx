import ShowcaseGallery from '@/components/ShowcaseGallery';
import Link from 'next/link';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import DesignJourney from '@/components/design-journey/DesignJourney';
import TrustBanner from '@/components/TrustBanner';
import ValueProp from '@/components/ValueProp';
import ServicesList from '@/components/ServicesList';
import WhyChooseUs from '@/components/WhyChooseUs';
import PositioningStatement from '@/components/PositioningStatement';
import { ROW_1_TESTIMONIALS, ROW_2_TESTIMONIALS, ROW_3_TESTIMONIALS } from '@/data/testimonials';
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
          padding: '0.35rem 1.15rem',
          borderRadius: '9999px',
          color: 'var(--secondary)',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          THUMBNAILS • VIDEO EDITING • CREATOR SERVICES
        </div>
        
        <h1 className="title-gradient" id="main-page-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15 }}>
          Professional YouTube Thumbnails.<br />Affordable Video Editing.
        </h1>
        <p className="subtitle" id="main-page-subtitle" style={{ maxWidth: '680px' }}>
          Get eye-catching thumbnails and clean, engaging vlog edits without spending a fortune. 
          SmartAdverts helps YouTubers create better-looking content and grow their channel consistently.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.75rem', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/smartadverts_/" target="_blank" rel="noopener noreferrer" className="nav-cta" style={{ padding: '0.65rem 2rem' }}>
            Get Started
          </a>
          <Link href="/works" className="nav-cta" style={{ 
            padding: '0.65rem 2rem', 
            background: 'transparent', 
            border: '1px solid var(--border-glass)',
            color: 'var(--text-main)',
            boxShadow: 'none'
          }}>
            View Our Work
          </Link>
        </div>
      </header>

      {/* Interactive Hero Gallery Showcase with Thumbnails */}
      <ShowcaseGallery initialItems={works} limit={5} />

      {/* Value Proposition: High-Quality Content Without the High Price */}
      <ValueProp />

      {/* Services List: YouTube Thumbnails & Vlog Editing */}
      <ServicesList />

      {/* Why Choose Us: Affordable, Fast, Creator-focused, Consistent */}
      <WhyChooseUs />

      {/* Brand Positioning Statement */}
      <PositioningStatement />

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
