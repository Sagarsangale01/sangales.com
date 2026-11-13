"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle, Phone, Sparkles } from "lucide-react";

interface ProductOption {
  id: string;
  name: string;
  category?: string;
}

interface Props {
  businessId: string;
  businessName: string;
  products?: ProductOption[];
  campaignSource?: string;
  className?: string;
}

export default function QuickQuoteCard({
  businessId,
  businessName,
  products = [],
  campaignSource = "Direct / Paid Ad",
  className = "",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    selectedProduct: products[0]?.name || "All Products / Bulk Inquiry",
    quantityNotes: "",
    botTrap: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Bot trap check
    if (formData.botTrap) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    try {
      const subject = `[Ad Lead - ${campaignSource}] Quote Request for ${businessName} (${formData.selectedProduct})`;
      const message = `Requirement: ${formData.selectedProduct}\nQuantity / Site Details: ${
        formData.quantityNotes || "Not specified"
      }\nCampaign Source: ${campaignSource}`;

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || `${formData.phone.replace(/[^0-9]/g, "") || "quote"}@lead.sangales.com`,
          companyName: "Commercial / Ad Inquiry",
          enquiryType: "Product",
          subject,
          message,
          privacyConsent: true,
          botTrap: formData.botTrap,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to submit request. Please try calling or WhatsApp.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`bg-white text-navy p-6 sm:p-8 rounded-sm border-2 border-gold shadow-2xl space-y-4 ${className}`}>
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-heading text-xl font-bold text-navy">Quote Request Received!</h3>
          <p className="text-xs text-charcoal-100 leading-relaxed">
            Thank you, <span className="font-bold text-navy">{formData.fullName}</span>. An authorized commercial representative from <span className="font-bold text-navy">{businessName}</span> will contact you shortly with wholesale specs and pricing.
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <a
            href={`https://wa.me/917507700936?text=${encodeURIComponent(
              `Hello ${businessName}, I just submitted a quote request for ${formData.selectedProduct}. Name: ${formData.fullName}, Phone: ${formData.phone}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Fast-Track on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setFormData({
                fullName: "",
                phone: "",
                email: "",
                selectedProduct: products[0]?.name || "All Products / Bulk Inquiry",
                quantityNotes: "",
                botTrap: "",
              });
            }}
            className="w-full text-center text-xs text-charcoal-100 hover:text-navy underline pt-1 font-medium"
          >
            Submit another quotation enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white text-navy p-6 sm:p-7 rounded-sm border border-stone-200/90 shadow-2xl ${className}`}>
      {/* Header */}
      <div className="space-y-1 pb-4 border-b border-stone-100">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-gold-700 bg-gold/10 px-2.5 py-0.5 rounded-sm">
            <Sparkles className="w-3 h-3 text-gold-600" /> Instant Commercial Desk
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
            Direct Wholesale Rates
          </span>
        </div>
        <h3 className="font-heading text-lg sm:text-xl font-bold text-navy pt-1">
          Request Wholesale Pricing &amp; Specs
        </h3>
        <p className="text-xs text-charcoal-100 font-light leading-relaxed">
          Direct contractor rates, technical catalogs, and quantity estimates for {businessName}.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 pt-4">
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="lead_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData.botTrap}
            onChange={(e) => setFormData({ ...formData, botTrap: e.target.value })}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-charcoal"
          />
        </div>

        {/* Mobile & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
              WhatsApp / Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98XXX XXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-charcoal"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
              Work Email <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              placeholder="rahul@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-charcoal"
            />
          </div>
        </div>

        {/* Product / Requirement Selection */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
            Product of Interest <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.selectedProduct}
            onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-bold text-navy"
          >
            <option value="All Products / Bulk Commercial Inquiry">All Products / Bulk Commercial Inquiry</option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} {p.category ? `(${p.category})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity or Site notes */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
            Requirement / Estimated Quantity <span className="text-stone-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 100 units / Project tender / Mandi order"
            value={formData.quantityNotes}
            onChange={(e) => setFormData({ ...formData, quantityNotes: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-charcoal"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold hover:bg-navy hover:text-white text-navy font-extrabold text-xs tracking-widest uppercase rounded-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
        >
          {loading ? (
            <span>Submitting Quote Request...</span>
          ) : (
            <>
              <span>Get Wholesale Quotation Now</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {/* Direct WhatsApp Callout */}
        <div className="pt-2 text-center">
          <span className="text-[10px] text-stone-400 block mb-1">Need urgent pricing right now?</span>
          <a
            href={`https://wa.me/917507700936?text=${encodeURIComponent(
              `Hello ${businessName}, I would like to enquire about wholesale pricing and catalog.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat Directly on WhatsApp (+91 75077 00936) &rarr;</span>
          </a>
        </div>
      </form>
    </div>
  );
}
