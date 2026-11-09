"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Phone, ArrowRight, CheckCheck, RefreshCw, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AskSamikshaChatbotProps {
  phone?: string;
  corporateName?: string;
}

interface ChatMessage {
  id: string;
  sender: "samiksha" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; action: () => void }[];
  isCallbackCard?: boolean;
}

export default function AskSamikshaChatbot({
  phone = "+91 75077 00936",
  corporateName = "SANGALES",
}: AskSamikshaChatbotProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  // Auto-scroll ref
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Callback form state within chat
  const [leadPhone, setLeadPhone] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const rawNumber = phone.replace(/[^0-9]/g, "");

  const initialGreeting: ChatMessage = {
    id: "init-1",
    sender: "samiksha",
    text: "Namaste! Welcome to SANGALES – A GROUP OF COMPANIES. I am Samiksha, your direct corporate representative. How can I assist your business today?",
    timestamp: "Just now",
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Do not render on SSR or inside the admin CMS portal
  if (!mounted || pathname?.startsWith("/admin")) {
    return null;
  }

  const handleOpen = () => {
    setIsOpen(true);
    setShowNotificationBadge(false);
    setHasInteracted(true);
  };

  const getSamikshaResponse = (query: string): { reply: string; showCallback?: boolean } => {
    const q = query.toLowerCase();

    if (q.includes("annamrit") || q.includes("food") || q.includes("flour") || q.includes("oil") || q.includes("honey")) {
      return {
        reply: "Annamrit Foods is our premier food division delivering 100% pure stone-ground ancient grains, nutrient-rich wheat & millet flours, cold-pressed virgin oils, and single-origin raw honey. We supply wholesale retail networks, modern trade stores, and hospitality partners across India. Would you like to explore dealership or distribution?",
        showCallback: true,
      };
    }

    if (q.includes("farm") || q.includes("agri") || q.includes("crop") || q.includes("pomegranate") || q.includes("citrus")) {
      return {
        reply: "Sangales Farms manages sustainable precision agriculture across high-yield arable land in Maharashtra. We produce export-grade seasonal fruits (pomegranates, citrus), grains, and provide reliable farm-to-mandi procurement linkages with strict IPM practices.",
        showCallback: true,
      };
    }

    if (q.includes("packag") || q.includes("box") || q.includes("bagasse") || q.includes("container") || q.includes("eco")) {
      return {
        reply: "Sangales Packaging engineers biodegradable, molded-bagasse food delivery containers, plant-fiber packaging, and heavy-duty industrial corrugated solutions for enterprises, cloud kitchens, and restaurant chains.",
        showCallback: true,
      };
    }

    if (q.includes("trad") || q.includes("enterpris") || q.includes("supply") || q.includes("wholesale")) {
      return {
        reply: "Sangales Enterprises & Sangales Trading execute institutional multi-commodity procurement, large-scale supply contracts, and inter-state agricultural trading ensuring price consistency and delivery reliability.",
        showCallback: true,
      };
    }

    if (q.includes("address") || q.includes("location") || q.includes("office") || q.includes("headquarter") || q.includes("where")) {
      return {
        reply: "Our Corporate Headquarters is located at:\n\nSamruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03, Maharashtra, India.\n\nYou are welcome to visit our administrative offices for scheduled corporate meetings.",
      };
    }

    if (q.includes("phone") || q.includes("call") || q.includes("mobile") || q.includes("number") || q.includes("contact")) {
      return {
        reply: `You can reach our corporate desk directly at ${phone}. Operating hours are Monday to Saturday, 09:30 AM to 06:30 PM IST. You can also leave your phone number below and I will have a representative call you right away.`,
        showCallback: true,
      };
    }

    if (q.includes("career") || q.includes("job") || q.includes("hiring") || q.includes("opening") || q.includes("vacancy")) {
      return {
        reply: "We are actively expanding across Sales, Agricultural Field Operations, and Supply Chain. Please visit our 'Careers' page on this website to view all active openings and apply directly online with your resume.",
      };
    }

    if (q.includes("partner") || q.includes("dealership") || q.includes("distributor") || q.includes("franchise") || q.includes("invest")) {
      return {
        reply: "SANGALES welcomes progressive distributors, retail chains, and institutional suppliers for collaborative ventures. Please share your phone number or business details below so our Executive Director desk can contact you.",
        showCallback: true,
      };
    }

    // Default polite corporate response
    return {
      reply: `Thank you for reaching out to SANGALES – A GROUP OF COMPANIES. We operate across Food & Wellness (Annamrit Foods), Agriculture (Sangales Farms), Commercial Supplies (Sangales Enterprises), Packaging Solutions, and Agricultural Trading.\n\nHow can we specifically assist you with our products or corporate services?`,
      showCallback: true,
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Realistic typing response simulation
    setTimeout(() => {
      const { reply, showCallback } = getSamikshaResponse(query);
      const samikshaMsg: ChatMessage = {
        id: "sam-" + Date.now(),
        sender: "samiksha",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCallbackCard: showCallback && !leadSubmitted,
      };
      setMessages((prev) => [...prev, samikshaMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim()) return;

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadName.trim() || "Visitor via Ask Samiksha",
          phone: leadPhone.trim(),
          email: "chat-lead@sangales.com",
          subject: "Enquiry via Ask to Samiksha Chatbot",
          message: `Direct chat enquiry. Recent messages: ${messages.slice(-2).map((m) => m.text).join(" | ")}`,
          enquiryType: "Partnership",
          businessName: "Sangales Corporate Group",
        }),
      });
    } catch {
      // Ignore network errors in widget
    }

    setLeadSubmitted(true);

    const confirmationMsg: ChatMessage = {
      id: "sam-confirm-" + Date.now(),
      sender: "samiksha",
      text: `Thank you ${leadName ? leadName : ""}! Your contact number (${leadPhone}) has been registered with our Corporate Desk. A representative from SANGALES will call you shortly.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, confirmationMsg]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] print:hidden font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[410px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[560px] max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy-950 via-navy to-navy-900 text-white p-4 relative border-b border-gold/40 shadow-sm shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gold to-gold-400 p-0.5 shadow-md flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-navy flex items-center justify-center font-heading font-extrabold text-gold text-lg">
                        S
                      </div>
                    </div>
                    {/* Live indicator dot */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-navy rounded-full ring-2 ring-emerald-400/40 animate-pulse"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading font-bold text-base text-white tracking-wide">
                        Ask to Samiksha
                      </h3>
                      <span className="text-[10px] bg-gold/20 text-gold-300 font-semibold uppercase px-1.5 py-0.5 rounded border border-gold/30">
                        Live Representative
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-0.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Direct In-Website Chat &bull; Instant Reply
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setMessages([initialGreeting]);
                      setLeadSubmitted(false);
                    }}
                    title="Reset chat"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                    aria-label="Reset chat"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="p-4 overflow-y-auto space-y-3.5 bg-stone-50/80 flex-grow text-sm">
              <div className="text-center my-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 bg-white px-3 py-1 rounded-full border border-stone-200 shadow-2xs">
                  SANGALES Executive Assistant
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className={`flex items-start gap-2 max-w-[88%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {msg.sender === "samiksha" && (
                      <div className="w-7 h-7 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-xs shrink-0 mt-1 border border-gold/40 shadow-xs">
                        S
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-navy text-white rounded-br-sm"
                          : "bg-white text-charcoal border border-stone-200/90 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  <span className="text-[10px] text-stone-400 mt-1 px-9">
                    {msg.timestamp}
                  </span>

                  {/* Callback Request Form inline within chat bubble */}
                  {msg.isCallbackCard && !leadSubmitted && (
                    <div className="mt-2 ml-9 mr-2 bg-gradient-to-br from-white to-gold-50/40 p-3.5 rounded-xl border border-gold/40 shadow-sm max-w-[85%] space-y-2">
                      <p className="font-semibold text-xs text-navy flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-700" />
                        <span>Request an Instant Call from our Representative:</span>
                      </p>
                      <form onSubmit={handleLeadSubmit} className="space-y-2">
                        <input
                          type="text"
                          placeholder="Your Name (optional)"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full text-xs p-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy bg-white"
                        />
                        <div className="flex gap-1.5">
                          <input
                            type="tel"
                            required
                            placeholder="Mobile / Phone Number *"
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            className="flex-grow text-xs p-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy bg-white"
                          />
                          <button
                            type="submit"
                            className="bg-navy hover:bg-gold text-white hover:text-navy font-semibold text-xs px-3 py-2 rounded-lg transition-colors shrink-0"
                          >
                            Call Me
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-stone-400 text-xs pl-2">
                  <div className="w-7 h-7 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-xs shrink-0 border border-gold/40">
                    S
                  </div>
                  <div className="bg-white px-3.5 py-2.5 rounded-2xl rounded-tl-sm border border-stone-200/90 shadow-sm flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
              <button
                onClick={() => handleSendMessage("Tell me about Annamrit Foods products and dealerships")}
                className="whitespace-nowrap text-[11px] bg-white hover:bg-gold-50 text-navy hover:text-gold-900 border border-stone-200 rounded-full px-2.5 py-1 transition-colors shadow-2xs font-medium"
              >
                🌾 Annamrit Foods
              </button>
              <button
                onClick={() => handleSendMessage("What agricultural produce does Sangales Farms supply?")}
                className="whitespace-nowrap text-[11px] bg-white hover:bg-gold-50 text-navy hover:text-gold-900 border border-stone-200 rounded-full px-2.5 py-1 transition-colors shadow-2xs font-medium"
              >
                🚜 Sangales Farms
              </button>
              <button
                onClick={() => handleSendMessage("What packaging solutions do you provide?")}
                className="whitespace-nowrap text-[11px] bg-white hover:bg-gold-50 text-navy hover:text-gold-900 border border-stone-200 rounded-full px-2.5 py-1 transition-colors shadow-2xs font-medium"
              >
                📦 Packaging Solutions
              </button>
              <button
                onClick={() => handleSendMessage("Where is your corporate headquarters located?")}
                className="whitespace-nowrap text-[11px] bg-white hover:bg-gold-50 text-navy hover:text-gold-900 border border-stone-200 rounded-full px-2.5 py-1 transition-colors shadow-2xs font-medium"
              >
                📍 Office Address
              </button>
              <button
                onClick={() => handleSendMessage("How can I apply for job openings at Sangales?")}
                className="whitespace-nowrap text-[11px] bg-white hover:bg-gold-50 text-navy hover:text-gold-900 border border-stone-200 rounded-full px-2.5 py-1 transition-colors shadow-2xs font-medium"
              >
                💼 Careers
              </button>
            </div>

            {/* In-Window Text Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Samiksha a question..."
                className="flex-grow text-xs sm:text-sm p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-charcoal bg-stone-50/50"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-navy hover:bg-gold disabled:bg-stone-300 text-white hover:text-navy disabled:text-stone-500 font-semibold p-2.5 rounded-xl shadow-sm transition-all focus:outline-none shrink-0"
                aria-label="Send message to Samiksha"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex items-center gap-3 bg-gradient-to-r from-navy via-navy to-navy-950 text-white pl-3.5 pr-4 py-2.5 sm:py-3 rounded-full shadow-2xl border-2 border-gold/40 hover:border-gold transition-all duration-300 focus:outline-none cursor-pointer"
        aria-label="Ask to Samiksha - Corporate Chat Assistant"
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
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <span className="text-[10px] text-stone-300 font-medium tracking-normal">
            Online &bull; Corporate Desk
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
