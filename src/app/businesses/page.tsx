import React from "react";
import type { Metadata } from "next";
import BusinessDirectoryClient from "@/components/businesses/BusinessDirectoryClient";
import { getPublicBusinesses, getCategories } from "@/services/businessService";

export const metadata: Metadata = {
  title: "Our Businesses | Group Portfolio Directory",
  description:
    "Explore the diversified business portfolio of Sangales Group: Annamrit Foods, Sangales Farms, Sangales Enterprises, Sangales Trading, and Sangales Packaging.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BusinessesPage() {
  const [businesses, categories] = await Promise.all([
    getPublicBusinesses(),
    getCategories(),
  ]);

  return (
    <div className="pt-24 pb-24 bg-offwhite min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
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
              Business Portfolio &bull; Operating Companies
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Our Operating Businesses
            </h1>
            <p className="text-lg text-stone-200 font-light leading-relaxed">
              Explore the independent business entities operating under the Sangales Group umbrella, delivering quality solutions in food, agriculture, wholesale, trading, and packaging.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <BusinessDirectoryClient
          initialBusinesses={businesses}
          categories={categories}
        />
      </div>
    </div>
  );
}

