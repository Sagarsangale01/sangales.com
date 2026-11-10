"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight, ShieldCheck, Truck, Package, Store } from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  badge?: string;
  actionText?: string;
  actionHref?: string;
}

const FAQS: FAQItem[] = [
  {
    id: "samples",
    category: "Packaging & Trading",
    question: "Can I request physical product samples before placing a bulk order?",
    answer:
      "Yes, absolutely. For Sangales Packaging (corrugated boxes, bubble rolls, stretch wrap, disposable paper bags) and Sangales Trading (PVC ceiling & wall panels, WPC louvers, UV marble sheets), sample swatches and prototype boxes are available for verified commercial buyers, contractors, and retail chains. Contact our desk or submit a quotation request specifying your dimensions.",
    badge: "Sample Kits",
    actionText: "Request Samples on WhatsApp",
    actionHref: "https://wa.me/917507700936?text=Hello%20Sangales%20Group,%20I%20would%20like%20to%20request%20product%20samples.",
  },
  {
    id: "shipping",
    category: "Logistics & Coverage",
    question: "Which geographic regions do SANGALES GROUP operating companies deliver to?",
    answer:
      "We operate multi-tier distribution: Annamrit Foods delivers fresh healthy meals and sprout bowls locally across Nashik city; Sangales Trading & Sangales Enterprises supply electrical and interior building products across North Maharashtra; and Sangales Packaging & Sangales Farms ship full-truckload (FTL) and commercial container consignments across Maharashtra and Pan-India.",
    badge: "Delivery Coverage",
    actionText: "Check Delivery Pincode",
    actionHref: "/contact",
  },
  {
    id: "fssai",
    category: "Food Safety & Quality",
    question: "What food safety certifications and hygiene standards are followed?",
    answer:
      "All edible and agricultural products under the SANGALES umbrella adhere to rigorous standards: Annamrit Foods kitchen operates under strict FSSAI hygiene guidelines with zero artificial preservatives, and our associate Anvayi Farms is FSSAI Certified (Lic. No. 11526999000448) for traditional A2 Vedic Bilona Ghee. Batch lab test reports are readily available for institutional and corporate partners.",
    badge: "FSSAI Verified",
  },
  {
    id: "dealership",
    category: "Partnership & Dealership",
    question: "How do I become an authorized dealer, contractor partner, or bulk distributor?",
    answer:
      "We actively welcome interior decorators, civil contractors, retail grocers, and regional wholesalers. Simply navigate to our Corporate Contact page, select 'Distribution / Dealership' or 'Wholesale / Supply Contract', and share your firm's details. Our business development team reviews all applications and contacts shortlisted partners within 24 to 48 business hours.",
    badge: "B2B Onboarding",
    actionText: "Apply for Dealership",
    actionHref: "/contact?type=Distribution%20/%20Dealership",
  },
  {
    id: "annamrit",
    category: "Annamrit Foods",
    question: "What is the difference between Annamrit Foods daily retail delivery and corporate catering?",
    answer:
      "Annamrit Foods operates two distinct desks: 1) Individual daily retail delivery in Nashik for fresh sprout bowls, high-protein breakfast, and nutritious thalis (ordered directly via WhatsApp kitchen dispatch); and 2) Institutional & corporate catering providing regular canteen meals, executive meeting platters, and bulk cafeteria contracts.",
    badge: "Nashik Local & B2B",
    actionText: "Order Daily Meal on WhatsApp",
    actionHref: "https://wa.me/917507700936?text=Hello%20Annamrit%20Foods,%20I%20would%20like%20to%20inquire%20about%20daily%20meal%20delivery.",
  },
  {
    id: "custom-branding",
    category: "Packaging Solutions",
    question: "Does Sangales Packaging support custom branding and non-standard box sizes?",
    answer:
      "Yes. Sangales Packaging provides bespoke manufacturing for multi-ply corrugated boxes (3-ply, 5-ply, 7-ply, duplex cartons), custom 4CP food meal boxes, printed parcel tapes, and custom-dimension paper bags. We collaborate with e-commerce brands, agro-exporters, and restaurant chains for customized branding.",
    badge: "OEM & Custom Sizes",
    actionText: "Discuss Custom Packaging",
    actionHref: "/businesses/sangales-packaging",
  },
];

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about partnering, purchasing, and working with SANGALES GROUP operating companies.",
  className = "",
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>("samples");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 text-gold-700 text-xs font-bold uppercase tracking-widest rounded-sm border border-gold/30">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Buyer &amp; Partner FAQ</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy">
            {title}
          </h2>
          <p className="text-charcoal-100 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-sm border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-gold/60 shadow-md ring-1 ring-gold/20"
                    : "border-stone-200/80 hover:border-stone-300 shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2 py-0.5 rounded-sm">
                        {faq.category}
                      </span>
                      {faq.badge && (
                        <span className="text-[10px] font-medium text-stone-500">
                          &bull; {faq.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-navy leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "bg-navy text-gold rotate-180" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-charcoal leading-relaxed border-t border-stone-100 space-y-4">
                    <p className="font-light">{faq.answer}</p>
                    {faq.actionHref && (
                      <div className="pt-2">
                        {faq.actionHref.startsWith("http") ? (
                          <a
                            href={faq.actionHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{faq.actionText} &rarr;</span>
                          </a>
                        ) : (
                          <Link
                            href={faq.actionHref}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors"
                          >
                            <span>{faq.actionText} &rarr;</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className="bg-navy-950 text-white p-6 sm:p-7 rounded-sm border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-base font-bold text-white">
              Still have a specific requirement or query?
            </h4>
            <p className="text-xs text-stone-300 font-light">
              Connect directly with our representative desk or request a call back within business hours.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917507700936?text=Hello%20SANGALES%20Group,%20I%20have%20a%20question%20not%20covered%20in%20the%20FAQ."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-white/20"
            >
              <span>Enquiry Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
