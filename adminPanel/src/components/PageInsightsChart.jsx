import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function PageInsightsChart() {
  const [activeTab, setActiveTab] = useState('Month');
  const [hoveredPoint, setHoveredPoint] = useState({
    date: 'Apr 01',
    value: '178k',
    x: 645,
    y: 85,
  });

  // Data points corresponding to the curve shown in Image 1
  const points = [
    { label: 'Mar 20', val: 30, x: 50, y: 195 },
    { label: 'Mar 21', val: 42, x: 105, y: 182 },
    { label: 'Mar 22', val: 58, x: 160, y: 170 },
    { label: 'Mar 23', val: 65, x: 215, y: 162 },
    { label: 'Mar 24', val: 120, x: 270, y: 110 },
    { label: 'Mar 25', val: 110, x: 325, y: 118 },
    { label: 'Mar 26', val: 145, x: 380, y: 92 },
    { label: 'Mar 27', val: 135, x: 435, y: 99 },
    { label: 'Mar 28', val: 160, x: 490, y: 78 },
    { label: 'Mar 29', val: 145, x: 545, y: 92 },
    { label: 'Mar 30', val: 168, x: 600, y: 74 },
    { label: 'Apr 01', val: 178, x: 645, y: 85, isHighlight: true },
    { label: 'Apr 02', val: 130, x: 710, y: 115 },
    { label: 'Apr 03', val: 140, x: 765, y: 105 },
    { label: 'Apr 04', val: 155, x: 820, y: 95 },
  ];

  // SVG smooth path string generated from control points
  const pathD = "M 50 195 C 90 190, 120 178, 160 170 C 200 162, 230 140, 270 110 C 300 90, 315 125, 340 120 C 360 115, 370 94, 395 92 C 420 90, 430 102, 455 98 C 475 94, 480 80, 505 78 C 530 76, 535 94, 560 92 C 585 90, 595 72, 620 74 C 640 76, 650 90, 675 88 C 700 86, 705 118, 735 115 C 765 112, 790 98, 820 95";
  const areaD = `${pathD} L 820 220 L 50 220 Z`;

  return (
    <div className="admin-card insights-chart-card">
      <div className="chart-header-row">
        <div>
          <h2 className="admin-card-title">Page Insights</h2>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
            Daily visitor traffic & property inquiries volume
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          {/* Timeframe Tabs (Day, Week, Month, Year) */}
          <div className="chart-tabs-group">
            {['Day', 'Week', 'Month', 'Year'].map((tab) => (
              <button
                key={tab}
                className={`chart-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Date Pickers */}
          <div className="chart-date-filters">
            <div className="date-filter-inline">
              <Calendar size={13} />
              <span>Mar 20</span>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>to</span>
            <div className="date-filter-inline">
              <Calendar size={13} />
              <span>Apr 04</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="svg-chart-container">
        <svg
          viewBox="0 0 860 250"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          <line x1="40" y1="40" x2="840" y2="40" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="40" y1="85" x2="840" y2="85" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="40" y1="130" x2="840" y2="130" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="40" y1="175" x2="840" y2="175" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="40" y1="220" x2="840" y2="220" stroke="#e2e8f0" strokeWidth="1" />

          {/* Y-axis Labels */}
          <text x="35" y="44" fill="#94a3b8" fontSize="10" textAnchor="end">250.000</text>
          <text x="35" y="89" fill="#94a3b8" fontSize="10" textAnchor="end">200.000</text>
          <text x="35" y="134" fill="#94a3b8" fontSize="10" textAnchor="end">150.000</text>
          <text x="35" y="179" fill="#94a3b8" fontSize="10" textAnchor="end">100.000</text>
          <text x="35" y="224" fill="#94a3b8" fontSize="10" textAnchor="end">50.000</text>

          {/* Area Fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Smooth Blue Curved Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((pt, i) => (
            <g
              key={i}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() =>
                setHoveredPoint({
                  date: pt.label,
                  value: `${pt.val}k`,
                  x: pt.x,
                  y: pt.y,
                })
              }
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={pt.isHighlight || hoveredPoint.date === pt.label ? 6 : 3.5}
                fill="#ffffff"
                stroke="#2563eb"
                strokeWidth={pt.isHighlight || hoveredPoint.date === pt.label ? 3 : 2}
              />
              {/* X-axis date labels */}
              <text
                x={pt.x}
                y="238"
                fill="#94a3b8"
                fontSize="9.5"
                textAnchor="middle"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Box (Matching Image 1 badge: 01/01 \n • 178) */}
        {hoveredPoint && (
          <div
            className="chart-tooltip-box"
            style={{
              left: `${(hoveredPoint.x / 860) * 100}%`,
              top: `${hoveredPoint.y - 30}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <span className="tooltip-date">{hoveredPoint.date}</span>
            <span className="tooltip-val">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', display: 'inline-block' }}></span>
              {hoveredPoint.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
