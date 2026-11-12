"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  Building,
  Package,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Image as ImageIcon,
  Tag,
} from "lucide-react";
import { AdminProductItem } from "@/services/businessService";

interface Props {
  initialProducts: AdminProductItem[];
  businesses: { id: string; name: string; slug: string }[];
}

export default function ProductManagerClient({ initialProducts, businesses }: Props) {
  const [products, setProducts] = useState<AdminProductItem[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    businessId: businesses[0]?.id || "",
    name: "",
    category: "",
    price: "",
    directBuyUrl: "",
    image: "",
    description: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedBusiness !== "ALL" && p.businessId !== selectedBusiness) {
        return false;
      }
      if (search.trim() !== "") {
        const q = search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCat = p.category?.toLowerCase().includes(q) || false;
        const matchBiz = p.businessName.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat && !matchBiz) return false;
      }
      return true;
    });
  }, [products, selectedBusiness, search]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      businessId: selectedBusiness !== "ALL" ? selectedBusiness : businesses[0]?.id || "",
      name: "",
      category: "",
      price: "",
      directBuyUrl: "",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
      description: "",
    });
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (prod: AdminProductItem) => {
    setEditingProduct(prod);
    setFormData({
      businessId: prod.businessId,
      name: prod.name,
      category: prod.category || "",
      price: prod.price || "",
      directBuyUrl: prod.directBuyUrl || "",
      image: prod.image || "",
      description: prod.description,
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || !formData.businessId) {
      setError("Please fill in the product name, target business, and description.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to update product");
        }
        setProducts(products.map((p) => (p.id === editingProduct.id ? data.product : p)));
        setSuccessBanner(`Updated "${data.product.name}" successfully.`);
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to create product");
        }
        setProducts([data.product, ...products]);
        setSuccessBanner(`Added "${data.product.name}" successfully.`);
      }
      setIsModalOpen(false);
      setTimeout(() => setSuccessBanner(null), 4000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => p.id !== id));
        setSuccessBanner(`Deleted "${name}".`);
        setTimeout(() => setSuccessBanner(null), 3000);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
            <Package className="w-5 h-5 text-gold-700" />
            <span>Products &amp; Commercial Solutions</span>
          </h2>
          <p className="text-xs text-charcoal-100">
            Manage catalogue items, descriptions, specifications, and wholesale pricing across all group entities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/catalogue"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-50 text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-stone-300 shadow-sm"
          >
            <span>Public Catalogue</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Solution</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Search and Business Filter Bar */}
      <div className="bg-white p-4 rounded-sm border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search solutions by name, category, or business..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-navy"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Business Filter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gold-700 shrink-0" />
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              className="px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none"
            >
              <option value="ALL">All Business Divisions ({businesses.length})</option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs text-stone-500 font-semibold">
            {filteredProducts.length} Items
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-14">Image</th>
                <th className="py-3 px-4">Solution / Product</th>
                <th className="py-3 px-4">Business Unit</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Indicative Rate</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-charcoal">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    No solutions found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-sm overflow-hidden bg-navy-950 border border-stone-200 shrink-0">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <Package className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-bold text-navy text-xs">{prod.name}</p>
                      <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <Link
                        href={`/businesses/${prod.businessSlug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-navy hover:text-gold font-medium group"
                      >
                        <span>{prod.businessName}</span>
                        <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-gold" />
                      </Link>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {prod.category ? (
                        <span className="px-2 py-0.5 bg-gold/15 text-gold-800 rounded-sm font-semibold text-[10px] uppercase">
                          {prod.category}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[10px]">Uncategorized</span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-navy text-xs">
                      {prod.price || <span className="text-stone-400 font-normal">On Request</span>}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 hover:bg-stone-100 text-stone-600 hover:text-navy rounded-sm transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="p-1.5 hover:bg-red-50 text-stone-400 hover:text-red-600 rounded-sm transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-navy p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700">
                {editingProduct ? "Modify Offering" : "New Solution"}
              </span>
              <h3 className="font-heading text-xl font-bold text-navy">
                {editingProduct ? `Edit ${editingProduct.name}` : "Add Solution to Business Unit"}
              </h3>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Target Business Unit *
                </label>
                <select
                  value={formData.businessId}
                  onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                >
                  {businesses.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Solution / Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. 5-Ply Heavy Duty Corrugated Master Cartons"
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Industrial Packaging"
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Indicative Price / Unit
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹450 / Bulk Rate"
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Direct Store / E-commerce URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.directBuyUrl}
                  onChange={(e) => setFormData({ ...formData, directBuyUrl: e.target.value })}
                  placeholder="e.g. https://anvayifarms.com/shop/ghee"
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Image URL or Path
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/products/sample.jpg or https://..."
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
                {formData.image && (
                  <div className="mt-2 h-20 w-32 rounded-sm overflow-hidden border border-stone-200 bg-navy-950">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Specifications &amp; Description *
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail technical specifications, dimensions, ply rating, MOQ, or service scope..."
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-stone-500 hover:text-navy rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-navy text-gold hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingProduct ? "Save Changes" : "Create Solution"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

