import React from 'react';

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <div className="card-image-wrap">
        <img src={property.image} alt={property.title} className="card-image" />
        <span className="card-badge">{property.type}</span>
      </div>
      <div className="card-content">
        <div className="card-price">${property.price.toLocaleString()}</div>
        <h3 className="card-title">{property.title}</h3>
        <p className="card-location">📍 {property.location}</p>
        <div className="card-meta">
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🚿 {property.bathrooms} Baths</span>
          <span>📐 {property.area}</span>
        </div>
      </div>
    </div>
  );
}
