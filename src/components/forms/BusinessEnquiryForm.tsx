"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  businessId: string;
  businessName: string;
}

export default function BusinessEnquiryForm({ businessId, businessName }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    enquiryType: "Product",
    subject: `Enquiry for ${businessName}`,
    message: "",
    privacyConsent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) {
      setError("Please accept the privacy consent to submit.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          businessId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry. Please try again.");
      }

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        enquiryType: "Product",
        subject: `Enquiry for ${businessName}`,
        message: "",
        privacyConsent: false,
      });
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 bg-white border border-stone-200 rounded-sm shadow-sm text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h4 className="font-heading text-xl font-bold text-navy">Enquiry Dispatched Successfully</h4>
        <p className="text-sm text-charcoal-100 max-w-md mx-auto">
          Thank you for reaching out to <strong>{businessName}</strong>. Our commercial desk will review your details and connect with you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold underline"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white border border-stone-200/80 rounded-sm shadow-sm space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

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
            placeholder="e.g. Ramesh Kulkarni"
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ramesh@company.com"
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Phone Number <span className="text-red-500">*</span>
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
            placeholder="e.g. Maharashtra Retailers"
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Enquiry Nature <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.enquiryType}
            onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          >
            <option value="Product">Product Enquiry</option>
            <option value="Wholesale">Wholesale &amp; Bulk Order</option>
            <option value="Distribution">Dealership &amp; Distribution</option>
            <option value="Supplier">Supplier &amp; Vendor Partnership</option>
            <option value="Partnership">Business Collaboration</option>
            <option value="General">General Questions</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
          Detailed Message / Commercial Specifications <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={`Describe your requirements or partnership interest for ${businessName}...`}
          className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
        />
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="privacyConsent"
          required
          checked={formData.privacyConsent}
          onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
          className="mt-1 rounded border-stone-300 text-gold focus:ring-gold"
        />
        <label htmlFor="privacyConsent" className="text-xs text-charcoal-100 leading-normal">
          I agree that Sangales Group and {businessName} may collect and store my information to process and respond to this business enquiry in accordance with the corporate privacy policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{loading ? "Transmitting..." : `Submit Enquiry to ${businessName}`}</span>
      </button>
    </form>
  );
}
