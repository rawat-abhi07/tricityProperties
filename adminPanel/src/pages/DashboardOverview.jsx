import React, { useState } from 'react';
import {
  FileText,
  Clock,
  Star,
  Users,
  Calendar,
  Search,
  DollarSign,
  Edit2,
  CheckCircle,
  Trash2,
  Eye,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import PageInsightsChart from '../components/PageInsightsChart';
import AIInsightsCard from '../components/AIInsightsCard';
import MessagesWidget from '../components/MessagesWidget';
import ReviewsWidget from '../components/ReviewsWidget';

export default function DashboardOverview({
  properties = [],
  deals = [],
  messages = [],
  reviews = [],
  onEditProperty,
  onDeleteProperty,
  onToggleStatus,
  onNavigateToView,
}) {
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter properties for the New Listing table
  const filteredListings = properties.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (tableSearch) {
      const q = tableSearch.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc) return false;
    }
    return true;
  });

  const pendingCount = properties.filter((p) => p.status === 'Pending').length;
  const approvedCount = properties.filter((p) => p.status === 'Approved').length;

  return (
    <div className="dashboard-view-wrapper">
      {/* 4 Top Stat Cards (Harmonized Image 1 + Image 2) */}
      <div className="stat-cards-grid">
        {/* Card 1: Your listing (Image 1 Style) */}
        <StatCard
          title="Your listing"
          value={
            <span>
              {properties.length}{' '}
              <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>
                / 50 remaining
              </span>
            </span>
          }
          icon={<FileText size={22} />}
          variant="blue"
        />

        {/* Card 2: Pending (Image 1 Style - Clickable to Pending Approvals) */}
        <div style={{ cursor: 'pointer' }} onClick={() => onNavigateToView('pending-approvals')}>
          <StatCard
            title="Pending Approvals"
            value={String(pendingCount).padStart(2, '0')}
            subtext={pendingCount > 0 ? "Review Submissions →" : "All verified"}
            icon={<Clock size={22} />}
            variant="amber"
          />
        </div>

        {/* Card 3: Portfolio Value (Image 2 Specialty Navy Card) */}
        <StatCard
          title="Portfolio Value"
          value="₹ 18.1 Cr"
          subtext="From 32 active listings"
          icon={<DollarSign size={22} strokeWidth={2.5} />}
          isNavy={true}
        />

        {/* Card 4: Appointments / Reviews */}
        <StatCard
          title="Appointments"
          value="08"
          subtext="Site visits this week"
          icon={<Calendar size={22} />}
          variant="emerald"
        />
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="dashboard-grid-layout">
        {/* Left Column: AI Insights, New Listing Table & Page Insights */}
        <div className="dashboard-left-col">
          {/* AI Insights Card (Image 2 Style) */}
          <AIInsightsCard
            onNavigateToDeals={() => onNavigateToView('deals')}
            onNavigateToClients={() => onNavigateToView('clients')}
          />

          {/* "New Listing" Table Section (Exact Image 1 Style) */}
          <div className="admin-card">
            {/* Filter Bar */}
            <div className="table-filter-bar">
              <div className="table-filter-left">
                {/* Search */}
                <div className="search-input-inline">
                  <Search size={15} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                  />
                </div>

                {/* From Date */}
                <div className="date-filter-inline">
                  <Calendar size={13} />
                  <input type="text" defaultValue="From date" style={{ width: '70px' }} />
                </div>

                {/* To Date */}
                <div className="date-filter-inline">
                  <Calendar size={13} />
                  <input type="text" defaultValue="To date" style={{ width: '60px' }} />
                </div>

                {/* Status Dropdown */}
                <select
                  className="status-select-inline"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              {/* Count */}
              <span className="results-count-text">
                {filteredListings.length} results found
              </span>
            </div>

            {/* Table */}
            <div className="custom-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Listing</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      {/* Listing Cell: Image + Title + Posting Date + Price */}
                      <td>
                        <div className="prop-listing-cell">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="prop-listing-thumb"
                          />
                          <div className="prop-listing-meta">
                            <span className="prop-listing-title">{item.title}</span>
                            <span className="prop-listing-date">
                              Posting date: {item.postedDate || 'March 22, 2026'}
                            </span>
                            <span className="prop-listing-price">
                              {item.formattedPrice || `₹ ${item.price?.toLocaleString('en-IN')}`}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td>
                        <span
                          className={`status-pill ${
                            item.status === 'Approved'
                              ? 'approved'
                              : item.status === 'Pending'
                              ? 'pending'
                              : item.status === 'Sold'
                              ? 'sold'
                              : 'rejected'
                          }`}
                        >
                          {item.status || 'Approved'}
                        </span>
                      </td>

                      {/* Action Cell (Approve, Edit, Sold, Delete) */}
                      <td>
                        <div className="table-actions-cell">
                          {item.status === 'Pending' && (
                            <button
                              className="table-action-btn"
                              style={{
                                background: '#ecfdf5',
                                color: '#059669',
                                borderColor: '#a7f3d0',
                                fontWeight: 700,
                              }}
                              onClick={() => onToggleStatus(item.id, 'Approved')}
                              title="Approve & Publish Live to Marketplace"
                            >
                              <CheckCircle size={13} />
                              <span>Approve</span>
                            </button>
                          )}
                          <button
                            className="table-action-btn edit"
                            onClick={() => onEditProperty(item)}
                            title="Edit Listing"
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>

                          <button
                            className="table-action-btn sold-btn"
                            onClick={() =>
                              onToggleStatus(
                                item.id,
                                item.status === 'Sold' ? 'Approved' : 'Sold'
                              )
                            }
                            title="Toggle Sold Status"
                          >
                            <CheckCircle size={13} />
                            <span>{item.status === 'Sold' ? 'Relist' : 'Sold'}</span>
                          </button>

                          <button
                            className="table-action-btn delete"
                            onClick={() => {
                              if (window.confirm(`Delete listing "${item.title}"?`)) {
                                onDeleteProperty(item.id);
                              }
                            }}
                            title="Delete Listing"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination (Image 1 Style) */}
            <div className="table-pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </button>
              <button
                className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                className={`page-btn ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              >
                ›
              </button>
            </div>
          </div>

          {/* "Page Insights" Analytics Chart Section (Image 1 Style) */}
          <PageInsightsChart />
        </div>

        {/* Right Column: Messages & Reviews Widgets (Image 1 Style) */}
        <div className="dashboard-right-col">
          <MessagesWidget
            messages={messages}
            onOpenAllMessages={() => onNavigateToView('messages')}
          />
          <ReviewsWidget
            reviews={reviews}
            onOpenAllReviews={() => onNavigateToView('reviews')}
          />
        </div>
      </div>
    </div>
  );
}
