import React, { useState } from 'react';
import { submitLead } from '../services/api';

export default function ContextualLeadModal({ property, mode = 'visit', onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Morning (10 AM - 1 PM)');
  const [needCab, setNeedCab] = useState(false);
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  if (!property) return null;

  const dayOptions = [
    { label: 'Tomorrow', sub: 'Quick Visit' },
    { label: 'This Saturday', sub: 'Weekend' },
    { label: 'This Sunday', sub: 'Weekend' },
    { label: 'Flexible / Weekday', sub: 'Any Day' },
  ];

  const timeOptions = [
    { label: 'Morning', time: '10:00 AM - 1:00 PM' },
    { label: 'Afternoon', time: '1:00 PM - 4:00 PM' },
    { label: 'Evening', time: '4:00 PM - 7:00 PM' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    if (!consent) {
      setError('Please accept the consent to receive visit coordination');
      return;
    }

    setError('');
    const refNum = `TH-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refNum);
    setSubmitted(true);

    // Stream lead directly to backend and Admin Panel
    submitLead({
      name: name.trim(),
      phone: `+91 ${cleanPhone}`,
      propertyId: property.id,
      propertyTitle: property.title,
      location: property.location,
      slot: `${selectedDay}, ${selectedTimeSlot}`,
      needCab,
      mode: mode || 'visit',
      bookingRef: refNum,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contextual-modal professional-visit-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-badge-row">
                <span className="modal-badge">
                  <span className="badge-pulse-dot"></span>
                  {mode === 'call' ? 'Direct Seller Connect' : 'Free Escorted Site Visit'}
                </span>
                <span className="badge-verified-guarantee">🛡️ 100% RERA Verified</span>
              </div>
              <h3 className="modal-title">
                {mode === 'call' ? 'Request Direct Seller Callback' : 'Schedule a Private Site Visit'}
              </h3>
              <p className="modal-sub">
                {mode === 'call'
                  ? 'Connect directly with the verified listing owner with zero middleman markup.'
                  : 'Tour this property in person with a verified Tricity property advisor. Zero pressure, 100% free.'}
              </p>
            </div>

            {/* Attached Property Context Card */}
            <div className="context-property-card">
              <div className="context-thumb-wrap">
                <img src={property.image} alt={property.title} className="context-thumb" />
                <span className="context-badge-type">{property.type}</span>
              </div>
              <div className="context-info">
                <div className="context-price-row">
                  <span className="context-price">{property.formattedPrice}</span>
                  {property.pricePerSqFt && (
                    <span className="context-rate">{property.pricePerSqFt}</span>
                  )}
                </div>
                <h4 className="context-title">{property.title}</h4>
                <div className="context-loc">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{property.location}</span>
                </div>
                <div className="context-meta-tags">
                  <span className="meta-pill">{property.bhk}</span>
                  <span className="meta-pill">{property.area}</span>
                  {property.reraNumber && (
                    <span className="meta-pill rera-pill">✓ {property.reraNumber}</span>
                  )}
                </div>
              </div>
            </div>

            {error && <div className="modal-error-alert">⚠️ {error}</div>}

            <form onSubmit={handleSubmit} className="modal-form">
              {mode === 'visit' && (
                <>
                  {/* Select Preferred Day */}
                  <div className="form-group">
                    <label className="group-label">
                      <span>Select Preferred Day</span>
                      <span className="label-hint">Free rescheduling anytime</span>
                    </label>
                    <div className="slot-pill-grid">
                      {dayOptions.map((day) => (
                        <button
                          key={day.label}
                          type="button"
                          className={`slot-chip-btn ${selectedDay === day.label ? 'active' : ''}`}
                          onClick={() => setSelectedDay(day.label)}
                        >
                          <span className="chip-primary">{day.label}</span>
                          <span className="chip-sub">{day.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Time Slot */}
                  <div className="form-group">
                    <label className="group-label">Preferred Time Slot</label>
                    <div className="time-pill-grid">
                      {timeOptions.map((time) => (
                        <button
                          key={time.label}
                          type="button"
                          className={`time-chip-btn ${selectedTimeSlot.startsWith(time.label) ? 'active' : ''}`}
                          onClick={() => setSelectedTimeSlot(`${time.label} (${time.time})`)}
                        >
                          <span className="time-label">{time.label}</span>
                          <span className="time-hours">{time.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Free Pick & Drop Toggle */}
                  <div className="pick-drop-option">
                    <label className="pick-drop-label">
                      <input
                        type="checkbox"
                        checked={needCab}
                        onChange={(e) => setNeedCab(e.target.checked)}
                      />
                      <div className="pick-drop-text">
                        <strong>Request Free Escorted Pick & Drop</strong>
                        <span>Complimentary AC cab service available across Chandigarh, Mohali, Panchkula & Zirakpur</span>
                      </div>
                    </label>
                  </div>
                </>
              )}

              {/* User Contact Inputs */}
              <div className="form-row-two-col">
                <div className="form-group">
                  <label className="group-label">Your Full Name *</label>
                  <div className="modal-input-wrap">
                    <svg className="input-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      placeholder="e.g. Gurpreet Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="group-label">Mobile Number (WhatsApp) *</label>
                  <div className="phone-input-wrap">
                    <span className="phone-prefix">+91</span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      maxLength="10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Trust Consent Checkbox */}
              <div className="consent-checkbox-wrap">
                <input
                  type="checkbox"
                  id="consentCheck"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <label htmlFor="consentCheck">
                  <strong>Zero-Spam Guarantee:</strong> Send site visit details & location pin via WhatsApp/SMS. No unwanted telemarketing calls or third-party sharing.
                </label>
              </div>

              {/* Submit CTA Button */}
              <button type="submit" className="modal-submit-btn">
                <span>{mode === 'call' ? 'Connect with Seller Directly' : 'Confirm Free Site Visit'}</span>
                <span className="btn-arrow-icon">→</span>
              </button>

              <div className="modal-footer-reassurance">
                <span>🔒 256-bit encrypted • 100% Free site visit • Instant WhatsApp confirmation</span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Confirmation State */
          <div className="modal-success-state">
            <div className="success-icon-badge">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="success-title">Site Visit Confirmed!</h3>
            <p className="success-sub">
              Thank you, <strong>{name}</strong>! Your private escorted tour has been coordinated with the property manager.
            </p>

            <div className="success-details-card">
              <div className="detail-row">
                <span className="detail-k">Booking Reference:</span>
                <span className="detail-v ref-tag">{bookingRef || "TH-839210"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-k">Property:</span>
                <span className="detail-v">{property.title}</span>
              </div>
              <div className="detail-row">
                <span className="detail-k">Preferred Date:</span>
                <span className="detail-v">{selectedDay} • {selectedTimeSlot}</span>
              </div>
              <div className="detail-row">
                <span className="detail-k">Your Contact:</span>
                <span className="detail-v">+91 {phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-k">Direct Seller Helpline:</span>
                <span className="detail-v seller-tel">{property.sellerPhone || '+91 (0172) 400-8800'}</span>
              </div>
              {needCab && (
                <div className="detail-row cab-row">
                  <span className="detail-k">Escorted Cab:</span>
                  <span className="detail-v green-text">✓ Complimentary Pick & Drop Requested</span>
                </div>
              )}
            </div>

            <div className="whatsapp-notice-card">
              <span className="wa-icon">💬</span>
              <span>A location pin and direct coordinator contact have been sent to your WhatsApp number.</span>
            </div>

            <button className="modal-submit-btn return-btn" onClick={onClose}>
              Back to Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
