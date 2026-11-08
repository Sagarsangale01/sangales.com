"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";

interface Props {
  settings?: SiteSettings;
}

export default function HeroBanner({ settings }: Props) {
  const label = settings?.heroLabel || "DIVERSIFIED BUSINESS GROUP • INDIA";
  const headline = settings?.heroHeadline || "Building Businesses. Creating Opportunities.";
  const subtitle =
    settings?.heroSubtitle ||
    "A growing business group bringing together wholesome food, sustainable agriculture, commercial trading, packaging solutions, and next-generation enterprise innovation.";
  const ctaPrimary = settings?.heroCtaPrimary || "Explore Our Businesses";
  const ctaSecondary = settings?.heroCtaSecondary || "Discover Our Story";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-navy text-white overflow-hidden pt-24 pb-16">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')`,
          }}
        />
        {/* Editorial Gradients and Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-8">
          {/* Label Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold text-xs font-semibold tracking-superwide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {label}
          </div>

          {/* Large Editorial Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            {headline}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-stone-200/90 leading-relaxed font-light max-w-2xl">
            {subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/businesses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-white text-navy font-bold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-xl group"
            >
              <span>{ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium text-xs tracking-widest uppercase border border-white/30 rounded-sm transition-all duration-300"
            >
              <span>{ctaSecondary}</span>
            </Link>
          </div>

          {/* Key Quick Facts / Values Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-white/15">
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-gold">5+</p>
              <p className="text-xs uppercase tracking-wider text-stone-300 mt-0.5">Operating Divisions</p>
            </div>
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-white">100%</p>
              <p className="text-xs uppercase tracking-wider text-stone-300 mt-0.5">Committed Quality</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-heading text-2xl sm:text-3xl font-bold text-gold">Pan-India</p>
              <p className="text-xs uppercase tracking-wider text-stone-300 mt-0.5">Distribution Reach</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-stone-400 text-xs">
        <span className="tracking-widest uppercase text-[10px]">Scroll Down</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold" />
      </div>
    </section>
  );
}
