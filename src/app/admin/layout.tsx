import React from 'react';
import '@/styles/website.css';

export const metadata = {
  title: 'SmartAdverts Admin Panel',
  description: 'Manage works, creators, and Instagram showcase.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="smartadverts-website-root min-h-screen">
      {children}
    </div>
  );
}
