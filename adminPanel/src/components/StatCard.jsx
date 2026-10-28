import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  icon,
  variant = 'blue',
  isNavy = false,
}) {
  return (
    <div className={`stat-card ${isNavy ? 'navy-highlight' : ''}`}>
      <div className="stat-card-left">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-value">{value}</div>
        {subtext && <span className="stat-card-sub">{subtext}</span>}
      </div>
      <div className={`stat-icon-wrapper ${variant}`}>
        {icon}
      </div>
    </div>
  );
}
