import { getStore, saveStore } from "@/lib/store";
import { MilestoneRecord, INITIAL_MILESTONES } from "@/lib/data";

export interface SiteSettings {
  siteName: string;
  descriptor: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  corporateAddress: string;
  workingHours: string;
  primaryNavy: string;
  accentGold: string;
  metaTitle: string;
  metaDescription: string;

  // Homepage Hero & Identity
  heroLabel: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;

  // Philosophy & About
  aboutHeadline: string;
  aboutSubtitle: string;
  aboutDescription: string;
  aboutSecondaryText: string;

  // Vision & Mission
  visionStatement: string;
  missionStatement: string;

  // Commercial Partnership Desk
  partnershipHeadline: string;
  partnershipSubtitle: string;
}

export function getSiteSettings(): SiteSettings {
  const store = getStore();
  const def: SiteSettings = {
    siteName: "SANGALES",
    descriptor: "A GROUP OF COMPANIES",
    tagline: "Building Businesses. Creating Opportunities.",
    contactEmail: "contact@sangales.com",
    contactPhone: "+91 98220 00000",
    corporateAddress: "Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03",
    workingHours: "Monday – Saturday: 09:30 AM – 06:30 PM IST",
    primaryNavy: "#142735",
    accentGold: "#C6A66B",
    metaTitle: "SANGALES – A GROUP OF COMPANIES | Building Businesses. Creating Opportunities.",
    metaDescription: "Official corporate website of SANGALES – A GROUP OF COMPANIES. Leading Indian group in food, agriculture, trading, packaging, and commercial enterprises.",

    heroLabel: "DIVERSIFIED BUSINESS GROUP • INDIA",
    heroHeadline: "Building Businesses. Creating Opportunities.",
    heroSubtitle: "A growing business group bringing together wholesome food, sustainable agriculture, commercial trading, packaging solutions, and next-generation enterprise innovation.",
    heroCtaPrimary: "Explore Our Businesses",
    heroCtaSecondary: "Discover Our Story",

    aboutHeadline: "One Vision. Multiple Businesses.",
    aboutSubtitle: "Corporate Identity & Philosophy",
    aboutDescription: "SANGALES – A GROUP OF COMPANIES operates as a unified parent brand fostering independent, mission-driven operating enterprises. From farm gate cultivation and nutritious pantry staples to wholesale enterprise supplies, trading networks, and engineered packaging, we believe true corporate strength lies in patient value creation.",
    aboutSecondaryText: "Every business under the Sangales umbrella retains its dedicated brand ethos, client connections, and specialized domain expertise—while anchoring itself in group-wide standards of governance, operational discipline, and long-term partnership reliability.",

    visionStatement: "To emerge as a trusted, forward-looking Indian corporate group recognized for building resilient businesses, empowering regional supply chains, and setting benchmarks of quality and value creation across every industry we enter.",
    missionStatement: "To cultivate essential enterprises in food, agriculture, trade, packaging, and digital solutions by adhering to uncompromising quality, honoring partner relationships, investing in sustainable methodologies, and delivering tangible value to customers and communities.",

    partnershipHeadline: "Let's Build Something Together.",
    partnershipSubtitle: "We actively seek long-term partnerships with distributors, institutional buyers, suppliers, and entrepreneurs who value quality and mutual growth.",
  };

  return {
    ...def,
    ...(store.settings || {}),
  };
}

export function updateSiteSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  const store = getStore();
  store.settings = {
    ...(store.settings || {}),
    ...newSettings,
  };
  saveStore(store);
  return getSiteSettings();
}

export function getMilestones(): MilestoneRecord[] {
  const store = getStore();
  if (!store.milestones || store.milestones.length === 0) {
    return INITIAL_MILESTONES;
  }
  return store.milestones;
}

export function updateMilestones(milestones: MilestoneRecord[]): MilestoneRecord[] {
  const store = getStore();
  store.milestones = milestones;
  saveStore(store);
  return getMilestones();
}
