import React, { useState, useEffect, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import { submitLead, fetchPropertyById } from '../services/api';
import './PropertyDetail.css';

export default function PropertyDetail({
  property: initialProperty,
  propertyId,
  allProperties = [],
  onBack,
  onOpenLeadModal,
  onToggleCompare,
  onToggleSave,
  onSelectProperty,
  isCompared = false,
  isSaved = false,
  comparedIds = [],
  savedIds = [],
}) {
  const [fetchedProperty, setFetchedProperty] = useState(null);
  const [loading, setLoading] = useState(() => !initialProperty && Boolean(propertyId));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Derive the active property
  const property = initialProperty || fetchedProperty;

  // Quick Inline Lead Form state
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickLoading, setQuickLoading] = useState(false);
  const [quickError, setQuickError] = useState('');

  // Interactive EMI Calculator state
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  // Load property asynchronously only if passed by ID without initialProperty
  useEffect(() => {
    let isMounted = true;
    if (!initialProperty && propertyId) {
      fetchPropertyById(propertyId)
        .then((res) => {
          if (isMounted && res && res.data) {
            setFetchedProperty(res.data);
          }
        })
        .catch((err) => console.error('Failed to load property details:', err))
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [initialProperty, propertyId]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Images list
  const images = useMemo(() => {
    if (!property) return [];
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      return property.images;
    }
    return property.image ? [property.image] : [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ];
  }, [property]);

  // Calculations for EMI
  const emiData = useMemo(() => {
    if (!property || !property.price) {
      return { monthlyEmi: 0, loanAmount: 0, downPayment: 0, totalPayable: 0, totalInterest: 0 };
    }
    const price = Number(property.price);
    const downPayment = (price * downPaymentPercent) / 100;
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTenureYears * 12;

    if (monthlyRate === 0) {
      const emi = loanAmount / totalMonths;
      return { monthlyEmi: Math.round(emi), loanAmount, downPayment, totalPayable: loanAmount, totalInterest: 0 };
    }

    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayable = emi * totalMonths;
    const totalInterest = totalPayable - loanAmount;

    return {
      monthlyEmi: Math.round(emi),
      loanAmount: Math.round(loanAmount),
      downPayment: Math.round(downPayment),
      totalPayable: Math.round(totalPayable),
      totalInterest: Math.round(totalInterest),
    };
  }, [property, downPaymentPercent, interestRate, loanTenureYears]);

  // Similar properties in same city or category
  const similarProperties = useMemo(() => {
    if (!property) return [];
    return allProperties
      .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
      .slice(0, 3);
  }, [allProperties, property]);

  // Handle Share Link
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#property/${property.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      });
    } else {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  // Handle Quick Callback Submit
  const handleQuickInquiry = async (e) => {
    e.preventDefault();
    if (!quickName.trim()) {
      setQuickError('Please enter your name');
      return;
    }
    const cleanPhone = quickPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setQuickError('Please enter a valid 10-digit mobile number');
      return;
    }

    setQuickLoading(true);
    setQuickError('');

    try {
      await submitLead({
        name: quickName.trim(),
        phone: `+91 ${cleanPhone}`,
        propertyId: property.id,
        propertyTitle: property.title,
        location: property.location,
        mode: 'direct_callback',
        slot: 'Immediate Callback Requested',
      });
      setQuickSubmitted(true);
    } catch {
      setQuickSubmitted(true);
    } finally {
      setQuickLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="clean-listing-wrapper">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="clean-listing-wrapper">
        <div className="empty-results-box">
          <div className="empty-icon">⚠️</div>
          <h3>Property Not Found</h3>
          <p>The listing you are looking for may have been sold or removed.</p>
          <button className="reset-action-btn" onClick={onBack}>
            ← Back to All Properties
          </button>
        </div>
      </div>
    );
  }

  // Format currency
  const formatINR = (val) => {
    if (!val) return '₹ 0';
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  const cleanPhone = (property.sellerPhone || '+919888214500').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi, I am interested in "${property.title}" (${property.formattedPrice}) on Tricity Housing Marketplace. Please share more details.`
  )}`;

  return (
    <div className="clean-listing-page">
      {/* 1. Minimal Top Navigation Bar */}
      <div className="clean-top-nav">
        <div className="clean-nav-inner">
          <button className="clean-back-link" onClick={onBack}>
            <span className="arrow">←</span> All Properties
          </button>

          <div className="clean-nav-actions">
            <button
              className={`clean-action-btn ${isSaved ? 'active' : ''}`}
              onClick={() => {
                if (onToggleSave) onToggleSave(property.id);
              }}
              title={isSaved ? 'Saved in Shortlist' : 'Save Property'}
            >
              <span>{isSaved ? '❤️' : '🤍'}</span>
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              className={`clean-action-btn ${isCompared ? 'active' : ''}`}
              onClick={() => {
                if (onToggleCompare) onToggleCompare(property);
              }}
              title="Compare side by side"
            >
              <span>{isCompared ? '✓' : '⇄'}</span>
              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>

            <button className="clean-action-btn" onClick={handleShare} title="Share listing">
              <span>🔗</span>
              <span>{copiedShare ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="clean-listing-container">
        {/* 2. Title & Primary Price Row */}
        <section className="clean-header-row">
          <div className="clean-header-main">
            <div className="clean-meta-tags">
              <span className="meta-tag tag-possession">{property.possessionStatus || 'Ready to Move'}</span>
              <span className="meta-tag tag-type">{property.type}</span>
              <span className="meta-tag tag-verified">✓ {property.listingSource || 'Verified Developer'}</span>
              {property.reraNumber && (
                <span className="meta-tag tag-rera">RERA: {property.reraNumber}</span>
              )}
            </div>

            <h1 className="clean-property-title">{property.title}</h1>
            <p className="clean-property-address">
              <span className="pin">📍</span> {property.location}
              {property.city && <span className="city-label">, {property.city}</span>}
            </p>
          </div>

          <div className="clean-header-pricing">
            <div className="clean-price-val">{property.formattedPrice}</div>
            {property.pricePerSqFt && (
              <span className="clean-price-rate">{property.pricePerSqFt}</span>
            )}
            <div className="clean-emi-hint">
              Est. EMI ₹ {emiData.monthlyEmi.toLocaleString('en-IN')}/mo*
            </div>
          </div>
        </section>

        {/* 3. Minimalist Photo Gallery Grid */}
        <section className="clean-gallery-section">
          <div className="clean-gallery-grid">
            <div
              className="clean-gallery-hero"
              onClick={() => {
                setActiveImageIndex(0);
                setShowLightbox(true);
              }}
            >
              <img
                src={images[0]}
                alt={`${property.title} - Main View`}
                className="clean-gallery-img"
              />
              <span className="clean-inspect-badge">✓ Verified On-Site Inspection</span>
            </div>

            <div className="clean-gallery-side">
              {images.slice(1, 3).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="clean-gallery-thumb"
                  onClick={() => {
                    setActiveImageIndex(idx + 1);
                    setShowLightbox(true);
                  }}
                >
                  <img src={imgUrl} alt={`View ${idx + 2}`} loading="lazy" />
                  {idx === 1 && images.length > 3 && (
                    <div className="clean-more-overlay">
                      +{images.length - 2} More Photos
                    </div>
                  )}
                </div>
              ))}
              {images.length <= 1 && (
                <div
                  className="clean-gallery-thumb placeholder"
                  onClick={() => setShowLightbox(true)}
                >
                  <div className="clean-placeholder-text">
                    <span>🏠</span>
                    <span>High-Resolution Architectural View</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="clean-view-all-photos-btn"
            onClick={() => setShowLightbox(true)}
          >
            📷 View all {images.length} photos
          </button>
        </section>

        {/* 4. Two-Column Main Content Layout */}
        <div className="clean-layout-grid">
          {/* LEFT: Information & Specifications */}
          <div className="clean-content-col">
            {/* Quick Specs Bar */}
            <div className="clean-card clean-specs-card">
              <h2 className="clean-section-heading">Overview</h2>
              <div className="clean-specs-ribbon">
                <div className="spec-tile">
                  <span className="spec-label">Configuration</span>
                  <strong className="spec-data">{property.bhk}</strong>
                  <span className="spec-sub">{property.bedrooms || 3} Beds • {property.bathrooms || 3} Baths</span>
                </div>

                <div className="spec-tile">
                  <span className="spec-label">Super Built-up Area</span>
                  <strong className="spec-data">{property.area}</strong>
                  <span className="spec-sub">{property.carpetArea ? `Carpet: ${property.carpetArea}` : 'Standard Layout'}</span>
                </div>

                <div className="spec-tile">
                  <span className="spec-label">Status</span>
                  <strong className="spec-data">{property.possessionStatus || 'Ready to Move'}</strong>
                  <span className="spec-sub">Immediate Handover</span>
                </div>

                <div className="spec-tile">
                  <span className="spec-label">Facing & Vastu</span>
                  <strong className="spec-data">North-East</strong>
                  <span className="spec-sub">100% Vastu Compliant</span>
                </div>

                <div className="spec-tile">
                  <span className="spec-label">Property Type</span>
                  <strong className="spec-data">{property.type}</strong>
                  <span className="spec-sub">Freehold Registry</span>
                </div>

                <div className="spec-tile">
                  <span className="spec-label">Parking</span>
                  <strong className="spec-data">2 Covered Bays</strong>
                  <span className="spec-sub">Reserved Stilt</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="clean-card">
              <h2 className="clean-section-heading">About This Property</h2>
              <p className="clean-description-body">
                {property.description ||
                  `This refined ${property.bhk} residence located in ${property.location} delivers contemporary design, generous natural light, and seamless connectivity across Chandigarh, Mohali, and Panchkula.`}
              </p>

              <h3 className="clean-sub-heading">Key Features</h3>
              <ul className="clean-features-list">
                <li>
                  <span className="clean-check">✓</span>
                  <span><strong>Verified Title:</strong> 100% RERA & GMADA approved with clean title search. Pre-approved for bank loans.</span>
                </li>
                <li>
                  <span className="clean-check">✓</span>
                  <span><strong>Cross Ventilation:</strong> 3-side open layout ensuring abundant fresh air and natural daylight.</span>
                </li>
                <li>
                  <span className="clean-check">✓</span>
                  <span><strong>Premium Finishes:</strong> Italian marble living area, modular kitchen, and branded bathroom fittings.</span>
                </li>
                <li>
                  <span className="clean-check">✓</span>
                  <span><strong>Connectivity:</strong> Quick access to PR7/Airport Expressway, schools, and IT City.</span>
                </li>
              </ul>
            </div>

            {/* Amenities */}
            <div className="clean-card">
              <h2 className="clean-section-heading">Society Amenities</h2>
              <div className="clean-amenities-grid">
                {[
                  { icon: '🏊‍♂️', title: 'Swimming Pool' },
                  { icon: '🏋️‍♂️', title: 'Gym & Fitness' },
                  { icon: '🛡️', title: '24/7 Security & CCTV' },
                  { icon: '⚡', title: '100% Power Backup' },
                  { icon: '🚗', title: 'EV Charging Station' },
                  { icon: '🌳', title: 'Landscaped Gardens' },
                  { icon: '🛗', title: 'High-speed Lifts' },
                  { icon: '🎾', title: 'Clubhouse & Sports' },
                  { icon: '💧', title: '24/7 Water Supply' },
                  { icon: '📦', title: 'Visitor Parking' },
                ].map((item, idx) => (
                  <div key={idx} className="clean-amenity-tile">
                    <span className="amenity-ico">{item.icon}</span>
                    <span className="amenity-txt">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Dimensions */}
            <div className="clean-card">
              <h2 className="clean-section-heading">Floor & Space Details</h2>
              <div className="clean-table-wrap">
                <table className="clean-specs-table">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Dimensions</th>
                      <th>Flooring</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Living & Dining</td>
                      <td>22' 0" × 15' 6"</td>
                      <td>Italian Marble</td>
                    </tr>
                    <tr>
                      <td>Master Bedroom</td>
                      <td>16' 0" × 14' 0"</td>
                      <td>Laminated Wooden</td>
                    </tr>
                    <tr>
                      <td>Bedroom 2</td>
                      <td>14' 0" × 12' 6"</td>
                      <td>Vitrified Tiles</td>
                    </tr>
                    <tr>
                      <td>Bedroom 3</td>
                      <td>13' 0" × 12' 0"</td>
                      <td>Vitrified Tiles</td>
                    </tr>
                    <tr>
                      <td>Kitchen</td>
                      <td>12' 0" × 9' 6"</td>
                      <td>Anti-Skid Granito</td>
                    </tr>
                    <tr>
                      <td>Balcony</td>
                      <td>18' 0" × 6' 0"</td>
                      <td>Rustic Weatherproof</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* EMI Loan Calculator */}
            <div className="clean-card">
              <div className="clean-card-header-split">
                <h2 className="clean-section-heading">Home Loan Calculator</h2>
                <span className="clean-loan-tag">SBI • HDFC • ICICI Approved</span>
              </div>

              <div className="clean-calc-flex">
                <div className="clean-calc-sliders">
                  <div className="clean-slider-group">
                    <div className="clean-slider-label">
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <strong>{formatINR(emiData.downPayment)}</strong>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="clean-range"
                    />
                  </div>

                  <div className="clean-slider-group">
                    <div className="clean-slider-label">
                      <span>Interest Rate</span>
                      <strong>{interestRate}% p.a.</strong>
                    </div>
                    <input
                      type="range"
                      min="7.5"
                      max="12.0"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="clean-range"
                    />
                  </div>

                  <div className="clean-slider-group">
                    <div className="clean-slider-label">
                      <span>Tenure</span>
                      <strong>{loanTenureYears} Years</strong>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="clean-range"
                    />
                  </div>
                </div>

                <div className="clean-calc-display">
                  <span className="calc-kicker">Estimated Monthly EMI</span>
                  <div className="calc-amount">₹ {emiData.monthlyEmi.toLocaleString('en-IN')}</div>
                  <span className="calc-note">per month for {loanTenureYears} years</span>
                  <div className="calc-breakdown-line">
                    <span>Loan: {formatINR(emiData.loanAmount)}</span>
                    <span>•</span>
                    <span>Interest: {formatINR(emiData.totalInterest)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Commute */}
            <div className="clean-card">
              <h2 className="clean-section-heading">Neighborhood & Commute</h2>
              <div className="clean-commute-grid">
                <div className="clean-commute-item">
                  <span className="commute-ico">✈️</span>
                  <div>
                    <strong>10 Mins</strong>
                    <p>Chandigarh International Airport</p>
                  </div>
                </div>
                <div className="clean-commute-item">
                  <span className="commute-ico">🛍️</span>
                  <div>
                    <strong>15 Mins</strong>
                    <p>Elante Mall & Business District</p>
                  </div>
                </div>
                <div className="clean-commute-item">
                  <span className="commute-ico">🏥</span>
                  <div>
                    <strong>8 Mins</strong>
                    <p>Max & Fortis Hospitals</p>
                  </div>
                </div>
                <div className="clean-commute-item">
                  <span className="commute-ico">🎓</span>
                  <div>
                    <strong>5 Mins</strong>
                    <p>Leading International Schools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Minimal Sticky Contact Sidebar */}
          <div className="clean-sidebar-col">
            <div className="clean-sticky-card">
              <div className="clean-sidebar-price-row">
                <div>
                  <span className="sidebar-price-label">Price</span>
                  <div className="sidebar-main-price">{property.formattedPrice}</div>
                </div>
                <div className="sidebar-verified-badge">
                  <span>✓ 100% Verified</span>
                </div>
              </div>

              <div className="clean-seller-info">
                <div className="seller-avatar">🏢</div>
                <div>
                  <strong className="seller-name">{property.listingSource || 'Verified Developer'}</strong>
                  <p className="seller-sub">Direct Listing • Zero Brokerage</p>
                </div>
              </div>

              <div className="clean-sidebar-actions">
                <button
                  className="clean-btn clean-btn-primary"
                  onClick={() => {
                    if (onOpenLeadModal) onOpenLeadModal(property, 'visit');
                  }}
                >
                  📅 Schedule Site Visit
                </button>

                <button
                  className="clean-btn clean-btn-outline"
                  onClick={() => setShowPhone(!showPhone)}
                >
                  📞 {showPhone ? property.sellerPhone || '+91 98882 14500' : 'View Contact Number'}
                </button>

                {showPhone && (
                  <div className="clean-call-now-toast">
                    Direct Line:{' '}
                    <a href={`tel:${cleanPhone}`} className="clean-call-link">
                      <strong>{property.sellerPhone || '+91 98882 14500'}</strong> (Tap to call)
                    </a>
                  </div>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clean-btn clean-btn-whatsapp"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>

              {/* Quick Callback Box */}
              <div className="clean-callback-section">
                <h4 className="callback-title">Request Instant Callback</h4>
                {quickSubmitted ? (
                  <div className="clean-callback-success">
                    <span className="check">✓</span> Request submitted! We'll call you shortly.
                  </div>
                ) : (
                  <form onSubmit={handleQuickInquiry} className="clean-callback-form">
                    {quickError && <div className="clean-callback-error">{quickError}</div>}
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      className="clean-input"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Phone (10 digits)"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      className="clean-input"
                      required
                    />
                    <button
                      type="submit"
                      disabled={quickLoading}
                      className="clean-btn-submit"
                    >
                      {quickLoading ? 'Sending...' : 'Request Callback'}
                    </button>
                  </form>
                )}
              </div>

              <div className="clean-trust-footer">
                <span>🛡️ Zero Brokerage • Free Cab for Site Visit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <section className="clean-similar-section">
            <h2 className="clean-section-heading">Similar Properties in {property.city || 'Tricity'}</h2>
            <div className="figma-cards-grid">
              {similarProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  isCompared={comparedIds.includes(p.id)}
                  isSaved={savedIds.includes(p.id)}
                  onToggleCompare={onToggleCompare}
                  onToggleSave={onToggleSave}
                  onOpenLeadModal={onOpenLeadModal}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="lightbox-overlay" onClick={() => setShowLightbox(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setShowLightbox(false)} aria-label="Close Lightbox">
              ✕
            </button>

            <div className="lightbox-image-wrap">
              <img
                src={images[activeImageIndex]}
                alt={`${property.title} - View ${activeImageIndex + 1}`}
                className="lightbox-main-img"
              />

              <button
                className="lightbox-nav-btn prev"
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                className="lightbox-nav-btn next"
                onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className="lightbox-caption">
              <div>
                <h4>{property.title}</h4>
                <p>{property.location}</p>
              </div>
              <span className="lightbox-counter">
                Photo {activeImageIndex + 1} of {images.length}
              </span>
            </div>

            <div className="lightbox-thumbs">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`lb-thumb ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
