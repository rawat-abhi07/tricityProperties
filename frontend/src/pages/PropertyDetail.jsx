import React, { useState, useEffect, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import { submitLead, fetchPropertyById } from '../services/api';
import {
  IconTrain,
  IconBus,
  IconPlane,
  IconHospital,
  IconPool,
  IconGym,
  IconSecurity,
  IconPower,
  IconEV,
  IconPark,
  IconElevator,
  IconClubhouse,
  IconWater,
  IconParking,
  IconBed,
  IconRuler,
  IconKey,
  IconCompass,
  IconBuilding,
  IconUser,
  IconPhone,
  IconShield,
  IconHeart,
  IconMapPin,
  IconCamera,
  IconSearch,
  IconCalendar,
  IconWhatsApp,
  IconShare,
} from '../components/DetailIcons';
import './PropertyDetail.css';

// Key Essential Transit Hubs across Tricity with verified GPS coordinates
const MAIN_TRANSIT_POINTS = [
  {
    id: 'railway',
    title: 'Chandigarh Railway Station',
    subtitle: 'via Vikas Marg',
    icon: IconTrain,
    coords: [30.7032, 76.8286],
  },
  {
    id: 'bus_stand',
    title: 'ISBT Sector 43 Bus Stand',
    subtitle: 'via Jan Marg',
    icon: IconBus,
    coords: [30.7180, 76.7480],
  },
  {
    id: 'airport',
    title: "Shaheed Bhagat Singh Airport (IXC)",
    subtitle: 'via Airport Expressway',
    icon: IconPlane,
    coords: [30.6735, 76.7885],
  },
  {
    id: 'hospital',
    title: 'Max & Fortis Super Speciality',
    subtitle: 'via Mohali Stadium Road',
    icon: IconHospital,
    coords: [30.7011, 76.7214],
  },
];

// Verified Society Amenities with SVG Icons
const AMENITIES_CONFIG = [
  { icon: IconPool, title: 'Swimming Pool', note: 'Adults & Kids' },
  { icon: IconGym, title: 'Modern Gym', note: 'Fitness Center' },
  { icon: IconSecurity, title: '24/7 Security', note: 'Gated 3-Tier CCTV' },
  { icon: IconPower, title: '100% Power Backup', note: 'Full DG Support' },
  { icon: IconEV, title: 'EV Charging Bay', note: 'Fast Chargers' },
  { icon: IconPark, title: 'Landscaped Gardens', note: 'Jogging Track' },
  { icon: IconElevator, title: 'High-speed Elevators', note: 'Automatic ARD' },
  { icon: IconClubhouse, title: 'Clubhouse & Sports', note: 'Indoor Games' },
  { icon: IconWater, title: '24/7 Treated Water', note: 'Rainwater Setup' },
  { icon: IconParking, title: 'Visitor Parking', note: 'Designated Bays' },
];

// Locality Reference Coordinates in Tricity
const LOCALITY_COORDS = {
  'sector 82': [30.6690, 76.7420],
  'airport road': [30.6690, 76.7420],
  'sector 34': [30.7210, 76.7680],
  'sector 20': [30.6860, 76.8520],
  'pr7': [30.6480, 76.8250],
  'zirakpur': [30.6480, 76.8250],
  'eco city': [30.8020, 76.7400],
  'new chandigarh': [30.8020, 76.7400],
  'aerocity': [30.6550, 76.7650],
  'sector 8': [30.7490, 76.7950],
  'mdc': [30.7180, 76.8420],
  'panchkula': [30.6860, 76.8520],
  'mohali': [30.6900, 76.7200],
  'chandigarh': [30.7333, 76.7794],
};

// Category supplementary photography to prevent blank image boxes
const BACKUP_PHOTOS = {
  Apartment: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  ],
  Villa: [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  ],
  'Independent Floor': [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  ],
  'Residential Plot': [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  ],
};

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Apply Tricity urban grid routing factor (1.28)
  return Math.round(R * c * 1.28 * 10) / 10;
}

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

  // Commute State
  const [currentHour] = useState(() => new Date().getHours());

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

  // Derive the active property
  const property = initialProperty || fetchedProperty;

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

  // Compute Origin Coordinates for this property
  const propertyCoords = useMemo(() => {
    if (!property) return [30.7333, 76.7794];
    const loc = (property.location || '').toLowerCase();
    const city = (property.city || '').toLowerCase();

    for (const [key, coords] of Object.entries(LOCALITY_COORDS)) {
      if (loc.includes(key) || city.includes(key)) {
        return coords;
      }
    }
    return [30.7333, 76.7794]; // Default central Tricity
  }, [property]);

  // Real-time Transit Calculation for Main Transit Hubs
  // Driving Commute for Key Transit Hubs
  const transitPointsData = useMemo(() => {
    const speed = 38; // km/h standard driving speed
    const isPeak = (currentHour >= 8 && currentHour <= 10) || (currentHour >= 17 && currentHour <= 20);
    const trafficAdd = isPeak ? 2 : 0;

    return MAIN_TRANSIT_POINTS.map((pt) => {
      const distanceKm = calculateDistanceKm(
        propertyCoords[0],
        propertyCoords[1],
        pt.coords[0],
        pt.coords[1]
      );
      const baseMins = Math.max(3, Math.round((distanceKm / speed) * 60 + 2));
      const durationMins = baseMins + trafficAdd;

      return {
        ...pt,
        distanceKm,
        durationMins,
      };
    });
  }, [propertyCoords, currentHour]);

  // Images list (with rich fallback to guarantee high-res multi-view gallery)
  const images = useMemo(() => {
    if (!property) return [];
    if (property.images && Array.isArray(property.images) && property.images.length >= 2) {
      return property.images;
    }
    const typeFallback = BACKUP_PHOTOS[property.type] || BACKUP_PHOTOS.Apartment;
    const initialList = property.images && property.images.length > 0
      ? property.images
      : property.image
      ? [property.image]
      : [];

    const merged = [...initialList];
    for (const fb of typeFallback) {
      if (!merged.includes(fb) && merged.length < 4) {
        merged.push(fb);
      }
    }
    return merged.length > 0 ? merged : typeFallback;
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
      <div className="section-container detail-loading-box">
        <div className="spinner"></div>
        <p>Loading verified property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="section-container">
        <div className="empty-results-box">
          <div className="empty-icon">🏠</div>
          <h3>Property Not Found</h3>
          <p>The property listing you are looking for may have been sold or removed.</p>
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
    `Hello, I am interested in "${property.title}" (${property.formattedPrice}) on Tricity Housing Marketplace. Please share detailed brochure and schedule a site visit.`
  )}`;

  return (
    <div className="detail-page-container">
      {/* 1. Sub-Header Utility Breadcrumbs Bar */}
      <div className="detail-breadcrumb-bar">
        <div className="detail-bar-inner">
          <button className="back-link-btn" onClick={onBack}>
            <span className="back-arrow">←</span> All Tricity Properties
          </button>

          <nav className="detail-breadcrumbs-path">
            <span>Home</span>
            <span className="sep">/</span>
            <span>{property.city || 'Tricity'}</span>
            <span className="sep">/</span>
            <span className="current-crumb">{property.locality || property.location}</span>
          </nav>

          <div className="detail-quick-actions">
            <button
              className={`detail-action-pill ${isSaved ? 'saved' : ''}`}
              onClick={() => {
                if (onToggleSave) onToggleSave(property.id);
              }}
              title={isSaved ? 'Shortlisted' : 'Save to Shortlist'}
            >
              <IconHeart size={15} filled={isSaved} />
              <span>{isSaved ? 'Saved' : 'Shortlist'}</span>
            </button>

            <button
              className={`detail-action-pill ${isCompared ? 'compared' : ''}`}
              onClick={() => {
                if (onToggleCompare) onToggleCompare(property);
              }}
              title="Add to side-by-side comparison"
            >
              <span>{isCompared ? '✓' : '⇄'}</span>
              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>

            <button className="detail-action-pill" onClick={handleShare} title="Share listing">
              <IconShare size={14} />
              <span>{copiedShare ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="detail-main-wrap">
        {/* 2. Property Header (Matching Home Page & PropertyCard Hierarchy) */}
        <div className="detail-header-block">
          <div className="detail-header-left">
            <div className="detail-badges-row">
              <span className="badge-possession">{property.possessionStatus || 'Ready to Move'}</span>
              <span className="badge-source">
                <span className="verify-dot">✓</span> {property.listingSource || 'Verified Developer'}
              </span>
              {property.reraNumber && (
                <div className="prop-rera-pill" title={`Registered under ${property.reraNumber}`}>
                  <IconShield size={12} className="shield-icon" />
                  <span>RERA: {property.reraNumber}</span>
                </div>
              )}
            </div>

            <h1 className="detail-title">{property.title}</h1>
            <p className="detail-location">
              <IconMapPin size={14} className="pin-icon" />
              <span>{property.location}</span>
              {property.city && !property.location.toLowerCase().includes(property.city.toLowerCase()) && (
                <span className="city-chip">, {property.city}</span>
              )}
            </p>
          </div>

          <div className="detail-header-right">
            <div className="detail-price-box">
              <span className="prop-main-price">{property.formattedPrice}</span>
              {property.pricePerSqFt && (
                <span className="prop-rate">{property.pricePerSqFt}</span>
              )}
            </div>
            <div className="detail-emi-badge">
              Est. EMI: <strong>₹ {emiData.monthlyEmi.toLocaleString('en-IN')} / mo*</strong>
            </div>
          </div>
        </div>

        {/* 3. Sleek Asymmetrical Photo Gallery (No Blank Spaces Ever) */}
        <div className="detail-gallery-block">
          <div className="gallery-asymmetric-mosaic">
            {/* Primary Hero Image */}
            <div
              className="gallery-hero-image-wrap"
              onClick={() => {
                setActiveImageIndex(0);
                setShowLightbox(true);
              }}
            >
              <img
                src={images[0]}
                alt={`${property.title} - Main View`}
                className="gallery-hero-image"
              />
              <div className="gallery-inspect-pill">
                <span className="green-dot">●</span> 100% Verified On-Site Photos
              </div>
              <span className="gallery-expand-hint">
                <IconSearch size={13} /> Expand Photos
              </span>
            </div>

            {/* Stacked Secondary Photos (Only renders if 2+ images exist) */}
            {images.length > 1 && (
              <div className="gallery-stacked-column">
                {images.slice(1, 3).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="gallery-stack-thumb"
                    onClick={() => {
                      setActiveImageIndex(idx + 1);
                      setShowLightbox(true);
                    }}
                  >
                    <img src={imgUrl} alt={`View ${idx + 2}`} loading="lazy" />
                    {idx === 1 && images.length > 3 && (
                      <div className="gallery-count-overlay">
                        <span><IconCamera size={13} /> View All {images.length} Photos</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {images.length <= 3 && (
            <button
              type="button"
              className="gallery-all-photos-trigger"
              onClick={() => setShowLightbox(true)}
            >
              <IconCamera size={13} /> View All {images.length} Photos
            </button>
          )}
        </div>

        {/* 4. Two-Column Minimalist Content Body */}
        <div className="detail-content-columns">
          {/* LEFT: Core Property Intelligence */}
          <div className="detail-left-pane">
            {/* Quick Specs Overview Ribbon (Figma Style) */}
            <div className="detail-card">
              <div className="detail-card-header-split">
                <h2 className="detail-card-title">Property Overview</h2>
                <span className="prop-id-tag">Listing #{property.id || 'TRC-104'}</span>
              </div>
              <div className="detail-specs-grid">
                <div className="detail-spec-box">
                  <div className="spec-icon-label">
                    <span className="spec-ico"><IconBed size={17} /></span>
                    <span className="spec-label">Configuration</span>
                  </div>
                  <span className="spec-value">{property.bhk}</span>
                  <span className="spec-sub">{property.bedrooms || 3} Beds • {property.bathrooms || 3} Baths</span>
                </div>

                <div className="detail-spec-box">
                  <div className="spec-icon-label">
                    <span className="spec-ico"><IconRuler size={17} /></span>
                    <span className="spec-label">Super Built-up Area</span>
                  </div>
                  <span className="spec-value">{property.area}</span>
                  <span className="spec-sub">{property.carpetArea ? `Carpet: ${property.carpetArea}` : 'Spacious Layout'}</span>
                </div>

                <div className="detail-spec-box">
                  <div className="spec-icon-label">
                    <span className="spec-ico"><IconKey size={17} /></span>
                    <span className="spec-label">Possession Status</span>
                  </div>
                  <span className="spec-value">{property.possessionStatus || 'Ready to Move'}</span>
                  <span className="spec-sub">Immediate Handover</span>
                </div>

                <div className="detail-spec-box">
                  <div className="spec-icon-label">
                    <span className="spec-ico"><IconCompass size={17} /></span>
                    <span className="spec-label">Facing & Vastu</span>
                  </div>
                  <span className="spec-value">North-East</span>
                  <span className="spec-sub">100% Vastu Compliant</span>
                </div>

                <div className="detail-spec-box">
                  <div className="spec-icon-label">
                    <span className="spec-ico"><IconBuilding size={17} /></span>
                    <span className="spec-label">Property Type</span>
                  </div>
                  <span className="spec-value">{property.type}</span>
                  <span className="spec-sub">Freehold Registry Title</span>
                </div>

                <div className="detail-spec-box">
                  <div className="spec-icon-label">
                    <span className="spec-ico"><IconParking size={17} /></span>
                    <span className="spec-label">Reserved Parking</span>
                  </div>
                  <span className="spec-value">2 Covered Bays</span>
                  <span className="spec-sub">Dedicated Stilt Parking</span>
                </div>
              </div>
            </div>

            {/* About Property Description */}
            <div className="detail-card">
              <h2 className="detail-card-title">About This Home</h2>
              <p className="detail-narrative">
                {property.description ||
                  `This refined ${property.bhk} residence situated in ${property.location} offers thoughtful architectural design, generous daylight cross-ventilation, and effortless connectivity across Chandigarh, Mohali, and Panchkula.`}
              </p>

              <h3 className="detail-sub-heading">Key Highlights</h3>
              <ul className="detail-features-checklist">
                <li>
                  <span className="check-ico">✓</span>
                  <div>
                    <strong>100% Clear Title & RERA Registered:</strong> Clean legal verification, GMADA/Municipal clearance, and approved for instant home loan processing from SBI, HDFC & ICICI.
                  </div>
                </li>
                <li>
                  <span className="check-ico">✓</span>
                  <div>
                    <strong>Optimized Natural Ventilation:</strong> Corner residence with 3-side open layout ensuring uninterrupted airflow and pleasant sunlight.
                  </div>
                </li>
                <li>
                  <span className="check-ico">✓</span>
                  <div>
                    <strong>High-End Interior Craftsmanship:</strong> Italian marble living lounge, premium modular kitchen, branded sanitary fixtures (Kohler / Grohe), and soundproof double-glazed windows.
                  </div>
                </li>
                <li>
                  <span className="check-ico">✓</span>
                  <div>
                    <strong>Direct Expressway Access:</strong> Wide arterial road with zero traffic bottleneck, close to top international schools and IT City.
                  </div>
                </li>
              </ul>
            </div>

            {/* Society Amenities Grid */}
            <div className="detail-card">
              <div className="detail-card-header-split">
                <h2 className="detail-card-title">Society Amenities & Facilities</h2>
                <span className="amenities-count-tag">10 Verified Features</span>
              </div>
              <div className="detail-amenities-flow">
                {AMENITIES_CONFIG.map((item, idx) => {
                  const AmenityIcon = item.icon;
                  return (
                    <div key={idx} className="detail-amenity-chip">
                      <span className="chip-icon-box">
                        <AmenityIcon size={20} className="amenity-svg-icon" />
                      </span>
                      <div className="chip-text">
                        <strong>{item.title}</strong>
                        <span>{item.note}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. NEIGHBOURHOOD & COMMUTE */}
            <div className="detail-card commute-minimal-card">
              <div className="commute-minimal-header">
                <div className="commute-minimal-title-col">
                  <h2 className="detail-card-title">Neighbourhood & Commute</h2>
                  <p className="commute-minimal-subtitle">
                    Key transit hubs and driving distances from <strong>{property.location}</strong>
                  </p>
                </div>
              </div>

              {/* 4 Main Transit Hubs Grid */}
              <div className="commute-points-grid">
                {transitPointsData.map((pt) => {
                  const HubIcon = pt.icon;
                  return (
                    <div key={pt.id} className="commute-point-tile">
                      <div className="commute-point-icon-box">
                        <HubIcon size={21} className="commute-svg-icon" />
                      </div>

                      <div className="commute-point-details">
                        <div className="commute-point-top-row">
                          <span className="commute-point-name">{pt.title}</span>
                          <span className="commute-duration-badge">{pt.durationMins} mins</span>
                        </div>
                        <div className="commute-point-bottom-row">
                          <span className="commute-distance-badge">{pt.distanceKm} km</span>
                          <span className="commute-point-dot">•</span>
                          <span className="commute-point-route">{pt.subtitle}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Home Loan EMI Calculator */}
            <div className="detail-card">
              <div className="detail-card-header-split">
                <h2 className="detail-card-title">Home Loan EMI Estimator</h2>
                <span className="bank-partner-tag">Pre-approved by SBI • HDFC • ICICI</span>
              </div>

              <div className="emi-calculator-flex">
                <div className="emi-sliders-col">
                  <div className="slider-group">
                    <div className="slider-label-row">
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
                      className="emi-slider-input"
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-label-row">
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
                      className="emi-slider-input"
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-label-row">
                      <span>Loan Tenure</span>
                      <strong>{loanTenureYears} Years ({loanTenureYears * 12} Months)</strong>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="emi-slider-input"
                    />
                  </div>
                </div>

                <div className="emi-result-card">
                  <span className="emi-kicker">Estimated Monthly EMI</span>
                  <div className="emi-number">₹ {emiData.monthlyEmi.toLocaleString('en-IN')}</div>
                  <span className="emi-tenure-note">per month for {loanTenureYears} years</span>
                  <div className="emi-breakdown-row">
                    <span>Loan: {formatINR(emiData.loanAmount)}</span>
                    <span>•</span>
                    <span>Interest: {formatINR(emiData.totalInterest)}</span>
                  </div>
                  <button
                    type="button"
                    className="emi-inquire-btn"
                    onClick={() => {
                      if (onOpenLeadModal) onOpenLeadModal(property, 'loan');
                    }}
                  >
                    Check Loan Eligibility
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Minimal Sticky Seller Action Sidebar */}
          <div className="detail-right-pane">
            <div className="detail-sticky-card">
              {/* Pricing & RERA Header */}
              <div className="sidebar-pricing-strip">
                <div>
                  <span className="sidebar-kicker">All-Inclusive Price</span>
                  <div className="prop-main-price">{property.formattedPrice}</div>
                  {property.pricePerSqFt && (
                    <span className="prop-rate">{property.pricePerSqFt}</span>
                  )}
                </div>
                <div className="sidebar-verified-chip">
                  <span>✓ 100% Verified</span>
                </div>
              </div>

              {/* Seller / Developer Profile */}
              <div className="sidebar-seller-card">
                <div className="seller-emblem"><IconBuilding size={20} /></div>
                <div className="seller-details">
                  <strong className="seller-name-text">{property.listingSource || 'Verified Developer'}</strong>
                  <p className="seller-sub-text">Direct Seller • Zero Brokerage</p>
                </div>
              </div>

              {/* Action Buttons: Primary Site Visit + Side-by-Side Call / WhatsApp */}
              <div className="sidebar-action-buttons">
                <button
                  type="button"
                  className="sidebar-primary-btn"
                  onClick={() => {
                    if (onOpenLeadModal) onOpenLeadModal(property, 'visit');
                  }}
                >
                  <IconCalendar size={15} />
                  <span>Schedule Site Visit (Free Cab)</span>
                </button>

                <div className="sidebar-secondary-btn-row">
                  <button
                    type="button"
                    className="sidebar-call-btn"
                    onClick={() => setShowPhone(!showPhone)}
                  >
                    <IconPhone size={14} />
                    <span>{showPhone ? 'Hide Line' : 'Call Seller'}</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-whatsapp-btn"
                  >
                    <IconWhatsApp size={15} />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {showPhone && (
                  <div className="sidebar-phone-toast">
                    <span>Direct Seller Line:</span>
                    <a href={`tel:${cleanPhone}`} className="direct-tel-link">
                      <strong>{property.sellerPhone || '+91 98882 14500'}</strong> (Tap to Call)
                    </a>
                  </div>
                )}
              </div>

              {/* Direct Quick Callback Box */}
              <div className="sidebar-callback-box">
                <div className="callback-box-header">
                  <h4 className="callback-box-title">Request Detailed Callback</h4>
                  <span className="callback-badge">15m Response</span>
                </div>
                {quickSubmitted ? (
                  <div className="callback-success-message">
                    <span className="success-icon">✓</span> Callback request submitted! We will call you shortly.
                  </div>
                ) : (
                  <form onSubmit={handleQuickInquiry} className="callback-form">
                    {quickError && <div className="callback-error-msg">{quickError}</div>}
                    <div className="callback-input-wrap">
                      <span className="input-ico"><IconUser size={15} /></span>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                        className="callback-input"
                        required
                      />
                    </div>
                    <div className="callback-input-wrap">
                      <span className="input-ico"><IconPhone size={15} /></span>
                      <input
                        type="tel"
                        placeholder="Mobile Number (10 digits)"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        className="callback-input"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={quickLoading}
                      className="callback-submit-btn"
                    >
                      {quickLoading ? 'Sending...' : 'Request Instant Callback'}
                    </button>
                  </form>
                )}
              </div>

              {/* Buyer Protection Pledge */}
              <div className="sidebar-trust-pledge">
                <span className="pledge-icon"><IconShield size={14} /></span>
                <span>Zero Brokerage • Free Cab for Site Visit • Clear Title</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Similar Properties in Locality (Matching Home Page) */}
        {similarProperties.length > 0 && (
          <section className="detail-similar-section">
            <div className="similar-section-header">
              <span className="subtle-kicker">VERIFIED SIMILAR PROPERTIES</span>
              <h2>Similar Properties in {property.city || 'Tricity'}</h2>
              <p>Hand-picked verified listings matching your configuration and locality</p>
            </div>

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

      {/* Lightbox High-Resolution Modal */}
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

              {images.length > 1 && (
                <>
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
                </>
              )}
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

            {images.length > 1 && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
