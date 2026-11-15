"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Send, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

interface Props {
  businessName: string;
  businessSlug: string;
  businessLogo?: string;
  category?: string;
}

export default function LandingHeader({
  businessName,
  businessSlug,
  businessLogo,
  category,
}: Props) {
  const { dict, locale } = useLanguage();

  const localizedBiz = dict.businesses[businessSlug];
  const displayName = localizedBiz?.name || businessName;
  const displayCategory = localizedBiz?.category || category || dict.brand.descriptor;

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-md py-2.5 sm:py-3 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Identification */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {businessLogo ? (
              <img
                src={businessLogo}
                alt={displayName}
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full border border-stone-200 bg-white p-0.5 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-xs shrink-0">
                {displayName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-heading text-xs sm:text-base font-extrabold text-navy leading-none truncate">
                  {displayName}
                </span>
                <span className="hidden md:inline-block text-[9px] font-bold uppercase tracking-wider text-gold-700 bg-gold/10 px-1.5 py-0.5 rounded truncate">
                  {displayCategory}
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-stone-400 font-medium truncate mt-0.5">
                {locale === "mr"
                  ? "सांगळे समूहातील अधिकृत व्यवसाय"
                  : locale === "hi"
                  ? "सांगळे समूह का अधिकृत व्यवसाय"
                  : "Part of SANGALES • A Group of Companies"}
              </p>
            </div>
          </div>

          {/* Direct Conversion Actions & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" />

            {/* Phone Hotline */}
            <a
              href="tel:+917507700936"
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-navy hover:text-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-600" />
              <span>+91 75077 00936</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/917507700936?text=${encodeURIComponent(
                locale === "mr"
                  ? `नमस्कार ${displayName}, मला व्यावसायिक दरपत्रक आणि माहिती हवी आहे.`
                  : locale === "hi"
                  ? `नमस्ते ${displayName}, मुझे व्यावसायिक कोटेशन और जानकारी चाहिए।`
                  : `Hello ${businessName}, I would like to request an instant quote and catalog.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {locale === "mr" ? "व्हॉट्सॲप" : locale === "hi" ? "व्हाट्सएप" : "WhatsApp"}
              </span>
            </a>

            {/* Get Quote CTA */}
            <a
              href="#enquiry-section"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{dict.actions.getQuote}</span>
            </a>

            {/* Exit to Corporate View */}
            <Link
              href={`/businesses/${businessSlug}`}
              className="hidden xl:inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-navy transition-colors pl-2 border-l border-stone-200"
              title="View standard corporate profile"
            >
              <span>{dict.actions.corporateProfile}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
