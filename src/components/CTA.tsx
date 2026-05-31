import React from "react";
import OPrepBanner from "../assets/O-Prep Banner 1.png";

interface CTAProps {
  setShowWaitlist: (show: boolean) => void;
}

export default function CTA({ setShowWaitlist }: CTAProps) {
  return (
    <section className="cta-section" onClick={() => setShowWaitlist(true)}>
      <div className="cta-banner-wrapper">
        <img src={OPrepBanner} alt="The Prep way to prep. Click to join." className="cta-banner-img" />
      </div>
    </section>
  );
}
