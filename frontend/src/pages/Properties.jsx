import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function Properties({ properties, initialFilters }) {
  const [searchTerm, setSearchTerm] = useState(initialFilters?.location || '');
  const [selectedType, setSelectedType] = useState(initialFilters?.type || 'All');

  const filteredProperties = properties.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'All' || item.type.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="section-container page-top-padding">
      <div className="page-header">
        <h2>Explore Properties</h2>
        <p>Browse through all available houses, apartments, and villas</p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by city, title, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="type-pills">
          {['All', 'House', 'Apartment', 'Villa'].map((type) => (
            <button
              key={type}
              className={`pill-btn ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="empty-state">
          <p>No properties match your current filter criteria.</p>
          <button 
            className="outline-btn"
            onClick={() => { setSearchTerm(''); setSelectedType('All'); }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="properties-grid">
          {filteredProperties.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      )}
    </div>
  );
}
