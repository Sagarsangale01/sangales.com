"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { OrderRecord } from "@/lib/store";
import { buildAttributedWhatsAppUrl } from "@/lib/utm";

interface Props {
  order: OrderRecord;
}

export default function OrderSuccessClient({ order }: Props) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const getWaSupportUrl = () => {
    const text =
      `Hello SANGALES Desk, I am following up on my Order #${order.orderNumber}.\n` +
      `Customer: ${order.customerName}\n` +
      `Total: ₹${order.totalAmount.toLocaleString("en-IN")}\n` +
      `Please provide estimated dispatch timing.`;
    return buildAttributedWhatsAppUrl("917507700936", text, "Order Support");
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-20 print:bg-white print:pt-0 print:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner (hidden on print) */}
        <div className="bg-emerald-700 text-white rounded-md p-6 sm:p-8 mb-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8 text-emerald-200" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">
                Order Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-0.5">
                Thank You, {order.customerName}!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                Your order <strong className="text-white">#{order.orderNumber}</strong> has been received by our central fulfillment hub in Nashik.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white text-navy hover:bg-stone-100 font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <a
              href={getWaSupportUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Printable Official Invoice Card */}
        <div className="bg-white rounded-md border border-stone-200 shadow-sm p-6 sm:p-10 print:border-none print:shadow-none print:p-0">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-stone-200 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src="/logos/sangales-logo.png"
                  alt="SANGALES GROUP"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <h2 className="text-sm font-bold text-navy uppercase tracking-wider">
                SANGALES – A GROUP OF COMPANIES
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Central Operations: College Road, Nashik, Maharashtra 422005
              </p>
              <p className="text-xs text-stone-500">
                Hotline: +91 75077 00936 | Email: contact.sangales@gmail.com
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-1">
                Tax Invoice / Receipt
              </span>
              <p className="text-xl font-black text-navy">{order.orderNumber}</p>
              <p className="text-xs text-stone-500 mt-1 flex items-center gap-1 sm:justify-end">
                <Clock className="w-3 h-3 text-stone-400" />
                {formattedDate}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 rounded-xs text-[11px] font-bold text-navy">
                <span>Payment: {order.paymentMethod}</span>
                <span>•</span>
                <span className="text-emerald-700">{order.paymentStatus}</span>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 p-4 rounded-sm border border-stone-200 mb-6 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Billed &amp; Delivered To:
              </span>
              <p className="font-bold text-navy text-sm">{order.customerName}</p>
              <p className="text-stone-600 mt-1 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-stone-400" />
                {order.customerPhone}
              </p>
              {order.customerEmail && (
                <p className="text-stone-600 mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-stone-400" />
                  {order.customerEmail}
                </p>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Shipping Destination:
              </span>
              <p className="text-stone-700 leading-relaxed">
                {order.shippingAddress.street}
                {order.shippingAddress.landmark && (
                  <span className="block text-stone-500">
                    Landmark: {order.shippingAddress.landmark}
                  </span>
                )}
                <span className="block font-semibold text-navy">
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </span>
              </p>
              {order.customerNotes && (
                <p className="mt-2 text-[11px] text-stone-500 italic">
                  Note: &ldquo;{order.customerNotes}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300 bg-stone-100 text-stone-700 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">Brand / Supplier</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50">
                    <td className="py-3 px-3">
                      <span className="font-bold text-navy block">{item.productName}</span>
                      {item.unit && (
                        <span className="text-[11px] text-stone-500">{item.unit}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-stone-600 font-medium">
                      {item.businessName}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-navy">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right text-stone-600">
                      ₹{item.price.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-navy">
                      ₹{item.total.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stone-200">
                  <td colSpan={3} className="py-2 px-3 text-stone-500">
                    Subtotal
                  </td>
                  <td colSpan={2} className="py-2 px-3 text-right font-semibold text-navy">
                    ₹{order.subtotal.toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-1 px-3 text-stone-500">
                    Delivery / Shipping Fee
                  </td>
                  <td colSpan={2} className="py-1 px-3 text-right font-semibold">
                    {order.shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${order.shippingFee}`
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-1 px-3 text-stone-500">
                    GST / Taxes
                  </td>
                  <td colSpan={2} className="py-1 px-3 text-right text-stone-500 italic">
                    Included in Price
                  </td>
                </tr>
                <tr className="border-t-2 border-navy text-sm">
                  <td colSpan={3} className="py-3 px-3 font-extrabold text-navy">
                    Grand Total
                  </td>
                  <td colSpan={2} className="py-3 px-3 text-right font-black text-navy text-base">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Fulfillment Status Progress */}
          <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 mb-6 print:hidden">
            <span className="text-xs font-bold text-navy uppercase tracking-wider block mb-3">
              Fulfillment Status: {order.orderStatus}
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xs bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                1. Placed ✓
              </div>
              <div
                className={`p-2 rounded-xs font-bold ${
                  ["CONFIRMED", "PROCESSING", "DISPATCHED", "DELIVERED"].includes(order.orderStatus)
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                2. Confirmed
              </div>
              <div
                className={`p-2 rounded-xs font-bold ${
                  ["DISPATCHED", "DELIVERED"].includes(order.orderStatus)
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                3. Dispatched
              </div>
              <div
                className={`p-2 rounded-xs font-bold ${
                  order.orderStatus === "DELIVERED"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                4. Delivered
              </div>
            </div>
            {order.courierPartner && (
              <p className="text-xs text-stone-600 mt-3">
                Courier Partner: <strong>{order.courierPartner}</strong>
                {order.trackingNumber && ` (Tracking AWB: ${order.trackingNumber})`}
              </p>
            )}
          </div>

          {/* Terms & Footer Note */}
          <div className="border-t border-stone-200 pt-4 text-[10px] text-stone-500 space-y-1">
            <p>
              • This is a computer-generated tax invoice issued by SANGALES – A GROUP OF COMPANIES. No physical signature is required.
            </p>
            <p>
              • For returns, queries, or wholesale commercial contracts, quote your order number <strong>#{order.orderNumber}</strong> to our desk via WhatsApp at +91 75077 00936.
            </p>
          </div>
        </div>

        {/* Bottom Actions (hidden on print) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-gold transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping at SANGALES Store</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-navy hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

