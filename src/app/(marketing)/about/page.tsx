import { TrendingUp, Zap, Target, Users, BarChart2, Sparkles } from 'lucide-react';
import CTASection from '@/components/CTASection';
import DesignJourney from '@/components/design-journey/DesignJourney';
import TrustBanner from '@/components/TrustBanner';
import fs from 'fs/promises';
import path from 'path';

async function getClients() {
  const filePath = path.join(process.cwd(), 'src/data/clients.json');
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading clients.json in About:', error);
    return [];
  }
}

export const metadata = {
  title: 'About | SmartAdverts Catalog',
  description: 'SmartAdverts is a professional graphic optimization studio focused on engineering high-CTR thumbnail assets for YouTube creators.',
};

export default async function AboutPage() {
  const clients = await getClients();
  return (
    <div className="container" style={{ minHeight: '80vh' }}>
      {/* Cinematic Hero Header */}
      <header className="page-header" style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '1.5rem' }}>
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
          marginBottom: '1.25rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Sparkles size={12} /> The Philosophy
        </div>
        <h1 className="title-gradient" style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          We Engineer Visuals That<br />Command Attention
        </h1>
        <p className="subtitle" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.6 }}>
          SmartAdverts merges graphic design psychology with click metadata. We transform raw photographs 
          into high-conversion digital assets that trigger audience engagement.
        </p>
      </header>

      {/* Grid Split: Narrative & Stats */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
        marginBottom: '5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glass)',
        borderRadius: '1.5rem',
        padding: '3.5rem 2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background gradient glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.5
        }} />

        {/* Left Column: Narrative */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Our Vision: Creators First
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            In the modern digital attention economy, a video is only as good as its first impression. 
            No matter how many hours you spend scripting, filming, and editing, audiences will only see 
            your work if they choose to click.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
            By working with over {clients.length}+ top creators in travel, lifestyle, entertainment, and fashion, 
            we have perfected the art of click-through rate visual engineering. We manage the color grading, 
            lighting focus, and custom vector typography so you can focus on building your brand.
          </p>
        </div>

        {/* Right Column: Premium Infographic Stats Grid */}
        <div
          className="about-stats-grid"
          style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-glass)',
            borderRadius: '1.25rem',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            transition: 'var(--transition-smooth)'
          }}>
            <div style={{ color: 'var(--secondary)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
              <Users size={24} />
            </div>
            <h3 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>{clients.length}+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.25rem', textTransform: 'uppercase' }}>
              Active Creators
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-glass)',
            borderRadius: '1.25rem',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            transition: 'var(--transition-smooth)'
          }}>
            <div style={{ color: 'var(--secondary)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
              <BarChart2 size={24} />
            </div>
            <h3 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>45%</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.25rem', textTransform: 'uppercase' }}>
              Avg CTR Increase
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-glass)',
            borderRadius: '1.25rem',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            transition: 'var(--transition-smooth)'
          }}>
            <div style={{ color: 'var(--secondary)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
              <Zap size={24} />
            </div>
            <h3 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>500+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.25rem', textTransform: 'uppercase' }}>
              Assets Crafted
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-glass)',
            borderRadius: '1.25rem',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            transition: 'var(--transition-smooth)'
          }}>
            <div style={{ color: 'var(--secondary)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
              <TrendingUp size={24} />
            </div>
            <h3 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>50M+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.25rem', textTransform: 'uppercase' }}>
              Views Driven
            </p>
          </div>
        </div>
      </section>

      {/* Reusable TrustBanner component */}
      <TrustBanner />

      {/* Visual Workflow Steps Section */}
      <section style={{ marginBottom: '5rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="title-gradient" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            The Optimization Process
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
            How we transform standard visual captures into high-CTR marketing layouts.
          </p>
        </div>

        {/* Process Steps Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem'
        }}>
          {/* Step 1 */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '2rem',
              background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.35rem 1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 10px var(--primary-glow)'
            }}>
              STEP 01
            </div>
            
            <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Target size={20} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Briefing & Analysis</h3>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              We evaluate your raw camera captures, review competitor thumbnails, and analyze heatmaps of your target audience. We map out the best composition structure to highlight the core subject.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '2rem',
              background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.35rem 1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 10px var(--primary-glow)'
            }}>
              STEP 02
            </div>
            
            <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Zap size={20} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Contrast Architecture</h3>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              We apply dynamic color grading, recolor backgrounds to enhance depth, correct lighting values, and tweak local contrast borders. This makes your subject pop and ensures high readability on small mobile screens.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '2rem',
              background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.35rem 1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 10px var(--primary-glow)'
            }}>
              STEP 03
            </div>
            
            <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <TrendingUp size={20} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Typography & Export</h3>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              We place custom typographic labels, icons, stickers, and stroke outlines. We test the final visual asset at stamp scale, export in optimized WebP formats, and deliver ready-to-upload files.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Design Journey Section */}
      <DesignJourney />

      {/* Reusable CTASection component */}
      <CTASection />
    </div>
  );
}
