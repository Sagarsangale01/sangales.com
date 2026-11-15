"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  businessId: string;
  businessName: string;
}

export default function BusinessEnquiryForm({ businessId, businessName }: Props) {
  const { dict, locale } = useLanguage();
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
    botTrap: "",
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
      setError(
        locale === "mr"
          ? "कृपया पुढे जाण्यासाठी संमती बॉक्स निवडा."
          : locale === "hi"
          ? "कृपया आगे बढ़ने के लिए सहमति बॉक्स चुनें।"
          : "Please accept the privacy consent to submit."
      );
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
          language: locale,
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
        throw new Error(data?.message || dict.actions.errorMsg);
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
        botTrap: "",
      });
    } catch (err: any) {
      setError(err.message || dict.actions.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const localizedBiz = dict.businesses[businessName.toLowerCase().replace(/\s+/g, "-")];
  const displayName = localizedBiz?.name || businessName;

  if (success) {
    return (
      <div className="p-8 bg-white border border-stone-200 rounded-sm shadow-sm text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h4 className="font-heading text-xl font-bold text-navy">
          {locale === "mr"
            ? "चौकशी यशस्वीरीत्या नोंदवली गेली!"
            : locale === "hi"
            ? "पूछताछ सफलतापूर्वक दर्ज की गई!"
            : "Enquiry Dispatched Successfully"}
        </h4>
        <p className="text-sm text-charcoal-100 max-w-md mx-auto">
          {dict.actions.successMsg}
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSuccess(false)}
            className="text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors"
          >
            {locale === "mr" ? "दुसरी चौकशी पाठवा" : locale === "hi" ? "अन्य पूछताछ भेजें" : "Submit Another Enquiry"} &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-white border border-stone-200/80 rounded-sm shadow-sm space-y-5">
      {/* Honeypot field for bot protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="b_trap">Leave this blank</label>
        <input
          type="text"
          id="b_trap"
          name="b_trap"
          value={formData.botTrap}
          onChange={(e) => updateField("botTrap", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-xs text-red-800 space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>
              {locale === "mr"
                ? "कृपया आवश्यक माहिती तपासा:"
                : locale === "hi"
                ? "कृपया आवश्यक जानकारी जांचें:"
                : "Unable to submit enquiry. Please correct the highlighted errors:"}
            </span>
          </div>
          <p className="pl-6 text-red-700 leading-relaxed font-medium">{error}</p>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            {dict.forms.fullNameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder={dict.forms.fullNamePlaceholder}
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
            {dict.forms.emailLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder={dict.forms.emailPlaceholder}
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
            {dict.forms.phoneLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder={dict.forms.phonePlaceholder}
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
            {locale === "mr" ? "कंपनी / फर्मचे नाव" : locale === "hi" ? "कंपनी / फर्म का नाम" : "Company / Organization Name"}
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            placeholder={locale === "mr" ? "उदा. महाराष्ट्र ट्रेडर्स" : locale === "hi" ? "उदा. नेशनल कॉर्पोरेशन" : "e.g. Maharashtra Retailers"}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      {/* Row 3: Enquiry Nature & Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            {dict.forms.enquiryTypeLabel} <span className="text-red-500">*</span>
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
            <option value="Product">
              {locale === "mr" ? "उत्पादन चौकशी" : locale === "hi" ? "उत्पाद पूछताछ" : "Product Enquiry"}
            </option>
            <option value="Wholesale">
              {locale === "mr" ? "घाऊक व मोठ्या ऑर्डर्स (Wholesale)" : locale === "hi" ? "थोक व बल्क ऑर्डर्स (Wholesale)" : "Wholesale & Bulk Order"}
            </option>
            <option value="Distribution">
              {locale === "mr" ? "डिलरशीप व वितरण (Dealership)" : locale === "hi" ? "डीलरशिप एवं वितरण" : "Dealership & Distribution"}
            </option>
            <option value="Supplier">
              {locale === "mr" ? "व्हेंडर व पुरवठादार सहकार्य" : locale === "hi" ? "सप्लायर एवं वेंडर पार्टनरशिप" : "Supplier & Vendor Partnership"}
            </option>
            <option value="Partnership">
              {locale === "mr" ? "व्यावसायिक भागीदारी" : locale === "hi" ? "व्यावसायिक साझेदारी" : "Business Collaboration"}
            </option>
            <option value="General">
              {locale === "mr" ? "सर्वसाधारण विचारणा" : locale === "hi" ? "सामान्य प्रश्न" : "General Questions"}
            </option>
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
            {locale === "mr" ? "विषय" : locale === "hi" ? "विषय" : "Subject"}
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
          {dict.forms.messageLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder={dict.forms.messagePlaceholder}
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
            {dict.forms.privacyConsent}
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
        className="w-full py-3.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span>
          {loading
            ? dict.actions.submitting
            : `${dict.forms.submitButton} (${displayName})`}
        </span>
      </button>
    </form>
  );
}
