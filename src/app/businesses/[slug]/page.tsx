import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
  CheckCircle2,
  Users2,
  Building,
  ArrowUpRight,
  Sparkles,
  Rocket,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { getBusinessBySlug, getPublishedBusinesses } from "@/services/businessService";
import BusinessEnquiryForm from "@/components/forms/BusinessEnquiryForm";
import ShareBusinessButton from "@/components/businesses/ShareBusinessButton";
import Breadcrumbs from "@/components/common/Breadcrumbs";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const business = await getBusinessBySlug(params.slug);
  if (!business) {
    return {
      title: "Business Not Found | SANGALES GROUP",
    };
  }

  return {
    title: `${business.name} | SANGALES GROUP`,
    description: business.seoDescription || business.shortDescription,
    alternates: {
      canonical: `/businesses/${params.slug}`,
    },
    openGraph: {
      title: `${business.name} | SANGALES GROUP`,
      description: business.shortDescription,
      images: [{ url: business.coverImage }],
    },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BusinessDetailPage({ params }: Props) {
  const [business, allBusinesses] = await Promise.all([
    getBusinessBySlug(params.slug),
    getPublishedBusinesses(),
  ]);

  if (!business) {
    notFound();
  }

  const relatedBusinesses = allBusinesses
    .filter((b) => b.id !== business.id)
    .slice(0, 3);

  // Business-specific structured data (JSON-LD)
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    parentOrganization: {
      "@type": "Organization",
      name: "SANGALES – A GROUP OF COMPANIES",
    },
    description: business.shortDescription,
    image: business.coverImage,
    url: `https://www.sangales.com/businesses/${business.slug}`,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressCountry: "IN",
    },
  };

  // Map custom recommended CTA per business slug according to Master Instructions
  const getBusinessCta = (slug: string) => {
    switch (slug) {
      case "annamrit-foods":
        return { label: "Order Now", href: "#order-options" };
      case "sangales-farms":
        return { label: "Product Enquiry", href: "#enquiry-section" };
      case "sangales-enterprises":
        return { label: "Explore Products", href: "#products-section" };
      case "sangales-trading":
        return { label: "Business Enquiry", href: "#enquiry-section" };
      case "sangales-packaging":
        return { label: "Request Wholesale Quote", href: "#enquiry-section" };
      case "sangales-digital":
        return { label: "Explore Services", href: "#products-section" };
      default:
        return { label: "Send Business Enquiry", href: "#enquiry-section" };
    }
  };

  const heroCta = getBusinessCta(business.slug);

  return (
    <div className="pt-20 bg-offwhite min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />

      {/* 1. Cover Image & Brand Hero */}
      <section className="relative min-h-[460px] lg:min-h-[520px] flex items-end bg-navy text-white overflow-hidden pb-12 pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb Trail & Back Navigation */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/businesses"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-300 hover:text-gold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Group Businesses</span>
            </Link>

            <Breadcrumbs
              items={[
                { label: "Our Businesses", href: "/businesses" },
                { label: business.name },
              ]}
              className="py-0 text-stone-300 [&_a]:text-stone-300 [&_span]:text-gold"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/15 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gold text-navy text-xs font-bold uppercase tracking-wider rounded-sm">
                  {business.category}
                </span>
                <span className="text-xs uppercase tracking-wider text-stone-300 font-semibold">
                  {business.isAssociate ? (business.associationType || "Strategic Associate Company") : "A Sangales Company"}
                </span>
              </div>

              {/* 2. Business Logo & Name & Tagline */}
              <div className="flex items-center gap-4 pt-1">
                {business.logo && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 shadow-xl border-2 border-gold/40 shrink-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={business.logo}
                      alt={business.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                    {business.name}
                  </h1>
                  {business.tagline && (
                    <p className="text-base sm:text-xl text-gold font-medium italic mt-1">
                      &quot;{business.tagline}&quot;
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Short Introduction */}
              <p className="text-sm sm:text-base text-stone-200/90 font-light leading-relaxed max-w-2xl pt-1">
                {business.shortDescription}
              </p>

              {business.status === "UPCOMING" && (
                <div className="mt-3 bg-amber-500/20 border border-amber-400/40 rounded-sm p-3.5 backdrop-blur-md flex items-center gap-3 text-amber-200 text-xs max-w-2xl">
                  <Rocket className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider">UPCOMING ENTERPRISE • IN ACTIVE INCUBATION</p>
                    <p className="text-stone-300 text-[11px] mt-0.5">This business entity is under active development. Open for forward distribution, vendor linkages, and early partner discussions.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Contact CTAs in Hero */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={heroCta.href}
                className="px-6 py-3.5 bg-gold hover:bg-white text-navy font-bold text-xs tracking-widest uppercase rounded-sm transition-all shadow-lg inline-flex items-center gap-2"
              >
                <span>{heroCta.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-widest uppercase rounded-sm transition-all border border-white/20 inline-flex items-center gap-1.5"
                >
                  <span>{business.isAssociate ? "Visit Official Store" : "Visit Domain"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* 5. About the Business */}
            <section className="bg-white p-8 sm:p-10 rounded-sm border border-stone-200/80 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase">
                <span className="w-6 h-[2px] bg-gold-600" />
                Company Overview
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                About {business.name}
              </h2>
              <div className="prose prose-stone text-sm sm:text-base text-charcoal leading-relaxed whitespace-pre-line">
                {business.about}
              </div>
            </section>

            {/* Association Spotlight if Associate Entity */}
            {business.isAssociate && (
              <section className="bg-gradient-to-r from-emerald-900/90 to-navy-950 text-white p-6 sm:p-8 rounded-sm border border-emerald-500/30 shadow-md">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold text-navy text-[11px] font-bold uppercase tracking-wider rounded-sm">
                      <Sparkles className="w-3.5 h-3.5" /> Corporate Strategic Association
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                      Anvayi Farms &bull; Associated with Sangales Group
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                      Anvayi Farms operates in close collaboration with Sangales Group, sharing our foundational standards of uncompromised quality, rural farmer prosperity, and authentic Indian farm nutrition. FSSAI Certified: Lic. No. 11526999000448.
                    </p>
                  </div>
                  {business.website && (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 bg-gold hover:bg-white text-navy font-bold text-xs uppercase tracking-widest rounded-sm transition-all shrink-0 inline-flex items-center gap-2 shadow-lg"
                    >
                      <span>Explore anvayifarms.com</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Annamrit Foods Dual-Mode Order & Catering Banner */}
            {business.slug === "annamrit-foods" && (
              <section id="order-options" className="bg-gradient-to-br from-emerald-950 via-navy-950 to-navy text-white p-6 sm:p-8 rounded-sm border border-emerald-500/30 shadow-lg space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-gold text-xs font-bold uppercase tracking-superwide block mb-1">
                    Flexible Dining &bull; Supply Solutions
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                    Choose How You Would Like to Order with Annamrit Foods
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-light">
                    We serve individual health enthusiasts in Nashik city as well as corporate campuses, hospitals, and educational institutions across the region.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Mode A: Daily Retail & Healthy Tiffins */}
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                    <div className="space-y-2.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded-sm border border-emerald-400/30">
                        🥗 Daily Kitchen &bull; Nashik City Direct
                      </div>
                      <h4 className="font-heading text-lg font-bold text-white">
                        Daily Healthy Meals &amp; Fresh Sprouts
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed font-light">
                        Craving fresh sprout bowls, high-protein breakfast mixes, wholesome homestyle meals, or healthy chaat delivered to your home or office in Nashik? Order directly via our kitchen dispatch desk.
                      </p>
                    </div>
                    <div className="pt-5">
                      <a
                        href="https://wa.me/917507700936?text=Hello%20Annamrit%20Foods,%20I%20would%20like%20to%20order%20daily%20meals%20/%20fresh%20sprouts%20in%20Nashik."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Order on WhatsApp (Kitchen Desk)</span>
                      </a>
                    </div>
                  </div>

                  {/* Mode B: Corporate & Institutional Catering */}
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                    <div className="space-y-2.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/20 text-gold-300 text-[10px] font-bold uppercase tracking-wider rounded-sm border border-gold/30">
                        🏢 Institutional &bull; Corporate Scale
                      </div>
                      <h4 className="font-heading text-lg font-bold text-white">
                        Corporate Catering &amp; Canteen Supply
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed font-light">
                        Custom bulk tiffin service, factory canteens, corporate seminars, and daily employee dietary meal plans. Compliant with strict FSSAI hygiene standards and predictable delivery schedules.
                      </p>
                    </div>
                    <div className="pt-5">
                      <a
                        href="#enquiry-section"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gold hover:bg-white text-navy font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md"
                      >
                        <span>Request Institutional Catering Proposal &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 6. Products & Services */}
            {business.products && business.products.length > 0 && (
              <section id="products-section" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase block mb-1">
                      Offerings &bull; Capabilities
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                      Products &amp; Solutions
                    </h2>
                  </div>
                  {business.website && (
                    <a
                      href={business.website + (business.isAssociate ? "/shop" : "")}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold uppercase tracking-wider text-navy hover:text-gold inline-flex items-center gap-1.5 group"
                    >
                      <span>{business.isAssociate ? "Order Online at anvayifarms.com" : "View Online Catalog"}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {business.products.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-sm overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all flex flex-col justify-between"
                    >
                      <div>
                        {prod.image && (
                          <div className="h-52 overflow-hidden bg-navy-900 relative">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            {prod.price && (
                              <span className="absolute top-3 right-3 bg-navy/90 backdrop-blur-md text-gold px-3 py-1 text-xs font-extrabold tracking-wide rounded-sm border border-gold/30">
                                {prod.price}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="p-5 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            {prod.category && (
                              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700">
                                {prod.category}
                              </span>
                            )}
                            {prod.price && !prod.image && (
                              <span className="text-xs font-extrabold text-navy">
                                {prod.price}
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading text-base font-bold text-navy">
                            {prod.name}
                          </h3>
                          <p className="text-xs text-charcoal-100 leading-relaxed">
                            {prod.description}
                          </p>
                        </div>
                      </div>
                      <div className="p-5 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-stone-100 mt-4">
                        {business.slug === "annamrit-foods" ? (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
                            <a
                              href={`https://wa.me/917507700936?text=${encodeURIComponent(
                                `Hello Annamrit Foods, I would like to order or enquire about ${prod.name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Order on WhatsApp</span>
                            </a>
                            <a
                              href="#enquiry-section"
                              className="text-xs font-semibold text-charcoal-100 hover:text-navy uppercase tracking-wider text-center"
                            >
                              B2B / Catering &rarr;
                            </a>
                          </div>
                        ) : business.slug === "sangales-packaging" ? (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
                            <a
                              href={`https://wa.me/917507700936?text=${encodeURIComponent(
                                `Hello Sangales Packaging, I would like to request a sample kit and size chart for ${prod.name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Sample &amp; Size Chart</span>
                            </a>
                            <a
                              href="#enquiry-section"
                              className="text-xs font-semibold text-charcoal-100 hover:text-navy uppercase tracking-wider text-center"
                            >
                              Bulk Pricing &rarr;
                            </a>
                          </div>
                        ) : business.slug === "sangales-trading" ? (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
                            <a
                              href={`https://wa.me/917507700936?text=${encodeURIComponent(
                                `Hello Sangales Trading, please share PVC/WPC catalog and contractor rates for ${prod.name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Catalog &amp; Rates</span>
                            </a>
                            <a
                              href="#enquiry-section"
                              className="text-xs font-semibold text-charcoal-100 hover:text-navy uppercase tracking-wider text-center"
                            >
                              Contractor Quote &rarr;
                            </a>
                          </div>
                        ) : business.slug === "sangales-enterprises" ? (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
                            <a
                              href={`https://wa.me/917507700936?text=${encodeURIComponent(
                                `Hello Sangales Enterprises, I would like to enquire about commercial lighting specs and quote for ${prod.name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Lighting Quote</span>
                            </a>
                            <a
                              href="#enquiry-section"
                              className="text-xs font-semibold text-charcoal-100 hover:text-navy uppercase tracking-wider text-center"
                            >
                              Project Tender &rarr;
                            </a>
                          </div>
                        ) : business.slug === "sangales-farms" ? (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
                            <a
                              href={`https://wa.me/917507700936?text=${encodeURIComponent(
                                `Hello Sangales Farms, I would like to enquire about wholesale / Mandi harvest supply for ${prod.name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Mandi / Bulk Offtake</span>
                            </a>
                            <a
                              href="#enquiry-section"
                              className="text-xs font-semibold text-charcoal-100 hover:text-navy uppercase tracking-wider text-center"
                            >
                              Wholesale Supply &rarr;
                            </a>
                          </div>
                        ) : business.slug === "sangales-digital" ? (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
                            <a
                              href={`https://wa.me/917507700936?text=${encodeURIComponent(
                                `Hello Sangales Digital, I would like to discuss custom CRM / AI integration project for ${prod.name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Discuss Project</span>
                            </a>
                            <a
                              href="#enquiry-section"
                              className="text-xs font-semibold text-charcoal-100 hover:text-navy uppercase tracking-wider text-center"
                            >
                              Request Scope &rarr;
                            </a>
                          </div>
                        ) : prod.directBuyUrl ? (
                          <>
                            <a
                              href={prod.directBuyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all"
                            >
                              <span>Buy Online</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href="#enquiry-section"
                              className="text-xs font-semibold text-charcoal-100 hover:text-navy uppercase tracking-wider text-center"
                            >
                              B2B Enquiry &rarr;
                            </a>
                          </>
                        ) : (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
                            <a
                              href={`https://wa.me/917507700936?text=${encodeURIComponent(
                                `Hello SANGALES, I would like to enquire about ${prod.name} (${business.name}).`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Inquire on WhatsApp</span>
                            </a>
                            <a
                              href="#enquiry-section"
                              className="text-xs font-bold text-navy hover:text-gold uppercase tracking-wider text-center"
                            >
                              Enquire for Pricing &rarr;
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 8. Business Strengths & 9. Target Customers */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm space-y-4">
                <h3 className="font-heading text-lg font-bold text-navy flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Key Operating Strengths
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-100">
                  {business.strengths?.map((st, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Customers */}
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm space-y-4">
                <h3 className="font-heading text-lg font-bold text-navy flex items-center gap-2">
                  <Users2 className="w-5 h-5 text-gold-700" />
                  Target Markets &amp; Clients
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-100">
                  {business.targetAudience?.map((aud, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2 shrink-0" />
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 7. Gallery */}
            {business.gallery && business.gallery.length > 0 && (
              <section className="space-y-4">
                <div>
                  <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase block mb-1">
                    Visual Showcase
                  </span>
                  <h2 className="font-heading text-2xl font-extrabold text-navy">
                    Operations &amp; Facility Gallery
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {business.gallery.map((img, i) => (
                    <div key={i} className="relative h-56 rounded-sm overflow-hidden bg-navy-950 border border-stone-200 group">
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs text-white font-medium">{img.alt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 12. Direct Business Enquiry Form */}
            <section id="enquiry-section" className="space-y-4">
              <div>
                <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase block mb-1">
                  Connect &bull; Collaborate
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                  Initiate Enquiry with {business.name}
                </h2>
                <p className="text-sm text-charcoal-100">
                  Direct commercial inquiries for bulk supply, wholesale distribution, or product specifications are reviewed by the dedicated operational leadership of {business.name}.
                </p>
              </div>

              <BusinessEnquiryForm
                businessId={business.id}
                businessName={business.name}
              />
            </section>
          </div>

          {/* Sidebar Info Column (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* 10. Contact Details & 11. Links */}
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm space-y-6 sticky top-28">
              {business.logo && (
                <div className="pb-4 border-b border-stone-100 flex flex-col items-center justify-center gap-2">
                  <div className="w-24 h-24 rounded-full bg-white p-1 border-2 border-stone-100 shadow-sm flex items-center justify-center overflow-hidden">
                    <img
                      src={business.logo}
                      alt={business.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Official Brand Seal
                  </span>
                </div>
              )}

              <h3 className="font-heading text-base font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-3">
                Business Contact Desk
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-700 shrink-0 mt-1" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Location</span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(business.address + ", Maharashtra, India")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy hover:text-gold transition-colors font-medium inline-flex items-center gap-1 group"
                    >
                      <span>{business.address}</span>
                      <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-gold shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold-700 shrink-0 mt-1" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Direct Email</span>
                    <a href={`mailto:${business.email}`} className="text-navy hover:text-gold font-medium">
                      {business.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold-700 shrink-0 mt-1" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Direct Telephone</span>
                    <a
                      href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-navy hover:text-gold font-medium"
                    >
                      {business.phone}
                    </a>
                  </div>
                </div>

                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-gold-700 shrink-0 mt-1" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-stone-400">Official URL</span>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-navy hover:text-gold font-medium break-all"
                      >
                        {business.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons in Contact Desk */}
              <div className="pt-2 space-y-2 border-t border-stone-100">
                <a
                  href={heroCta.href}
                  className="w-full py-2.5 px-4 bg-navy hover:bg-gold hover:text-navy text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>{heroCta.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/917507700936?text=${encodeURIComponent(
                    `Hello SANGALES, I would like to inquire regarding ${business.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <ShareBusinessButton businessName={business.name} />
              </div>

              {/* Group Governance Note */}
              <div className="p-4 bg-offwhite rounded-sm border border-stone-200/60 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy block">
                  SANGALES Corporate Assurance
                </span>
                <p className="text-xs text-charcoal-100 leading-relaxed">
                  All commercial agreements with {business.name} are backed by the statutory diligence and governance of SANGALES – A GROUP OF COMPANIES.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 13. Related Businesses */}
        {relatedBusinesses.length > 0 && (
          <section className="pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase block mb-1">
                  Portfolio Exploration
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-navy">
                  Other Sangales Group Companies
                </h3>
              </div>
              <Link
                href="/businesses"
                className="text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors"
              >
                All Businesses &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBusinesses.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/businesses/${rel.slug}`}
                  className="bg-white rounded-sm overflow-hidden border border-stone-200/80 p-5 shadow-sm hover:shadow-editorial transition-all group block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700">
                    {rel.category}
                  </span>
                  <h4 className="font-heading text-lg font-bold text-navy group-hover:text-gold transition-colors mt-1">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-charcoal-100 line-clamp-2 mt-2 leading-relaxed">
                    {rel.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

