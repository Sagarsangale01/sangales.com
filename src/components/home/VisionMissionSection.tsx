import React from "react";
import Link from "next/link";
import { Compass, Target, Award, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export default function VisionMissionSection() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Integrity & Compliance",
      desc: "Upholding absolute transparency, statutory diligence, and ethical conduct across every business transaction.",
    },
    {
      icon: Award,
      title: "Uncompromising Quality",
      desc: "Delivering products and solutions that meet verifiable benchmarks of safety, nutrition, and performance.",
    },
    {
      icon: HeartHandshake,
      title: "Long-Term Partnerships",
      desc: "Treating clients, suppliers, distributors, and employees as enduring stakeholders in our shared growth.",
    },
    {
      icon: Sparkles,
      title: "Sustainable Innovation",
      desc: "Adopting ecological stewardship across farming, eco-packaging, and resource-efficient supply chain logistics.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-gold text-xs font-bold tracking-superwide uppercase">
            Purpose &bull; Direction &bull; Principles
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Our Vision, Mission &amp; Core Values
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-light">
            Guiding the Sangales Group as we build sustainable businesses and unlock meaningful economic opportunities across India.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-sm bg-navy-900 border border-navy-700/80 shadow-xl relative overflow-hidden group hover:border-gold/50 transition-all">
            <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-gold font-bold">Strategic Horizon</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
              Our Vision
            </h3>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              To emerge as a trusted, forward-looking Indian corporate group recognized for building resilient businesses, empowering regional supply chains, and setting benchmarks of quality and value creation across every industry we enter.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-sm bg-navy-900 border border-navy-700/80 shadow-xl relative overflow-hidden group hover:border-gold/50 transition-all">
            <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-gold font-bold">Operational Mandate</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              To cultivate essential enterprises in food, agriculture, trade, packaging, and digital solutions by adhering to uncompromising quality, honoring partner relationships, investing in sustainable methodologies, and delivering tangible value to customers and communities.
            </p>
          </div>
        </div>

        {/* Core Values Strip */}
        <div>
          <div className="border-t border-navy-800 pt-12 pb-6">
            <h4 className="font-heading text-xs uppercase tracking-widest text-gold font-bold text-center mb-8">
              Guiding Corporate Values
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-sm bg-navy-800/50 border border-navy-700/50 hover:bg-navy-800 transition-colors space-y-3"
                >
                  <val.icon className="w-6 h-6 text-gold" />
                  <h5 className="font-heading text-base font-bold text-white">{val.title}</h5>
                  <p className="text-xs text-stone-300 leading-relaxed font-light">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

