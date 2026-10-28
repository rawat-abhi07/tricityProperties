import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function ReviewsWidget({ reviews = [], onOpenAllReviews }) {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Recent Reviews</h3>
        <button
          onClick={onOpenAllReviews}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
          }}
        >
          <span>View All</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="widget-list">
        {reviews.slice(0, 5).map((rev) => (
          <div className="widget-item" key={rev.id}>
            <img src={rev.avatar} alt={rev.author} className="widget-avatar" />
            <div className="widget-content">
              <div className="widget-user-row">
                <span className="widget-user-name">{rev.author}</span>
                <span className="widget-time-ago">{rev.timeAgo}</span>
              </div>
              <p className="widget-text-preview">{rev.comment}</p>
              <div className="widget-star-row">
                {[...Array(rev.rating || 5)].map((_, i) => (
                  <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
