import React from "react";
import NewsManagerClient from "@/components/admin/NewsManagerClient";
import { getAllNews } from "@/services/newsService";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await getAllNews();

  return (
    <div className="space-y-6">
      <NewsManagerClient initialNews={news} />
    </div>
  );
}
