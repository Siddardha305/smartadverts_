'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Check on initial load too in case page is refreshed after scroll
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if a route link is active
  const isActive = (path: string) => {
    return pathname === path ? 'active' : '';
  };

  return (
    <header className="navbar-wrapper" id="main-navbar-wrapper">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
        {/* Logo */}
        <Link href="/" className="nav-logo" id="nav-logo-link" style={{ display: 'inline-flex', alignItems: 'center', padding: 0 }}>
          <Logo height={52} />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links" id="nav-links-desktop">
          <li>
            <Link href="/works" className={`nav-link ${isActive('/works')}`}>Our Works</Link>
          </li>
          <li>
            <Link href="/clients" className={`nav-link ${isActive('/clients')}`}>Our Clients</Link>
          </li>
          <li>
            <Link href="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          </li>
          <li>
            <Link href="/dashboard" className={`nav-link ${isActive('/dashboard')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <LayoutDashboard size={15} />
              Portal
            </Link>
          </li>
        </ul>

        {/* CTA Button & Portal Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link 
            href="/dashboard" 
            className="nav-portal-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Workspace
          </Link>
          <a href="https://www.instagram.com/smartadverts_/" target="_blank" rel="noopener noreferrer" className="nav-cta" id="nav-cta-button">
            Contact Us
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          type="button"
          id="nav-mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown Navigation Menu */}
        <div className={`mobile-nav-menu ${isOpen ? 'open' : ''}`} id="nav-mobile-dropdown">
          <ul className="mobile-nav-links">
            <li>
              <Link href="/works" className={`nav-link ${isActive('/works')}`} onClick={() => setIsOpen(false)}>Our Works</Link>
            </li>
            <li>
              <Link href="/clients" className={`nav-link ${isActive('/clients')}`} onClick={() => setIsOpen(false)}>Our Clients</Link>
            </li>
            <li>
              <Link href="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li>
              <Link href="/dashboard" className={`nav-link ${isActive('/dashboard')}`} onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={18} />
                Client Workspace & Portal
              </Link>
            </li>
            <li style={{ width: '100%', marginTop: '0.5rem' }}>
              <a 
                href="https://www.instagram.com/smartadverts_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-cta" 
                style={{ display: 'block', textAlign: 'center', width: '100%' }}
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
