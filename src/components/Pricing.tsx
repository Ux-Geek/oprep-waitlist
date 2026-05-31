import React from "react";

interface PricingProps {
  setShowWaitlist: (show: boolean) => void;
}

export default function Pricing({ setShowWaitlist }: PricingProps) {
  return (
    <section id="pricing" className="pricing-section">
      <p className="section-label">EARLY ACCESS</p>
      <h2>Simple access for serious students.</h2>

      <div className="pricing-grid">
        <div className="price-card">
          <h3>Free</h3>
          <p>Join the waitlist</p>
          <strong>₦0</strong>
          <ul>
            <li>Early launch updates</li>
            <li>Beta access invite</li>
            <li>Community access</li>
          </ul>
          <button onClick={() => setShowWaitlist(true)}>Join Waitlist</button>
        </div>

        <div className="price-card featured">
          <div className="popular">MOST POPULAR</div>
          <h3>Beta</h3>
          <p>For early students</p>
          <strong>Coming soon</strong>
          <ul>
            <li>Practice questions</li>
            <li>Study tracking</li>
            <li>Accountability groups</li>
          </ul>
          <button onClick={() => setShowWaitlist(true)}>Get Early Access</button>
        </div>

        <div className="price-card">
          <h3>Pro</h3>
          <p>For serious exam prep</p>
          <strong>Coming soon</strong>
          <ul>
            <li>Advanced analytics</li>
            <li>Mock exam mode</li>
            <li>Priority support</li>
          </ul>
          <button onClick={() => setShowWaitlist(true)}>Notify Me</button>
        </div>
      </div>
    </section>
  );
}
