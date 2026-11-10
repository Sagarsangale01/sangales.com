"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

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
      setError("Please check the consent box to allow us to process your enquiry.");
      setFieldErrors({ privacyConsent: ["Consent is required to submit."] });
      return;
    }

    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
        throw new Error(data?.message || "Unable to submit enquiry. Please verify your details and retry.");
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
      <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-editorial text-center space-y-5">
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
        <h3 className="font-heading text-2xl font-bold text-navy">
          Your Enquiry Has Been Received
        </h3>
        <p className="text-sm text-charcoal-100 max-w-md mx-auto leading-relaxed">
          Thank you for contacting <strong>SANGALE&apos;S – A GROUP OF COMPANIES</strong>. An acknowledgement has been sent to your email, and our operating desk has been notified.
        </p>

        <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm max-w-md mx-auto text-left space-y-1 text-xs">
          <p className="font-bold text-navy uppercase tracking-wider text-[11px]">Direct Support Desk:</p>
          <p className="text-stone-600">Email: <span className="font-mono text-navy font-semibold">contact.sangales@gmail.com</span></p>
          <p className="text-stone-600">Phone &amp; WhatsApp: <span className="font-semibold text-navy">+91 75077 00936</span></p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/917507700936?text=Hello%20Sangale%27s%20Group,%20I%20have%20submitted%20a%20commercial%20enquiry%20on%20your%20website%20and%20would%20like%20to%20connect%20directly."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Connect on WhatsApp (+91 75077 00936)
          </a>
          <button
            onClick={() => setSuccess(false)}
            className="w-full sm:w-auto px-6 py-2.5 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-all"
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
      noValidate
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
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Unable to submit enquiry. Please correct the highlighted errors:</span>
          </div>
          <p className="pl-6 text-red-700 leading-relaxed font-medium">{error}</p>
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
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="e.g. Anand Vardhan"
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
            Work / Personal Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="anand@company.in"
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
            onChange={(e) => updateField("enquiryType", e.target.value)}
            className={`w-full px-3.5 py-2.5 text-sm bg-offwhite border rounded-sm focus:outline-none transition-colors text-charcoal ${
              fieldErrors.enquiryType
                ? "border-red-500 bg-red-50/20 ring-1 ring-red-400"
                : "border-stone-200 focus:border-gold"
            }`}
          >
            <option value="Partnership">Business Partnership</option>
            <option value="Distribution">Distribution &amp; Dealership</option>
            <option value="Wholesale">Wholesale &amp; Bulk Purchasing</option>
            <option value="Supplier">Supplier &amp; Mandi Ingestion</option>
            <option value="Product">Product Enquiry</option>
            <option value="Career">Career &amp; Employment</option>
            <option value="General">General Corporate Enquiry</option>
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
            Related Business (Optional)
          </label>
          <select
            value={formData.businessId}
            onChange={(e) => updateField("businessId", e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          >
            <option value="">Sangale&apos;s Corporate Group (All)</option>
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
          onChange={(e) => updateField("subject", e.target.value)}
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
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="Provide pertinent specifications, order requirements, distribution regions, or questions..."
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

      {/* Consent */}
      <div className="space-y-1 pt-1">
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="privacyConsentCorporate"
            required
            checked={formData.privacyConsent}
            onChange={(e) => updateField("privacyConsent", e.target.checked)}
            className={`mt-1 rounded border-stone-300 text-gold focus:ring-gold ${
              fieldErrors.privacyConsent ? "ring-2 ring-red-500 border-red-500" : ""
            }`}
          />
          <label htmlFor="privacyConsentCorporate" className="text-xs text-charcoal-100 leading-normal">
            I consent to <strong>SANGALE&apos;S – A GROUP OF COMPANIES</strong> collecting, storing, and reviewing the submitted information for evaluating and responding to this corporate inquiry.
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
        className="w-full py-4 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Transmitting..." : "Submit Corporate Enquiry"}</span>
      </button>
    </form>
  );
}
