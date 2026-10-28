import React, { useState } from 'react';
import {
  Sparkles,
  RotateCw,
  Calendar,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export default function AIInsightsCard({ onNavigateToDeals, onNavigateToClients }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="admin-card" style={{ padding: '1.25rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={17} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0f172a' }}>
              AI Insights
            </h3>
            <p style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Based on your real data & active Tricity deals
            </p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px',
            transition: 'transform 0.3s',
            transform: isRefreshing ? 'rotate(180deg)' : 'none',
          }}
          title="Refresh AI Insights"
          aria-label="Refresh AI Insights"
        >
          <RotateCw size={15} />
        </button>
      </div>

      <div className="ai-insights-container">
        {/* Insight 1: Follow up with Leads */}
        <div className="ai-insight-card blue-tint">
          <div className="ai-insight-header">
            <Calendar size={15} color="#2563eb" />
            <span className="ai-insight-title">Follow up with Leads</span>
          </div>
          <p className="ai-insight-body">
            9 leads require immediate follow-up. Prioritize the 5 high-priority site visits, then contact
            <strong> Folake Adesanya (₹ 2.75 Cr)</strong> and <strong>Gurpreet Singh</strong>.
          </p>
          <button
            className="ai-insight-link"
            onClick={onNavigateToClients}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <span>View Leads</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Insight 2: High Value Prospect */}
        <div className="ai-insight-card blue-tint">
          <div className="ai-insight-header">
            <TrendingUp size={15} color="#2563eb" />
            <span className="ai-insight-title">Ngozi Eze: High Value Prospect</span>
          </div>
          <p className="ai-insight-body">
            Ngozi Eze is negotiating for the <strong>₹ 3.85 Cr Spanish Villa</strong> in Mohali. Engage immediately
            to convert. Last contact was 43 days ago.
          </p>
          <button
            className="ai-insight-link"
            onClick={onNavigateToDeals}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <span>Contact Prospect</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Insight 3: Stalled Deals in Early Stages */}
        <div className="ai-insight-card warning-tint">
          <div className="ai-insight-header">
            <AlertTriangle size={15} color="#d97706" />
            <span className="ai-insight-title" style={{ color: '#92400e' }}>
              Stalled Deals in Early Stages
            </span>
          </div>
          <p className="ai-insight-body">
            Three deals (<strong>Olivia Grant</strong>, <strong>Sarah Jenkins</strong>, <strong>Robert Sterling</strong>)
            are stuck in early pipeline stages for 40+ days. Review and re-engage these buyers.
          </p>
          <button
            className="ai-insight-link"
            style={{ color: '#d97706' }}
            onClick={onNavigateToDeals}
          >
            <span>Review Pipeline</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
