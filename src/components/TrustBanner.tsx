import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClientChannel } from '@/data/clients';
import fs from 'fs/promises';
import path from 'path';

async function getClients(): Promise<ClientChannel[]> {
  const filePath = path.join(process.cwd(), 'src/data/clients.json');
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading clients.json in TrustBanner:', error);
    return [];
  }
}

export default async function TrustBanner() {
  const clients = await getClients();
  // Select a subset of clients to showcase
  const featuredClients = clients.slice(0, 5);

  return (
    <section style={{ margin: '4rem auto', maxWidth: '1000px', width: '100%' }}>
      <div 
        className="premium-glow-card"
        style={{ 
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center'
        }}
      >
        {/* Decorative top-right glow */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Trusted by Top YouTube Creators
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            We help 15+ top creators scale their CTR and organic search views.
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          margin: '0.5rem 0'
        }}>
          {featuredClients.map((client, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                position: 'relative', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                border: '2px solid var(--border-glass)' 
              }}>
                <Image 
                  src={client.image} 
                  alt={client.name} 
                  fill 
                  sizes="60px"
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {client.name.split(' ')[0]}
              </span>
            </div>
          ))}
          <Link 
            href="/clients" 
            style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              background: 'var(--primary-glow)', 
              border: '1px dashed var(--secondary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--secondary)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
              transition: 'var(--transition-smooth)'
            }}
            className="featured-client-more"
          >
            +10
          </Link>
        </div>

        <Link href="/clients" style={{ 
          color: 'var(--secondary)', 
          textDecoration: 'none', 
          fontWeight: 600, 
          fontSize: '0.95rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          Meet all our clients <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
