import React from "react";
import type { Metadata } from "next";
import CareersContent from "@/components/careers/CareersContent";
import { getPublishedCareers } from "@/services/careerService";

export const metadata: Metadata = {
  title: "Careers & Opportunities | Join SANGALES GROUP",
  description:
    "Explore professional career opportunities across SANGALES businesses in food, agriculture, enterprise operations, trading, and packaging.",
  alternates: {
    canonical: "/careers",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CareersPage() {
  const careers = await getPublishedCareers();

  return <CareersContent careers={careers} />;
}
