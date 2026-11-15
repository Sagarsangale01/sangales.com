"use client";

import React from "react";
import { FileSpreadsheet, CheckCheck, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProcurementProcessProps {
  businessName: string;
  category?: string;
  isLandingMode?: boolean;
}

export default function ProcurementProcess({
  businessName,
  category,
  isLandingMode = false,
}: ProcurementProcessProps) {
  const { dict, locale } = useLanguage();

  const steps = [
    {
      step: dict.procurement.step1Num,
      title: dict.procurement.step1Title,
      description: dict.procurement.step1Desc,
      icon: FileSpreadsheet,
      highlight: dict.procurement.step1Badge,
    },
    {
      step: dict.procurement.step2Num,
      title: dict.procurement.step2Title,
      description: dict.procurement.step2Desc,
      icon: CheckCheck,
      highlight: dict.procurement.step2Badge,
    },
    {
      step: dict.procurement.step3Num,
      title: dict.procurement.step3Title,
      description: dict.procurement.step3Desc,
      icon: Truck,
      highlight: dict.procurement.step3Badge,
    },
  ];

  const localizedBiz = dict.businesses[businessName.toLowerCase().replace(/\s+/g, "-")];
  const displayName = localizedBiz?.name || businessName;

  return (
    <section className="bg-white rounded-sm border border-stone-200/80 p-6 sm:p-10 shadow-sm space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase mb-1">
            <span className="w-6 h-[2px] bg-gold-600" />
            {dict.procurement.tagline}
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
            {dict.procurement.titlePrefix} {displayName}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-100 mt-1 max-w-2xl">
            {dict.procurement.subtitle}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-stone-500 bg-offwhite px-3 py-1.5 rounded-sm border border-stone-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{dict.trust.gstBillingBadge}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="relative bg-offwhite/70 hover:bg-white rounded-sm p-6 border border-stone-200/80 transition-all hover:shadow-md hover:border-gold/40 flex flex-col justify-between group"
            >
              {/* Step indicator badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-navy text-gold font-heading font-extrabold text-sm flex items-center justify-center shadow-sm group-hover:bg-gold group-hover:text-navy transition-colors">
                  {st.step}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold/10 px-2 py-0.5 rounded-sm border border-gold/20">
                  {st.highlight}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-navy group-hover:text-gold transition-colors shrink-0" />
                  <h3 className="font-heading text-base font-bold text-navy">
                    {st.title}
                  </h3>
                </div>
                <p className="text-xs text-charcoal-100 leading-relaxed font-light">
                  {st.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-bold text-navy group-hover:text-gold transition-colors">
                <span>
                  {dict.procurement.stepIndicator} {idx + 1} / 3
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-gold" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
