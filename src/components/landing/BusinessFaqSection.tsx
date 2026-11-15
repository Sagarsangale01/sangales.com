"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Phone, ArrowUpRight } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  badge?: string;
}

const BUSINESS_FAQS: Record<string, FaqItem[]> = {
  "sangales-enterprises": [
    {
      id: "se-moq",
      question: "What are the minimum order quantities (MOQ) for commercial LED luminaires?",
      answer:
        "Sangales Enterprises supports both bulk wholesale orders for commercial projects and trial batches for contractors. Standard commercial downlights and ultra-slim panels are typically supplied in cartons of 10 to 50 units, while architectural lighting and outdoor flood/street luminaires can be ordered in project-customized lots.",
      badge: "Wholesale MOQ",
    },
    {
      id: "se-warranty",
      question: "Do Sangales Enterprises lighting products carry manufacturer warranties and GST invoices?",
      answer:
        "Yes, 100%. Every commercial consignment is accompanied by a statutory GST tax invoice, warranty certificates (typically 1 to 2 years replacement warranty depending on model specifications), and technical test datasheets for project clearance.",
      badge: "Warranty & GST",
    },
    {
      id: "se-samples",
      question: "Can contractors or architects request physical sample luminaires for project approvals?",
      answer:
        "Yes. We regularly supply sample fixtures to architects, interior decorators, electrical contractors, and corporate facility teams for client approval and on-site illumination mock-ups.",
      badge: "Sample Units",
    },
    {
      id: "se-delivery",
      question: "What is the typical dispatch turnaround for commercial lighting orders?",
      answer:
        "Standard catalog luminaires and panels ship within 24 to 48 hours from our Maharashtra fulfillment hubs. Large volume commercial project orders or custom-specification fixtures are scheduled based on staging milestones.",
      badge: "Fast Dispatch",
    },
  ],
  "sangales-packaging": [
    {
      id: "sp-products",
      question: "What food packaging and disposable items are available for wholesale purchase?",
      answer:
        "Sangales Packaging manufactures and distributes 4CP food meal boxes, multi-compartment containers, food-grade aluminium foil containers, durable kraft paper delivery bags (sizes 10x14, 6x14, 6x11, 4x10, 4x8), disposable juice/tea glasses, wooden cutlery, and multi-ply corrugated cartons.",
      badge: "Product Range",
    },
    {
      id: "sp-custom",
      question: "Can we get our restaurant or cloud kitchen brand logo printed on boxes and paper bags?",
      answer:
        "Yes. We offer custom single-color, multi-color, and metallic foil branding on kraft bags, 4CP meal containers, and outer corrugated master boxes with competitive plate-making and volume printing costs.",
      badge: "Custom Branding",
    },
    {
      id: "sp-moq",
      question: "What is the minimum wholesale batch size for packaging supplies?",
      answer:
        "Ready-stock plain kraft bags and food boxes are available in bundles starting from 500 to 1,000 pieces. Custom-printed branding orders usually start at 3,000 to 5,000 units depending on printing format.",
      badge: "Volume Tiering",
    },
    {
      id: "sp-dispatch",
      question: "How do you dispatch bulk packaging shipments across Maharashtra and India?",
      answer:
        "We maintain daily logistics linkages with leading surface transport and parcel cargo networks across Nashik, Mumbai, Pune, and all major tier-1/tier-2 commercial centers with tracked freight billing.",
      badge: "Pan-India Freight",
    },
  ],
  "sangales-trading": [
    {
      id: "st-steel",
      question: "What grades and sizes of construction steel and TMT rebars do you supply?",
      answer:
        "Sangales Trading supplies primary and secondary grade high-ductility Fe 500D and Fe 550D TMT bars in standard diameters from 8mm to 32mm with manufacturer test certificates, suitable for residential, commercial, and bridge infrastructure construction.",
      badge: "Fe 500D / 550D",
    },
    {
      id: "st-pvc",
      question: "What are the thickness and waterproofing specifications of your PVC ply sheets?",
      answer:
        "Our high-density PVC foam and ply boards range from 6mm to 18mm thickness. They are 100% waterproof, termite-proof, fire-retardant, and serve as an ideal maintenance-free alternative to traditional wood plywood in kitchens, bathrooms, and exterior cladding.",
      badge: "Waterproof & Termite-Proof",
    },
    {
      id: "st-wallpapers",
      question: "What wallpaper and panel collections are available for interior decorators?",
      answer:
        "We inventory washable vinyl wallpapers, 3D luxury geometric patterns, metallic accents, UV marble sheets, and WPC fluted louvers, backed by matching edge trims and high-tack mounting hardware for turnkey interior installations.",
      badge: "Interior Finishes",
    },
    {
      id: "st-delivery",
      question: "Do you arrange direct on-site vehicle delivery to construction and project sites?",
      answer:
        "Yes. Sangales Trading coordinates direct truckloads and part-load dispatches directly to project sites, warehouses, and hardware retail stores with transit insurance and e-Way bills.",
      badge: "Site Logistics",
    },
  ],
  "annamrit-foods": [
    {
      id: "af-hygiene",
      question: "What hygiene protocols and food safety measures are followed at Annamrit Foods?",
      answer:
        "Annamrit Foods strictly complies with FSSAI sanitary standards, using triple-filtered water, non-GMO grains, cold-milled spices, and zero synthetic preservatives or artificial food coloring in all sprout bowls, healthy chaats, and wholesome meal preparations.",
      badge: "FSSAI Compliance",
    },
    {
      id: "af-catering",
      question: "Does Annamrit Foods provide corporate meal subscriptions or event catering in Nashik?",
      answer:
        "Yes. We serve daily health-conscious meal subscriptions for corporate workplaces, hospitals, gyms, and executive gatherings across Nashik, as well as institutional cafeteria supply.",
      badge: "Corporate Supply",
    },
    {
      id: "af-grains",
      question: "Can we purchase wholesale agricultural grains and ancient millets?",
      answer:
        "Yes, wholesome stone-ground wheat, jowar, bajra, ragi, and native pulses sourced directly from Sangales Farms are supplied in bulk 10kg, 25kg, and 50kg bags for grocers, restaurants, and residential societies.",
      badge: "Wholesale Grains",
    },
  ],
  "sangales-farms": [
    {
      id: "sf-organic",
      question: "Are agricultural crops and vegetables grown without chemical pesticides?",
      answer:
        "Sangales Farms adheres to regenerative and organic farming techniques, utilizing bio-compost, natural pest deterrents, and native heirloom seeds to deliver chemical-free vegetables and wholesome grains.",
      badge: "Natural Cultivation",
    },
    {
      id: "sf-bulk",
      question: "How can agricultural wholesalers or processors place bulk harvest orders?",
      answer:
        "Advance contracts for seasonal wheat, bajra, onions, leafy greens, and ancient millets can be booked directly through our agricultural desk with farm-gate weighing and immediate dispatch.",
      badge: "Farm-Gate Dispatch",
    },
  ],
  "sangales-digital": [
    {
      id: "sd-services",
      question: "What technology platforms and digital systems does Sangales Digital develop?",
      answer:
        "Sangales Digital develops bespoke enterprise CRM systems, high-speed corporate web applications (Next.js/React), inventory and multi-location quotation management software, and tailored AI assistant integrations.",
      badge: "Custom Software",
    },
    {
      id: "sd-timeline",
      question: "What is the typical development and deployment lifecycle for an enterprise platform?",
      answer:
        "Following initial scope discovery and technical architecture design (1 week), MVP versions typically deploy within 3 to 6 weeks with automated CI/CD, cloud hosting on AWS/GCP, and role-based access security.",
      badge: "Agile Delivery",
    },
  ],
};

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "gen-procure",
    question: "How do commercial buyers initiate a quotation with SANGALES Group?",
    answer:
      "Buyers can submit their product requirements, estimated volume, and delivery destination via our instant online quote form, or contact our commercial desk directly via WhatsApp at +91 75077 00936.",
    badge: "B2B Procurement",
  },
  {
    id: "gen-gst",
    question: "Are all commercial consignments supplied with statutory GST invoices?",
    answer:
      "Yes, absolutely. SANGALES is a registered multi-business corporate group adhering to strict statutory compliance. Every order includes a verified GST tax invoice, transport receipts, and necessary e-Way bill documentation.",
    badge: "GST Compliant",
  },
  {
    id: "gen-pan-india",
    question: "What geographic regions does the SANGALES distribution network cover?",
    answer:
      "We operate localized fast delivery within Nashik and North Maharashtra, while shipping bulk wholesale consignments, industrial packaging, and agricultural harvests across Maharashtra and Pan-India.",
    badge: "Delivery Reach",
  },
  {
    id: "gen-dealership",
    question: "How can retail merchants or contractors apply for commercial distributorship?",
    answer:
      "We welcome new distribution partners, builders, and decorators. Submit an enquiry selecting 'Wholesale / Supply Contract' or 'Distribution / Dealership' to receive our dealer kit and wholesale pricing tiers.",
    badge: "Partner Onboarding",
  },
];

interface BusinessFaqSectionProps {
  businessSlug: string;
  businessName: string;
  isLandingMode?: boolean;
}

export default function BusinessFaqSection({
  businessSlug,
  businessName,
  isLandingMode = false,
}: BusinessFaqSectionProps) {
  const faqs = BUSINESS_FAQS[businessSlug] || DEFAULT_FAQS;
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Schema.org FAQPage structured data for rich snippets in Google Ads and Search
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-white rounded-sm border border-stone-200/80 p-6 sm:p-10 shadow-sm space-y-8">
      {/* JSON-LD Rich Snippet for SEO / Google Ads Quality Score */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase mb-1">
            <HelpCircle className="w-4 h-4 text-gold-600" />
            Wholesale &amp; Buyer Intelligence
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
            Frequently Asked Questions &bull; {businessName}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-100 mt-1 max-w-2xl">
            Everything commercial procurement officers, contractors, and retail partners need to know before ordering.
          </p>
        </div>

        <a
          href={`https://wa.me/917507700936?text=${encodeURIComponent(
            `Hello ${businessName}, I have a commercial query regarding wholesale orders and technical specifications.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-sm border transition-all ${
                isOpen
                  ? "bg-offwhite/80 border-gold/40 shadow-sm"
                  : "bg-white border-stone-200 hover:border-stone-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="space-y-1">
                  {faq.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">
                      {faq.badge}
                    </span>
                  )}
                  <h3 className="font-heading text-sm sm:text-base font-bold text-navy">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "bg-navy text-gold rotate-180" : "bg-stone-100 text-stone-600"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-stone-200/50 text-xs sm:text-sm text-charcoal leading-relaxed font-light space-y-3">
                  <p>{faq.answer}</p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-bold text-navy">
                    <a
                      href="#enquiry-section"
                      className="hover:text-gold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Submit RFQ for this item</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Conversion Banner at bottom of FAQ */}
      <div className="p-4 sm:p-5 bg-navy text-white rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-heading text-sm font-bold text-gold">
            Need custom technical specifications, dimension cutouts, or non-standard lots?
          </p>
          <p className="text-xs text-stone-300 mt-0.5">
            Our commercial engineering desk reviews custom tenders, architectural drawings, and institutional supply schedules.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+917507700936"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-white/20 inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>Call Desk</span>
          </a>
          <a
            href="#enquiry-section"
            className="px-4 py-2 bg-gold hover:bg-white text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
          >
            Request Custom Quotation
          </a>
        </div>
      </div>
    </section>
  );
}

