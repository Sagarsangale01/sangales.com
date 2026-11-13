import React from "react";
import { ShieldCheck, Truck, FileCheck, PhoneCall } from "lucide-react";

interface Props {
  businessName?: string;
  className?: string;
}

export default function TrustReassuranceBar({ businessName, className = "" }: Props) {
  const points = [
    {
      icon: ShieldCheck,
      title: "Direct Wholesale Pricing",
      desc: "Transparent manufacturer rates with tiered volume discounts.",
    },
    {
      icon: Truck,
      title: "Swift Dispatch & Logistics",
      desc: "Staged warehouse inventory with rapid transit across Maharashtra & Pan-India.",
    },
    {
      icon: FileCheck,
      title: "100% GST Tax Compliant",
      desc: "Full statutory billing eligible for commercial input tax credit (ITC).",
    },
    {
      icon: PhoneCall,
      title: "Dedicated Account Support",
      desc: "Instant hotline (+91 75077 00936) & WhatsApp contractor coordination.",
    },
  ];

  return (
    <section className={`bg-navy-950 text-white border-y border-gold/20 py-6 sm:py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, i) => (
            <div key={i} className="flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 group-hover:border-gold/40 transition-colors">
                <pt.icon className="w-5 h-5 text-gold" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-heading text-sm font-bold text-white group-hover:text-gold transition-colors">
                  {pt.title}
                </h4>
                <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
