"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit3, Trash2, ExternalLink, Calendar, Newspaper, X, AlertCircle } from "lucide-react";
import { NewsRecord } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface Props {
  initialNews: NewsRecord[];
}

export default function NewsManagerClient({ initialNews }: Props) {
  const router = useRouter();
  const [newsList, setNewsList] = useState<NewsRecord[]>(initialNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<NewsRecord>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    category: "Corporate",
    status: "PUBLISHED",
  });

  const openCreate = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      category: "Corporate",
      status: "PUBLISHED",
    });
    setIsModalOpen(true);
  };

  const openEdit = (art: NewsRecord) => {
    setEditingArticle(art);
    setFormData({ ...art });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingArticle) {
        const res = await fetch(`/api/news/${editingArticle.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || data.error || "Failed to update article.");
        }
        setNewsList(newsList.map((n) => (n.id === editingArticle.id ? data.article : n)));
        setIsModalOpen(false);
        router.refresh();
      } else {
        const res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || data.error || "Failed to create article.");
        }
        setNewsList([data.article, ...newsList]);
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete press article "${title}"?`)) return;

    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNewsList(newsList.filter((n) => n.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            Press Releases &amp; Corporate News
          </h2>
          <p className="text-xs text-charcoal-100">
            Publish official announcements, operational milestones, and group updates.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Write Press Release</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Headline</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-charcoal">
              {newsList.map((art) => (
                <tr key={art.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-stone-500 whitespace-nowrap text-[11px]">
                    {formatDate(art.publishedAt)}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-navy text-xs">{art.title}</p>
                    <p className="text-[11px] font-mono text-stone-400">/{art.slug}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-700 font-semibold text-[10px] uppercase rounded-sm">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase ${
                        art.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {art.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEdit(art)}
                      className="p-1.5 text-stone-500 hover:text-navy rounded-sm"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <a
                      href={`/news/${art.slug}`}
                      target="_blank"
                      className="p-1.5 text-stone-500 hover:text-gold rounded-sm inline-block"
                      title="View article"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-sm"
                      title="Delete"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-navy p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-navy">
                {editingArticle ? "Edit Press Release" : "Publish Corporate Press Release"}
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Expansion">Expansion</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Innovation">Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Publishing Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. /images/... or https://..."
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Summary Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Full Article Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

