import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Flag, Award, Sparkles } from "lucide-react";
import { getMilestones } from "@/services/settingsService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Our Journey & Corporate Milestones | Sangale's Group",
  description:
    "Explore the evolution of SANGALE'S – A GROUP OF COMPANIES, highlighting verified milestones from inception to multi-industry expansion.",
};

export default function JourneyPage() {
  const milestones = getMilestones();
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
              Evolution &bull; History
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Our Journey
            </h1>
            <p className="text-lg text-stone-200 font-light leading-relaxed">
              Tracing the deliberate, step-by-step evolution of Sangale's as we developed specialized business divisions and lasting partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Main Timeline Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase">
            Milestones Timeline
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
            A Story of Steady Expansion
          </h2>
          <p className="text-sm text-charcoal-100">
            Every step represents a strategic commitment to real economic fundamentals and customer trust.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-stone-300 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-8">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-white border-4 border-gold-600 group-hover:scale-125 transition-transform" />

              <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3.5 py-1 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm">
                    {item.year}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Outlook */}
        <div className="bg-white p-8 sm:p-10 rounded-sm border border-stone-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-gold-700 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>The Journey Ahead</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy">
            Writing the Next Chapters
          </h3>
          <p className="text-sm text-charcoal-100 leading-relaxed">
            Our story is ongoing. As consumer preferences shift toward unadulterated wellness foods, sustainable farm practices, and zero-plastic packaging solutions, Sangale's continues to invest in capabilities that build resilience and create shared prosperity.
          </p>
          <div className="pt-2">
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold"
            >
              <span>Explore Current Group Businesses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

