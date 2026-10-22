import React from 'react';

export default function Localities({ onSelectLocality }) {
  const localitiesData = [
    {
      id: 'mohali-airport',
      name: 'Airport Road & Sector 82',
      city: 'Mohali',
      badge: 'High Growth Corridor',
      avgPrice: '₹ 6,800 / sq.ft.',
      growth: '+14% YoY',
      description: 'The premier luxury stretch of Mohali connecting Chandigarh directly to the Shaheed Bhagat Singh International Airport. Features premium highrises, retail avenues, and IT parks.',
      keyLandmarks: ['Sector 82 JLPL', 'Airport Ring Road', 'Aerocity Junction', 'Bestech Square Mall'],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'chd-sec34',
      name: 'Sector 34 & Central Sectors',
      city: 'Chandigarh',
      badge: 'Heritage & Elite Living',
      avgPrice: '₹ 9,800 / sq.ft.',
      growth: '+8% YoY',
      description: 'The golden central heart of Chandigarh with spacious wide boulevards, lush parks, prestigious educational hubs, and limited-edition luxury independent floors.',
      keyLandmarks: ['Sector 34 Commercial Sub-City Centre', 'Piccadily Square', 'Aroma Chowk', 'Sector 35 Dining Corridor'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'pkl-mdc',
      name: 'MDC (Mansa Devi Complex) & Sec 20',
      city: 'Panchkula',
      badge: 'Scenic Shivalik Views',
      avgPrice: '₹ 7,500 / sq.ft.',
      growth: '+11% YoY',
      description: 'Peaceful, green foothills living with direct view of the Shivalik range, Panchkula Golf Course, and seamless signal-free access into Chandigarh.',
      keyLandmarks: ['Panchkula Golf Club', 'Mata Mansa Devi Shrine', 'Sector 20 Market', 'Tau Devi Lal Stadium'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'zrk-pr7',
      name: 'PR-7 Airport Ring Road',
      city: 'Zirakpur',
      badge: 'Top Gated Enclaves',
      avgPrice: '₹ 5,400 / sq.ft.',
      growth: '+16% YoY',
      description: 'A booming 200-ft wide bypass connecting Zirakpur to Mohali Airport Road. Flanked by modern luxury highrises, international dining chains, and clubhouse gated communities.',
      keyLandmarks: ['PR7 Master Ring Road', 'Aerocity Mohali boundary', 'McDonalds & Starbucks Hub', 'VIP Road Junction'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'nchd-mullanpur',
      name: 'Eco City 1 & 2 (New Chandigarh)',
      city: 'New Chandigarh',
      badge: 'Smart Planned City',
      avgPrice: '₹ 8,200 / sq.ft.',
      growth: '+18% YoY',
      description: 'A planned eco-friendly township with low-density residential sectors, MediCity, and EduCity. Ideal for buyers seeking tranquil Spanish villas and gated plots.',
      keyLandmarks: ['Tata Memorial Hospital (MediCity)', 'Omaxe New Chandigarh', 'DLF Hyde Park', 'Botanical Gardens'],
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'mohali-aerocity',
      name: 'GMADA Aerocity & IT City',
      city: 'Mohali',
      badge: 'GMADA Approved',
      avgPrice: '₹ 7,400 / sq.ft.',
      growth: '+15% YoY',
      description: '1000-acre masterplanned urban corridor housing tech campuses (Infosys, HCL), international universities, and GMADA residential plots.',
      keyLandmarks: ['Infosys Mohali Campus', 'Amity & Plaksha Universities', 'Blocks A to J Aerocity', 'Airport Expressway'],
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80',
    },
  ];

  return (
    <div className="section-container page-top-padding">
      <div className="section-head-center">
        <span className="subtle-kicker">Regional Guide</span>
        <h2>Tricity Locality Intelligence</h2>
        <p>In-depth pricing benchmarks, growth data, and verified homes across Chandigarh, Mohali & Panchkula</p>
      </div>

      <div className="locality-full-grid">
        {localitiesData.map((loc) => (
          <div key={loc.id} className="locality-detail-card">
            <div className="loc-card-img-wrap">
              <img src={loc.image} alt={loc.name} />
              <span className="loc-city-pill">{loc.city}</span>
              <span className="loc-growth-pill">{loc.growth}</span>
            </div>

            <div className="loc-card-body">
              <div className="loc-card-header">
                <div>
                  <span className="loc-type-label">{loc.badge}</span>
                  <h3>{loc.name}</h3>
                </div>
                <div className="loc-price-tag">
                  <span className="price-small-lbl">Avg. Rate</span>
                  <strong>{loc.avgPrice}</strong>
                </div>
              </div>

              <p className="loc-card-desc">{loc.description}</p>

              <div className="loc-landmarks-box">
                <span className="lm-label">Key Landmarks:</span>
                <div className="lm-tags">
                  {loc.keyLandmarks.map((lm, i) => (
                    <span key={i} className="lm-tag">📍 {lm}</span>
                  ))}
                </div>
              </div>

              <button
                className="loc-explore-btn"
                onClick={() => onSelectLocality(loc.name, loc.city)}
              >
                View Available Homes in {loc.city} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
