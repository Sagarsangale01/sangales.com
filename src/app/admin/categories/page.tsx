import React from "react";
import CategoryManagerClient from "@/components/admin/CategoryManagerClient";
import { getCategories } from "@/services/businessService";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <CategoryManagerClient initialCategories={categories} />
    </div>
  );
}

