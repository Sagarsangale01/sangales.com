"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Filter,
  Check,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Zap,
  MessageCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { AdminProductItem } from "@/services/businessService";
import { BusinessRecord } from "@/lib/store";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { buildAttributedWhatsAppUrl } from "@/lib/utm";

interface Props {
  initialProducts: AdminProductItem[];
  businesses: BusinessRecord[];
}

export default function ShopClient({ initialProducts, businesses }: Props) {
  const router = useRouter();
  const { addItem, openDrawer, itemCount, subtotal } = useCart();
  const { locale } = useLanguage();

  const [search, setSearch] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("ALL");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  // Helper to parse numeric price and unit string
  const parsePrice = (rawPrice?: string) => {
    if (!rawPrice) return { numeric: 0, display: "Contact for Pricing", unit: "" };
    const clean = rawPrice.replace(/,/g, "");
    const match = clean.match(/([0-9]+(?:\.[0-9]+)?)/);
    const numeric = match ? parseFloat(match[1]) : 0;
    const parts = rawPrice.split("/");
    const unit = parts.length > 1 ? "/" + parts.slice(1).join("/").trim() : "";
    return {
      numeric,
      display: numeric > 0 ? `₹${numeric.toLocaleString("en-IN")}` : rawPrice,
      unit,
    };
  };

  // Quantity helpers
  const getQty = (prodId: string) => quantities[prodId] || 1;
  const setQty = (prodId: string, val: number) => {
    const safeVal = Math.max(1, Math.min(99, val));
    setQuantities((prev) => ({ ...prev, [prodId]: safeVal }));
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchBiz = selectedBusiness === "ALL" || p.businessId === selectedBusiness;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.businessName.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q));
      return matchBiz && matchSearch;
    });
  }, [initialProducts, selectedBusiness, search]);

  const handleAddToCart = (prod: AdminProductItem) => {
    const { numeric, unit } = parsePrice(prod.price);
    const qty = getQty(prod.id);

    addItem({
      productId: prod.id,
      productName: prod.name,
      businessId: prod.businessId,
      businessName: prod.businessName,
      image: prod.image,
      price: numeric > 0 ? numeric : 500, // Fallback base price if unpriced
      quantity: qty,
      unit: unit ? unit.replace(/^\//, "").trim() : "Standard Unit",
    });

    // Visual feedback
    setAddedItemMap((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  const handleBuyNow = (prod: AdminProductItem) => {
    const { numeric, unit } = parsePrice(prod.price);
    const qty = getQty(prod.id);

    addItem({
      productId: prod.id,
      productName: prod.name,
      businessId: prod.businessId,
      businessName: prod.businessName,
      image: prod.image,
      price: numeric > 0 ? numeric : 500,
      quantity: qty,
      unit: unit ? unit.replace(/^\//, "").trim() : "Standard Unit",
    });

    router.push("/checkout");
  };

  const getWaProductUrl = (prod: AdminProductItem) => {
    const text =
      `Hello SANGALES Desk, I am interested in purchasing "${prod.name}" from ${prod.businessName}.\n\n` +
      `Price listed: ${prod.price || "On Request"}\n` +
      `Please provide immediate availability, commercial specs, and dispatch confirmation.`;
    return buildAttributedWhatsAppUrl("917507700936", text, prod.businessName);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-24 sm:pt-28">
      {/* Top Banner / Store Header */}
      <section className="bg-navy text-white py-12 sm:py-16 relative overflow-hidden border-b-4 border-gold">
        <div className="absolute inset-0 bg-[radial-gradient(#C6A66B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-gold text-xs font-bold tracking-wider uppercase mb-4">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Official SANGALES Group Direct Storefront</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Direct Supply &amp; Products Store
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Order directly from our verified operating businesses. Authentic Vedic A2 Ghee, fresh organic meals, agricultural staples, industrial corrugated packaging, and architectural electrical supplies delivered straight from our Nashik headquarters.
            </p>

            {/* Value Props Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-navy-900/80 border border-navy-700/80 px-3 py-2 rounded-sm text-xs text-stone-200">
                <Truck className="w-4 h-4 text-gold shrink-0" />
                <span>FREE Shipping ₹999+</span>
              </div>
              <div className="flex items-center gap-2 bg-navy-900/80 border border-navy-700/80 px-3 py-2 rounded-sm text-xs text-stone-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Brand Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-navy-900/80 border border-navy-700/80 px-3 py-2 rounded-sm text-xs text-stone-200">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>UPI QR &amp; COD Available</span>
              </div>
              <div className="flex items-center gap-2 bg-navy-900/80 border border-navy-700/80 px-3 py-2 rounded-sm text-xs text-stone-200">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Order Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Store Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Sticky Filters & Search Bar */}
        <div className="bg-white rounded-md shadow-md border border-stone-200 p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, A2 ghee, packaging, LED, spices..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-navy cursor-pointer font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filter Info */}
            <div className="text-xs text-stone-500 font-medium self-start md:self-center">
              Showing <strong className="text-navy">{filteredProducts.length}</strong> products
            </div>
          </div>

          {/* Business Tabs */}
          <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Businesses:
            </span>
            <button
              onClick={() => setSelectedBusiness("ALL")}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer ${
                selectedBusiness === "ALL"
                  ? "bg-navy text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              All Companies ({initialProducts.length})
            </button>
            {businesses.map((biz) => {
              const count = initialProducts.filter((p) => p.businessId === biz.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={biz.id}
                  onClick={() => setSelectedBusiness(biz.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer ${
                    selectedBusiness === biz.id
                      ? "bg-navy text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {biz.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-md border border-stone-200 p-12 text-center my-8">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-navy mb-1">No products found</h3>
            <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
              We couldn&apos;t find any items matching &ldquo;{search}&rdquo;. Try another keyword or switch business filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedBusiness("ALL");
              }}
              className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-sm uppercase tracking-wider hover:bg-gold hover:text-navy transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const { numeric, display, unit } = parsePrice(prod.price);
              const qty = getQty(prod.id);
              const isAdded = addedItemMap[prod.id];

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-md border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                    <img
                      src={prod.image || "/images/placeholder.jpg"}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />

                    {/* Business badge */}
                    <span className="absolute top-2.5 left-2.5 bg-navy/90 backdrop-blur-xs text-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                      {prod.businessName}
                    </span>

                    {/* Stock Status */}
                    <span className="absolute top-2.5 right-2.5 bg-emerald-600/90 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      In Stock
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {prod.category && (
                        <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">
                          {prod.category}
                        </p>
                      )}
                      <h3 className="font-bold text-navy text-sm sm:text-base leading-snug line-clamp-2 mb-1.5 group-hover:text-gold-700 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {prod.description}
                      </p>
                    </div>

                    <div>
                      {/* Price row */}
                      <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-lg font-black text-navy">{display}</span>
                          {unit && (
                            <span className="text-xs text-stone-500 font-medium ml-1">
                              {unit}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                          Direct Dispatch
                        </span>
                      </div>

                      {/* Quantity & Cart Action */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {/* Qty Selector */}
                          <div className="flex items-center border border-stone-300 rounded-sm bg-stone-50 h-9 shrink-0">
                            <button
                              type="button"
                              onClick={() => setQty(prod.id, qty - 1)}
                              className="px-2.5 h-full text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-navy">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(prod.id, qty + 1)}
                              className="px-2.5 h-full text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            type="button"
                            onClick={() => handleAddToCart(prod)}
                            className={`flex-1 h-9 rounded-sm font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                              isAdded
                                ? "bg-emerald-600 text-white"
                                : "bg-navy hover:bg-navy-900 text-white"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Buy Now & WhatsApp Actions */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleBuyNow(prod)}
                            className="w-full py-1.5 bg-gold hover:bg-gold-600 text-navy font-bold text-[11px] uppercase tracking-wider rounded-sm transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Buy Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>

                          <a
                            href={getWaProductUrl(prod)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 text-stone-700 font-bold text-[11px] rounded-sm transition-all border border-stone-200 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <MessageCircle className="w-3 h-3 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar when items are in cart */}
      {itemCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-navy text-white rounded-md shadow-2xl p-4 border border-gold/40 flex items-center justify-between animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold text-navy font-black flex items-center justify-center text-sm shadow-xs">
              {itemCount}
            </div>
            <div>
              <p className="text-xs text-stone-300 font-medium">Cart Total</p>
              <p className="text-base font-extrabold text-white">
                ₹{subtotal.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openDrawer}
              className="px-3 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-sm text-xs font-bold transition-colors cursor-pointer"
            >
              View Cart
            </button>
            <Link
              href="/checkout"
              className="px-4 py-2 bg-gold hover:bg-white text-navy font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

