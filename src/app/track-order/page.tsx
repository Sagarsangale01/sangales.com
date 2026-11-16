import { Metadata } from "next";
import TrackOrderClient from "@/components/orders/TrackOrderClient";

export const metadata: Metadata = {
  title: "Track Your Order & Shipment | SANGALES GROUP",
  description:
    "Track live shipment status, courier AWB tracking numbers, and download official tax invoices for your SANGALES GROUP orders.",
  alternates: {
    canonical: "/track-order",
  },
};

export const dynamic = "force-dynamic";

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}

