import { Metadata } from "next";
import { getAllProductsAcrossBusinesses, getPublishedBusinesses } from "@/services/businessService";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Direct Online Store | Shop Products & Supplies | SANGALES",
  description:
    "Buy directly from SANGALES operating businesses. Organic food staples, Vedic A2 Gir Cow Ghee, agricultural produce, industrial packaging, and electrical solutions with direct delivery, COD, and UPI.",
  alternates: {
    canonical: "/shop",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopPage() {
  const [products, businesses] = await Promise.all([
    getAllProductsAcrossBusinesses(),
    getPublishedBusinesses(),
  ]);

  return <ShopClient initialProducts={products} businesses={businesses} />;
}

