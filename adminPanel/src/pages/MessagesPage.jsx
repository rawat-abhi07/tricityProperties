import React, { useState } from 'react';
import { Send, CheckCircle2, Search } from 'lucide-react';

export default function MessagesPage({ messages = [] }) {
  const [selectedMessage, setSelectedMessage] = useState(messages[0] || null);
  const [replyText, setReplyText] = useState('');
  const [thread, setThread] = useState([
    { sender: 'Themesflat', text: 'Buyer asked if the 3 BHK corner unit at Sector 82 includes 2 covered stilt parkings.', time: '10:30 AM', isMe: false },
    { sender: 'Admin (You)', text: 'Yes, each corner apartment at Leafsong includes 2 designated basement car spaces.', time: '10:38 AM', isMe: true }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setThread([...thread, { sender: 'Admin (You)', text: replyText, time: 'Just now', isMe: true }]);
    setReplyText('');
  };

  return (
    <div className="messages-page" style={{ height: 'calc(100vh - 160px)', display: 'flex', gap: '1.5rem' }}>
      {/* Conversations List */}
      <div className="admin-card" style={{ width: '340px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
          <div className="search-input-inline" style={{ width: '100%' }}>
            <Search size={15} />
            <input type="text" placeholder="Search conversations..." />
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {messages.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMessage(m)}
              style={{
                padding: '0.85rem 1rem',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                gap: '0.75rem',
                cursor: 'pointer',
                backgroundColor: selectedMessage?.id === m.id ? '#eff6ff' : '#ffffff',
              }}
            >
              <img src={m.avatar} alt={m.sender} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{m.sender}</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{m.timeAgo}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {m.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="admin-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {selectedMessage && (
            <>
              <img src={selectedMessage.avatar} alt={selectedMessage.sender} style={{ width: 40, height: 40, borderRadius: '50%' }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{selectedMessage.sender}</h4>
                <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></span> Online
                </span>
              </div>
            </>
          )}
        </div>

        {/* Message Bubble History */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {thread.map((t, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: t.isMe ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                background: t.isMe ? '#2563eb' : '#f1f5f9',
                color: t.isMe ? '#ffffff' : '#1e293b',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                borderBottomRightRadius: t.isMe ? '2px' : '12px',
                borderBottomLeftRadius: !t.isMe ? '2px' : '12px',
                fontSize: '0.85rem',
              }}
            >
              <div>{t.text}</div>
              <div style={{ fontSize: '0.68rem', color: t.isMe ? '#bfdbfe' : '#94a3b8', marginTop: '4px', textAlign: 'right' }}>
                {t.time}
              </div>
            </div>
          ))}
        </div>

        {/* Reply Input Form */}
        <form onSubmit={handleSend} style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            className="form-input"
            style={{ flex: 1 }}
            placeholder="Type your response to prospective buyer..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Send size={15} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
