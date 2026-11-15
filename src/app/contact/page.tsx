import React from "react";
import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";
import { getPublishedBusinesses } from "@/services/businessService";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "Contact Us & Business Enquiries | SANGALES GROUP",
  description:
    "Connect with SANGALES – A GROUP OF COMPANIES. Direct enquiry channels for partnerships, wholesale supply, dealerships, and institutional procurement.",
  alternates: {
    canonical: "/contact",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  const [businesses, settings] = await Promise.all([
    getPublishedBusinesses(),
    Promise.resolve(getSiteSettings()),
  ]);

  return <ContactContent businesses={businesses} settings={settings} />;
}
