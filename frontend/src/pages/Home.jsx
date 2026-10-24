import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function Home({
  properties = [],
  selectedCity = 'All Tricity',
  onCityChange,
  onNavigateToProperties,
  onOpenLeadModal,
  onToggleCompare,
  onToggleSave,
  comparedIds = [],
  savedIds = [],
}) {
  const [searchLocality, setSearchLocality] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [searchIntentTab, setSearchIntentTab] = useState('Buy');
  const [propertyFilterTab, setPropertyFilterTab] = useState('all');
  const [bannerSlide, setBannerSlide] = useState(0);

  const bannerProjects = [
    {
      presenter: 'HERO HOMES PRESENTS',
      config: '3 & 4 BHK',
      tag: 'PREMIUM RESIDENCES',
      price: '₹1.18 Cr* Onwards',
      name: 'Leafsong Retreat',
      subname: 'BY HERO HOMES',
      location: 'Sector 82, Airport Road, Mohali',
      tagline: 'LIFE AT EASE • BREATHE BETTER WITH AQI-CONTROLLED HOMES',
      rera: 'PBRERA-SAS80-PR0641',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      presenter: 'SUSHMA GROUP PRESENTS',
      config: '3 & 4 BHK',
      tag: 'ULTRA-LUXURY LIVING',
      price: '₹1.35 Cr* Onwards',
      name: 'Belleza Residences',
      subname: 'PR-7 AIRPORT RING ROAD',
      location: 'PR-7 Airport Road, Zirakpur',
      tagline: 'SPANISH ARCHITECTURE • 100% POWER BACKUP & RESORT AMENITIES',
      rera: 'PBRERA-ZRK-1102',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    }
  ];

  const currentBanner = bannerProjects[bannerSlide];

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigateToProperties({
      city: selectedCity,
      location: searchLocality,
      type: propertyType,
      bhk: 'All',
    });
  };

  const handleQuickLocalityClick = (localityName, city) => {
    if (city && onCityChange) {
      onCityChange(city);
    }
    setSearchLocality(localityName);
    onNavigateToProperties({
      city: city || selectedCity,
      location: localityName,
    });
  };

  // Filter featured properties — shows up to 10
  const filteredProperties = properties.filter((p) => {
    if (selectedCity !== 'All Tricity' && p.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (propertyFilterTab === 'ready') return p.possessionStatus.toLowerCase().includes('ready');
    if (propertyFilterTab === 'under15') return p.price <= 15000000;
    if (propertyFilterTab === 'luxury') return p.price > 20000000 || p.type === 'Villa';
    if (propertyFilterTab === 'builder') return p.type.toLowerCase().includes('floor');
    return true;
  });

  const cityOptions = ['All Tricity', 'Mohali', 'Chandigarh', 'Panchkula', 'Zirakpur', 'New Chandigarh'];

  return (
    <div className="home-experience">
      {/* =========================================================
         99acres-Style Top Project Banner & Overlapping Search Card
         ========================================================= */}
      <section className="banner-hero-wrapper">
        {/* Top Promotional Project Banner */}
        <div className="project-promo-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,13,28,0.92) 0%, rgba(15,20,40,0.82) 45%, rgba(10,13,28,0.92) 100%), url(${currentBanner.image})` }}>
          <div className="banner-content-grid">
            {/* Left Block: Offer & Pricing */}
            <div className="banner-col-left">
              <div className="banner-brand-tag">
                <span className="brand-logo-gem">✦</span>
                <span className="brand-presenter">{currentBanner.presenter}</span>
              </div>
              <h2 className="banner-bhk-title">{currentBanner.config}</h2>
              <p className="banner-residence-sub">{currentBanner.tag}</p>
              <div className="banner-price-tag">
                <span className="price-label">STARTING PRICE AS</span>
                <span className="price-val">{currentBanner.price}</span>
              </div>
            </div>

            {/* Center Block: Visual Render Accent */}
            <div className="banner-col-center">
              <img
                src={currentBanner.image}
                alt={currentBanner.name}
                className="banner-facade-img"
              />
            </div>

            {/* Right Block: Project Details & RERA */}
            <div className="banner-col-right">
              <div className="banner-project-title-block">
                <h3 className="banner-project-name">{currentBanner.name}</h3>
                <span className="banner-project-sub">{currentBanner.subname}</span>
                <p className="banner-project-loc">📍 {currentBanner.location}</p>
              </div>

              <div className="banner-life-tagline">
                <strong>{currentBanner.tagline}</strong>
              </div>

              <div className="banner-rera-stamp">
                <div className="rera-qr-box">
                  <span className="qr-sim">▦</span>
                </div>
                <div className="rera-info-text">
                  <span className="rera-num">RERA: {currentBanner.rera}</span>
                  <span className="rera-legal">100% PBRERA / HRERA Verified & Escrow Protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Slider Next/Prev Arrows */}
          <button
            type="button"
            className="banner-slider-arrow prev"
            onClick={() => setBannerSlide(prev => prev === 0 ? bannerProjects.length - 1 : prev - 1)}
            aria-label="Previous Project"
          >
            ‹
          </button>
          <button
            type="button"
            className="banner-slider-arrow next"
            onClick={() => setBannerSlide(prev => prev === bannerProjects.length - 1 ? 0 : prev + 1)}
            aria-label="Next Project"
          >
            ›
          </button>
        </div>

        {/* Floating 99acres Search Card overlapping the banner */}
        <div className="floating-search-card-container">
          <div className="ninety-nine-search-card">
            {/* Top Search Tabs Row */}
            <div className="search-card-top-tabs">
              <div className="card-intent-tabs">
                {[
                  { label: 'Buy', value: 'Buy' },
                  { label: 'Builder Floors', value: 'Floor' },
                  { label: 'New Launch', value: 'New', dot: true },
                  { label: 'Commercial', value: 'Commercial' },
                  { label: 'Plots/Land', value: 'Plot' },
                  { label: 'Villas', value: 'Villa' },
                ].map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    className={`intent-tab-btn ${searchIntentTab === tab.value ? 'active' : ''}`}
                    onClick={() => {
                      setSearchIntentTab(tab.value);
                      if (tab.value === 'Commercial') setPropertyType('Commercial');
                      else if (tab.value === 'Plot') setPropertyType('Residential Plot');
                      else if (tab.value === 'Villa') setPropertyType('Villa');
                      else if (tab.value === 'Floor') setPropertyType('Independent Floor');
                      else setPropertyType('All');
                    }}
                  >
                    <span>{tab.label}</span>
                    {tab.dot && <span className="tab-red-dot"></span>}
                  </button>
                ))}
              </div>

              <div className="card-post-link">
                <button
                  type="button"
                  className="post-prop-free-btn"
                  onClick={() => onNavigateToProperties({ city: selectedCity })}
                >
                  <span>Post Property</span>
                  <span className="free-green-badge">FREE</span>
                </button>
              </div>
            </div>

            {/* Bottom Search Input Row */}
            <form onSubmit={handleSearchSubmit} className="search-card-input-bar">
              {/* City / Region Dropdown */}
              <div className="input-bar-city-select">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <select
                  value={selectedCity}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="city-inline-select"
                >
                  {cityOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="bar-vertical-line"></div>

              {/* Text Search Input */}
              <div className="input-bar-search-text">
                <svg className="glass-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder='Search "Sector 82, Airport Road, Mohali, Sector 34..."'
                  value={searchLocality}
                  onChange={(e) => setSearchLocality(e.target.value)}
                  className="search-main-input"
                />
                {searchLocality && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchLocality('')}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Target & Voice simulation icons */}
              <div className="input-bar-action-icons">
                <button
                  type="button"
                  className="bar-icon-action"
                  title="Detect nearby Tricity location"
                  onClick={() => setSearchLocality('Airport Road, Sector 82')}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="22" y1="12" x2="18" y2="12"></line>
                    <line x1="6" y1="12" x2="2" y2="12"></line>
                    <line x1="12" y1="6" x2="12" y2="2"></line>
                    <line x1="12" y1="22" x2="12" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  className="bar-icon-action"
                  title="Voice Search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </button>
              </div>

              {/* Primary Search CTA Button */}
              <button type="submit" className="bar-search-cta-btn">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================
         Featured Verified Residences Section (10 Listings)
         ========================================================= */}
      <section className="featured-listings-section">
        <div className="section-inner">
          <div className="section-header-flex">
            <div>
              <span className="subtle-kicker">VERIFIED PROPERTIES FOR SALE</span>
              <h2>Featured Tricity Residences ({filteredProperties.length} Listings)</h2>
              <p>Inspected by our local team with verified legal ownership & RERA compliance</p>
            </div>

            {/* Filter Pills */}
            <div className="listing-filter-pills">
              <button
                className={`filter-pill ${propertyFilterTab === 'all' ? 'active' : ''}`}
                onClick={() => setPropertyFilterTab('all')}
              >
                All Listings ({properties.length})
              </button>
              <button
                className={`filter-pill ${propertyFilterTab === 'ready' ? 'active' : ''}`}
                onClick={() => setPropertyFilterTab('ready')}
              >
                Ready to Move
              </button>
              <button
                className={`filter-pill ${propertyFilterTab === 'under15' ? 'active' : ''}`}
                onClick={() => setPropertyFilterTab('under15')}
              >
                Under ₹1.5 Cr
              </button>
              <button
                className={`filter-pill ${propertyFilterTab === 'luxury' ? 'active' : ''}`}
                onClick={() => setPropertyFilterTab('luxury')}
              >
                Luxury & Villas
              </button>
              <button
                className={`filter-pill ${propertyFilterTab === 'builder' ? 'active' : ''}`}
                onClick={() => setPropertyFilterTab('builder')}
              >
                Builder Floors
              </button>
            </div>
          </div>

          {/* Cards Grid: Showing 10 listings */}
          <div className="figma-cards-grid">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isCompared={comparedIds.includes(prop.id)}
                isSaved={savedIds.includes(prop.id)}
                onToggleCompare={onToggleCompare}
                onToggleSave={onToggleSave}
                onOpenLeadModal={onOpenLeadModal}
              />
            ))}
          </div>

          <div className="browse-all-center">
            <button
              className="browse-all-btn"
              onClick={() => onNavigateToProperties({ city: selectedCity })}
            >
              <span>Browse All Verified Tricity Properties</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
         Locality Showcase (Tricity Prime Hubs)
         ========================================================= */}
      <section className="localities-showcase-section">
        <div className="section-inner">
          <div className="section-head-center">
            <span className="subtle-kicker">Explore Regions</span>
            <h2>Top Localities Across Chandigarh, Mohali & Panchkula</h2>
            <p>Compare real estate growth corridors, connectivity, and average price trends</p>
          </div>

          <div className="localities-grid">
            <div
              className="locality-card"
              onClick={() => handleQuickLocalityClick('Sector 82', 'Mohali')}
            >
              <div className="locality-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                  alt="Airport Road Sector 82 Mohali"
                  loading="lazy"
                />
                <span className="loc-badge">Mohali</span>
                <span className="loc-trend-tag">Growth Corridor</span>
              </div>
              <div className="locality-info">
                <h4>Airport Road & Sector 82</h4>
                <p className="loc-tagline">Hub for Luxury High-Rises & Commercial Corridors</p>
                <div className="loc-meta">
                  <span className="loc-price-badge">Avg: ₹6,800 / sq.ft.</span>
                  <span className="loc-arrow">Explore →</span>
                </div>
              </div>
            </div>

            <div
              className="locality-card"
              onClick={() => handleQuickLocalityClick('Sector 34', 'Chandigarh')}
            >
              <div className="locality-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
                  alt="Sector 34 Chandigarh"
                  loading="lazy"
                />
                <span className="loc-badge">Chandigarh</span>
                <span className="loc-trend-tag">Prime Central</span>
              </div>
              <div className="locality-info">
                <h4>Sector 34 & Central Sectors</h4>
                <p className="loc-tagline">Prime Builder Floors with Elite Social Infrastructure</p>
                <div className="loc-meta">
                  <span className="loc-price-badge">Avg: ₹9,800 / sq.ft.</span>
                  <span className="loc-arrow">Explore →</span>
                </div>
              </div>
            </div>

            <div
              className="locality-card"
              onClick={() => handleQuickLocalityClick('MDC', 'Panchkula')}
            >
              <div className="locality-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                  alt="MDC Panchkula"
                  loading="lazy"
                />
                <span className="loc-badge">Panchkula</span>
                <span className="loc-trend-tag">Scenic Living</span>
              </div>
              <div className="locality-info">
                <h4>MDC & Sector 20, Panchkula</h4>
                <p className="loc-tagline">Scenic Shivalik Views & Low-Density Gated Communities</p>
                <div className="loc-meta">
                  <span className="loc-price-badge">Avg: ₹7,500 / sq.ft.</span>
                  <span className="loc-arrow">Explore →</span>
                </div>
              </div>
            </div>

            <div
              className="locality-card"
              onClick={() => handleQuickLocalityClick('PR7', 'Zirakpur')}
            >
              <div className="locality-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
                  alt="PR7 Airport Ring Road Zirakpur"
                  loading="lazy"
                />
                <span className="loc-badge">Zirakpur</span>
                <span className="loc-trend-tag">High Connectivity</span>
              </div>
              <div className="locality-info">
                <h4>PR7 Airport Ring Road</h4>
                <p className="loc-tagline">Rapidly Growing Gated Communities & Ring Road Access</p>
                <div className="loc-meta">
                  <span className="loc-price-badge">Avg: ₹5,400 / sq.ft.</span>
                  <span className="loc-arrow">Explore →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         Assisted Site Visit Banner
         ========================================================= */}
      <section className="assisted-visit-banner">
        <div className="section-inner">
          <div className="banner-box">
            <div className="banner-left">
              <span className="banner-pill">Free Buyer Concierge</span>
              <h2>Want to inspect properties this weekend?</h2>
              <p>
                Book a private, escorted site tour with a verified local Tricity property expert.
                Zero sales pressure, genuine title guidance, and 100% free of charge.
              </p>
              <div className="banner-points">
                <span className="point-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Free Pick & Drop Available
                </span>
                <span className="point-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Direct Builder & Owner Interaction
                </span>
                <span className="point-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  RERA Document Inspection
                </span>
              </div>
            </div>

            <div className="banner-right">
              <div className="quick-tour-card">
                <h4>Schedule Free Weekend Tour</h4>
                <p>Select your preferred area and our concierge will coordinate directly:</p>
                <div className="tour-action-row">
                  <button
                    className="tour-btn"
                    onClick={() =>
                      onOpenLeadModal(properties[0], 'visit')
                    }
                  >
                    <span>Book Tour in Mohali (PR7 / Aerocity)</span>
                    <span className="tour-arrow">→</span>
                  </button>
                  <button
                    className="tour-btn"
                    onClick={() =>
                      onOpenLeadModal(properties[1], 'visit')
                    }
                  >
                    <span>Book Tour in Chandigarh / Panchkula</span>
                    <span className="tour-arrow">→</span>
                  </button>
                </div>
                <div className="tour-helpline">
                  Or call directly: <strong>+91 (0172) 400-8800</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         Buyer FAQ Section
         ========================================================= */}
      <section className="faq-section">
        <div className="section-inner">
          <div className="section-head-center">
            <span className="subtle-kicker">Transparent Answers</span>
            <h2>Frequently Asked Questions by Homebuyers</h2>
            <p>Everything you need to know about purchasing property in the Tricity</p>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-card-head">
                <span className="faq-badge-q">Q1</span>
                <h4>Why do I not need an account to view seller contacts?</h4>
              </div>
              <p>
                In accordance with our core product principle, real estate information
                belongs to everyone. You can browse floor plans, view prices, compare properties,
                and contact sellers directly without signup walls or paywalls.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-card-head">
                <span className="faq-badge-q">Q2</span>
                <h4>How are properties verified on Tricity Housing?</h4>
              </div>
              <p>
                Every listing is cross-checked against Punjab RERA (PBRERA) or Haryana RERA (HRERA)
                portals, ownership title deed records, and an in-person physical site review before
                receiving the green verification badge.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-card-head">
                <span className="faq-badge-q">Q3</span>
                <h4>Are there any buyer commissions or platform fees?</h4>
              </div>
              <p>
                No. Tricity Housing is 100% free for buyers. There are zero hidden fees, zero
                transaction markups, and zero buyer brokerage charges.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-card-head">
                <span className="faq-badge-q">Q4</span>
                <h4>How do I schedule an escorted site visit?</h4>
              </div>
              <p>
                Simply click "Schedule Visit" on any listing you are interested in. Choose your preferred
                weekend or weekday time slot, and a verified Tricity property advisor will coordinate
                the tour with the seller directly at no cost to you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
