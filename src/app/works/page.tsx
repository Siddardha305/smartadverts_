import ShowcaseGallery from '@/components/ShowcaseGallery';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Our Works | SmartAdverts Catalog',
  description: 'Explore our high-fidelity visual transformations. Slide to compare original, raw photos against our professional, conversion-optimized marketing assets.',
};

export default function WorksPage() {
  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      {/* Page Header */}
      <header className="page-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          Our Works
        </h1>
        <p className="subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Explore high-fidelity visual transformations. Slide to compare original, raw photos 
          against our professional, conversion-optimized marketing assets.
        </p>
      </header>

      {/* Main Interactive Showcase Gallery Component */}
      <ShowcaseGallery />

      <CTASection />
    </div>
  );
}
