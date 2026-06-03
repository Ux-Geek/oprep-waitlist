import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MockupReveal from "./components/MockupReveal";
import PrepSystem from "./components/PrepSystem";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

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

  return (
    <main className="page">
      {/* Nav Section */}
      <Navbar
        showWaitlist={showWaitlist}
        setShowWaitlist={setShowWaitlist}
        isLoaded={isLoaded}
        email={email}
        setEmail={setEmail}
        submitting={submitting}
        submitted={submitted}
        sessionData={sessionData}
        copied={copied}
        referrals={referrals}
        handleSubmit={handleSubmit}
        handleWhatsAppShare={handleWhatsAppShare}
        handleCopyLink={handleCopyLink}
      />

      {/* Main content wrapper with blur class when waitlist overlay is visible */}
      <div className={showWaitlist ? "main-content blurred" : "main-content"}>
        {/* Hero Section */}
        <Hero setShowWaitlist={setShowWaitlist} />

        {/* GSAP Phone Mockup Reveal Section */}
        <MockupReveal isLoaded={isLoaded} />

        {/* The Prep System */}
        <PrepSystem />

        {/* Pricing / Access Tiers */}
        <Pricing setShowWaitlist={setShowWaitlist} />

        {/* CTA Section */}
        <CTA setShowWaitlist={setShowWaitlist} />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
