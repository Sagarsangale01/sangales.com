import React from "react";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-offwhite px-4 py-24 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-sm border border-stone-200 shadow-editorial space-y-6">
        <div className="w-16 h-16 rounded-sm bg-navy-50 border border-navy-100 flex items-center justify-center mx-auto text-navy">
          <Building2 className="w-8 h-8 text-gold-700" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
            Error 404 &bull; Resource Not Located
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-100 leading-relaxed font-light">
            The requested corporate document, operating business profile, or media release could not be found or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/businesses"
            className="w-full sm:w-auto px-6 py-3 bg-offwhite hover:bg-stone-200 text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-stone-200"
          >
            Explore Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
