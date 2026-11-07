import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Share2, ArrowRight } from "lucide-react";
import { getNewsBySlug, getPublishedNews } from "@/services/newsService";
import { formatDate } from "@/lib/utils";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getNewsBySlug(params.slug);
  if (!item) {
    return { title: "News Not Found | Sangales Group" };
  }
  return {
    title: `${item.title} | Sangales Press`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.featuredImage }],
    },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsDetailPage({ params }: Props) {
  const [article, allNews] = await Promise.all([
    getNewsBySlug(params.slug),
    getPublishedNews(),
  ]);

  if (!article) {
    notFound();
  }

  const otherArticles = allNews
    .filter((n) => n.id !== article.id)
    .slice(0, 2);

  // Article Structured Data (JSON-LD)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: [article.featuredImage],
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "SANGALES – A GROUP OF COMPANIES",
    },
    publisher: {
      "@type": "Organization",
      name: "SANGALES – A GROUP OF COMPANIES",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sangales.com/logos/sangales-wordmark.svg",
      },
    },
    description: article.excerpt,
  };

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-navy uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All News</span>
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-gold-700" />
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-navy leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-charcoal-100 font-light leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Featured Banner Image */}
        <div className="relative h-[360px] sm:h-[480px] rounded-sm overflow-hidden bg-navy-950 shadow-editorial border border-stone-200">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-sm space-y-6">
          <div className="prose prose-stone max-w-none text-base sm:text-lg text-charcoal leading-relaxed whitespace-pre-line font-light">
            {article.content}
          </div>

          <div className="pt-8 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <Tag className="w-4 h-4 text-gold-700" />
              <span>Category: {article.category} &bull; Corporate Desk</span>
            </div>
            <Link
              href="/contact?type=General"
              className="text-xs font-bold uppercase tracking-wider text-navy hover:text-gold"
            >
              Media &amp; Press Enquiries &rarr;
            </Link>
          </div>
        </div>

        {/* Related News */}
        {otherArticles.length > 0 && (
          <div className="pt-10 space-y-6">
            <h3 className="font-heading text-xl font-bold text-navy">
              More From Sangales Media
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.slug}`}
                  className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm hover:shadow-editorial transition-all block group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700">
                    {rel.category}
                  </span>
                  <h4 className="font-heading text-base font-bold text-navy group-hover:text-gold transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <span className="text-xs text-stone-500 mt-2 block">
                    {formatDate(rel.publishedAt)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

