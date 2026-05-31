import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OprepMockup from "../assets/Oprep Mockup.png";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface MockupRevealProps {
  isLoaded: boolean;
}

export default function MockupReveal({ isLoaded }: MockupRevealProps) {
  const mockupSectionRef = useRef<HTMLDivElement>(null);
  const phoneImageRef = useRef<HTMLImageElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pinned Scroll-linked Animation
      mm.add("(min-width: 1024px)", () => {
        gsap.set([step1Ref.current, step2Ref.current, step3Ref.current], { opacity: 0 });
        gsap.set(phoneImageRef.current, {
          clipPath: "inset(0% 0% 75% 0%)"
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mockupSectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1
          }
        });

        tl.to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 50% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step1Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")

        .to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 25% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step2Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")
        .to(step1Ref.current, { opacity: 0.25, color: "#111111", duration: 0.3 }, "<")

        .to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step3Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")
        .to(step2Ref.current, { opacity: 0.25, color: "#111111", duration: 0.3 }, "<");
      });

      // Mobile: Pinned Scroll-linked Animation (mockup stacked before list)
      mm.add("(max-width: 1023px)", () => {
        gsap.set([step1Ref.current, step2Ref.current, step3Ref.current], { opacity: 0 });
        gsap.set(phoneImageRef.current, {
          clipPath: "inset(0% 0% 75% 0%)"
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mockupSectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1
          }
        });

        tl.to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 50% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step1Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")

        .to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 25% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step2Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")
        .to(step1Ref.current, { opacity: 0, duration: 0.3 }, "<")

        .to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step3Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")
        .to(step2Ref.current, { opacity: 0, duration: 0.3 }, "<");
      });
    }, mockupSectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section id="features" ref={mockupSectionRef} className="mockup-reveal-section">
      <div className="mockup-sticky-container">
        <div className="mockup-container">
          
          {/* Left Column of Steps */}
          <div className="mockup-text-col-left">
            <div ref={step1Ref} className="mockup-step">
              <span className="step-number">STEP 01</span>
              <h3>Plan with structure.</h3>
              <p>Define your target score, exam date, and daily study windows. O/Prep builds a custom plan tailored to your timeline.</p>
            </div>
            <div ref={step3Ref} className="mockup-step">
              <span className="step-number">STEP 03</span>
              <h3>Review and improve.</h3>
              <p>Pinpoint exactly where you fail, track your weak concepts, and study smarter. Reach your target pass rate before test day.</p>
            </div>
          </div>

          {/* Empty Middle Spacer for centered phone layout on Grid */}
          <div className="mockup-middle-spacer" style={{ pointerEvents: "none" }}></div>

          {/* Right Column of Steps */}
          <div className="mockup-text-col-right">
            <div ref={step2Ref} className="mockup-step">
              <span className="step-number">STEP 02</span>
              <h3>Practice every exam.</h3>
              <p>Access thousands of real exam questions with comprehensive solutions. Learn by doing, not just reading.</p>
            </div>
          </div>

          {/* Absolute Centered Phone */}
          <div className="mockup-phone-col">
            <div className="phone-wrapper">
              <img 
                ref={phoneImageRef} 
                src={OprepMockup} 
                alt="O/Prep App Interface" 
                className="phone-image-main" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
