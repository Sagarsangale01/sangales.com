import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getAllOrders } from "@/services/orderService";
import OrderManagerClient from "@/components/admin/OrderManagerClient";

export const metadata: Metadata = {
  title: "Order Management CMS | SANGALES Admin",
  description: "Track customer orders, update fulfillment statuses, and manage dispatch logistics.",
};

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const initialOrders = await getAllOrders();

  return <OrderManagerClient initialOrders={initialOrders} />;
}

