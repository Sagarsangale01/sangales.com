"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  ShieldCheck,
  Palette,
  PhoneCall,
  AlertCircle,
  LayoutTemplate,
  Compass,
  Milestone,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Globe,
  Clock,
  Sparkles,
} from "lucide-react";
import { MilestoneRecord } from "@/lib/data";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "hero" | "narrative" | "milestones" | "seo">("contact");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    siteName: "SANGALES",
    descriptor: "A GROUP OF COMPANIES",
    tagline: "Building Businesses. Creating Opportunities.",
    contactEmail: "contact.sangales@gmail.com",
    contactPhone: "+91 75077 00936",
    corporateAddress: "Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03",
    workingHours: "Monday – Saturday: 09:30 AM – 06:30 PM IST",
    primaryNavy: "#142735",
    accentGold: "#C6A66B",
    metaTitle: "SANGALES – A GROUP OF COMPANIES | Building Businesses. Creating Opportunities.",
    metaDescription: "Official corporate website of SANGALES – A GROUP OF COMPANIES. Leading Indian group in food, agriculture, trading, packaging, and commercial enterprises.",

    heroLabel: "DIVERSIFIED BUSINESS GROUP • INDIA",
    heroHeadline: "Building Businesses. Creating Opportunities.",
    heroSubtitle: "A growing business group bringing together wholesome food, sustainable agriculture, commercial trading, packaging solutions, and next-generation enterprise innovation.",
    heroCtaPrimary: "Explore Our Businesses",
    heroCtaSecondary: "Discover Our Story",

    aboutHeadline: "One Vision. Multiple Businesses.",
    aboutSubtitle: "Corporate Identity & Philosophy",
    aboutDescription: "SANGALES – A GROUP OF COMPANIES operates as a unified parent brand fostering independent, mission-driven operating enterprises. From farm gate cultivation and nutritious pantry staples to wholesale enterprise supplies, trading networks, and engineered packaging, we believe true corporate strength lies in patient value creation.",
    aboutSecondaryText: "Every business under the Sangales umbrella retains its dedicated brand ethos, client connections, and specialized domain expertise—while anchoring itself in group-wide standards of governance, operational discipline, and long-term partnership reliability.",

    visionStatement: "To emerge as a trusted, forward-looking Indian corporate group recognized for building resilient businesses, empowering regional supply chains, and setting benchmarks of quality and value creation across every industry we enter.",
    missionStatement: "To cultivate essential enterprises in food, agriculture, trade, packaging, and digital solutions by adhering to uncompromising quality, honoring partner relationships, investing in sustainable methodologies, and delivering tangible value to customers and communities.",

    partnershipHeadline: "Let's Build Something Together.",
    partnershipSubtitle: "We actively seek long-term partnerships with distributors, institutional buyers, suppliers, and entrepreneurs who value quality and mutual growth.",
  });

  const [milestones, setMilestones] = useState<MilestoneRecord[]>([]);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.settings) {
            setSettings((prev) => ({ ...prev, ...data.settings }));
          }
          if (data.milestones && Array.isArray(data.milestones)) {
            setMilestones(data.milestones);
          }
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
        credentials: "include",
        body: JSON.stringify({ settings, milestones }),
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

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        year: `${new Date().getFullYear()}`,
        tag: "Expansion",
        title: "New Corporate Milestone",
        description: "Describe the strategic milestone, expansion, or division rollout achieved.",
      },
    ]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: keyof MilestoneRecord, value: string) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const moveMilestone = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === milestones.length - 1) return;
    const target = direction === "up" ? index - 1 : index + 1;
    const updated = [...milestones];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setMilestones(updated);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            Corporate Group Settings &amp; Dynamic Content Manager
          </h2>
          <p className="text-xs text-charcoal-100">
            Edit branding, contact hotlines, homepage narrative copy, vision statements, and timeline milestones. All changes are saved to the backend and update the frontend dynamically.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="self-start sm:self-auto px-6 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Saving to Database..." : "Save All Changes"}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-sm flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-bold">Configurations successfully saved and synchronized!</p>
            <p className="text-emerald-700">All public frontend pages (Home, About, Contact, Vision, Journey, Footer, Header) now reflect these updated parameters.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-stone-200 gap-1 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "contact"
              ? "border-navy text-navy font-bold bg-white"
              : "border-transparent text-charcoal-100 hover:text-navy"
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5 text-gold-700" />
          <span>Brand &amp; Contact Desk</span>
        </button>

        <button
          onClick={() => setActiveTab("hero")}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "hero"
              ? "border-navy text-navy font-bold bg-white"
              : "border-transparent text-charcoal-100 hover:text-navy"
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5 text-gold-700" />
          <span>Homepage Hero &amp; CTAs</span>
        </button>

        <button
          onClick={() => setActiveTab("narrative")}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "narrative"
              ? "border-navy text-navy font-bold bg-white"
              : "border-transparent text-charcoal-100 hover:text-navy"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-gold-700" />
          <span>Philosophy, Vision &amp; Partnerships</span>
        </button>

        <button
          onClick={() => setActiveTab("milestones")}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "milestones"
              ? "border-navy text-navy font-bold bg-white"
              : "border-transparent text-charcoal-100 hover:text-navy"
          }`}
        >
          <Milestone className="w-3.5 h-3.5 text-gold-700" />
          <span>Journey Milestones ({milestones.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "seo"
              ? "border-navy text-navy font-bold bg-white"
              : "border-transparent text-charcoal-100 hover:text-navy"
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-gold-700" />
          <span>SEO &amp; Palette</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: Brand & Contact Desk */}
        {activeTab === "contact" && (
          <div className="space-y-6 animate-in fade-in">
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
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Displayed in header wordmark and legal copyright footer.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Corporate Descriptor
                  </label>
                  <input
                    type="text"
                    value={settings.descriptor}
                    onChange={(e) => setSettings({ ...settings, descriptor: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">E.g., A GROUP OF COMPANIES</span>
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
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Shown prominently in the pre-footer banner and vision hero.</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
                2. Corporate Contact Hotline &amp; Headquarters
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
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Appears on Contact page, footer, and inquiry alerts.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Telephone Hotline Number
                  </label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Direct hotline on Contact page, footer, and schema metadata.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Corporate Headquarters Postal Address
                </label>
                <input
                  type="text"
                  value={settings.corporateAddress}
                  onChange={(e) => setSettings({ ...settings, corporateAddress: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Full registered address shown on Contact page &amp; footer.</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Desk Working Hours
                </label>
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Displayed under Desk Working Hours on the Contact page.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Homepage Hero & CTAs */}
        {activeTab === "hero" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
                Homepage Hero Banner Content
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Hero Badge / Category Pill
                </label>
                <input
                  type="text"
                  value={settings.heroLabel}
                  onChange={(e) => setSettings({ ...settings, heroLabel: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Small illuminated badge above hero headline.</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Primary Hero Headline
                </label>
                <input
                  type="text"
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy font-heading font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Hero Subtitle / Description Narrative
                </label>
                <textarea
                  rows={3}
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={settings.heroCtaPrimary}
                    onChange={(e) => setSettings({ ...settings, heroCtaPrimary: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Gold button linking to /businesses</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={settings.heroCtaSecondary}
                    onChange={(e) => setSettings({ ...settings, heroCtaSecondary: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Outlined button linking to /about</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Philosophy, Vision & Partnerships */}
        {activeTab === "narrative" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Corporate Philosophy */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
                1. Corporate Philosophy &amp; About Content
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Section Subtitle / Eyebrow
                  </label>
                  <input
                    type="text"
                    value={settings.aboutSubtitle}
                    onChange={(e) => setSettings({ ...settings, aboutSubtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Section Headline
                  </label>
                  <input
                    type="text"
                    value={settings.aboutHeadline}
                    onChange={(e) => setSettings({ ...settings, aboutHeadline: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Primary Philosophy Narrative
                </label>
                <textarea
                  rows={3}
                  value={settings.aboutDescription}
                  onChange={(e) => setSettings({ ...settings, aboutDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Secondary Philosophy Supporting Paragraph
                </label>
                <textarea
                  rows={3}
                  value={settings.aboutSecondaryText}
                  onChange={(e) => setSettings({ ...settings, aboutSecondaryText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
                2. Group Vision &amp; Mission Statements
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Group Vision Statement
                </label>
                <textarea
                  rows={3}
                  value={settings.visionStatement}
                  onChange={(e) => setSettings({ ...settings, visionStatement: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Displayed in Vision card on Homepage and /our-vision.</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Group Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={settings.missionStatement}
                  onChange={(e) => setSettings({ ...settings, missionStatement: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">Displayed in Mission card on Homepage and /our-vision.</span>
              </div>
            </div>

            {/* Commercial Partnership Desk */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
                3. Commercial Partnership Desk Banner
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Partnership Section Headline
                </label>
                <input
                  type="text"
                  value={settings.partnershipHeadline}
                  onChange={(e) => setSettings({ ...settings, partnershipHeadline: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Partnership Section Subtitle
                </label>
                <textarea
                  rows={2}
                  value={settings.partnershipSubtitle}
                  onChange={(e) => setSettings({ ...settings, partnershipSubtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Corporate Journey & Milestones */}
        {activeTab === "milestones" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider">
                    Milestones Timeline Management
                  </h3>
                  <p className="text-xs text-charcoal-100">
                    Add, edit, reorder, or delete verified milestones shown on the Homepage Timeline and /our-journey.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="px-3 py-1.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-4 pt-2">
                {milestones.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-400 bg-offwhite rounded-sm border border-dashed border-stone-300">
                    No milestones added yet. Click &quot;Add Milestone&quot; to create your first company milestone.
                  </div>
                ) : (
                  milestones.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-offwhite rounded-sm border border-stone-200/80 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-2">
                        <span className="text-xs font-bold uppercase text-navy flex items-center gap-1.5">
                          <Milestone className="w-3.5 h-3.5 text-gold-700" />
                          <span>Milestone #{idx + 1}</span>
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveMilestone(idx, "up")}
                            disabled={idx === 0}
                            title="Move Up"
                            className="p-1 hover:bg-stone-200 rounded text-stone-600 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveMilestone(idx, "down")}
                            disabled={idx === milestones.length - 1}
                            title="Move Down"
                            className="p-1 hover:bg-stone-200 rounded text-stone-600 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeMilestone(idx)}
                            title="Delete Milestone"
                            className="p-1 hover:bg-red-50 text-red-600 rounded ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
                            Year / Era
                          </label>
                          <input
                            type="text"
                            value={item.year}
                            onChange={(e) => updateMilestone(idx, "year", e.target.value)}
                            placeholder="e.g. 2018 or Expansion"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
                            Tag / Category
                          </label>
                          <input
                            type="text"
                            value={item.tag}
                            onChange={(e) => updateMilestone(idx, "tag", e.target.value)}
                            placeholder="e.g. Food & Wellness"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                          />
                        </div>

                        <div className="sm:col-span-1">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateMilestone(idx, "title", e.target.value)}
                            placeholder="e.g. Launch of Annamrit Foods"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-sm focus:outline-none focus:border-navy font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
                          Detailed Description Narrative
                        </label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => updateMilestone(idx, "description", e.target.value)}
                          placeholder="Comprehensive details of what was achieved..."
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SEO & Palette */}
        {activeTab === "seo" && (
          <div className="space-y-6 animate-in fade-in">
            {/* SEO Metadata */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
                1. Search Engine Metadata &amp; OpenGraph
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Global Meta Title Template
                </label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Global Meta Description
                </label>
                <textarea
                  rows={3}
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>
            </div>

            {/* Color Palette */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-stone-100 pb-2">
                2. Corporate Brand Palette Tokens
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-3 py-2 text-xs font-mono bg-offwhite border border-stone-200 rounded-sm focus:outline-none"
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
                      className="w-full px-3 py-2 text-xs font-mono bg-offwhite border border-stone-200 rounded-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at Bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <p className="text-xs text-stone-500">
            Changes are saved permanently to the backend store and instantly revalidate all public pages.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Saving to Database..." : "Save Corporate Configurations"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
