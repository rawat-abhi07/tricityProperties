import React from 'react';

export default function ComparisonDrawer({ items, onOpenComparison, onClear, onRemoveItem }) {
  if (!items || items.length === 0) return null;

  return (
    <aside className="comparison-drawer" aria-label="Selected properties for comparison">
      <div className="drawer-inner">
        <div className="drawer-left">
          <span className="drawer-badge">{items.length} / 3</span>
          <div className="drawer-text">
            <strong>Comparing Properties</strong>
            <p className="drawer-sub">Select up to 3 listings to compare specs side by side</p>
          </div>
        </div>

        <div className="drawer-items">
          {items.map((item) => (
            <div key={item.id} className="drawer-thumb-card">
              <img src={item.image} alt={item.title} />
              <div className="drawer-thumb-info">
                <span className="d-price">{item.formattedPrice}</span>
                <span className="d-title">{item.bhk}</span>
              </div>
              <button 
                className="drawer-remove-btn"
                onClick={() => onRemoveItem(item.id)}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="drawer-actions">
          <button className="drawer-clear-btn" onClick={onClear}>
            Clear
          </button>
          <button className="drawer-compare-btn" onClick={onOpenComparison}>
            Compare Now →
          </button>
        </div>
      </div>
    </aside>
  );
}
