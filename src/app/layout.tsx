import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AskSamikshaChatbot from "@/components/common/AskSamikshaChatbot";
import { getSiteSettings } from "@/services/settingsService";
import { getPublishedBusinesses } from "@/services/businessService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sangales.com"),
  title: {
    default: "SANGALES – A GROUP OF COMPANIES | Building Businesses. Creating Opportunities.",
    template: "%s | SANGALES GROUP",
  },
  description:
    "Official corporate portal of SANGALES – A GROUP OF COMPANIES. Leading Indian conglomerate with interests in food, agriculture, wholesale supplies, trading, packaging, and scalable enterprise ventures.",
  keywords: [
    "Sangales",
    "Sangales Group",
    "Sangales A Group of Companies",
    "Annamrit Foods",
    "Sangales Farms",
    "Sangales Enterprises",
    "Sangales Trading",
    "Sangales Packaging",
    "Indian Business Group",
    "Diversified Conglomerate India",
  ],
  authors: [{ name: "Sangales Group" }],
  creator: "Sangales Group",
  publisher: "Sangales Group",
  openGraph: {
    title: "SANGALES – A GROUP OF COMPANIES",
    description: "Building Businesses. Creating Opportunities. One Vision. Multiple Businesses.",
    url: "https://www.sangales.com",
    siteName: "SANGALES",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Sangales - A Group of Companies Corporate Headquarters",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SANGALES – A GROUP OF COMPANIES",
    description: "Building Businesses. Creating Opportunities.",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, businesses] = await Promise.all([
    Promise.resolve(getSiteSettings()),
    getPublishedBusinesses(),
  ]);

  // Organization Structured Data (JSON-LD)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${settings.siteName} – ${settings.descriptor}`,
    alternateName: `${settings.siteName} Group`,
    url: "https://www.sangales.com",
    logo: "https://www.sangales.com/logos/sangales-logo.png",
    description: settings.metaDescription,
    foundingLocation: "India",
    department: businesses.map((b) => ({
      "@type": "Organization",
      name: b.name,
      url: `https://www.sangales.com/businesses/${b.slug}`,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.contactPhone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
  };

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-offwhite text-charcoal">
        <Header settings={settings} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} businesses={businesses} />
        <AskSamikshaChatbot phone={settings.contactPhone} corporateName={settings.siteName} />
      </body>
    </html>
  );
}

