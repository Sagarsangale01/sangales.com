"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";

interface Props {
  businessId: string;
  businessName: string;
}

export default function BusinessEnquiryForm({ businessId, businessName }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

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

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyConsent) {
      setError("Please accept the privacy consent to submit.");
      setFieldErrors({ privacyConsent: ["Please check this box to consent."] });
      return;
    }

    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          businessId,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        if (data?.errors) {
          setFieldErrors(data.errors);
          const allMsgs = Object.entries(data.errors as Record<string, string[]>)
            .map(([field, msgs]) => `${field.toUpperCase()}: ${msgs.join(", ")}`)
            .join(" • ");
          throw new Error(allMsgs || data?.message || "Please check the highlighted fields.");
        }
        throw new Error(data?.message || "Failed to submit enquiry. Please try again.");
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
          Thank you for reaching out to <strong>{businessName}</strong>. An acknowledgement email has been sent, and our team will review your details shortly.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/917507700936?text=${encodeURIComponent(
              `Hello Sangale's Group, I have submitted an enquiry for ${businessName} via your website.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Connect on WhatsApp (+91 75077 00936)
          </a>
          <button
            onClick={() => setSuccess(false)}
            className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-8 bg-white border border-stone-200/80 rounded-sm shadow-sm space-y-4"
    >
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Unable to submit enquiry. Please correct the highlighted errors:</span>
          </div>
          <p className="pl-6 text-red-700 leading-relaxed font-medium">{error}</p>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="e.g. Ramesh Kulkarni"
            className={`w-full px-3.5 py-2.5 text-sm bg-offwhite border rounded-sm focus:outline-none transition-colors text-charcoal ${
              fieldErrors.fullName
                ? "border-red-500 bg-red-50/20 ring-1 ring-red-400 focus:border-red-500"
                : "border-stone-200 focus:border-gold"
            }`}
          />
          {fieldErrors.fullName && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{fieldErrors.fullName[0]}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="ramesh@company.com"
            className={`w-full px-3.5 py-2.5 text-sm bg-offwhite border rounded-sm focus:outline-none transition-colors text-charcoal ${
              fieldErrors.email
                ? "border-red-500 bg-red-50/20 ring-1 ring-red-400 focus:border-red-500"
                : "border-stone-200 focus:border-gold"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{fieldErrors.email[0]}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+91 75077 00936"
            className={`w-full px-3.5 py-2.5 text-sm bg-offwhite border rounded-sm focus:outline-none transition-colors text-charcoal ${
              fieldErrors.phone
                ? "border-red-500 bg-red-50/20 ring-1 ring-red-400 focus:border-red-500"
                : "border-stone-200 focus:border-gold"
            }`}
          />
          {fieldErrors.phone && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{fieldErrors.phone[0]}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Company / Organization Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            placeholder="e.g. Maharashtra Retailers"
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      {/* Row 3: Enquiry Nature & Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Enquiry Nature <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.enquiryType}
            onChange={(e) => updateField("enquiryType", e.target.value)}
            className={`w-full px-3.5 py-2.5 text-sm bg-offwhite border rounded-sm focus:outline-none transition-colors text-charcoal ${
              fieldErrors.enquiryType
                ? "border-red-500 bg-red-50/20 ring-1 ring-red-400"
                : "border-stone-200 focus:border-gold"
            }`}
          >
            <option value="Product">Product Enquiry</option>
            <option value="Wholesale">Wholesale &amp; Bulk Order</option>
            <option value="Distribution">Dealership &amp; Distribution</option>
            <option value="Supplier">Supplier &amp; Vendor Partnership</option>
            <option value="Partnership">Business Collaboration</option>
            <option value="General">General Questions</option>
          </select>
          {fieldErrors.enquiryType && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{fieldErrors.enquiryType[0]}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
          Detailed Message / Commercial Specifications <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder={`Describe your requirements or partnership interest for ${businessName}...`}
          className={`w-full px-3.5 py-2.5 text-sm bg-offwhite border rounded-sm focus:outline-none transition-colors text-charcoal ${
            fieldErrors.message
              ? "border-red-500 bg-red-50/20 ring-1 ring-red-400 focus:border-red-500"
              : "border-stone-200 focus:border-gold"
          }`}
        />
        {fieldErrors.message && (
          <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{fieldErrors.message[0]}</span>
          </p>
        )}
      </div>

      {/* Row 5: Consent */}
      <div className="space-y-1 pt-1">
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="privacyConsent"
            required
            checked={formData.privacyConsent}
            onChange={(e) => updateField("privacyConsent", e.target.checked)}
            className={`mt-1 rounded border-stone-300 text-gold focus:ring-gold ${
              fieldErrors.privacyConsent ? "ring-2 ring-red-500 border-red-500" : ""
            }`}
          />
          <label htmlFor="privacyConsent" className="text-xs text-charcoal-100 leading-normal">
            I agree that Sangales Group and {businessName} may collect and store my information to process and respond to this business enquiry in accordance with the corporate privacy policy.
          </label>
        </div>
        {fieldErrors.privacyConsent && (
          <p className="text-xs text-red-600 pl-6 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{fieldErrors.privacyConsent[0]}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
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
