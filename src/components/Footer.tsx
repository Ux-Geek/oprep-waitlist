import React from "react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo className="footer-logo" />
            <p className="footer-tagline">
              A cracked, better way to study. Built properly for JAMB, WAEC, IELTS & SAT.
            </p>
            <div className="footer-socials">
              <a href="https://x.com/oprep" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                Twitter/X
              </a>
              <a href="https://instagram.com/oprep" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                Instagram
              </a>
              <a href="https://linkedin.com/company/oprep" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                LinkedIn
              </a>
            </div>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-links-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#system">The System</a>
              <a href="#pricing">Pricing</a>
            </div>
            
            <div className="footer-links-col">
              <h4>Contact</h4>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="footer-contact-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                WhatsApp
              </a>
              <a href="mailto:hello@oprep.app" className="footer-contact-link">hello@oprep.app</a>
              <span className="footer-contact-info">Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 O/Prep. Built for ambitious exam takers.</p>
        </div>
      </div>
    </footer>
  );
}
