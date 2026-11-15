"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
  const { dict, locale } = useLanguage();
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

  const localizedBiz = dict.businesses[businessName.toLowerCase().replace(/\s+/g, "-")];
  const displayName = localizedBiz?.name || businessName;

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
      }\nLanguage: ${locale.toUpperCase()}\nCampaign Source: ${campaignSource}`;

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || "lead@ad-campaign.sangales.com",
          businessId,
          businessName,
          enquiryType: "Wholesale",
          subject,
          message,
          privacyConsent: true,
          language: locale,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || dict.actions.errorMsg);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || dict.actions.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getWaUrl = () => {
    const text =
      locale === "mr"
        ? `नमस्कार ${displayName}, मी दरपत्रक आणि उत्पादनांची चौकशी करू इच्छितो.`
        : locale === "hi"
        ? `नमस्ते ${displayName}, मुझे थोक मूल्य और कोटेशन की आवश्यकता है।`
        : `Hello ${businessName}, I would like to request commercial specifications and wholesale pricing.`;
    return `https://wa.me/917507700936?text=${encodeURIComponent(text)}`;
  };

  if (success) {
    return (
      <div className={`bg-white text-navy p-6 sm:p-8 rounded-sm border border-stone-200/90 shadow-2xl text-center space-y-4 ${className}`}>
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-navy">
            {locale === "mr"
              ? "चौकशी यशस्वीरीत्या पाठवली गेली!"
              : locale === "hi"
              ? "कोटेशन अनुरोध सफलतापूर्वक दर्ज!"
              : "Quote Request Received!"}
          </h3>
          <p className="text-xs text-charcoal-100 max-w-sm mx-auto leading-relaxed">
            {dict.actions.successMsg}
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <a
            href={getWaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {locale === "mr"
                ? "व्हॉट्सॲपवर जलद प्रतिसाद मिळवा"
                : locale === "hi"
                ? "व्हाट्सएप पर तुरंत जुड़ें"
                : "Fast-Track via WhatsApp"}
            </span>
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
            {locale === "mr"
              ? "दुसरी चौकशी पाठवा"
              : locale === "hi"
              ? "अन्य कोटेशन अनुरोध भेजें"
              : "Submit another quotation enquiry"}
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
            <Sparkles className="w-3 h-3 text-gold-600" />
            {locale === "mr" ? "थेट व्यावसायिक डेस्क" : locale === "hi" ? "त्वरित कमर्शियल डेस्क" : "Instant Commercial Desk"}
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
            {dict.trust.wholesalePricing}
          </span>
        </div>
        <h3 className="font-heading text-lg sm:text-xl font-bold text-navy pt-1">
          {locale === "mr"
            ? "घाऊक दरपत्रक व माहिती मिळवा"
            : locale === "hi"
            ? "थोक मूल्य एवं कोटेशन प्राप्त करें"
            : "Request Wholesale Pricing & Specs"}
        </h3>
        <p className="text-xs text-charcoal-100 font-light leading-relaxed">
          {locale === "mr"
            ? `${displayName} साठी थेट उत्पादक दर, तांत्रिक कॅटलॉग आणि दरपत्रक.`
            : locale === "hi"
            ? `${displayName} हेतु सीधे थोक मूल्य, तकनीकी कैटलॉग और कोटेशन।`
            : `Direct contractor rates, technical catalogs, and quantity estimates for ${displayName}.`}
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
            {dict.forms.fullNameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder={dict.forms.fullNamePlaceholder}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-charcoal"
          />
        </div>

        {/* Mobile & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
              {locale === "mr" ? "मोबाईल / व्हॉट्सॲप" : locale === "hi" ? "मोबाइल / व्हाट्सएप" : "WhatsApp / Mobile"} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder={dict.forms.phonePlaceholder}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-charcoal"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
              {dict.forms.emailLabel} <span className="text-stone-400 font-normal">({locale === "mr" ? "ऐच्छिक" : locale === "hi" ? "वैकल्पिक" : "Optional"})</span>
            </label>
            <input
              type="email"
              placeholder={dict.forms.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-charcoal"
            />
          </div>
        </div>

        {/* Product / Requirement Selection */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
            {dict.forms.businessInterestLabel} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.selectedProduct}
            onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-bold text-navy"
          >
            <option value="All Products / Bulk Commercial Inquiry">
              {locale === "mr"
                ? "सर्व उत्पादने / घाऊक खरेदी चौकशी"
                : locale === "hi"
                ? "सभी उत्पाद / थोक वाणिज्यिक पूछताछ"
                : "All Products / Bulk Commercial Inquiry"}
            </option>
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
            {dict.forms.messageLabel} <span className="text-stone-400 font-normal">({locale === "mr" ? "ऐच्छिक" : locale === "hi" ? "वैकल्पिक" : "Optional"})</span>
          </label>
          <input
            type="text"
            placeholder={
              locale === "mr"
                ? "उदा. १०० युनिट्स / बांधकाम साइट ऑर्डर / प्रकल्प पुरवठा"
                : locale === "hi"
                ? "उदा. 100 यूनिट्स / प्रोजेक्ट टेंडर / साइट डिलीवरी"
                : "e.g. 100 units / Project tender / Mandi order"
            }
            value={formData.quantityNotes}
            onChange={(e) => setFormData({ ...formData, quantityNotes: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium text-charcoal"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold hover:bg-navy hover:text-white text-navy font-extrabold text-xs tracking-widest uppercase rounded-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <span>{dict.actions.submitting}</span>
          ) : (
            <>
              <span>{dict.actions.getQuote}</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {/* Direct WhatsApp Callout */}
        <div className="pt-2 text-center">
          <span className="text-[10px] text-stone-400 block mb-1">
            {locale === "mr"
              ? "तातडीने दरपत्रक हवे आहे का?"
              : locale === "hi"
              ? "क्या आपको तुरंत दरपत्रक चाहिए?"
              : "Need urgent pricing right now?"}
          </span>
          <a
            href={getWaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>
              {locale === "mr"
                ? "थेट व्हॉट्सॲपवर संपर्क करा (+91 75077 00936) &rarr;"
                : locale === "hi"
                ? "सीधे व्हाट्सएप पर बात करें (+91 75077 00936) &rarr;"
                : "Chat Directly on WhatsApp (+91 75077 00936) &rarr;"}
            </span>
          </a>
        </div>
      </form>
    </div>
  );
}
