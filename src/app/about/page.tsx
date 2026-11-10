import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, ShieldCheck, Sprout, Target } from "lucide-react";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "About Us | Sangales Corporate Profile & Philosophy",
  description:
    "Learn about SANGALES – A GROUP OF COMPANIES, our founding philosophy of patient entrepreneurship, business governance, and our diversified portfolio.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AboutPage() {
  const settings = getSiteSettings();

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      {/* Editorial Page Header */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600')`,
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-gold text-xs font-bold tracking-superwide uppercase block">
              Corporate Overview &bull; Identity
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              About {settings.siteName}
            </h1>
            <p className="text-lg text-stone-200 font-light leading-relaxed">
              A diversified Indian business group committed to building sustainable, purpose-driven enterprises and creating long-term value across essential industries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20">
        {/* Section 1: Introduction & Background */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase">
              <span className="w-8 h-[2px] bg-gold-600" />
              {settings.aboutSubtitle}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
              {settings.aboutHeadline}
            </h2>
            <p className="text-base sm:text-lg text-charcoal leading-relaxed">
              {settings.aboutDescription}
            </p>
            <p className="text-sm sm:text-base text-charcoal-100 leading-relaxed">
              {settings.aboutSecondaryText}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden shadow-editorial border border-stone-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200"
                alt="Sangales Corporate Discussion"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-6 bg-navy text-stone-300">
                <p className="text-xs font-semibold tracking-wider uppercase text-gold">
                  Brand Positioning
                </p>
                <p className="font-heading text-base font-bold text-white mt-1">
                  A growing Indian business group focused on building sustainable businesses, creating opportunities, and developing long-term partnerships across multiple industries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Approach to Entrepreneurship */}
        <section className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase block mb-2">
              Business Philosophy
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
              Our Approach to Entrepreneurship
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-100 leading-relaxed">
              We practice a decentralized yet disciplined model of business governance. Each enterprise within the Sangales family is established with a clear mandate, its own leadership accountability, and a distinct operational culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-sm bg-offwhite border border-stone-200/60 space-y-3">
              <Building2 className="w-6 h-6 text-navy" />
              <h3 className="font-heading text-base font-bold text-navy">Independent Identity</h3>
              <p className="text-xs text-charcoal-100 leading-relaxed">
                Operating businesses maintain autonomy in product development, customer interactions, and domain specialization.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-offwhite border border-stone-200/60 space-y-3">
              <ShieldCheck className="w-6 h-6 text-navy" />
              <h3 className="font-heading text-base font-bold text-navy">Parent Governance</h3>
              <p className="text-xs text-charcoal-100 leading-relaxed">
                Group-wide standards enforce statutory compliance, financial discipline, and ethical engagement with all partners.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-offwhite border border-stone-200/60 space-y-3">
              <Sprout className="w-6 h-6 text-navy" />
              <h3 className="font-heading text-base font-bold text-navy">Shared Infrastructure</h3>
              <p className="text-xs text-charcoal-100 leading-relaxed">
                Operating companies leverage group synergies across logistics corridors, technological platforms, and institutional trade networks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Future Direction */}
        <section className="bg-navy text-white p-8 sm:p-12 rounded-sm space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-gold text-xs font-bold tracking-superwide uppercase block">
              Strategic Road Ahead
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              Future Direction &amp; Expansion
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              As we look toward the coming years, Sangales is laying the foundation for technology-enabled commerce, intelligent supply chains, and specialized incubation. Future initiatives—including Sangales Digital, Sangales Logistics, and venture platforms—will expand our capacity to create opportunities for young talent, regional producers, and enterprise clients.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link
              href="/our-vision"
              className="px-6 py-3 bg-gold hover:bg-white text-navy font-bold text-xs tracking-wider uppercase rounded-sm transition-all"
            >
              Explore Vision &amp; Values
            </Link>
            <Link
              href="/businesses"
              className="px-6 py-3 border border-white/30 hover:bg-white/10 text-white font-medium text-xs tracking-wider uppercase rounded-sm transition-all"
            >
              View Group Portfolio
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
