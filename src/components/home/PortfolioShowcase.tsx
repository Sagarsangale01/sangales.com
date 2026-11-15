"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, Sparkles, Rocket } from "lucide-react";
import { BusinessRecord } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  businesses: BusinessRecord[];
}

export default function PortfolioShowcase({ businesses }: Props) {
  const { dict, locale } = useLanguage();

  const getBusinessCtaText = (slug: string) => {
    if (dict.businesses && dict.businesses[slug]?.cta) {
      return dict.businesses[slug].cta;
    }
    switch (slug) {
      case "annamrit-foods":
        return locale === "mr" ? "ऑर्डर करा" : locale === "hi" ? "ऑर्डर करें" : "Order Now";
      case "sangales-farms":
        return locale === "mr" ? "उत्पादन चौकशी" : locale === "hi" ? "उत्पाद पूछताछ" : "Product Enquiry";
      case "sangales-enterprises":
        return locale === "mr" ? "उत्पादने पहा" : locale === "hi" ? "उत्पाद देखें" : "Explore Products";
      case "sangales-trading":
        return locale === "mr" ? "व्यावसायिक चौकशी" : locale === "hi" ? "व्यावसायिक पूछताछ" : "Business Enquiry";
      case "sangales-packaging":
        return locale === "mr" ? "घाऊक दरपत्रक मागवा" : locale === "hi" ? "थोक कोटेशन मांगें" : "Request Wholesale Quote";
      case "sangales-digital":
        return locale === "mr" ? "सेवा पहा" : locale === "hi" ? "सेवाएं देखें" : "Explore Services";
      default:
        return locale === "mr" ? "माहिती पहा" : locale === "hi" ? "विवरण देखें" : "Explore Profile";
    }
  };

  const getLocalizedBusiness = (biz: BusinessRecord) => {
    const loc = dict.businesses && dict.businesses[biz.slug];
    return {
      ...biz,
      name: loc?.name || biz.name,
      category: loc?.category || biz.category,
      tagline: loc?.tagline || biz.tagline,
    };
  };

  const published = businesses.filter((b) => b.status === "PUBLISHED");
  const upcoming = businesses.filter((b) => b.status === "UPCOMING");
  const associate = published.find((b) => b.isAssociate || b.slug === "anvayi-farms");
  const groupOperating = published.filter((b) => !b.isAssociate && b.slug !== "anvayi-farms");
  const featured = groupOperating.find((b) => b.slug === "annamrit-foods") || groupOperating[0];
  const others = groupOperating.filter((b) => b.id !== featured?.id);

  const locFeatured = featured ? getLocalizedBusiness(featured) : null;
  const locAssociate = associate ? getLocalizedBusiness(associate) : null;

  const sectionBadge =
    locale === "mr"
      ? "समूहाचा व्यावसायिक पोर्टफोलिओ"
      : locale === "hi"
      ? "समूह का व्यावसायिक पोर्टफोलियो"
      : "Corporate Portfolio";

  const sectionTitle =
    locale === "mr"
      ? "समूहातील कार्यरत व्यवसाय"
      : locale === "hi"
      ? "समूह के सक्रिय उद्यम"
      : "Our Operating Businesses";

  const sectionDesc =
    locale === "mr"
      ? "सांगळे समूहातील प्रत्येक व्यवसाय आपली स्वतंत्र ओळख आणि विशेष कौशल्याने कार्य करत असताना, समूहाचे उच्च प्रशासन आणि एकत्रित संसाधनांचा त्यांना पूर्ण पाठिंबा आहे."
      : locale === "hi"
      ? "सांगळे समूह का प्रत्येक उद्यम अपनी स्वतंत्र ब्रांड पहचान और विशेषज्ञता के साथ कार्य करता है, जिसे समूह के साझा संसाधनों और सुदृढ़ प्रशासन का सहयोग प्राप्त है।"
      : "Each enterprise operates with independent brand authority and deep domain specialization, reinforced by the shared governance and resources of SANGALES.";

  const viewAllText =
    locale === "mr"
      ? "समूहातील सर्व व्यवसाय पहा"
      : locale === "hi"
      ? "समूह के सभी व्यवसाय देखें"
      : dict.actions.viewAllBusinesses || "View All Group Businesses";

  const flagshipBadge =
    locale === "mr"
      ? "प्रमुख फ्लॅगशिप ब्रँड"
      : locale === "hi"
      ? "प्रमुख फ्लैगशिप ब्रांड"
      : "Featured Flagship Brand";

  const cateringEnquiryText =
    locale === "mr"
      ? "घाऊक व केटरिंग मागणी चौकशी →"
      : locale === "hi"
      ? "थोक एवं केटरिंग आवश्यकता पूछताछ →"
      : "Wholesale & Catering Enquiry →";

  const associateBadge =
    locale === "mr"
      ? "धोरणात्मक सहयोगी उपक्रम • स्वतंत्र कार्य"
      : locale === "hi"
      ? "रणनीतिक सहयोगी उद्यम • स्वतंत्र संचालन"
      : "Strategic Associate Enterprise • Dedicated Operation";

  const associateDescription =
    locale === "mr"
      ? "अन्वयी फार्म्स हा सांगळे समूहाच्या धोरणात्मक सहकार्याने स्वतंत्रपणे चालवला जाणारा उपक्रम आहे. पारंपारिक वैदिक बिलोना पद्धत आणि देशी गायींच्या संवर्धनावर आधारित, अन्वयी फार्म्स शुद्धता आणि नैसर्गिक पोषण जपण्यासाठी कटिबद्ध आहे."
      : locale === "hi"
      ? "अन्वयी फार्म्स सांगळे समूह के रणनीतिक सहयोग से स्वतंत्र रूप से संचालित उद्यम है। पारंपरिक वैदिक बिलोना मंथन और देशी गौ-संवर्धन पर आधारित, अन्वयी फार्म्स प्राकृतिक पोषण और प्राचीन परंपराओं को समर्पित है।"
      : "Anvayi Farms is a strategic associate enterprise operating independently in dedicated collaboration with SANGALES. Grounded in traditional Vedic bilona churning and natural desi cow care, Anvayi Farms preserves time-tested heritage and natural nutrition.";

  const exploreAssociateBtn =
    locale === "mr"
      ? "सहयोगी उपक्रम माहिती पहा"
      : locale === "hi"
      ? "सहयोगी उद्यम का विवरण देखें"
      : "Explore Associate Profile";

  const officialWebsiteText =
    locale === "mr"
      ? "अधिकृत वेबसाइट (anvayifarms.com)"
      : locale === "hi"
      ? "आधिकारिक वेबसाइट (anvayifarms.com)"
      : "Official Website (anvayifarms.com)";

  const heritageTitle =
    locale === "mr"
      ? "वैदिक ए२ देशी गाय बिलोना तूप"
      : locale === "hi"
      ? "वैदिक ए2 देशी गाय बिलोना घी"
      : "Vedic A2 Desi Cow Bilona Ghee";

  const heritageDesc =
    locale === "mr"
      ? "महाराष्ट्रात पारंपारिक पद्धतीने विरजण लावून तयार केलेल्या ए२ दह्यापासून हळुवार मंथन करून बनवलेले शुद्ध साजूक तूप."
      : locale === "hi"
      ? "महाराष्ट्र में पारंपरिक वैदिक विधि से तैयार ए2 दही से धीमी गति से मथा गया शुद्ध घी।"
      : "Slow-churned from cultured A2 curd under traditional protocols in Maharashtra.";

  const upcomingPipelineBadge =
    locale === "mr"
      ? "नियोजित उपक्रम"
      : locale === "hi"
      ? "प्रस्तावित उपक्रम"
      : "Strategic Incubation Pipeline";

  const upcomingTitle =
    locale === "mr"
      ? "समूहातील आगामी उपक्रम"
      : locale === "hi"
      ? "समूह के आगामी उद्यम"
      : "Upcoming Group Ventures";

  const upcomingDesc =
    locale === "mr"
      ? "नियोजनाधीन आणि विकासाच्या टप्प्यात असणारे नवीन व्यावसायिक उपक्रम."
      : locale === "hi"
      ? "योजना और प्रारंभिक विकास चरण में अग्रसर नए व्यावसायिक उपक्रम।"
      : "Emerging business identities in planning, feasibility analysis, or preliminary infrastructure incubation.";

  const upcomingTag =
    locale === "mr"
      ? "आगामी उपक्रम"
      : locale === "hi"
      ? "आगामी उपक्रम"
      : "Upcoming Venture";

  const exploreIncubationText =
    locale === "mr"
      ? "नियोजन तपशील पहा"
      : locale === "hi"
      ? "परियोजना विवरण देखें"
      : "Explore Incubation Details";

  const solutionsBadge =
    locale === "mr"
      ? "एकत्रित पुरवठा • ३४+ उत्पादने व सेवा"
      : locale === "hi"
      ? "एकीकृत आपूर्ति • 34+ उत्पाद एवं सेवाएं"
      : "Consolidated Offerings • 34+ Solutions";

  const solutionsTitle =
    locale === "mr"
      ? "आपण विशिष्ट उत्पादने, पॅकेजिंग आकार किंवा घाऊक दरांच्या शोधात आहात का?"
      : locale === "hi"
      ? "क्या आप विशिष्ट उत्पादों, पैकेजिंग साइज़ या थोक दरों की खोज में हैं?"
      : "Looking for specific products, packaging dimensions, or wholesale rates?";

  const solutionsDesc =
    locale === "mr"
      ? "फूड पॅकेजिंग कंटेनर्स, पीव्हीसी इंटीरियर पॅनेल्स, कमर्शियल एलईडी लाईट्स, सेंद्रिय शेती उत्पादने आणि कॉर्पोरेट सॉफ्टवेअर सोल्यूशन्सची आमची संपूर्ण सूची पहा."
      : locale === "hi"
      ? "फ़ूड पैकेजिंग कंटेनर्स, पीवीसी इंटीरियर पैनल्स, कमर्शियल एलईडी लाइट्स, प्राकृतिक कृषि उत्पाद और कॉर्पोरेट सॉफ्टवेयर की हमारी विस्तृत सूची देखें।"
      : "Explore our unified commercial catalogue spanning packaging containers, PVC interior panels, commercial LED fixtures, organic farm produce, and enterprise CRM solutions.";

  const exploreCatalogueBtn =
    locale === "mr"
      ? "संपूर्ण उत्पादन सूची पहा"
      : locale === "hi"
      ? "सम्पूर्ण उत्पाद सूची देखें"
      : dict.actions.viewCatalogue || "Explore Solutions Catalogue";

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase mb-3">
              <span className="w-8 h-[2px] bg-gold-600" />
              {sectionBadge}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">
              {sectionTitle}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-charcoal-100">
              {sectionDesc}
            </p>
          </div>

          <Link
            href="/businesses"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors shrink-0 group"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 1. Featured Flagship Business: Annamrit Foods */}
        {locFeatured && (
          <div className="mb-12 bg-offwhite rounded-sm overflow-hidden border border-stone-200/80 shadow-editorial transition-all hover:shadow-editorial-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Featured Visual */}
              <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[480px]">
                <img
                  src={locFeatured.coverImage}
                  alt={locFeatured.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-3 py-1 bg-navy/90 backdrop-blur-md text-gold text-xs font-bold tracking-wider uppercase rounded-sm border border-gold/30">
                  <Sparkles className="w-3.5 h-3.5" /> {flagshipBadge}
                </div>
              </div>

              {/* Featured Details */}
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
                      {locFeatured.category}
                    </span>
                    {locFeatured.logo && (
                      <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow border border-gold/30 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={locFeatured.logo}
                          alt={locFeatured.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
                    {locFeatured.name}
                  </h3>
                  <p className="text-sm font-medium text-gold-800 italic">
                    &quot;{locFeatured.tagline}&quot;
                  </p>
                  <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                    {locFeatured.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 space-y-2">
                    {locFeatured.strengths?.slice(0, 3).map((st, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-charcoal-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href={`/businesses/${locFeatured.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-all shadow-md group"
                  >
                    <span>{getBusinessCtaText(locFeatured.slug)} &bull; {dict.actions.viewDetails || "View Profile"}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href={`/contact?business=${locFeatured.id}&type=Product`}
                    className="inline-flex items-center justify-center px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold transition-colors text-center"
                  >
                    {cateringEnquiryText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Grid of other Operating Businesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {others.map((b) => {
            const biz = getLocalizedBusiness(b);
            return (
              <div
                key={biz.id}
                className="group bg-offwhite rounded-sm overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative h-52 overflow-hidden bg-navy-900">
                    <img
                      src={biz.coverImage}
                      alt={biz.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider text-gold bg-navy/80 px-2.5 py-1 rounded-sm backdrop-blur-sm">
                      {biz.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-heading text-xl font-bold text-navy group-hover:text-gold-700 transition-colors">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-charcoal-100 line-clamp-3 leading-relaxed">
                      {biz.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="p-6 pt-0 border-t border-stone-200/60 mt-4">
                  <Link
                    href={`/businesses/${biz.slug}`}
                    className="pt-3 inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors"
                  >
                    <span>{getBusinessCtaText(biz.slug)}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-gold" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2.5 Strategic Associate Enterprise: Anvayi Farms */}
        {locAssociate && (
          <div className="mt-16 bg-gradient-to-br from-navy-950 via-navy-900 to-[#122319] text-white rounded-sm overflow-hidden border border-emerald-500/30 shadow-xl">
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-sm border border-emerald-500/40">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>{associateBadge}</span>
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    {locAssociate.name}
                  </h3>

                  <p className="text-base sm:text-lg text-gold font-medium italic">
                    &quot;{locAssociate.tagline}&quot;
                  </p>

                  <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                    {associateDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {locAssociate.strengths?.slice(0, 4).map((str, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/businesses/${locAssociate.slug}`}
                      className="px-6 py-3.5 bg-gold hover:bg-white text-navy font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <span>{exploreAssociateBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {locAssociate.website && (
                      <a
                        href={locAssociate.website}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all border border-white/20 inline-flex items-center gap-2"
                      >
                        <span>{officialWebsiteText}</span>
                        <ArrowUpRight className="w-4 h-4 text-gold" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Visual Feature */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-sm overflow-hidden border border-emerald-500/30 bg-navy-950 shadow-2xl">
                    <img
                      src="/images/anvayi-farms/anvayi-bilona-method.png"
                      alt="Anvayi Farms Vedic Bilona Method"
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-navy-900/90 backdrop-blur-md border border-white/10 rounded-sm space-y-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">{locale === "mr" ? "पारंपारिक मंथन पद्धत" : locale === "hi" ? "प्राचीन मंथन विधि" : "Heritage Churning"}</span>
                      <h4 className="text-sm font-bold text-white">{heritageTitle}</h4>
                      <p className="text-xs text-stone-300">{heritageDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Upcoming Ventures Horizon */}
        {upcoming.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-600 text-xs font-bold tracking-superwide uppercase mb-1">
                  <Rocket className="w-4 h-4 text-amber-500" />
                  <span>{upcomingPipelineBadge}</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                  {upcomingTitle}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-100 mt-1">
                  {upcomingDesc}
                </p>
              </div>

              <Link
                href="/businesses"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors shrink-0"
              >
                <span>{viewAllText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((biz) => (
                <div
                  key={biz.id}
                  className="bg-offwhite rounded-sm overflow-hidden border border-amber-200/80 shadow-sm hover:shadow-editorial transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-navy-950">
                      <img
                        src={biz.coverImage}
                        alt={biz.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-amber-600 px-2.5 py-1 rounded-sm flex items-center gap-1">
                        <Rocket className="w-3 h-3 text-gold" /> {upcomingTag}
                      </span>
                      <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider text-gold bg-navy/80 px-2 py-0.5 rounded-sm">
                        {biz.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="font-heading text-lg font-bold text-navy group-hover:text-gold transition-colors">
                        {biz.name}
                      </h4>
                      {biz.tagline && (
                        <p className="text-xs text-gold-700 italic font-medium">
                          &quot;{biz.tagline}&quot;
                        </p>
                      )}
                      <p className="text-xs text-charcoal-100 line-clamp-2 leading-relaxed">
                        {biz.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-200/60 mt-3">
                    <Link
                      href={`/businesses/${biz.slug}`}
                      className="pt-3 inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors"
                    >
                      <span>{exploreIncubationText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solutions & Consolidated Catalogue Discovery Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-offwhite border border-stone-200/80 rounded-sm shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 block">
              {solutionsBadge}
            </span>
            <h4 className="font-heading text-lg font-bold text-navy">
              {solutionsTitle}
            </h4>
            <p className="text-xs text-charcoal-100 font-light leading-relaxed">
              {solutionsDesc}
            </p>
          </div>
          <Link
            href="/catalogue"
            className="px-6 py-3.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md shrink-0 inline-flex items-center gap-2 group"
          >
            <span>{exploreCatalogueBtn}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

