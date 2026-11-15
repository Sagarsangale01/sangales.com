"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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

export default function JourneyContent({ milestones }: Props) {
  const { locale } = useLanguage();

  const heroBadge =
    locale === "mr" ? "उत्क्रांती • इतिहास" : locale === "hi" ? "विकास यात्रा • इतिहास" : "Evolution • History";

  const heroTitle =
    locale === "mr"
      ? "आमचा प्रवास (Our Journey)"
      : locale === "hi"
      ? "हमारी विकास यात्रा (Our Journey)"
      : "Our Journey";

  const heroDesc =
    locale === "mr"
      ? "सांगळे समूहाने विशेष व्यावसायिक प्रभाग आणि चिरस्थायी भागीदारी विकसित करताना केलेल्या शिस्तबद्ध व टप्प्याटप्प्याने झालेल्या प्रगतीचा आढावा."
      : locale === "hi"
      ? "सांगळे समूह द्वारा विशिष्ट व्यावसायिक प्रभागों और दीर्घकालिक साझेदारियों को विकसित करते हुए तय किए गए सुनियोजित और चरणबद्ध विकास का संक्षिप्त विवरण।"
      : "Tracing the deliberate, step-by-step evolution of Sangales as we developed specialized business divisions and lasting partnerships.";

  const sectionBadge =
    locale === "mr" ? "महत्त्वाचे टप्पे" : locale === "hi" ? "विकास के प्रमुख मील के पत्थर" : "Milestones Timeline";

  const sectionTitle =
    locale === "mr"
      ? "सातत्यपूर्ण विस्ताराची प्रेरणादायी कहाणी"
      : locale === "hi"
      ? "निरंतर विस्तार की प्रेरक कहानी"
      : "A Story of Steady Expansion";

  const sectionDesc =
    locale === "mr"
      ? "प्रत्येक टप्पा आर्थिक स्थैर्य, ग्राहकांचा विश्वास आणि व्यावसायिक मूल्ये जपण्याच्या आमच्या कटिबद्धतेचे प्रतीक आहे."
      : locale === "hi"
      ? "प्रत्येक कदम आर्थिक सुदृढ़ता, ग्राहक विश्वास और व्यावसायिक मूल्यों के प्रति हमारी दृढ़ प्रतिबद्धता का प्रतीक है।"
      : "Every step represents a strategic commitment to real economic fundamentals and customer trust.";

  const aheadBadge =
    locale === "mr" ? "पुढील वाटचाल" : locale === "hi" ? "आगे की राह" : "The Journey Ahead";

  const aheadTitle =
    locale === "mr" ? "पुढील अध्यायांचे लेखन" : locale === "hi" ? "अगले अध्यायों का सृजन" : "Writing the Next Chapters";

  const aheadDesc =
    locale === "mr"
      ? "आमचा प्रवास अविरत सुरू आहे. ग्राहकांची वाढती पसंती, शुद्ध व सात्त्विक अन्न, शाश्वत शेती आणि पर्यावरणपूरक पॅकेजिंग सोल्यूशन्सकडे वळत असताना, सांगळे समूह लवचिकता वाढवणाऱ्या आणि सामायिक समृद्धी निर्माण करणाऱ्या आधुनिक उपक्रमांमध्ये सातत्याने गुंतवणूक करत आहे."
      : locale === "hi"
      ? "हमारी कहानी निरंतर अग्रसर है। उपभोक्ता प्राथमिकताओं के शुद्ध व स्वास्थ्यप्रद खानपान, टिकाऊ कृषि पद्धतियों और पर्यावरण-अनुकूल पैकेजिंग की ओर बढ़ने के साथ, सांगळे समूह ऐसी क्षमताओं में निवेश करना जारी रखे हुए है जो दीर्घकालिक मजबूती और साझा समृद्धि का निर्माण करती हैं।"
      : "Our story is ongoing. As consumer preferences shift toward unadulterated wellness foods, sustainable farm practices, and zero-plastic packaging solutions, Sangales continues to invest in capabilities that build resilience and create shared prosperity.";

  const aheadCta =
    locale === "mr"
      ? "समूहातील सर्व व्यवसाय पहा"
      : locale === "hi"
      ? "वर्तमान समूह व्यवसाय देखें"
      : "Explore Current Group Businesses";

  const displayMilestones =
    locale === "mr"
      ? LOCALIZED_MILESTONES.mr
      : locale === "hi"
      ? LOCALIZED_MILESTONES.hi
      : milestones && milestones.length > 0
      ? milestones
      : INITIAL_MILESTONES;

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      {/* Editorial Page Header */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
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
            <p className="text-lg text-stone-200 font-light leading-relaxed">
              {heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Timeline Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase">
            {sectionBadge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
            {sectionTitle}
          </h2>
          <p className="text-sm text-charcoal-100">
            {sectionDesc}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-stone-300 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-8">
          {displayMilestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-white border-4 border-gold-600 group-hover:scale-125 transition-transform" />

              <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3.5 py-1 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm">
                    {item.year}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Outlook */}
        <div className="bg-white p-8 sm:p-10 rounded-sm border border-stone-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-gold-700 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>{aheadBadge}</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy">
            {aheadTitle}
          </h3>
          <p className="text-sm text-charcoal-100 leading-relaxed">
            {aheadDesc}
          </p>
          <div className="pt-2">
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold"
            >
              <span>{aheadCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

