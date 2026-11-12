import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SANGALES GROUP",
  description: "Terms and conditions of website use for SANGALES – A GROUP OF COMPANIES.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-offwhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200 shadow-sm space-y-6 text-charcoal">
          <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">
            Legal &bull; Terms of Use
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: October 2026 &bull; SANGALES – A GROUP OF COMPANIES
          </p>

          <div className="prose prose-stone text-sm leading-relaxed space-y-4">
            <h2 className="font-heading text-lg font-bold text-navy mt-6">1. Acceptance of Terms</h2>
            <p>
              By accessing and navigating www.sangales.com (&quot;the Website&quot;), you acknowledge and agree to be bound by these Terms and Conditions and all applicable statutory laws and regulations in India.
            </p>

            <h2 className="font-heading text-lg font-bold text-navy mt-6">2. Corporate Identity &amp; Intellectual Property</h2>
            <p>
              The names &quot;SANGALES&quot;, &quot;A GROUP OF COMPANIES&quot;, &quot;Annamrit Foods&quot;, &quot;Sangales Farms&quot;, &quot;Sangales Enterprises&quot;, &quot;Sangales Trading&quot;, &quot;Sangales Packaging&quot;, their respective logos, wordmarks, visual assets, and content published on this website are the intellectual property of Sangales Group. Unauthorized duplication or reproduction without written consent is strictly prohibited.
            </p>

            <h2 className="font-heading text-lg font-bold text-navy mt-6">3. Informational Nature of the Website</h2>
            <p>
              The website serves as a corporate group directory, product showcase, and business enquiry conduit. While we endeavor to ensure all specifications and product descriptions are current, details are subject to operational revisions and final commercial contracts.
            </p>

            <h2 className="font-heading text-lg font-bold text-navy mt-6">4. Commercial Enquiries &amp; Non-Binding Estimates</h2>
            <p>
              Submissions made through website forms constitute an invitation to treat and do not represent a binding sales or distribution contract until finalized through formal written agreements executed by authorized group signatories.
            </p>

            <h2 className="font-heading text-lg font-bold text-navy mt-6">5. Jurisdiction</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India, subject to the exclusive jurisdiction of the competent courts in Maharashtra, India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

