import React, { useState } from 'react';
import { Sparkles, Plus, Edit2, Trash2, Check, Eye, EyeOff } from 'lucide-react';

export default function PromotionsManager({
  banners = [],
  onCreateBanner,
  onUpdateBanner,
  onDeleteBanner,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    presenter: 'HERO HOMES PRESENTS',
    config: '3 & 4 BHK',
    tag: 'PREMIUM RESIDENCES',
    price: '₹1.18 Cr* Onwards',
    name: '',
    subname: 'BY REPUTED BUILDER',
    location: '',
    tagline: 'LUXURY LIVING • 100% POWER BACKUP & RESORT AMENITIES',
    rera: '',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  });

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      presenter: 'HERO HOMES PRESENTS',
      config: '3 & 4 BHK',
      tag: 'PREMIUM RESIDENCES',
      price: '₹1.25 Cr* Onwards',
      name: '',
      subname: 'PR-7 AIRPORT ROAD',
      location: 'Airport Road, Mohali',
      tagline: 'LUXURY LIVING • 100% POWER BACKUP & RESORT AMENITIES',
      rera: 'PBRERA-SAS80-PR0641',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setFormData(banner);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBanner) {
      onUpdateBanner(editingBanner.id, formData);
    } else {
      onCreateBanner(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="promotions-manager-view">
      <div
        className="admin-card"
        style={{
          marginBottom: '1.5rem',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
            <Sparkles size={18} color="#2563eb" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              Home Page Hero Promotional Banners
            </h2>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Control the top sliding spotlight projects shown at the very top of the buyer marketplace home page
          </p>
        </div>

        <button className="btn-primary-action" onClick={handleOpenCreate}>
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Promotional Project</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: '1.5rem' }}>
        {banners.map((banner) => (
          <div key={banner.id} className="admin-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Banner Preview Background */}
            <div
              style={{
                height: '180px',
                backgroundImage: `linear-gradient(90deg, rgba(10,13,28,0.88) 0%, rgba(15,20,40,0.65) 100%), url(${banner.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '1.25rem',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {banner.presenter || 'DEVELOPER SPOTLIGHT'}
                </span>
                <span
                  style={{
                    background: banner.isActive ? '#10b981' : '#64748b',
                    color: '#fff',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                  }}
                >
                  {banner.isActive ? 'Active on Home' : 'Draft / Hidden'}
                </span>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 600 }}>{banner.config}</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  {banner.name}
                </h3>
                <div style={{ fontSize: '0.88rem', color: '#38bdf8', fontWeight: 700 }}>
                  {banner.price}
                </div>
              </div>
            </div>

            {/* Details & Actions */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                <strong>Location:</strong> {banner.location}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569', fontStyle: 'italic' }}>
                "{banner.tagline}"
              </div>
              <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>
                RERA: {banner.rera || 'PBRERA Verified'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                  className="table-action-btn"
                  onClick={() => onUpdateBanner(banner.id, { isActive: !banner.isActive })}
                  style={{
                    color: banner.isActive ? '#64748b' : '#10b981',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {banner.isActive ? <EyeOff size={13} /> : <Eye size={13} />}
                  <span>{banner.isActive ? 'Deactivate' : 'Publish'}</span>
                </button>
                <button
                  className="table-action-btn edit"
                  onClick={() => handleOpenEdit(banner)}
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  className="table-action-btn delete"
                  onClick={() => {
                    if (window.confirm(`Delete banner "${banner.name}"?`)) {
                      onDeleteBanner(banner.id);
                    }
                  }}
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit Banner */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2 className="modal-title">
                {editingBanner ? 'Edit Promotional Banner' : 'Create Home Hero Banner'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Project Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Leafsong Retreat"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Presenter / Builder Tag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.presenter}
                    onChange={(e) => setFormData({ ...formData, presenter: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Configuration & Tag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.config}
                    onChange={(e) => setFormData({ ...formData, config: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Starting Price Tag *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. ₹1.18 Cr* Onwards"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Locality / City *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Sector 82, Airport Road, Mohali"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tagline & Unique Value Proposition</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. SPANISH ARCHITECTURE • 100% POWER BACKUP & RESORT AMENITIES"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">RERA Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. PBRERA-SAS80-PR0641"
                  value={formData.rera}
                  onChange={(e) => setFormData({ ...formData, rera: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hero Background Image URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="form-modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingBanner ? 'Save Changes' : 'Publish Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
