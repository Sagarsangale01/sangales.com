"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Check,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Zap,
  MessageCircle,
  ArrowRight,
  Salad,
  Wheat,
  Package,
  Lightbulb,
  Building2,
  Cpu,
  Layers,
  ChevronRight,
  Filter,
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

interface CategoryDefinition {
  id: string;
  name: string;
  shortName: string;
  icon: any;
  businessNames: string[];
  tagline: string;
  badge: string;
  accent: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
  };
}

const CATEGORIES: CategoryDefinition[] = [
  {
    id: "food-wellness",
    name: "Food & Healthy Meals",
    shortName: "Food & Meals",
    icon: Salad,
    businessNames: ["Annamrit Foods"],
    tagline: "Hygienic fresh sprout bowls, high-protein vitality salads, and nourishing healthy chaat prepared fresh daily.",
    badge: "FSSAI Certified • Fresh Daily Preparation in Nashik",
    accent: {
      bg: "bg-emerald-50/80",
      border: "border-emerald-200",
      text: "text-emerald-800",
      badgeBg: "bg-emerald-100 text-emerald-800",
    },
  },
  {
    id: "a2-dairy-farm",
    name: "Pure Vedic A2 Ghee & Farm Harvest",
    shortName: "A2 Ghee & Farm",
    icon: Wheat,
    businessNames: ["Anvayi Farms", "Sangales Farms"],
    tagline: "Traditional Bilona method Gir Cow A2 Ghee, cultured makkhan, wholesome wheat, millets, and farm-fresh organic produce.",
    badge: "Traditional Bilona • Ahinsak Dohan • Lab Tested Purity",
    accent: {
      bg: "bg-amber-50/80",
      border: "border-amber-200",
      text: "text-amber-800",
      badgeBg: "bg-amber-100 text-amber-900",
    },
  },
  {
    id: "packaging",
    name: "Eco Packaging & Food Disposables",
    shortName: "Packaging",
    icon: Package,
    businessNames: ["Sangales Packaging"],
    tagline: "Food-grade 4CP meal boxes, aluminium foil containers, biodegradable paper bags, tableware, and industrial packaging.",
    badge: "Factory Direct Pricing • Bulk Wholesale Supply",
    accent: {
      bg: "bg-blue-50/80",
      border: "border-blue-200",
      text: "text-blue-800",
      badgeBg: "bg-blue-100 text-blue-900",
    },
  },
  {
    id: "lighting",
    name: "LED Lighting & Architectural Fixtures",
    shortName: "LED Lighting",
    icon: Lightbulb,
    businessNames: ["Sangales Enterprises"],
    tagline: "Commercial LED panel lights, slim residential downlights, energy-saving street luminaires, and industrial high bays.",
    badge: "BIS Certified • Manufacturer Warranty • Energy Saving",
    accent: {
      bg: "bg-indigo-50/80",
      border: "border-indigo-200",
      text: "text-indigo-800",
      badgeBg: "bg-indigo-100 text-indigo-900",
    },
  },
  {
    id: "building-materials",
    name: "Building Materials & Interior Trading",
    shortName: "Building & Interior",
    icon: Building2,
    businessNames: ["Sangales Trading"],
    tagline: "High-strength TMT steel rebars, waterproof PVC ply sheets, WPC fluted louvers, and high-gloss UV marble sheets.",
    badge: "Direct Distribution • Standard Mandi Rates • GST Invoicing",
    accent: {
      bg: "bg-stone-100/90",
      border: "border-stone-300",
      text: "text-stone-800",
      badgeBg: "bg-stone-200 text-stone-800",
    },
  },
  {
    id: "technology",
    name: "Digital & Enterprise Technology",
    shortName: "Digital & Software",
    icon: Cpu,
    businessNames: ["Sangales Digital"],
    tagline: "Enterprise CRM platforms, bespoke business ERP portals, intelligent AI workflow automation, and custom web engineering.",
    badge: "Custom Engineering • Dedicated SLA • Cloud Powered",
    accent: {
      bg: "bg-cyan-50/80",
      border: "border-cyan-200",
      text: "text-cyan-900",
      badgeBg: "bg-cyan-100 text-cyan-900",
    },
  },
];

// Helper to categorize a product
function getProductCategoryId(prod: AdminProductItem): string {
  const bizName = prod.businessName.toLowerCase();
  if (bizName.includes("annamrit")) return "food-wellness";
  if (bizName.includes("anvayi") || bizName.includes("sangales farms")) return "a2-dairy-farm";
  if (bizName.includes("packaging")) return "packaging";
  if (bizName.includes("enterprises")) return "lighting";
  if (bizName.includes("trading")) return "building-materials";
  if (bizName.includes("digital")) return "technology";
  return "food-wellness";
}

export default function ShopClient({ initialProducts, businesses }: Props) {
  const router = useRouter();
  const { addItem, openDrawer, itemCount, subtotal } = useCart();
  const { locale } = useLanguage();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("ALL");
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

  // Add to cart handler
  const handleAddToCart = (prod: AdminProductItem) => {
    if (prod.stockStatus === "OUT_OF_STOCK") return;
    const { numeric, unit } = parsePrice(prod.price);
    const qty = getQty(prod.id);
    const itemUnit = prod.unit || (unit ? unit.replace(/^\//, "").trim() : "Standard Unit");

    addItem({
      productId: prod.id,
      productName: prod.name,
      businessId: prod.businessId,
      businessName: prod.businessName,
      image: prod.image,
      price: numeric > 0 ? numeric : 500,
      quantity: qty,
      unit: itemUnit,
    });

    setAddedItemMap((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  // Buy now handler
  const handleBuyNow = (prod: AdminProductItem) => {
    if (prod.stockStatus === "OUT_OF_STOCK") return;
    const { numeric, unit } = parsePrice(prod.price);
    const qty = getQty(prod.id);
    const itemUnit = prod.unit || (unit ? unit.replace(/^\//, "").trim() : "Standard Unit");

    addItem({
      productId: prod.id,
      productName: prod.name,
      businessId: prod.businessId,
      businessName: prod.businessName,
      image: prod.image,
      price: numeric > 0 ? numeric : 500,
      quantity: qty,
      unit: itemUnit,
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

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: initialProducts.length };
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = initialProducts.filter((p) => getProductCategoryId(p) === cat.id).length;
    });
    return counts;
  }, [initialProducts]);

  // Sub-categories for currently selected category
  const activeSubCategories = useMemo(() => {
    if (selectedCategory === "ALL") return [];
    const catProducts = initialProducts.filter((p) => getProductCategoryId(p) === selectedCategory);
    const set = new Set<string>();
    catProducts.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return Array.from(set);
  }, [initialProducts, selectedCategory]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      // Category match
      const pCat = getProductCategoryId(p);
      const matchCat = selectedCategory === "ALL" || pCat === selectedCategory;

      // Sub-category match
      const matchSubCat =
        selectedCategory === "ALL" ||
        selectedSubCategory === "ALL" ||
        p.category === selectedSubCategory;

      // Search match
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.businessName.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q));

      return matchCat && matchSubCat && matchSearch;
    });
  }, [initialProducts, selectedCategory, selectedSubCategory, search]);

  // Group products by category definition for "ALL" view
  const groupedProducts = useMemo(() => {
    const groups: { category: CategoryDefinition; products: AdminProductItem[] }[] = [];

    CATEGORIES.forEach((cat) => {
      const prods = filteredProducts.filter((p) => getProductCategoryId(p) === cat.id);
      if (prods.length > 0) {
        groups.push({ category: cat, products: prods });
      }
    });

    return groups;
  }, [filteredProducts]);

  // Scroll to section helper
  const scrollToCategory = (catId: string) => {
    const el = document.getElementById(`category-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Product Card Component for consistency
  const renderProductCard = (prod: AdminProductItem) => {
    const { numeric, display, unit } = parsePrice(prod.price);
    const qty = getQty(prod.id);
    const isAdded = addedItemMap[prod.id];

    const isOut = prod.stockStatus === "OUT_OF_STOCK" || (typeof prod.stockQuantity === "number" && prod.stockQuantity <= 0);
    const isLow = !isOut && (prod.stockStatus === "LOW_STOCK" || (typeof prod.stockQuantity === "number" && prod.stockQuantity <= (prod.lowStockThreshold || 10)));

    const numMrp = parsePrice(prod.mrp).numeric;
    const discount = numMrp > numeric && numeric > 0 ? Math.round(((numMrp - numeric) / numMrp) * 100) : 0;
    const packagingUnit = prod.unit || (unit ? unit.replace(/^\//, "").trim() : "");

    return (
      <div
        key={prod.id}
        className={`bg-white rounded-md border shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group ${
          isOut ? "border-red-200 opacity-90" : "border-stone-200"
        }`}
      >
        {/* Image Container */}
        <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
          <img
            src={prod.image || "/images/placeholder.jpg"}
            alt={prod.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isOut ? "grayscale-50 contrast-75" : ""
            }`}
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />

          {/* Business badge */}
          <span className="absolute top-2.5 left-2.5 bg-navy/90 backdrop-blur-xs text-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
            {prod.businessName}
          </span>

          {/* Stock Status Badge */}
          {isOut ? (
            <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-1">
              ✕ Out of Stock
            </span>
          ) : isLow ? (
            <span className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-1 animate-pulse">
              ▲ Only {prod.stockQuantity ?? 5} Left
            </span>
          ) : (
            <span className="absolute top-2.5 right-2.5 bg-emerald-600/90 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              In Stock
            </span>
          )}

          {/* Discount badge if MRP > Price */}
          {discount > 0 && !isOut && (
            <span className="absolute bottom-2.5 left-2.5 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-xs shadow-xs">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {prod.category && (
                <span className="inline-block text-[10px] uppercase font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-xs tracking-wider">
                  {prod.category}
                </span>
              )}
              {prod.sku && (
                <span className="font-mono text-[9px] text-stone-400 font-semibold">
                  {prod.sku}
                </span>
              )}
            </div>

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
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-navy">{display}</span>
                  {discount > 0 && (
                    <span className="text-xs text-stone-400 line-through">
                      ₹{numMrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                {packagingUnit && (
                  <span className="text-[11px] text-stone-500 font-medium block">
                    / {packagingUnit}
                  </span>
                )}
              </div>

              {isOut ? (
                <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-xs">
                  Restock Pending
                </span>
              ) : isLow ? (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-xs">
                  Fast Selling
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                  Direct Dispatch
                </span>
              )}
            </div>

            {/* Quantity & Cart Action */}
            <div className="space-y-2">
              {isOut ? (
                <div className="space-y-2">
                  <div className="p-2 bg-stone-50 text-stone-500 text-center text-xs font-medium rounded-sm border border-stone-200">
                    Currently Out of Stock
                  </div>
                  <a
                    href={getWaProductUrl(prod)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire for Restock on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const activeCategoryDef = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-24 sm:pt-28">
      {/* Top Banner / Store Header */}
      <section className="bg-navy text-white py-12 sm:py-16 relative overflow-hidden border-b-4 border-gold">
        <div className="absolute inset-0 bg-[radial-gradient(#C6A66B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-gold text-xs font-bold tracking-wider uppercase">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Official SANGALES Group Direct Storefront</span>
              </div>
              <Link
                href="/track-order"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white rounded-full text-xs font-semibold tracking-wide transition-colors"
              >
                <Truck className="w-3.5 h-3.5 text-gold" />
                <span>Track Existing Order &rarr;</span>
              </Link>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Direct Supply &amp; Products Store
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Organized directly by industry division. Authentic Vedic A2 Ghee, fresh organic meals, industrial corrugated packaging, architectural LED lighting, and building materials dispatched from our central Nashik hub.
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
        {/* Sticky Filters & Category Tabs */}
        <div className="bg-white rounded-md shadow-md border border-stone-200 p-4 sm:p-5 mb-8 space-y-4">
          {/* Top Row: Search Input & Result Count */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search across all categories, A2 ghee, packaging, LED..."
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

            <div className="text-xs text-stone-500 font-medium self-start md:self-center">
              Showing <strong className="text-navy font-bold">{filteredProducts.length}</strong> products
              {selectedCategory !== "ALL" && (
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSelectedSubCategory("ALL");
                  }}
                  className="ml-2 text-gold-700 font-bold hover:underline"
                >
                  (Reset Category)
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs: Prominent Visual Pills */}
          <div className="pt-3 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2.5">
              Shop by Category / उद्योग विभागानुसार निवडा:
            </span>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {/* All Categories Option */}
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSelectedSubCategory("ALL");
                }}
                className={`px-3.5 py-2 rounded-sm text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  selectedCategory === "ALL"
                    ? "bg-navy text-white shadow-sm ring-1 ring-navy"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Categories</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedCategory === "ALL" ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {categoryCounts["ALL"]}
                </span>
              </button>

              {/* Specific Category Buttons */}
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const count = categoryCounts[cat.id] || 0;
                if (count === 0) return null;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedSubCategory("ALL");
                    }}
                    className={`px-3.5 py-2 rounded-sm text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-navy text-white shadow-sm ring-1 ring-navy"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-gold" : "text-stone-500"}`} />
                    <span>{cat.shortName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Category Pills (Shown when a specific category is chosen) */}
          {selectedCategory !== "ALL" && activeSubCategories.length > 0 && (
            <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1 shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Sub-Types:
              </span>
              <button
                onClick={() => setSelectedSubCategory("ALL")}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all shrink-0 cursor-pointer ${
                  selectedSubCategory === "ALL"
                    ? "bg-gold text-navy font-bold shadow-2xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                All {activeCategoryDef?.shortName}
              </button>
              {activeSubCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all shrink-0 cursor-pointer ${
                    selectedSubCategory === sub
                      ? "bg-gold text-navy font-bold shadow-2xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Quick Category Jump Bar when viewing "ALL" */}
          {selectedCategory === "ALL" && !search && (
            <div className="pt-2 border-t border-stone-100 hidden sm:flex items-center gap-2 text-xs text-stone-500 overflow-x-auto">
              <span className="text-[10px] uppercase font-bold text-stone-400 shrink-0">
                Jump to Section:
              </span>
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className="hover:text-navy hover:underline text-stone-600 font-medium whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {cat.shortName} ({count}) •
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-md border border-stone-200 p-12 text-center my-8 shadow-xs">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-navy mb-1">No products found</h3>
            <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
              We couldn&apos;t find any items matching &ldquo;{search}&rdquo;. Try another keyword or switch category filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("ALL");
                setSelectedSubCategory("ALL");
              }}
              className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-sm uppercase tracking-wider hover:bg-gold hover:text-navy transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : selectedCategory === "ALL" && !search ? (
          /* ======================================================== */
          /* CATEGORY-WISE GROUPED VIEW (When "ALL" is selected)       */
          /* ======================================================== */
          <div className="space-y-12">
            {groupedProducts.map(({ category, products }) => {
              const Icon = category.icon;

              return (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  className="scroll-mt-28 space-y-4"
                >
                  {/* Category Header Card */}
                  <div
                    className={`rounded-md p-5 border ${category.accent.bg} ${category.accent.border} flex flex-col md:flex-row md:items-center justify-between gap-4`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-11 h-11 rounded-sm bg-navy text-gold flex items-center justify-center shrink-0 shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg sm:text-xl font-extrabold text-navy">
                            {category.name}
                          </h2>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs ${category.accent.badgeBg}`}
                          >
                            {products.length} Products Available
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                          {category.tagline}
                        </p>
                        <p className="text-[11px] font-semibold text-stone-500 mt-0.5">
                          Fulfillment: <strong className="text-navy">{category.businessNames.join(" • ")}</strong> • {category.badge}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        window.scrollTo({ top: 200, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-50 text-navy font-bold text-xs uppercase tracking-wider rounded-sm border border-stone-300 shadow-2xs self-start md:self-auto cursor-pointer shrink-0 transition-colors"
                    >
                      <span>View Only {category.shortName}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gold-700" />
                    </button>
                  </div>

                  {/* Product Cards Grid for this category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((prod) => renderProductCard(prod))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* ======================================================== */
          /* FOCUSED CATEGORY / SEARCH RESULTS VIEW                   */
          /* ======================================================== */
          <div className="space-y-6">
            {/* Category Hero Info Banner if single category chosen */}
            {activeCategoryDef && !search && (
              <div
                className={`rounded-md p-5 border ${activeCategoryDef.accent.bg} ${activeCategoryDef.accent.border} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-sm bg-navy text-gold flex items-center justify-center shrink-0 shadow-xs">
                    {React.createElement(activeCategoryDef.icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-navy">
                      {activeCategoryDef.name}
                    </h2>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {activeCategoryDef.tagline}
                    </p>
                    <p className="text-[11px] font-semibold text-stone-500 mt-0.5">
                      Fulfillment: <strong className="text-navy">{activeCategoryDef.businessNames.join(" • ")}</strong> • {activeCategoryDef.badge}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSelectedSubCategory("ALL");
                  }}
                  className="text-xs font-bold text-navy hover:text-gold-700 underline shrink-0 cursor-pointer"
                >
                  ← Back to All Categories
                </button>
              </div>
            )}

            {/* Grid of filtered products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => renderProductCard(prod))}
            </div>
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
