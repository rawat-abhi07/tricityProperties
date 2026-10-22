import React from 'react';
import PropertyCard from './PropertyCard';

export default function SavedModal({
  savedProperties,
  onClose,
  onToggleSave,
  onToggleCompare,
  onOpenLeadModal,
  comparedIds,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="saved-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="saved-modal-header">
          <div>
            <h2>Your Shortlisted Homes ({savedProperties.length})</h2>
            <p>Saved locally in your browser with zero account signup required</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {savedProperties.length === 0 ? (
          <div className="empty-saved-box">
            <span className="empty-heart-icon">🤍</span>
            <h3>No Shortlisted Properties Yet</h3>
            <p>Click the heart icon on any property card to save it for easy access later.</p>
            <button className="modal-submit-btn" onClick={onClose}>
              Explore Properties
            </button>
          </div>
        ) : (
          <div className="saved-grid-scroll">
            <div className="figma-cards-grid">
              {savedProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isSaved={true}
                  isCompared={comparedIds.includes(prop.id)}
                  onToggleSave={onToggleSave}
                  onToggleCompare={onToggleCompare}
                  onOpenLeadModal={onOpenLeadModal}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
