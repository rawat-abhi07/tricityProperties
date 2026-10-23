import React from 'react';

export default function Footer({ onCitySelect }) {
  const cities = ['Chandigarh', 'Mohali', 'Panchkula', 'Zirakpur', 'New Chandigarh'];

  return (
    <footer className="site-footer">
      {/* Top Value Banner */}
      <div className="footer-top-strip">
        <div className="footer-strip-inner">
          <div className="strip-item">
            <span className="strip-icon">🔓</span>
            <div>
              <strong>No Account Wall</strong>
              <p>Browse prices, floor plans, and seller contacts freely.</p>
            </div>
          </div>
          <div className="strip-item">
            <span className="strip-icon">🛡️</span>
            <div>
              <strong>100% RERA Verified</strong>
              <p>Only verified residential sales listings across Tricity.</p>
            </div>
          </div>
          <div className="strip-item">
            <span className="strip-icon">🤝</span>
            <div>
              <strong>Direct Seller Connect</strong>
              <p>Connect directly with genuine builders & private owners.</p>
            </div>
          </div>
          <div className="strip-item">
            <span className="strip-icon">🏡</span>
            <div>
              <strong>For Sale Only</strong>
              <p>No PG, rentals, or distracting tenant clutter.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main-content">
        <div className="footer-grid">
          {/* Col 1: Brand & About */}
          <div className="footer-col brand-col">
            <div className="footer-brand-logo">
              <span className="logo-emblem">▲⌂</span>
              <span className="brand-title">Tricity Housing</span>
            </div>
            <p className="footer-desc">
              The premier real estate marketplace specifically built for the Tricity
              region (Chandigarh, Mohali, Panchkula & Zirakpur). Designed with subtle
              elegance, zero login barriers, and 100% transparency for property buyers.
            </p>
            <div className="footer-address">
              <p>📍 Level 4, Plot C-204, Industrial Area Phase 8B, Mohali, Punjab 160071</p>
              <p>📞 Helpline: +91 (0172) 400-8800 • help@tricityhousing.in</p>
            </div>
          </div>

          {/* Col 2: Locations (Same as Header Dropdown) */}
          <div className="footer-col">
            <h4>Locations</h4>
            <ul className="footer-links-list">
              {cities.map((city) => (
                <li key={city}>
                  <button
                    type="button"
                    className="footer-city-link"
                    onClick={() => onCitySelect && onCitySelect(city)}
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Marketplace Policy */}
          <div className="footer-col">
            <h4>Marketplace Policy</h4>
            <ul className="footer-links-list static-links">
              <li><span>✓ 100% Verified Ownership</span></li>
              <li><span>✓ Direct Seller Calling Allowed</span></li>
              <li><span>✓ Free Site Visits with Escort</span></li>
              <li><span>✓ Punjab & Haryana RERA Compliant</span></li>
              <li><span>✓ Strict No-Rental Policy</span></li>
              <li><span>✓ Data Privacy & Zero Spam</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom-row">
          <div className="copyright-text">
            © {new Date().getFullYear()} Tricity Housing Marketplace. Built for Chandigarh, Mohali & Panchkula.
          </div>
          <div className="footer-legal-tags">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Use</span>
            <span>•</span>
            <span>RERA Guidelines</span>
            <span>•</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
