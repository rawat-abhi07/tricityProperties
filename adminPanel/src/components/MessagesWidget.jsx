import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function MessagesWidget({ messages = [], onOpenAllMessages }) {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Messages</h3>
        <button
          onClick={onOpenAllMessages}
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
        {messages.slice(0, 4).map((msg) => (
          <div className="widget-item" key={msg.id}>
            <img src={msg.avatar} alt={msg.sender} className="widget-avatar" />
            <div className="widget-content">
              <div className="widget-user-row">
                <span className="widget-user-name">{msg.sender}</span>
                <span className="widget-time-ago">{msg.timeAgo}</span>
              </div>
              <p className="widget-text-preview" title={msg.preview}>
                {msg.preview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
