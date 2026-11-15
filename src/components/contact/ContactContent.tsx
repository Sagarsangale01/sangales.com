"use client";

import React, { Suspense } from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck, MessageCircle, ExternalLink } from "lucide-react";
import CorporateContactForm from "@/components/forms/CorporateContactForm";
import FAQSection from "@/components/common/FAQSection";
import { BusinessRecord } from "@/lib/data";
import { SiteSettings } from "@/services/settingsService";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  businesses: BusinessRecord[];
  settings: SiteSettings;
}

export default function ContactContent({ businesses, settings }: Props) {
  const { dict, locale } = useLanguage();

  const heroBadge =
    locale === "mr"
      ? "कॉर्पोरेट कार्यालय • चौकशी कक्ष"
      : locale === "hi"
      ? "कॉर्पोरेट कार्यालय • पूछताछ डेस्क"
      : "Corporate Office • Enquiry Desk";

  const heroTitle =
    locale === "mr"
      ? "संपर्क आणि व्यावसायिक भागीदारी"
      : locale === "hi"
      ? "संपर्क एवं व्यावसायिक साझेदारी"
      : "Contact & Partnerships";

  const heroDesc =
    locale === "mr"
      ? "आमच्या मुख्य कार्यालयाशी संपर्क साधा किंवा समूहातील संबंधित विभागाकडे थेट व्यावसायिक चौकशी पाठवा."
      : locale === "hi"
      ? "हमारे कॉर्पोरेट कार्यालय से संपर्क करें अथवा संबंधित व्यावसायिक प्रभाग को अपनी आवश्यकता भेजें।"
      : "Connect with our corporate office or route specific commercial inquiries to our individual operating divisions.";

  const directChannelsBadge =
    locale === "mr" ? "थेट संपर्क मार्ग" : locale === "hi" ? "प्रत्यक्ष संपर्क माध्यम" : "Direct Channels";

  const hqTitle =
    locale === "mr" ? "कॉर्पोरेट मुख्यालय" : locale === "hi" ? "कॉर्पोरेट मुख्यालय" : "Corporate Headquarters";

  const postalLabel =
    locale === "mr" ? "पत्ता" : locale === "hi" ? "डाक पता" : "Postal Address";

  const emailLabel =
    locale === "mr" ? "कॉर्पोरेट ईमेल" : locale === "hi" ? "कॉर्पोरेट ईमेल" : "Corporate Email";

  const phoneLabel =
    locale === "mr" ? "हॉटलाइन फोन नंबर" : locale === "hi" ? "हॉटलाइन फोन नंबर" : "Telephone Hotline";

  const hoursLabel =
    locale === "mr" ? "कार्यालयीन वेळ" : locale === "hi" ? "कार्यालय समय" : "Desk Working Hours";

  const hoursVal =
    locale === "mr"
      ? "सोमवार - शनिवार, सकाळी ९:०० ते संध्याकाळी ७:००"
      : locale === "hi"
      ? "सोमवार - शनिवार, प्रातः 9:00 से सायं 7:00"
      : settings.workingHours || "Monday - Saturday, 9:00 AM - 7:00 PM";

  const waTitle =
    locale === "mr" ? "त्वरित व्हॉट्सॲप संपर्क" : locale === "hi" ? "त्वरित व्हाट्सएप संपर्क" : "Instant WhatsApp Connect";

  const waDesc =
    locale === "mr"
      ? "उत्पादन सूची, तात्काळ दरपत्रक किंवा थेट ऑर्डर देण्यासाठी आमच्या नाशिक कॉर्पोरेट प्रतिनिधींशी थेट बोला."
      : locale === "hi"
      ? "उत्पाद कैटलॉग, तत्काल कोटेशन या सीधी ऑर्डर बुकिंग के लिए नाशिक कॉर्पोरेट डेस्क से सीधे जुड़ें।"
      : "Need urgent catalog specs, pricing sheets, or direct order placement? Connect directly with our Nashik corporate representative desk.";

  const waBtn =
    locale === "mr"
      ? "व्हॉट्सॲपवर बोला (+91 75077 00936)"
      : locale === "hi"
      ? "व्हाट्सएप पर चैट करें (+91 75077 00936)"
      : "Chat on WhatsApp (+91 75077 00936)";

  const reviewTitle =
    locale === "mr" ? "भागीदारी पडताळणी प्रक्रिया" : locale === "hi" ? "साझेदारी समीक्षा प्रक्रिया" : "Partnership Review Process";

  const reviewDesc =
    locale === "mr"
      ? "थेट शेतकरी पुरवठ्यापासून ते प्रादेशिक वितरण करारांपर्यंत — प्रत्येक व्यावसायिक प्रस्ताव अधिकृत अधिकाऱ्यांद्वारे नोंदवला जातो आणि २४ ते ४८ तासांत पडताळला जातो."
      : locale === "hi"
      ? "मंडियों से अनाज खरीद से लेकर क्षेत्रीय वितरण तक — सभी व्यावसायिक प्रस्ताव विधिवत दर्ज किए जाते हैं और 24-48 घंटों में समीक्षा उपरांत संपर्क किया जाता है।"
      : "All business proposals—from mandi sourcing contracts to regional distribution alliances—are formally logged, assigned a tracking reference, and reviewed by authorized group executives.";

  const loadingText =
    locale === "mr" ? "चौकशी कक्ष लोड होत आहे..." : locale === "hi" ? "पूछताछ डेस्क लोड हो रहा है..." : "Loading enquiry desk...";

  const faqTitle =
    locale === "mr"
      ? "वारंवार विचारले जाणारे प्रश्न (FAQ)"
      : locale === "hi"
      ? "अक्सर पूछे जाने वाले प्रश्न (FAQ)"
      : "Frequently Asked Questions";

  const faqSubtitle =
    locale === "mr"
      ? "सांगळे समूहातील कंपन्यांशी सहकार्य, घाऊक खरेदी आणि भागीदारी संदर्भातील सर्व माहिती."
      : locale === "hi"
      ? "सांगळे समूह की कंपनियों के साथ साझेदारी, थोक खरीद और व्यावसायिक सहयोग से संबंधित महत्वपूर्ण जानकारी।"
      : "Everything you need to know about partnering, purchasing, and working with SANGALES GROUP operating companies.";

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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Corporate Information & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-sm border border-stone-200/80 shadow-sm space-y-6">
              <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase block">
                {directChannelsBadge}
              </span>
              <h2 className="font-heading text-2xl font-bold text-navy">
                {hqTitle}
              </h2>

              <div className="space-y-4 text-sm text-charcoal">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase font-bold text-stone-400">{postalLabel}</span>
                    <a
                      href="https://maps.google.com/?q=Samruddhi+Park+Kapaleshwar+nagar+Panchwati+Nashik+Maharashtra+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-navy hover:text-gold transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{settings.corporateAddress}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-gold shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase font-bold text-stone-400">{emailLabel}</span>
                    <a href={`mailto:${settings.contactEmail}`} className="text-navy hover:text-gold font-medium">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase font-bold text-stone-400">{phoneLabel}</span>
                    <a href={`tel:${settings.contactPhone.replace(/[^0-9+]/g, "")}`} className="text-navy hover:text-gold font-medium">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase font-bold text-stone-400">{hoursLabel}</span>
                    <span>{hoursVal}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Priority Connect Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-navy text-white p-6 sm:p-7 rounded-sm border border-emerald-500/30 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-400">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-heading text-base font-bold text-white">{waTitle}</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {waDesc}
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/917507700936?text=Hello%20SANGALES%20Group,%20I%20would%20like%20to%20connect%20regarding%20commercial%20requirements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{waBtn}</span>
                </a>
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="bg-navy text-white p-8 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-gold">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-heading text-base font-bold">{reviewTitle}</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {reviewDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Unified Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="bg-white p-8 rounded-sm border border-stone-200">{loadingText}</div>}>
              <CorporateContactForm businesses={businesses} />
            </Suspense>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="mt-20 border-t border-stone-200 pt-16">
          <FAQSection title={faqTitle} subtitle={faqSubtitle} />
        </div>
      </div>
    </div>
  );
}

