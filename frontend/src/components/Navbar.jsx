import React, { useState } from 'react';

export default function Navbar({
  activeTab,
  onTabChange,
  savedCount = 0,
  compareCount = 0,
  onOpenComparison,
  onOpenSaved,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      {/* Subtle Top Utility Bar */}
      <div className="top-utility-bar">
        <div className="top-utility-inner">
          <div className="utility-left">
            <span className="live-pulse"></span>
            <span>Tricity’s Direct Marketplace • 100% For Sale Only • Direct Seller Connect</span>
          </div>
          <div className="utility-right">
            <span>Buyer Helpline: <strong>+91 (0172) 400-8800</strong></span>
            <span className="util-sep">|</span>
            <span>RERA Registered Properties</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-navbar" aria-label="Main Navigation">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => handleNavClick('home')}>
            <div className="logo-emblem">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div className="brand-text-block">
              <span className="brand-title">Tricity Housing</span>
              <span className="brand-subtitle">Real Estate Marketplace</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="nav-menu">
            <button
              className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'properties' ? 'active' : ''}`}
              onClick={() => handleNavClick('properties')}
            >
              Explore Homes
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'localities' ? 'active' : ''}`}
              onClick={() => handleNavClick('localities')}
            >
              Localities
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'principles' ? 'active' : ''}`}
              onClick={() => handleNavClick('principles')}
            >
              Why Tricity Housing
            </button>
          </div>

          {/* Right Actions */}
          <div className="nav-right-actions">
            {compareCount > 0 && (
              <button
                className="nav-action-btn compare-pill-btn"
                onClick={onOpenComparison}
                title="View side-by-side comparison"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="8" height="18" rx="2" ry="2"></rect>
                  <rect x="14" y="3" width="8" height="18" rx="2" ry="2"></rect>
                </svg>
                <span>Compare</span>
                <span className="counter-bubble">{compareCount}</span>
              </button>
            )}

            <button
              className={`nav-action-btn saved-btn ${savedCount > 0 ? 'has-saved' : ''}`}
              onClick={onOpenSaved}
              title="Saved Properties Shortlist"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={savedCount > 0 ? "#e11d48" : "none"}
                stroke={savedCount > 0 ? "#e11d48" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Saved</span>
              {savedCount > 0 && <span className="counter-bubble">{savedCount}</span>}
            </button>

            {/* Helpline Pill */}
            <a
              href="tel:+911724008800"
              className="nav-helpline-link"
              title="Call Tricity Housing Buyer Support"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>0172-400-8800</span>
            </a>

            {/* Add Property Button */}
            <button
              className="post-property-btn"
              onClick={() => handleNavClick('add')}
            >
              <span className="btn-plus">+</span>
              <span>Add Property</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <button
              className={`mobile-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button
              className={`mobile-link ${activeTab === 'properties' ? 'active' : ''}`}
              onClick={() => handleNavClick('properties')}
            >
              Explore Homes
            </button>
            <button
              className={`mobile-link ${activeTab === 'localities' ? 'active' : ''}`}
              onClick={() => handleNavClick('localities')}
            >
              Tricity Localities
            </button>
            <button
              className={`mobile-link ${activeTab === 'principles' ? 'active' : ''}`}
              onClick={() => handleNavClick('principles')}
            >
              Why Tricity Housing
            </button>
            <button
              className={`mobile-link add-prop-mobile ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => handleNavClick('add')}
            >
              + Add Property (Free)
            </button>

            <div className="mobile-contact-strip">
              <span>📞 Buyer Helpline: +91 (0172) 400-8800</span>
              <span>100% Free • Open to All Buyers</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
