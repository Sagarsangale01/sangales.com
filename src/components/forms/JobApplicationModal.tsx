"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { CareerRecord } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  job: CareerRecord | null;
  onClose: () => void;
}

export default function JobApplicationModal({ job, onClose }: Props) {
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  });

  if (!job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          careerId: job.id,
          jobTitle: job.title,
        }),
      });

      if (!res.ok) {
        throw new Error(
          locale === "mr"
            ? "अर्ज पाठवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
            : locale === "hi"
            ? "आवेदन जमा करने में विफल। कृपया पुनः प्रयास करें।"
            : "Failed to submit job application. Please try again."
        );
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const modalTitle =
    locale === "mr"
      ? `अर्ज सादर करा: ${job.title}`
      : locale === "hi"
      ? `आवेदन करें: ${job.title}`
      : `Apply: ${job.title}`;

  const successTitle =
    locale === "mr"
      ? "अर्ज यशस्वीरीत्या स्वीकारला गेला"
      : locale === "hi"
      ? "आवेदन सफलतापूर्वक जमा हुआ"
      : "Application Submitted";

  const successDesc =
    locale === "mr"
      ? `${job.businessName} मधील ${job.title} या पदासाठी अर्ज केल्याबद्दल धन्यवाद. आमची निवड समिती आपल्या प्रोफाईलची पडताळणी करून आपल्याशी लवकरच संपर्क करेल.`
      : locale === "hi"
      ? `${job.businessName} में ${job.title} पद हेतु आवेदन करने के लिए धन्यवाद। हमारी चयन समिति आपकी प्रोफाइल की समीक्षा कर शीघ्र संपर्क करेगी।`
      : `Thank you for applying for ${job.title} at ${job.businessName}. Our recruitment committee will review your profile.`;

  const closeBtnText =
    locale === "mr" ? "विंडो बंद करा" : locale === "hi" ? "खिड़की बंद करें" : "Close Window";

  const nameLabel =
    locale === "mr" ? "पूर्ण नाव" : locale === "hi" ? "पूरा नाम" : "Full Name";

  const emailLabel =
    locale === "mr" ? "ईमेल पत्ता" : locale === "hi" ? "ईमेल पता" : "Email";

  const phoneLabel =
    locale === "mr" ? "संपर्क क्रमांक / व्हॉट्सॲप" : locale === "hi" ? "फ़ोन नंबर / व्हाट्सएप" : "Phone Number";

  const resumeLabel =
    locale === "mr"
      ? "रेझ्युमे / लिंक्डइन प्रोफाइल URL"
      : locale === "hi"
      ? "रिज्यूमे / लिंक्डइन प्रोफाइल URL"
      : "Resume / LinkedIn Portfolio URL";

  const coverLabel =
    locale === "mr"
      ? "थोडक्यात परिचय / अनुभवाची माहिती"
      : locale === "hi"
      ? "संक्षिप्त परिचय / कार्य अनुभव"
      : "Brief Introduction / Experience Summary";

  const coverPlaceholder =
    locale === "mr"
      ? "आपल्या अनुभवाबद्दल आणि आपण सांगळे समूहात का काम करू इच्छिता ते थोडक्यात सांगा..."
      : locale === "hi"
      ? "अपनी पृष्ठभूमि और सांगळे समूह में शामिल होने की अपनी रुचि के बारे में बताएं..."
      : "Tell us about your background and why you want to join Sangales...";

  const cancelBtnText =
    locale === "mr" ? "रद्द करा" : locale === "hi" ? "रद्द करें" : "Cancel";

  const submitBtnText = loading
    ? locale === "mr"
      ? "सादर करत आहे..."
      : locale === "hi"
      ? "जमा हो रहा है..."
      : "Submitting..."
    : locale === "mr"
    ? "अर्ज सादर करा"
    : locale === "hi"
    ? "आवेदन जमा करें"
    : "Submit Application";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-navy p-1"
          aria-label="Close application dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-heading text-xl font-bold text-navy">{successTitle}</h3>
            <p className="text-sm text-charcoal-100">
              {successDesc}
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm"
            >
              {closeBtnText}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700">
                {job.businessName} &bull; {job.location}
              </span>
              <h3 className="font-heading text-xl font-bold text-navy mt-0.5">
                {modalTitle}
              </h3>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                {nameLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Aditi Deshmukh"
                className="w-full px-3.5 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  {emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aditi@example.com"
                  className="w-full px-3.5 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  {phoneLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 75077 00936"
                  className="w-full px-3.5 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                {resumeLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                placeholder="https://drive.google.com/... or linkedin.com/in/..."
                className="w-full px-3.5 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                {coverLabel}
              </label>
              <textarea
                rows={3}
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                placeholder={coverPlaceholder}
                className="w-full px-3.5 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-navy cursor-pointer"
              >
                {cancelBtnText}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {submitBtnText}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
