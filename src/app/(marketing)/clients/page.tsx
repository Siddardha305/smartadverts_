import { ClientChannel } from '@/data/clients';
import Image from 'next/image';
import CTASection from '@/components/CTASection';
import fs from 'fs/promises';
import path from 'path';

async function getClients(): Promise<ClientChannel[]> {
  const filePath = path.join(process.cwd(), 'src/data/clients.json');
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading clients.json:', error);
    return [];
  }
}

export const metadata = {
  title: 'Our Clients | SmartAdverts Catalog',
  description: 'Trusted by top YouTube creators to optimize their click-through rates and drive millions of organic views.',
};

export default async function ClientsPage() {
  const clients = await getClients();
  return (
    <div className="container" style={{ minHeight: '80vh' }}>
      {/* Page Header */}
      <header className="page-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          Our Clients
        </h1>
        <p className="subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
          We collaborate with top-tier content creators to transform their thumbnails into 
          high-performance visual assets that trigger audience clicks.
        </p>
      </header>

      {/* Creator Grid Section */}
      <section className="clients-section" style={{ borderTop: 'none', marginTop: 0, paddingTop: '1rem' }}>
        <div className="creator-grid-wrapper">
          <div className="creator-grid">
            {clients.map((creator, index) => (
              <div key={index} className="creator-card">
                {creator.subscribers && (
                  <div className={`creator-badge-highlight ${creator.highlightSide || 'left'}`}>
                    <span className={`creator-badge-text ${creator.highlightSide || 'left'}`}>
                      <div>{creator.subscribers.split(' ')[0]}</div>
                      <div>{creator.subscribers.split(' ')[1]}</div>
                    </span>
                    {creator.highlightSide === 'right' ? (
                      <svg viewBox="0 0 50 50" className="creator-badge-arrow right" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44,10 Q28,34 12,24" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                        <path d="M12,24 L21,22 M12,24 L16,31" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 50 50" className="creator-badge-arrow" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6,10 Q22,34 38,24" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                        <path d="M38,24 L29,22 M38,24 L34,31" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                )}
                <div className="creator-circle">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span className="creator-name">{creator.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats metrics block */}
        <div
          className="clients-stats-grid"
          style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '3.5rem',
          textAlign: 'center'
        }}>
          <div style={{ background: 'var(--bg-card)', padding: '2rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--border-glass)' }}>
            <h3 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>{clients.length}+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Active YouTube Creators</p>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '2rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--border-glass)' }}>
            <h3 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>15M+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Combined Subscribers</p>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '2rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--border-glass)' }}>
            <h3 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>45%</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Average CTR Increase</p>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '2rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--border-glass)' }}>
            <h3 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>50M+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Organic Views Generated</p>
          </div>
        </div>

        <CTASection />
      </section>
    </div>
  );
}
