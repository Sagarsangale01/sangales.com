"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Boxes,
  Package,
  Search,
  Building,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  X,
  ExternalLink,
  Plus,
  RefreshCw,
  Download,
  DollarSign,
  TrendingUp,
  Tag,
  Layers,
  ShoppingBag,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { AdminProductItem } from "@/services/businessService";

interface Props {
  initialProducts: AdminProductItem[];
  businesses: { id: string; name: string; slug: string }[];
}

export default function InventoryManagerClient({ initialProducts, businesses }: Props) {
  const [products, setProducts] = useState<AdminProductItem[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK">("ALL");

  // In-line editing states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<AdminProductItem | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal Form Data
  const [formData, setFormData] = useState({
    businessId: businesses[0]?.id || "",
    name: "",
    category: "",
    subCategory: "",
    sku: "",
    price: "",
    mrp: "",
    unit: "Standard Unit",
    stockStatus: "IN_STOCK" as "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK",
    stockQuantity: 50,
    lowStockThreshold: 10,
    image: "",
    description: "",
    directBuyUrl: "",
    isFeaturedInShop: true,
  });

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper to parse numeric price
  const parseNumericPrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/,/g, "");
    const match = clean.match(/([0-9]+(?:\.[0-9]+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Inventory KPI calculations
  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.stockStatus === "IN_STOCK").length;
    const lowStock = products.filter((p) => p.stockStatus === "LOW_STOCK").length;
    const outOfStock = products.filter((p) => p.stockStatus === "OUT_OF_STOCK").length;
    const totalUnits = products.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);

    let totalVal = 0;
    products.forEach((p) => {
      const unitRate = parseNumericPrice(p.price);
      totalVal += unitRate * (p.stockQuantity || 0);
    });

    return { total, inStock, lowStock, outOfStock, totalUnits, totalVal };
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedBusiness !== "ALL" && p.businessId !== selectedBusiness) {
        return false;
      }
      if (statusFilter !== "ALL" && p.stockStatus !== statusFilter) {
        return false;
      }
      if (search.trim() !== "") {
        const q = search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSku = p.sku?.toLowerCase().includes(q) || false;
        const matchCat = p.category?.toLowerCase().includes(q) || false;
        const matchBiz = p.businessName.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchCat && !matchBiz) return false;
      }
      return true;
    });
  }, [products, selectedBusiness, statusFilter, search]);

  // Quick In-Line Update for Stock Status
  const handleQuickStatusChange = async (id: string, newStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK") => {
    setSavingId(id);
    try {
      const res = await fetch("/api/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stockStatus: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update status");

      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stockStatus: newStatus } : p)));
      showNotification(`Updated status to ${newStatus.replace("_", " ")}`);
    } catch (err: any) {
      showNotification(err.message || "Failed to update", "error");
    } finally {
      setSavingId(null);
    }
  };

  // Quick In-Line Quantity Adjuster
  const handleQuantityAdjust = async (id: string, delta: number) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const currentQty = target.stockQuantity || 0;
    const nextQty = Math.max(0, currentQty + delta);

    // Auto-compute stock status based on threshold if hitting 0
    let nextStatus = target.stockStatus;
    if (nextQty === 0) nextStatus = "OUT_OF_STOCK";
    else if (nextQty <= (target.lowStockThreshold || 10) && target.stockStatus === "IN_STOCK") {
      nextStatus = "LOW_STOCK";
    } else if (nextQty > (target.lowStockThreshold || 10) && target.stockStatus === "OUT_OF_STOCK") {
      nextStatus = "IN_STOCK";
    }

    setSavingId(id);
    try {
      const res = await fetch("/api/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          stockQuantity: nextQty,
          stockStatus: nextStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update quantity");

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stockQuantity: nextQty, stockStatus: nextStatus } : p))
      );
      showNotification(`Stock quantity updated to ${nextQty} units`);
    } catch (err: any) {
      showNotification(err.message || "Failed to update", "error");
    } finally {
      setSavingId(null);
    }
  };

  // Quick In-Line Price Update
  const handleQuickPriceSave = async (id: string, newPrice: string, newMrp?: string) => {
    setSavingId(id);
    try {
      const res = await fetch("/api/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, price: newPrice, mrp: newMrp }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update price");

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, price: newPrice, mrp: newMrp || p.mrp } : p))
      );
      setEditingId(null);
      showNotification(`Updated price for ${data.product.name}`);
    } catch (err: any) {
      showNotification(err.message || "Failed to update", "error");
    } finally {
      setSavingId(null);
    }
  };

  // Open modal for add or edit
  const openModal = (prod?: AdminProductItem) => {
    if (prod) {
      setModalProduct(prod);
      setFormData({
        businessId: prod.businessId,
        name: prod.name,
        category: prod.category || "",
        subCategory: prod.subCategory || "",
        sku: prod.sku || `SNG-${prod.id.toUpperCase()}`,
        price: prod.price || "",
        mrp: prod.mrp || "",
        unit: prod.unit || "Standard Unit",
        stockStatus: prod.stockStatus || "IN_STOCK",
        stockQuantity: prod.stockQuantity ?? 50,
        lowStockThreshold: prod.lowStockThreshold ?? 10,
        image: prod.image || "",
        description: prod.description,
        directBuyUrl: prod.directBuyUrl || "",
        isFeaturedInShop: prod.isFeaturedInShop ?? true,
      });
    } else {
      setModalProduct(null);
      setFormData({
        businessId: selectedBusiness !== "ALL" ? selectedBusiness : businesses[0]?.id || "",
        name: "",
        category: "",
        subCategory: "",
        sku: `SNG-${Date.now().toString().slice(-6)}`,
        price: "₹",
        mrp: "₹",
        unit: "Standard Unit",
        stockStatus: "IN_STOCK",
        stockQuantity: 50,
        lowStockThreshold: 10,
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
        description: "",
        directBuyUrl: "",
        isFeaturedInShop: true,
      });
    }
    setIsModalOpen(true);
  };

  // Submit Modal
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.businessId) {
      showNotification("Please fill in Product Name and Business Entity", "error");
      return;
    }

    try {
      if (modalProduct) {
        const res = await fetch(`/api/products/${modalProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Failed to save product");

        setProducts((prev) => prev.map((p) => (p.id === modalProduct.id ? data.product : p)));
        showNotification(`Saved changes for ${data.product.name}`);
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Failed to create product");

        setProducts((prev) => [data.product, ...prev]);
        showNotification(`Created new product: ${data.product.name}`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showNotification(err.message || "An error occurred", "error");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["ID", "SKU", "Product Name", "Business", "Category", "Price", "MRP", "Unit", "Stock Status", "Stock Quantity", "Est Value (INR)"];
    const rows = filteredProducts.map((p) => {
      const numPrice = parseNumericPrice(p.price);
      const estVal = numPrice * (p.stockQuantity || 0);
      return [
        p.id,
        `"${p.sku || ""}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.businessName}"`,
        `"${p.category || ""}"`,
        `"${p.price || ""}"`,
        `"${p.mrp || ""}"`,
        `"${p.unit || ""}"`,
        p.stockStatus,
        p.stockQuantity ?? 0,
        estVal,
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sangales_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-gold-700 text-[10px] font-bold tracking-superwide uppercase block mb-1">
            Shop Operations &bull; Real-Time Telemetry
          </span>
          <h1 className="font-heading text-2xl font-extrabold text-navy flex items-center gap-2.5">
            <Boxes className="w-6 h-6 text-gold-700" />
            <span>Store Products &amp; Inventory Management</span>
          </h1>
          <p className="text-xs text-charcoal-100 mt-1 max-w-2xl">
            Centralized hub to manage all live shop products, retail and wholesale prices, SKU tracking, stock quantities, and instant stock status toggles across all SANGALES business divisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/shop"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-50 text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-stone-300 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold-700" />
            <span>Live Storefront</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </Link>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-offwhite hover:bg-stone-200 text-charcoal text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-stone-300"
            title="Download complete inventory as CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Shop Product</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-3.5 rounded-sm text-xs font-medium flex items-center justify-between shadow-xs border ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-stone-400 hover:text-stone-700">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Executive Inventory KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total SKUs */}
        <div className="bg-white p-4 rounded-sm border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total SKUs</span>
            <Package className="w-4 h-4 text-navy" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-navy">{stats.total}</p>
          <span className="text-[11px] text-stone-400">Products across all divisions</span>
        </div>

        {/* In Stock */}
        <div
          onClick={() => setStatusFilter("IN_STOCK")}
          className={`bg-white p-4 rounded-sm border shadow-xs cursor-pointer transition-all hover:border-emerald-400 ${
            statusFilter === "IN_STOCK" ? "border-emerald-500 ring-2 ring-emerald-100" : "border-stone-200"
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">In Stock</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-emerald-700">{stats.inStock}</p>
          <span className="text-[11px] text-emerald-600 font-medium">Ready for dispatch</span>
        </div>

        {/* Low Stock Alert */}
        <div
          onClick={() => setStatusFilter("LOW_STOCK")}
          className={`bg-white p-4 rounded-sm border shadow-xs cursor-pointer transition-all hover:border-amber-400 ${
            statusFilter === "LOW_STOCK" ? "border-amber-500 ring-2 ring-amber-100" : "border-stone-200"
          }`}
        >
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Low Stock</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-amber-700">{stats.lowStock}</p>
          <span className="text-[11px] text-amber-600 font-medium">Needs reorder soon</span>
        </div>

        {/* Out of Stock */}
        <div
          onClick={() => setStatusFilter("OUT_OF_STOCK")}
          className={`bg-white p-4 rounded-sm border shadow-xs cursor-pointer transition-all hover:border-red-400 ${
            statusFilter === "OUT_OF_STOCK" ? "border-red-500 ring-2 ring-red-100" : "border-stone-200"
          }`}
        >
          <div className="flex items-center justify-between text-red-700 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Out of Stock</span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-red-700">{stats.outOfStock}</p>
          <span className="text-[11px] text-red-600 font-medium">Temporarily unavailable</span>
        </div>

        {/* Total Inventory Value */}
        <div className="bg-white p-4 rounded-sm border border-stone-200 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-gold-700 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Estimated Stock Value</span>
            <TrendingUp className="w-4 h-4 text-gold-700" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-navy">
            ₹{stats.totalVal.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-stone-500 font-medium">{stats.totalUnits.toLocaleString("en-IN")} Units in inventory</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-sm border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name, SKU, category, or business..."
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

          {/* Business Entity Filter */}
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gold-700 shrink-0" />
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              className="px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal font-medium"
            >
              <option value="ALL">All Business Divisions ({businesses.length})</option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-stone-100 gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1.5 rounded-xs font-bold uppercase tracking-wider text-[11px] transition-all ${
                statusFilter === "ALL"
                  ? "bg-navy text-gold"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setStatusFilter("IN_STOCK")}
              className={`px-3 py-1.5 rounded-xs font-bold uppercase tracking-wider text-[11px] transition-all flex items-center gap-1 ${
                statusFilter === "IN_STOCK"
                  ? "bg-emerald-700 text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>In Stock ({stats.inStock})</span>
            </button>
            <button
              onClick={() => setStatusFilter("LOW_STOCK")}
              className={`px-3 py-1.5 rounded-xs font-bold uppercase tracking-wider text-[11px] transition-all flex items-center gap-1 ${
                statusFilter === "LOW_STOCK"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Low Stock ({stats.lowStock})</span>
            </button>
            <button
              onClick={() => setStatusFilter("OUT_OF_STOCK")}
              className={`px-3 py-1.5 rounded-xs font-bold uppercase tracking-wider text-[11px] transition-all flex items-center gap-1 ${
                statusFilter === "OUT_OF_STOCK"
                  ? "bg-red-700 text-white"
                  : "bg-red-50 text-red-800 hover:bg-red-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span>Out of Stock ({stats.outOfStock})</span>
            </button>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Showing <strong className="text-navy">{filteredProducts.length}</strong> of {products.length} products
          </div>
        </div>
      </div>

      {/* Main Inventory & Pricing Table */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Product &amp; SKU</th>
                <th className="py-3 px-4">Business Unit</th>
                <th className="py-3 px-4">Selling Price &amp; MRP</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Inventory Level</th>
                <th className="py-3 px-4">Packaging Unit</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-charcoal">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-400">
                    <Boxes className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                    <p className="text-sm font-medium">No products match your current filters.</p>
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedBusiness("ALL");
                        setStatusFilter("ALL");
                      }}
                      className="mt-2 text-xs font-bold text-navy hover:text-gold uppercase tracking-wider"
                    >
                      Clear All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod, idx) => {
                  const isSaving = savingId === prod.id;
                  const isLow = prod.stockStatus === "LOW_STOCK";
                  const isOut = prod.stockStatus === "OUT_OF_STOCK";

                  return (
                    <tr
                      key={prod.id}
                      className={`hover:bg-stone-50/80 transition-colors ${
                        isOut ? "bg-red-50/20" : isLow ? "bg-amber-50/20" : ""
                      }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4 text-center font-mono text-stone-400 text-[11px]">
                        {idx + 1}
                      </td>

                      {/* Product & SKU */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xs overflow-hidden bg-navy-950 border border-stone-200 shrink-0">
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
                          <div>
                            <p className="font-bold text-navy text-xs line-clamp-1">{prod.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded-xs font-semibold">
                                {prod.sku || `SNG-${prod.id.toUpperCase()}`}
                              </span>
                              {prod.category && (
                                <span className="text-[10px] text-stone-500 font-medium">
                                  {prod.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Business Unit */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium text-navy text-xs">{prod.businessName}</span>
                      </td>

                      {/* Price & MRP (with In-Place Edit capability) */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {editingId === prod.id ? (
                          <div className="space-y-1.5 p-2 bg-stone-50 rounded-sm border border-stone-200">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-stone-500 w-10">Price:</span>
                              <input
                                id={`edit-price-${prod.id}`}
                                defaultValue={prod.price || ""}
                                placeholder="₹..."
                                className="w-24 px-2 py-1 text-xs border border-stone-300 rounded-xs bg-white font-bold"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-stone-500 w-10">MRP:</span>
                              <input
                                id={`edit-mrp-${prod.id}`}
                                defaultValue={prod.mrp || ""}
                                placeholder="₹..."
                                className="w-24 px-2 py-1 text-xs border border-stone-300 rounded-xs bg-white text-stone-500"
                              />
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => {
                                  const pInput = document.getElementById(`edit-price-${prod.id}`) as HTMLInputElement;
                                  const mInput = document.getElementById(`edit-mrp-${prod.id}`) as HTMLInputElement;
                                  handleQuickPriceSave(prod.id, pInput?.value || prod.price || "", mInput?.value);
                                }}
                                disabled={isSaving}
                                className="px-2 py-1 bg-navy text-gold text-[10px] font-bold uppercase rounded-xs"
                              >
                                {isSaving ? "..." : "Save"}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-[10px] text-stone-500 hover:text-stone-800"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="group flex items-baseline gap-2 cursor-pointer" onClick={() => setEditingId(prod.id)}>
                            <div>
                              <p className="font-bold text-navy text-xs">{prod.price || "Contact"}</p>
                              {prod.mrp && prod.mrp !== prod.price && (
                                <p className="text-[10px] text-stone-400 line-through">
                                  MRP {prod.mrp}
                                </p>
                              )}
                            </div>
                            <Edit3 className="w-3 h-3 text-stone-300 group-hover:text-gold-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </td>

                      {/* Stock Status Selector (1-Click Switcher) */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="relative inline-block">
                          <select
                            value={prod.stockStatus || "IN_STOCK"}
                            disabled={isSaving}
                            onChange={(e) =>
                              handleQuickStatusChange(
                                prod.id,
                                e.target.value as "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"
                              )
                            }
                            className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-xs border cursor-pointer focus:outline-none transition-all ${
                              prod.stockStatus === "IN_STOCK"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                                : prod.stockStatus === "LOW_STOCK"
                                ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                                : "bg-red-50 text-red-800 border-red-300 hover:bg-red-100"
                            }`}
                          >
                            <option value="IN_STOCK">● In Stock</option>
                            <option value="LOW_STOCK">▲ Low Stock</option>
                            <option value="OUT_OF_STOCK">✕ Out of Stock</option>
                          </select>
                        </div>
                      </td>

                      {/* Inventory Count (with - / + buttons) */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleQuantityAdjust(prod.id, -5)}
                            disabled={isSaving || (prod.stockQuantity || 0) <= 0}
                            className="w-6 h-6 rounded-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors disabled:opacity-40"
                            title="Decrease by 5 units"
                          >
                            -5
                          </button>
                          <button
                            onClick={() => handleQuantityAdjust(prod.id, -1)}
                            disabled={isSaving || (prod.stockQuantity || 0) <= 0}
                            className="w-6 h-6 rounded-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors disabled:opacity-40"
                            title="Decrease by 1 unit"
                          >
                            -1
                          </button>

                          <span
                            className={`min-w-[42px] text-center font-bold px-2 py-0.5 rounded-xs font-mono text-xs ${
                              isOut
                                ? "bg-red-100 text-red-800"
                                : isLow
                                ? "bg-amber-100 text-amber-800"
                                : "bg-stone-100 text-navy"
                            }`}
                          >
                            {prod.stockQuantity ?? 50}
                          </span>

                          <button
                            onClick={() => handleQuantityAdjust(prod.id, 1)}
                            disabled={isSaving}
                            className="w-6 h-6 rounded-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors disabled:opacity-40"
                            title="Increase by 1 unit"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => handleQuantityAdjust(prod.id, 10)}
                            disabled={isSaving}
                            className="w-6 h-6 rounded-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors disabled:opacity-40"
                            title="Increase by 10 units"
                          >
                            +10
                          </button>
                        </div>
                      </td>

                      {/* Packaging Unit */}
                      <td className="py-3 px-4 whitespace-nowrap text-stone-500 font-medium">
                        {prod.unit || "Standard Unit"}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href="/shop"
                            target="_blank"
                            className="p-1.5 hover:bg-stone-100 text-stone-400 hover:text-navy rounded-xs transition-colors"
                            title="View on Shop storefront"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => openModal(prod)}
                            className="p-1.5 hover:bg-stone-100 text-stone-600 hover:text-navy rounded-xs transition-colors"
                            title="Full Product &amp; Inventory Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Modal for Product & Inventory Details */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-navy p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700">
                {modalProduct ? "Inventory & Product Configuration" : "New Shop Listing"}
              </span>
              <h3 className="font-heading text-xl font-bold text-navy">
                {modalProduct ? `Edit ${modalProduct.name}` : "Add New Product to Store"}
              </h3>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {/* Business Entity */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Target Business Unit *
                </label>
                <select
                  value={formData.businessId}
                  onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-medium"
                >
                  {businesses.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Product / SKU Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Premium Desi Cow A2 Bilona Ghee (1 Litre)"
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Category, Sub-Category, SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. A2 Bilona Ghee"
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Sub-Category / Filter
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    placeholder="e.g. Pure Ghee"
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. ANV-GHEE-1L"
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold font-mono"
                  />
                </div>
              </div>

              {/* Pricing & Units */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-stone-50 border border-stone-200 rounded-sm">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹3,000"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-sm font-bold text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Original MRP (₹)
                  </label>
                  <input
                    type="text"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    placeholder="e.g. ₹3,500"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-sm text-stone-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Unit / Pack Size
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g. 1 Litre Glass Jar"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-sm"
                  />
                </div>
              </div>

              {/* Inventory & Stock Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-amber-50/40 border border-amber-200 rounded-sm">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
                    Stock Status *
                  </label>
                  <select
                    value={formData.stockStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockStatus: e.target.value as "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK",
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-sm font-semibold"
                  >
                    <option value="IN_STOCK">● In Stock (Active)</option>
                    <option value="LOW_STOCK">▲ Low Stock Warning</option>
                    <option value="OUT_OF_STOCK">✕ Out of Stock (Disabled)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 10 })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-sm"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Product Image URL or Path
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/anvayi-farms/anvayi-ghee-1litre.jpg or https://..."
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
                {formData.image && (
                  <div className="mt-2 h-20 w-32 rounded-xs overflow-hidden border border-stone-200 bg-navy-950">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Product Specifications &amp; Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail ingredients, quality certifications, FSSAI compliance, dimensions, or dispatch details..."
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-stone-500 hover:text-navy rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-navy text-gold hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                >
                  {modalProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

