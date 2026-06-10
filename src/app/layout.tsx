import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'SmartAdverts Catalog | Before & After Image Comparison',
  description: 'View the before and after enhancements of catalog advertising graphics. Use our interactive slider to compare raw photos and optimized conversion-driven ads.',
  keywords: 'smartadverts, catalog ads, e-commerce banners, image comparison, image slider, photo enhancement',
  icons: {
    icon: '/fav.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
