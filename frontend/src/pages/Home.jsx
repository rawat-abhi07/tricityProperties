import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function Home({ properties, onNavigateToProperties }) {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigateToProperties({ location: searchLocation, type: selectedType });
  };

  const featured = properties.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find Your Perfect Sanctuary</h1>
          <p>Discover houses, apartments, and luxury villas suited to your lifestyle.</p>

          <form className="search-bar-box" onSubmit={handleSearchSubmit}>
            <div className="search-input-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="City, neighborhood, or state..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>

            <div className="search-input-group">
              <label>Property Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Section */}
      <section className="section-container">
        <div className="section-header">
          <div>
            <h2>Featured Properties</h2>
            <p>Hand-picked premium listings available right now</p>
          </div>
          <button
            className="outline-btn"
            onClick={() => onNavigateToProperties({})}
          >
            View All ({properties.length}) →
          </button>
        </div>

        <div className="properties-grid">
          {featured.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      </section>

      {/* Features highlight */}
      <section className="highlights-section">
        <div className="highlight-item">
          <span className="hl-icon">⚡</span>
          <h4>Instant Verification</h4>
          <p>Every listed property is reviewed and verified by certified agents.</p>
        </div>
        <div className="highlight-item">
          <span className="hl-icon">🛡️</span>
          <h4>Secure Transactions</h4>
          <p>Direct communication and legally vetted contracts for peace of mind.</p>
        </div>
        <div className="highlight-item">
          <span className="hl-icon">📊</span>
          <h4>Market Insights</h4>
          <p>Real-time pricing data and neighborhood trends to make smart investments.</p>
        </div>
      </section>
    </div>
  );
}
