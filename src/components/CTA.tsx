import React from "react";
import Logo from "./Logo";

interface CTAProps {
  setShowWaitlist: (show: boolean) => void;
}

export default function CTA({ setShowWaitlist }: CTAProps) {
  return (
    <section className="cta-section" onClick={() => setShowWaitlist(true)}>
      <div className="cta-banner-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '120px 20px', background: 'var(--color-bg-alt)' }}>
        <Logo className="cta-big-wordmark" />
      </div>
    </section>
  );
}
