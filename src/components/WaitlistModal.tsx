import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy, Share2 } from "lucide-react";

interface WaitlistSession {
  email: string;
  queueNumber: number;
}

interface WaitlistModalProps {
  showWaitlist: boolean;
  setShowWaitlist: (show: boolean) => void;
  isLoaded: boolean;
  email: string;
  setEmail: (email: string) => void;
  submitting: boolean;
  submitted: boolean;
  sessionData: WaitlistSession | null;
  copied: boolean;
  referrals: number;
  handleSubmit: (e: React.FormEvent) => void;
  handleWhatsAppShare: () => void;
  handleCopyLink: () => void;
}

export default function WaitlistModal({
  showWaitlist,
  setShowWaitlist,
  isLoaded,
  email,
  setEmail,
  submitting,
  submitted,
  sessionData,
  copied,
  referrals,
  handleSubmit,
  handleWhatsAppShare,
  handleCopyLink
}: WaitlistModalProps) {
  return (
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
                      <Share2 className="w-3.5 h-3.5" style={{ display: "inline", marginRight: "6px" }} />
                      WhatsApp
                    </button>
                    <button onClick={handleCopyLink} className="btn-share-copy">
                      {copied ? <Check className="w-3.5 h-3.5" style={{ display: "inline", marginRight: "6px" }} /> : <Copy className="w-3.5 h-3.5" style={{ display: "inline", marginRight: "6px" }} />}
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
  );
}
