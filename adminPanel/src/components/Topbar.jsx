import React, { useState } from 'react';
import {
  Search,
  Bell,
  Plus,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';

export default function Topbar({
  onOpenAddProperty,
  onOpenAddDeal,
  searchQuery,
  onSearchChange,
  activeView,
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New Site Visit Request',
      text: 'Gurpreet Singh requested site visit for 3 BHK Sector 82 with Free Cab.',
      time: '10 min ago',
      unread: true,
      icon: <Calendar size={14} className="text-blue-500" />,
    },
    {
      id: 2,
      title: 'Pending Listing Approval',
      text: 'Seller submitted new property from frontend awaiting verification.',
      time: '1 hour ago',
      unread: true,
      icon: <CheckCircle2 size={14} className="text-emerald-500" />,
    },
    {
      id: 3,
      title: 'Stalled Deal Alert',
      text: 'Olivia Grant deal has been in Viewing Scheduled for 49 days.',
      time: '3 hours ago',
      unread: false,
      icon: <AlertTriangle size={14} className="text-amber-500" />,
    },
  ];

  return (
    <header className="admin-topbar">
      {/* Topbar Left Title / Greeting */}
      <div className="topbar-left">
        <h1 className="topbar-greeting">
          {activeView === 'dashboard' && 'Welcome to RealtyPro'}
          {activeView === 'pending-approvals' && 'Pending Listing Approvals'}
          {activeView === 'properties' && 'Property Inventory & Listings'}
          {activeView === 'promotions' && 'Home Page Hero Banners'}
          {activeView === 'deals' && 'Sales Pipeline & Deals'}
          {activeView === 'clients' && 'Client Management & Site Visits'}
          {activeView === 'reviews' && 'Customer Reviews & Feedback'}
          {activeView === 'messages' && 'Inquiries & Team Chat'}
          {activeView === 'insights' && 'Page Insights & Performance'}
        </h1>
        <p className="topbar-subtext">
          {activeView === 'dashboard'
            ? "Here's what's happening with your property business today"
            : activeView === 'pending-approvals'
            ? 'Review and verify listings submitted by users before publishing live'
            : activeView === 'promotions'
            ? 'Manage promotional banners displayed at the top of the Home page'
            : 'Real-time synchronization across Chandigarh, Mohali & Panchkula'}
        </p>
      </div>

      {/* Topbar Right Actions */}
      <div className="topbar-right">
        {/* Global Search */}
        <div className="topbar-search-wrap">
          <Search size={16} className="topbar-search-icon" />
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Search clients, properties..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="notification-dot"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                width: '320px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                zIndex: 100,
                padding: '0.75rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.4rem 0.5rem 0.75rem 0.5rem',
                  borderBottom: '1px solid #f1f5f9',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                }}
              >
                <span>Notifications (2 New)</span>
                <span
                  style={{ fontSize: '0.75rem', color: '#2563eb', cursor: 'pointer' }}
                  onClick={() => setShowNotifications(false)}
                >
                  Mark all read
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '0.6rem',
                      borderRadius: '8px',
                      background: n.unread ? '#f8fafc' : '#ffffff',
                      border: '1px solid',
                      borderColor: n.unread ? '#e2e8f0' : 'transparent',
                      display: 'flex',
                      gap: '0.6rem',
                    }}
                  >
                    <div style={{ marginTop: '2px' }}>{n.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '2px' }}>
                        {n.text}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px' }}>
                        {n.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary Action: + Submit Property or + Add Client */}
        <button className="btn-primary-action" onClick={onOpenAddProperty} title="Create New Property Listing">
          <Plus size={16} strokeWidth={2.5} />
          <span>Submit Property</span>
        </button>

        <button
          className="btn-primary-action"
          style={{ background: '#0f172a' }}
          onClick={onOpenAddDeal}
          title="Add Deal to Pipeline"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Deal</span>
        </button>

        {/* User Pill */}
        <div className="topbar-user-badge">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Themesflat"
            className="topbar-avatar"
          />
          <span className="topbar-username">Themesflat</span>
          <ChevronDown size={14} color="#64748b" />
        </div>
      </div>
    </header>
  );
}
