"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { BusinessRecord } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  businesses: BusinessRecord[];
}

export default function CorporateContactForm({ businesses }: Props) {
  const { dict, locale } = useLanguage();
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
    botTrap: "",
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
      const consentMsg =
        locale === "mr"
          ? "कृपया चौकशी पाठवण्यासाठी सहमतीच्या चौकटीवर खूण करा."
          : locale === "hi"
          ? "कृपया पूछताछ भेजने के लिए सहमति बॉक्स पर चेक करें।"
          : "Please check the consent box to allow us to process your enquiry.";
      setError(consentMsg);
      setFieldErrors({ privacyConsent: [consentMsg] });
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
        botTrap: "",
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const successTitle =
      locale === "mr"
        ? "आपली चौकशी यशस्वीरित्या प्राप्त झाली आहे"
        : locale === "hi"
        ? "आपकी पूछताछ सफलतापूर्वक प्राप्त हो गई है"
        : "Your Enquiry Has Been Received";

    const successDesc =
      locale === "mr"
        ? "सांगळे समूहाशी संपर्क साधल्याबद्दल धन्यवाद. आमच्या संबंधित विभागाला माहिती पाठवण्यात आली असून आमचे प्रतिनिधी लवकरच आपल्याशी संपर्क साधतील."
        : locale === "hi"
        ? "सांगळे समूह से संपर्क करने के लिए धन्यवाद। हमारे संबंधित विभाग को सूचित कर दिया गया है और हमारे प्रतिनिधि शीघ्र ही आपसे संपर्क करेंगे।"
        : "Thank you for contacting SANGALES – A GROUP OF COMPANIES. An acknowledgement has been sent to your email, and our operating desk has been notified.";

    const supportDeskLabel =
      locale === "mr" ? "थेट संपर्क कक्ष:" : locale === "hi" ? "सीधा सहायता डेस्क:" : "Direct Support Desk:";

    const whatsappAction =
      locale === "mr"
        ? "व्हॉट्सॲपवर त्वरित जोडा (+91 75077 00936)"
        : locale === "hi"
        ? "व्हाट्सएप पर तुरंत जुड़ें (+91 75077 00936)"
        : "Connect on WhatsApp (+91 75077 00936)";

    const anotherAction =
      locale === "mr" ? "दुसरी विचारणा नोंदवा" : locale === "hi" ? "अन्य अनुरोध दर्ज करें" : "Submit Another Request";

    return (
      <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200/80 shadow-editorial text-center space-y-5">
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
        <h3 className="font-heading text-2xl font-bold text-navy">
          {successTitle}
        </h3>
        <p className="text-sm text-charcoal-100 max-w-md mx-auto leading-relaxed">
          {successDesc}
        </p>

        <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm max-w-md mx-auto text-left space-y-1 text-xs">
          <p className="font-bold text-navy uppercase tracking-wider text-[11px]">{supportDeskLabel}</p>
          <p className="text-stone-600">Email: <span className="font-mono text-navy font-semibold">contact.sangales@gmail.com</span></p>
          <p className="text-stone-600">Phone &amp; WhatsApp: <span className="font-semibold text-navy">+91 75077 00936</span></p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/917507700936?text=Hello%20SANGALES%20Group,%20I%20have%20submitted%20a%20commercial%20enquiry%20on%20your%20website%20and%20would%20like%20to%20connect%20directly."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {whatsappAction}
          </a>
          <button
            onClick={() => setSuccess(false)}
            className="w-full sm:w-auto px-6 py-2.5 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-all"
          >
            {anotherAction}
          </button>
        </div>
      </div>
    );
  }

  const nameLabel =
    locale === "mr" ? "पूर्ण नाव" : locale === "hi" ? "पूरा नाम" : "Full Name";
  const namePlaceholder =
    locale === "mr" ? "उदा. राहुल सांगळे" : locale === "hi" ? "उदा. राहुल सांगळे" : "Anand R. Sangale";

  const emailLabel =
    locale === "mr" ? "ईमेल आयडी" : locale === "hi" ? "ईमेल आईडी" : "Work / Personal Email";

  const phoneLabel =
    locale === "mr" ? "मोबाईल नंबर" : locale === "hi" ? "मोबाइल नंबर" : "Phone / Mobile Number";

  const companyLabel =
    locale === "mr" ? "कंपनी किंवा फर्मचे नाव (ऐच्छिक)" : locale === "hi" ? "कंपनी या फर्म का नाम (वैकल्पिक)" : "Company / Organization Name";
  const companyPlaceholder =
    locale === "mr" ? "उदा. अपेक्स एंटरप्रायझेस" : locale === "hi" ? "उदा. एपेक्स एंटरप्राइजेज" : "e.g. Apex Distribution Corp";

  const typeLabel =
    locale === "mr" ? "चौकशीचे स्वरूप" : locale === "hi" ? "पूछताछ का प्रकार" : "Enquiry Classification";

  const bizLabel =
    locale === "mr" ? "संबंधित व्यवसाय (ऐच्छिक)" : locale === "hi" ? "संबंधित उद्यम (वैकल्पिक)" : "Related Business (Optional)";
  const allBizText =
    locale === "mr" ? "सांगळे समूह (सर्व विभाग)" : locale === "hi" ? "सांगळे समूह (समस्त प्रभाग)" : "Sangales Corporate Group (All)";

  const subjectLabel =
    locale === "mr" ? "विषय / मुख्य मुद्दा" : locale === "hi" ? "विषय / मुख्य शीर्षक" : "Subject Headline";
  const subjectPlaceholder =
    locale === "mr" ? "तुमच्या प्रस्तावाचा किंवा चौकशीचा थोडक्यात सारांश" : locale === "hi" ? "आपके प्रस्ताव या आवश्यकता का संक्षिप्त विवरण" : "Brief summary of your enquiry or proposal";

  const messageLabel =
    locale === "mr" ? "तपशीलवार संदेश / व्यावसायिक प्रस्ताव" : locale === "hi" ? "विस्तृत संदेश / व्यावसायिक प्रस्ताव" : "Detailed Message / Commercial Proposal";
  const messagePlaceholder =
    locale === "mr"
      ? "कृपया उत्पादनाचा प्रकार, अपेक्षित प्रमाण, पुरवठ्याचे ठिकाण किंवा इतर तपशील नमूद करा..."
      : locale === "hi"
      ? "कृपया उत्पाद आवश्यकता, अनुमानित मात्रा, डिलीवरी स्थान या अन्य विवरण साझा करें..."
      : "Provide pertinent specifications, order requirements, distribution regions, or questions...";

  const consentLabel =
    locale === "mr" ? (
      <>
        <strong>सांगळे समूहाला</strong> या व्यावसायिक चौकशीवर प्रक्रिया करण्यासाठी आणि माझ्याशी संपर्क साधण्यासाठी माझी सहमती आहे.
      </>
    ) : locale === "hi" ? (
      <>
        मैं इस व्यावसायिक पूछताछ के मूल्यांकन एवं संपर्क हेतु <strong>सांगळे समूह</strong> द्वारा जानकारी के उपयोग की सहमति देता/देती हूँ।
      </>
    ) : (
      <>
        I consent to <strong>SANGALES – A GROUP OF COMPANIES</strong> collecting, storing, and reviewing the submitted information for evaluating and responding to this corporate inquiry.
      </>
    );

  const submitBtn =
    loading
      ? (locale === "mr" ? "चौकशी पाठवली जात आहे..." : locale === "hi" ? "प्रस्ताव भेजा जा रहा है..." : "Transmitting...")
      : (locale === "mr" ? "चौकशी प्रस्ताव पाठवा" : locale === "hi" ? "व्यावसायिक प्रस्ताव भेजें" : "Submit Corporate Enquiry");

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white p-8 sm:p-10 rounded-sm border border-stone-200/80 shadow-editorial space-y-5"
    >
      {/* Invisible Honeypot field for spam prevention */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="corp-botTrap">Leave this empty</label>
        <input
          id="corp-botTrap"
          type="text"
          name="botTrap"
          tabIndex={-1}
          autoComplete="off"
          value={formData.botTrap}
          onChange={(e) => updateField("botTrap", e.target.value)}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-start gap-2.5 rounded-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Submission Error:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            {nameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder={namePlaceholder}
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
            {emailLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="contact@company.in"
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
            {phoneLabel} <span className="text-red-500">*</span>
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
            {companyLabel}
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            placeholder={companyPlaceholder}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          />
        </div>
      </div>

      {/* Row 3: Enquiry Type and Related Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            {typeLabel} <span className="text-red-500">*</span>
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
            <option value="Partnership">{locale === "mr" ? "व्यावसायिक भागीदारी" : locale === "hi" ? "व्यावसायिक साझेदारी" : "Business Partnership"}</option>
            <option value="Distribution">{locale === "mr" ? "वितरण व डीलरशिप" : locale === "hi" ? "वितरण एवं डीलरशिप" : "Distribution & Dealership"}</option>
            <option value="Wholesale">{locale === "mr" ? "घाऊक खरेदी व कंत्राट" : locale === "hi" ? "थोक खरीद एवं अनुबंध" : "Wholesale & Bulk Purchasing"}</option>
            <option value="Supplier">{locale === "mr" ? "शेतकरी व पुरवठादार पुरवठा" : locale === "hi" ? "कृषक एवं आपूर्तिकर्ता आपूर्ति" : "Supplier & Mandi Ingestion"}</option>
            <option value="Product">{locale === "mr" ? "उत्पादन चौकशी व नमुने" : locale === "hi" ? "उत्पाद पूछताछ एवं नमूने" : "Product Enquiry"}</option>
            <option value="Career">{locale === "mr" ? "करिअर व नोकरी संधी" : locale === "hi" ? "करियर एवं रोजगार अवसर" : "Career & Employment"}</option>
            <option value="General">{locale === "mr" ? "सर्वसाधारण कॉर्पोरेट विचारणा" : locale === "hi" ? "सामान्य कॉर्पोरेट पूछताछ" : "General Corporate Enquiry"}</option>
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
            {bizLabel}
          </label>
          <select
            value={formData.businessId}
            onChange={(e) => updateField("businessId", e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
          >
            <option value="">{allBizText}</option>
            {businesses.map((b) => {
              const loc = dict.businesses && dict.businesses[b.slug];
              const name = loc?.name || b.name;
              const category = loc?.category || b.category;
              return (
                <option key={b.id} value={b.id}>
                  {name} ({category})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Row 4: Subject */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
          {subjectLabel}
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          placeholder={subjectPlaceholder}
          className="w-full px-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
        />
      </div>

      {/* Row 5: Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
          {messageLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder={messagePlaceholder}
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
            {consentLabel}
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
        <span>{submitBtn}</span>
      </button>
    </form>
  );
}