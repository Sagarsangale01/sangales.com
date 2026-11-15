"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, Globe, MessageCircle } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";
import { BusinessRecord } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

interface FooterProps {
  settings?: SiteSettings;
  businesses?: BusinessRecord[];
}

export default function Footer({ settings: propSettings, businesses: propBusinesses }: FooterProps) {
  const { dict, locale } = useLanguage();
  const currentYear = new Date().getFullYear();

  const siteName = dict.brand.siteName || "SANGALES";
  const descriptor = dict.brand.descriptor;
  const tagline = dict.brand.tagline;

  const defaultBusinesses = [
    { id: "1", name: dict.businesses["sangales-enterprises"]?.name || "Sangales Enterprises", slug: "sangales-enterprises", isAssociate: false },
    { id: "2", name: dict.businesses["sangales-trading"]?.name || "Sangales Trading", slug: "sangales-trading", isAssociate: false },
    { id: "3", name: dict.businesses["sangales-packaging"]?.name || "Sangales Packaging", slug: "sangales-packaging", isAssociate: false },
    { id: "4", name: dict.businesses["annamrit-foods"]?.name || "Annamrit Foods", slug: "annamrit-foods", isAssociate: false },
    { id: "5", name: dict.businesses["sangales-farms"]?.name || "Sangales Farms", slug: "sangales-farms", isAssociate: false },
    { id: "6", name: dict.businesses["sangales-digital"]?.name || "Sangales Digital", slug: "sangales-digital", isAssociate: false },
    { id: "7", name: dict.businesses["anvayi-farms"]?.name || "Anvayi Farms", slug: "anvayi-farms", isAssociate: true },
  ];

  const businessesList = propBusinesses && propBusinesses.length > 0
    ? propBusinesses.map(b => ({
        ...b,
        name: dict.businesses[b.slug]?.name || b.name,
      }))
    : defaultBusinesses;

  return (
    <footer className="bg-navy text-stone-300 border-t border-navy-800">
      {/* Upper Pre-footer Banner */}
      <div className="border-b border-navy-700/60 py-12 bg-navy-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-gold text-xs font-semibold tracking-superwide uppercase block mb-1">
              {descriptor}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              {tagline}
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold hover:bg-white text-navy font-semibold text-xs tracking-wider uppercase rounded-sm transition-all shadow-md group shrink-0"
          >
            <span>{dict.actions.initiateEnquiry}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Main Corporate Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <img
                src="/logos/sangales-logo-white.png"
                alt="SANGALES – A GROUP OF COMPANIES"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {dict.footer.description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-gold" /> {dict.brand.hqLocation}
              </span>
              <span>&bull;</span>
              <span>{locale === "mr" ? "भारतीय उद्योग समूह" : locale === "hi" ? "भारतीय व्यापारिक समूह" : "Indian Business Group"}</span>
            </div>

            {/* Footer Language Selector */}
            <div className="pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Select Language / भाषा निवडा:
              </span>
              <LanguageSwitcher variant="segmented" isDarkTheme={true} />
            </div>
          </div>

          {/* Group Portfolio Links */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest text-white uppercase mb-4 border-l-2 border-gold pl-2">
              {dict.footer.ourBusinesses}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {businessesList.slice(0, 8).map((b) => (
                <li key={b.id}>
                  <Link href={`/businesses/${b.slug}`} className="hover:text-gold transition-colors flex items-center justify-between">
                    <span>{b.name}</span>
                    {b.isAssociate && (
                      <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        Associate
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/businesses" className="text-gold hover:underline text-xs inline-flex items-center gap-1 mt-1">
                  {dict.actions.viewAllBusinesses} &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest text-white uppercase mb-4 border-l-2 border-gold pl-2">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-gold transition-colors text-gold/90 font-medium">
                  {dict.nav.catalogue} &rarr;
                </Link>
              </li>
              <li>
                <Link href="/our-vision" className="hover:text-gold transition-colors">
                  {dict.nav.vision}
                </Link>
              </li>
              <li>
                <Link href="/our-journey" className="hover:text-gold transition-colors">
                  {dict.nav.journey}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-gold transition-colors">
                  {dict.nav.news}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-gold transition-colors">
                  {dict.nav.careers}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Support */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest text-white uppercase mb-4 border-l-2 border-gold pl-2">
              {dict.footer.connectWithUs}
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a
                  href="https://maps.google.com/?q=Samruddhi+Park+Kapaleshwar+nagar+Panchwati+Nashik+Maharashtra+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03, Maharashtra, India
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:contact.sangales@gmail.com" className="hover:text-gold transition-colors">
                  contact.sangales@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href="tel:+917507700936"
                  className="hover:text-gold transition-colors font-medium"
                >
                  +91 75077 00936
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/917507700936?text=${encodeURIComponent(
                    locale === "mr"
                      ? "नमस्कार सांगळे कॉर्पोरेट डेस्क, मी अधिक माहितीसाठी संपर्क साधत आहे."
                      : locale === "hi"
                      ? "नमस्ते सांगळे कॉर्पोरेट डेस्क, मैं संपर्क करना चाहता/चाहती हूँ।"
                      : "Hello SANGALES Corporate Desk, I would like to connect."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp: +91 75077 00936
                </a>
              </p>
              <div className="pt-2">
                <Link
                  href="/contact?type=Partnership"
                  className="text-xs font-semibold text-gold uppercase tracking-wider hover:underline"
                >
                  {dict.nav.partnerWithUs} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800 bg-navy-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            &copy; {currentYear} {siteName} &ndash; {descriptor}. {dict.footer.allRightsReserved}
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-stone-200 transition-colors">
              {dict.footer.privacyPolicy}
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-stone-200 transition-colors">
              {dict.footer.termsConditions}
            </Link>
            <Link href="/contact" className="hover:text-stone-200 transition-colors">
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
