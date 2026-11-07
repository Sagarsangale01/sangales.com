"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { BusinessRecord } from "@/lib/data";

interface Props {
  businesses: BusinessRecord[];
}

export default function CorporateContactForm({ businesses }: Props) {
  const searchParams = useSearchParams();
  const preselectedType = searchParams.get("type") || "Partnership";
  const preselectedBiz = searchParams.get("business") || "";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    enquiryType: preselectedType,
    businessId: preselectedBiz,
    subject: "",
    message: "",
    privacyConsent: false,
  });

  useEffect(() => {
    if (preselectedType) {
      setFormData((prev) => ({ ...prev, enquiryType: preselectedType }));
    }
    if (preselectedBiz) {
      setFormData((prev) => ({ ...prev, businessId: preselectedBiz }));
    }
  }, [preselectedType, preselectedBiz]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) {
      setError("Please check the privacy consent before submitting.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Unable to submit enquiry. Please verify your details and retry.");
      }

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        enquiryType: "Partnership",
        businessId: "",
        subject: "",
        message: "",
        privacyConsent: false,
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-editorial text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
        <h3 className="font-heading text-2xl font-bold text-navy">
          Your Enquiry Has Been Received
        </h3>
        <p className="text-sm text-charcoal-100 max-w-md mx-auto leading-relaxed">
          Thank you for contacting <strong>SANGALES – A GROUP OF COMPANIES</strong>. Your inquiry has been routed to the relevant operating leadership desk and our team will get in touch with you shortly.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2.5 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-all"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 sm:p-10 rounded-sm border border-stone-200/80 shadow-editorial space-y-5"
    >
      <div>
        <h3 className="font-heading text-2xl font-bold text-navy">
          Corporate &amp; Business Enquiry Desk
        </h3>
        <p className="text-xs text-charcoal-100 mt-1">
          Complete the details below to route your enquiry directly to group leadership.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Anand Vardhan"
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Work / Personal Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="anand@company.in"
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      {/* Row 2: Phone and Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Phone / Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98220 00000"
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Company / Organization Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Apex Distribution Corp"
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      {/* Row 3: Enquiry Type and Related Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Enquiry Classification <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.enquiryType}
            onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          >
            <option value="Partnership">Business Partnership</option>
            <option value="Distribution">Distribution &amp; Dealership</option>
            <option value="Wholesale">Wholesale &amp; Bulk Purchasing</option>
            <option value="Supplier">Supplier &amp; Mandi Ingestion</option>
            <option value="Product">Product Enquiry</option>
            <option value="Career">Career &amp; Employment</option>
            <option value="General">General Corporate Enquiry</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Related Business (Optional)
          </label>
          <select
            value={formData.businessId}
            onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          >
            <option value="">Sangales Corporate Group (All)</option>
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Subject */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
          Subject Headline
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Brief summary of your enquiry or proposal"
          className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
        />
      </div>

      {/* Row 5: Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
          Detailed Message / Commercial Proposal <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Provide pertinent specifications, order requirements, distribution regions, or questions..."
          className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="privacyConsentCorporate"
          required
          checked={formData.privacyConsent}
          onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
          className="mt-1 rounded border-stone-300 text-gold focus:ring-gold"
        />
        <label htmlFor="privacyConsentCorporate" className="text-xs text-charcoal-100 leading-normal">
          I consent to SANGALES – A GROUP OF COMPANIES collecting, storing, and reviewing the submitted information for evaluating and responding to this corporate inquiry.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Transmitting..." : "Submit Corporate Enquiry"}</span>
      </button>
    </form>
  );
}

