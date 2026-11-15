"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  MessageCircle,
  ExternalLink,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { OrderRecord } from "@/lib/store";

interface Props {
  initialOrders: OrderRecord[];
}

export default function OrderManagerClient({ initialOrders }: Props) {
  const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  // Edit state for modal
  const [editStatus, setEditStatus] = useState<OrderRecord["orderStatus"]>("PLACED");
  const [editPaymentStatus, setEditPaymentStatus] = useState<OrderRecord["paymentStatus"]>("PENDING");
  const [editTrackingNumber, setEditTrackingNumber] = useState("");
  const [editCourierPartner, setEditCourierPartner] = useState("");
  const [editAdminNotes, setEditAdminNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Compute metrics
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.orderStatus !== "CANCELLED")
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }, [orders]);

  const pendingCount = useMemo(() => {
    return orders.filter((o) => ["PLACED", "CONFIRMED", "PROCESSING"].includes(o.orderStatus)).length;
  }, [orders]);

  const dispatchedCount = useMemo(() => {
    return orders.filter((o) => ["DISPATCHED", "DELIVERED"].includes(o.orderStatus)).length;
  }, [orders]);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = statusFilter === "ALL" || o.orderStatus === statusFilter;
      const matchPayment = paymentFilter === "ALL" || o.paymentStatus === paymentFilter;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(q)) ||
        o.shippingAddress.city.toLowerCase().includes(q) ||
        o.shippingAddress.pincode.includes(q);

      return matchStatus && matchPayment && matchSearch;
    });
  }, [orders, statusFilter, paymentFilter, search]);

  const handleOpenDetail = (order: OrderRecord) => {
    setSelectedOrder(order);
    setEditStatus(order.orderStatus);
    setEditPaymentStatus(order.paymentStatus);
    setEditTrackingNumber(order.trackingNumber || "");
    setEditCourierPartner(order.courierPartner || "");
    setEditAdminNotes(order.adminNotes || "");
    setSaveSuccess(false);
  };

  const handleSaveChanges = async () => {
    if (!selectedOrder) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus: editStatus,
          paymentStatus: editPaymentStatus,
          trackingNumber: editTrackingNumber,
          courierPartner: editCourierPartner,
          adminNotes: editAdminNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update order");
      }

      // Update in local state
      setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? data.order : o)));
      setSelectedOrder(data.order);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e: any) {
      alert(e.message || "Failed to save order updates");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCsv = () => {
    const headers = [
      "Order Number",
      "Date",
      "Customer Name",
      "Phone",
      "Email",
      "Street",
      "City",
      "State",
      "Pincode",
      "Payment Mode",
      "Payment Status",
      "Order Status",
      "Subtotal",
      "Shipping Fee",
      "Total Amount",
      "Courier",
      "Tracking Number",
      "UTM Source",
      "UTM Campaign",
    ];

    const rows = filteredOrders.map((o) => [
      `"${o.orderNumber}"`,
      `"${new Date(o.createdAt).toISOString()}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerPhone}"`,
      `"${o.customerEmail || ""}"`,
      `"${o.shippingAddress.street.replace(/"/g, '""')}"`,
      `"${o.shippingAddress.city}"`,
      `"${o.shippingAddress.state}"`,
      `"${o.shippingAddress.pincode}"`,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
      `"${o.orderStatus}"`,
      o.subtotal,
      o.shippingFee,
      o.totalAmount,
      `"${o.courierPartner || ""}"`,
      `"${o.trackingNumber || ""}"`,
      `"${o.utmSource || ""}"`,
      `"${o.utmCampaign || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sangales_orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCustomerWhatsAppUrl = (order: OrderRecord) => {
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "").replace(/^91/, "");
    const text =
      `Hello ${order.customerName}, this is regarding your SANGALES GROUP Order #${order.orderNumber}.\n` +
      `Current Status: ${order.orderStatus}.\n` +
      (order.trackingNumber
        ? `Your consignment has been dispatched via ${order.courierPartner || "Courier"} with Tracking AWB: ${order.trackingNumber}.\n`
        : "") +
      `Thank you for choosing SANGALES!`;
    return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-gold" />
            <span>Store Orders Management</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Fulfill direct customer orders, update tracking AWBs, and issue dispatch alerts.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2 bg-white hover:bg-stone-50 text-navy border border-stone-300 font-bold text-xs rounded-sm shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Download className="w-4 h-4 text-stone-500" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
            Total Orders
          </span>
          <p className="text-2xl font-black text-navy mt-1">{orders.length}</p>
          <span className="text-[11px] text-stone-500">Across all businesses</span>
        </div>

        <div className="bg-white p-4 rounded-md border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
            Pending / In Progress
          </span>
          <p className="text-2xl font-black text-amber-600 mt-1">{pendingCount}</p>
          <span className="text-[11px] text-stone-500">Awaiting dispatch</span>
        </div>

        <div className="bg-white p-4 rounded-md border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
            Dispatched / Delivered
          </span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{dispatchedCount}</p>
          <span className="text-[11px] text-stone-500">Fulfilled orders</span>
        </div>

        <div className="bg-white p-4 rounded-md border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700 block">
            Total Gross Value
          </span>
          <p className="text-2xl font-black text-navy mt-1">₹{totalRevenue.toLocaleString("en-IN")}</p>
          <span className="text-[11px] text-stone-500">Confirmed order revenue</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-md border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order #, customer, phone, city..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:border-navy"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-stone-500 shrink-0">Payment:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-navy"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: "ALL", label: "All Orders" },
            { id: "PLACED", label: "Placed" },
            { id: "CONFIRMED", label: "Confirmed" },
            { id: "PROCESSING", label: "Processing" },
            { id: "DISPATCHED", label: "Dispatched" },
            { id: "DELIVERED", label: "Delivered" },
            { id: "CANCELLED", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-navy text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-md border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider border-b border-stone-200">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-center">Payment</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-stone-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy whitespace-nowrap">
                      {o.orderNumber}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-navy block">{o.customerName}</span>
                      <span className="text-[11px] text-stone-500">{o.customerPhone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 whitespace-nowrap">
                      {o.shippingAddress.city} ({o.shippingAddress.pincode})
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-stone-600">
                      {o.items.map((i) => `${i.productName} (x${i.quantity})`).join(", ")}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-navy whitespace-nowrap">
                      ₹{o.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          o.paymentStatus === "PAID" || o.paymentStatus === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.paymentStatus === "FAILED"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {o.paymentMethod}: {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          o.orderStatus === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.orderStatus === "DISPATCHED"
                            ? "bg-blue-100 text-blue-800"
                            : o.orderStatus === "PROCESSING"
                            ? "bg-purple-100 text-purple-800"
                            : o.orderStatus === "CANCELLED"
                            ? "bg-stone-200 text-stone-600"
                            : "bg-gold/20 text-navy"
                        }`}
                      >
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={getCustomerWhatsAppUrl(o)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-stone-400 hover:text-[#25D366] hover:bg-stone-100 rounded-sm transition-colors"
                          title="WhatsApp Customer"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(o)}
                          className="px-2.5 py-1 bg-navy hover:bg-gold hover:text-navy text-white text-[11px] font-bold rounded-sm transition-colors cursor-pointer"
                        >
                          Manage
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

      {/* Order Detail & Management Modal Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[150] overflow-hidden">
          <div
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">
                    Manage Fulfillment
                  </span>
                  <h3 className="font-extrabold text-navy text-lg">
                    Order #{selectedOrder.orderNumber}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`/order-success/${selectedOrder.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-stone-500 hover:text-navy hover:bg-stone-200 rounded-sm transition-colors"
                    title="View Printable Invoice"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1.5 text-stone-400 hover:text-navy hover:bg-stone-200 rounded-full cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-sm text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Order status and courier info updated successfully!</span>
                  </div>
                )}

                {/* Status & Fulfillment Controls */}
                <div className="bg-stone-50 p-4 rounded-md border border-stone-200 space-y-4">
                  <h4 className="font-bold text-navy text-xs uppercase tracking-wider">
                    Update Order Status
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Order Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-white font-semibold text-navy focus:outline-none focus:border-navy"
                      >
                        <option value="PLACED">Placed</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="DISPATCHED">Dispatched</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Payment Status
                      </label>
                      <select
                        value={editPaymentStatus}
                        onChange={(e) => setEditPaymentStatus(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-white font-semibold text-navy focus:outline-none focus:border-navy"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="VERIFIED">Verified</option>
                        <option value="FAILED">Failed</option>
                      </select>
                    </div>
                  </div>

                  {/* Courier & Tracking */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Courier Partner
                      </label>
                      <input
                        type="text"
                        value={editCourierPartner}
                        onChange={(e) => setEditCourierPartner(e.target.value)}
                        placeholder="e.g. DTDC, Delhivery, Local Hub"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Tracking AWB #
                      </label>
                      <input
                        type="text"
                        value={editTrackingNumber}
                        onChange={(e) => setEditTrackingNumber(e.target.value)}
                        placeholder="e.g. 782190823412"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-navy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Internal Admin Notes
                    </label>
                    <textarea
                      rows={2}
                      value={editAdminNotes}
                      onChange={(e) => setEditAdminNotes(e.target.value)}
                      placeholder="Notes for packing team or delivery records..."
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-navy"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      disabled={isSaving}
                      className="px-4 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSaving ? "Saving..." : "Save Status Changes"}</span>
                    </button>

                    <a
                      href={getCustomerWhatsAppUrl(selectedOrder)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send Customer WhatsApp Update</span>
                    </a>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="border border-stone-200 rounded-md p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-navy uppercase tracking-wider text-[11px] border-b border-stone-100 pb-2">
                    Customer &amp; Shipping Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-stone-400 text-[10px] uppercase font-bold">Name</p>
                      <p className="font-bold text-navy">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-stone-400 text-[10px] uppercase font-bold">Phone</p>
                      <a
                        href={`tel:${selectedOrder.customerPhone}`}
                        className="font-semibold text-navy hover:underline"
                      >
                        {selectedOrder.customerPhone}
                      </a>
                    </div>
                    <div className="col-span-2">
                      <p className="text-stone-400 text-[10px] uppercase font-bold">Shipping Address</p>
                      <p className="text-stone-700">
                        {selectedOrder.shippingAddress.street},{" "}
                        {selectedOrder.shippingAddress.landmark
                          ? `Near ${selectedOrder.shippingAddress.landmark}, `
                          : ""}
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{" "}
                        {selectedOrder.shippingAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ordered Items Table */}
                <div className="border border-stone-200 rounded-md p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-navy uppercase tracking-wider text-[11px] border-b border-stone-100 pb-2">
                    Line Items
                  </h4>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-stone-400 text-[10px] uppercase font-bold border-b border-stone-100">
                        <th className="py-1">Item</th>
                        <th className="py-1 text-center">Qty</th>
                        <th className="py-1 text-right">Price</th>
                        <th className="py-1 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {selectedOrder.items.map((it, idx) => (
                        <tr key={idx} className="py-2">
                          <td className="py-2">
                            <span className="font-bold text-navy block">{it.productName}</span>
                            <span className="text-[10px] text-stone-400">{it.businessName}</span>
                          </td>
                          <td className="py-2 text-center font-bold text-navy">{it.quantity}</td>
                          <td className="py-2 text-right text-stone-600">
                            ₹{it.price.toLocaleString("en-IN")}
                          </td>
                          <td className="py-2 text-right font-bold text-navy">
                            ₹{it.total.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-stone-200">
                      <tr>
                        <td colSpan={3} className="pt-2 text-stone-500">
                          Subtotal
                        </td>
                        <td className="pt-2 text-right font-semibold text-navy">
                          ₹{selectedOrder.subtotal.toLocaleString("en-IN")}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="py-1 text-stone-500">
                          Shipping Fee
                        </td>
                        <td className="py-1 text-right font-semibold">
                          {selectedOrder.shippingFee === 0 ? "FREE" : `₹${selectedOrder.shippingFee}`}
                        </td>
                      </tr>
                      <tr className="font-bold text-sm">
                        <td colSpan={3} className="pt-2 text-navy">
                          Total Amount
                        </td>
                        <td className="pt-2 text-right text-navy font-black">
                          ₹{selectedOrder.totalAmount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Payment Reference details */}
                {selectedOrder.transactionRef && (
                  <div className="bg-stone-50 p-3 rounded-sm border border-stone-200 text-xs">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">
                      Customer Payment Reference / UTR
                    </span>
                    <code className="text-xs font-bold text-navy block mt-0.5">
                      {selectedOrder.transactionRef}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

