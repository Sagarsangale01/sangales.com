import React from "react";
import Link from "next/link";
import { ArrowRight, Building, TrendingUp } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";

interface Props {
  settings?: SiteSettings;
}

export default function GroupPhilosophy({ settings }: Props) {
  const subtitle = settings?.aboutSubtitle || "Corporate Identity & Philosophy";
  const headline = settings?.aboutHeadline || "One Vision. Multiple Businesses.";
  const desc1 =
    settings?.aboutDescription ||
    "SANGALES is a diversified business group bringing together business initiatives across multiple industries. From farm gate cultivation and wholesome pantry essentials to wholesale enterprise supplies, trading networks, and engineered packaging, we believe true corporate strength lies in patient value creation.";
  const desc2 =
    settings?.aboutSecondaryText ||
    "Every business under the SANGALES umbrella retains its dedicated brand ethos, client connections, and specialized domain expertise—while anchoring itself in group-wide standards of operational discipline, transparency, and long-term partnership reliability.";

  return (
    <section className="py-20 lg:py-28 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-bold tracking-superwide uppercase">
              <span className="w-8 h-[2px] bg-gold-600" />
              {subtitle}
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
              {headline}
            </h2>

            <p className="text-base sm:text-lg text-charcoal leading-relaxed">
              {desc1}
            </p>

            <p className="text-sm sm:text-base text-charcoal-100 leading-relaxed">
              {desc2}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border border-stone-200/60 shadow-sm">
                <Building className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy">Corporate Governance</h4>
                  <p className="text-xs text-charcoal-100 mt-0.5">Transparent stewardship and institutional operational principles.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-white border border-stone-200/60 shadow-sm">
                <TrendingUp className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy">Sustainable Growth</h4>
                  <p className="text-xs text-charcoal-100 mt-0.5">Value-focused expansion that uplifts local supply ecosystems.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold tracking-wider uppercase group"
              >
                <span>Read Full Corporate Profile</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-gold" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Feature Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-stone-200 bg-white">
              <div className="relative h-80 sm:h-96">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"
                  alt="Sangales Group Leadership and Strategy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[10px] tracking-superwide font-bold uppercase text-gold">
                    Parent Group Commitment
                  </span>
                  <p className="font-heading text-lg font-bold">
                    Empowering our portfolio companies with strategic capital, distribution reach, and operational excellence.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-navy text-stone-200 space-y-3">
                <div className="flex items-center justify-between border-b border-navy-800 pb-2 text-xs">
                  <span className="text-stone-400">Target Industry Segments</span>
                  <span className="text-white font-semibold">Food &bull; Agri &bull; Lighting &bull; Trading &bull; Packaging</span>
                </div>
                <div className="flex items-center justify-between border-b border-navy-800 pb-2 text-xs">
                  <span className="text-stone-400">Headquarters</span>
                  <span className="text-white font-semibold">{settings?.corporateAddress || "Maharashtra, India"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Operational Philosophy</span>
                  <span className="text-gold font-semibold">Customer Centric &bull; Long-term Trust</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
