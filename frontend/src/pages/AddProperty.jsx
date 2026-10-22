import React, { useState } from 'react';

export default function AddProperty({ onPropertyCreated, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: 'Mohali',
    location: '',
    bedrooms: '3',
    bathrooms: '3',
    bhk: '3 BHK',
    area: '1,750 sq.ft.',
    carpetArea: '1,350 sq.ft.',
    type: 'Apartment',
    possessionStatus: 'Ready to Move',
    listingSource: 'Direct Owner',
    reraNumber: '',
    image: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.price || !formData.location) {
      setError('Please provide title, price, and exact location.');
      return;
    }

    setLoading(true);
    try {
      await onPropertyCreated(formData);
      setSuccess(true);
      setFormData({
        title: '',
        price: '',
        city: 'Mohali',
        location: '',
        bedrooms: '3',
        bathrooms: '3',
        bhk: '3 BHK',
        area: '1,750 sq.ft.',
        carpetArea: '1,350 sq.ft.',
        type: 'Apartment',
        possessionStatus: 'Ready to Move',
        listingSource: 'Direct Owner',
        reraNumber: '',
        image: '',
        description: '',
      });
    } catch (err) {
      setError(err.message || 'Error listing property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container page-top-padding">
      <div className="form-wrapper">
        <span className="subtle-kicker">Free Seller Listing</span>
        <h2>List Your Property For Sale</h2>
        <p className="form-sub-intro">
          Reach thousands of genuine homebuyers across Chandigarh, Mohali, and Panchkula with zero brokerage fees.
        </p>

        {success && (
          <div className="alert success-alert">
            ✅ <strong>Listing Created Successfully!</strong> Your property has been verified and is live on the marketplace.
          </div>
        )}

        {error && <div className="alert error-alert">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label>Property Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. 3 BHK Corner Luxury Flat, PR-7 Airport Road"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (in INR ₹) *</label>
              <input
                type="number"
                name="price"
                required
                placeholder="e.g. 11800000 (for ₹1.18 Cr)"
                value={formData.price}
                onChange={handleChange}
              />
              <span className="field-hint">Enter full numeric amount (e.g. 8500000 for 85 Lakhs)</span>
            </div>

            <div className="form-group">
              <label>City / Region *</label>
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="Mohali">Mohali</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Zirakpur">Zirakpur</option>
                <option value="New Chandigarh">New Chandigarh</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Exact Location / Sector *</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Airport Road, Sector 82, Mohali"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Property Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Apartment">Apartment / Highrise</option>
                <option value="Independent Floor">Independent Floor</option>
                <option value="Villa">Luxury Villa</option>
                <option value="Residential Plot">Residential Plot</option>
              </select>
            </div>
          </div>

          <div className="form-row three-col">
            <div className="form-group">
              <label>Configuration (BHK)</label>
              <select name="bhk" value={formData.bhk} onChange={handleChange}>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="5 BHK">5 BHK</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            <div className="form-group">
              <label>Super Area</label>
              <input
                type="text"
                name="area"
                placeholder="e.g. 1,725 sq.ft."
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Possession Status</label>
              <select
                name="possessionStatus"
                value={formData.possessionStatus}
                onChange={handleChange}
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction (2026)">Under Construction (2026)</option>
                <option value="Immediate Possession">Immediate Possession</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Listing Source</label>
              <select
                name="listingSource"
                value={formData.listingSource}
                onChange={handleChange}
              >
                <option value="Direct Owner">Direct Owner</option>
                <option value="Verified Developer">Verified Developer</option>
                <option value="Authorized Partner">Authorized Partner</option>
              </select>
            </div>

            <div className="form-group">
              <label>RERA Number (if applicable)</label>
              <input
                type="text"
                name="reraNumber"
                placeholder="e.g. PBRERA-SAS80-PR0641"
                value={formData.reraNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image}
              onChange={handleChange}
            />
            <span className="field-hint">Leave blank to use a high-res verified placeholder</span>
          </div>

          <div className="form-group">
            <label>Description & Highlights</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Mention facing, park views, parking, Italian marble, clubhouse, etc."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions-row">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Listing (100% Free)'}
            </button>
            {onCancel && (
              <button type="button" className="cancel-btn" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
