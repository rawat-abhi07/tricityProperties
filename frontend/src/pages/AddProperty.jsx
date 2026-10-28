import React, { useState, useRef } from 'react';

const SAMPLE_ARCHITECTURAL_IMAGES = [
  { label: 'Exterior Front', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Living Room', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Master Bedroom', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Balcony View', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80' },
];

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
    carpetArea: '1,320 sq.ft.',
    type: 'Apartment',
    possessionStatus: 'Ready to Move',
    listingSource: 'Direct Owner',
    reraNumber: '',
    description: '',
    sellerPhone: '',
  });

  // User role selector ("I am:")
  const [userRole, setUserRole] = useState('Owner');

  // Multiple Images Upload State
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Format Indian Price on the fly for feedback
  const formatIndianPrice = (rawPrice) => {
    const num = Number(rawPrice);
    if (!num || isNaN(num)) return '';
    if (num >= 10000000) {
      return `₹ ${(num / 10000000).toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      return `₹ ${(num / 100000).toFixed(1)} Lakhs`;
    }
    return `₹ ${num.toLocaleString('en-IN')}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Process multiple selected or dropped files
  const handleMultipleFiles = (files) => {
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const validFiles = [];

    for (const file of fileList) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files (PNG, JPG, WEBP) are allowed.');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        setError(`File "${file.name}" exceeds the 8MB limit.`);
        return;
      }
      validFiles.push(file);
    }

    if (uploadedImages.length + validFiles.length > 12) {
      setError('You can upload up to 12 photos per property.');
      return;
    }

    setError('');

    // Read all files
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImgObj = {
          id: String(Date.now() + Math.random()),
          name: file.name,
          url: e.target.result,
        };
        setUploadedImages((prev) => [...prev, newImgObj]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e) => {
    handleMultipleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleMultipleFiles(e.dataTransfer.files);
  };

  // Remove single image from list
  const handleRemoveImage = (idToRemove) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== idToRemove));
  };

  // Make an image the primary cover photo (move to index 0)
  const handleSetAsCover = (index) => {
    if (index === 0) return;
    setUploadedImages((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      copy.unshift(selected);
      return copy;
    });
  };

  // Add sample photos if needed
  const handleAddSamplePhotos = () => {
    const sampleItems = SAMPLE_ARCHITECTURAL_IMAGES.map((s, idx) => ({
      id: `sample-${idx}-${Date.now()}`,
      name: s.label,
      url: s.url,
    }));
    setUploadedImages((prev) => [...prev, ...sampleItems]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please enter a property title or society name.');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Please enter expected price.');
      return;
    }
    if (!formData.location.trim()) {
      setError('Please enter the locality or sector in Tricity.');
      return;
    }

    setLoading(true);
    try {
      const imageList = uploadedImages.map((img) => img.url);
      const primaryCover =
        imageList.length > 0
          ? imageList[0]
          : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';

      const submissionPayload = {
        ...formData,
        listingSource:
          userRole === 'Owner'
            ? 'Direct Owner'
            : userRole === 'Builder'
            ? 'Verified Developer'
            : 'Authorized Partner',
        image: primaryCover,
        images: imageList.length > 0 ? imageList : [primaryCover],
        status: 'Pending',
      };

      await onPropertyCreated(submissionPayload);
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
        carpetArea: '1,320 sq.ft.',
        type: 'Apartment',
        possessionStatus: 'Ready to Move',
        listingSource: 'Direct Owner',
        reraNumber: '',
        description: '',
        sellerPhone: '',
      });
      setUploadedImages([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Error listing property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formattedLivePrice = formatIndianPrice(formData.price);

  return (
    <div className="compact-post-page">
      {/* 99acres-Style Top Hero Banner */}
      <section className="compact-hero-banner">
        <div className="compact-hero-inner">
          {/* Left Column: Value Proposition & Visual */}
          <div className="compact-hero-left">
            <span className="badge-highlight">100% Free • Verified Marketplace</span>
            <h1>
              Sell Your Property <span className="text-primary-blue">Faster</span> in Tricity
            </h1>

            <ul className="value-checklist">
              <li>
                <span className="check-bullet">✓</span>
                <span><strong>Advertise for FREE:</strong> Zero listing fees, zero broker cuts</span>
              </li>
              <li>
                <span className="check-bullet">✓</span>
                <span><strong>Multi-Photo Showcase:</strong> Upload living room, bedrooms & exterior shots</span>
              </li>
              <li>
                <span className="check-bullet">✓</span>
                <span><strong>Verified Inquiries:</strong> Direct calls from genuine local buyers</span>
              </li>
              <li>
                <span className="check-bullet">✓</span>
                <span><strong>Dedicated Escorted Tours:</strong> Free site visit coordination</span>
              </li>
            </ul>

            {/* Hero Property Showcase Image */}
            <div className="hero-showcase-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                alt="Premium property listing showcase"
                className="hero-showcase-img"
              />
              <div className="hero-img-overlay-badge">
                <span className="overlay-dot"></span>
                <span>500+ verified properties listed this month</span>
              </div>
            </div>

          </div>

          {/* Right Column: Single Unified Compact Form Card */}
          <div className="compact-hero-right">
            <div className="single-card-form-wrapper">
              <div className="card-top-header">
                <h3>Start posting your property, it's free</h3>
                <p>Takes less than 2 minutes • Add photos & reach verified buyers</p>
              </div>

              {success && (
                <div className="compact-success-alert" style={{ background: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', padding: '1rem', borderRadius: '8px', lineHeight: 1.5 }}>
                  🛡️ <strong>Listing Submitted for Verification!</strong> Your property has been received and added to the Admin Review Queue. Once approved by our admin team, it will be published live on the marketplace.
                </div>
              )}

              {error && <div className="compact-error-alert">⚠️ {error}</div>}

              <form onSubmit={handleSubmit} className="single-unified-form">
                {/* "I am:" Selector */}
                <div className="form-item">
                  <label className="field-label-small">I am:</label>
                  <div className="pill-selector-row">
                    {['Owner', 'Builder', 'Channel Partner'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        className={`role-pill-btn ${userRole === role ? 'active' : ''}`}
                        onClick={() => setUserRole(role)}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type Pills */}
                <div className="form-item">
                  <label className="field-label-small">Property Type:</label>
                  <div className="pill-selector-row wrap-pills">
                    {[
                      { label: 'Apartment', value: 'Apartment' },
                      { label: 'Builder Floor', value: 'Independent Floor' },
                      { label: 'Villa', value: 'Villa' },
                      { label: 'Plot', value: 'Residential Plot' },
                      { label: 'Commercial', value: 'Commercial' },
                    ].map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        className={`type-pill-btn ${formData.type === t.value ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, type: t.value })}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Title / Society Name */}
                <div className="form-item">
                  <label className="field-label-small">Property Title / Society Name *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. 3 BHK Corner Luxury Flat, PR-7 Airport Road"
                    value={formData.title}
                    onChange={handleChange}
                    className="compact-input"
                  />
                </div>

                {/* Location: City + Locality */}
                <div className="form-row-compact">
                  <div className="form-item">
                    <label className="field-label-small">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="compact-select"
                    >
                      <option value="Mohali">Mohali</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Panchkula">Panchkula</option>
                      <option value="Zirakpur">Zirakpur</option>
                      <option value="New Chandigarh">New Chandigarh</option>
                    </select>
                  </div>

                  <div className="form-item">
                    <label className="field-label-small">Sector / Locality *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="e.g. Sector 82, Airport Road"
                      value={formData.location}
                      onChange={handleChange}
                      className="compact-input"
                    />
                  </div>
                </div>

                {/* BHK + Expected Price */}
                <div className="form-row-compact">
                  <div className="form-item">
                    <label className="field-label-small">BHK *</label>
                    <select
                      name="bhk"
                      value={formData.bhk}
                      onChange={handleChange}
                      className="compact-select"
                    >
                      <option value="Studio">Studio</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="5 BHK">5 BHK / Villa</option>
                      <option value="Plot">Plot</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div className="form-item">
                    <div className="label-with-rate">
                      <label className="field-label-small">Expected Price (INR) *</label>
                      {formattedLivePrice && (
                        <span className="live-rate-tag">{formattedLivePrice}</span>
                      )}
                    </div>
                    <div className="price-input-wrapper">
                      <span className="rupee-symbol">₹</span>
                      <input
                        type="number"
                        name="price"
                        required
                        min="100000"
                        placeholder="e.g. 11800000"
                        value={formData.price}
                        onChange={handleChange}
                        className="compact-input price-indent"
                      />
                    </div>
                  </div>
                </div>

                {/* MULTIPLE PHOTO UPLOAD SECTION */}
                <div className="form-item">
                  <div className="photo-label-row">
                    <label className="field-label-small">
                      Property Photos ({uploadedImages.length}/12):
                    </label>
                    {uploadedImages.length > 0 && (
                      <span className="cover-photo-note">First photo is Cover</span>
                    )}
                  </div>

                  {/* Hidden multi-file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    multiple
                    style={{ display: 'none' }}
                  />

                  {/* Dropzone Area */}
                  <div
                    className={`compact-dropzone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <span className="drop-icon">📷</span>
                    <div className="drop-text">
                      <span>
                        <strong>Click to select multiple photos</strong> or drag & drop
                      </span>
                      <span className="drop-subtext">
                        Exterior, living room, bedrooms (PNG, JPG, WEBP • Max 8MB each)
                      </span>
                    </div>
                  </div>

                  {/* Uploaded Photos Gallery Grid */}
                  {uploadedImages.length > 0 ? (
                    <div className="multi-photos-gallery">
                      {uploadedImages.map((img, index) => (
                        <div key={img.id} className="gallery-thumb-item">
                          <img src={img.url} alt={img.name} className="gallery-img" />

                          {index === 0 ? (
                            <span className="cover-badge">★ Cover</span>
                          ) : (
                            <button
                              type="button"
                              className="make-cover-btn"
                              onClick={() => handleSetAsCover(index)}
                              title="Set as cover photo"
                            >
                              Set Cover
                            </button>
                          )}

                          <button
                            type="button"
                            className="delete-thumb-btn"
                            onClick={() => handleRemoveImage(img.id)}
                            title="Remove photo"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* Small Add More button tile */}
                      {uploadedImages.length < 12 && (
                        <button
                          type="button"
                          className="add-more-tile"
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        >
                          <span className="plus-sign">+</span>
                          <span>Add More</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="sample-quick-add">
                      <span className="sample-hint-text">
                        Don't have photos ready?{' '}
                        <button
                          type="button"
                          className="sample-link-btn"
                          onClick={handleAddSamplePhotos}
                        >
                          Load 4 Sample Architecture Photos
                        </button>
                      </span>
                    </div>
                  )}
                </div>

                {/* Mobile Number (+91) */}
                <div className="form-item">
                  <label className="field-label-small">
                    Your Mobile Number (For Buyer Inquiries):
                  </label>
                  <div className="phone-compact-box">
                    <span className="phone-code">+91</span>
                    <input
                      type="tel"
                      name="sellerPhone"
                      maxLength="10"
                      placeholder="98765 43210"
                      value={formData.sellerPhone}
                      onChange={handleChange}
                      className="compact-input phone-field"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button type="submit" className="compact-submit-btn" disabled={loading}>
                  {loading ? 'Posting Property...' : 'Post Property Free →'}
                </button>

                <p className="privacy-terms-note">
                  By posting, you agree to receive buyer connects from verified buyers. Zero spam guarantee.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot Section 2: "Post Your Property In 3 Simple Steps" */}
      <section className="steps-explain-section">
        <div className="steps-container">
          <span className="subtle-kicker">Simple Process</span>
          <h2>Post Your Property In 3 Simple Steps</h2>
          <div className="three-steps-grid">
            <div className="step-box">
              <div className="step-icon">📝</div>
              <h4>01. Add Details of your Property</h4>
              <p>Enter basic information like title, locality, and property configuration.</p>
            </div>
            <div className="step-box">
              <div className="step-icon">📸</div>
              <h4>02. Upload Multiple Photos & Pricing</h4>
              <p>Upload room, kitchen & balcony photos. Set your expected price in Indian Rupees.</p>
            </div>
            <div className="step-box">
              <div className="step-icon">🤝</div>
              <h4>03. Receive Buyer Inquiries</h4>
              <p>Get verified phone inquiries directly from genuine homebuyers with zero middleman fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot Section 3: Social Proof / Audience Reach */}
      <section className="audience-reach-section">
        <div className="reach-container">
          <h3>
            With thousands of active buyers monthly, your property gets maximum visibility in Tricity
          </h3>
          <div className="reach-metrics-grid">
            <div className="metric-box">
              <span className="metric-number">45K+</span>
              <span className="metric-label">Monthly Buyers</span>
            </div>
            <div className="metric-box">
              <span className="metric-number">100%</span>
              <span className="metric-label">Verified Leads</span>
            </div>
            <div className="metric-box">
              <span className="metric-number">0%</span>
              <span className="metric-label">Brokerage Charged</span>
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot Section 4: Seller FAQs */}
      <section className="seller-faq-section">
        <div className="faq-container-narrow">
          <span className="subtle-kicker">Frequently Asked Questions</span>
          <h2>Everything you need to know about listing</h2>

          <div className="faq-accordion-list">
            <div className="faq-item-row">
              <h4>Is it completely free to post a property?</h4>
              <p>
                Yes, posting your property for sale on Tricity Housing is 100% free of charge. There are no upfront fees and zero transaction commission deducted.
              </p>
            </div>
            <div className="faq-item-row">
              <h4>How many photos can I upload?</h4>
              <p>
                You can upload up to 12 high-resolution photos showcasing the living room, bedrooms, kitchen, bathrooms, balcony, and building facade.
              </p>
            </div>
            <div className="faq-item-row">
              <h4>How do I choose which photo is displayed first?</h4>
              <p>
                The first photo in your gallery is automatically chosen as the cover photo. You can click "Set Cover" on any uploaded picture to make it the primary cover image.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
