import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  Copy, 
  Share2, 
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OprepMockup from "./assets/Oprep Mockup.png";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface WaitlistSession {
  email: string;
  queueNumber: number;
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sessionData, setSessionData] = useState<WaitlistSession | null>(null);
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState(0);

  const mockupSectionRef = useRef<HTMLDivElement>(null);
  const phoneImageRef = useRef<HTMLImageElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  // Mount delay for cinematic waitlist pop up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    const saved = localStorage.getItem("oprep_waitlist_session_simple");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSessionData(parsed);
        setSubmitted(true);
        setShowWaitlist(false); // If already registered, hide modal initially
      } catch (e) {
        console.error("Failed to restore waitlist session", e);
      }
    }

    const savedRefs = localStorage.getItem("oprep_waitlist_referrals_simple");
    if (savedRefs) {
      setReferrals(parseInt(savedRefs, 10));
    }

    return () => clearTimeout(timer);
  }, []);

  // GSAP animation trigger for the phone mockup reveal in thirds
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pinned Scroll-linked Animation
      mm.add("(min-width: 1024px)", () => {
        // Set initial states
        gsap.set([step2Ref.current, step3Ref.current], { opacity: 0.25 });
        gsap.set(step1Ref.current, { opacity: 1, color: "#0044FF" });
        gsap.set(phoneImageRef.current, {
          clipPath: "inset(0% 0% 100% 0%)"
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

        // Step 1: Reveal first third of phone (Plan)
        tl.to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 66.6% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step1Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")

        // Step 2: Reveal middle third of phone (Practice)
        .to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 33.3% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step2Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")
        .to(step1Ref.current, { opacity: 0.25, color: "#111111", duration: 0.3 }, "<")

        // Step 3: Reveal bottom third of phone (Pass)
        .to(phoneImageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          duration: 1
        })
        .to(step3Ref.current, { opacity: 1, color: "#0044FF", duration: 0.3 }, "<")
        .to(step2Ref.current, { opacity: 0.25, color: "#111111", duration: 0.3 }, "<");
      });

      // Mobile: Standard scroll-triggered opacity fades
      mm.add("(max-width: 1023px)", () => {
        gsap.set(phoneImageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)"
        });

        const steps = [step1Ref, step2Ref, step3Ref];
        steps.forEach((ref) => {
          if (ref.current) {
            gsap.fromTo(ref.current, 
              { opacity: 0.3, y: 15 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: ref.current,
                  start: "top 80%",
                  end: "bottom 60%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      });
    }, mockupSectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setSubmitting(true);

    setTimeout(() => {
      const baseQueue = 2480; 
      const randomOffset = Math.floor(Math.random() * 19) + 1;
      const finalQueue = baseQueue + randomOffset;

      const newSession: WaitlistSession = {
        email: email.trim(),
        queueNumber: finalQueue
      };

      localStorage.setItem("oprep_waitlist_session_simple", JSON.stringify(newSession));
      setSessionData(newSession);
      setSubmitted(true);
      setSubmitting(false);
    }, 900);
  };

  const handleCopyLink = () => {
    const referralCode = sessionData ? sessionData.queueNumber : "beta";
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (referrals < 3) {
      const nextRefs = referrals + 1;
      setReferrals(nextRefs);
      localStorage.setItem("oprep_waitlist_referrals_simple", nextRefs.toString());
      
      if (sessionData) {
        const updated = {
          ...sessionData,
          queueNumber: Math.max(84, sessionData.queueNumber - Math.floor(Math.random() * 210) - 240)
        };
        setSessionData(updated);
        localStorage.setItem("oprep_waitlist_session_simple", JSON.stringify(updated));
      }
    }
  };

  const handleWhatsAppShare = () => {
    const referralCode = sessionData ? sessionData.queueNumber : "beta";
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;
    const text = encodeURIComponent(
      `Finally, an exam prep app designed for Nigerian students that actually gets us! Built properly for JAMB, WAEC, IELTS & SAT. Join the early access queue with me: ${referralLink} 🚀`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowWaitlist(false);
    const el = document.getElementById("system");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="page">
      {/* Waitlist Modal First Screen overlay */}
      <AnimatePresence>
        {showWaitlist && isLoaded && (
          <div className="modal-layer">
            <motion.section 
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="waitlist-card"
            >
              {!submitted ? (
                <>
                  <div className="brand-pill">O/PREP EARLY ACCESS</div>

                  <div className="waitlist-copy">
                    <h1>A cracked, better way to study.</h1>
                    <p>Enter your email for early access.</p>
                  </div>

                  <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      required
                      placeholder="buildpcbs@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit" disabled={submitting}>
                      {submitting ? "Joining..." : "Join Waitlist"}
                    </button>
                  </form>

                  <div className="explore-dismiss" style={{ textAlign: "center", marginTop: "-4px" }}>
                    <span 
                      onClick={() => setShowWaitlist(false)} 
                      style={{ fontSize: "12px", color: "var(--color-blue-brand)", cursor: "pointer", fontWeight: 600 }}
                    >
                      Explore Preview First →
                    </span>
                  </div>
                </>
              ) : (
                <div className="success-state">
                  <div className="brand-pill">YOU’RE IN</div>
                  
                  <div className="waitlist-copy">
                    <h1>Welcome to O/Prep.</h1>
                    <p>We’ll send early access to your email when the beta opens.</p>
                  </div>

                  <div className="ticket-wrapper">
                    <div className="ticket-header">
                      <span>O/PREP BETA TICKET</span>
                      <span style={{ color: "var(--color-success-brand)", fontWeight: 700 }}>✓ VERIFIED</span>
                    </div>
                    <div className="ticket-row">
                      <span className="ticket-label">Email</span>
                      <span className="ticket-value" style={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {sessionData?.email}
                      </span>
                    </div>
                    <div className="ticket-row">
                      <span className="ticket-label">Queue Position</span>
                      <span className="ticket-value highlight">#{sessionData?.queueNumber}</span>
                    </div>
                  </div>

                  <div className="viral-sharing">
                    <p className="viral-title">Want to skip the line?</p>
                    <p className="viral-text">Invite 3 friends to get instant beta priority.</p>
                    
                    <div className="progress-bar-wrapper">
                      <div className="progress-text">
                        <span>{referrals} of 3 friends invited</span>
                        <span style={{ fontWeight: 600, color: "var(--color-blue-brand)" }}>
                          {referrals === 0 && "-180 spots next"}
                          {referrals === 1 && "-240 spots next"}
                          {referrals === 2 && "-400 spots next"}
                          {referrals >= 3 && "VIP ACCESS UNLOCKED"}
                        </span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${Math.min(100, (referrals / 3) * 100)}%` }} />
                      </div>
                    </div>

                    <div className="share-buttons">
                      <button onClick={handleWhatsAppShare} className="btn-share-whatsapp">
                        <Share2 className="w-3.5 h-3.5" />
                        WhatsApp
                      </button>
                      <button onClick={handleCopyLink} className="btn-share-copy">
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy Link"}
                      </button>
                    </div>
                  </div>

                  <button onClick={() => setShowWaitlist(false)} className="btn-primary">
                    Explore Preview
                  </button>
                </div>
              )}
            </motion.section>
          </div>
        )}
      </AnimatePresence>

      {/* Nav Section */}
      <nav className="nav">
        <div className="logo-container">
          <div className="logo-badge">O</div>
          <span className="logo-text">O/Prep</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#system">The System</a>
          <a href="#pricing">Pricing</a>
        </div>

        <button onClick={() => setShowWaitlist(true)}>Join Waitlist</button>
      </nav>

      {/* Main content wrapper with blur class when waitlist overlay is visible */}
      <div className={showWaitlist ? "main-content blurred" : "main-content"}>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">Built for ambitious exam takers</div>

          <h1>
            Practice every exam. <br />
            Pass with structure.
          </h1>

          <p>
            O/Prep helps Nigerian students prepare smarter with guided practice, 
            peer accountability, and personalised exam support.
          </p>

          <div className="hero-actions">
            <button onClick={() => setShowWaitlist(true)}>Join Waitlist</button>
            <a href="#system" onClick={handleExplore}>Explore Dashboard</a>
          </div>
        </section>

        {/* GSAP Phone Mockup Reveal Section */}
        <section id="features" ref={mockupSectionRef} className="mockup-reveal-section">
          <div className="mockup-sticky-container">
            <div className="mockup-container">
              
              <div className="mockup-text-col">
                <div ref={step1Ref} className="mockup-step">
                  <span className="step-number">STEP 01</span>
                  <h3>Plan with structure.</h3>
                  <p>Define your target score, exam date, and daily study windows. O/Prep builds a custom plan tailored to your timeline.</p>
                </div>
                <div ref={step2Ref} className="mockup-step">
                  <span className="step-number">STEP 02</span>
                  <h3>Practice every exam.</h3>
                  <p>Access thousands of real exam questions with comprehensive solutions. Learn by doing, not just reading.</p>
                </div>
                <div ref={step3Ref} className="mockup-step">
                  <span className="step-number">STEP 03</span>
                  <h3>Review and improve.</h3>
                  <p>Pinpoint exactly where you fail, track your weak concepts, and study smarter. Reach your target pass rate before test day.</p>
                </div>
              </div>

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

        {/* The Prep System */}
        <section id="system" className="studio-section">
          <p className="section-label">THE PREP SYSTEM</p>
          <h2>Three tools, one study flow.</h2>

          <div className="tool-grid">
            <div className="tool-card">
              <span>01</span>
              <h3>Practice Bank</h3>
              <p>Exam-style questions built around real prep behaviour.</p>
            </div>

            <div className="tool-card">
              <span>02</span>
              <h3>Smart Study Plan</h3>
              <p>Turn your exam date into a clear daily preparation plan.</p>
            </div>

            <div className="tool-card">
              <span>03</span>
              <h3>Peer Accountability</h3>
              <p>Stay consistent with streaks, groups, and visible progress.</p>
            </div>
          </div>
        </section>

        {/* Pricing / Access Tiers */}
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

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">O/Prep</div>
            <p>© 2026 O/Prep. Built for ambitious exam takers.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
