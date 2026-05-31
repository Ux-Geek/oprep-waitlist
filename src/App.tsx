/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  Copy, 
  Share2, 
  Sparkles, 
  Users, 
  ArrowRight, 
  Info,
  Lock,
  Compass,
  CheckCircle2,
  BookmarkCheck
} from "lucide-react";

interface WaitlistSession {
  email: string;
  queueNumber: number;
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sessionData, setSessionData] = useState<WaitlistSession | null>(null);
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState(0);

  // Cinematic 0.4s delay on mount before mounting the card view
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    // Retrieve existing waitlist info if any
    const saved = localStorage.getItem("oprep_waitlist_session_simple");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSessionData(parsed);
        setSubmitted(true);
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

    // Dynamic, premium submission timer
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

    // Micro-interaction: simulate friend referral to move up queue!
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
    <div id="landing-app-wrapper" className="min-h-screen bg-white relative flex flex-col justify-between items-center overflow-x-hidden antialiased selection:bg-[#EEF3FF] selection:text-[#0044FF]">
      
      {/* Background Graphic System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft elegant top radial blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-[#0044FF]/[0.08] to-transparent rounded-full blur-3xl" />
        {/* Subtle dot coordinates pattern */}
        <div className="absolute inset-0 dot-bg opacity-[0.25]" />
      </div>

      {/* Top Header - Logo and Segment Description */}
      <header id="header-container" className="w-full max-w-lg mx-auto px-6 pt-16 z-10 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-7 h-7 rounded-lg bg-[#0044FF] flex items-center justify-center text-white font-display font-black text-base tracking-wider shadow-[0_2px_8px_rgba(0,68,255,0.25)]">
            O
          </div>
          <span className="font-display font-semibold text-lg leading-none tracking-tight text-[#1A1A1A]">
            OPrep
          </span>
          <span className="bg-[#EEF3FF] text-[#0044FF] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Beta
          </span>
        </div>
        
        <p className="font-sans text-[12px] text-text-brand-tertiary font-medium uppercase tracking-[0.06em]">
          Built for Nigerian students.
        </p>
      </header>

      {/* Main Container - Vertically Centered Invites */}
      <main className="w-full flex-grow flex items-center justify-center py-8 px-4 z-10">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              key="waitlist-card"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[370px] bg-white border border-[#ECECEC] rounded-[24px] p-7 shadow-[0px_20px_60px_rgba(0,0,0,0.06)] flex flex-col justify-between overflow-hidden relative"
              style={{ minHeight: "430px" }}
            >
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full justify-between flex-grow"
                  >
                    <div>
                      {/* Beta Pill */}
                      <div className="flex mb-4">
                        <span className="bg-[#EEF3FF] text-[#0044FF] h-[28px] px-3 py-1 text-[12px] font-semibold rounded-full flex items-center justify-center uppercase tracking-wider">
                          EARLY ACCESS
                        </span>
                      </div>

                      {/* Headline with DM Sans & Tight tracking */}
                      <h1 className="font-display font-medium text-[34px] text-[#111111] leading-[108%] tracking-[-0.05em] mb-3">
                        The study app Nigerian students actually deserve.
                      </h1>

                      {/* Supporting text */}
                      <p className="font-sans text-[14px] leading-[145%] text-[#666666] mb-6">
                        Join the waitlist and get early access before public launch.
                      </p>
                    </div>

                    {/* Submit Form Block */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          id="input-waitlist-email"
                          required
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-[52px] bg-[#F7F7F8] border border-transparent focus:border-[#0044FF] rounded-full px-[18px] font-sans text-sm text-[#1A1A1A] transition-all bg-clip-padding placeholder-[#A1A1A1] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={submitting}
                        className="w-full h-[52px] bg-[#0044FF] hover:bg-[#0035CC] text-white font-sans text-[14px] font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-colors duration-150 shadow-[0_4px_14px_rgba(0,68,255,0.2)] disabled:opacity-80"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Verifying...
                          </span>
                        ) : (
                          <>
                            Get Early Access
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </form>

                    {/* Social proof and micro disclaimer inside the card */}
                    <div className="mt-5 space-y-2 text-center">
                      <p className="font-sans text-[12px] text-[#666666] font-medium">
                        Students from Lagos, Abuja & London already signed up.
                      </p>
                      <p className="font-sans text-[10px] text-[#A1A1A1]">
                        No spam. Early access only.
                      </p>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full justify-between flex-grow text-center"
                  >
                    <div>
                      {/* Animated Success Badge */}
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center text-[#0044FF] shadow-sm">
                          <Check className="w-6 h-6 stroke-[3]" />
                        </div>
                      </div>

                      <h2 className="font-display font-medium text-[28px] text-[#111111] leading-[110%] tracking-[-0.04em] mb-1.5">
                        You're in.
                      </h2>
                      <p className="font-sans text-[13.5px] text-[#666666] leading-[145%] px-1">
                        We'll text or email you when OPrep launches.
                      </p>

                      {/* Digital Stakeholder Ticket Pass */}
                      <div className="border border-[#E8E8E8] rounded-[20px] bg-[#F7F7F8] p-4.5 my-5 text-left relative overflow-hidden">
                        <div className="absolute top-[-25px] right-[-25px] w-20 h-20 bg-[#0044FF]/5 rounded-full blur-md" />
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#1A1A1A] tracking-wider uppercase">
                              OPrep Pass
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#14AE5C] animate-pulse" />
                          </div>
                          <span className="font-sans text-[10px] text-[#0044FF] font-semibold bg-[#EEF3FF] px-2 py-0.5 rounded-full">
                            VERIFIED
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="flex justify-between border-b border-[#E8E8E8]/70 pb-2">
                            <div>
                              <span className="block text-[9px] text-[#A1A1A1] uppercase tracking-wider">
                                REGISTERED EMAIL
                              </span>
                              <span className="block font-sans text-[12px] font-medium text-[#1A1A1A] truncate max-w-[170px]">
                                {sessionData?.email || "student@domain.com"}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="block text-[9px] text-[#A1A1A1] uppercase tracking-wider">
                                STATUS
                              </span>
                              <span className="block font-sans text-[11px] font-bold text-[#0044FF]">
                                BETA PRIORITIZED
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className="block text-[9px] text-[#A1A1A1] uppercase tracking-wider">
                                ACCESS CHANNEL
                              </span>
                              <span className="block font-sans text-[11.5px] font-medium text-[#1A1A1A]">
                                WAEC / JAMB / IELTS
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="block text-[9px] text-[#A1A1A1] uppercase tracking-wider">
                                QUEUE RANK
                              </span>
                              <span className="block font-sans text-[18px] font-black text-[#0044FF] tracking-tight">
                                #{sessionData?.queueNumber || "2,482"}
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Viral Friend Referrals Section */}
                    <div className="border-t border-[#ECECEC] pt-4.5 space-y-3.5">
                      <div>
                        <h4 className="font-display font-semibold text-[14px] text-[#1A1A1A] tracking-tight">
                          Want earlier access?
                        </h4>
                        <p className="font-sans text-[11.5px] text-[#666666] leading-[140%] mt-0.5">
                          Invite 3 friends to move up the waitlist instantly.
                        </p>
                      </div>

                      {/* Milestones dynamic visual progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-sans text-[#666666]">
                          <span>{referrals} of 3 friends invited</span>
                          <span className="font-medium text-[#0044FF]">
                            {referrals === 0 && "Next jump: -180 spots"}
                            {referrals === 1 && "Next jump: -240 spots"}
                            {referrals === 2 && "Final jump: Immediate access"}
                            {referrals >= 3 && "VIP Priority Unlocked"}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(100, (referrals / 3) * 100)}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-[#0044FF] rounded-full"
                          />
                        </div>
                      </div>

                      {/* Viral Sharing Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={handleWhatsAppShare}
                          className="h-10 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans text-[12px] font-medium shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="h-10 rounded-full bg-[#F7F7F8] border border-[#E8E8E8] text-[#1A1A1A] hover:bg-[#EEF3FF] hover:border-[#DEEAFF] hover:text-[#0044FF] font-sans text-[12px] font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#14AE5C]" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Link
                            </>
                          )}
                        </button>
                      </div>

                      <span className="block font-sans text-[10px] text-[#A1A1A1]">
                        1,200+ students from Lagos already skipped the queue using referrals.
                      </span>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Aesthetic layout helper - Tiny floating feature scopes fading gracefully behind */}
      <div className="w-full max-w-lg mx-auto z-10 px-8 pb-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 0.85 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-1.5 max-w-xs mb-8 text-center"
        >
          {["AI Practice", "WAEC CBT", "JAMB Prep", "IELTS", "SAT Mock"].map((f, i) => (
            <span key={i} className="bg-white/80 border border-[#E8E8E8] text-[11px] font-medium text-[#666666] px-2.5 py-0.5 rounded-full">
              {f}
            </span>
          ))}
        </motion.div>

        {/* Summer Launch Notice */}
        <p className="font-sans text-[11px] text-text-brand-tertiary font-medium uppercase tracking-wider">
          Launching Summer 2026
        </p>
      </div>

    </div>
  );
}
