import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
];

export default function AddPropertyModal({ isOpen, onClose, onAddProperty }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: 'Mohali',
    location: '',
    bhk: '3 BHK',
    bedrooms: '3',
    bathrooms: '3',
    area: '1,750 sq.ft.',
    type: 'Apartment',
    possessionStatus: 'Ready to Move',
    listingSource: 'Verified Developer',
    status: 'Approved',
    image: SAMPLE_IMAGES[0],
    description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      alert('Please fill in property title, price, and location.');
      return;
    }
    onAddProperty({
      ...formData,
      isVerified: formData.status === 'Approved',
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-title">Submit New Property Listing</h2>
          <button className="modal-close-icon" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Property Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. 3 BHK Ultra-Luxury Highrise Residence"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Price in INR (₹) *</label>
              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="e.g. 11800000"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">City *</label>
              <select name="city" className="form-select" value={formData.city} onChange={handleChange}>
                <option value="Mohali">Mohali</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Zirakpur">Zirakpur</option>
                <option value="New Chandigarh">New Chandigarh</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Complete Locality / Address *</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="e.g. Airport Road, Sector 82, Mohali"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
                <option value="Apartment">Apartment</option>
                <option value="Independent Floor">Independent Floor</option>
                <option value="Villa">Villa</option>
                <option value="Plot / Land">Plot / Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Configuration (BHK)</label>
              <select name="bhk" className="form-select" value={formData.bhk} onChange={handleChange}>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="5+ BHK">5+ BHK</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Initial Status</label>
              <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                <option value="Approved">Approved (Live)</option>
                <option value="Pending">Pending (Review)</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Possession Status</label>
              <select
                name="possessionStatus"
                className="form-select"
                value={formData.possessionStatus}
                onChange={handleChange}
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
          </div>

          {/* Preset Photo Selector */}
          <div className="form-group">
            <label className="form-label">Cover Photo Template</label>
            <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
              {SAMPLE_IMAGES.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, image: url })}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: formData.image === url ? '3px solid #2563eb' : '1px solid #e2e8f0',
                    width: '80px',
                    height: '56px',
                    flexShrink: 0,
                  }}
                >
                  <img src={url} alt="Sample" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {formData.image === url && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        background: '#2563eb',
                        borderRadius: '50%',
                        color: '#fff',
                        width: 16,
                        height: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={10} strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Key Highlights</label>
            <textarea
              name="description"
              rows={3}
              className="form-textarea"
              placeholder="e.g. Gated community with clubhouse, 24/7 security, power backup..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
