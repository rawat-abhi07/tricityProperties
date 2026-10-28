import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Filter,
  Building2,
  MapPin,
} from 'lucide-react';

export default function PropertiesManagement({
  properties = [],
  onOpenAddModal,
  onEditProperty,
  onDeleteProperty,
  onToggleStatus,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = properties.filter((p) => {
    if (cityFilter !== 'All' && p.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
    if (typeFilter !== 'All' && p.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="properties-mgmt-view">
      {/* Top Filter and Actions Bar */}
      <div className="admin-card" style={{ marginBottom: '1.5rem', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div className="search-input-inline" style={{ width: '240px' }}>
              <Search size={15} />
              <input
                type="text"
                placeholder="Search by title or sector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="status-select-inline"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="All">All Cities</option>
              <option value="Mohali">Mohali</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Panchkula">Panchkula</option>
              <option value="Zirakpur">Zirakpur</option>
              <option value="New Chandigarh">New Chandigarh</option>
            </select>

            <select
              className="status-select-inline"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Independent Floor">Independent Floor</option>
              <option value="Villa">Villa</option>
              <option value="Plot / Land">Plot / Land</option>
              <option value="Commercial">Commercial</option>
            </select>

            <select
              className="status-select-inline"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          {/* Add Property Button */}
          <button className="btn-primary-action" onClick={onOpenAddModal}>
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Building2 size={18} color="#2563eb" />
            <h3 className="admin-card-title">Properties Directory</h3>
          </div>
          <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
            Showing {filtered.length} listings
          </span>
        </div>

        <div className="custom-table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Listing Details</th>
                <th>City & Locality</th>
                <th>Type & BHK</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  {/* Title & Photo */}
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
                          {item.area || '1,750 sq.ft.'} • {item.possessionStatus || 'Ready'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem' }}>
                      <MapPin size={13} color="#64748b" />
                      <span>{item.city} ({item.locality || item.location.split(',')[0]})</span>
                    </div>
                  </td>

                  {/* Type / BHK */}
                  <td>
                    <span style={{ fontWeight: 600, color: '#334155' }}>
                      {item.bhk || '3 BHK'}
                    </span>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.type}</div>
                  </td>

                  {/* Price */}
                  <td>
                    <span style={{ fontWeight: 700, color: '#2563eb' }}>
                      {item.formattedPrice || `₹ ${item.price?.toLocaleString('en-IN')}`}
                    </span>
                    {item.pricePerSqFt && (
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {item.pricePerSqFt}
                      </div>
                    )}
                  </td>

                  {/* Status Dropdown selector */}
                  <td>
                    <select
                      value={item.status || 'Approved'}
                      onChange={(e) => onToggleStatus(item.id, e.target.value)}
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        outline: 'none',
                        backgroundColor:
                          item.status === 'Approved'
                            ? '#d1fae5'
                            : item.status === 'Pending'
                            ? '#ffedd5'
                            : item.status === 'Sold'
                            ? '#ede9fe'
                            : '#fee2e2',
                        color:
                          item.status === 'Approved'
                            ? '#065f46'
                            : item.status === 'Pending'
                            ? '#9a3412'
                            : item.status === 'Sold'
                            ? '#5b21b6'
                            : '#991b1b',
                      }}
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="table-actions-cell">
                      <button
                        className="table-action-btn edit"
                        onClick={() => onEditProperty(item)}
                        title="Edit Listing"
                      >
                        <Edit2 size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        className="table-action-btn delete"
                        onClick={() => {
                          if (window.confirm(`Delete property listing "${item.title}"?`)) {
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
      </div>
    </div>
  );
}
