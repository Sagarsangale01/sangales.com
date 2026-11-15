"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  MessageCircle,
  ArrowUpRight,
  Send,
  Building,
  Package,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { BusinessRecord, ProductRecord } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { buildAttributedWhatsAppUrl } from "@/lib/utm";
import { trackWhatsAppClick } from "@/lib/analytics";

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
  {
    id: "ALL",
    labelEn: "All Offerings",
    labelMr: "सर्व उत्पादने",
    labelHi: "सभी उत्पाद",
    businessSlug: undefined,
  },
  {
    id: "packaging",
    labelEn: "Packaging & Disposables",
    labelMr: "पॅकेजिंग व डिस्पोजेबल्स",
    labelHi: "पैकेजिंग एवं डिस्पोजेबल्स",
    businessSlug: "sangales-packaging",
  },
  {
    id: "trading",
    labelEn: "PVC & Interior Materials",
    labelMr: "पीव्हीसी व इंटीरियर साहित्य",
    labelHi: "पीवीसी एवं इंटीरियर सामग्री",
    businessSlug: "sangales-trading",
  },
  {
    id: "enterprises",
    labelEn: "Electrical & LED Lighting",
    labelMr: "इलेक्ट्रिकल व एलईडी लाइटिंग",
    labelHi: "इलेक्ट्रिकल एवं एलईडी लाइटिंग",
    businessSlug: "sangales-enterprises",
  },
  {
    id: "food",
    labelEn: "Fresh Foods & Sprout Bowls",
    labelMr: "ताजे अन्नपदार्थ व स्प्राउट बाऊल",
    labelHi: "ताजा आहार एवं स्प्राउट बाउल",
    businessSlug: "annamrit-foods",
  },
  {
    id: "farms",
    labelEn: "Farm Harvest & Millets",
    labelMr: "शेतमाल व तृणधान्ये (Millets)",
    labelHi: "खेत उपज एवं मिलेट्स",
    businessSlug: "sangales-farms",
  },
  {
    id: "ghee",
    labelEn: "Vedic A2 Ghee & Dairy",
    labelMr: "वैदिक A2 तूप व दुग्ध उत्पादने",
    labelHi: "वैदिक A2 घी एवं डेयरी",
    businessSlug: "anvayi-farms",
  },
  {
    id: "digital",
    labelEn: "CRM, AI & Web Solutions",
    labelMr: "सीआरएम, एआय व वेब सोल्यूशन्स",
    labelHi: "सीआरएम, एआई एवं वेब समाधान",
    businessSlug: "sangales-digital",
  },
];

export default function ProductCatalogueClient({ businesses }: ProductCatalogueClientProps) {
  const { locale } = useLanguage();
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
    return allProducts
      .filter((item) => {
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
      })
      .sort((a, b) => {
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

  // Localized string constants
  const searchPlaceholder =
    locale === "mr"
      ? "उत्पादने, साहित्य, अन्नपदार्थ, एलईडी किंवा सॉफ्टवेअर शोधा..."
      : locale === "hi"
      ? "उत्पाद, निर्माण सामग्री, खाद्य सामग्री, एलईडी अथवा सॉफ्टवेयर खोजें..."
      : "Search products, materials, food items, LED, or software...";

  const allEntitiesLabel =
    locale === "mr"
      ? `सर्व व्यावसायिक घटक (${businesses.length})`
      : locale === "hi"
      ? `सभी व्यावसायिक इकाइयां (${businesses.length})`
      : `All Business Entities (${businesses.length})`;

  const sortDefaultLabel =
    locale === "mr" ? "पूर्वनिर्धारित क्रम" : locale === "hi" ? "डिफ़ॉल्ट क्रम" : "Default Order";

  const sortNameLabel =
    locale === "mr" ? "उत्पादनाचे नाव (A-Z)" : locale === "hi" ? "उत्पाद का नाम (A-Z)" : "Product Name (A-Z)";

  const sortBizLabel =
    locale === "mr" ? "व्यवसायानुसार" : locale === "hi" ? "व्यावसायिक इकाई अनुसार" : "By Business Unit";

  const sectorsLabel =
    locale === "mr" ? "उद्योग क्षेत्र:" : locale === "hi" ? "उद्योग क्षेत्र:" : "Sectors:";

  const showingLabel =
    locale === "mr"
      ? `${allProducts.length} पैकी ${filteredProducts.length} उत्पादने दर्शवत आहे`
      : locale === "hi"
      ? `${allProducts.length} में से ${filteredProducts.length} समाधान प्रदर्शित`
      : `Showing ${filteredProducts.length} of ${allProducts.length} Solutions`;

  const resetLabel =
    locale === "mr" ? "फिल्टर रीसेट करा" : locale === "hi" ? "फ़िल्टर रीसेट करें" : "Reset Filters";

  const assuranceTag =
    locale === "mr"
      ? "सांगळे समूहाच्या कॉर्पोरेट विश्वासार्हतेचे अधिष्ठान"
      : locale === "hi"
      ? "सांगळे समूह के कॉर्पोरेट सुशासन द्वारा समर्थित"
      : "All products backed by SANGALES Corporate Governance";

  const noResultsTitle =
    locale === "mr"
      ? "कोणतेही उत्पादन आढळले नाही"
      : locale === "hi"
      ? "कोई मेल खाता उत्पाद नहीं मिला"
      : "No Matching Offerings Found";

  const noResultsDesc =
    locale === "mr"
      ? `आम्हाला "${search}" शी जुळणारे कोणतेही उत्पादन आढळले नाही. कृपया इतर शब्द वापरून पहा किंवा फिल्टर हटवा.`
      : locale === "hi"
      ? `हमें "${search}" से मेल खाता कोई उत्पाद नहीं मिला। कृपया अन्य शब्द खोजें अथवा फ़िल्टर हटाएं।`
      : `We couldn't find any offerings matching "${search}". Try adjusting your keywords or clearing the category filter.`;

  const showAllBtn =
    locale === "mr"
      ? "सर्व समूह उत्पादने पहा"
      : locale === "hi"
      ? "सभी समूह उत्पाद देखें"
      : "Show All Group Solutions";

  const whatsappBtnLabel =
    locale === "mr"
      ? "व्हॉट्सॲपवर चौकशी"
      : locale === "hi"
      ? "व्हाट्सएप पूछताछ"
      : "Inquire via WhatsApp";

  const buyOnlineLabel =
    locale === "mr" ? "ऑनलाइन खरेदी करा" : locale === "hi" ? "ऑनलाइन खरीदें" : "Buy Online";

  const b2bRfpLabel =
    locale === "mr" ? "घाऊक दरपत्रक (RFP)" : locale === "hi" ? "थोक कोटेशन (RFP)" : "B2B RFP";

  const bannerBadge =
    locale === "mr"
      ? "कस्टम उत्पादन • संस्थात्मक पुरवठा"
      : locale === "hi"
      ? "कस्टम विनिर्माण • संस्थात्मक आपूर्ति"
      : "Custom Manufacturing • Institutional Supply";

  const bannerTitle =
    locale === "mr"
      ? "विशेष मोजमापे किंवा दीर्घकालीन पुरवठा करार हवे आहेत का?"
      : locale === "hi"
      ? "क्या आपको विशेष विनिर्देश अथवा दीर्घकालिक आपूर्ति समझौते चाहिए?"
      : "Need Non-Standard Specifications or Long-Term Procurement Agreements?";

  const bannerDesc =
    locale === "mr"
      ? "आमची उत्पादन आणि पुरवठा युनिट्स सानुकूलित बॉक्स आकार, कट-टू-साइज पीव्हीसी पॅनेल, व्यावसायिक लाइटिंग निविदा आणि हंगामी शेतीमाल पुरवठा करारांसाठी सज्ज आहेत."
      : locale === "hi"
      ? "हमारी विनिर्माण और सोर्सिंग इकाइयाँ कस्टमाइज़्ड बॉक्स साइज, विशेष पीवीसी पैनल कट, वाणिज्यिक लाइटिंग निविदाओं और मौसमी कृषि आपूर्ति अनुबंधों को पूरा करने में सक्षम हैं।"
      : "Our manufacturing and sourcing units accommodate customized box dimensions, tailored PVC panel cuts, commercial lighting architectural tenders, and seasonal agricultural forward contracts.";

  const rfpBtn =
    locale === "mr"
      ? "कस्टम दरपत्रक मागा (RFP)"
      : locale === "hi"
      ? "कस्टम कोटेशन मांगें (RFP)"
      : "Request Custom RFP";

  const chatDeskBtn =
    locale === "mr" ? "थेट चॅट करा" : locale === "hi" ? "सीधे चैट करें" : "Chat Desk";

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
              placeholder={searchPlaceholder}
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
                <option value="ALL">{allEntitiesLabel}</option>
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
                <option value="default">{sortDefaultLabel}</option>
                <option value="name">{sortNameLabel}</option>
                <option value="business">{sortBizLabel}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Industry Filter Pills */}
        <div className="border-t border-stone-100 pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-navy uppercase tracking-wider mr-2 hidden sm:inline-block">
            {sectorsLabel}
          </span>
          {INDUSTRY_FILTERS.map((pill) => {
            const isActive = selectedIndustry === pill.id;
            const label =
              locale === "mr"
                ? pill.labelMr
                : locale === "hi"
                ? pill.labelHi
                : pill.labelEn;

            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => {
                  setSelectedIndustry(pill.id);
                  setSelectedBusiness("ALL");
                }}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-navy text-gold shadow-sm ring-1 ring-gold"
                    : "bg-offwhite hover:bg-stone-200/80 text-charcoal border border-stone-200/60"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-navy">
            {showingLabel}
          </span>
          {(search || selectedIndustry !== "ALL" || selectedBusiness !== "ALL") && (
            <button
              onClick={clearFilters}
              className="text-xs text-gold-700 hover:text-navy underline font-medium ml-2 cursor-pointer"
            >
              {resetLabel}
            </button>
          )}
        </div>

        <div className="text-xs text-stone-500 font-medium hidden sm:block">
          {assuranceTag}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-sm border border-stone-200 space-y-4">
          <Package className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-navy">{noResultsTitle}</h3>
          <p className="text-sm text-charcoal-100 max-w-md mx-auto">
            {noResultsDesc}
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 bg-navy text-gold font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-all cursor-pointer"
          >
            {showAllBtn}
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
                    href={buildAttributedWhatsAppUrl(
                      "917507700936",
                      `Hello SANGALES, I would like to enquire about ${prod.name} from ${prod.businessName}.`,
                      prod.businessSlug
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackWhatsAppClick({
                        businessName: prod.businessName,
                        businessSlug: prod.businessSlug,
                        productName: prod.name,
                        source: "catalogue_grid",
                      });
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{whatsappBtnLabel}</span>
                  </a>

                  {/* Buy Online (if available) or Direct Business Profile */}
                  {prod.directBuyUrl ? (
                    <a
                      href={prod.directBuyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-1"
                    >
                      <span>{buyOnlineLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={`/contact?type=Wholesale&business=${prod.businessId}`}
                      className="px-3 py-2 bg-stone-100 hover:bg-navy hover:text-gold text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-1"
                    >
                      <span>{b2bRfpLabel}</span>
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
            {bannerBadge}
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
            {bannerTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            {bannerDesc}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/contact?type=Partnership"
            className="px-6 py-3.5 bg-gold hover:bg-white text-navy font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>{rfpBtn}</span>
            <Send className="w-3.5 h-3.5" />
          </Link>
          <a
            href={buildAttributedWhatsAppUrl(
              "917507700936",
              "Hello SANGALES Corporate Desk, I have a custom bulk specification requirement.",
              "catalogue_custom_rfp"
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppClick({
                source: "catalogue_bottom_rfp",
              });
            }}
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-widest rounded-sm transition-all border border-white/20 inline-flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>{chatDeskBtn}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
