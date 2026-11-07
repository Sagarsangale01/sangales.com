import { MetadataRoute } from "next";
import { getPublishedBusinesses } from "@/services/businessService";
import { getPublishedNews } from "@/services/newsService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.sangales.com";

  const staticRoutes = [
    "",
    "/about",
    "/businesses",
    "/our-vision",
    "/our-journey",
    "/news",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const businesses = await getPublishedBusinesses();
  const businessRoutes = businesses.map((b) => ({
    url: `${baseUrl}/businesses/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const news = await getPublishedNews();
  const newsRoutes = news.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...businessRoutes, ...newsRoutes];
}
