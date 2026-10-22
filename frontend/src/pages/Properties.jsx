import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function Properties({
  properties = [],
  initialFilters = {},
  selectedCity = 'All Tricity',
  onCityChange,
  onOpenLeadModal,
  onToggleCompare,
  onToggleSave,
  comparedIds = [],
  savedIds = [],
}) {
  const [searchTerm, setSearchTerm] = useState(initialFilters?.location || '');
  const [selectedType, setSelectedType] = useState(initialFilters?.type || 'All');
  const [selectedBhk, setSelectedBhk] = useState(initialFilters?.bhk || 'All');
  const [selectedPossession, setSelectedPossession] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Filter properties
  let filtered = properties.filter((item) => {
    // City filter
    if (selectedCity !== 'All Tricity' && item.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(term);
      const matchLoc = item.location.toLowerCase().includes(term);
      const matchLocality = item.locality ? item.locality.toLowerCase().includes(term) : false;
      if (!matchTitle && !matchLoc && !matchLocality) return false;
    }

    // Type filter
    if (selectedType !== 'All' && item.type.toLowerCase() !== selectedType.toLowerCase()) {
      return false;
    }

    // BHK filter
    if (selectedBhk !== 'All' && !item.bhk.toLowerCase().includes(selectedBhk.toLowerCase())) {
      return false;
    }

    // Possession status
    if (selectedPossession !== 'All') {
      if (selectedPossession === 'Ready' && !item.possessionStatus.toLowerCase().includes('ready')) {
        return false;
      }
      if (selectedPossession === 'Under' && !item.possessionStatus.toLowerCase().includes('under')) {
        return false;
      }
    }

    return true;
  });

  // Sort properties
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'area-high') {
    filtered.sort((a, b) => parseInt(b.area) - parseInt(a.area));
  }

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedBhk('All');
    setSelectedPossession('All');
    if (onCityChange) onCityChange('All Tricity');
  };

  return (
    <div className="properties-page section-container">
      {/* Page Header */}
      <div className="explore-header-row">
        <div>
          <span className="subtle-kicker">100% For Sale • Verified Ownership</span>
          <h2>Properties in {selectedCity}</h2>
          <p className="explore-subtitle">
            Showing <strong>{filtered.length}</strong> verified residential homes ready for inspection
          </p>
        </div>

        <div className="explore-sort-wrap">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Featured / Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="area-high">Area: Largest First</option>
          </select>
        </div>
      </div>

      {/* Main Filter Bar */}
      <div className="property-filter-panel">
        <div className="filter-row-top">
          <div className="filter-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by Sector, Road, Builder or Landmark..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')}>✕</button>
            )}
          </div>

          <div className="filter-dropdowns">
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="filter-select"
            >
              <option value="All Tricity">All Tricity</option>
              <option value="Mohali">Mohali</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Panchkula">Panchkula</option>
              <option value="Zirakpur">Zirakpur</option>
              <option value="New Chandigarh">New Chandigarh</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Independent Floor">Builder Floor</option>
              <option value="Villa">Villa</option>
              <option value="Residential Plot">Plot</option>
            </select>

            <select
              value={selectedBhk}
              onChange={(e) => setSelectedBhk(e.target.value)}
              className="filter-select"
            >
              <option value="All">Any BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK+</option>
            </select>

            <select
              value={selectedPossession}
              onChange={(e) => setSelectedPossession(e.target.value)}
              className="filter-select"
            >
              <option value="All">Any Possession</option>
              <option value="Ready">Ready to Move</option>
              <option value="Under">Under Construction</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="active-filter-chips">
          <span className="chips-label">Quick Filters:</span>
          {['Ready to Move', 'Direct Owner', 'Verified Developer'].map((tag) => (
            <button
              key={tag}
              className="quick-chip"
              onClick={() => setSearchTerm(tag === 'Ready to Move' ? '' : tag)}
            >
              {tag}
            </button>
          ))}
          {(searchTerm || selectedType !== 'All' || selectedBhk !== 'All' || selectedCity !== 'All Tricity') && (
            <button className="reset-filters-btn" onClick={resetAllFilters}>
              Clear All Filters ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Results */}
      {filtered.length === 0 ? (
        <div className="empty-results-box">
          <div className="empty-icon">🏠</div>
          <h3>No Properties Matched Your Criteria</h3>
          <p>Try resetting filters or changing the locality to discover more options across Tricity.</p>
          <button className="reset-action-btn" onClick={resetAllFilters}>
            View All Tricity Properties
          </button>
        </div>
      ) : (
        <div className="figma-cards-grid">
          {filtered.map((item) => (
            <PropertyCard
              key={item.id}
              property={item}
              isCompared={comparedIds.includes(item.id)}
              isSaved={savedIds.includes(item.id)}
              onToggleCompare={onToggleCompare}
              onToggleSave={onToggleSave}
              onOpenLeadModal={onOpenLeadModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
