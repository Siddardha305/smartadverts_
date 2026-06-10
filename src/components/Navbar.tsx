'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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
        </ul>

        {/* CTA Button */}
        <a href="https://www.instagram.com/smartadverts_/" target="_blank" rel="noopener noreferrer" className="nav-cta" id="nav-cta-button">
          Contact Us
        </a>

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
