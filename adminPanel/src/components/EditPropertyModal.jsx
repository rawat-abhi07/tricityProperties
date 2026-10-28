import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditPropertyModal({ isOpen, onClose, property, onUpdateProperty }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: 'Mohali',
    location: '',
    status: 'Approved',
    type: 'Apartment',
    bhk: '3 BHK',
    possessionStatus: 'Ready to Move',
  });

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        price: property.price || '',
        city: property.city || 'Mohali',
        location: property.location || '',
        status: property.status || 'Approved',
        type: property.type || 'Apartment',
        bhk: property.bhk || '3 BHK',
        possessionStatus: property.possessionStatus || 'Ready to Move',
      });
    }
  }, [property]);

  if (!isOpen || !property) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProperty(property.id, formData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-title">Edit Listing Details</h2>
          <button className="modal-close-icon" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Property Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Price in INR (₹)</label>
              <input
                type="number"
                name="price"
                className="form-input"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
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
            <label className="form-label">Location Address</label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Listing Status</label>
              <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Configuration</label>
              <select name="bhk" className="form-select" value={formData.bhk} onChange={handleChange}>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="5 BHK">5 BHK</option>
              </select>
            </div>
          </div>

          <div className="form-modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
