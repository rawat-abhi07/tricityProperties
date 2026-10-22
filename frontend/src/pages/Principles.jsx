import React from 'react';

export default function Principles({ onBrowseHomes }) {
  return (
    <div className="section-container page-top-padding">
      <div className="principles-manifesto-header">
        <span className="subtle-kicker">04 Product Principles</span>
        <h1>Why We Built Tricity Housing Differently</h1>
        <p className="manifesto-lead">
          Buying a home in Chandigarh, Mohali, or Panchkula is one of the most significant decisions in life.
          We eliminated account walls, fake broker fees, and spammy lead traps.
        </p>
      </div>

      <div className="manifesto-timeline">
        {/* Principle 01 */}
        <div className="manifesto-card">
          <div className="manifesto-marker">01</div>
          <div className="manifesto-content">
            <div className="manifesto-badge">Principle 1</div>
            <h2>No Buyer Account Wall</h2>
            <p className="manifesto-tagline">
              Browsing, calling, site-visiting and comparison are available to everyone.
            </p>
            <p className="manifesto-text">
              We never hide floor plans, photos, pricing breakdown, or seller contact numbers behind
              forced sign-up walls or mandatory login prompts. Any buyer can explore, compare properties,
              and connect with sellers openly.
            </p>
            <div className="manifesto-features">
              <span>✓ Open floor plan access</span>
              <span>✓ Unrestricted side-by-side comparison</span>
              <span>✓ One-click direct seller calling</span>
            </div>
          </div>
        </div>

        {/* Principle 02 */}
        <div className="manifesto-card">
          <div className="manifesto-marker">02</div>
          <div className="manifesto-content">
            <div className="manifesto-badge">Principle 2</div>
            <h2>Contextual Lead Capture</h2>
            <p className="manifesto-tagline">
              Name + Indian mobile number, consent, and property context attached automatically.
            </p>
            <p className="manifesto-text">
              When you want to book a physical site visit or request a callback, you never have to re-explain
              which property or unit you were viewing. The system auto-attaches the listing, RERA credentials,
              and your preferred time slot into a clean, single-screen interaction.
            </p>
            <div className="manifesto-features">
              <span>✓ Instant Indian phone validation (+91)</span>
              <span>✓ Explicit anti-spam consent</span>
              <span>✓ Auto-attached property & developer credentials</span>
            </div>
          </div>
        </div>

        {/* Principle 03 */}
        <div className="manifesto-card">
          <div className="manifesto-marker">03</div>
          <div className="manifesto-content">
            <div className="manifesto-badge">Principle 3</div>
            <h2>Prominent Trust Signals</h2>
            <p className="manifesto-tagline">
              Verification, RERA when applicable, listing source and possession status.
            </p>
            <p className="manifesto-text">
              Every listing prominently displays verified data: whether it comes directly from the title
              owner or an authorized developer, its government RERA registration number (PBRERA or HRERA),
              and an unvarnished possession timeline (Ready to Move vs Construction milestone).
            </p>
            <div className="manifesto-features">
              <span>✓ PBRERA / HRERA Registration checks</span>
              <span>✓ Direct Owner vs Developer transparency</span>
              <span>✓ Genuine sq.ft. rate benchmarks</span>
            </div>
          </div>
        </div>

        {/* Principle 04 */}
        <div className="manifesto-card">
          <div className="manifesto-marker">04</div>
          <div className="manifesto-content">
            <div className="manifesto-badge">Principle 4</div>
            <h2>All Listings For Sale Only</h2>
            <p className="manifesto-tagline">
              No rental, PG, or tenant workflows cluttering your discovery.
            </p>
            <p className="manifesto-text">
              Most generic portals mix temporary student rentals, paying guest accommodations, and
              commercial leases together. Tricity Housing is custom-built 100% for residential sales,
              freehold builder floors, luxury villas, and vetted plots.
            </p>
            <div className="manifesto-features">
              <span>✓ 100% Capital ownership focus</span>
              <span>✓ Clean freehold registry guidance</span>
              <span>✓ Zero distracting PG/flatmate listings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="manifesto-cta-box">
        <h3>Ready to experience a clean, transparent marketplace?</h3>
        <p>Explore all verified homes currently available across Chandigarh, Mohali, and Panchkula.</p>
        <button className="manifesto-cta-btn" onClick={onBrowseHomes}>
          Browse Verified Tricity Homes Now →
        </button>
      </div>
    </div>
  );
}
