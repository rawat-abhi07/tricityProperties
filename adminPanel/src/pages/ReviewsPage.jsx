import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';

export default function ReviewsPage({ reviews = [] }) {
  return (
    <div className="reviews-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Customer Reviews & Ratings</h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Verified buyer & tenant testimonials across Tricity listings
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontWeight: 700 }}>
            <Star size={16} fill="#f59e0b" />
            <span style={{ fontSize: '1rem', color: '#0f172a' }}>4.9</span>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>(1,483 reviews)</span>
          </div>
        </div>

        <div className="widget-list">
          {reviews.map((rev) => (
            <div className="widget-item" key={rev.id} style={{ padding: '1.25rem' }}>
              <img src={rev.avatar} alt={rev.author} className="widget-avatar" style={{ width: 48, height: 48 }} />
              <div className="widget-content">
                <div className="widget-user-row">
                  <div>
                    <span className="widget-user-name" style={{ fontSize: '0.95rem' }}>{rev.author}</span>
                    <span style={{ fontSize: '0.75rem', color: '#2563eb', marginLeft: '0.6rem', fontWeight: 600 }}>
                      Reviewed: {rev.propertyTitle}
                    </span>
                  </div>
                  <span className="widget-time-ago">{rev.timeAgo}</span>
                </div>
                <div className="widget-star-row" style={{ margin: '0.2rem 0' }}>
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="widget-text-preview" style={{ fontSize: '0.86rem', color: '#334155' }}>
                  "{rev.comment}"
                </p>
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                  <button
                    style={{
                      background: '#ecfdf5',
                      border: '1px solid #d1fae5',
                      color: '#065f46',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <CheckCircle size={12} /> Approved
                  </button>
                  <button
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#475569',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <MessageSquare size={12} /> Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
