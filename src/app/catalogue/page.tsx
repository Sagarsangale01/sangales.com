import React from "react";
import type { Metadata } from "next";
import CatalogueContent from "@/components/catalogue/CatalogueContent";
import { getPublicBusinesses } from "@/services/businessService";

export const metadata: Metadata = {
  title: "Product & Solutions Catalogue | SANGALES GROUP",
  description:
    "Explore the group-wide catalogue of products, manufacturing solutions, agricultural produce, and commercial services across SANGALES operating businesses.",
  alternates: {
    canonical: "/catalogue",
  },
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

  return <CatalogueContent businesses={businesses} />;
}
