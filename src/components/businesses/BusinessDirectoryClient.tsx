"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ArrowUpRight, Sparkles, Building, ExternalLink } from "lucide-react";
import { BusinessRecord } from "@/lib/data";

interface Props {
  initialBusinesses: BusinessRecord[];
  categories: { id: string; name: string; slug: string }[];
}

export default function BusinessDirectoryClient({ initialBusinesses, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBusinesses = useMemo(() => {
    return initialBusinesses.filter((b) => {
      const matchesCategory =
        selectedCategory === "ALL" || b.categorySlug === selectedCategory || b.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialBusinesses, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Category Filter Toolbar */}
      <div className="bg-white p-6 rounded-sm border border-stone-200/80 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by business name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-charcoal"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-navy"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-charcoal-100 font-semibold uppercase tracking-wider">
            Showing {filteredBusinesses.length} of {initialBusinesses.length} Enterprises
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
              selectedCategory === "ALL"
                ? "bg-navy text-gold shadow-sm"
                : "bg-offwhite text-charcoal hover:bg-stone-200/70"
            }`}
          >
            All Sectors
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                selectedCategory === cat.slug
                  ? "bg-navy text-gold shadow-sm"
                  : "bg-offwhite text-charcoal hover:bg-stone-200/70"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-sm border border-stone-200 p-8">
          <Building className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-navy">No businesses matched your criteria</h3>
          <p className="text-sm text-charcoal-100 mt-1">Try resetting the category filter or searching for another keyword.</p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="bg-white rounded-sm overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-56 overflow-hidden bg-navy-950">
                  <img
                    src={biz.coverImage}
                    alt={biz.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-navy/90 px-2.5 py-1 rounded-sm backdrop-blur-sm border border-gold/20">
                      {biz.category}
                    </span>
                    {biz.isFeatured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-gold-700 px-2 py-1 rounded-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-gold transition-colors">
                      {biz.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  {biz.tagline && (
                    <p className="text-xs font-semibold text-gold-700 italic">
                      "{biz.tagline}"
                    </p>
                  )}
                  <p className="text-xs text-charcoal-100 leading-relaxed line-clamp-3">
                    {biz.shortDescription}
                  </p>

                  {/* Products snippet */}
                  {biz.products && biz.products.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-navy block mb-1.5">
                        Key Offerings:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {biz.products.slice(0, 3).map((prod) => (
                          <span
                            key={prod.id}
                            className="text-[11px] bg-offwhite px-2 py-0.5 rounded-sm border border-stone-200/60 text-charcoal"
                          >
                            {prod.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="p-6 pt-0 border-t border-stone-100 mt-4">
                <Link
                  href={`/businesses/${biz.slug}`}
                  className="pt-3 inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors"
                >
                  <span>Explore Dedicated Profile</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-gold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
