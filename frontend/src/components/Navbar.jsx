import React, { useState } from 'react';

export default function Navbar({
  selectedCity,
  onCityChange,
  activeTab,
  onTabChange,
  savedCount = 0,
  compareCount = 0,
  onOpenComparison,
  onOpenSaved,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cities = ['All Tricity', 'Mohali', 'Chandigarh', 'Panchkula', 'Zirakpur', 'New Chandigarh'];

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
            <span>Tricity’s Direct Marketplace • 100% For Sale Only • No Buyer Wall</span>
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
              <span className="emblem-tri">▲</span>
              <span className="emblem-roof">⌂</span>
            </div>
            <div className="brand-text-block">
              <span className="brand-title">Tricity Housing</span>
              <span className="brand-subtitle">Real Estate Marketplace</span>
            </div>
          </div>

          {/* City / Locality Quick Selector */}
          <div className="nav-city-selector">
            <span className="city-icon">📍</span>
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              aria-label="Filter by Tricity Region"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
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

          {/* Right Utility Buttons */}
          <div className="nav-right-actions">
            {compareCount > 0 && (
              <button
                className="nav-icon-btn compare-pill-btn"
                onClick={onOpenComparison}
                title="View side by side comparison"
              >
                ⚖️ Compare
                <span className="counter-bubble">{compareCount}</span>
              </button>
            )}

            <button
              className="nav-icon-btn saved-btn"
              onClick={onOpenSaved}
              title="Saved Shortlist"
            >
              ❤️
              {savedCount > 0 && <span className="counter-bubble">{savedCount}</span>}
            </button>

            {/* Contact Helpline for Buyers */}
            <a
              href="tel:+911724008800"
              className="nav-helpline-link"
              title="Call Tricity Housing Buyer Support"
            >
              <span className="phone-icon">📞</span>
              <span className="phone-text">0172-400-8800</span>
            </a>

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
            <div className="mobile-city-picker">
              <label>Select City:</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  onCityChange(e.target.value);
                  setMobileMenuOpen(false);
                }}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

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
              Explore Properties for Sale
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
              Product Principles & Trust
            </button>


            <div className="mobile-contact-strip">
              <span>Helpline: +91 (0172) 400-8800</span>
              <span>100% Free • Open to All Buyers</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
