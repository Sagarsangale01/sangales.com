import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Building, ShieldCheck } from "lucide-react";
import CorporateContactForm from "@/components/forms/CorporateContactForm";
import { getPublishedBusinesses } from "@/services/businessService";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "Contact Us & Business Enquiries | Sangales Group",
  description:
    "Connect with SANGALES – A GROUP OF COMPANIES. Direct enquiry channels for partnerships, wholesale supply, dealerships, and institutional procurement.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  const [businesses, settings] = await Promise.all([
    getPublishedBusinesses(),
    Promise.resolve(getSiteSettings()),
  ]);

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
              Corporate Office &bull; Enquiry Desk
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Contact &amp; Partnerships
            </h1>
            <p className="text-lg text-stone-200 font-light leading-relaxed">
              Connect with our corporate office or route specific commercial inquiries to our individual operating divisions.
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
                Direct Channels
              </span>
              <h2 className="font-heading text-2xl font-bold text-navy">
                Corporate Headquarters
              </h2>

              <div className="space-y-4 text-sm text-charcoal">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase font-bold text-stone-400">Postal Address</span>
                    <span className="font-medium text-navy">{settings.corporateAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase font-bold text-stone-400">Corporate Email</span>
                    <a href={`mailto:${settings.contactEmail}`} className="text-navy hover:text-gold font-medium">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase font-bold text-stone-400">Telephone Hotline</span>
                    <a href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`} className="text-navy hover:text-gold font-medium">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase font-bold text-stone-400">Desk Working Hours</span>
                    <span>{settings.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="bg-navy text-white p-8 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-gold">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-heading text-base font-bold">Partnership Review Process</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                All business proposals—from mandi sourcing contracts to regional distribution alliances—are formally logged, assigned a tracking reference, and reviewed by authorized group executives.
              </p>
            </div>
          </div>

          {/* Right Column: Unified Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="bg-white p-8 rounded-sm border border-stone-200">Loading enquiry desk...</div>}>
              <CorporateContactForm businesses={businesses} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
