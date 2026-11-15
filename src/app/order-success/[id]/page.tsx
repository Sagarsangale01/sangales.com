import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderById } from "@/services/orderService";
import OrderSuccessClient from "@/components/checkout/OrderSuccessClient";

export const metadata: Metadata = {
  title: "Order Confirmation & Invoice Receipt | SANGALES",
  description: "Official SANGALES GROUP invoice receipt and order fulfillment status.",
};

export const dynamic = "force-dynamic";

export default async function OrderSuccessPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrderById(params.id);

  if (!order) {
    notFound();
  }

  return <OrderSuccessClient order={order} />;
}

