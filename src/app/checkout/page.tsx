import { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Checkout | SANGALES",
  description: "Complete your direct order with Cash on Delivery or instant UPI scan and pay.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

