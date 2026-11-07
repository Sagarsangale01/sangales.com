import React from "react";
import { Zap, ShieldCheck, HeartHandshake, Sprout, RefreshCw, Users2 } from "lucide-react";

export default function WhySangales() {
  const pillars = [
    {
      icon: Zap,
      title: "Pragmatic Entrepreneurship",
      description: "We identify real, underserved market needs and establish viable, self-sustaining businesses anchored in economic fundamentals.",
    },
    {
      icon: ShieldCheck,
      title: "Quality & Reliability",
      description: "From certified food hygiene to industrial packaging specs, we do not compromise on technical rigor or delivery timelines.",
    },
    {
      icon: Users2,
      title: "Customer Centricity",
      description: "We listen actively to consumer preferences and commercial client specifications to craft solutions that solve actual bottlenecks.",
    },
    {
      icon: HeartHandshake,
      title: "Long-Term Relationships",
      description: "We view suppliers, mandis, institutional buyers, and channel distributors as decade-long partners, not one-off transactions.",
    },
    {
      icon: Sprout,
      title: "Sustainable Growth",
      description: "We prioritize regenerative agricultural inputs, recyclable materials, and environmentally considerate business models.",
    },
    {
      icon: RefreshCw,
      title: "Continuous Improvement",
      description: "Regularly auditing processes, adopting modern food tech, and upgrading packaging machinery to stay ahead of industry evolutions.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase">
            <span className="w-8 h-[2px] bg-gold-600" />
            Why Partner With Us
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">
            Our Business Philosophy
          </h2>
          <p className="text-base sm:text-lg text-charcoal-100">
            A disciplined, values-led approach that sets Sangales apart as a dependable parent enterprise and operating partner.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial hover:border-gold/50 transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-sm bg-navy-50 border border-navy-100 flex items-center justify-center text-navy">
                <item.icon className="w-6 h-6 text-gold-700" />
              </div>
              <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
              <p className="text-sm text-charcoal-100 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
