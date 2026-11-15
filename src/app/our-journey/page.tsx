import React from "react";
import type { Metadata } from "next";
import { getMilestones } from "@/services/settingsService";
import JourneyContent from "@/components/journey/JourneyContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Our Journey & Corporate Milestones | SANGALES GROUP",
  description:
    "Explore the evolution of SANGALES – A GROUP OF COMPANIES, highlighting verified milestones from inception to multi-industry expansion.",
  alternates: {
    canonical: "/our-journey",
  },
};

export default function JourneyPage() {
  const milestones = getMilestones();
  return <JourneyContent milestones={milestones} />;
}
