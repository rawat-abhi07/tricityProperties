import React from 'react';
import PageInsightsChart from '../components/PageInsightsChart';
import { LineChart, BarChart3, TrendingUp, PieChart, Users, Award } from 'lucide-react';

export default function InsightsPage() {
  const localities = [
    { name: 'Mohali (Airport Road & Sector 82)', share: '42%', inquiries: 840, growth: '+18%' },
    { name: 'Chandigarh (Sector 34 & Central)', share: '28%', inquiries: 560, growth: '+12%' },
    { name: 'Zirakpur (PR-7 Ring Road)', share: '18%', inquiries: 360, growth: '+24%' },
    { name: 'Panchkula (Sector 20 Golf Greens)', share: '12%', inquiries: 240, growth: '+8%' },
  ];

  return (
    <div className="insights-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Page Insights Traffic Chart */}
      <PageInsightsChart />

      {/* Regional Locality Market Demand Breakdown */}
      <div className="admin-card" style={{ padding: '1.5rem' }}>
        <div className="admin-card-header" style={{ padding: '0 0 1rem 0' }}>
          <div>
            <h3 className="admin-card-title">Tricity Locality Demand & Inquiries</h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Buyer interest split across Chandigarh, Mohali, Panchkula & Zirakpur corridors
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {localities.map((loc) => (
            <div key={loc.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{loc.name}</span>
                <span style={{ color: '#2563eb', fontWeight: 700 }}>
                  {loc.share} ({loc.inquiries} inquiries)
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: loc.share,
                    height: '100%',
                    background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                    borderRadius: '9999px',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
