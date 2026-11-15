"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { MilestoneRecord, INITIAL_MILESTONES } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  milestones?: MilestoneRecord[];
}

const LOCALIZED_MILESTONES = {
  mr: [
    {
      year: "प्रारंभ",
      title: "ध्येयवादी सुरुवात व व्यावसायिक पायाभरणी",
      description:
        "सांगळे समूहाची स्थापना एका भक्कम पायावर झाली: दैनंदिन अत्यावश्यक वस्तू, अढळ गुणवत्ता आणि दीर्घकालीन विश्वासार्हतेवर आधारलेला सशक्त भारतीय उद्योग उभारणे.",
      tag: "समूहाची पायाभरणी",
    },
    {
      year: "विस्तार",
      title: "कृषी व घाऊक पुरवठा साखळी विस्तार",
      description:
        "शेतकऱ्यांच्या दर्जेदार उत्पादनांना शहरी बाजारपेठेशी थेट जोडण्यासाठी संघटित शेती आणि घाऊक वितरण व्यवस्थेचा यशस्वी प्रारंभ.",
      tag: "शेती व पुरवठा साखळी",
    },
    {
      year: "ब्रँड निर्मिती",
      title: "अन्नमृत फूड्सची स्थापना",
      description:
        "नाशिकमध्ये ग्राहकांसाठी चविष्ट, स्वच्छ आणि पौष्टिक जेवणाचे बॉक्सेस, ताजे मोड आलेले कडधान्य (स्प्राउट चाट) आणि नाश्त्याचे पर्याय उपलब्ध करून देण्यासाठी अन्नमृत फूड्सची सुरुवात.",
      tag: "अन्न व आरोग्य",
    },
    {
      year: "विविधीकरण",
      title: "सांगळे पॅकेजिंग व पर्यावरणपूरक उत्पादने",
      description:
        "खाद्य उत्पादने आणि स्थानिक उद्योगांसाठी फूड-ग्रेड, मजबूत व पर्यावरणपूरक पॅकेजिंग साहित्याचा पुरवठा करण्यासाठी सांगळे पॅकेजिंगची स्थापना.",
      tag: "उत्पादन व पॅकेजिंग",
    },
    {
      year: "वर्तमान व भविष्य",
      title: "एकात्मिक डिजिटल परिसंस्था व भविष्यकालीन वाटचाल",
      description:
        "व्यावसायिक भागीदारी, संस्थात्मक घाऊक पुरवठा आणि नवीन डिजिटल उपक्रमांना गती देण्यासाठी अत्याधुनिक डिजिटल प्रणालीचा विस्तार.",
      tag: "कॉर्पोरेट व्यासपीठ",
    },
  ],
  hi: [
    {
      year: "शुभारंभ",
      title: "संस्थापक दृष्टिकोण एवं व्यावसायिक शुभारंभ",
      description:
        "सांगळे समूह की स्थापना एक सुदृढ़ सिद्धांत पर हुई: आवश्यक वस्तुओं, उच्च गुणवत्ता और दीर्घकालिक साझेदार विश्वास पर आधारित मजबूत भारतीय उद्यमों का निर्माण।",
      tag: "समूह की नींव",
    },
    {
      year: "विस्तार",
      title: "कृषि एवं थोक आपूर्ति श्रृंखला एकीकरण",
      description:
        "ग्रामीण उपज को सीधे शहरी मांग केंद्रों से जोड़ने के लिए संगठित कृषि एवं वाणिज्यिक थोक आपूर्ति श्रृंखला का विस्तार।",
      tag: "कृषि एवं आपूर्ति श्रृंखला",
    },
    {
      year: "ब्रांड निर्माण",
      title: "अन्नमृत फूड्स की स्थापना",
      description:
        "नाशिक में उपभोक्ताओं के लिए स्वादिष्ट, स्वच्छ और पौष्टिक मील बॉक्सेस, फ्रेश स्प्राउट चाट और संपूर्ण नाश्ते के विकल्प हेतु अन्नमृत फूड्स की शुरुआत।",
      tag: "खाद्य एवं स्वास्थ्य",
    },
    {
      year: "विविधीकरण",
      title: "सांगळे पैकेजिंग एवं टिकाऊ सामग्री प्रभाग",
      description:
        "खाद्य उत्पादों और स्थानीय उद्यमों हेतु फ़ूड-ग्रेड, सुरक्षित और पर्यावरण के अनुकूल पैकेजिंग की आपूर्ति के लिए सांगळे पैकेजिंग की स्थापना।",
      tag: "निर्माण एवं पैकेजिंग",
    },
    {
      year: "वर्तमान एवं भविष्य",
      title: "एकीकृत डिजिटल तंत्र एवं भविष्योन्मुखी क्षितिज",
      description:
        "व्यावसायिक साझेदारियों, संस्थागत वितरण और भविष्य की तकनीकी व लॉजिस्टिक्स पहलों को सशक्त बनाने के लिए आधुनिक डिजिटल प्रणाली का विस्तार।",
      tag: "कॉर्पोरेट प्लेटफॉर्म",
    },
  ],
};

export default function JourneyTimeline({ milestones }: Props) {
  const { dict, locale } = useLanguage();

  const displayMilestones =
    locale === "mr"
      ? LOCALIZED_MILESTONES.mr
      : locale === "hi"
      ? LOCALIZED_MILESTONES.hi
      : milestones && milestones.length > 0
      ? milestones
      : INITIAL_MILESTONES;

  const badgeText =
    locale === "mr"
      ? "समूहाची यशस्वी वाटचाल"
      : locale === "hi"
      ? "समूह की प्रामाणिक यात्रा"
      : "Verified Evolution";

  const headline =
    locale === "mr"
      ? "आमचा प्रवास आणि महत्त्वाचे टप्पे"
      : locale === "hi"
      ? "हमारी यात्रा एवं महत्वपूर्ण पड़ाव"
      : "Our Journey & Milestones";

  const description =
    locale === "mr"
      ? "मूलभूत तत्त्वे आणि उच्च मूल्यांवर आधारित सांगळे समूहाचा प्रारंभापासून बहु-उद्योग समूहापर्यंतचा प्रेरणादायी प्रवास."
      : locale === "hi"
      ? "मूलभूत सिद्धांतों और उच्च आदर्शों पर आधारित सांगळे समूह की नींव से लेकर बहु-उद्योग उपस्थिति तक की प्रगति।"
      : "Tracing the measured, values-first progression of SANGALES GROUP from foundational beginnings to a multi-industry corporate presence.";

  const linkText =
    locale === "mr"
      ? "संपूर्ण टाइमलाइन पहा"
      : locale === "hi"
      ? "सम्पूर्ण टाइमलाइन देखें"
      : "Explore Full Timeline";

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase mb-3">
              <span className="w-8 h-[2px] bg-gold-600" />
              {badgeText}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">
              {headline}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-charcoal-100">
              {description}
            </p>
          </div>

          <Link
            href="/our-journey"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors shrink-0 group"
          >
            <span>{linkText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Milestone Timeline cards */}
        <div className="relative border-l-2 border-stone-200 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-6">
          {displayMilestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-gold-600 group-hover:scale-125 transition-transform" />

              <div className="bg-offwhite p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all max-w-4xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 bg-navy text-gold text-xs font-bold tracking-wider uppercase rounded-sm">
                    {item.year}
                  </span>
                  <span className="text-xs text-charcoal-100 font-semibold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

