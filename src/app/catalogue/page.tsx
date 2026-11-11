import React from "react";
import type { Metadata } from "next";
import ProductCatalogueClient from "@/components/catalogue/ProductCatalogueClient";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import { getPublicBusinesses } from "@/services/businessService";

export const metadata: Metadata = {
  title: "Product & Solutions Catalogue | SANGALES GROUP",
  description:
    "Explore the group-wide catalogue of products, manufacturing solutions, agricultural produce, and commercial services across SANGALES operating businesses.",
  openGraph: {
    title: "Product & Solutions Catalogue | SANGALES GROUP",
    description:
      "Explore packaging supplies, PVC panels, LED luminaires, farm-fresh produce, and software solutions from SANGALES group companies.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "SANGALES GROUP Product Catalogue",
      },
    ],
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CataloguePage() {
  const businesses = await getPublicBusinesses();

  return (
    <div className="pt-24 pb-24 bg-offwhite min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
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
              Commercial Directory &bull; Group Solutions
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Group Product &amp; Solutions Catalogue
            </h1>
            <p className="text-base sm:text-lg text-stone-200 font-light leading-relaxed">
              Explore manufacturing supplies, building materials, commercial lighting, fresh farm produce, nutritious meals, and enterprise software platforms across our operating entities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-16">
        {/* Breadcrumb Trail */}
        <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-sm border border-stone-200 shadow-sm inline-block">
          <Breadcrumbs items={[{ label: "Solutions Catalogue", href: "/catalogue" }]} />
        </div>

        {/* Interactive Catalogue Client */}
        <ProductCatalogueClient businesses={businesses} />

        {/* Procurement FAQ */}
        <div className="border-t border-stone-200 pt-16">
          <FAQSection
            title="Catalogue Procurement &amp; Ordering FAQ"
            subtitle="Frequently asked questions on minimum order quantities (MOQ), sample dispatch, and delivery timelines across Maharashtra and Pan-India."
          />
        </div>
      </div>
    </div>
  );
}

