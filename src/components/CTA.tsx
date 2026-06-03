import React from "react";
import OPrepBanner from "../assets/O-Prep Banner 1.png";

interface CTAProps {
  setShowWaitlist: (show: boolean) => void;
}

export default function CTA({ setShowWaitlist }: CTAProps) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Small delay so the scroll starts before the navbar unfolds
    setTimeout(() => setShowWaitlist(true), 120);
  };

  return (
    <section className="cta-section" onClick={handleClick}>
      <div className="cta-banner-wrapper">
        <img src={OPrepBanner} alt="The Prep way to prep. Click to join." className="cta-banner-img" />
      </div>
    </section>
  );
}
