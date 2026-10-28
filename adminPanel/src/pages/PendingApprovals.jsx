import React from 'react';
import {
  CheckCircle,
  XCircle,
  Edit2,
  Phone,
  ShieldCheck,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function PendingApprovals({
  pendingProperties = [],
  onApprove,
  onReject,
  onEdit,
}) {
  return (
    <div className="pending-approvals-view">
      {/* Header Banner */}
      <div
        className="admin-card"
        style={{
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                background: '#f59e0b',
                color: '#78350f',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              Action Required
            </span>
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              Homeowner & Developer Submissions from Frontend
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
            Listing Verification Queue ({pendingProperties.length})
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '640px', marginTop: '4px' }}>
            When users submit property listings from the buyer marketplace, they arrive here in{' '}
            <strong style={{ color: '#f59e0b' }}>Pending</strong> status. Once you click{' '}
            <strong style={{ color: '#10b981' }}>"Approve & Publish"</strong>, the listing will
            automatically appear live on the Frontend Home & Explore Properties pages.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>
            {pendingProperties.length}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Awaiting Approval</span>
        </div>
      </div>

      {/* Cards List of Pending Submissions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {pendingProperties.map((prop) => (
          <div
            key={prop.id}
            className="admin-card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              gap: '1.5rem',
              borderLeft: '5px solid #f59e0b',
              flexWrap: 'wrap',
            }}
          >
            {/* Left Thumbnail & Source */}
            <div style={{ width: '220px', flexShrink: 0 }}>
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                <img
                  src={prop.image}
                  alt={prop.title}
                  style={{ width: '100%', height: '145px', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                  }}
                >
                  {prop.type || 'Apartment'}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    background: '#f59e0b',
                    color: '#ffffff',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  Pending Review
                </span>
              </div>

              <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#64748b' }}>
                <div>
                  <strong>Role:</strong> {prop.listingSource || 'Direct Owner'}
                </div>
                {prop.sellerPhone && (
                  <div style={{ marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Phone size={12} color="#059669" />
                    <a href={`tel:${prop.sellerPhone}`} style={{ color: '#059669', textDecoration: 'none' }}>
                      {prop.sellerPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Middle: Details & Specs */}
            <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                    {prop.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.84rem', marginTop: '2px' }}>
                    <MapPin size={14} color="#ef4444" />
                    <span>{prop.location} ({prop.city})</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#2563eb' }}>
                    {prop.formattedPrice || `₹ ${Number(prop.price).toLocaleString('en-IN')}`}
                  </div>
                  {prop.pricePerSqFt && (
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {prop.pricePerSqFt}
                    </span>
                  )}
                </div>
              </div>

              {/* Specs Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.4rem 0' }}>
                <span style={{ background: '#f1f5f9', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>
                  🛏️ {prop.bhk || `${prop.bedrooms || 3} BHK`}
                </span>
                <span style={{ background: '#f1f5f9', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>
                  📐 {prop.area || '1,750 sq.ft.'}
                </span>
                <span style={{ background: '#f1f5f9', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>
                  🔑 {prop.possessionStatus || 'Ready to Move'}
                </span>
                <span style={{ background: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                  🛡️ RERA: {prop.reraNumber || 'Applied (Verified on Call)'}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                {prop.description || 'Verified residential property in prime Tricity location submitted by seller.'}
              </p>

              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 'auto' }}>
                Submitted on: {prop.postedDate || 'Today'} • Listing ID: {prop.id}
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                justifyContent: 'center',
                minWidth: '180px',
                borderLeft: '1px solid #f1f5f9',
                paddingLeft: '1.25rem',
              }}
            >
              {/* Primary 1-Click Approve */}
              <button
                onClick={() => onApprove(prop.id)}
                style={{
                  background: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                  transition: 'background 0.2s',
                }}
              >
                <CheckCircle size={16} strokeWidth={2.5} />
                <span>Approve & Publish</span>
              </button>

              {/* Edit Before Publish */}
              <button
                onClick={() => onEdit(prop)}
                style={{
                  background: '#ffffff',
                  color: '#2563eb',
                  border: '1px solid #dbeafe',
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <Edit2 size={14} />
                <span>Edit Details</span>
              </button>

              {/* Reject */}
              <button
                onClick={() => {
                  if (window.confirm(`Reject property listing "${prop.title}"?`)) {
                    onReject(prop.id);
                  }
                }}
                style={{
                  background: '#ffffff',
                  color: '#ef4444',
                  border: '1px solid #fee2e2',
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <XCircle size={14} />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}

        {pendingProperties.length === 0 && (
          <div
            className="admin-card"
            style={{
              padding: '3.5rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              All Caught Up!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '480px' }}>
              There are currently no property listings waiting for approval. New submissions from
              the frontend <strong>"Post Property"</strong> page will appear here instantly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
