import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SmartAdverts | Digital Marketing & High-Converting Graphic Design',
  description: 'Boost your brand with professional digital marketing services, custom thumbnail editing, and expert graphic designing. We create high-converting marketing creatives that scale your business.',
  keywords: 'digital marketing, graphic design, graphic designing, thumbnail editing, photo editing, video editing, advertising graphics, conversion optimization, smartadverts',
  icons: {
    icon: '/fav.webp',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://smartadverts.in',
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
        {children}
      </body>
    </html>
  );
}
