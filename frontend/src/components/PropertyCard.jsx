import React, { useState } from 'react';

export default function PropertyCard({
  property,
  isCompared = false,
  isSaved = false,
  onToggleCompare,
  onToggleSave,
  onOpenLeadModal,
}) {
  const [showPhone, setShowPhone] = useState(false);

  const handleCallClick = () => {
    setShowPhone(!showPhone);
  };

  return (
    <article className="prop-card-figma">
      {/* Image & Overlay Badges */}
      <div className="prop-image-wrap">
        <img
          src={property.image}
          alt={property.title}
          className="prop-main-image"
          loading="lazy"
        />

        <div className="prop-top-badges">
          <span className="badge-possession">{property.possessionStatus}</span>
          <span className="badge-source">
            <span className="verify-dot">✓</span> {property.listingSource}
          </span>
        </div>

        <button
          className={`prop-fav-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => onToggleSave(property.id)}
          title={isSaved ? 'Remove from Shortlist' : 'Add to Shortlist'}
          aria-label="Save property"
        >
          {isSaved ? '❤️' : '🤍'}
        </button>

        <span className="prop-type-tag">{property.type}</span>
      </div>

      {/* Card Content Body */}
      <div className="prop-body">
        {/* Pricing header */}
        <div className="prop-price-row">
          <div>
            <span className="prop-main-price">{property.formattedPrice}</span>
            {property.pricePerSqFt && (
              <span className="prop-rate">{property.pricePerSqFt}</span>
            )}
          </div>
          <div className="prop-rera-pill" title={`Registered under ${property.reraNumber}`}>
            <span className="shield-icon">🛡️</span> RERA
          </div>
        </div>

        {/* Title & Location */}
        <h3 className="prop-title" title={property.title}>
          {property.title}
        </h3>
        <p className="prop-location">
          <span className="pin-icon">📍</span> {property.location}
        </p>

        {/* Specs row */}
        <div className="prop-specs-bar">
          <div className="spec-item">
            <span className="spec-label">Config</span>
            <span className="spec-value">{property.bhk}</span>
          </div>
          <div className="spec-divider"></div>
          <div className="spec-item">
            <span className="spec-label">Area</span>
            <span className="spec-value">{property.area}</span>
          </div>
          <div className="spec-divider"></div>
          <div className="spec-item">
            <span className="spec-label">Baths</span>
            <span className="spec-value">{property.bathrooms}</span>
          </div>
        </div>

        {/* Inline Phone Reveal if clicked */}
        {showPhone && (
          <div className="prop-phone-reveal">
            <span>Direct Seller:</span>
            <strong>{property.sellerPhone}</strong>
          </div>
        )}

        {/* Actions matching Figma: Call now, Schedule Visit, Compare */}
        <div className="prop-card-actions">
          <button
            className="action-btn call-btn"
            onClick={handleCallClick}
            title="Direct Verified Contact"
          >
            📞 {showPhone ? 'Hide Number' : 'Call Now'}
          </button>

          <button
            className="action-btn visit-btn"
            onClick={() => onOpenLeadModal(property, 'visit')}
          >
            Schedule Visit
          </button>

          <button
            className={`action-btn compare-btn ${isCompared ? 'active' : ''}`}
            onClick={() => onToggleCompare(property)}
            title="Compare side by side without login"
          >
            {isCompared ? '✓ Added' : 'Compare'}
          </button>
        </div>
      </div>
    </article>
  );
}
