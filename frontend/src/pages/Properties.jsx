import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import {
  IconSearch,
  IconCross,
  IconSliders,
  IconBuilding,
} from '../components/DetailIcons';

export default function Properties({
  properties = [],
  initialFilters = {},
  selectedCity = 'All Tricity',
  onCityChange,
  onOpenLeadModal,
  onToggleCompare,
  onToggleSave,
  onSelectProperty,
  comparedIds = [],
  savedIds = [],
}) {
  const [searchTerm, setSearchTerm] = useState(initialFilters?.location || '');
  const [selectedType, setSelectedType] = useState(initialFilters?.type || 'All');
  const [selectedBhk, setSelectedBhk] = useState(initialFilters?.bhk || 'All');
  const [selectedPossession, setSelectedPossession] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
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

    // Source filter (Direct Owner vs Verified Developer)
    if (selectedSource !== 'All' && item.listingSource.toLowerCase() !== selectedSource.toLowerCase()) {
      return false;
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
    setSelectedSource('All');
    if (onCityChange) onCityChange('All Tricity');
  };

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedType !== 'All' ||
    selectedBhk !== 'All' ||
    selectedPossession !== 'All' ||
    selectedSource !== 'All' ||
    selectedCity !== 'All Tricity';

  return (
    <div className="properties-page section-container">
      {/* Page Header */}
      <div className="explore-header-row">
        <div className="explore-header-text">
          <span className="subtle-kicker">100% Verified Ownership • Direct Seller Connect</span>
          <h2>Properties in {selectedCity}</h2>
          <p className="explore-subtitle">
            Showing <strong>{filtered.length}</strong> verified residences with zero brokerage & transparent pricing
          </p>
        </div>

        <div className="explore-sort-wrap">
          <span className="sort-label-text">
            <IconSliders size={14} className="sort-icon-svg" />
            <span>Sort by:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="explore-sort-select"
          >
            <option value="default">Featured & Recommended</option>
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
            <IconSearch size={17} className="filter-search-icon" />
            <input
              type="text"
              placeholder="Search by Sector, Road, Builder or Landmark..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                title="Clear Search"
              >
                <IconCross size={13} />
              </button>
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
              <option value="Residential Plot">Residential Plot</option>
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

          <button
            type="button"
            className={`quick-chip ${selectedPossession === 'Ready' ? 'active' : ''}`}
            onClick={() => setSelectedPossession(prev => prev === 'Ready' ? 'All' : 'Ready')}
          >
            Ready to Move
          </button>

          <button
            type="button"
            className={`quick-chip ${selectedSource === 'Direct Owner' ? 'active' : ''}`}
            onClick={() => setSelectedSource(prev => prev === 'Direct Owner' ? 'All' : 'Direct Owner')}
          >
            Direct Owner
          </button>

          <button
            type="button"
            className={`quick-chip ${selectedSource === 'Verified Developer' ? 'active' : ''}`}
            onClick={() => setSelectedSource(prev => prev === 'Verified Developer' ? 'All' : 'Verified Developer')}
          >
            Verified Developer
          </button>

          <button
            type="button"
            className={`quick-chip ${selectedType === 'Villa' ? 'active' : ''}`}
            onClick={() => setSelectedType(prev => prev === 'Villa' ? 'All' : 'Villa')}
          >
            Luxury Villas
          </button>

          {hasActiveFilters && (
            <button type="button" className="reset-filters-btn" onClick={resetAllFilters}>
              <IconCross size={12} className="reset-icon-svg" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Results */}
      {filtered.length === 0 ? (
        <div className="empty-results-box">
          <div className="empty-icon-wrap">
            <IconBuilding size={40} className="empty-icon-svg" />
          </div>
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
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      )}
    </div>
  );
}
