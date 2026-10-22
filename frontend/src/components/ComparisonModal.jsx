import React from 'react';

export default function ComparisonModal({ items, onRemove, onClose, onSelectLead }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="comparison-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comp-modal-header">
          <div>
            <h2>Side-by-Side Property Comparison</h2>
            <p>Comparing {items.length} verified listings in Tricity (No login required)</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="comp-table-container">
          <table className="comp-table">
            <thead>
              <tr>
                <th className="feature-col">Feature</th>
                {items.map((item) => (
                  <th key={item.id} className="prop-col">
                    <div className="comp-card-top">
                      <img src={item.image} alt={item.title} className="comp-thumb" />
                      <button 
                        className="comp-remove-pill" 
                        onClick={() => onRemove(item.id)}
                        title="Remove from comparison"
                      >
                        Remove ✕
                      </button>
                      <h4 className="comp-prop-title">{item.title}</h4>
                      <div className="comp-prop-price">{item.formattedPrice}</div>
                      <div className="comp-prop-sqft">{item.pricePerSqFt}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-label">Location</td>
                {items.map((item) => (
                  <td key={item.id}>{item.location}</td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Configuration</td>
                {items.map((item) => (
                  <td key={item.id}><strong>{item.bhk}</strong> ({item.bedrooms} Beds, {item.bathrooms} Baths)</td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Super Area</td>
                {items.map((item) => (
                  <td key={item.id}>{item.area}</td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Carpet Area</td>
                {items.map((item) => (
                  <td key={item.id}>{item.carpetArea || 'N/A'}</td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Property Type</td>
                {items.map((item) => (
                  <td key={item.id}>{item.type}</td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Possession Status</td>
                {items.map((item) => (
                  <td key={item.id}>
                    <span className="status-pill">{item.possessionStatus}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">RERA & Verification</td>
                {items.map((item) => (
                  <td key={item.id}>
                    <span className="rera-verified-pill">✓ {item.reraNumber}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Listing Source</td>
                {items.map((item) => (
                  <td key={item.id}>{item.listingSource}</td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Action</td>
                {items.map((item) => (
                  <td key={item.id}>
                    <button
                      className="comp-action-btn"
                      onClick={() => {
                        onClose();
                        onSelectLead(item, 'visit');
                      }}
                    >
                      Schedule Visit
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
