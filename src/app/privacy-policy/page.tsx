import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sangales Group",
  description: "Official Privacy Policy of SANGALES – A GROUP OF COMPANIES.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-20 bg-offwhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200 shadow-sm space-y-6 text-charcoal">
          <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">
            Legal &bull; Governance
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: October 2026 &bull; SANGALES – A GROUP OF COMPANIES
          </p>

          <div className="prose prose-stone text-sm leading-relaxed space-y-4">
            <h2 className="font-heading text-lg font-bold text-navy mt-6">1. Overview</h2>
            <p>
              SANGALES – A GROUP OF COMPANIES (&quot;Sangales&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the corporate website www.sangales.com and its associated subsidiary web pages. We respect your privacy and are committed to safeguarding the personal and commercial data you share with us.
            </p>

            <h2 className="font-heading text-lg font-bold text-navy mt-6">2. Information We Collect</h2>
            <p>
              When you submit a contact enquiry, product request, partnership proposal, or job application through our website, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name, professional email address, and mobile number.</li>
              <li>Company name, trade designation, and operational location.</li>
              <li>Commercial specifications, order volumes, or partnership proposals.</li>
              <li>Curriculum vitae, educational background, and employment history for career applicants.</li>
            </ul>

            <h2 className="font-heading text-lg font-bold text-navy mt-6">3. How Information Is Utilized</h2>
            <p>
              We process submitted data exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Responding to your business enquiries and evaluating partnership potential.</li>
              <li>Transmitting product catalogues, quotation estimates, or distribution terms.</li>
              <li>Processing job applications and communicating with prospective candidates.</li>
              <li>Ensuring statutory compliance and security across our digital platforms.</li>
            </ul>

            <h2 className="font-heading text-lg font-bold text-navy mt-6">4. Data Sharing &amp; Third Parties</h2>
            <p>
              Sangales does not monetize, sell, or rent your personal information to third-party marketing brokers. Data is shared internally with authorized operating companies (such as Annamrit Foods, Sangales Farms, Sangales Enterprises, Sangales Trading, or Sangales Packaging) strictly on a need-to-know operational basis.
            </p>

            <h2 className="font-heading text-lg font-bold text-navy mt-6">5. Grievance Redressal</h2>
            <p>
              For any questions regarding this Privacy Policy or to request deletion of your submitted details, please write to our Corporate Governance Officer at: <a href="mailto:contact.sangales@gmail.com" className="text-gold font-semibold underline">contact.sangales@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

