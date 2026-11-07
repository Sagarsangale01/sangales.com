import React from "react";
import BusinessManagerClient from "@/components/admin/BusinessManagerClient";
import { getAllBusinesses, getCategories } from "@/services/businessService";

export const dynamic = "force-dynamic";

export default async function AdminBusinessesPage() {
  const [businesses, categories] = await Promise.all([
    getAllBusinesses(),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <BusinessManagerClient
        initialBusinesses={businesses}
        categories={categories}
      />
    </div>
  );
}

