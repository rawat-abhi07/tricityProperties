import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>🏡 EstateHub</h3>
          <p>Find your dream property with the easiest modern real estate platform.</p>
        </div>
        <div className="footer-meta">
          <p>© {new Date().getFullYear()} EstateHub. All rights reserved.</p>
          <p className="tech-badge">Built with React & Node.js (Express)</p>
        </div>
      </div>
    </footer>
  );
}
