"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit3, Trash2, ExternalLink, Sparkles, Check, X, Building, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { BusinessRecord } from "@/lib/data";

interface Props {
  initialBusinesses: BusinessRecord[];
  categories: { id: string; name: string; slug: string }[];
}

export default function BusinessManagerClient({ initialBusinesses, categories }: Props) {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<BusinessRecord[]>(initialBusinesses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBiz, setEditingBiz] = useState<BusinessRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<BusinessRecord>>({
    name: "",
    slug: "",
    tagline: "",
    category: categories[0]?.name || "General",
    shortDescription: "",
    about: "",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
    email: "contact@sangales.com",
    phone: "+91 98220 00000",
    address: "Sangales Corporate House, India",
    website: "https://www.sangales.com",
    status: "PUBLISHED",
    isFeatured: false,
    displayOrder: 1,
    seoTitle: "",
    seoDescription: "",
  });

  const openCreateModal = () => {
    setEditingBiz(null);
    setErrorMessage(null);
    setFormData({
      name: "",
      slug: "",
      tagline: "",
      category: categories[0]?.name || "Food & Wellness",
      shortDescription: "",
      about: "",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
      email: "contact@sangales.com",
      phone: "+91 98220 00000",
      address: "Sangales Corporate House, India",
      website: "https://www.sangales.com",
      status: "PUBLISHED",
      isFeatured: false,
      displayOrder: businesses.length + 1,
      seoTitle: "",
      seoDescription: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (biz: BusinessRecord) => {
    setEditingBiz(biz);
    setErrorMessage(null);
    setFormData({ ...biz });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      if (editingBiz) {
        // Update
        const res = await fetch(`/api/businesses/${editingBiz.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || data.error || "Failed to update business in database.");
        }
        setBusinesses(businesses.map((b) => (b.id === editingBiz.id ? data.business : b)));
        setIsModalOpen(false);
        setSuccessBanner(`"${data.business.name}" updated successfully in database! All frontend pages refreshed.`);
        setTimeout(() => setSuccessBanner(null), 5000);
        router.refresh();
      } else {
        // Create
        const res = await fetch("/api/businesses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || data.error || "Failed to create business in database.");
        }
        setBusinesses([...businesses, data.business]);
        setIsModalOpen(false);
        setSuccessBanner(`"${data.business.name}" created and published!`);
        setTimeout(() => setSuccessBanner(null), 5000);
        router.refresh();
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setErrorMessage(err.message || "An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from the business portfolio?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/businesses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBusinesses(businesses.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            Business Entities Management
          </h2>
          <p className="text-xs text-charcoal-100">
            Publish, edit, feature, and configure operating companies under Sangales Group.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Business</span>
        </button>
      </div>

      {successBanner && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Businesses Table */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Business Name &amp; Slug</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-charcoal">
              {businesses.map((biz) => (
                <tr key={biz.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-navy">
                    {biz.displayOrder}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={biz.coverImage}
                        alt={biz.name}
                        className="w-10 h-8 object-cover rounded-sm border border-stone-200 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-navy text-xs">{biz.name}</p>
                        <p className="text-[11px] font-mono text-stone-400">/{biz.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-sm font-medium">
                      {biz.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-sm font-bold text-[10px] tracking-wider uppercase ${
                        biz.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-800"
                          : biz.status === "DRAFT"
                          ? "bg-amber-100 text-amber-800"
                          : biz.status === "UPCOMING"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {biz.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {biz.isFeatured ? (
                      <span className="inline-flex items-center gap-1 text-gold font-bold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-stone-400">No</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-stone-500">
                    <p>{biz.email}</p>
                    <p>{biz.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(biz)}
                      className="p-1.5 text-stone-500 hover:text-navy hover:bg-stone-100 rounded-sm"
                      title="Edit business"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <a
                      href={`/businesses/${biz.slug}`}
                      target="_blank"
                      className="p-1.5 text-stone-500 hover:text-gold hover:bg-stone-100 rounded-sm inline-block"
                      title="View live profile"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(biz.id, biz.name)}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-sm"
                      title="Delete business"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-navy p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-navy">
                  {editingBiz ? `Edit Business: ${editingBiz.name}` : "Create New Group Business"}
                </h3>
                <p className="text-xs text-charcoal-100">
                  Fill in the corporate profile and publishing parameters.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-name"
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Industry / Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Publishing Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Purity, Nutrition &amp; Conscious Dining"
                  className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Comprehensive About / Operational Narrative <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Direct Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-offwhite border border-stone-200 rounded-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-stone-300 text-gold focus:ring-gold"
                />
                <label htmlFor="featuredToggle" className="text-xs font-bold text-navy">
                  Feature this business on the homepage hero portfolio showcase
                </label>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase text-stone-500 hover:text-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingBiz ? "Update Business" : "Create Business"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

