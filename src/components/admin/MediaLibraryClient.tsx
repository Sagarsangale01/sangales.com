"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Plus, Trash2, Search, ExternalLink, Copy, Check } from "lucide-react";
import { MediaRecord } from "@/lib/store";

interface Props {
  initialMedia: MediaRecord[];
}

export default function MediaLibraryClient({ initialMedia }: Props) {
  const [mediaList, setMediaList] = useState<MediaRecord[]>(initialMedia);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newAsset, setNewAsset] = useState({
    name: "",
    url: "",
    size: "1.0 MB",
    type: "image/jpeg",
  });

  const filtered = mediaList.filter(
    (m) =>
      search === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.url.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.url) return;
    const item: MediaRecord = {
      id: `med-${Date.now()}`,
      name: newAsset.name,
      url: newAsset.url,
      size: newAsset.size,
      type: newAsset.type,
      uploadedAt: new Date().toISOString().slice(0, 10),
    };
    setMediaList([item, ...mediaList]);
    setShowAddModal(false);
    setNewAsset({ name: "", url: "", size: "1.0 MB", type: "image/jpeg" });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete asset from media library registry?")) {
      setMediaList(mediaList.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            Media &amp; Brand Asset Library
          </h2>
          <p className="text-xs text-charcoal-100">
            Centrally manage corporate photography, brand logos, packaging visuals, and asset URLs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Register Media Asset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-sm border border-stone-200 shadow-sm flex items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assets by file name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none"
          />
        </div>
        <span className="text-xs font-semibold text-stone-500">
          {filtered.length} Media Files
        </span>
      </div>

      {/* Grid of Media Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-sm border border-stone-200 overflow-hidden shadow-sm hover:shadow-editorial transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-40 bg-navy-950 relative overflow-hidden group">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white text-navy rounded-sm hover:bg-gold transition-colors"
                    title="Open full size"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy(item.url, item.id)}
                    className="p-2 bg-white text-navy rounded-sm hover:bg-gold transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <p className="font-bold text-xs text-navy truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-400">
                  <span>{item.size}</span>
                  <span>{item.uploadedAt}</span>
                </div>
              </div>
            </div>

            <div className="p-3 pt-0 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => handleCopy(item.url, item.id)}
                className="text-[11px] text-gold-700 font-bold hover:underline"
              >
                {copiedId === item.id ? "Copied!" : "Copy URL"}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-stone-400 hover:text-red-600 p-1"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-heading text-lg font-bold text-navy">
              Register New Media Asset
            </h3>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Asset Title / File Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  placeholder="e.g. annamrit-flour-mills.jpg"
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Image URL (Local Path or Web URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.url}
                  onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                  placeholder="/images/... or https://..."
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    File Size Label
                  </label>
                  <input
                    type="text"
                    value={newAsset.size}
                    onChange={(e) => setNewAsset({ ...newAsset, size: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    MIME Type
                  </label>
                  <input
                    type="text"
                    value={newAsset.type}
                    onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-colors"
                >
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

