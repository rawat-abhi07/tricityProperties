import React from 'react';
import { Plus, Clock, ArrowRight, DollarSign } from 'lucide-react';

const STAGES = [
  'New Lead',
  'Viewing Scheduled',
  'Viewing Completed',
  'Under Negotiation',
  'Closed Won',
];

export default function DealsPipeline({ deals = [], onUpdateDealStage, onOpenAddDeal }) {
  // Format Indian Price
  const formatValue = (num) => {
    if (num >= 10000000) return `₹ ${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹ ${(num / 100000).toFixed(1)} Lakhs`;
    return `₹ ${num.toLocaleString('en-IN')}`;
  };

  return (
    <div className="deals-pipeline-page">
      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            Sales Pipeline
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Track prospective property buyers from initial inquiry to closed deed registration
          </p>
        </div>

        <button className="btn-primary-action" onClick={onOpenAddDeal}>
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Kanban Board (Image 2 Style) */}
      <div className="kanban-board-wrapper">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const totalValue = stageDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

          return (
            <div className="kanban-column" key={stage}>
              {/* Column Header */}
              <div className="kanban-col-header">
                <div className="kanban-col-title-row">
                  <span className="kanban-col-name">{stage}</span>
                  <span className="kanban-count-badge">{stageDeals.length}</span>
                </div>
                <div className="kanban-col-sum">{formatValue(totalValue)}</div>
              </div>

              {/* Cards List */}
              <div className="kanban-cards-list">
                {stageDeals.map((deal) => (
                  <div className="deal-card" key={deal.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="deal-client-name">{deal.clientName}</span>
                      <span className="deal-age-pill">
                        <Clock size={11} />
                        <span>{deal.daysInStage || 1}d</span>
                      </span>
                    </div>

                    <span className="deal-property-title">{deal.propertyTitle}</span>

                    <span className="deal-type-tag">{deal.propertyType}</span>

                    <div className="deal-price-row">
                      <span className="deal-price-val">
                        {deal.formattedValue || formatValue(deal.value)}
                      </span>
                    </div>

                    {/* Move to Stage Selector (Matching Image 2) */}
                    <select
                      className="deal-stage-selector"
                      value={deal.stage}
                      onChange={(e) => onUpdateDealStage(deal.id, e.target.value)}
                    >
                      <option value="" disabled>
                        Move to Stage ▾
                      </option>
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '2rem 1rem',
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                    }}
                  >
                    No deals currently in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
