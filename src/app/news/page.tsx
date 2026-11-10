import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowUpRight, ArrowRight } from "lucide-react";
import { getPublishedNews } from "@/services/newsService";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & Media Releases | SANGALES GROUP Announcements",
  description:
    "Official corporate news, press releases, expansion announcements, and updates from SANGALES – A GROUP OF COMPANIES.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const newsList = await getPublishedNews();

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      {/* Editorial Page Header */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600')`,
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-gold text-xs font-bold tracking-superwide uppercase block">
              Press Office &bull; Updates
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              News &amp; Updates
            </h1>
            <p className="text-lg text-stone-200 font-light leading-relaxed">
              Official press announcements, operational milestones, and strategic developments from across our group portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-sm overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-navy-950">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-navy/90 text-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm backdrop-blur-sm border border-gold/20">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Calendar className="w-3.5 h-3.5 text-gold-700" />
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-navy group-hover:text-gold-700 transition-colors line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-xs text-charcoal-100 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-4">
                <Link
                  href={`/news/${item.slug}`}
                  className="pt-3 inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors"
                >
                  <span>Read Full Release</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

