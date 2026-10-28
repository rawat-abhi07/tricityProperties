import React, { useState } from 'react';
import { Users, Phone, MessageSquare, Calendar, Car, CheckCircle2, Clock } from 'lucide-react';

export default function ClientsLeads({ leads = [], onUpdateLeadStatus }) {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredLeads = leads.filter((l) => {
    if (filterStatus !== 'All' && l.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="clients-leads-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users size={18} color="#2563eb" />
            <h3 className="admin-card-title">Client Inquiries & Site Visits</h3>
          </div>
          <select
            className="status-select-inline"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Inquiries</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Visit Scheduled">Visit Scheduled</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        <div className="custom-table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Client Name & Contact</th>
                <th>Interested Property</th>
                <th>Preferred Visit Slot</th>
                <th>Cab Pickup</th>
                <th>Lead Status</th>
                <th>Follow-up Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  {/* Client Name & Phone */}
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{lead.name}</span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{lead.phone}</span>
                    </div>
                  </td>

                  {/* Property */}
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>
                        {lead.propertyTitle}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {lead.location}
                      </span>
                    </div>
                  </td>

                  {/* Slot */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}>
                      <Calendar size={13} color="#2563eb" />
                      <span>{lead.slot}</span>
                    </div>
                  </td>

                  {/* Cab */}
                  <td>
                    {lead.needCab ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: '#eff6ff',
                          color: '#2563eb',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        <Car size={12} /> Yes
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Self-drive</span>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value)}
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        outline: 'none',
                        backgroundColor:
                          lead.status === 'New'
                            ? '#dbeafe'
                            : lead.status === 'Visit Scheduled'
                            ? '#d1fae5'
                            : lead.status === 'Contacted'
                            ? '#ffedd5'
                            : '#ede9fe',
                        color:
                          lead.status === 'New'
                            ? '#1e40af'
                            : lead.status === 'Visit Scheduled'
                            ? '#065f46'
                            : lead.status === 'Contacted'
                            ? '#9a3412'
                            : '#5b21b6',
                      }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Visit Scheduled">Visit Scheduled</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </td>

                  {/* Quick Connect Actions */}
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <a
                        href={`tel:${lead.phone}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: '#ecfdf5',
                          color: '#059669',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <Phone size={12} /> Call
                      </a>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: '#f0fdf4',
                          color: '#16a34a',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <MessageSquare size={12} /> WhatsApp
                      </a>
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
