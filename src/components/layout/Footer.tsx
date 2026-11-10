import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, Globe } from "lucide-react";
import { getSiteSettings, SiteSettings } from "@/services/settingsService";
import { BusinessRecord } from "@/lib/data";
import { getStore } from "@/lib/store";

interface FooterProps {
  settings?: SiteSettings;
  businesses?: BusinessRecord[];
}

export default function Footer({ settings: propSettings, businesses: propBusinesses }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const settings = propSettings || getSiteSettings();
  const businesses = propBusinesses || getStore().businesses.filter(b => b.status === "PUBLISHED");

  return (
    <footer className="bg-navy text-stone-300 border-t border-navy-800">
      {/* Upper Pre-footer Banner */}
      <div className="border-b border-navy-700/60 py-12 bg-navy-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-gold text-xs font-semibold tracking-superwide uppercase block mb-1">
              {settings.descriptor}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              {settings.tagline}
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold hover:bg-white text-navy font-semibold text-xs tracking-wider uppercase rounded-sm transition-all shadow-md group"
          >
            <span>Initiate an Enquiry</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Main Corporate Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <img
                src="/logos/sangales-logo-white.png"
                alt="SANGALES – A GROUP OF COMPANIES"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              A diversified Indian business group bringing together wholesome food, sustainable agriculture, commercial trading, packaging solutions, and next-generation enterprise innovation.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-xs text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-gold" /> Registered in India
              </span>
              <span>&bull;</span>
              <span>Corporate ID: SANGALES-GRP</span>
            </div>
          </div>

          {/* Group Portfolio Links */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest text-white uppercase mb-4 border-l-2 border-gold pl-2">
              Group Portfolio
            </h4>
            <ul className="space-y-2.5 text-sm">
              {businesses.slice(0, 6).map((b) => (
                <li key={b.id}>
                  <Link href={`/businesses/${b.slug}`} className="hover:text-gold transition-colors">
                    {b.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/businesses" className="text-gold hover:underline text-xs inline-flex items-center gap-1 mt-1">
                  View Full Directory &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest text-white uppercase mb-4 border-l-2 border-gold pl-2">
              Corporate
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About the Group
                </Link>
              </li>
              <li>
                <Link href="/our-vision" className="hover:text-gold transition-colors">
                  Vision &amp; Values
                </Link>
              </li>
              <li>
                <Link href="/our-journey" className="hover:text-gold transition-colors">
                  Our Milestones
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-gold transition-colors">
                  News &amp; Media
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-gold transition-colors">
                  Careers &amp; Openings
                </Link>
              </li>
              {/* <li>
                <Link href="/admin" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
                  Admin CMS
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Direct Contact & Support */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest text-white uppercase mb-4 border-l-2 border-gold pl-2">
              Corporate Office
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{settings.corporateAddress}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-gold transition-colors">
                  {settings.contactEmail}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>{settings.contactPhone}</span>
              </p>
              <div className="pt-2">
                <Link
                  href="/contact?type=Partnership"
                  className="text-xs font-semibold text-gold uppercase tracking-wider hover:underline"
                >
                  Commercial &amp; Partnership Desk &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800 bg-navy-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            &copy; {currentYear} {settings.siteName} &ndash; {settings.descriptor}. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-stone-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-stone-200 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-stone-200 transition-colors">
              Grievance Officer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
