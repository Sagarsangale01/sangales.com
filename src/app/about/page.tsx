import React from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/services/settingsService";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us | SANGALES GROUP Profile & Philosophy",
  description:
    "Learn about SANGALES – A GROUP OF COMPANIES, our founding philosophy of patient entrepreneurship, business governance, and our diversified portfolio.",
  alternates: {
    canonical: "/about",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AboutPage() {
  const settings = getSiteSettings();

  return <AboutContent settings={settings} />;
}
