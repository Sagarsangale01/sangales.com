"use client";

import React from "react";
import Link from "next/link";
import { Compass, Target, Award, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  settings?: SiteSettings;
}

export default function VisionMissionSection({ settings }: Props) {
  const { dict, locale } = useLanguage();

  const vision =
    locale === "mr"
      ? "भक्कम व टिकाऊ व्यवसायांची उभारणी करून, स्थानिक पुरवठा साखळी अधिक बळकट करून आणि आम्ही पदार्पण करत असलेल्या प्रत्येक क्षेत्रात गुणवत्ता व मूल्यांचे नवे मापदंड प्रस्थापित करून एक अग्रगण्य व विश्वासार्ह भारतीय उद्योग समूह म्हणून नावारूपास येणे."
      : locale === "hi"
      ? "मजबूत एवं टिकाऊ व्यवसायों का निर्माण करके, स्थानीय आपूर्ति श्रृंखला को सशक्त बनाकर और प्रत्येक उद्योग में गुणवत्ता व स्थायी मूल्य निर्माण के नए मानदंड स्थापित करके एक अग्रणी व विश्वसनीय भारतीय व्यापारिक समूह बनना।"
      : settings?.visionStatement ||
        "To emerge as a trusted, forward-looking Indian corporate group recognized for building resilient businesses, empowering regional supply chains, and setting benchmarks of quality and value creation across every industry we enter.";

  const mission =
    locale === "mr"
      ? "अन्न, शेती, ट्रेडिंग, पॅकेजिंग आणि डिजिटल तंत्रज्ञान क्षेत्रात अविरत गुणवत्ता राखून, भागीदारांशी असलेले नाते जपत, शाश्वत पद्धतींचा अवलंब करत आणि ग्राहक व समाजाला ठोस मूल्य प्रदान करत अत्यावश्यक उद्योग विकसित करणे."
      : locale === "hi"
      ? "खाद्य, कृषि, व्यापार, पैकेजिंग और डिजिटल समाधानों में अटूट गुणवत्ता, साझेदार संबंधों का सम्मान, टिकाऊ पद्धतियों के उपयोग और ग्राहकों व समाज को ठोस मूल्य प्रदान करते हुए अनिवार्य उद्यमों का विकास करना।"
      : settings?.missionStatement ||
        "To cultivate essential enterprises in food, agriculture, trade, packaging, and digital solutions by adhering to uncompromising quality, honoring partner relationships, investing in sustainable methodologies, and delivering tangible value to customers and communities.";

  const sectionTag =
    locale === "mr"
      ? "उद्देश्य • दिशा • मूल्ये"
      : locale === "hi"
      ? "उद्देश्य • दिशा • सिद्धांत"
      : "Purpose • Direction • Principles";

  const sectionTitle =
    locale === "mr"
      ? "आमचा दृष्टिकोन, ध्येय आणि मूलभूत मूल्ये"
      : locale === "hi"
      ? "हमारा विज़न, मिशन एवं आधारभूत मूल्य"
      : "Our Vision, Mission & Core Values";

  const sectionSubtitle =
    locale === "mr"
      ? "शाश्वत व्यवसायांची उभारणी आणि संपूर्ण भारतात आर्थिक संधी निर्माण करण्यासाठी सांगळे समूहाची मार्गदर्शक तत्त्वे."
      : locale === "hi"
      ? "टिकाऊ उद्यमों का निर्माण और देश भर में आर्थिक अवसरों के सृजन हेतु सांगळे समूह के मार्गदर्शक सिद्धांत।"
      : "Guiding the SANGALES GROUP as we build sustainable businesses and unlock meaningful economic opportunities across India.";

  const visionBadge =
    locale === "mr" ? "धोरणात्मक क्षितिज" : locale === "hi" ? "रणनीतिक क्षितिज" : "Strategic Horizon";

  const visionTitle =
    locale === "mr" ? "आमचा दृष्टिकोन (Vision)" : locale === "hi" ? "हमारा विज़न (Vision)" : "Our Vision";

  const missionBadge =
    locale === "mr" ? "कार्यप्रणाली आणि उद्दिष्ट" : locale === "hi" ? "परिचालन संकल्प" : "Operational Mandate";

  const missionTitle =
    locale === "mr" ? "आमचे ध्येय (Mission)" : locale === "hi" ? "हमारा मिशन (Mission)" : "Our Mission";

  const valuesHeading =
    locale === "mr" ? "मार्गदर्शक कॉर्पोरेट मूल्ये" : locale === "hi" ? "मार्गदर्शक कॉर्पोरेट मूल्य" : "Guiding Corporate Values";

  const values = [
    {
      icon: ShieldCheck,
      title:
        locale === "mr"
          ? "पारदर्शकता व प्रामाणिकपणा"
          : locale === "hi"
          ? "सत्यनिष्ठा एवं अनुपालन"
          : "Integrity & Compliance",
      desc:
        locale === "mr"
          ? "प्रत्येक व्यावसायिक व्यवहारात पूर्ण पारदर्शकता, कायद्याचे काटेकोर पालन आणि नैतिक मूल्यांची जपणूक."
          : locale === "hi"
          ? "प्रत्येक व्यावसायिक लेनदेन में पूर्ण पारदर्शिता, वैधानिक नियमों का पालन और नैतिक आचरण।"
          : "Upholding absolute transparency, statutory diligence, and ethical conduct across every business transaction.",
    },
    {
      icon: Award,
      title:
        locale === "mr"
          ? "अढळ गुणवत्ता"
          : locale === "hi"
          ? "अटूट गुणवत्ता"
          : "Uncompromising Quality",
      desc:
        locale === "mr"
          ? "सुरक्षितता, पोषण आणि उत्कृष्ट कार्यक्षमतेच्या सर्वोच्च मापदंडांवर खरे उतरणारे उत्पादने व सेवा प्रदान करणे."
          : locale === "hi"
          ? "सुरक्षा, पोषण और श्रेष्ठ कार्यक्षमता के उच्चतम मानकों पर खरे उतरने वाले उत्पाद व समाधान।"
          : "Delivering products and solutions that meet verifiable benchmarks of safety, nutrition, and performance.",
    },
    {
      icon: HeartHandshake,
      title:
        locale === "mr"
          ? "दीर्घकालीन सहकार्य"
          : locale === "hi"
          ? "दीर्घकालिक साझेदारी"
          : "Long-Term Partnerships",
      desc:
        locale === "mr"
          ? "ग्राहक, पुरवठादार, वितरक आणि कर्मचारी यांना आमच्या प्रगतीतील अविभाज्य भागीदार मानणे."
          : locale === "hi"
          ? "ग्राहकों, आपूर्तिकर्ताओं, वितरकों और सहकर्मियों को हमारी साझा प्रगति का अभिन्न भागीदार मानना।"
          : "Treating clients, suppliers, distributors, and employees as enduring stakeholders in our shared growth.",
    },
    {
      icon: Sparkles,
      title:
        locale === "mr"
          ? "शाश्वत नावीन्यता"
          : locale === "hi"
          ? "टिकाऊ नवाचार"
          : "Sustainable Innovation",
      desc:
        locale === "mr"
          ? "शेती, पर्यावरणपूरक पॅकेजिंग आणि लॉजिस्टिक्समध्ये निसर्गाचे संतुलन राखणाऱ्या आधुनिक पद्धतींचा अवलंब करणे."
          : locale === "hi"
          ? "कृषि, पर्यावरण अनुकूल पैकेजिंग और लॉजिस्टिक्स में प्राकृतिक संतुलन बनाए रखने वाले आधुनिक तरीकों का उपयोग।"
          : "Adopting ecological stewardship across farming, eco-packaging, and resource-efficient supply chain logistics.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-gold text-xs font-bold tracking-superwide uppercase">
            {sectionTag}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-light">
            {sectionSubtitle}
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-sm bg-navy-900 border border-navy-700/80 shadow-xl relative overflow-hidden group hover:border-gold/50 transition-all">
            <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-gold font-bold">{visionBadge}</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
              {visionTitle}
            </h3>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              {vision}
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-sm bg-navy-900 border border-navy-700/80 shadow-xl relative overflow-hidden group hover:border-gold/50 transition-all">
            <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-gold font-bold">{missionBadge}</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
              {missionTitle}
            </h3>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              {mission}
            </p>
          </div>
        </div>

        {/* Core Values Strip */}
        <div>
          <div className="border-t border-navy-800 pt-12 pb-6">
            <h4 className="font-heading text-xs uppercase tracking-widest text-gold font-bold text-center mb-8">
              {valuesHeading}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-sm bg-navy-800/50 border border-navy-700/50 hover:bg-navy-800 transition-colors space-y-3"
                >
                  <val.icon className="w-6 h-6 text-gold" />
                  <h5 className="font-heading text-base font-bold text-white">{val.title}</h5>
                  <p className="text-xs text-stone-300 leading-relaxed font-light">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
