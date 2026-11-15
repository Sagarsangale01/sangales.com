"use client";

import React from "react";
import CareersClient from "@/components/careers/CareersClient";
import { CareerRecord } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  careers: CareerRecord[];
}

export default function CareersContent({ careers }: Props) {
  const { locale } = useLanguage();

  const heroBadge =
    locale === "mr" ? "मानव संसाधन • करिअर" : locale === "hi" ? "मानव संसाधन • करियर" : "People • Careers";

  const heroTitle =
    locale === "mr"
      ? "सांगळे समूहामध्ये करिअर (Careers at Sangales)"
      : locale === "hi"
      ? "सांगळे समूह में करियर (Careers at Sangales)"
      : "Careers at Sangales";

  const heroDesc =
    locale === "mr"
      ? "दीर्घकालीन मूल्य, शाश्वत कार्यप्रणाली आणि समाजाचे सक्षमीकरण करणाऱ्या एका समर्पित भारतीय व्यावसायिक कुटुंबात सामील व्हा."
      : locale === "hi"
      ? "दीर्घकालिक मूल्य, सतत संचालन और सामुदायिक सशक्तिकरण को समर्पित एक प्रतिष्ठित भारतीय कॉर्पोरेट परिवार का हिस्सा बनें।"
      : "Join a dedicated Indian corporate family building long-term value, sustainable operations, and community empowerment.";

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      {/* Editorial Page Header */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600')`,
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

      {/* Main Careers Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CareersClient careers={careers} />
      </div>
    </div>
  );
}

