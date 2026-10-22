import React, { useState } from 'react';

export default function ContextualLeadModal({ property, mode = 'visit', onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('Tomorrow Morning');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    // Validate Indian 10-digit mobile number
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    if (!consent) {
      setError('Please accept the consent to proceed');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contextual-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="modal-header">
              <span className="modal-badge">
                {mode === 'call' ? 'Direct Seller Connect' : 'Free Escorted Site Visit'}
              </span>
              <h3>
                {mode === 'call'
                  ? 'Request Direct Seller Callback'
                  : 'Schedule a Visit to this Property'}
              </h3>
              <p className="modal-sub">
                No account or sign-up required. Verified details will be sent directly to your phone.
              </p>
            </div>

            {/* Attached Property Context */}
            <div className="context-property-card">
              <img src={property.image} alt={property.title} className="context-thumb" />
              <div className="context-info">
                <div className="context-price">{property.formattedPrice}</div>
                <div className="context-title">{property.title}</div>
                <div className="context-loc">📍 {property.location}</div>
                <div className="context-meta">
                  <span>{property.bhk}</span> • <span>{property.area}</span> •{' '}
                  <span className="rera-tag">✓ {property.reraNumber}</span>
                </div>
              </div>
            </div>

            {error && <div className="modal-error-alert">{error}</div>}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Harpreet Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Indian Mobile Number *</label>
                <div className="phone-input-wrap">
                  <span className="phone-prefix">+91</span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {mode === 'visit' && (
                <div className="form-group">
                  <label>Preferred Visit Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                  >
                    <option value="Tomorrow Morning (10 AM - 1 PM)">Tomorrow Morning (10 AM - 1 PM)</option>
                    <option value="Tomorrow Evening (4 PM - 7 PM)">Tomorrow Evening (4 PM - 7 PM)</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="This Sunday">This Sunday</option>
                    <option value="Custom Time Slot">Custom Time Slot</option>
                  </select>
                </div>
              )}

              <div className="consent-checkbox-wrap">
                <input
                  type="checkbox"
                  id="consentCheck"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <label htmlFor="consentCheck">
                  I agree to receive property details and site visit coordination via WhatsApp/SMS from verified Tricity Housing reps. No promotional spam.
                </label>
              </div>

              <button type="submit" className="modal-submit-btn">
                {mode === 'call' ? 'Connect with Seller' : 'Confirm Free Site Visit'}
              </button>
            </form>
          </div>
        ) : (
          <div className="modal-success-state">
            <div className="success-icon">✅</div>
            <h3>Request Confirmed!</h3>
            <p>
              Thank you, <strong>{name}</strong>! Your request for{' '}
              <strong>{property.title}</strong> has been logged.
            </p>
            <div className="success-details-box">
              <div><strong>Reference ID:</strong> TH-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div><strong>Contact Number:</strong> +91 {phone}</div>
              <div><strong>Seller Contact:</strong> {property.sellerPhone}</div>
              <div><strong>Slot:</strong> {timeSlot}</div>
            </div>
            <p className="success-note">
              A verified advisor and the property owner have been notified and will reach out to you within 15 minutes.
            </p>
            <button className="modal-submit-btn" onClick={onClose}>
              Back to Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
