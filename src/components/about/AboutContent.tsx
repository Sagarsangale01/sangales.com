"use client";

import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, Sprout, ArrowRight } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  settings: SiteSettings;
}

export default function AboutContent({ settings }: Props) {
  const { locale } = useLanguage();

  const heroBadge =
    locale === "mr"
      ? "कॉर्पोरेट परिचय • ओळख"
      : locale === "hi"
      ? "कॉर्पोरेट परिचय • पहचान"
      : "Corporate Overview • Identity";

  const heroTitle =
    locale === "mr"
      ? "सांगळे समूहाविषयी (About SANGALES)"
      : locale === "hi"
      ? "सांगळे समूह के बारे में (About SANGALES)"
      : `About ${settings.siteName}`;

  const heroDesc =
    locale === "mr"
      ? "शाश्वत, ध्येयनिष्ठ उद्योग उभारणी आणि मूलभूत क्षेत्रांमध्ये दीर्घकालीन मूल्य निर्मितीसाठी कटिबद्ध असलेला एक अग्रगण्य भारतीय व्यावसायिक समूह."
      : locale === "hi"
      ? "स्थायी, उद्देश्यपूर्ण उद्यमों के निर्माण और बुनियादी उद्योगों में दीर्घकालिक मूल्य सृजन हेतु समर्पित एक अग्रणी भारतीय व्यावसायिक समूह।"
      : "A diversified Indian business group committed to building sustainable, purpose-driven enterprises and creating long-term value across essential industries.";

  const introBadge =
    locale === "mr"
      ? "कॉर्पोरेट ओळख आणि तत्त्वज्ञान"
      : locale === "hi"
      ? "कॉर्पोरेट पहचान और दर्शन"
      : settings.aboutSubtitle || "CORPORATE IDENTITY & PHILOSOPHY";

  const introHeadline =
    locale === "mr"
      ? "एक दूरदृष्टी. विविध व्यवसाय."
      : locale === "hi"
      ? "एक दृष्टिकोण. विविध व्यवसाय."
      : settings.aboutHeadline || "One Vision. Multiple Businesses.";

  const introDesc =
    locale === "mr"
      ? "सांगळे - अ ग्रुप ऑफ कंपनीज (SANGALES – A GROUP OF COMPANIES) हा एक एकीकृत पालक ब्रँड म्हणून कार्यरत आहे, जो स्वतंत्र आणि ध्येयनिष्ठ उपक्रमांची उभारणी करतो. शेतीमाल उत्पादन आणि पौष्टिक आहारापासून ते घाऊक संस्थात्मक पुरवठा, व्यापारी नेटवर्क आणि पॅकेजिंग सोल्यूशन्सपर्यंत, आमचा विश्वास आहे की खरी कॉर्पोरेट ताकद संयम आणि सातत्यपूर्ण मूल्य निर्मितीमध्ये आहे."
      : locale === "hi"
      ? "सांगळे - अ ग्रुप ऑफ कंपनीज (SANGALES – A GROUP OF COMPANIES) एक एकीकृत मूल ब्रांड के रूप में कार्य करता है, जो स्वतंत्र और उद्देश्य-संचालित उद्यमों को पोषित करता है। कृषि उत्पादन और पौष्टिक आहार से लेकर थोक संस्थागत आपूर्ति, व्यापारिक नेटवर्क और पैकेजिंग समाधानों तक, हमारा मानना है कि वास्तविक कॉर्पोरेट शक्ति धैर्यपूर्ण मूल्य निर्माण में निहित है।"
      : settings.aboutDescription;

  const introSecondary =
    locale === "mr"
      ? "सांगळे समूहाच्या छत्राखालील प्रत्येक व्यवसाय स्वतःची स्वतंत्र ओळख, ग्राहक विश्वास आणि विशेष कौशल्य जोपासतो—तसेच पालक समूहाच्या आर्थिक शिस्त, व्यावसायिक नीतिमत्ता आणि धोरणात्मक मार्गदर्शनाचा पूर्ण लाभ घेतो."
      : locale === "hi"
      ? "सांगळे समूह के अंतर्गत प्रत्येक व्यवसाय अपनी समर्पित ब्रांड पहचान, ग्राहक विश्वास और विशिष्ट विशेषज्ञता बनाए रखता है—साथ ही मूल समूह के वित्तीय अनुशासन, व्यावसायिक नैतिकता और रणनीतिक मार्गदर्शन से सशक्त होता है।"
      : settings.aboutSecondaryText;

  const positioningBadge =
    locale === "mr" ? "ब्रँड स्थान व उद्दिष्ट" : locale === "hi" ? "ब्रांड स्थिति एवं उद्देश्य" : "Brand Positioning";

  const positioningText =
    locale === "mr"
      ? "शाश्वत व्यवसाय उभारणी, रोजगाराच्या नव्या संधी निर्मिती आणि विविध क्षेत्रांत दीर्घकालीन विश्वासू भागीदारी विकसित करण्यावर केंद्रित वेगाने वाढणारा भारतीय व्यवसाय समूह."
      : locale === "hi"
      ? "टिकाऊ व्यवसाय निर्माण, नए अवसरों के सृजन और विभिन्न उद्योगों में दीर्घकालिक विश्वसनीय साझेदारी विकसित करने पर केंद्रित एक बढ़ता हुआ भारतीय व्यापार समूह।"
      : "A growing Indian business group focused on building sustainable businesses, creating opportunities, and developing long-term partnerships across multiple industries.";

  const approachBadge =
    locale === "mr" ? "व्यवसाय तत्त्वप्रणाली" : locale === "hi" ? "व्यावसायिक दर्शन" : "Business Philosophy";

  const approachHeadline =
    locale === "mr"
      ? "आमचा उद्योजकता दृष्टिकोन"
      : locale === "hi"
      ? "हमारा उद्यमिता दृष्टिकोण"
      : "Our Approach to Entrepreneurship";

  const approachDesc =
    locale === "mr"
      ? "आम्ही विकेंद्रित परंतु शिस्तबद्ध व्यावसायिक प्रशासनाची पद्धत अवलंबतो. सांगळे समूहातील प्रत्येक उपक्रम स्पष्ट उद्दिष्टे, जबाबदार नेतृत्व आणि स्वतंत्र कार्यसंस्कृतीसह कार्यरत आहे."
      : locale === "hi"
      ? "हम विकेंद्रीकृत किंतु अनुशासित व्यावसायिक प्रशासन पद्धति का पालन करते हैं। सांगळे परिवार का प्रत्येक उद्यम स्पष्ट जनादेश, जवाबदेह नेतृत्व और विशिष्ट कार्य संस्कृति के साथ स्थापित है।"
      : "We practice a decentralized yet disciplined model of business governance. Each enterprise within the Sangales family is established with a clear mandate, its own leadership accountability, and a distinct operational culture.";

  const pillars = [
    {
      icon: Building2,
      title:
        locale === "mr"
          ? "स्वतंत्र ओळख"
          : locale === "hi"
          ? "स्वतंत्र पहचान"
          : "Independent Identity",
      desc:
        locale === "mr"
          ? "प्रत्येक व्यवसाय उत्पादन विकास, ग्राहक व्यवहार आणि डोमेन विशेषीकरणात स्वायत्तता राखतो."
          : locale === "hi"
          ? "प्रत्येक परिचालन व्यवसाय उत्पाद विकास, ग्राहक संपर्क और डोमेन विशेषज्ञता में स्वायत्तता रखता है।"
          : "Operating businesses maintain autonomy in product development, customer interactions, and domain specialization.",
    },
    {
      icon: ShieldCheck,
      title:
        locale === "mr"
          ? "पालक समूहाचे प्रशासन"
          : locale === "hi"
          ? "मूल समूह का सुशासन"
          : "Parent Governance",
      desc:
        locale === "mr"
          ? "समूहव्यापी मानके वैधानिक अनुपालन, आर्थिक शिस्त आणि सर्व भागीदारांशी नैतिक बांधिलकी सुनिश्चित करतात."
          : locale === "hi"
          ? "समूहव्यापी मानक वैधानिक अनुपालन, वित्तीय अनुशासन और सभी भागीदारों के साथ नैतिक व्यवहार सुनिश्चित करते हैं।"
          : "Group-wide standards enforce statutory compliance, financial discipline, and ethical engagement with all partners.",
    },
    {
      icon: Sprout,
      title:
        locale === "mr"
          ? "सामायिक पायाभूत सुविधा"
          : locale === "hi"
          ? "साझा अवसंरचना"
          : "Shared Infrastructure",
      desc:
        locale === "mr"
          ? "आमच्या कंपन्या लॉजिस्टिक कॉरिडॉर, तांत्रिक प्लॅटफॉर्म आणि संस्थात्मक व्यापारी नेटवर्कच्या समन्वयाचा पुरेपूर फायदा घेतात."
          : locale === "hi"
          ? "परिचालन कंपनियां लॉजिस्टिक्स कॉरिडोर, तकनीकी प्लेटफॉर्म और संस्थागत व्यापार नेटवर्क के साझा तालमेल का लाभ उठाती हैं।"
          : "Operating companies leverage group synergies across logistics corridors, technological platforms, and institutional trade networks.",
    },
  ];

  const futureBadge =
    locale === "mr" ? "धोरणात्मक भविष्याची वाटचाल" : locale === "hi" ? "रणनीतिक भविष्य का मार्ग" : "Strategic Road Ahead";

  const futureHeadline =
    locale === "mr"
      ? "भविष्यातील दिशा आणि विस्तार"
      : locale === "hi"
      ? "भावी दिशा एवं विस्तार"
      : "Future Direction & Expansion";

  const futureDesc =
    locale === "mr"
      ? "भविष्याचा वेध घेताना, सांगळे समूह तंत्रज्ञानावर आधारित वाणिज्य, स्मार्ट पुरवठा साखळी आणि विशेष इनक्युबेशनची पायाभरणी करत आहे. सांगळे डिजिटल, सांगळे लॉजिस्टिक्स आणि व्हेंचर प्लॅटफॉर्म्ससह आगामी उपक्रम तरुण प्रतिभा, स्थानिक उत्पादक आणि संस्थात्मक ग्राहकांसाठी अमर्याद संधी निर्माण करतील."
      : locale === "hi"
      ? "आगामी वर्षों की ओर देखते हुए, सांगळे समूह प्रौद्योगिकी-सक्षम वाणिज्य, आधुनिक आपूर्ति श्रृंखला और विशेष इन्क्यूबेशन की नींव रख रहा है। सांगळे डिजिटल, सांगळे लॉजिस्टिक्स और नए उपक्रम युवा प्रतिभाओं, स्थानीय उत्पादकों और संस्थागत ग्राहकों के लिए नए अवसर सृजित करेंगे।"
      : "As we look toward the coming years, Sangales is laying the foundation for technology-enabled commerce, intelligent supply chains, and specialized incubation. Future initiatives—including Sangales Digital, Sangales Logistics, and venture platforms—will expand our capacity to create opportunities for young talent, regional producers, and enterprise clients.";

  const ctaVision =
    locale === "mr"
      ? "ध्येय आणि मूल्ये पहा"
      : locale === "hi"
      ? "दृष्टिकोण और मूल्य देखें"
      : "Explore Vision & Values";

  const ctaPortfolio =
    locale === "mr"
      ? "समूहातील सर्व व्यवसाय पहा"
      : locale === "hi"
      ? "समूह के सभी व्यवसाय देखें"
      : "View Group Portfolio";

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

      {/* Main Narrative Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20">
        {/* Section 1: Introduction & Background */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase">
              <span className="w-8 h-[2px] bg-gold-600" />
              {introBadge}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
              {introHeadline}
            </h2>
            <p className="text-base sm:text-lg text-charcoal leading-relaxed">
              {introDesc}
            </p>
            <p className="text-sm sm:text-base text-charcoal-100 leading-relaxed">
              {introSecondary}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden shadow-editorial border border-stone-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200"
                alt="Sangales Corporate Discussion"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-6 bg-navy text-stone-300">
                <p className="text-xs font-semibold tracking-wider uppercase text-gold">
                  {positioningBadge}
                </p>
                <p className="font-heading text-base font-bold text-white mt-1">
                  {positioningText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Approach to Entrepreneurship */}
        <section className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase block mb-2">
              {approachBadge}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
              {approachHeadline}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-100 leading-relaxed">
              {approachDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-sm bg-offwhite border border-stone-200/60 space-y-3">
                  <Icon className="w-6 h-6 text-navy" />
                  <h3 className="font-heading text-base font-bold text-navy">{item.title}</h3>
                  <p className="text-xs text-charcoal-100 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Future Direction */}
        <section className="bg-navy text-white p-8 sm:p-12 rounded-sm space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-gold text-xs font-bold tracking-superwide uppercase block">
              {futureBadge}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              {futureHeadline}
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              {futureDesc}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link
              href="/our-vision"
              className="px-6 py-3 bg-gold hover:bg-white text-navy font-bold text-xs tracking-wider uppercase rounded-sm transition-all text-center"
            >
              {ctaVision}
            </Link>
            <Link
              href="/businesses"
              className="px-6 py-3 border border-white/30 hover:bg-white/10 text-white font-medium text-xs tracking-wider uppercase rounded-sm transition-all text-center"
            >
              {ctaPortfolio}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

