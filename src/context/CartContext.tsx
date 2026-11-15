"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { OrderItem } from "@/lib/store";

interface CartContextType {
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  isDrawerOpen: boolean;
  addItem: (item: Omit<OrderItem, "total"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "sangales_cart_v1";
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 80;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
    setIsHydrated(true);
  }, []);

  // Sync cart to localStorage whenever items change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (newItem: Omit<OrderItem, "total"> & { quantity?: number }) => {
      const qtyToAdd = newItem.quantity && newItem.quantity > 0 ? newItem.quantity : 1;

      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.productId === newItem.productId);
        if (existingIndex > -1) {
          const updated = [...prev];
          const current = updated[existingIndex];
          const newQty = current.quantity + qtyToAdd;
          updated[existingIndex] = {
            ...current,
            quantity: newQty,
            total: newQty * current.price,
          };
          return updated;
        } else {
          const item: OrderItem = {
            productId: newItem.productId,
            productName: newItem.productName,
            businessId: newItem.businessId,
            businessName: newItem.businessName,
            image: newItem.image,
            price: newItem.price,
            quantity: qtyToAdd,
            unit: newItem.unit,
            total: qtyToAdd * newItem.price,
          };
          return [...prev, item];
        }
      });

      // Auto open drawer to provide instant shopping cart feedback
      setIsDrawerOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => i.productId !== productId);
      }
      return prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity,
              total: quantity * item.price,
            }
          : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const shippingFee = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const totalAmount = subtotal + shippingFee;
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shippingFee,
        totalAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountUntilFreeShipping,
        isDrawerOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

