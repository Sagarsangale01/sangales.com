"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Sparkles, Phone, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AskSamikshaChatbotProps {
  phone?: string;
  corporateName?: string;
}

const QUICK_TOPICS = [
  {
    label: "🌾 Annamrit Foods",
    query: "Hello Samiksha, I would like to enquire about Annamrit Foods distribution and product lines.",
  },
  {
    label: "🚜 Sangales Farms",
    query: "Hello Samiksha, I am interested in bulk agricultural produce and supply partnerships with Sangales Farms.",
  },
  {
    label: "📦 Sangales Packaging",
    query: "Hello Samiksha, I would like to request details on eco-friendly commercial and industrial packaging.",
  },
  {
    label: "🤝 Corporate Partnership",
    query: "Hello Samiksha, I represent an organization and would like to explore a commercial partnership with SANGALES Group.",
  },
  {
    label: "💼 Careers & Openings",
    query: "Hello Samiksha, I am reaching out regarding current career openings at SANGALES Group.",
  },
  {
    label: "💬 General Enquiry",
    query: "Hello Samiksha, I would like to connect with a representative from SANGALES – A GROUP OF COMPANIES.",
  },
];

export default function AskSamikshaChatbot({
  phone = "+91 75077 00936",
  corporateName = "SANGALES",
}: AskSamikshaChatbotProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  // Strip everything except numbers for WhatsApp wa.me link
  const rawNumber = phone.replace(/[^0-9]/g, "");

  // Do not show chatbot inside the admin CMS portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleOpen = () => {
    setIsOpen(true);
    setShowNotificationBadge(false);
    setHasInteracted(true);
  };

  const handleSelectTopic = (query: string) => {
    setMessage(query);
  };

  const handleSendToWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend =
      message.trim() ||
      `Hello Samiksha, I am visiting the ${corporateName} corporate website and would like to connect with a representative.`;
    const encoded = encodeURIComponent(textToSend);
    const waUrl = `https://wa.me/${rawNumber}?text=${encoded}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy-950 via-navy to-navy-900 text-white p-4 relative border-b border-gold/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gold to-gold-400 p-0.5 shadow-md flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-navy flex items-center justify-center font-heading font-extrabold text-gold text-lg">
                        S
                      </div>
                    </div>
                    {/* Live indicator dot */}
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-navy rounded-full ring-2 ring-emerald-400/30 animate-pulse"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading font-bold text-base text-white tracking-wide">
                        Ask to Samiksha
                      </h3>
                      <span className="text-[10px] bg-gold/20 text-gold-300 font-semibold uppercase px-1.5 py-0.5 rounded border border-gold/30">
                        Official Desk
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-0.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Online &bull; Connects to WhatsApp Desk
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 overflow-y-auto space-y-4 bg-stone-50/70 flex-grow text-sm">
              {/* Timestamp banner */}
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                  Direct WhatsApp Liaison
                </span>
              </div>

              {/* Samiksha Welcome Bubble */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-gold/40">
                  S
                </div>
                <div className="space-y-2">
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-stone-200/90 shadow-sm text-charcoal space-y-1.5">
                    <p className="font-semibold text-navy flex items-center gap-1.5">
                      <span>Namaste!</span>
                      <span className="text-stone-400 font-normal text-xs">
                        &bull; SANGALES Desk
                      </span>
                    </p>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-stone-700">
                      I am <strong>Samiksha</strong>, corporate representative for <strong>SANGALES – A GROUP OF COMPANIES</strong>.
                    </p>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-stone-700">
                      Choose a business area below or send your message to connect with us immediately on WhatsApp.
                    </p>
                  </div>
                  <span className="text-[10px] text-stone-400 block px-1">
                    Typically replies within a few minutes
                  </span>
                </div>
              </div>

              {/* Quick Topic Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block px-1">
                  Popular Enquiries:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {QUICK_TOPICS.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectTopic(topic.query)}
                      className="text-left text-xs bg-white hover:bg-gold-50/70 text-navy hover:text-gold-800 border border-stone-200/80 hover:border-gold/50 rounded-xl px-3 py-2 transition-all duration-150 flex items-center justify-between group shadow-2xs"
                    >
                      <span className="font-medium truncate pr-2">{topic.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-gold-700 shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input & WhatsApp Action Bar */}
            <form onSubmit={handleSendToWhatsApp} className="p-3 bg-white border-t border-stone-200 space-y-2.5">
              <div className="relative">
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message or select an enquiry above..."
                  className="w-full text-xs sm:text-sm p-2.5 pr-10 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy resize-none text-charcoal bg-stone-50/50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendToWhatsApp();
                    }
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-grow bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  {/* WhatsApp SVG Icon */}
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.146-.525-1.745-.719-2.868-2.502-2.955-2.617-.087-.116-.708-.941-.708-1.792s.448-1.272.607-1.446c.159-.175.347-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.35.491 1.199.535 1.286.044.087.073.189.014.305-.058.116-.087.189-.173.29-.087.102-.183.228-.261.306-.087.087-.178.182-.077.355.101.174.449.741.964 1.2 1.05.938 1.636 1.144 1.87 1.246.234.102.373.087.513-.073.14-.16.598-.696.758-.934.16-.237.319-.199.536-.118.217.081 1.378.65 1.616.769.239.118.398.177.457.275.058.102.058.591-.086.996zM12 2C6.477 2 2 6.477 2 12c0 1.891.527 3.66 1.445 5.168L2 22l4.98-1.307C8.423 21.536 10.158 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.639 0-3.16-.484-4.442-1.316l-.319-.208-2.958.776.79-2.884-.226-.359C3.968 14.825 3.467 13.447 3.467 12c0-4.705 3.828-8.533 8.533-8.533 4.706 0 8.533 3.828 8.533 8.533 0 4.706-3.827 8.534-8.533 8.534z" />
                  </svg>
                  <span>Start WhatsApp Chat</span>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 px-1">
                <span>Official representative hotline:</span>
                <a
                  href={`tel:${rawNumber}`}
                  className="font-semibold text-navy hover:text-gold flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3 h-3 text-gold-700" />
                  {phone}
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex items-center gap-3 bg-gradient-to-r from-navy via-navy to-navy-950 text-white pl-3.5 pr-4 py-2.5 sm:py-3 rounded-full shadow-2xl border-2 border-gold/40 hover:border-gold transition-all duration-300 focus:outline-none"
        aria-label="Ask to Samiksha - WhatsApp Chatbot"
      >
        {/* Representative Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-gold-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-navy flex items-center justify-center font-heading font-extrabold text-gold text-base">
              S
            </div>
          </div>

          {/* Green Active Pulse Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-navy rounded-full ring-2 ring-emerald-400/40 animate-pulse"></span>
        </div>

        {/* Text Label */}
        <div className="text-left flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-bold text-xs sm:text-sm tracking-wide text-white group-hover:text-gold-200 transition-colors">
              Ask to Samiksha
            </span>
            {/* WhatsApp Green Icon */}
            <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
          </div>
          <span className="text-[10px] text-stone-300 font-medium tracking-normal">
            WhatsApp Representative
          </span>
        </div>

        {/* Pulse ripple ring around button */}
        <span className="absolute -inset-1 rounded-full border border-gold/30 animate-ping pointer-events-none opacity-40"></span>

        {/* Unread badge for first-time visitors */}
        {showNotificationBadge && !hasInteracted && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-md border-2 border-white animate-bounce">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}

