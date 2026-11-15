import React from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/services/settingsService";
import VisionContent from "@/components/vision/VisionContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Our Vision, Mission & Values | SANGALES GROUP",
  description:
    "Discover the foundational vision, corporate mission, and guiding ethical values that shape every operating company under SANGALES – A GROUP OF COMPANIES.",
  alternates: {
    canonical: "/our-vision",
  },
};

export default function VisionPage() {
  const settings = getSiteSettings();

  return <VisionContent settings={settings} />;
}
