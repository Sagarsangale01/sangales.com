import React from "react";
import MediaLibraryClient from "@/components/admin/MediaLibraryClient";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const store = getStore();

  return (
    <div className="space-y-6">
      <MediaLibraryClient initialMedia={store.media} />
    </div>
  );
}
