import { Metadata } from "next";
import CartPageClient from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Shopping Cart | SANGALES",
  description: "Review your selected items, calculate shipping, and proceed to secure checkout.",
};

export default function CartPage() {
  return <CartPageClient />;
}

