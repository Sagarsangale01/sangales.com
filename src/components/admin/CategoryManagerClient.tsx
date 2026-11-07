"use client";

import React, { useState } from "react";
import { Plus, Trash2, FolderTree, Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Props {
  initialCategories: Category[];
}

export default function CategoryManagerClient({ initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      if (data.success) {
        setCategories([...categories, data.category]);
        setName("");
        setDescription("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to remove the category "${catName}"?`)) return;

    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-xl font-bold text-navy">
          Business Sectors &amp; Categories
        </h2>
        <p className="text-xs text-charcoal-100">
          Manage corporate classifications applied across the portfolio directory and public website filters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-heading text-base font-bold text-navy flex items-center gap-2">
            <Plus className="w-4 h-4 text-gold-700" />
            Create Business Category
          </h3>

          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Category Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Healthcare &amp; Wellness"
                className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Description Scope
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of businesses belonging to this sector..."
                className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </form>
        </div>

        {/* Existing categories list */}
        <div className="lg:col-span-7 bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-heading text-base font-bold text-navy">
            Current Categories ({categories.length})
          </h3>

          <div className="divide-y divide-stone-100">
            {categories.map((cat) => (
              <div key={cat.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-navy">{cat.name}</p>
                  <p className="text-[11px] font-mono text-stone-400">slug: {cat.slug}</p>
                  {cat.description && (
                    <p className="text-xs text-stone-500">{cat.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 text-stone-400 hover:text-red-600 rounded-sm"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
