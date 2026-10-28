import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddDealModal({ isOpen, onClose, onAddDeal }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    propertyTitle: '',
    propertyType: 'Residential Sale',
    value: '',
    stage: 'New Lead',
    notes: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.value) {
      alert('Please provide client name and deal value.');
      return;
    }
    onAddDeal(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-title">Create Sales Pipeline Deal</h2>
          <button className="modal-close-icon" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Client Name *</label>
            <input
              type="text"
              name="clientName"
              className="form-input"
              placeholder="e.g. Rajesh Kumar or Amanda Chen"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Client Mobile Phone</label>
              <input
                type="text"
                name="clientPhone"
                className="form-input"
                placeholder="+91 98888 12345"
                value={formData.clientPhone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Client Email</label>
              <input
                type="email"
                name="clientEmail"
                className="form-input"
                placeholder="client@example.com"
                value={formData.clientEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Property Title / Description</label>
            <input
              type="text"
              name="propertyTitle"
              className="form-input"
              placeholder="e.g. Luxury Condo - Airport Road Mohali"
              value={formData.propertyTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Deal Value in INR (₹) *</label>
              <input
                type="number"
                name="value"
                className="form-input"
                placeholder="e.g. 18500000"
                value={formData.value}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Deal Type</label>
              <select
                name="propertyType"
                className="form-select"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="Residential Sale">Residential Sale</option>
                <option value="Residential Rent">Residential Rent</option>
                <option value="Commercial Sale">Commercial Sale</option>
                <option value="Land">Land</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Pipeline Stage</label>
            <select
              name="stage"
              className="form-select"
              value={formData.stage}
              onChange={handleChange}
            >
              <option value="New Lead">New Lead</option>
              <option value="Viewing Scheduled">Viewing Scheduled</option>
              <option value="Viewing Completed">Viewing Completed</option>
              <option value="Under Negotiation">Under Negotiation</option>
              <option value="Closed Won">Closed Won</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Deal Notes & Follow-up Plan</label>
            <textarea
              name="notes"
              rows={2}
              className="form-textarea"
              placeholder="e.g. Interested in high floor, pre-approved loan with SBI."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
