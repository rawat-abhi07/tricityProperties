import React from 'react';

export default function Footer({ onCitySelect }) {
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

          {/* Col 2: Mohali & Chandigarh Localities */}
          <div className="footer-col">
            <h4>Mohali & Chandigarh</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onCitySelect && onCitySelect('Mohali')}>Sector 82 (Airport Road)</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Mohali')}>Aerocity & IT City Mohali</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Mohali')}>Sector 70 & 71 Mohali</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Chandigarh')}>Sector 34 & 35 Chandigarh</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Chandigarh')}>Sector 8 & 9 (Northern Sectors)</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('New Chandigarh')}>Eco City, New Chandigarh</button></li>
            </ul>
          </div>

          {/* Col 3: Panchkula & Zirakpur */}
          <div className="footer-col">
            <h4>Panchkula & Zirakpur</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onCitySelect && onCitySelect('Panchkula')}>Sector 20 Panchkula</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Panchkula')}>MDC (Mansadevi Complex)</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Panchkula')}>Sector 4 & 5 Panchkula</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Zirakpur')}>PR7 Airport Ring Road</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Zirakpur')}>VIP Road Zirakpur</button></li>
              <li><button onClick={() => onCitySelect && onCitySelect('Zirakpur')}>Highland Marg & Patiala Highway</button></li>
            </ul>
          </div>

          {/* Col 4: Marketplace Principles */}
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

        {/* Regulatory & Disclaimer note */}
        <div className="footer-disclaimer-box">
          <p>
            <strong>Regulatory & Consumer Transparency:</strong> Tricity Housing acts as an open, verified marketplace connecting buyers with genuine owners, builders, and verified channel partners. All project RERA details (PBRERA & HRERA) are displayed as submitted by listing owners. We advise all buyers to inspect the physical site and title records before transaction.
          </p>
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
