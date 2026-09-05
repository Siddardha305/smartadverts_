import CTASection from '@/components/CTASection';
import ImageSlider from '@/components/ImageSlider';
import fs from 'fs/promises';
import path from 'path';

interface WorkItem {
  id: number;
  beforeImage: string;
  afterImage: string;
  thumbnail: string;
  label: string;
}

async function getWorks(): Promise<WorkItem[]> {
  const filePath = path.join(process.cwd(), 'src/data/works.json');
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading works.json:', error);
    return [];
  }
}

export const metadata = {
  title: 'Our Works | SmartAdverts Catalog',
  description: 'Explore our high-fidelity visual transformations. Slide to compare original, raw photos against our professional, conversion-optimized marketing assets.',
};

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      {/* Page Header */}
      <header className="page-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          Our Works
        </h1>
        <p className="subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Explore our high-fidelity visual transformations. Use the interactive sliders 
          to compare raw photos against optimized, conversion-driven marketing assets.
        </p>
      </header>

      {/* 3-Column Grid of Interactive Compare Cards */}
      <div className="works-grid" style={{ marginBottom: '4rem' }}>
        {works.map((work) => (
          <div key={work.id} className="compare-card">
            {/* Card Header */}
            <div className="card-header">
              <span className="card-title">{work.label}</span>
              <span className="card-badge">CTR Optimized</span>
            </div>
            
            {/* Image Slider */}
            <ImageSlider 
              beforeImage={work.beforeImage} 
              afterImage={work.afterImage}
              beforeLabel="Raw"
              afterLabel="Optimized"
              viewMode="slider"
            />
          </div>
        ))}
      </div>

      <CTASection />
    </div>
  );
}
