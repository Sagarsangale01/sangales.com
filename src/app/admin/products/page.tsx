import React from "react";
import type { Metadata } from "next";
import ProductManagerClient from "@/components/admin/ProductManagerClient";
import {
  getAllProductsAcrossBusinesses,
  getAllBusinesses,
} from "@/services/businessService";

export const metadata: Metadata = {
  title: "Products & Solutions Manager | SANGALES Admin CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProductsPage() {
  const [products, businesses] = await Promise.all([
    getAllProductsAcrossBusinesses(),
    getAllBusinesses(),
  ]);

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <ProductManagerClient
        initialProducts={products}
        businesses={businesses.map((b) => ({ id: b.id, name: b.name, slug: b.slug }))}
      />
    </div>
  );
}
