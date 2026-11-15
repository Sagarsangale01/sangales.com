"use client";

import React from "react";
import { Zap, ShieldCheck, HeartHandshake, Sprout, RefreshCw, Users2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhySangales() {
  const { dict, locale } = useLanguage();

  const badgeText =
    locale === "mr"
      ? "आम्हाला का निवडावे"
      : locale === "hi"
      ? "हमारे साथ साझेदारी क्यों"
      : "Why Partner With Us";

  const headline =
    locale === "mr"
      ? "आमचे व्यावसायिक तत्त्वज्ञान"
      : locale === "hi"
      ? "हमारा व्यावसायिक दर्शन"
      : "Our Business Philosophy";

  const subtitle =
    locale === "mr"
      ? "उच्च व्यावसायिक मूल्ये आणि शिस्तबद्ध कार्यपद्धती जी सांगळे समूहाला एक विश्वासार्ह पालक उद्योग आणि भागीदार बनवते."
      : locale === "hi"
      ? "एक अनुशासित एवं मूल्य-आधारित दृष्टिकोण जो सांगळे समूह को एक भरोसेमंद मूल उद्यम और भागीदार बनाता है।"
      : "A disciplined, values-led approach that sets SANGALES apart as a dependable parent enterprise and operating partner.";

  const pillars = [
    {
      icon: Zap,
      title:
        locale === "mr"
          ? "व्यावहारिक उद्योजकता"
          : locale === "hi"
          ? "व्यावहारिक उद्यमिता"
          : "Pragmatic Entrepreneurship",
      description:
        locale === "mr"
          ? "बाजारातील गरजा अचूक ओळखून आर्थिक पायावर आधारलेले शाश्वत आणि सक्षम व्यवसाय उभारणे."
          : locale === "hi"
          ? "बाज़ार की वास्तविक आवश्यकताओं को पहचानकर आर्थिक सिद्धांतों पर आधारित टिकाऊ और आत्मनिर्भर व्यवसायों की स्थापना।"
          : "We identify real, underserved market needs and establish viable, self-sustaining businesses anchored in economic fundamentals.",
    },
    {
      icon: ShieldCheck,
      title:
        locale === "mr"
          ? "गुणवत्ता आणि विश्वासार्हता"
          : locale === "hi"
          ? "गुणवत्ता एवं विश्वसनीयता"
          : "Quality & Reliability",
      description:
        locale === "mr"
          ? "अन्न सुरक्षेपासून ते औद्योगिक पॅकेजिंग व स्टील पुरवठ्यापर्यंत — दर्जा आणि वेळेच्या बाबतीत कोणतीही तडजोड नाही."
          : locale === "hi"
          ? "प्रमाणित खाद्य स्वच्छता से लेकर निर्माण सामग्री व औद्योगिक पैकेजिंग तक — तकनीकी गुणवत्ता और समयबद्ध आपूर्ति में कोई समझौता नहीं।"
          : "From certified food hygiene to industrial packaging specs, we do not compromise on technical rigor or delivery timelines.",
    },
    {
      icon: Users2,
      title:
        locale === "mr"
          ? "ग्राहकहित प्रथम"
          : locale === "hi"
          ? "ग्राहक प्राथमिकता"
          : "Customer Centricity",
      description:
        locale === "mr"
          ? "ग्राहकांच्या गरजा आणि व्यावसायिक अपेक्षांचा सक्रिय विचार करून प्रत्यक्ष उपयोगी उपाययोजना तयार करणे."
          : locale === "hi"
          ? "ग्राहकों की आवश्यकताओं और व्यावसायिक प्राथमिकताओं को ध्यानपूर्वक सुनकर वास्तविक समाधान तैयार करना।"
          : "We listen actively to consumer preferences and commercial client specifications to craft solutions that solve actual bottlenecks.",
    },
    {
      icon: HeartHandshake,
      title:
        locale === "mr"
          ? "दीर्घकालीन नातेसंबंध"
          : locale === "hi"
          ? "दीर्घकालिक संबंध"
          : "Long-Term Relationships",
      description:
        locale === "mr"
          ? "शेतकरी, मंडई, घाऊक खरेदीदार आणि वितरक यांच्याशी केवळ एका व्यवहारापुरते मर्यादित न राहता दशकांची भागीदारी जपणे."
          : locale === "hi"
          ? "आपूर्तिकर्ताओं, मंडियों, थोक खरीदारों और वितरकों को अल्पकालिक नहीं, बल्कि दशकों के साझेदार के रूप में देखना।"
          : "We view suppliers, mandis, institutional buyers, and channel distributors as decade-long partners, not one-off transactions.",
    },
    {
      icon: Sprout,
      title:
        locale === "mr"
          ? "शाश्वत व पर्यावरणपूरक विकास"
          : locale === "hi"
          ? "सतत एवं पर्यावरण-अनुकूल विकास"
          : "Sustainable Growth",
      description:
        locale === "mr"
          ? "सेंद्रिय शेती, पुनर्वापरयोग्य पॅकेजिंग साहित्य आणि पर्यावरणपूरक व्यवसाय मॉडेलला सर्वोच्च प्राधान्य देणे."
          : locale === "hi"
          ? "जैविक कृषि, पुनर्चक्रण योग्य पैकेजिंग और पर्यावरण के अनुकूल व्यावसायिक मॉडल को सर्वोच्च प्राथमिकता देना।"
          : "We prioritize regenerative agricultural inputs, recyclable materials, and environmentally considerate business models.",
    },
    {
      icon: RefreshCw,
      title:
        locale === "mr"
          ? "सतत सुधारणा व आधुनिकीकरण"
          : locale === "hi"
          ? "निरंतर सुधार एवं नवाचार"
          : "Continuous Improvement",
      description:
        locale === "mr"
          ? "कामाच्या पद्धतींचे नियमित परीक्षण, नवीन अन्न तंत्रज्ञानाचा अवलंब आणि बदलत्या काळानुसार यंत्रसामग्रीचे आधुनिकीकरण."
          : locale === "hi"
          ? "प्रक्रियाओं का नियमित मूल्यांकन, नई खाद्य तकनीकों को अपनाना और आधुनिक मशीनरी के साथ उद्योग में सदैव अग्रणी रहना।"
          : "Regularly auditing processes, adopting modern food tech, and upgrading packaging machinery to stay ahead of industry evolutions.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase">
            <span className="w-8 h-[2px] bg-gold-600" />
            {badgeText}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-100">
            {subtitle}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial hover:border-gold/50 transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-sm bg-navy-50 border border-navy-100 flex items-center justify-center text-navy">
                <item.icon className="w-6 h-6 text-gold-700" />
              </div>
              <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
              <p className="text-sm text-charcoal-100 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

