"use client";

import React from "react";
import Link from "next/link";
import { Compass, Target, ArrowRight } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  settings: SiteSettings;
}

export default function VisionContent({ settings }: Props) {
  const { locale } = useLanguage();

  const heroBadge =
    locale === "mr"
      ? "धोरणात्मक पाया • तत्त्वज्ञान"
      : locale === "hi"
      ? "रणनीतिक आधार • दर्शन"
      : "Strategic Foundation • Philosophy";

  const heroTitle =
    locale === "mr"
      ? "आमची दूरदृष्टी आणि मूल्ये (Our Vision & Values)"
      : locale === "hi"
      ? "हमारा दृष्टिकोण एवं मूल्य (Our Vision & Values)"
      : "Our Vision & Values";

  const heroDesc =
    locale === "mr"
      ? "सांगळे - अ ग्रुप ऑफ कंपनीजला चालना देणारी मूलभूत तत्त्वे, दीर्घकालीन उद्दिष्टे आणि दृढ व्यावसायिक नीतिमत्ता."
      : locale === "hi"
      ? "सांगळे - अ ग्रुप ऑफ कंपनीज को दिशा प्रदान करने वाले बुनियादी सिद्धांत, दीर्घकालिक आकांक्षाएं और दृढ़ व्यावसायिक नैतिकता।"
      : "The foundational principles, long-term ambitions, and ethical convictions driving SANGALES – A GROUP OF COMPANIES.";

  const visionBadge =
    locale === "mr" ? "समूहाची दूरदृष्टी (Vision)" : locale === "hi" ? "समूह का दृष्टिकोण (Vision)" : "The Group Vision";

  const visionTitle =
    locale === "mr"
      ? "उद्योग उभारणी. नव्या संधींची निर्मिती."
      : locale === "hi"
      ? "व्यवसाय निर्माण. नए अवसरों का सृजन।"
      : settings.tagline || "Building Businesses. Creating Opportunities.";

  const visionDesc =
    locale === "mr"
      ? "शेती, उद्योग आणि डिजिटल अर्थव्यवस्थेमध्ये उत्कृष्ट कार्यक्षमता, नैतिक मानके, ग्राहक समाधान आणि स्थानिक समाजाच्या सशक्तीकरणासाठी ओळखला जाणारा भारतातील सर्वात विश्वासू बहु-क्षेत्रीय व्यावसायिक समूह बनणे."
      : locale === "hi"
      ? "कृषि, औद्योगिक और डिजिटल अर्थव्यवस्था में उत्कृष्ट परिचालन, नैतिक मानकों, ग्राहक संतुष्टि और स्थानीय समुदायों के सशक्तिकरण के लिए जाना जाने वाला भारत का सर्वाधिक विश्वसनीय बहु-क्षेत्रीय व्यापार समूह बनना।"
      : settings.visionStatement;

  const missionBadge =
    locale === "mr" ? "समूहाचे ध्येय (Mission)" : locale === "hi" ? "समूह का लक्ष्य (Mission)" : "The Group Mission";

  const missionTitle =
    locale === "mr"
      ? "सर्वोत्कृष्टतेचा सातत्यपूर्ण विस्तार"
      : locale === "hi"
      ? "उत्कृष्टता का निरंतर विस्तार"
      : "Delivering Excellence at Scale";

  const missionDesc =
    locale === "mr"
      ? "शिस्तबद्ध अंमलबजावणी, पारदर्शक भागीदारी, शाश्वत संसाधनांचा योग्य वापर आणि आम्ही प्रदान करत असलेल्या प्रत्येक उत्पादन व सेवेमध्ये तडजोड न करता उच्च दर्जा राखून चिरस्थायी व्यावसायिक मूल्य निर्माण करणे."
      : locale === "hi"
      ? "अनुशासित निष्पादन, पारदर्शी साझेदारी, प्राकृतिक संसाधनों का विवेकपूर्ण प्रबंधन और प्रत्येक उत्पाद व सेवा में बिना किसी समझौते के उच्चतम गुणवत्ता मानकों को बनाए रखते हुए स्थायी व्यावसायिक मूल्य का निर्माण करना।"
      : settings.missionStatement;

  const codeBadge =
    locale === "mr" ? "नैतिक आचारसंहिता" : locale === "hi" ? "नैतिक आचार संहिता" : "Ethical Code";

  const codeTitle =
    locale === "mr" ? "आमची मार्गदर्शक तत्त्वे" : locale === "hi" ? "हमारे मार्गदर्शक सिद्धांत" : "Our Guiding Principles";

  const codeDesc =
    locale === "mr"
      ? "प्रत्येक व्यावसायिक निर्णय, वाटाघाटी आणि संबंधांमध्ये अंगीकारलेली तडजोड नसलेली मानके."
      : locale === "hi"
      ? "प्रत्येक व्यावसायिक निर्णय, विचार-विमर्श और संबंधों में समाहित अटूट मानक।"
      : "The unnegotiable standards embedded across every business decision, negotiation, and corporate relationship.";

  const coreValues = [
    {
      title:
        locale === "mr"
          ? "नैतिक सचोटी आणि कॉर्पोरेट अखंडता"
          : locale === "hi"
          ? "नैतिक सत्यनिष्ठा एवं कॉर्पोरेट निष्ठा"
          : "Ethical Diligence & Corporate Integrity",
      desc:
        locale === "mr"
          ? "प्रत्येक व्यवहार पूर्ण वैधानिक अनुपालन, आर्थिक पारदर्शकता आणि दिलेल्या वचनांप्रती सर्वोच्च निष्ठेने पार पाडणे."
          : locale === "hi"
          ? "प्रत्येक लेन-देन को पूर्ण वैधानिक अनुपालन, वित्तीय पारदर्शिता और अपनी प्रतिबद्धताओं के प्रति अटूट निष्ठा के साथ संचालित करना।"
          : "Conducting every transaction with statutory compliance, financial transparency, and unyielding honor in our commitments.",
    },
    {
      title:
        locale === "mr"
          ? "तडजोडविरहित गुणवत्ता मानके"
          : locale === "hi"
          ? "अविचल गुणवत्ता मानक"
          : "Uncompromising Quality Benchmarks",
      desc:
        locale === "mr"
          ? "प्रमाणित दर्जाचे उत्पादन—मग ते कीटकनाशकमुक्त धान्य असो किंवा फूड-ग्रेड प्रमाणित पॅकेजिंग असो—अचूक मानकांसह ग्राहकांपर्यंत पोहोचवणे."
          : locale === "hi"
          ? "प्रमाणित गुणवत्तापूर्ण उत्पादों की डिलीवरी—कीटनाशक-मुक्त खाद्यान्न से लेकर फ़ूड-ग्रेड प्रमाणित पैकेजिंग तक—सटीक मानकों का अनुपालन।"
          : "Delivering products that adhere to verified standards—from pesticide-free staple grain to food-grade certified packaging.",
    },
    {
      title:
        locale === "mr"
          ? "दीर्घकालीन विश्वासू भागीदारी"
          : locale === "hi"
          ? "दीर्घकालिक विश्वसनीय साझेदारी"
          : "Partnership Longevity",
      desc:
        locale === "mr"
          ? "शेतकरी, कृषी बाजार समित्या, संस्थात्मक खरेदीदार आणि वितरकांसोबत पिढ्यान्‌पिढ्या टिकून राहणारे मजबूत संबंध विकसित करणे."
          : locale === "hi"
          ? "किसानों, मंडियों, संस्थागत खरीदारों और डीलरों के साथ पीढ़ियों तक फलने-फूलने वाले सशक्त संबंधों का विकास।"
          : "Cultivating relationships with farmers, mandis, institutional buyers, and dealers intended to thrive over generations.",
    },
    {
      title:
        locale === "mr"
          ? "पर्यावरणीय आणि सामाजिक जबाबदारी"
          : locale === "hi"
          ? "पर्यावरणीय एवं सामाजिक दायित्व"
          : "Ecological & Social Stewardship",
      desc:
        locale === "mr"
          ? "जलसंधारण शेती, पर्यावरणपूरक बायोडिग्रेडेबल पॅकेजिंग आणि प्रादेशिक आर्थिक विकासाला सर्वोच्च प्राधान्य देणे."
          : locale === "hi"
          ? "जल-संरक्षण कृषि, पर्यावरण-अनुकूल बायोडिग्रेडेबल पैकेजिंग और क्षेत्रीय आर्थिक सशक्तिकरण को सर्वोच्च प्राथमिकता देना।"
          : "Prioritizing water-conservation farming, biodegradable packaging polymers, and sustainable regional economic enablement.",
    },
    {
      title:
        locale === "mr"
          ? "व्यावहारिक आणि उपयुक्त नवोपक्रम"
          : locale === "hi"
          ? "व्यावहारिक नवाचार"
          : "Pragmatic Innovation",
      desc:
        locale === "mr"
          ? "आधुनिक कोल्ड-चेन, तंत्रज्ञानयुक्त शेती आणि कार्यक्षमता वाढवणारी डिजिटल प्रणाली यांचा प्रत्यक्ष वापर करणे."
          : locale === "hi"
          ? "आधुनिक कोल्ड-चेन हैंडलिंग, सटीक कृषि और दृश्यमान दक्षता उत्पन्न करने वाले डिजिटल सिस्टम को अपनाना।"
          : "Adopting modern cold-chain handling, precision agronomy, and digital systems that create tangible efficiency.",
    },
    {
      title:
        locale === "mr"
          ? "स्थानिक समाज मूल्य निर्मिती"
          : locale === "hi"
          ? "सामुदायिक मूल्य सृजन"
          : "Community Value Creation",
      desc:
        locale === "mr"
          ? "आमच्या सर्व व्यावसायिक उपक्रमांतून ग्रामीण शेतकरी, वेअरहाऊस कामगार आणि स्थानिक वितरकांचा सामाजिक व आर्थिक स्तर उंचावणे."
          : locale === "hi"
          ? "यह सुनिश्चित करना कि हमारी व्यावसायिक गतिविधियों से ग्रामीण उत्पादकों, गोदाम कर्मियों और क्षेत्रीय वितरण सहयोगियों का उत्थान हो।"
          : "Ensuring our commercial activities uplift local rural producers, warehouse teams, and regional distribution partners.",
    },
  ];

  const ctaTitle =
    locale === "mr"
      ? "मूल्यनिष्ठ समूहासोबत जोडले जा"
      : locale === "hi"
      ? "मूल्य-संचालित समूह के साथ जुड़ें"
      : "Align with a Values-Driven Group";

  const ctaDesc =
    locale === "mr"
      ? "पुरवठादार, वितरक किंवा संस्थात्मक ग्राहक म्हणून सांगळे समूहासोबत पारदर्शक आणि परस्पर समृद्धी देणारी भागीदारी करण्यासाठी आम्ही आपले स्वागत करतो."
      : locale === "hi"
      ? "आपूर्तिकर्ता, वितरक अथवा ग्राहक के रूप में सांगळे समूह के साथ एक पारदर्शी, परस्पर समृद्ध साझेदारी बनाने हेतु हम आपका स्वागत करते हैं।"
      : "Whether as a supplier, distributor, or client, we invite you to build a transparent, mutually prosperous partnership with Sangales.";

  const ctaBtn =
    locale === "mr"
      ? "भागीदारीच्या संधी जाणून घ्या"
      : locale === "hi"
      ? "साझेदारी के अवसर जानें"
      : "Explore Partnership Opportunities";

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

      {/* Main Vision Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20">
        {/* Vision & Mission Deep-Dive */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-editorial space-y-6">
            <div className="w-12 h-12 rounded-sm bg-navy-50 border border-navy-100 flex items-center justify-center text-navy">
              <Compass className="w-6 h-6 text-gold-700" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-700 font-bold block mb-1">
                {visionBadge}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                {visionTitle}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              {visionDesc}
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-editorial space-y-6">
            <div className="w-12 h-12 rounded-sm bg-navy-50 border border-navy-100 flex items-center justify-center text-navy">
              <Target className="w-6 h-6 text-gold-700" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-700 font-bold block mb-1">
                {missionBadge}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                {missionTitle}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              {missionDesc}
            </p>
          </div>
        </section>

        {/* 6 Core Values */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase">
              {codeBadge}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
              {codeTitle}
            </h2>
            <p className="text-sm text-charcoal-100">
              {codeDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial hover:border-gold/50 transition-all space-y-3"
              >
                <div className="text-xs font-mono font-bold text-gold-700">0{idx + 1}.</div>
                <h3 className="font-heading text-lg font-bold text-navy">{val.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal-100 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-navy text-white p-8 sm:p-12 rounded-sm text-center space-y-6">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold">
            {ctaTitle}
          </h3>
          <p className="text-sm text-stone-300 max-w-xl mx-auto font-light">
            {ctaDesc}
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=Partnership"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-white text-navy font-bold text-xs tracking-widest uppercase rounded-sm transition-all shadow-md"
            >
              <span>{ctaBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

