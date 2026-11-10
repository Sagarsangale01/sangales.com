import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, Sparkles, Rocket } from "lucide-react";
import { BusinessRecord } from "@/lib/data";

interface Props {
  businesses: BusinessRecord[];
}

export default function PortfolioShowcase({ businesses }: Props) {
  const published = businesses.filter((b) => b.status === "PUBLISHED");
  const upcoming = businesses.filter((b) => b.status === "UPCOMING");
  const associate = published.find((b) => b.isAssociate || b.slug === "anvayi-farms");
  const groupOperating = published.filter((b) => !b.isAssociate && b.slug !== "anvayi-farms");
  const featured = groupOperating.find((b) => b.slug === "annamrit-foods") || groupOperating[0];
  const others = groupOperating.filter((b) => b.id !== featured?.id);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase mb-3">
              <span className="w-8 h-[2px] bg-gold-600" />
              Corporate Portfolio
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">
              Our Operating Businesses
            </h2>
            <p className="mt-4 text-base sm:text-lg text-charcoal-100">
              Each enterprise operates with independent brand authority and deep domain specialization, reinforced by the shared governance and resources of SANGALES.
            </p>
          </div>

          <Link
            href="/businesses"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors shrink-0 group"
          >
            <span>View All Group Businesses</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 1. Featured Flagship Business: Annamrit Foods */}
        {featured && (
          <div className="mb-12 bg-offwhite rounded-sm overflow-hidden border border-stone-200/80 shadow-editorial transition-all hover:shadow-editorial-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Featured Visual */}
              <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[480px]">
                <img
                  src={featured.coverImage}
                  alt={featured.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-3 py-1 bg-navy/90 backdrop-blur-md text-gold text-xs font-bold tracking-wider uppercase rounded-sm border border-gold/30">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Flagship Brand
                </div>
              </div>

              {/* Featured Details */}
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
                      {featured.category}
                    </span>
                    {featured.logo && (
                      <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow border border-gold/30 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={featured.logo}
                          alt={featured.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
                    {featured.name}
                  </h3>
                  <p className="text-sm font-medium text-gold-800 italic">
                    "{featured.tagline}"
                  </p>
                  <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                    {featured.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 space-y-2">
                    {featured.strengths?.slice(0, 3).map((st, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-charcoal-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href={`/businesses/${featured.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-all shadow-md group"
                  >
                    <span>Explore Business Profile</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href={`/contact?business=${featured.id}&type=Product`}
                    className="inline-flex items-center justify-center px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold transition-colors text-center"
                  >
                    Wholesale Enquiry &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Grid of other Operating Businesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {others.map((biz) => (
            <div
              key={biz.id}
              className="group bg-offwhite rounded-sm overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-52 overflow-hidden bg-navy-900">
                  <img
                    src={biz.coverImage}
                    alt={biz.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider text-gold bg-navy/80 px-2.5 py-1 rounded-sm backdrop-blur-sm">
                    {biz.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-heading text-xl font-bold text-navy group-hover:text-gold-700 transition-colors">
                    {biz.name}
                  </h3>
                  <p className="text-xs text-charcoal-100 line-clamp-3 leading-relaxed">
                    {biz.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-6 pt-0 border-t border-stone-200/60 mt-4">
                <Link
                  href={`/businesses/${biz.slug}`}
                  className="pt-3 inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-gold" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 2.5 Strategic Associate Enterprise: Anvayi Farms */}
        {associate && (
          <div className="mt-16 bg-gradient-to-br from-navy-950 via-navy-900 to-[#122319] text-white rounded-sm overflow-hidden border border-emerald-500/30 shadow-xl">
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-sm border border-emerald-500/40">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Strategic Associate Enterprise &bull; Dedicated Operation</span>
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    {associate.name}
                  </h3>

                  <p className="text-base sm:text-lg text-gold font-medium italic">
                    &quot;{associate.tagline}&quot;
                  </p>

                  <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                    Anvayi Farms is a strategic associate enterprise operating independently in dedicated collaboration with SANGALES. Grounded in traditional Vedic bilona churning and natural desi cow care, Anvayi Farms preserves time-tested heritage and natural nutrition.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {associate.strengths?.slice(0, 4).map((str, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/businesses/${associate.slug}`}
                      className="px-6 py-3.5 bg-gold hover:bg-white text-navy font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <span>Explore Associate Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {associate.website && (
                      <a
                        href={associate.website}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all border border-white/20 inline-flex items-center gap-2"
                      >
                        <span>Official Website (anvayifarms.com)</span>
                        <ArrowUpRight className="w-4 h-4 text-gold" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Visual Feature */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-sm overflow-hidden border border-emerald-500/30 bg-navy-950 shadow-2xl">
                    <img
                      src="/images/anvayi-farms/anvayi-bilona-method.png"
                      alt="Anvayi Farms Vedic Bilona Method"
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-navy-900/90 backdrop-blur-md border border-white/10 rounded-sm space-y-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Heritage Churning</span>
                      <h4 className="text-sm font-bold text-white">Vedic A2 Desi Cow Bilona Ghee</h4>
                      <p className="text-xs text-stone-300">Slow-churned from cultured A2 curd under traditional protocols in Maharashtra.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Upcoming Ventures Horizon */}
        {upcoming.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-600 text-xs font-bold tracking-superwide uppercase mb-1">
                  <Rocket className="w-4 h-4 text-amber-500" />
                  <span>Strategic Incubation Pipeline</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                  Upcoming Group Ventures
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-100 mt-1">
                  Emerging business identities in planning, feasibility analysis, or preliminary infrastructure incubation.
                </p>
              </div>

              <Link
                href="/businesses"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors shrink-0"
              >
                <span>View Full Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((biz) => (
                <div
                  key={biz.id}
                  className="bg-offwhite rounded-sm overflow-hidden border border-amber-200/80 shadow-sm hover:shadow-editorial transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-navy-950">
                      <img
                        src={biz.coverImage}
                        alt={biz.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-amber-600 px-2.5 py-1 rounded-sm flex items-center gap-1">
                        <Rocket className="w-3 h-3 text-gold" /> Upcoming Venture
                      </span>
                      <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider text-gold bg-navy/80 px-2 py-0.5 rounded-sm">
                        {biz.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="font-heading text-lg font-bold text-navy group-hover:text-gold transition-colors">
                        {biz.name}
                      </h4>
                      {biz.tagline && (
                        <p className="text-xs text-gold-700 italic font-medium">
                          &quot;{biz.tagline}&quot;
                        </p>
                      )}
                      <p className="text-xs text-charcoal-100 line-clamp-2 leading-relaxed">
                        {biz.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-200/60 mt-3">
                    <Link
                      href={`/businesses/${biz.slug}`}
                      className="pt-3 inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors"
                    >
                      <span>Explore Incubation Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

