"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Send } from "lucide-react";

interface MobileQuickBarProps {
  phone?: string;
}

export default function MobileQuickBar({
  phone = "+91 75077 00936",
}: MobileQuickBarProps) {
  const pathname = usePathname();

  // Do not render on Admin CMS pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const rawPhone = phone.replace(/[^0-9+]/g, "");
  const isBusinessPage = pathname?.startsWith("/businesses/");
  const enquiryHref = isBusinessPage ? "#enquiry-section" : "/contact";
  const waText = isBusinessPage
    ? "Hello SANGALES, I would like to enquire about wholesale pricing, specifications, and catalog."
    : "Hello SANGALES Group, I would like to enquire about your products and services.";

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-md border-t border-gold/30 px-3 py-2 shadow-2xl print:hidden">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* 1-Tap Call */}
        <a
          href={`tel:${rawPhone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-white/5 hover:bg-white/10 active:bg-white/20 text-white rounded transition-colors text-center"
        >
          <Phone className="w-4 h-4 text-gold mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call Sales</span>
        </a>

        {/* 1-Tap WhatsApp */}
        <a
          href={`https://wa.me/917507700936?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-emerald-600/90 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded transition-colors text-center shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* 1-Tap Quotation / Enquiry */}
        {isBusinessPage ? (
          <a
            href={enquiryHref}
            className="flex flex-col items-center justify-center py-1.5 px-1 bg-gold/90 hover:bg-gold active:bg-gold-600 text-navy rounded transition-colors text-center font-bold"
          >
            <Send className="w-4 h-4 text-navy mb-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Get Quote</span>
          </a>
        ) : (
          <Link
            href="/contact"
            className="flex flex-col items-center justify-center py-1.5 px-1 bg-gold/90 hover:bg-gold active:bg-gold-600 text-navy rounded transition-colors text-center font-semibold"
          >
            <Send className="w-4 h-4 text-navy mb-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Enquiry</span>
          </Link>
        )}
      </div>
    </div>
  );
}

