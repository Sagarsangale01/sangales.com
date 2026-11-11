"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MessageCircle,
  ArrowUpRight,
  Send,
  Building,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { BusinessRecord, ProductRecord } from "@/lib/data";

export interface FlatProductItem extends ProductRecord {
  businessId: string;
  businessName: string;
  businessSlug: string;
  businessLogo?: string;
  businessStatus: string;
  industryCategory: string;
}

interface ProductCatalogueClientProps {
  businesses: BusinessRecord[];
}

const INDUSTRY_FILTERS = [
  { id: "ALL", label: "All Offerings" },
  { id: "packaging", label: "Packaging & Disposables", businessSlug: "sangales-packaging" },
  { id: "trading", label: "PVC & Interior Materials", businessSlug: "sangales-trading" },
  { id: "enterprises", label: "Electrical & LED Lighting", businessSlug: "sangales-enterprises" },
  { id: "food", label: "Fresh Foods & Sprout Bowls", businessSlug: "annamrit-foods" },
  { id: "farms", label: "Farm Harvest & Millets", businessSlug: "sangales-farms" },
  { id: "ghee", label: "Vedic A2 Ghee & Dairy", businessSlug: "anvayi-farms" },
  { id: "digital", label: "CRM, AI & Web Solutions", businessSlug: "sangales-digital" },
];

export default function ProductCatalogueClient({ businesses }: ProductCatalogueClientProps) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("ALL");
  const [selectedBusiness, setSelectedBusiness] = useState("ALL");
  const [sortBy, setSortBy] = useState<"default" | "name" | "business">("default");

  // Flatten all products across all published businesses
  const allProducts: FlatProductItem[] = useMemo(() => {
    const list: FlatProductItem[] = [];
    businesses.forEach((b) => {
      if (b.products && b.products.length > 0) {
        b.products.forEach((p) => {
          list.push({
            ...p,
            businessId: b.id,
            businessName: b.name,
            businessSlug: b.slug,
            businessLogo: b.logo,
            businessStatus: b.status,
            industryCategory: b.category,
          });
        });
      }
    });
    return list;
  }, [businesses]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      // Industry filter
      if (selectedIndustry !== "ALL") {
        const targetSlug = INDUSTRY_FILTERS.find((f) => f.id === selectedIndustry)?.businessSlug;
        if (targetSlug && item.businessSlug !== targetSlug) {
          return false;
        }
      }

      // Business filter
      if (selectedBusiness !== "ALL" && item.businessId !== selectedBusiness) {
        return false;
      }

      // Search keyword
      if (search.trim() !== "") {
        const q = search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category?.toLowerCase().includes(q) || false;
        const matchesBiz = item.businessName.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesBiz) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "business") {
        return a.businessName.localeCompare(b.businessName);
      }
      return 0;
    });
  }, [allProducts, selectedIndustry, selectedBusiness, search, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedIndustry("ALL");
    setSelectedBusiness("ALL");
    setSortBy("default");
  };

  return (
    <div className="space-y-10">
      {/* Search and Filters Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-grow max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, materials, food items, LED, or software..."
              className="w-full pl-10 pr-10 py-3 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-charcoal transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-navy p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Business Dropdown & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gold-700 shrink-0" />
              <select
                value={selectedBusiness}
                onChange={(e) => {
                  setSelectedBusiness(e.target.value);
                  setSelectedIndustry("ALL"); // reset industry if business selected
                }}
                className="px-3 py-2.5 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-navy cursor-pointer"
              >
                <option value="ALL">All Business Entities ({businesses.length})</option>
                {businesses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal cursor-pointer"
              >
                <option value="default">Default Order</option>
                <option value="name">Product Name (A-Z)</option>
                <option value="business">By Business Unit</option>
              </select>
            </div>
          </div>
        </div>

        {/* Industry Filter Pills */}
        <div className="border-t border-stone-100 pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-navy uppercase tracking-wider mr-2 hidden sm:inline-block">
            Sectors:
          </span>
          {INDUSTRY_FILTERS.map((pill) => {
            const isActive = selectedIndustry === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => {
                  setSelectedIndustry(pill.id);
                  setSelectedBusiness("ALL"); // Reset specific business filter when choosing industry pill
                }}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-navy text-gold shadow-sm ring-1 ring-gold"
                    : "bg-offwhite hover:bg-stone-200/80 text-charcoal border border-stone-200/60"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-navy">
            Showing {filteredProducts.length} of {allProducts.length} Solutions
          </span>
          {(search || selectedIndustry !== "ALL" || selectedBusiness !== "ALL") && (
            <button
              onClick={clearFilters}
              className="text-xs text-gold-700 hover:text-navy underline font-medium ml-2 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="text-xs text-stone-500 font-medium hidden sm:block">
          All products backed by SANGALES Corporate Governance
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-sm border border-stone-200 space-y-4">
          <Package className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-navy">No Matching Offerings Found</h3>
          <p className="text-sm text-charcoal-100 max-w-md mx-auto">
            We couldn&apos;t find any offerings matching &quot;{search}&quot;. Try adjusting your keywords or clearing the category filter.
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 bg-navy text-gold font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-all cursor-pointer"
          >
            Show All Group Solutions
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={`${prod.businessId}-${prod.id}`}
              className="bg-white rounded-sm overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Product Image */}
                {prod.image ? (
                  <div className="h-52 overflow-hidden bg-navy-950 relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {prod.price && (
                      <span className="absolute top-3 right-3 bg-navy/90 backdrop-blur-md text-gold px-3 py-1 text-xs font-extrabold tracking-wide rounded-sm border border-gold/30">
                        {prod.price}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="h-32 bg-stone-100 flex items-center justify-center border-b border-stone-100">
                    <Package className="w-8 h-8 text-stone-300" />
                  </div>
                )}

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  {/* Business Badge & Category */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <Link
                      href={`/businesses/${prod.businessSlug}`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-navy hover:text-gold transition-colors bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded-sm"
                    >
                      <Building className="w-3 h-3 text-gold-700 shrink-0" />
                      <span>{prod.businessName}</span>
                    </Link>

                    {prod.category && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700 bg-gold/10 px-2 py-0.5 rounded-sm">
                        {prod.category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-base font-bold text-navy leading-snug group-hover:text-gold-700 transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-charcoal-100 leading-relaxed font-light line-clamp-3">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-stone-100 mt-4 space-y-2">
                <div className="flex items-center gap-2 pt-3">
                  {/* Primary WhatsApp Action */}
                  <a
                    href={`https://wa.me/917507700936?text=${encodeURIComponent(
                      `Hello SANGALES, I would like to enquire about ${prod.name} from ${prod.businessName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  {/* Buy Online (if available) or Direct Business Profile */}
                  {prod.directBuyUrl ? (
                    <a
                      href={prod.directBuyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-1"
                    >
                      <span>Buy Online</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={`/contact?type=Wholesale&business=${prod.businessId}`}
                      className="px-3 py-2 bg-stone-100 hover:bg-navy hover:text-gold text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-1"
                    >
                      <span>B2B RFP</span>
                      <Send className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Procurement Support Callout */}
      <div className="bg-gradient-to-r from-navy via-navy to-navy-950 text-white p-8 sm:p-10 rounded-sm border border-gold/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-gold text-xs font-bold uppercase tracking-superwide block">
            Custom Manufacturing &bull; Institutional Supply
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
            Need Non-Standard Specifications or Long-Term Procurement Agreements?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            Our manufacturing and sourcing units accommodate customized box dimensions, tailored PVC panel cuts, commercial lighting architectural tenders, and seasonal agricultural forward contracts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/contact?type=Partnership"
            className="px-6 py-3.5 bg-gold hover:bg-white text-navy font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Request Custom RFP</span>
            <Send className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://wa.me/917507700936?text=Hello%20SANGALES%20Corporate%20Desk,%20I%20have%20a%20custom%20bulk%20specification%20requirement."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-widest rounded-sm transition-all border border-white/20 inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}

