import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { BusinessRecord } from "@/lib/data";

interface Props {
  businesses: BusinessRecord[];
}

export default function PortfolioShowcase({ businesses }: Props) {
  const published = businesses.filter((b) => b.status === "PUBLISHED");
  const featured = published.find((b) => b.slug === "annamrit-foods") || published[0];
  const others = published.filter((b) => b.id !== featured?.id);

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
              Each enterprise operates with independent brand authority and deep domain specialization, reinforced by the corporate governance of Sangales Group.
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
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
                    {featured.category}
                  </span>
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
      </div>
    </section>
  );
}

