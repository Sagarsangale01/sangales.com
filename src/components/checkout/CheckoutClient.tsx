"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Banknote,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Lock,
  Copy,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getStoredUTM, buildAttributedWhatsAppUrl } from "@/lib/utm";

export default function CheckoutClient() {
  const router = useRouter();
  const { items, itemCount, subtotal, shippingFee, totalAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    street: "",
    landmark: "",
    city: "Nashik",
    state: "Maharashtra",
    pincode: "422005",
    customerNotes: "",
    paymentMethod: "COD" as "COD" | "UPI_QR" | "WHATSAPP_CONFIRM",
    transactionRef: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const corporateUpiId = "7507700936@okbizaxis";

  // Dynamic UPI URL for QR code generation
  const upiPayUrl = `upi://pay?pa=${corporateUpiId}&pn=Sangales%20Group&am=${totalAmount}&cu=INR&tn=Sangales%20Order`;
  const upiQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    upiPayUrl
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(corporateUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Your cart is empty. Please add products before checking out.");
      return;
    }

    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.customerPhone.trim() || formData.customerPhone.trim().length < 8) {
      setError("Please provide a valid 10-digit mobile number for delivery coordination.");
      return;
    }

    if (!formData.street.trim() || formData.street.trim().length < 5) {
      setError("Please provide a complete street / building address.");
      return;
    }

    if (!formData.city.trim() || !formData.pincode.trim()) {
      setError("City and pincode are required for dispatch.");
      return;
    }

    if (formData.paymentMethod === "UPI_QR" && !formData.transactionRef.trim()) {
      setError("Please enter your UPI UTR / Transaction Reference Number to verify your payment.");
      return;
    }

    setLoading(true);

    try {
      const utm = getStoredUTM();

      const payload = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail || undefined,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          landmark: formData.landmark || undefined,
        },
        items: items.map((it) => ({
          productId: it.productId,
          productName: it.productName,
          businessId: it.businessId,
          businessName: it.businessName,
          image: it.image,
          price: it.price,
          quantity: it.quantity,
          unit: it.unit,
        })),
        paymentMethod: formData.paymentMethod,
        transactionRef: formData.transactionRef || undefined,
        customerNotes: formData.customerNotes || undefined,
        utmSource: utm?.utm_source,
        utmCampaign: utm?.utm_campaign,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not complete order. Please retry.");
      }

      // If user chose WhatsApp Order, open WhatsApp in new tab
      if (formData.paymentMethod === "WHATSAPP_CONFIRM") {
        const itemsList = items
          .map((i) => `• ${i.productName} x${i.quantity} (₹${i.total})`)
          .join("\n");
        const waText =
          `🛒 *NEW ONLINE ORDER #${data.order.orderNumber}*\n` +
          `━━━━━━━━━━━━━━━━━━━━━━\n` +
          `👤 *Customer:* ${formData.customerName}\n` +
          `📞 *Phone:* ${formData.customerPhone}\n` +
          `📍 *Address:* ${formData.street}, ${formData.city} - ${formData.pincode}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━\n` +
          `🛍️ *Ordered Items:*\n${itemsList}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━\n` +
          `💰 *Total Amount:* ₹${totalAmount.toLocaleString("en-IN")}\n` +
          `Payment: WhatsApp Desk Order Confirmation`;

        const waUrl = buildAttributedWhatsAppUrl("917507700936", waText, "Checkout Desk");
        window.open(waUrl, "_blank");
      }

      // Clear the cart
      clearCart();

      // Navigate to order success receipt page
      router.push(`/order-success/${data.order.id}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please contact our hotline.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 pb-20">
        <div className="max-w-md mx-auto px-4 text-center bg-white border border-stone-200 rounded-md p-10 shadow-sm">
          <h2 className="text-xl font-bold text-navy mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-stone-500 mb-6">
            Please add items from the shop before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-navy text-white text-xs font-bold rounded-sm uppercase tracking-wider hover:bg-gold hover:text-navy transition-colors inline-block"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-navy transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Cart</span>
          </Link>
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
                1-Page Fast Checkout
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Direct dispatch from SANGALES headquarters • COD &amp; Instant UPI available
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-sm border border-emerald-200">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3 text-red-800 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <p className="font-bold">Please check your details:</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Customer & Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Contact Information */}
            <div className="bg-white rounded-md border border-stone-200 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-navy text-gold text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-bold text-navy text-base">Contact &amp; Delivery Person</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Ramesh Patil / Rahul Sharma"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+91 98220 12345"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Used for courier delivery updates &amp; dispatch OTP
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    Email Address <span className="text-stone-400 font-normal">(Optional for Invoice)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Official tax invoice will be emailed here
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-md border border-stone-200 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-navy text-gold text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-bold text-navy text-base">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    Flat / House No., Building, Street Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="e.g. Flat 302, Shanti Heights, College Road"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    Nearby Landmark <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    placeholder="e.g. Opposite BYK College / Near Big Bazaar"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    Special Delivery Instructions <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customerNotes}
                    onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
                    placeholder="e.g. Call before delivery, ring bell twice"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Mode */}
            <div className="bg-white rounded-md border border-stone-200 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-navy text-gold text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-bold text-navy text-base">Select Payment Mode</h2>
              </div>

              <div className="space-y-3">
                {/* Mode 1: Cash on Delivery */}
                <label
                  className={`p-4 border rounded-md flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === "COD"
                      ? "border-navy bg-navy/5 shadow-xs ring-1 ring-navy"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                    className="mt-1 text-navy focus:ring-navy"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs sm:text-sm font-bold text-navy">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-xs">
                        Zero Advance Needed
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      Pay safely in cash or via UPI to the delivery executive upon arrival at your doorstep.
                    </p>
                  </div>
                </label>

                {/* Mode 2: UPI QR Code */}
                <label
                  className={`p-4 border rounded-md flex flex-col gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === "UPI_QR"
                      ? "border-navy bg-navy/5 shadow-xs ring-1 ring-navy"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI_QR"
                      checked={formData.paymentMethod === "UPI_QR"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "UPI_QR" })}
                      className="mt-1 text-navy focus:ring-navy"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-navy" />
                        <span className="text-xs sm:text-sm font-bold text-navy">
                          Direct UPI Scan &amp; Pay (GPay, PhonePe, Paytm, BHIM)
                        </span>
                        <span className="text-[10px] bg-gold/20 text-navy font-bold px-1.5 py-0.2 rounded-xs">
                          Instant 0% Fee
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Scan the official SANGALES Group QR code directly from any UPI app on your phone.
                      </p>
                    </div>
                  </div>

                  {/* QR Box & UTR Field when selected */}
                  {formData.paymentMethod === "UPI_QR" && (
                    <div className="mt-3 pt-4 border-t border-navy/15 bg-white p-4 rounded-sm flex flex-col sm:flex-row items-center gap-5">
                      <div className="bg-white p-2 border-2 border-navy rounded-sm shadow-xs shrink-0 text-center">
                        <img
                          src={upiQrImageUrl}
                          alt="SANGALES Official UPI QR Code"
                          className="w-36 h-36 mx-auto object-contain"
                        />
                        <span className="text-[10px] font-bold text-navy block mt-1">
                          Amount: ₹{totalAmount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex-1 text-xs space-y-2.5">
                        <div className="bg-stone-50 p-2.5 rounded-sm border border-stone-200">
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">
                            Corporate UPI ID
                          </span>
                          <div className="flex items-center justify-between mt-0.5">
                            <code className="text-xs font-bold text-navy">{corporateUpiId}</code>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="text-[11px] font-bold text-gold-700 hover:text-navy flex items-center gap-1 cursor-pointer"
                            >
                              {copiedUpi ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
                            Enter UPI UTR / Transaction Reference ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required={formData.paymentMethod === "UPI_QR"}
                            value={formData.transactionRef}
                            onChange={(e) =>
                              setFormData({ ...formData, transactionRef: e.target.value })
                            }
                            placeholder="e.g. 432190823412 or Bank Ref ID"
                            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:border-navy"
                          />
                          <span className="text-[10px] text-stone-500 mt-0.5 block">
                            Shown in your GPay / PhonePe / Paytm receipt after payment
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* Mode 3: WhatsApp Desk Confirmation */}
                <label
                  className={`p-4 border rounded-md flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === "WHATSAPP_CONFIRM"
                      ? "border-navy bg-navy/5 shadow-xs ring-1 ring-navy"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="WHATSAPP_CONFIRM"
                    checked={formData.paymentMethod === "WHATSAPP_CONFIRM"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "WHATSAPP_CONFIRM" })}
                    className="mt-1 text-navy focus:ring-navy"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs sm:text-sm font-bold text-navy">
                        Confirm via Corporate WhatsApp Desk
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      Our commercial operations desk will receive your item list on WhatsApp and arrange custom corporate invoicing or NEFT/RTGS bank details.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Col: Order Summary & Place Order Button */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-md border border-stone-200 p-5 shadow-sm sticky top-28 space-y-4">
              <h3 className="font-bold text-navy text-sm sm:text-base border-b border-stone-100 pb-3">
                Order Review ({itemCount} {itemCount === 1 ? "item" : "items"})
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1 text-xs">
                {items.map((it) => (
                  <div key={it.productId} className="py-2.5 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-navy leading-tight line-clamp-1">
                        {it.productName}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Qty: {it.quantity} × ₹{it.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <span className="font-bold text-navy shrink-0">
                      ₹{it.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">FREE</span>
                    ) : (
                      <span className="font-semibold text-navy">₹{shippingFee}</span>
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-navy">Total to Pay</span>
                    <span className="text-[10px] text-stone-400 block">All taxes included</span>
                  </div>
                  <span className="text-xl font-black text-navy">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-navy hover:bg-gold hover:text-navy text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Place Order Now</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </>
                )}
              </button>

              <div className="pt-2 space-y-2 text-[10px] text-stone-500 text-center">
                <p className="flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Genuine Direct Supply Guarantee
                </p>
                <p>By placing order, you agree to our Terms &amp; Standard Dispatch Policy.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

