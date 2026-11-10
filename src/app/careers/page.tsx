import React from "react";
import type { Metadata } from "next";
import CareersClient from "@/components/careers/CareersClient";
import { getPublishedCareers } from "@/services/careerService";

export const metadata: Metadata = {
  title: "Careers & Opportunities | Join SANGALES GROUP",
  description:
    "Explore professional career opportunities across SANGALES businesses in food, agriculture, enterprise operations, trading, and packaging.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CareersPage() {
  const careers = await getPublishedCareers();

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      {/* Editorial Page Header */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600')`,
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-gold text-xs font-bold tracking-superwide uppercase block">
              People &bull; Careers
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Careers at Sangales
            </h1>
            <p className="text-lg text-stone-200 font-light leading-relaxed">
              Join a dedicated Indian corporate family building long-term value, sustainable operations, and community empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Careers Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CareersClient careers={careers} />
      </div>
    </div>
  );
}

