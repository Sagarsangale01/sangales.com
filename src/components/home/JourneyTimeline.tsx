import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { INITIAL_MILESTONES } from "@/lib/data";

export default function JourneyTimeline() {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase mb-3">
              <span className="w-8 h-[2px] bg-gold-600" />
              Verified Evolution
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">
              Our Journey &amp; Milestones
            </h2>
            <p className="mt-4 text-base sm:text-lg text-charcoal-100">
              Tracing the measured, values-first progression of Sangales from foundational beginnings to a multi-industry corporate presence.
            </p>
          </div>

          <Link
            href="/our-journey"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors shrink-0 group"
          >
            <span>Explore Full Timeline</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Milestone Timeline cards */}
        <div className="relative border-l-2 border-stone-200 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-6">
          {INITIAL_MILESTONES.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-gold-600 group-hover:scale-125 transition-transform" />

              <div className="bg-offwhite p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all max-w-4xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 bg-navy text-gold text-xs font-bold tracking-wider uppercase rounded-sm">
                    {item.year}
                  </span>
                  <span className="text-xs text-charcoal-100 font-semibold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

