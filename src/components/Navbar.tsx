import React from "react";
import Logo from "./Logo";
import { motion } from "motion/react";

interface NavbarProps {
  setShowWaitlist: (show: boolean) => void;
  showWaitlist: boolean;
}

export default function Navbar({ setShowWaitlist, showWaitlist }: NavbarProps) {
  return (
    <nav className="nav">
      <div className="logo-container">
        <Logo className="nav-logo" />
      </div>

      {!showWaitlist ? (
        <motion.button 
          layoutId="waitlist-card-box"
          onClick={() => setShowWaitlist(true)}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Join Waitlist
        </motion.button>
      ) : (
        <div style={{ width: 98, height: 38 }} />
      )}
    </nav>
  );
}
