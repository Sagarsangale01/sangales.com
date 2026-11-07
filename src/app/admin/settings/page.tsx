"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, ShieldCheck, Palette, PhoneCall, AlertCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    siteName: "SANGALES",
    descriptor: "A GROUP OF COMPANIES",
    tagline: "Building Businesses. Creating Opportunities.",
    contactEmail: "contact@sangales.com",
    contactPhone: "+91 98220 00000",
    corporateAddress: "Sangales Corporate House, Maharashtra, India",
    primaryNavy: "#142735",
    accentGold: "#C6A66B",
    metaTitle: "SANGALES – A GROUP OF COMPANIES | Building Businesses. Creating Opportunities.",
    metaDescription: "Official corporate website of SANGALES – A GROUP OF COMPANIES. Leading Indian group in food, agriculture, trading, packaging, and commercial enterprises.",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error("Error loading settings:", err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to persist corporate configuration.");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-heading text-xl font-bold text-navy">
          Corporate Group Settings &amp; Metadata
        </h2>
        <p className="text-xs text-charcoal-100">
          Global branding parameters, contact desks, and search engine metadata configurations.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Corporate configuration saved and synchronized with frontend successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Brand Wordmark */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
            1. Brand Identity &amp; Wordmark
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Parent Brand Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Corporate Descriptor
              </label>
              <input
                type="text"
                value={settings.descriptor}
                onChange={(e) => setSettings({ ...settings, descriptor: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              Primary Corporate Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
            />
          </div>
        </div>

        {/* Section 2: Contact Desk */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
            2. Corporate Contact Hotline
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Official Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Hotline Telephone
              </label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              Corporate Headquarters Address
            </label>
            <input
              type="text"
              value={settings.corporateAddress}
              onChange={(e) => setSettings({ ...settings, corporateAddress: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
            />
          </div>
        </div>

        {/* Section 3: Palette */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
            3. Corporate Palette Tokens
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Primary Deep Navy
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.primaryNavy}
                  onChange={(e) => setSettings({ ...settings, primaryNavy: e.target.value })}
                  className="w-8 h-8 rounded border border-stone-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.primaryNavy}
                  onChange={(e) => setSettings({ ...settings, primaryNavy: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono bg-offwhite border border-stone-200 rounded-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Accent Warm Gold
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.accentGold}
                  onChange={(e) => setSettings({ ...settings, accentGold: e.target.value })}
                  className="w-8 h-8 rounded border border-stone-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.accentGold}
                  onChange={(e) => setSettings({ ...settings, accentGold: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono bg-offwhite border border-stone-200 rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Saving to Database..." : "Save Corporate Configuration"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
