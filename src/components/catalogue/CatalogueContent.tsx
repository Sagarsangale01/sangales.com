"use client";

import React from "react";
import ProductCatalogueClient from "@/components/catalogue/ProductCatalogueClient";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import { BusinessRecord } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  businesses: BusinessRecord[];
}

export default function CatalogueContent({ businesses }: Props) {
  const { locale } = useLanguage();

  const heroBadge =
    locale === "mr"
      ? "व्यावसायिक निर्देशिका • समूह उत्पादने"
      : locale === "hi"
      ? "व्यावसायिक निर्देशिका • समूह समाधान"
      : "Commercial Directory • Group Solutions";

  const heroTitle =
    locale === "mr"
      ? "सांगळे समूह उत्पादन व सोल्यूशन्स सूची (Catalogue)"
      : locale === "hi"
      ? "सांगळे समूह उत्पाद एवं समाधान कैटलॉग"
      : "Group Product & Solutions Catalogue";

  const heroDesc =
    locale === "mr"
      ? "आमच्या विविध उपक्रमांमधील उत्पादन पुरवठा, बांधकाम साहित्य, व्यावसायिक लाइटिंग, शेतातील ताजा शेतीमाल, पौष्टिक आहार आणि कॉर्पोरेट सॉफ्टवेअर सोल्यूशन्सची संपूर्ण माहिती येथे मिळवा."
      : locale === "hi"
      ? "हमारे विभिन्न प्रभागों की विनिर्माण सामग्री, भवन निर्माण उत्पाद, वाणिज्यिक प्रकाश व्यवस्था, ताजा कृषि उपज, पौष्टिक भोजन और कॉर्पोरेट सॉफ्टवेयर समाधानों का संपूर्ण कैटलॉग।"
      : "Explore manufacturing supplies, building materials, commercial lighting, fresh farm produce, nutritious meals, and enterprise software platforms across our operating entities.";

  const breadcrumbLabel =
    locale === "mr"
      ? "उत्पादन व सोल्यूशन्स सूची"
      : locale === "hi"
      ? "उत्पाद एवं समाधान कैटलॉग"
      : "Solutions Catalogue";

  const faqTitle =
    locale === "mr"
      ? "खरेदी व ऑर्डर संदर्भात वारंवार विचारले जाणारे प्रश्न (FAQ)"
      : locale === "hi"
      ? "खरीद एवं ऑर्डर संबंधी अक्सर पूछे जाने वाले प्रश्न (FAQ)"
      : "Catalogue Procurement & Ordering FAQ";

  const faqSubtitle =
    locale === "mr"
      ? "किमान ऑर्डर मर्यादा (MOQ), नमुना पाठवणे (Samples) आणि संपूर्ण महाराष्ट्र व भारतभरातील वितरण वेळेबाबत महत्त्वाची उत्तरे."
      : locale === "hi"
      ? "न्यूनतम ऑर्डर मात्रा (MOQ), नमूना प्रेषण और महाराष्ट्र व भारत भर में डिलीवरी समय सीमा पर महत्वपूर्ण प्रश्नोत्तरी।"
      : "Frequently asked questions on minimum order quantities (MOQ), sample dispatch, and delivery timelines across Maharashtra and Pan-India.";

  return (
    <div className="pt-24 pb-24 bg-offwhite min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
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
              {heroBadge}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-stone-200 font-light leading-relaxed">
              {heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-16">
        {/* Breadcrumb Trail */}
        <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-sm border border-stone-200 shadow-sm inline-block">
          <Breadcrumbs items={[{ label: breadcrumbLabel, href: "/catalogue" }]} />
        </div>

        {/* Interactive Catalogue Client */}
        <ProductCatalogueClient businesses={businesses} />

        {/* Procurement FAQ */}
        <div className="border-t border-stone-200 pt-16">
          <FAQSection
            title={faqTitle}
            subtitle={faqSubtitle}
          />
        </div>
      </div>
    </div>
  );
}

