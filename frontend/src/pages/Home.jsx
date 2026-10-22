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
  const [selectedBhk, setSelectedBhk] = useState('All');
  const [budgetRange, setBudgetRange] = useState('All');
  const [propertyFilterTab, setPropertyFilterTab] = useState('all');

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigateToProperties({
      city: selectedCity,
      location: searchLocality,
      type: propertyType,
      bhk: selectedBhk,
      budget: budgetRange,
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

  // Filter featured properties
  const filteredProperties = properties.filter((p) => {
    if (selectedCity !== 'All Tricity' && p.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (propertyFilterTab === 'ready') return p.possessionStatus.toLowerCase().includes('ready');
    if (propertyFilterTab === 'under15') return p.price <= 15000000;
    if (propertyFilterTab === 'luxury') return p.price > 20000000 || p.type === 'Villa';
    return true;
  });

  return (
    <div className="home-experience">
      {/* Hero Section */}
      <section className="subtle-hero">
        <div className="hero-pattern-bg"></div>
        <div className="hero-container">
          {/* Trust Banner */}
          <div className="hero-trust-tag">
            <span className="spark-icon">✨</span>
            <span>Tricity’s Direct Verified Marketplace • No Account Wall</span>
          </div>

          <h1 className="hero-heading">
            Find Your Verified Home in the <span className="highlight-text">Tricity</span>.
          </h1>
          <p className="hero-subtext">
            Discover verified apartments, builder floors, and luxury villas across Chandigarh, Mohali,
            & Panchkula. Direct seller connects, transparent RERA records, and strictly for sale.
          </p>

          {/* Search Box */}
          <div className="hero-search-card">
            {/* City Tabs */}
            <div className="search-city-tabs">
              {['All Tricity', 'Mohali', 'Chandigarh', 'Panchkula', 'Zirakpur'].map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`city-tab-btn ${selectedCity === city ? 'active' : ''}`}
                  onClick={() => onCityChange(city)}
                >
                  {city}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearchSubmit} className="search-inputs-grid">
              {/* Location Input */}
              <div className="search-field">
                <label>Locality / Sector</label>
                <div className="input-with-icon">
                  <span className="field-icon">📍</span>
                  <input
                    type="text"
                    placeholder="e.g. Sector 82, Airport Road, MDC..."
                    value={searchLocality}
                    onChange={(e) => setSearchLocality(e.target.value)}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="search-field">
                <label>Property Type</label>
                <div className="input-with-icon">
                  <span className="field-icon">🏠</span>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="All">All Types (Sale Only)</option>
                    <option value="Apartment">Apartment / Highrise</option>
                    <option value="Independent Floor">Builder / Independent Floor</option>
                    <option value="Villa">Luxury Villa</option>
                    <option value="Residential Plot">Residential Plot</option>
                  </select>
                </div>
              </div>

              {/* BHK Selection */}
              <div className="search-field">
                <label>Configuration</label>
                <div className="input-with-icon">
                  <span className="field-icon">🛏️</span>
                  <select
                    value={selectedBhk}
                    onChange={(e) => setSelectedBhk(e.target.value)}
                  >
                    <option value="All">Any BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK / 5 BHK</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="search-field">
                <label>Budget</label>
                <div className="input-with-icon">
                  <span className="field-icon">₹</span>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                  >
                    <option value="All">Any Budget</option>
                    <option value="under75">Under ₹75 Lakhs</option>
                    <option value="75to150">₹75 Lakhs - ₹1.50 Cr</option>
                    <option value="150to250">₹1.50 Cr - ₹2.50 Cr</option>
                    <option value="above250">Above ₹2.50 Cr</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="search-submit-col">
                <button type="submit" className="hero-search-btn">
                  Search Homes →
                </button>
              </div>
            </form>

            {/* Quick Trending Localities */}
            <div className="trending-chips-row">
              <span className="trending-label">Popular in Tricity:</span>
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleQuickLocalityClick('Airport Road', 'Mohali')}
              >
                Airport Road, Mohali
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleQuickLocalityClick('Sector 82', 'Mohali')}
              >
                Sector 82
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleQuickLocalityClick('Sector 34', 'Chandigarh')}
              >
                Sector 34 Chandigarh
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleQuickLocalityClick('MDC', 'Panchkula')}
              >
                MDC Panchkula
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleQuickLocalityClick('PR7', 'Zirakpur')}
              >
                PR7 Airport Road
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => handleQuickLocalityClick('Eco City', 'New Chandigarh')}
              >
                Eco City (Mullanpur)
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Verified Listings Section */}
      <section className="featured-listings-section">
        <div className="section-inner">
          <div className="section-header-flex">
            <div>
              <span className="subtle-kicker">Verified Properties For Sale</span>
              <h2>Featured Tricity Residences</h2>
              <p>Inspected by our local team with verified legal ownership & RERA compliance</p>
            </div>

            {/* Filter Tabs */}
            <div className="listing-filter-pills">
              <button
                className={`filter-pill ${propertyFilterTab === 'all' ? 'active' : ''}`}
                onClick={() => setPropertyFilterTab('all')}
              >
                All Verified ({properties.length})
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
                Villas & Luxury
              </button>
            </div>
          </div>

          {/* Cards Grid */}
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
              Browse All Verified Tricity Properties →
            </button>
          </div>
        </div>
      </section>

      {/* Locality Showcase (Tricity Hubs) */}
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
                />
                <span className="loc-badge">Mohali</span>
              </div>
              <div className="locality-info">
                <h4>Airport Road & Sector 82</h4>
                <p className="loc-tagline">Hub for Luxury High-Rises & Commercial Corridors</p>
                <div className="loc-meta">
                  <span>Avg: ₹6,800 / sq.ft.</span>
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
                />
                <span className="loc-badge">Chandigarh</span>
              </div>
              <div className="locality-info">
                <h4>Sector 34 & Central Sectors</h4>
                <p className="loc-tagline">Prime Builder Floors with Elite Social Infrastructure</p>
                <div className="loc-meta">
                  <span>Avg: ₹9,800 / sq.ft.</span>
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
                />
                <span className="loc-badge">Panchkula</span>
              </div>
              <div className="locality-info">
                <h4>MDC & Sector 20, Panchkula</h4>
                <p className="loc-tagline">Scenic Shivalik Views & Low-Density Living</p>
                <div className="loc-meta">
                  <span>Avg: ₹7,500 / sq.ft.</span>
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
                />
                <span className="loc-badge">Zirakpur</span>
              </div>
              <div className="locality-info">
                <h4>PR7 Airport Ring Road</h4>
                <p className="loc-tagline">Rapidly Growing Gated Communities & Ring Road Access</p>
                <div className="loc-meta">
                  <span>Avg: ₹5,400 / sq.ft.</span>
                  <span className="loc-arrow">Explore →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assisted Site Visit CTA Strip */}
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
                <span>✓ Pick & Drop Available</span>
                <span>✓ Direct Builder/Owner Interaction</span>
                <span>✓ RERA Document Inspection</span>
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
                    Book Tour in Mohali (PR7 / Aerocity)
                  </button>
                  <button
                    className="tour-btn"
                    onClick={() =>
                      onOpenLeadModal(properties[1], 'visit')
                    }
                  >
                    Book Tour in Chandigarh / Panchkula
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

      {/* Buyer FAQ Section */}
      <section className="faq-section">
        <div className="section-inner">
          <div className="section-head-center">
            <span className="subtle-kicker">Transparent Answers</span>
            <h2>Frequently Asked Questions by Homebuyers</h2>
            <p>Everything you need to know about purchasing property in the Tricity</p>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <h4>Why do I not need an account to view seller contacts?</h4>
              <p>
                In accordance with our core product principle, we believe real estate information
                belongs to everyone. You can browse floor plans, view prices, compare properties,
                and contact sellers directly without jumping through signup hurdles.
              </p>
            </div>

            <div className="faq-card">
              <h4>How are properties verified on Tricity Housing?</h4>
              <p>
                Every listing is cross-checked against Punjab RERA (PBRERA) or Haryana RERA (HRERA)
                portals, ownership title deed records, and an in-person physical site review before
                receiving the green verification badge.
              </p>
            </div>

            <div className="faq-card">
              <h4>Are there any buyer commissions or platform fees?</h4>
              <p>
                No. Tricity Housing is 100% free for buyers. There are zero hidden fees, zero
                transaction markups, and zero buyer brokerage charges.
              </p>
            </div>

            <div className="faq-card">
              <h4>How do I schedule an escorted site visit?</h4>
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
