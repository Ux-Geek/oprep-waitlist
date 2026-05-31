import React from "react";
import Logo from "./Logo";

interface NavbarProps {
  setShowWaitlist: (show: boolean) => void;
}

export default function Navbar({ setShowWaitlist }: NavbarProps) {
  return (
    <nav className="nav">
      <div className="logo-container">
        <Logo className="nav-logo" />
      </div>

      <button onClick={() => setShowWaitlist(true)}>Join Waitlist</button>
    </nav>
  );
}
