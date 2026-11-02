import React, { useState } from 'react';

export default function PropertyCard({
  property,
  isCompared = false,
  isSaved = false,
  onToggleCompare,
  onToggleSave,
  onOpenLeadModal,
  onSelectProperty,
}) {
  const [showPhone, setShowPhone] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const imagesList =
    property.images && property.images.length > 0 ? property.images : [property.image];
  const currentImg = imagesList[activeImgIndex] || property.image;

  const handleCallClick = (e) => {
    e.stopPropagation();
    setShowPhone(!showPhone);
  };

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = () => {
    if (onSelectProperty) {
      onSelectProperty(property);
    }
  };

  return (
    <article className="prop-card-figma">
      {/* Image & Overlay Badges */}
      <div
        className="prop-image-wrap clickable-prop-image"
        onClick={handleCardClick}
        title="Click to view full property details"
      >
        <img
          src={currentImg}
          alt={property.title}
          className="prop-main-image"
          loading="lazy"
        />

        {/* Carousel controls if multiple pictures exist */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              className="card-carousel-btn prev-btn"
              onClick={handlePrevImg}
              aria-label="Previous Photo"
            >
              ‹
            </button>
            <button
              type="button"
              className="card-carousel-btn next-btn"
              onClick={handleNextImg}
              aria-label="Next Photo"
            >
              ›
            </button>
            <span className="card-photo-count">
              📷 {activeImgIndex + 1}/{imagesList.length}
            </span>
          </>
        )}

        <div className="prop-top-badges">
          <span className="badge-possession">{property.possessionStatus}</span>
          <span className="badge-source">
            <span className="verify-dot">✓</span> {property.listingSource}
          </span>
        </div>

        <button
          className={`prop-fav-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleSave) onToggleSave(property.id);
          }}
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
          <div onClick={handleCardClick} className="clickable-price-area">
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
        <h3
          className="prop-title clickable-title"
          title={property.title}
          onClick={handleCardClick}
        >
          {property.title}
        </h3>
        <p className="prop-location">
          <span className="pin-icon">📍</span> {property.location}
        </p>

        {/* Specs row */}
        <div className="prop-specs-bar" onClick={handleCardClick}>
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
            <strong>{property.sellerPhone || '+91 98888 XXXXX'}</strong>
          </div>
        )}

        {/* Quick View Details Button Link */}
        <button
          type="button"
          className="card-details-link-btn"
          onClick={handleCardClick}
        >
          View Full Details & Floor Plans →
        </button>

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
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenLeadModal) onOpenLeadModal(property, 'visit');
            }}
          >
            Schedule Visit
          </button>

          <button
            className={`action-btn compare-btn ${isCompared ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleCompare) onToggleCompare(property);
            }}
            title="Compare side by side without login"
          >
            {isCompared ? '✓ Added' : 'Compare'}
          </button>
        </div>
      </div>
    </article>
  );
}
