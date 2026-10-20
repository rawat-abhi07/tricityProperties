import React, { useState } from 'react';

export default function AddProperty({ onPropertyCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '3',
    bathrooms: '2',
    area: '2,000 sqft',
    type: 'House',
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
    setLoading(true);

    try {
      await onPropertyCreated(formData);
      setSuccess(true);
      setFormData({
        title: '',
        price: '',
        location: '',
        bedrooms: '3',
        bathrooms: '2',
        area: '2,000 sqft',
        type: 'House',
        image: '',
        description: '',
      });
    } catch (err) {
      setError(err.message || 'Error creating property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container page-top-padding">
      <div className="form-wrapper">
        <h2>List a New Property</h2>
        <p>Fill out the details below to add a property to the market.</p>

        {success && (
          <div className="alert success-alert">
            ✅ Property listed successfully! View it in the Explore tab.
          </div>
        )}

        {error && (
          <div className="alert error-alert">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label>Property Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Modern Sunset Penthouse"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (USD) *</label>
              <input
                type="number"
                name="price"
                required
                placeholder="e.g. 550000"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Location / Address *</label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Miami, Florida"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-row three-col">
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Area Size</label>
              <input
                type="text"
                name="area"
                placeholder="e.g. 1,800 sqft"
                value={formData.area}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL (Optional)</label>
            <input
              type="url"
              name="image"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Highlight special amenities, views, renovations..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Create Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
