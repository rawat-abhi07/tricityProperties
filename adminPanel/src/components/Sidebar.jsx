import React from 'react';
import {
  LayoutDashboard,
  Building2,
  GitPullRequest,
  Users,
  MessageSquare,
  Star,
  LineChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function Sidebar({
  activeView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  listingCount = 32,
  pendingCount = 2,
  unreadMessagesCount = 2,
}) {
  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <a href="#dashboard" className="sidebar-brand" onClick={(e) => { e.preventDefault(); onSelectView('dashboard'); }}>
          <div className="brand-icon-box">
            <Building2 size={22} strokeWidth={2.2} />
          </div>
          {!collapsed && (
            <div className="brand-text-col">
              <span className="brand-title">RealtyPro</span>
              <span className="brand-subtitle">Property Management</span>
            </div>
          )}
        </a>
        <button
          className="sidebar-toggle-btn"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User Account Strip (Image 1 Style) */}
      {!collapsed && (
        <div className="sidebar-user-card">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Admin"
            className="sidebar-avatar"
          />
          <div className="sidebar-user-info">
            <div className="user-account-label">Account</div>
            <div className="user-account-email" title="themesflat@gmail.com">
              themesflat@gmail.com
            </div>
          </div>
        </div>
      )}

      {/* Menu Sections (Image 1 & Image 2 Combined) */}
      <div className="sidebar-nav">
        {/* Section: MAIN / DASHBOARD */}
        <div>
          {!collapsed && <div className="nav-section-title">Dashboard</div>}
          <ul className="nav-list">
            <li>
              <button
                className={`nav-item-btn ${activeView === 'dashboard' ? 'active' : ''}`}
                onClick={() => onSelectView('dashboard')}
                title="Dashboard"
              >
                <LayoutDashboard size={18} />
                {!collapsed && <span>Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${activeView === 'pending-approvals' ? 'active' : ''}`}
                onClick={() => onSelectView('pending-approvals')}
                title="Pending Approvals"
                style={{
                  color: pendingCount > 0 ? '#f59e0b' : undefined,
                  fontWeight: pendingCount > 0 ? 600 : undefined,
                }}
              >
                <ShieldCheck size={18} />
                {!collapsed && (
                  <>
                    <span>Pending Approvals</span>
                    {pendingCount > 0 && (
                      <span
                        className="nav-badge"
                        style={{
                          background: '#f59e0b',
                          color: '#ffffff',
                          fontWeight: 700,
                        }}
                      >
                        {pendingCount}
                      </span>
                    )}
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>

        {/* Section: PROPERTIES & SALES */}
        <div>
          {!collapsed && <div className="nav-section-title">Properties & Sales</div>}
          <ul className="nav-list">
            <li>
              <button
                className={`nav-item-btn ${activeView === 'properties' ? 'active' : ''}`}
                onClick={() => onSelectView('properties')}
                title="All Properties"
              >
                <Building2 size={18} />
                {!collapsed && (
                  <>
                    <span>All Properties</span>
                    <span className="nav-badge">{listingCount}</span>
                  </>
                )}
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${activeView === 'promotions' ? 'active' : ''}`}
                onClick={() => onSelectView('promotions')}
                title="Home Hero Banners"
              >
                <Sparkles size={18} />
                {!collapsed && <span>Hero Banners</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${activeView === 'deals' ? 'active' : ''}`}
                onClick={() => onSelectView('deals')}
                title="Deals Pipeline"
              >
                <GitPullRequest size={18} />
                {!collapsed && <span>Deals Pipeline</span>}
              </button>
            </li>
          </ul>
        </div>

        {/* Section: CLIENTS & LEADS */}
        <div>
          {!collapsed && <div className="nav-section-title">Clients & CRM</div>}
          <ul className="nav-list">
            <li>
              <button
                className={`nav-item-btn ${activeView === 'clients' ? 'active' : ''}`}
                onClick={() => onSelectView('clients')}
                title="Site Visits & Leads"
              >
                <Users size={18} />
                {!collapsed && <span>Site Visits & Leads</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${activeView === 'messages' ? 'active' : ''}`}
                onClick={() => onSelectView('messages')}
                title="Messages"
              >
                <MessageSquare size={18} />
                {!collapsed && (
                  <>
                    <span>Messages</span>
                    {unreadMessagesCount > 0 && (
                      <span className="nav-badge">{unreadMessagesCount}</span>
                    )}
                  </>
                )}
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${activeView === 'reviews' ? 'active' : ''}`}
                onClick={() => onSelectView('reviews')}
                title="Reviews"
              >
                <Star size={18} />
                {!collapsed && <span>Reviews</span>}
              </button>
            </li>
          </ul>
        </div>

        {/* Section: ANALYTICS */}
        <div>
          {!collapsed && <div className="nav-section-title">Analytics</div>}
          <ul className="nav-list">
            <li>
              <button
                className={`nav-item-btn ${activeView === 'insights' ? 'active' : ''}`}
                onClick={() => onSelectView('insights')}
                title="Page Insights & Reports"
              >
                <LineChart size={18} />
                {!collapsed && <span>Page Insights</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to log out of Admin Panel?')) {
              alert('Logged out successfully.');
            }
          }}
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
