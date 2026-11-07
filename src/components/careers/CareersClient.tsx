"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, Building, CheckCircle2 } from "lucide-react";
import { CareerRecord } from "@/lib/data";
import JobApplicationModal from "@/components/forms/JobApplicationModal";

interface Props {
  careers: CareerRecord[];
}

export default function CareersClient({ careers }: Props) {
  const [selectedJob, setSelectedJob] = useState<CareerRecord | null>(null);

  return (
    <div className="space-y-12">
      {/* Culture Strip */}
      <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase">
            Work With Sangales
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
            Build Meaningful Enterprises With Us
          </h2>
          <p className="text-sm sm:text-base text-charcoal-100 leading-relaxed">
            At Sangales, we foster an environment where autonomy, technical mastery, and long-term perspective are prioritized. Whether in food processing, sustainable agronomy, commercial trading, or packaging design, every team member contributes directly to community value creation.
          </p>
        </div>
      </div>

      {/* Active Openings Listing */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-navy">
            Current Opportunities ({careers.length})
          </h3>
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            Verified Openings
          </span>
        </div>

        {careers.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-sm border border-stone-200">
            <Briefcase className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h4 className="font-heading text-base font-bold text-navy">No active openings at this moment</h4>
            <p className="text-xs text-charcoal-100 mt-1">Please check back periodically or email your resume to careers@sangales.com</p>
          </div>
        ) : (
          <div className="space-y-4">
            {careers.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-navy text-gold text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      {job.businessName}
                    </span>
                    <span className="px-2.5 py-0.5 bg-offwhite text-charcoal-100 text-[10px] font-semibold uppercase tracking-wider rounded-sm border border-stone-200/60">
                      {job.department}
                    </span>
                  </div>

                  <h4 className="font-heading text-xl font-bold text-navy">
                    {job.title}
                  </h4>

                  <p className="text-xs text-charcoal-100 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-700" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-700" />
                      {job.employmentType}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full md:w-auto px-6 py-3 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md inline-flex items-center justify-center gap-2"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <JobApplicationModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}

