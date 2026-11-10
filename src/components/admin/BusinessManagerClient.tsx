"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Sparkles,
  Check,
  X,
  Building,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Package,
  Image as ImageIcon,
  CheckSquare,
  Users,
} from "lucide-react";
import { BusinessRecord } from "@/lib/data";

interface Props {
  initialBusinesses: BusinessRecord[];
  categories: { id: string; name: string; slug: string }[];
}

export default function BusinessManagerClient({ initialBusinesses, categories }: Props) {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<BusinessRecord[]>(initialBusinesses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"GENERAL" | "PRODUCTS" | "GALLERY" | "STRENGTHS">("GENERAL");
  const [editingBiz, setEditingBiz] = useState<BusinessRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // New product temp input
  const [newProduct, setNewProduct] = useState({ name: "", category: "", description: "", image: "" });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  // New gallery image temp input
  const [newGalleryImg, setNewGalleryImg] = useState({ url: "", alt: "" });
  // New strength temp input
  const [newStrength, setNewStrength] = useState("");
  // New target audience temp input
  const [newAudience, setNewAudience] = useState("");

  const [formData, setFormData] = useState<Partial<BusinessRecord>>({
    name: "",
    slug: "",
    tagline: "",
    category: categories[0]?.name || "General",
    shortDescription: "",
    about: "",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
    email: "contact.sangales@gmail.com",
    phone: "+91 75077 00936",
    address: "Sangales Corporate House, India",
    website: "https://www.sangales.com",
    status: "PUBLISHED",
    isFeatured: false,
    displayOrder: 1,
    seoTitle: "",
    seoDescription: "",
    strengths: [],
    targetAudience: [],
    products: [],
    gallery: [],
  });

  const openCreateModal = () => {
    setEditingBiz(null);
    setErrorMessage(null);
    setModalTab("GENERAL");
    setFormData({
      name: "",
      slug: "",
      tagline: "",
      category: categories[0]?.name || "Food & Wellness",
      shortDescription: "",
      about: "",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
      email: "contact.sangales@gmail.com",
      phone: "+91 75077 00936",
      address: "Sangales Corporate House, India",
      website: "https://www.sangales.com",
      status: "PUBLISHED",
      isFeatured: false,
      displayOrder: businesses.length + 1,
      seoTitle: "",
      seoDescription: "",
      strengths: [],
      targetAudience: [],
      products: [],
      gallery: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (biz: BusinessRecord) => {
    setEditingBiz(biz);
    setErrorMessage(null);
    setModalTab("GENERAL");
    setFormData({
      ...biz,
      strengths: biz.strengths || [],
      targetAudience: biz.targetAudience || [],
      products: biz.products || [],
      gallery: biz.gallery || [],
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      if (editingBiz) {
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
        setSuccessBanner(`"${data.business.name}" updated successfully in database! Frontend refreshed.`);
        setTimeout(() => setSuccessBanner(null), 5000);
        router.refresh();
      } else {
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
      const res = await fetch(`/api/businesses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setBusinesses(businesses.filter((b) => b.id !== id));
        setSuccessBanner(`"${name}" removed from portfolio.`);
        setTimeout(() => setSuccessBanner(null), 4000);
        router.refresh();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Helper functions for Products, Gallery, Strengths
  const startEditProduct = (prod: any) => {
    setEditingProductId(prod.id);
    setNewProduct({
      name: prod.name,
      category: prod.category || "",
      description: prod.description || "",
      image: prod.image || "",
    });
  };

  const cancelEditProduct = () => {
    setEditingProductId(null);
    setNewProduct({ name: "", category: "", description: "", image: "" });
  };

  const saveProductItem = () => {
    if (!newProduct.name.trim()) return;

    if (editingProductId) {
      const updated = (formData.products || []).map((p) =>
        p.id === editingProductId
          ? {
              ...p,
              name: newProduct.name.trim(),
              category: newProduct.category.trim() || undefined,
              description: newProduct.description.trim() || "",
              image: newProduct.image.trim() || p.image,
            }
          : p
      );
      setFormData({ ...formData, products: updated });
      cancelEditProduct();
    } else {
      const prodItem = {
        id: `p-${Date.now()}`,
        name: newProduct.name.trim(),
        category: newProduct.category.trim() || undefined,
        description: newProduct.description.trim() || "",
        image:
          newProduct.image.trim() ||
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      };
      setFormData({ ...formData, products: [...(formData.products || []), prodItem] });
      setNewProduct({ name: "", category: "", description: "", image: "" });
    }
  };

  const removeProductItem = (pId: string) => {
    if (editingProductId === pId) {
      cancelEditProduct();
    }
    setFormData({ ...formData, products: (formData.products || []).filter((p) => p.id !== pId) });
  };

  const addGalleryItem = () => {
    if (!newGalleryImg.url.trim()) return;
    const imgItem = {
      url: newGalleryImg.url.trim(),
      alt: newGalleryImg.alt.trim() || "Operational facility showcase",
    };
    setFormData({ ...formData, gallery: [...(formData.gallery || []), imgItem] });
    setNewGalleryImg({ url: "", alt: "" });
  };

  const removeGalleryItem = (index: number) => {
    setFormData({
      ...formData,
      gallery: (formData.gallery || []).filter((_, i) => i !== index),
    });
  };

  const addStrengthItem = () => {
    if (!newStrength.trim()) return;
    setFormData({ ...formData, strengths: [...(formData.strengths || []), newStrength.trim()] });
    setNewStrength("");
  };

  const removeStrengthItem = (index: number) => {
    setFormData({
      ...formData,
      strengths: (formData.strengths || []).filter((_, i) => i !== index),
    });
  };

  const addAudienceItem = () => {
    if (!newAudience.trim()) return;
    setFormData({ ...formData, targetAudience: [...(formData.targetAudience || []), newAudience.trim()] });
    setNewAudience("");
  };

  const removeAudienceItem = (index: number) => {
    setFormData({
      ...formData,
      targetAudience: (formData.targetAudience || []).filter((_, i) => i !== index),
    });
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
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-medium">{successBanner}</span>
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
                <th className="py-3.5 px-4">Offerings</th>
                <th className="py-3.5 px-4">Featured</th>
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
                  <td className="py-3.5 px-4 text-stone-500 font-medium">
                    {biz.products ? `${biz.products.length} Products` : "0 Products"}
                  </td>
                  <td className="py-3.5 px-4">
                    {biz.isFeatured ? (
                      <span className="inline-flex items-center gap-1 text-gold-700 font-bold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-stone-400">No</span>
                    )}
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

      {/* Comprehensive Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-4xl w-full p-6 sm:p-8 relative my-8 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-navy p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-navy">
                  {editingBiz ? `Edit Business: ${editingBiz.name}` : "Create New Group Business"}
                </h3>
                <p className="text-xs text-charcoal-100">
                  Manage corporate identity, offerings, facilities, strengths, and contact desk.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Sub-Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setModalTab("GENERAL")}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                    modalTab === "GENERAL"
                      ? "bg-navy text-gold shadow-sm"
                      : "bg-offwhite text-charcoal hover:bg-stone-200"
                  }`}
                >
                  <Building className="w-3.5 h-3.5" /> General &amp; Contact
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab("PRODUCTS")}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                    modalTab === "PRODUCTS"
                      ? "bg-navy text-gold shadow-sm"
                      : "bg-offwhite text-charcoal hover:bg-stone-200"
                  }`}
                >
                  <Package className="w-3.5 h-3.5" /> Products &amp; Solutions ({formData.products?.length || 0})
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab("GALLERY")}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                    modalTab === "GALLERY"
                      ? "bg-navy text-gold shadow-sm"
                      : "bg-offwhite text-charcoal hover:bg-stone-200"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Operations Gallery ({formData.gallery?.length || 0})
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab("STRENGTHS")}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                    modalTab === "STRENGTHS"
                      ? "bg-navy text-gold shadow-sm"
                      : "bg-offwhite text-charcoal hover:bg-stone-200"
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" /> Strengths &amp; Markets
                </button>
              </div>

              {/* TAB 1: General & Contact */}
              {modalTab === "GENERAL" && (
                <div className="space-y-4">
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
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
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
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-mono"
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
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
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
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-bold"
                      >
                        <option value="PUBLISHED">PUBLISHED – Live Operating Company</option>
                        <option value="UPCOMING">UPCOMING – Strategic Incubation Venture</option>
                        <option value="DRAFT">DRAFT – Internal Draft (Admin Only)</option>
                        <option value="ARCHIVED">ARCHIVED – Decommissioned Entity</option>
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
                      className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
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
                      className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
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
                      className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
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
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                        Official Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
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
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
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
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
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
                        className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
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
                      Feature this business prominently on homepage portfolio showcase
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: Products & Solutions */}
              {modalTab === "PRODUCTS" && (
                <div className="space-y-6">
                  {/* Form to add or edit product */}
                  <div className="p-4 bg-offwhite rounded-sm border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy block">
                        {editingProductId ? "Edit Product / Capability" : "Add Product or Capability"}
                      </span>
                      {editingProductId && (
                        <button
                          type="button"
                          onClick={cancelEditProduct}
                          className="text-xs text-stone-500 hover:text-navy underline"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Product / Service Name (e.g. Pure Cold-Pressed Groundnut Oil)"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-sm"
                      />
                      <input
                        type="text"
                        placeholder="Sub-Category (e.g. Edible Oils / Staples / Services)"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-sm"
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="Product Image URL"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-sm font-mono"
                    />
                    <textarea
                      rows={2}
                      placeholder="Brief description of product features, specifications, and applications..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-sm"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={saveProductItem}
                        className="px-4 py-2 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-colors"
                      >
                        {editingProductId ? "✓ Update Offering Details" : "+ Add to Offerings"}
                      </button>
                      {editingProductId && (
                        <button
                          type="button"
                          onClick={cancelEditProduct}
                          className="px-4 py-2 bg-stone-200 text-charcoal text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-stone-300 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* List of existing products */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Configured Products &amp; Services ({formData.products?.length || 0})
                    </h4>
                    {formData.products?.length === 0 ? (
                      <p className="text-xs text-stone-400">No products added yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {formData.products?.map((p) => (
                          <div
                            key={p.id}
                            className={`p-3 bg-white border rounded-sm shadow-sm flex items-start justify-between gap-3 ${
                              editingProductId === p.id ? "border-gold ring-1 ring-gold" : "border-stone-200"
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              {p.image && (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-12 h-12 object-cover rounded-sm border shrink-0"
                                />
                              )}
                              <div className="space-y-0.5">
                                <p className="font-bold text-navy text-xs">{p.name}</p>
                                {p.category && (
                                  <span className="text-[10px] font-semibold text-gold-700 uppercase">
                                    {p.category}
                                  </span>
                                )}
                                <p className="text-[11px] text-stone-500 line-clamp-2">{p.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => startEditProduct(p)}
                                className="text-stone-400 hover:text-navy p-1"
                                title="Edit product/service details"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeProductItem(p.id)}
                                className="text-stone-400 hover:text-red-600 p-1"
                                title="Delete product/service"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: Operations Gallery */}
              {modalTab === "GALLERY" && (
                <div className="space-y-6">
                  {/* Add Image */}
                  <div className="p-4 bg-offwhite rounded-sm border border-stone-200 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-navy block">
                      Add Facility or Operations Photo
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="url"
                        placeholder="Image URL (CDN / S3 / Unsplash)"
                        value={newGalleryImg.url}
                        onChange={(e) => setNewGalleryImg({ ...newGalleryImg, url: e.target.value })}
                        className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-sm font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Caption / Alt Text"
                        value={newGalleryImg.alt}
                        onChange={(e) => setNewGalleryImg({ ...newGalleryImg, alt: e.target.value })}
                        className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addGalleryItem}
                      className="px-4 py-2 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-colors"
                    >
                      + Add to Gallery
                    </button>
                  </div>

                  {/* Gallery thumbnails */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Gallery Images ({formData.gallery?.length || 0})
                    </h4>
                    {formData.gallery?.length === 0 ? (
                      <p className="text-xs text-stone-400">No gallery photos configured yet.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {formData.gallery?.map((g, idx) => (
                          <div
                            key={idx}
                            className="relative group rounded-sm overflow-hidden border border-stone-200 h-28 bg-navy-950"
                          >
                            <img src={g.url} alt={g.alt} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                              <span className="text-[10px] text-white line-clamp-1">{g.alt}</span>
                              <button
                                type="button"
                                onClick={() => removeGalleryItem(idx)}
                                className="text-red-400 hover:text-red-200 self-end p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: Strengths & Markets */}
              {modalTab === "STRENGTHS" && (
                <div className="space-y-6">
                  {/* Strengths */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-navy block">
                      Operating Strengths (Bullet Points on Profile)
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 100% certified food-grade contact materials"
                        value={newStrength}
                        onChange={(e) => setNewStrength(e.target.value)}
                        className="flex-grow px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                      />
                      <button
                        type="button"
                        onClick={addStrengthItem}
                        className="px-4 py-2 bg-navy text-gold text-xs font-bold uppercase rounded-sm"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {formData.strengths?.map((st, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-charcoal text-xs rounded-sm border border-stone-200"
                        >
                          <span>{st}</span>
                          <button
                            type="button"
                            onClick={() => removeStrengthItem(i)}
                            className="text-stone-400 hover:text-red-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-3 pt-4 border-t border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-navy block">
                      Target Markets &amp; Client Types
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Modern retail grocery store networks"
                        value={newAudience}
                        onChange={(e) => setNewAudience(e.target.value)}
                        className="flex-grow px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                      />
                      <button
                        type="button"
                        onClick={addAudienceItem}
                        className="px-4 py-2 bg-navy text-gold text-xs font-bold uppercase rounded-sm"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {formData.targetAudience?.map((aud, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-charcoal text-xs rounded-sm border border-stone-200"
                        >
                          <span>{aud}</span>
                          <button
                            type="button"
                            onClick={() => removeAudienceItem(i)}
                            className="text-stone-400 hover:text-red-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Action Controls */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
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
                  className="px-8 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Saving to Database..." : editingBiz ? "Save All Updates" : "Publish New Business"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
