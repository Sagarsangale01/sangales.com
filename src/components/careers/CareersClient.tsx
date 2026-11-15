"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { CareerRecord } from "@/lib/data";
import JobApplicationModal from "@/components/forms/JobApplicationModal";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  careers: CareerRecord[];
}

export default function CareersClient({ careers }: Props) {
  const { locale } = useLanguage();
  const [selectedJob, setSelectedJob] = useState<CareerRecord | null>(null);

  const cultureBadge =
    locale === "mr" ? "सांगळे समूहामध्ये काम करा" : locale === "hi" ? "सांगळे समूह के साथ काम करें" : "Work With Sangales";

  const cultureTitle =
    locale === "mr"
      ? "आमच्यासोबत अर्थपूर्ण उद्योगांची उभारणी करा"
      : locale === "hi"
      ? "हमारे साथ सार्थक उद्यमों का निर्माण करें"
      : "Build Meaningful Enterprises With Us";

  const cultureDesc =
    locale === "mr"
      ? "सांगळे समूहामध्ये आम्ही स्वायत्तता, तांत्रिक कौशल्य आणि दीर्घकालीन दृष्टिकोनाला सर्वोच्च प्राधान्य देतो. मग ते अन्न प्रक्रिया असो, शाश्वत शेती असो, व्यावसायिक व्यापार असो किंवा पॅकेजिंग डिझाइन असो—प्रत्येक सहकारी थेट समाज मूल्य निर्मितीमध्ये योगदान देतो."
      : locale === "hi"
      ? "सांगळे समूह में हम एक ऐसे वातावरण को बढ़ावा देते हैं जहाँ स्वायत्तता, तकनीकी दक्षता और दीर्घकालिक दृष्टिकोण को प्राथमिकता दी जाती है। चाहे वह खाद्य प्रसंस्करण हो, टिकाऊ कृषि, वाणिज्यिक व्यापार या पैकेजिंग डिजाइन—प्रत्येक टीम सदस्य सीधे तौर पर सामुदायिक मूल्य सृजन में योगदान देता है।"
      : "At Sangales, we foster an environment where autonomy, technical mastery, and long-term perspective are prioritized. Whether in food processing, sustainable agronomy, commercial trading, or packaging design, every team member contributes directly to community value creation.";

  const openingsTitle =
    locale === "mr"
      ? `सध्या उपलब्ध संधी (${careers.length})`
      : locale === "hi"
      ? `वर्तमान अवसर (${careers.length})`
      : `Current Opportunities (${careers.length})`;

  const openingsBadge =
    locale === "mr" ? "अधिकृत रिक्त पदे" : locale === "hi" ? "सत्यापित रिक्तियां" : "Verified Openings";

  const emptyTitle =
    locale === "mr"
      ? "या क्षणी कोणतीही नवीन पदभरती उपलब्ध नाही"
      : locale === "hi"
      ? "इस समय कोई सक्रिय रिक्ति उपलब्ध नहीं है"
      : "No active openings at this moment";

  const emptyDesc =
    locale === "mr"
      ? "कृपया वेळोवेळी येथे तपासा किंवा आपला बायोडेटा (Resume) contact.sangales@gmail.com वर पाठवा."
      : locale === "hi"
      ? "कृपया समय-समय पर यहाँ देखें अथवा अपना बायोडाटा (Resume) contact.sangales@gmail.com पर भेजें।"
      : "Please check back periodically or email your resume to contact.sangales@gmail.com";

  const applyBtnText =
    locale === "mr" ? "अर्ज करा" : locale === "hi" ? "आवेदन करें" : "Apply Now";

  return (
    <div className="space-y-12">
      {/* Culture Strip */}
      <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase">
            {cultureBadge}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
            {cultureTitle}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-100 leading-relaxed">
            {cultureDesc}
          </p>
        </div>
      </div>

      {/* Active Openings Listing */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-navy">
            {openingsTitle}
          </h3>
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            {openingsBadge}
          </span>
        </div>

        {careers.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-sm border border-stone-200">
            <Briefcase className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h4 className="font-heading text-base font-bold text-navy">{emptyTitle}</h4>
            <p className="text-xs text-charcoal-100 mt-1">{emptyDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {careers.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-sm hover:shadow-editorial transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-navy text-gold text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      {job.businessName}
                    </span>
                    <span className="px-2.5 py-0.5 bg-offwhite text-charcoal-100 text-[10px] font-semibold uppercase tracking-wider rounded-sm border border-stone-200/60">
                      {job.department}
                    </span>
                  </div>

                  <h4 className="font-heading text-xl font-bold text-navy">
                    {job.title}
                  </h4>

                  <p className="text-xs text-charcoal-100 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-700" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-700" />
                      {job.employmentType}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full md:w-auto px-6 py-3 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{applyBtnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <JobApplicationModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}
