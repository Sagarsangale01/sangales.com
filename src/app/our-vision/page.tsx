import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Target, ShieldCheck, HeartHandshake, Award, Sprout, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Vision, Mission & Values | Sangales Group",
  description:
    "Discover the foundational vision, corporate mission, and guiding ethical values that shape every operating company under SANGALES – A GROUP OF COMPANIES.",
};

export default function VisionPage() {
  const coreValues = [
    {
      title: "Ethical Diligence & Corporate Integrity",
      desc: "Conducting every transaction with statutory compliance, financial transparency, and unyielding honor in our commitments.",
    },
    {
      title: "Uncompromising Quality Benchmarks",
      desc: "Delivering products that adhere to verified standards—from pesticide-free staple grain to food-grade certified packaging.",
    },
    {
      title: "Partnership Longevity",
      desc: "Cultivating relationships with farmers, mandis, institutional buyers, and dealers intended to thrive over generations.",
    },
    {
      title: "Ecological & Social Stewardship",
      desc: "Prioritizing water-conservation farming, biodegradable packaging polymers, and sustainable regional economic enablement.",
    },
    {
      title: "Pragmatic Innovation",
      desc: "Adopting modern cold-chain handling, precision agronomy, and digital systems that create tangible efficiency.",
    },
    {
      title: "Community Value Creation",
      desc: "Ensuring our commercial activities uplift local rural producers, warehouse teams, and regional distribution partners.",
    },
  ];

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
              Strategic Foundation &bull; Philosophy
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Our Vision &amp; Values
            </h1>
            <p className="text-lg text-stone-200 font-light leading-relaxed">
              The foundational principles, long-term ambitions, and ethical convictions driving SANGALES – A GROUP OF COMPANIES.
            </p>
          </div>
        </div>
      </section>

      {/* Main Vision Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20">
        {/* Vision & Mission Deep-Dive */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-editorial space-y-6">
            <div className="w-12 h-12 rounded-sm bg-navy-50 border border-navy-100 flex items-center justify-center text-navy">
              <Compass className="w-6 h-6 text-gold-700" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-700 font-bold block mb-1">
                The Group Vision
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                Building Enduring Indian Enterprises
              </h2>
            </div>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              To be recognized as a premier, values-driven Indian business group that transforms traditional sectors through disciplined execution, creates generational value for partners, and champions sustainable industrial practices.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-100 leading-relaxed">
              We envision Sangales as a national symbol of reliability—where every operating business stands as a benchmark of product integrity and trusted commerce.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-editorial space-y-6">
            <div className="w-12 h-12 rounded-sm bg-navy-50 border border-navy-100 flex items-center justify-center text-navy">
              <Target className="w-6 h-6 text-gold-700" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-700 font-bold block mb-1">
                The Group Mission
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                Delivering Excellence at Scale
              </h2>
            </div>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              To build, scale, and nurture essential business ventures in food, agriculture, trade, and packaging by prioritizing customer well-being, fostering fair agricultural livelihoods, and maintaining institutional governance.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-100 leading-relaxed">
              Our mission is realized through daily operational rigor—ensuring every grain, package, and consignment meets the exacting expectations of our clients.
            </p>
          </div>
        </section>

        {/* 6 Core Values */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase">
              Ethical Code
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
              Our Guiding Principles
            </h2>
            <p className="text-sm text-charcoal-100">
              The unnegotiable standards embedded across every business decision, negotiation, and corporate relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial hover:border-gold/50 transition-all space-y-3"
              >
                <div className="text-xs font-mono font-bold text-gold-700">0{idx + 1}.</div>
                <h3 className="font-heading text-lg font-bold text-navy">{val.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal-100 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-navy text-white p-8 sm:p-12 rounded-sm text-center space-y-6">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold">
            Align with a Values-Driven Group
          </h3>
          <p className="text-sm text-stone-300 max-w-xl mx-auto font-light">
            Whether as a supplier, distributor, or client, we invite you to build a transparent, mutually prosperous partnership with Sangales.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=Partnership"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-white text-navy font-bold text-xs tracking-widest uppercase rounded-sm transition-all shadow-md"
            >
              <span>Explore Partnership Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
