"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-offwhite px-4 py-20 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-sm border border-stone-200 shadow-editorial space-y-6">
        <div className="w-14 h-14 rounded-sm bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-700">
            System Notice &bull; Rendering Interruption
          </span>
          <h2 className="font-heading text-2xl font-bold text-navy">
            Temporary System Error
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-100 font-light leading-relaxed">
            An unexpected error occurred while communicating with the corporate platform services. Our administrative engineering desk has been notified.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-offwhite hover:bg-stone-200 text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-stone-200 inline-flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

