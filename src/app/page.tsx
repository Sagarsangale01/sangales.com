import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import GroupPhilosophy from "@/components/home/GroupPhilosophy";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import VisionMissionSection from "@/components/home/VisionMissionSection";
import WhySangales from "@/components/home/WhySangales";
import JourneyTimeline from "@/components/home/JourneyTimeline";
import PartnershipCTA from "@/components/home/PartnershipCTA";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import { getPublishedBusinesses } from "@/services/businessService";
import { getPublishedNews } from "@/services/newsService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [businesses, news] = await Promise.all([
    getPublishedBusinesses(),
    getPublishedNews(),
  ]);

  return (
    <div className="flex flex-col">
      <HeroBanner />
      <GroupPhilosophy />
      <PortfolioShowcase businesses={businesses} />
      <VisionMissionSection />
      <WhySangales />
      <JourneyTimeline />
      <PartnershipCTA />
      <LatestNewsSection news={news} />
    </div>
  );
}

