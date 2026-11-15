"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building, TrendingUp } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  settings?: SiteSettings;
}

export default function GroupPhilosophy({ settings }: Props) {
  const { dict, locale } = useLanguage();

  const subtitle =
    locale === "mr"
      ? "उद्योग ओळख आणि कार्यप्रणाली"
      : locale === "hi"
      ? "कॉर्पोरेट पहचान एवं कार्यप्रणाली"
      : settings?.aboutSubtitle || "Corporate Identity & Philosophy";

  const headline =
    locale === "mr"
      ? "एकच ध्येय. बहुआयामी व्यवसाय."
      : locale === "hi"
      ? "एक साझा विज़न. बहुआयामी व्यवसाय."
      : settings?.aboutHeadline || "One Vision. Multiple Businesses.";

  const desc1 =
    locale === "mr"
      ? "सांगळे समूह हा विविध क्षेत्रांत कार्यरत असणारा एक अग्रगण्य भारतीय उद्योग समूह आहे. थेट शेतातील दर्जेदार पिके व पौष्टिक आहार उत्पादनांपासून ते घाऊक पुरवठा, स्टील-बांधकाम साहित्य, औद्योगिक दर्जाचे पॅकेजिंग आणि आधुनिक डिजिटल तंत्रज्ञानापर्यंत — प्रत्येक क्षेत्रात विश्वासार्ह मूल्य निर्मिती हेच आमचे मूळ उद्दिष्ट आहे."
      : locale === "hi"
      ? "सांगळे समूह विभिन्न औद्योगिक क्षेत्रों में सक्रिय एक प्रगतिशील भारतीय व्यापारिक समूह है। खेतों की ताज़ा उपज और पौष्टिक आहार से लेकर थोक निर्माण सामग्री, औद्योगिक पैकेजिंग और आधुनिक डिजिटल टेक्नोलॉजी तक — हम दीर्घकालिक एवं स्थायी मूल्य निर्माण में विश्वास रखते हैं।"
      : settings?.aboutDescription ||
        "SANGALES is a diversified business group bringing together business initiatives across multiple industries. From farm gate cultivation and wholesome pantry essentials to wholesale enterprise supplies, trading networks, and engineered packaging, we believe true corporate strength lies in patient value creation.";

  const desc2 =
    locale === "mr"
      ? "सांगळे समूहातील प्रत्येक व्यवसाय आपली स्वतंत्र ओळख, ग्राहकांशी जोडलेली नाळ आणि क्षेत्रातील विशेष प्राविण्य जपत असतानाच, समूहाच्या उच्च व्यावसायिक शिस्त, पारदर्शकता आणि दीर्घकालीन सहकार्याच्या मूल्यांवर आधारलेला आहे."
      : locale === "hi"
      ? "सांगळे समूह का प्रत्येक उपक्रम अपनी विशिष्ट पहचान, ग्राहक संबंधों और विशेषज्ञता को बनाए रखते हुए समूह के सख्त गुणवत्ता मानकों, पूर्ण पारदर्शिता और दीर्घकालिक भरोसे के साथ आगे बढ़ रहा है।"
      : settings?.aboutSecondaryText ||
        "Every business under the SANGALES umbrella retains its dedicated brand ethos, client connections, and specialized domain expertise—while anchoring itself in group-wide standards of operational discipline, transparency, and long-term partnership reliability.";

  const govTitle =
    locale === "mr"
      ? "कॉर्पोरेट प्रशासन"
      : locale === "hi"
      ? "कॉर्पोरेट प्रशासन"
      : "Corporate Governance";

  const govDesc =
    locale === "mr"
      ? "पारदर्शक व्यवस्थापन आणि सर्वोच्च संस्थात्मक कार्यपद्धती."
      : locale === "hi"
      ? "पारदर्शी प्रबंधन और सर्वोच्च व्यावसायिक मानक।"
      : "Transparent stewardship and institutional operational principles.";

  const growthTitle =
    locale === "mr"
      ? "शाश्वत प्रगती"
      : locale === "hi"
      ? "सतत विकास"
      : "Sustainable Growth";

  const growthDesc =
    locale === "mr"
      ? "स्थानिक पुरवठादार आणि शेतकरी बंधूंना सोबत घेऊन चालणारी दीर्घकालीन प्रगती."
      : locale === "hi"
      ? "स्थानीय आपूर्ति श्रृंखला और उत्पादकों को सशक्त बनाने वाली टिकाऊ प्रगति।"
      : "Value-focused expansion that uplifts local supply ecosystems.";

  const readMoreText =
    locale === "mr"
      ? "संपूर्ण समूह माहिती वाचा"
      : locale === "hi"
      ? "विस्तृत समूह विवरण पढ़ें"
      : dict.actions.corporateProfile || "Read Full Corporate Profile";

  const commitmentBadge =
    locale === "mr"
      ? "पालक समूहाची वचनबद्धता"
      : locale === "hi"
      ? "मूल समूह की प्रतिबद्धता"
      : "Parent Group Commitment";

  const commitmentText =
    locale === "mr"
      ? "समूहातील प्रत्येक व्यवसायाला धोरणात्मक पाठबळ, वितरण नेटवर्क आणि परिचालन उत्कृष्टतेची जोड."
      : locale === "hi"
      ? "समूह के सभी उद्यमों को रणनीतिक संबल, वितरण तंत्र और परिचालन श्रेष्ठता प्रदान करना।"
      : "Empowering our portfolio companies with strategic capital, distribution reach, and operational excellence.";

  const industrySegmentsLabel =
    locale === "mr" ? "प्रमुख उद्योग क्षेत्र" : locale === "hi" ? "प्रमुख कार्यक्षेत्र" : "Target Industry Segments";

  const industrySegmentsValue =
    locale === "mr"
      ? "अन्न उत्पादने • शेती • प्रकाश व्यवस्था • स्टील व ट्रेडिंग • पॅकेजिंग"
      : locale === "hi"
      ? "खाद्य उत्पाद • कृषि • लाइटिंग • ट्रेडिंग • पैकेजिंग"
      : "Food • Agri • Lighting • Trading • Packaging";

  const hqLabel =
    locale === "mr" ? "मुख्य कार्यालय" : locale === "hi" ? "मुख्यालय" : "Headquarters";

  const hqValue =
    locale === "mr"
      ? "पंचवटी, नाशिक, महाराष्ट्र, भारत"
      : locale === "hi"
      ? "पंचवटी, नाशिक, महाराष्ट्र, भारत"
      : settings?.corporateAddress || "Nashik, Maharashtra, India";

  const philosophyLabel =
    locale === "mr" ? "कार्यसंस्कृती" : locale === "hi" ? "कार्यदर्शन" : "Operational Philosophy";

  const philosophyValue =
    locale === "mr"
      ? "ग्राहकहित प्रथम • अढळ विश्वास"
      : locale === "hi"
      ? "ग्राहक प्राथमिकता • अटूट विश्वास"
      : "Customer Centric • Long-term Trust";

  return (
    <section className="py-20 lg:py-28 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase">
              <span className="w-8 h-[2px] bg-gold-600" />
              {subtitle}
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
              {headline}
            </h2>

            <p className="text-base sm:text-lg text-charcoal leading-relaxed">
              {desc1}
            </p>

            <p className="text-sm sm:text-base text-charcoal-100 leading-relaxed">
              {desc2}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border border-stone-200/60 shadow-sm">
                <Building className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy">{govTitle}</h4>
                  <p className="text-xs text-charcoal-100 mt-0.5">{govDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-white border border-stone-200/60 shadow-sm">
                <TrendingUp className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy">{growthTitle}</h4>
                  <p className="text-xs text-charcoal-100 mt-0.5">{growthDesc}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold tracking-wider uppercase group"
              >
                <span>{readMoreText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-gold" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Feature Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-stone-200 bg-white">
              <div className="relative h-80 sm:h-96">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"
                  alt="Sangales Group Leadership and Strategy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[10px] tracking-superwide font-bold uppercase text-gold">
                    {commitmentBadge}
                  </span>
                  <p className="font-heading text-lg font-bold">
                    {commitmentText}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-navy text-stone-200 space-y-3">
                <div className="flex items-center justify-between border-b border-navy-800 pb-2 text-xs">
                  <span className="text-stone-400">{industrySegmentsLabel}</span>
                  <span className="text-white font-semibold">{industrySegmentsValue}</span>
                </div>
                <div className="flex items-center justify-between border-b border-navy-800 pb-2 text-xs">
                  <span className="text-stone-400">{hqLabel}</span>
                  <span className="text-white font-semibold">{hqValue}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">{philosophyLabel}</span>
                  <span className="text-gold font-semibold">{philosophyValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
