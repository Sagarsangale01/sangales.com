"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ArrowUpRight, Sparkles, Building, Rocket, CheckCircle } from "lucide-react";
import { BusinessRecord } from "@/lib/data";

interface Props {
  initialBusinesses: BusinessRecord[];
  categories: { id: string; name: string; slug: string }[];
}

export default function BusinessDirectoryClient({ initialBusinesses, categories }: Props) {
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "UPCOMING">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const publishedCount = useMemo(
    () => initialBusinesses.filter((b) => b.status === "PUBLISHED").length,
    [initialBusinesses]
  );
  const upcomingCount = useMemo(
    () => initialBusinesses.filter((b) => b.status === "UPCOMING").length,
    [initialBusinesses]
  );

  const filteredBusinesses = useMemo(() => {
    return initialBusinesses.filter((b) => {
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PUBLISHED" && b.status === "PUBLISHED") ||
        (statusFilter === "UPCOMING" && b.status === "UPCOMING");

      const matchesCategory =
        selectedCategory === "ALL" || b.categorySlug === selectedCategory || b.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [initialBusinesses, statusFilter, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search and Category Filter Toolbar */}
      <div className="bg-white p-6 rounded-sm border border-stone-200/80 shadow-sm space-y-5">
        {/* Status Mode Tabs: All, Operating, Upcoming */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                statusFilter === "ALL"
                  ? "bg-navy text-gold shadow-sm"
                  : "bg-offwhite text-charcoal hover:bg-stone-200/70"
              }`}
            >
              All Entities ({initialBusinesses.length})
            </button>

            <button
              onClick={() => setStatusFilter("PUBLISHED")}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                statusFilter === "PUBLISHED"
                  ? "bg-navy text-gold shadow-sm"
                  : "bg-offwhite text-charcoal hover:bg-stone-200/70"
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Operating Companies ({publishedCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter("UPCOMING")}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                statusFilter === "UPCOMING"
                  ? "bg-navy text-gold shadow-sm"
                  : "bg-offwhite text-charcoal hover:bg-stone-200/70"
              }`}
            >
              <Rocket className="w-3.5 h-3.5 text-amber-500" />
              <span>Upcoming Ventures ({upcomingCount})</span>
            </button>
          </div>

          <div className="text-xs text-charcoal-100 font-semibold uppercase tracking-wider">
            Showing {filteredBusinesses.length} of {initialBusinesses.length} Entities
          </div>
        </div>

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

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                selectedCategory === "ALL"
                  ? "bg-gold text-navy font-extrabold shadow-sm"
                  : "bg-stone-100 text-charcoal-100 hover:bg-stone-200"
              }`}
            >
              All Sectors
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-gold text-navy font-extrabold shadow-sm"
                    : "bg-stone-100 text-charcoal-100 hover:bg-stone-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-sm border border-stone-200 p-8 space-y-3">
          <Building className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-navy">No businesses matched your criteria</h3>
          <p className="text-sm text-charcoal-100">Try resetting the category filter or searching for another keyword.</p>
          <button
            onClick={() => {
              setStatusFilter("ALL");
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBusinesses.map((biz) => {
            const isUpcoming = biz.status === "UPCOMING";

            return (
              <div
                key={biz.id}
                className={`bg-white rounded-sm overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isUpcoming
                    ? "border-amber-300/80 hover:border-amber-400 shadow-sm hover:shadow-editorial"
                    : "border-stone-200/80 shadow-sm hover:shadow-editorial"
                }`}
              >
                <div>
                  {/* Image & Badge */}
                  <div className="relative h-56 overflow-hidden bg-navy-950">
                    <img
                      src={biz.coverImage}
                      alt={biz.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-navy/90 px-2.5 py-1 rounded-sm backdrop-blur-sm border border-gold/20">
                        {biz.category}
                      </span>

                      {isUpcoming && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-amber-600 px-2.5 py-1 rounded-sm flex items-center gap-1 shadow-sm">
                          <Rocket className="w-3 h-3 text-gold" /> Upcoming Venture
                        </span>
                      )}

                      {!isUpcoming && biz.isFeatured && (
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
                        &quot;{biz.tagline}&quot;
                      </p>
                    )}
                    <p className="text-xs text-charcoal-100 leading-relaxed line-clamp-3">
                      {biz.shortDescription}
                    </p>

                    {/* Products / Offerings snippet */}
                    {biz.products && biz.products.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-navy block mb-1.5">
                          {isUpcoming ? "Planned Offerings & Services:" : "Key Products & Services:"}
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
                    <span>{isUpcoming ? "Explore Incubation Profile" : "Explore Dedicated Profile"}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-gold" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
