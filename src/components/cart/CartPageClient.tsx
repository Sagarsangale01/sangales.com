"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildAttributedWhatsAppUrl } from "@/lib/utm";

export default function CartPageClient() {
  const {
    items,
    itemCount,
    subtotal,
    shippingFee,
    totalAmount,
    freeShippingThreshold,
    amountUntilFreeShipping,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const getWhatsAppCartUrl = () => {
    const itemsList = items.map((i) => `• ${i.productName} x${i.quantity} (₹${i.total})`).join("\n");
    const text =
      `Hello SANGALES GROUP Desk, I would like to place an order from your online store:\n\n` +
      `${itemsList}\n\n` +
      `Subtotal: ₹${subtotal.toLocaleString("en-IN")}\n` +
      `Delivery: ${shippingFee === 0 ? "FREE" : "₹" + shippingFee}\n` +
      `Total: ₹${totalAmount.toLocaleString("en-IN")}\n\n` +
      `Please confirm stock availability and dispatch time.`;
    return buildAttributedWhatsAppUrl("917507700936", text, "Shopping Cart");
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-navy transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-stone-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
            </h1>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-red-600 transition-colors cursor-pointer self-start sm:self-auto font-medium"
              >
                Clear Entire Cart
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-md border border-stone-200 p-12 sm:p-16 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">Your cart is empty</h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
              Explore pure Vedic A2 Bilona Ghee, fresh breakfast salads, agricultural produce, packaging boxes, and industrial electrical supplies.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-gold hover:text-navy text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Cart Table */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Alert */}
              <div className="bg-gold/10 border border-gold/30 rounded-md p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-1.5 font-bold text-navy">
                    <Truck className="w-4 h-4 text-gold-700" />
                    {amountUntilFreeShipping === 0 ? (
                      <span className="text-emerald-700 font-bold">You qualify for FREE Delivery across Maharashtra! 🎉</span>
                    ) : (
                      <span>
                        Add <strong className="text-navy">₹{amountUntilFreeShipping}</strong> more to get{" "}
                        <strong className="text-gold-700">FREE Express Delivery</strong>
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-bold text-stone-500">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-md border border-stone-200 divide-y divide-stone-100 shadow-xs overflow-hidden">
                {items.map((item) => (
                  <div key={item.productId} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-sm bg-stone-100 border border-stone-200 shrink-0 overflow-hidden relative">
                      <img
                        src={item.image || "/images/placeholder.jpg"}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold/10 px-2 py-0.5 rounded-xs inline-block mb-1">
                        {item.businessName}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-navy leading-snug">
                        {item.productName}
                      </h3>
                      {item.unit && (
                        <p className="text-xs text-stone-500 mt-0.5">{item.unit}</p>
                      )}
                      <p className="text-xs font-bold text-stone-700 mt-1 sm:hidden">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </p>
                    </div>

                    {/* Unit Price (desktop) */}
                    <div className="hidden sm:block text-right shrink-0">
                      <p className="text-xs text-stone-400">Unit Price</p>
                      <p className="text-sm font-semibold text-navy">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between sm:justify-start gap-4 shrink-0">
                      <div className="flex items-center border border-stone-300 rounded-sm bg-stone-50 h-9">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2.5 h-full text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-navy">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2.5 h-full text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right min-w-[70px]">
                        <p className="text-sm sm:text-base font-bold text-navy">
                          ₹{item.total.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white border border-stone-200 p-3 rounded-md flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-navy">Corporate Authenticity</h4>
                    <p className="text-[11px] text-stone-500">Direct dispatched from factory hub</p>
                  </div>
                </div>
                <div className="bg-white border border-stone-200 p-3 rounded-md flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gold-700 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-navy">Fast Delivery</h4>
                    <p className="text-[11px] text-stone-500">Tracked courier partners</p>
                  </div>
                </div>
                <div className="bg-white border border-stone-200 p-3 rounded-md flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-navy shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-navy">Zero Payment Risk</h4>
                    <p className="text-[11px] text-stone-500">COD &amp; UPI QR verification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md border border-stone-200 p-6 shadow-sm sticky top-28 space-y-5">
                <h2 className="text-base font-bold text-navy border-b border-stone-100 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span className="flex items-center gap-1">
                      Delivery Fee
                      {subtotal < freeShippingThreshold && (
                        <span className="text-[10px] text-stone-400">(Orders &lt; ₹999)</span>
                      )}
                    </span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase tracking-wider">FREE</span>
                      ) : (
                        <span className="font-semibold text-navy">₹{shippingFee}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Estimated Tax (GST)</span>
                    <span className="text-stone-500 italic">Inclusive</span>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                    <div>
                      <span className="text-base font-bold text-navy">Grand Total</span>
                      <span className="text-[10px] text-stone-400 block">All taxes included</span>
                    </div>
                    <span className="text-xl font-black text-navy">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Primary Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-navy hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
                </Link>

                {/* 1-Click WhatsApp Order */}
                <a
                  href={getWhatsAppCartUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp Desk</span>
                </a>

                {/* Helpline Notice */}
                <div className="pt-2 text-center border-t border-stone-100">
                  <p className="text-[11px] text-stone-500">
                    Need custom institutional quantities or GST billing?
                  </p>
                  <a
                    href="tel:+917507700936"
                    className="text-xs font-bold text-navy hover:text-gold transition-colors inline-block mt-0.5"
                  >
                    Call Sales Desk: +91 75077 00936
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

