import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, ArrowUpRight } from "lucide-react";
import { NewsRecord } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface Props {
  news: NewsRecord[];
}

export default function LatestNewsSection({ news }: Props) {
  const published = news.filter((n) => n.status === "PUBLISHED").slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase mb-3">
              <span className="w-8 h-[2px] bg-gold-600" />
              Corporate Announcements
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">
              News &amp; Updates
            </h2>
            <p className="mt-4 text-base sm:text-lg text-charcoal-100">
              Official press communications, operational developments, and strategic initiatives from across the Sangales group companies.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors shrink-0 group"
          >
            <span>All Press Releases</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {published.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-sm overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-navy-900">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-navy/85 backdrop-blur-sm text-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-charcoal-50">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy group-hover:text-gold-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-100 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors pt-3 border-t border-stone-100 w-full justify-between"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

