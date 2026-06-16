'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { 
  Instagram, 
  Mail, 
  Youtube, 
  ExternalLink, 
  MessageSquare,
  Clock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="main-footer" id="global-footer">
      {/* Decorative Background Mesh / Radial Glowing Lights */}
      <div className="footer-glow-1" />
      <div className="footer-glow-2" />
      
      {/* Premium Grain Overlay */}
      <div className="footer-grain" />

      <div className="footer-container">
        {/* Column 1: Brand & About */}
        <div className="footer-col brand-col">
          <Link href="/" className="footer-logo-link" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
            <Logo height={48} />
          </Link>
          <p className="footer-description">
            We engineer high-CTR thumbnail visuals that command attention, increase organic click-through rates, and scale creator brands.
          </p>
          <div className="footer-socials">
            <a 
              href="https://www.instagram.com/smartadverts_/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-icon"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.youtube.com/@sidrth_roy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-icon"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-col">
          <h3 className="footer-col-title">Navigation</h3>
          <ul className="footer-links-list">
            <li>
              <Link href="/" className="footer-nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/works" className="footer-nav-link">
                Our Works
              </Link>
            </li>
            <li>
              <Link href="/clients" className="footer-nav-link">
                Our Clients
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-nav-link">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & DMs */}
        <div className="footer-col">
          <h3 className="footer-col-title">Inquiries</h3>
          <ul className="footer-contact-list">
            <li>
              <a href="mailto:hello@smartadverts.co" className="footer-nav-link">
                <Mail size={16} className="footer-icon-accent" />
                <span>hello@smartadverts.co</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.instagram.com/smartadverts_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-nav-link"
              >
                <MessageSquare size={16} className="footer-icon-accent" />
                <span>Instagram DM</span>
                <ExternalLink size={12} style={{ opacity: 0.6 }} />
              </a>
            </li>
            <li>
              <div className="footer-text-info">
                <Clock size={16} className="footer-icon-accent" />
                <span>Response Time: &lt; 12 hours</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Metadata & Copyright */}
      <div className="footer-bottom">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} SmartAdverts Catalog. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <span className="love-from-editor">Love from Editor</span>
        </div>
      </div>
    </footer>
  );
}
