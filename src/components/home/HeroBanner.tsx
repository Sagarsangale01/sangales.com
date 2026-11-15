"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  settings?: SiteSettings;
}

export default function HeroBanner({ settings }: Props) {
  const { dict, locale } = useLanguage();

  const label =
    locale === "mr"
      ? "विविध उद्योग समूह • भारत"
      : locale === "hi"
      ? "बहु-उद्योग समूह • भारत"
      : settings?.heroLabel || "DIVERSIFIED BUSINESS GROUP • INDIA";

  const headline =
    locale === "mr"
      ? "व्यवसाय निर्मिती. संधींची निर्मिती."
      : locale === "hi"
      ? "व्यवसाय निर्माण. अवसरों का सृजन."
      : settings?.heroHeadline || dict.brand.tagline;

  const subtitle =
    locale === "mr"
      ? "पौष्टिक अन्न उत्पादने, सेंद्रिय शेती, स्टील व बांधकाम साहित्य, औद्योगिक पॅकेजिंग आणि आधुनिक डिजिटल तंत्रज्ञानाचा संगम असणारा अग्रगण्य भारतीय उद्योग समूह."
      : locale === "hi"
      ? "पौष्टिक खाद्य पदार्थ, प्राकृतिक कृषि, निर्माण सामग्री, आधुनिक पैकेजिंग और नेक्स्ट-जेन डिजिटल सिस्टम का संगम - भारत का अग्रणी व्यापारिक समूह।"
      : settings?.heroSubtitle ||
        "A growing business group bringing together wholesome food, sustainable agriculture, commercial trading, packaging solutions, and next-generation enterprise innovation.";

  const ctaPrimary =
    locale === "mr"
      ? "समूहातील व्यवसाय पहा"
      : locale === "hi"
      ? "हमारे व्यवसाय देखें"
      : settings?.heroCtaPrimary || "Explore Our Businesses";

  const ctaSecondary =
    locale === "mr"
      ? "आमचा प्रवास जाणून घ्या"
      : locale === "hi"
      ? "हमारी कहानी जानें"
      : settings?.heroCtaSecondary || "Discover Our Story";

  const stat1Label =
    locale === "mr"
      ? "कार्यरत विभाग"
      : locale === "hi"
      ? "व्यावसायिक प्रभाग"
      : "Operating Divisions";

  const stat2Label =
    locale === "mr"
      ? "खात्रीशीर गुणवत्ता"
      : locale === "hi"
      ? "विश्वसनीय गुणवत्ता"
      : "Committed Quality";

  const stat3Title =
    locale === "mr"
      ? "महाराष्ट्र व देशभर"
      : locale === "hi"
      ? "अखिल भारत"
      : "Pan-India";

  const stat3Label =
    locale === "mr"
      ? "वितरण नेटवर्क"
      : locale === "hi"
      ? "वितरण पहुंच"
      : "Distribution Reach";

  const scrollLabel =
    locale === "mr"
      ? "खाली स्क्रोल करा"
      : locale === "hi"
      ? "नीचे स्क्रॉल करें"
      : "Scroll Down";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-navy text-white overflow-hidden pt-24 pb-16">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')`,
          }}
        />
        {/* Editorial Gradients and Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-8">
          {/* Label Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold text-xs font-semibold tracking-superwide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {label}
          </div>

          {/* Large Editorial Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            {headline}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-stone-200/90 leading-relaxed font-light max-w-2xl">
            {subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/businesses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-white text-navy font-bold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-xl group"
            >
              <span>{ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium text-xs tracking-widest uppercase border border-white/30 rounded-sm transition-all duration-300"
            >
              <span>{ctaSecondary}</span>
            </Link>
          </div>

          {/* Key Quick Facts / Values Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-white/15">
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-gold">5+</p>
              <p className="text-xs uppercase tracking-wider text-stone-300 mt-0.5">{stat1Label}</p>
            </div>
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-white">100%</p>
              <p className="text-xs uppercase tracking-wider text-stone-300 mt-0.5">{stat2Label}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-heading text-2xl sm:text-3xl font-bold text-gold">{stat3Title}</p>
              <p className="text-xs uppercase tracking-wider text-stone-300 mt-0.5">{stat3Label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-stone-400 text-xs">
        <span className="tracking-widest uppercase text-[10px]">{scrollLabel}</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold" />
      </div>
    </section>
  );
}
