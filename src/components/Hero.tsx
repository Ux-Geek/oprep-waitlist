import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const words = ["Pass", "Practice", "Prep"];

function RotatingWords({ index }: { index: number }) {
  return (
    <motion.span layout className="rotating-container">
      <motion.span layout className="rotating-spacer" aria-hidden="true">
        {words[index]}
      </motion.span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rotating-text"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

interface HeroProps {
  setShowWaitlist: (show: boolean) => void;
}

export default function Hero({ setShowWaitlist }: HeroProps) {
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowWaitlist(false);
    const el = document.getElementById("system");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-badge">
        <div className="hero-badge-inner">Mobile app coming soon</div>
      </div>

      <motion.h1 layout>
        <RotatingWords index={rotatingIndex} />
        <motion.span layout>every exam.</motion.span>
      </motion.h1>

      <p>
        O/Prep helps Nigerian students prepare smarter with guided practice, 
        peer accountability, and personalised exam support.
      </p>

      <div className="hero-actions">
        <button onClick={() => setShowWaitlist(true)}>Join Waitlist</button>
        <a href="#system" onClick={handleExplore}>Explore Dashboard</a>
      </div>
    </section>
  );
}
