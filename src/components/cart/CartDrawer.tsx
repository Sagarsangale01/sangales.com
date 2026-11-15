"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, MessageCircle, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildAttributedWhatsAppUrl } from "@/lib/utm";

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    shippingFee,
    totalAmount,
    freeShippingThreshold,
    amountUntilFreeShipping,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
  } = useCart();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // WhatsApp Order message
  const getWhatsAppCartUrl = () => {
    const itemsList = items.map((i) => `• ${i.productName} x${i.quantity} (₹${i.total})`).join("\n");
    const text =
      `Hello SANGALES GROUP Desk, I would like to place an order from your online store:\n\n` +
      `${itemsList}\n\n` +
      `Subtotal: ₹${subtotal.toLocaleString("en-IN")}\n` +
      `Delivery: ${shippingFee === 0 ? "FREE" : "₹" + shippingFee}\n` +
      `Total: ₹${totalAmount.toLocaleString("en-IN")}\n\n` +
      `Please confirm stock availability and dispatch time.`;
    return buildAttributedWhatsAppUrl("917507700936", text, "Online Shop");
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-navy text-gold flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-navy text-base leading-tight">Your Cart</h3>
                <p className="text-xs text-stone-500 font-medium">
                  {itemCount} {itemCount === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-stone-400 hover:text-navy hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-gold/10 border-b border-gold/25 px-5 py-2.5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 font-bold text-navy">
                  <Truck className="w-3.5 h-3.5 text-gold-600" />
                  {amountUntilFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-bold">You unlocked FREE Delivery! 🎉</span>
                  ) : (
                    <span>
                      Add <strong className="text-navy">₹{amountUntilFreeShipping}</strong> more for{" "}
                      <strong className="text-gold-700">FREE Delivery</strong>
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-stone-500">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-navy mb-1">Your cart is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explore fresh organic foods, Vedic A2 Ghee, packaging materials, and agricultural staples.
                </p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="px-5 py-2.5 bg-navy text-white hover:bg-gold hover:text-navy font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <span>Explore Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.productId} className="py-3.5 flex gap-3.5 first:pt-0 last:pb-0">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-sm bg-stone-100 border border-stone-200 shrink-0 overflow-hidden relative">
                    <img
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold/10 px-1.5 py-0.5 rounded-xs inline-block mb-1">
                      {item.businessName}
                    </span>
                    <h4 className="text-xs font-bold text-navy leading-tight line-clamp-1">
                      {item.productName}
                    </h4>
                    {item.unit && (
                      <p className="text-[11px] text-stone-500 mt-0.5">{item.unit}</p>
                    )}

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 rounded-sm bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-navy min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-navy">
                          ₹{item.total.toLocaleString("en-IN")}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              {/* Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase tracking-wide">FREE</span>
                    ) : (
                      <span className="font-semibold text-navy">₹{shippingFee}</span>
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-navy">Total</span>
                  <div className="text-right">
                    <span className="text-base font-bold text-navy">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-stone-500 block">Inclusive of all taxes</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-3 bg-navy hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-gold" />
              </Link>

              {/* WhatsApp Quick Order option */}
              <a
                href={getWhatsAppCartUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs tracking-wide rounded-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Order via WhatsApp</span>
              </a>

              {/* Trust badges */}
              <div className="pt-1 flex items-center justify-center gap-4 text-[10px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Direct Brand Guarantee
                </span>
                <span>•</span>
                <span>COD & UPI Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

