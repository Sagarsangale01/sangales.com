import { getStore, saveStore } from "@/lib/store";

export interface SiteSettings {
  siteName: string;
  descriptor: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  corporateAddress: string;
  primaryNavy: string;
  accentGold: string;
  metaTitle: string;
  metaDescription: string;
}

export function getSiteSettings(): SiteSettings {
  const store = getStore();
  const def = {
    siteName: "SANGALES",
    descriptor: "A GROUP OF COMPANIES",
    tagline: "Building Businesses. Creating Opportunities.",
    contactEmail: "contact@sangales.com",
    contactPhone: "+91 98220 00000",
    corporateAddress: "Sangales Corporate House, Maharashtra, India",
    primaryNavy: "#142735",
    accentGold: "#C6A66B",
    metaTitle: "SANGALES – A GROUP OF COMPANIES | Building Businesses. Creating Opportunities.",
    metaDescription: "Official corporate website of SANGALES – A GROUP OF COMPANIES. Leading Indian group in food, agriculture, trading, packaging, and commercial enterprises.",
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
