"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Handshake, Truck, Store, Boxes } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  settings?: SiteSettings;
}

export default function PartnershipCTA({ settings }: Props) {
  const { dict, locale } = useLanguage();

  const headline =
    locale === "mr"
      ? "चला, एकत्र मिळून नवीन व्यवसायाची उभारणी करूया."
      : locale === "hi"
      ? "आइए, मिलकर नए अवसरों का निर्माण करें।"
      : settings?.partnershipHeadline || "Let's Build Something Together.";

  const subtitle =
    locale === "mr"
      ? "आम्ही वितरक, संस्थात्मक खरेदीदार, पुरवठादार आणि व्यावसायिक भागीदारांसोबत परस्पर विश्वासावर आधारित दीर्घकालीन भागीदारीसाठी सदैव तत्पर आहोत."
      : locale === "hi"
      ? "हम गुणवत्ता और पारस्परिक विकास को महत्व देने वाले वितरकों, थोक खरीदारों, आपूर्तिकर्ताओं और उद्यमियों के साथ दीर्घकालिक साझेदारी का स्वागत करते हैं।"
      : settings?.partnershipSubtitle ||
        "We actively seek long-term partnerships with distributors, institutional buyers, suppliers, and entrepreneurs who value quality and mutual growth.";

  const badgeText =
    locale === "mr"
      ? "व्यावसायिक • संस्थात्मक • प्रगती"
      : locale === "hi"
      ? "वाणिज्यिक • संस्थागत • विकास"
      : "Commercial • Institutional • Growth";

  const avenues = [
    {
      icon: Store,
      title:
        locale === "mr"
          ? "वितरण व डीलरशिप"
          : locale === "hi"
          ? "वितरण एवं डीलरशिप"
          : "Distribution & Dealerships",
      desc:
        locale === "mr"
          ? "अन्नमृत फूड्सचे पौष्टिक आहार किंवा सांगळे पॅकेजिंगचे ४सीपी मील बॉक्सेस, ॲल्युमिनियम कंटेनर्स व पेपर बॅग्जचे स्थानिक बाजारपेठेत अधिकृत वितरण."
          : locale === "hi"
          ? "अन्नमृत फूड्स के पौष्टिक आहार अथवा सांगळे पैकेजिंग के 4सीपी मील बॉक्सेस, एल्युमिनियम कंटेनर्स व पेपर बैग्स का क्षेत्रीय वितरण।"
          : "Distribute Annamrit Foods healthy meals, or Sangales Packaging 4CP meal boxes, aluminium containers & paper bags across market channels.",
      type: "Distribution",
    },
    {
      icon: Truck,
      title:
        locale === "mr"
          ? "शेतकरी व पुरवठादार सहकार्य"
          : locale === "hi"
          ? "कृषक एवं आपूर्तिकर्ता संबंध"
          : "Supplier & Mandi Linkages",
      desc:
        locale === "mr"
          ? "थेट शेतातून धान्य, कृषी उत्पादने, कच्चा माल किंवा विशेष पॅकेजिंग साहित्याचा पुरवठा करण्यासाठी संपर्क साधा."
          : locale === "hi"
          ? "सीधे खेतों से उच्च गुणवत्ता अनाज, कृषि उत्पाद, कच्चा माल अथवा विशिष्ट पैकेजिंग सामग्री की आपूर्ति हेतु जुड़ें।"
          : "Supply bulk grain, farm inputs, raw materials, or specialized packaging substrates.",
      type: "Supplier",
    },
    {
      icon: Boxes,
      title:
        locale === "mr"
          ? "घाऊक व कॉर्पोरेट खरेदी"
          : locale === "hi"
          ? "थोक एवं संस्थागत खरीद"
          : "Wholesale & Enterprise Procurement",
      desc:
        locale === "mr"
          ? "सांगळे ट्रेडिंगचे बांधकाम टीएमटी स्टील (Fe 500D/550D), वॉटरप्रूफ पीव्हीसी प्लाय, वॉलपेपर्स आणि फूड पॅकेजिंग साहित्याची घाऊक दरात थेट खरेदी."
          : locale === "hi"
          ? "सांगळे ट्रेडिंग के निर्माण टीएमटी स्टील, वाटरप्रूफ पीवीसी प्लाई, वॉलपेपर्स और फ़ूड पैकेजिंग सामग्री की थोक दरों पर खरीद।"
          : "Procure Sangales Trading construction steel & TMT rebars, PVC ply sheets, designer wallpapers, architectural panels, and food packaging disposables.",
      type: "Wholesale",
    },
    {
      icon: Handshake,
      title:
        locale === "mr"
          ? "धोरणात्मक व्यवसाय सहयोग"
          : locale === "hi"
          ? "रणनीतिक व्यावसायिक साझेदारी"
          : "Strategic Business Collaboration",
      desc:
        locale === "mr"
          ? "संयुक्त उपक्रम (Joint Ventures), कंत्राटी उत्पादन (Contract Manufacturing) किंवा नवीन तंत्रज्ञान प्रणालींचा एकत्रित विकास."
          : locale === "hi"
          ? "संयुक्त उपक्रम (Joint Ventures), अनुबंध विनिर्माण (Contract Manufacturing) अथवा नई डिजिटल प्रणाली का सह-विकास।"
          : "Joint commercial ventures, contract manufacturing, or technology co-development.",
      type: "Partnership",
    },
  ];

  const initiateLabel =
    locale === "mr" ? "चौकशी सुरू करा" : locale === "hi" ? "प्रस्ताव भेजें" : "Initiate Request";

  const cardTitle =
    locale === "mr"
      ? "आपल्याकडे विशेष व्यावसायिक प्रस्ताव किंवा घाऊक मागणी आहे का?"
      : locale === "hi"
      ? "क्या आपके पास कोई विशेष व्यावसायिक प्रस्ताव या थोक आवश्यकता है?"
      : "Have a tailored proposition or enterprise requirement?";

  const cardSubtitle =
    locale === "mr"
      ? "आमचे कॉर्पोरेट व्यवस्थापन प्रत्येक सत्यापित व्यावसायिक प्रस्तावाची २४ ते ४८ तासांच्या आत दखल घेऊन संपर्क साधते."
      : locale === "hi"
      ? "हमारा कॉर्पोरेट नेतृत्व प्रत्येक सत्यापित व्यावसायिक प्रस्ताव की 24–48 घंटों के भीतर समीक्षा कर संपर्क करता है।"
      : "Our corporate leadership desk reviews and responds to every verified business proposal within 24–48 hours.";

  const cardButton =
    locale === "mr"
      ? "कॉर्पोरेट टीमशी संपर्क साधा"
      : locale === "hi"
      ? "कॉर्पोरेट टीम से संपर्क करें"
      : "Connect With Corporate Desk";

  return (
    <section className="py-20 lg:py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-gold text-xs font-bold tracking-superwide uppercase">
            {badgeText}
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-stone-300 font-light">
            {subtitle}
          </p>
        </div>

        {/* 4 Partnership Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {avenues.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-sm bg-navy-900 border border-navy-800 hover:border-gold/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href={`/contact?type=${item.type}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold group-hover:text-white transition-colors"
                >
                  <span>{initiateLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Central Direct Action Card */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-navy-700 p-8 sm:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {cardTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              {cardSubtitle}
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-gold hover:bg-white text-navy font-bold text-xs tracking-widest uppercase rounded-sm transition-all shadow-md shrink-0"
          >
            {cardButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
