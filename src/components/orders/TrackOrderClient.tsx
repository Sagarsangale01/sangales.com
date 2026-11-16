"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Phone,
  MessageCircle,
  Printer,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Box,
} from "lucide-react";
import { OrderRecord } from "@/lib/store";
import { buildAttributedWhatsAppUrl } from "@/lib/utm";

export default function TrackOrderClient() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [copiedAwb, setCopiedAwb] = useState(false);

  // Auto-search if query params exist in URL
  useEffect(() => {
    const urlOrder = searchParams.get("order");
    const urlPhone = searchParams.get("phone");
    if (urlOrder) setOrderNumber(urlOrder);
    if (urlPhone) setPhone(urlPhone);

    if (urlOrder && urlPhone) {
      handleSearch(urlOrder, urlPhone);
    }
  }, [searchParams]);

  const handleSearch = async (numToSearch = orderNumber, phoneToSearch = phone) => {
    setError(null);
    if (!numToSearch.trim()) {
      setError("Please enter your Order Number (e.g. SNG-2026-1002).");
      return;
    }
    if (!phoneToSearch.trim() || phoneToSearch.replace(/[^0-9]/g, "").length < 6) {
      setError("Please enter the registered phone number used during checkout.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: numToSearch.trim(),
          phone: phoneToSearch.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Order not found. Please verify details.");
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || "Failed to find order. Please check your credentials.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAwb = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  // Courier URL generator
  const getCourierTrackingUrl = (courier?: string, awb?: string) => {
    if (!courier && !awb) return null;
    const c = (courier || "").toLowerCase();
    const cleanAwb = (awb || "").trim();

    if (c.includes("delhivery") && cleanAwb) {
      return `https://www.delhivery.com/track/package/${cleanAwb}`;
    }
    if (c.includes("dtdc")) {
      return `https://www.dtdc.in/`;
    }
    if (c.includes("blue dart") || c.includes("bluedart")) {
      return `https://www.bluedart.com/`;
    }
    if (c.includes("post") || c.includes("speed post")) {
      return `https://www.indiapost.gov.in/`;
    }

    return `https://www.google.com/search?q=${encodeURIComponent((courier || "courier") + " tracking " + cleanAwb)}`;
  };

  const getWaHelpUrl = () => {
    if (!order) return "";
    const text =
      `Hello SANGALES Fulfillment Desk, I am tracking my Order #${order.orderNumber}.\n` +
      `Current Status: ${order.orderStatus}.\n` +
      `Customer: ${order.customerName}.\n` +
      `Please provide updated shipment information.`;
    return buildAttributedWhatsAppUrl("917507700936", text, "Order Tracking");
  };

  // Stepper milestones
  const getStepStatus = (step: number) => {
    if (!order) return "upcoming";
    const status = order.orderStatus;
    if (status === "CANCELLED") return "cancelled";

    switch (step) {
      case 1:
        return "completed"; // Placed
      case 2:
        return ["CONFIRMED", "PROCESSING", "DISPATCHED", "DELIVERED"].includes(status)
          ? "completed"
          : "upcoming";
      case 3:
        return ["DISPATCHED", "DELIVERED"].includes(status)
          ? "completed"
          : status === "PROCESSING"
          ? "active"
          : "upcoming";
      case 4:
        return status === "DELIVERED" ? "completed" : "upcoming";
      default:
        return "upcoming";
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-20">
      {/* Hero Header */}
      <section className="bg-navy text-white py-12 sm:py-16 relative overflow-hidden border-b-4 border-gold">
        <div className="absolute inset-0 bg-[radial-gradient(#C6A66B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-gold text-xs font-bold tracking-wider uppercase mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>SANGALES Central Dispatch Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Track Your Order &amp; Consignment
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Enter your order number and registered phone number to check live packaging, courier tracking AWB, and download your official single-page tax invoice.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Search Card */}
        <div className="bg-white rounded-md shadow-lg border border-stone-200 p-6 sm:p-8 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Order Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. SNG-2026-1002"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm font-semibold text-navy uppercase tracking-wider focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98220 54321"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm text-navy focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-sm text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Verified customer records via registered phone number
              </span>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Locating Consignment...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5 text-gold" />
                    <span>Track Order Status</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {order && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            {/* Order Status Banner */}
            <div className="bg-white rounded-md border border-stone-200 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-700 bg-gold/10 px-2 py-0.5 rounded-xs inline-block mb-1">
                    Shipment Details
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-navy">
                    Order #{order.orderNumber}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs flex items-center gap-1.5 ${
                      order.orderStatus === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : order.orderStatus === "DISPATCHED"
                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                        : order.orderStatus === "PROCESSING"
                        ? "bg-purple-100 text-purple-800 border border-purple-300"
                        : order.orderStatus === "CANCELLED"
                        ? "bg-stone-200 text-stone-700"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    Status: {order.orderStatus}
                  </span>

                  <Link
                    href={`/order-success/${order.id}`}
                    target="_blank"
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-navy font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600" />
                    <span>Invoice PDF</span>
                  </Link>
                </div>
              </div>

              {/* Visual 4-Step Stepper */}
              <div className="py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {/* Step 1: Placed */}
                  <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">1. Order Placed</p>
                      <p className="text-[11px] text-stone-500">Recorded in Queue</p>
                    </div>
                  </div>

                  {/* Step 2: Confirmed */}
                  <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                    <div
                      className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 shadow-sm ${
                        getStepStatus(2) === "completed"
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-200 text-stone-500"
                      }`}
                    >
                      {getStepStatus(2) === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>2</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">2. Confirmed</p>
                      <p className="text-[11px] text-stone-500">Verified &amp; Packed</p>
                    </div>
                  </div>

                  {/* Step 3: Dispatched */}
                  <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                    <div
                      className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 shadow-sm ${
                        getStepStatus(3) === "completed"
                          ? "bg-emerald-600 text-white"
                          : getStepStatus(3) === "active"
                          ? "bg-amber-500 text-white ring-4 ring-amber-100"
                          : "bg-stone-200 text-stone-500"
                      }`}
                    >
                      {getStepStatus(3) === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Truck className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">3. Dispatched</p>
                      <p className="text-[11px] text-stone-500">With Courier Partner</p>
                    </div>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                    <div
                      className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 shadow-sm ${
                        getStepStatus(4) === "completed"
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-200 text-stone-500"
                      }`}
                    >
                      {getStepStatus(4) === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>4</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">4. Delivered</p>
                      <p className="text-[11px] text-stone-500">Completed Delivery</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courier Partner & Live Tracking Box */}
              {order.courierPartner && (
                <div className="mt-6 bg-stone-50 p-4 sm:p-5 rounded-md border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Courier Logistics
                    </span>
                    <p className="text-sm font-bold text-navy">
                      Partner: <strong className="text-gold-700">{order.courierPartner}</strong>
                    </p>
                    {order.trackingNumber && (
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-xs text-stone-600 font-mono">
                          AWB: <strong>{order.trackingNumber}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyAwb(order.trackingNumber!)}
                          className="text-[11px] font-bold text-stone-500 hover:text-navy flex items-center gap-1 cursor-pointer"
                        >
                          {copiedAwb ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {order.trackingNumber && (
                    <a
                      href={getCourierTrackingUrl(order.courierPartner, order.trackingNumber) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold rounded-sm transition-colors flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
                    >
                      <span>Track with {order.courierPartner}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Delivery Destination & Ordered Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Destination Card */}
              <div className="md:col-span-1 bg-white p-5 rounded-md border border-stone-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-700" />
                  <span>Delivery Address</span>
                </h3>
                <div className="text-xs space-y-1 text-stone-700">
                  <p className="font-bold text-navy">{order.customerName}</p>
                  <p>{order.shippingAddress.street}</p>
                  {order.shippingAddress.landmark && (
                    <p className="text-stone-500">Landmark: {order.shippingAddress.landmark}</p>
                  )}
                  <p className="font-semibold text-navy">
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.pincode}
                  </p>
                  <p className="text-stone-500 pt-1">Phone: {order.customerPhone}</p>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">
                    Payment Method
                  </span>
                  <p className="text-xs font-bold text-navy">
                    {order.paymentMethod} •{" "}
                    <span
                      className={
                        order.paymentStatus === "PAID" ? "text-emerald-700" : "text-amber-700"
                      }
                    >
                      {order.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>

              {/* Items Card */}
              <div className="md:col-span-2 bg-white p-5 rounded-md border border-stone-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-2">
                  <Box className="w-3.5 h-3.5 text-gold-700" />
                  <span>Package Contents ({order.items.length} items)</span>
                </h3>

                <div className="divide-y divide-stone-100">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <p className="font-bold text-navy leading-tight">{it.productName}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {it.businessName} • Qty: {it.quantity}
                          {it.unit ? ` (${it.unit})` : ""}
                        </p>
                      </div>
                      <span className="font-bold text-navy shrink-0">
                        ₹{it.total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-xs">
                  <span className="text-stone-500">Total Order Value:</span>
                  <span className="text-base font-black text-navy">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Support Hotline & Reset */}
            <div className="bg-white p-5 rounded-md border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navy">Need Urgent Delivery Help?</h4>
                  <p className="text-[11px] text-stone-500">
                    Connect directly with our central dispatch team on WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOrder(null);
                    setOrderNumber("");
                    setPhone("");
                  }}
                  className="px-3.5 py-2 text-xs font-bold text-stone-600 hover:text-navy border border-stone-300 rounded-sm cursor-pointer"
                >
                  Track Another
                </button>
                <a
                  href={getWaHelpUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Dispatch</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

