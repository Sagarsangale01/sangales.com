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
  Receipt,
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
    <div className="min-h-screen bg-stone-50 pt-24 sm:pt-28 pb-16 print:bg-white print:pt-0 print:pb-0 print:min-h-0">
      {/* Explicit Print Optimization Styles for 1-Page PDF */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              size: A4 portrait;
              margin: 8mm 10mm;
            }
            body, html {
              background: #ffffff !important;
              color: #0f172a !important;
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            header, footer, nav, aside, #chatbot-container, #mobile-quickbar, .print-hidden {
              display: none !important;
              visibility: hidden !important;
              height: 0 !important;
            }
            .invoice-single-page {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              page-break-after: avoid !important;
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 12px 14px !important;
              border: 1px solid #cbd5e1 !important;
              box-shadow: none !important;
              border-radius: 4px !important;
            }
          }
        `,
      }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:mx-0">
        {/* Success Banner (Hidden on Print) */}
        <div className="bg-emerald-700 text-white rounded-md p-6 sm:p-7 mb-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5 print:hidden">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7 text-emerald-200" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-emerald-200">
                Order Confirmed
              </span>
              <h1 className="text-xl sm:text-2xl font-black mt-0.5">
                Thank You, {order.customerName}!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                Your order <strong className="text-white">#{order.orderNumber}</strong> has been received by our central fulfillment hub in Nashik.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white text-navy hover:bg-stone-100 font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-navy" />
              <span>Print Single-Page Invoice</span>
            </button>
            <a
              href={getWaSupportUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>

        {/* Printable Official Tax Invoice (Designed for Crisp 1-Page PDF) */}
        <div className="invoice-single-page bg-white rounded-md border border-stone-200 shadow-sm p-6 sm:p-8 text-charcoal">
          {/* 1. Corporate Header */}
          <div className="flex flex-row justify-between items-start gap-4 border-b-2 border-stone-200 pb-4 mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <img
                  src="/logos/sangales-logo.png"
                  alt="SANGALES GROUP"
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </div>
              <p className="text-[11px] font-extrabold text-navy uppercase tracking-wider">
                SANGALES – A GROUP OF COMPANIES
              </p>
              <p className="text-[10px] text-stone-600 leading-tight">
                College Road, Nashik, Maharashtra 422005 • Helpline: +91 75077 00936
              </p>
              <p className="text-[10px] text-stone-500 leading-tight">
                Email: contact.sangales@gmail.com • Web: www.sangales.com
              </p>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 bg-gold/15 text-navy font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs mb-1">
                <Receipt className="w-3 h-3 text-gold-700" />
                <span>Tax Invoice / Receipt</span>
              </div>
              <p className="text-lg sm:text-xl font-black text-navy">{order.orderNumber}</p>
              <p className="text-[10px] text-stone-500 mt-0.5 flex items-center gap-1 justify-end">
                <Clock className="w-2.5 h-2.5 text-stone-400" />
                <span>{formattedDate}</span>
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-stone-100 rounded-xs text-[10px] font-bold text-navy border border-stone-200">
                <span>Payment: {order.paymentMethod}</span>
                <span>•</span>
                <span className={order.paymentStatus === "PAID" ? "text-emerald-700" : "text-amber-700"}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Customer & Shipping Info Grid */}
          <div className="grid grid-cols-2 gap-4 bg-stone-50/90 p-3 rounded-sm border border-stone-200 text-xs mb-4">
            <div className="border-r border-stone-200 pr-3">
              <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
                Billed &amp; Delivered To:
              </span>
              <p className="font-extrabold text-navy text-xs sm:text-sm">{order.customerName}</p>
              <p className="text-stone-700 text-[11px] mt-0.5 flex items-center gap-1">
                <Phone className="w-2.5 h-2.5 text-stone-400" />
                <span>{order.customerPhone}</span>
              </p>
              {order.customerEmail && (
                <p className="text-stone-600 text-[10px] flex items-center gap-1 mt-0.5">
                  <Mail className="w-2.5 h-2.5 text-stone-400" />
                  <span>{order.customerEmail}</span>
                </p>
              )}
            </div>

            <div className="pl-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
                Shipping Destination:
              </span>
              <p className="text-stone-700 text-[11px] leading-tight">
                {order.shippingAddress.street}
                {order.shippingAddress.landmark && (
                  <span className="block text-stone-500 text-[10px]">
                    Landmark: {order.shippingAddress.landmark}
                  </span>
                )}
                <span className="block font-bold text-navy mt-0.5">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </span>
              </p>
            </div>
          </div>

          {/* 3. Itemized Products Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-2 px-2.5 text-center w-8">#</th>
                  <th className="py-2 px-2.5">Item Description</th>
                  <th className="py-2 px-2.5">Brand / Entity</th>
                  <th className="py-2 px-2.5 text-center w-12">Qty</th>
                  <th className="py-2 px-2.5 text-right w-20">Unit Rate</th>
                  <th className="py-2 px-2.5 text-right w-24">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50">
                    <td className="py-2 px-2.5 text-center text-stone-500 text-[11px]">{idx + 1}</td>
                    <td className="py-2 px-2.5">
                      <span className="font-bold text-navy block text-[11px]">{item.productName}</span>
                      {item.unit && (
                        <span className="text-[10px] text-stone-500">{item.unit}</span>
                      )}
                    </td>
                    <td className="py-2 px-2.5 text-stone-600 text-[11px] font-medium">
                      {item.businessName}
                    </td>
                    <td className="py-2 px-2.5 text-center font-bold text-navy text-[11px]">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-2.5 text-right text-stone-600 text-[11px]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2 px-2.5 text-right font-bold text-navy text-[11px]">
                      ₹{item.total.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Totals and Notes Box */}
          <div className="grid grid-cols-2 gap-4 border-t-2 border-stone-200 pt-3 mb-4">
            <div className="text-[10px] text-stone-500 space-y-1">
              <p className="font-bold text-navy uppercase tracking-wider text-[9px]">
                Order Notes &amp; Fulfillment
              </p>
              <p>
                {order.customerNotes
                  ? `Special Instructions: "${order.customerNotes}"`
                  : "Standard Dispatch • Dispatched from central Nashik Hub."}
              </p>
              {order.transactionRef && (
                <p className="font-mono text-stone-700">
                  Payment Ref / UTR: {order.transactionRef}
                </p>
              )}
            </div>

            <div className="space-y-1.5 text-xs text-right">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-bold text-navy">₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery / Shipping:</span>
                <span>
                  {order.shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    <span className="font-bold text-navy">₹{order.shippingFee}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Taxes &amp; GST:</span>
                <span className="text-stone-500 italic">Inclusive</span>
              </div>
              <div className="flex justify-between items-baseline pt-1.5 border-t border-stone-300">
                <span className="font-extrabold text-navy text-sm">Grand Total:</span>
                <span className="font-black text-navy text-base sm:text-lg">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* 5. Statutory Footnote */}
          <div className="border-t border-stone-200 pt-2.5 text-[9px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-1 leading-tight">
            <p>
              • Computer-generated tax invoice issued by SANGALES – A GROUP OF COMPANIES. No signature required.
            </p>
            <p className="font-medium text-stone-600">
              Helpline: +91 75077 00936 • contact.sangales@gmail.com
            </p>
          </div>
        </div>

        {/* Fulfillment Status Progress (Hidden on Print) */}
        <div className="bg-white rounded-md border border-stone-200 p-5 mt-6 shadow-xs print:hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-navy uppercase tracking-wider">
              Live Fulfillment Status
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
              Status: {order.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 rounded-xs bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              1. Placed ✓
            </div>
            <div
              className={`p-2 rounded-xs font-bold ${
                ["CONFIRMED", "PROCESSING", "DISPATCHED", "DELIVERED"].includes(order.orderStatus)
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-stone-100 text-stone-400"
              }`}
            >
              2. Confirmed
            </div>
            <div
              className={`p-2 rounded-xs font-bold ${
                ["DISPATCHED", "DELIVERED"].includes(order.orderStatus)
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-stone-100 text-stone-400"
              }`}
            >
              3. Dispatched
            </div>
            <div
              className={`p-2 rounded-xs font-bold ${
                order.orderStatus === "DELIVERED"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-stone-100 text-stone-400"
              }`}
            >
              4. Delivered
            </div>
          </div>

          {order.courierPartner && (
            <p className="text-xs text-stone-600 mt-3 pt-3 border-t border-stone-100">
              Courier Partner: <strong className="text-navy">{order.courierPartner}</strong>
              {order.trackingNumber && ` (Tracking AWB: ${order.trackingNumber})`}
            </p>
          )}
        </div>

        {/* Bottom Actions (Hidden on Print) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-gold transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-gold-700" />
            <span>Continue Shopping at SANGALES Store</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/track-order?order=${encodeURIComponent(order.orderNumber)}&phone=${encodeURIComponent(order.customerPhone)}`}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-navy font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-xs flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-gold-700" />
              <span>Track Shipment Live</span>
            </Link>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
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
