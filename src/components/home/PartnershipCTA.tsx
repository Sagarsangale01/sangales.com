import React from "react";
import Link from "next/link";
import { ArrowUpRight, Handshake, Truck, Store, Boxes } from "lucide-react";
import { SiteSettings } from "@/services/settingsService";

interface Props {
  settings?: SiteSettings;
}

export default function PartnershipCTA({ settings }: Props) {
  const headline = settings?.partnershipHeadline || "Let's Build Something Together.";
  const subtitle =
    settings?.partnershipSubtitle ||
    "We actively seek long-term partnerships with distributors, institutional buyers, suppliers, and entrepreneurs who value quality and mutual growth.";

  const avenues = [
    {
      icon: Store,
      title: "Distribution & Dealerships",
      desc: "Distribute Annamrit Foods healthy meals, or Sangales Packaging 4CP meal boxes, aluminium containers & paper bags across market channels.",
      type: "Distribution",
    },
    {
      icon: Truck,
      title: "Supplier & Mandi Linkages",
      desc: "Supply bulk grain, farm inputs, raw materials, or specialized packaging substrates.",
      type: "Supplier",
    },
    {
      icon: Boxes,
      title: "Wholesale & Enterprise Procurement",
      desc: "Contract procurement for corporate facilities, hotel chains, and industrial kitchens.",
      type: "Wholesale",
    },
    {
      icon: Handshake,
      title: "Strategic Business Collaboration",
      desc: "Joint commercial ventures, contract manufacturing, or technology co-development.",
      type: "Partnership",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-gold text-xs font-bold tracking-superwide uppercase">
            Commercial &bull; Institutional &bull; Growth
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
                  <span>Initiate Request</span>
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
              Have a tailored proposition or enterprise requirement?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Our corporate leadership desk reviews and responds to every verified business proposal within 24–48 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-gold hover:bg-white text-navy font-bold text-xs tracking-widest uppercase rounded-sm transition-all shadow-md shrink-0"
          >
            Connect With Corporate Desk
          </Link>
        </div>
      </div>
    </section>
  );
}
