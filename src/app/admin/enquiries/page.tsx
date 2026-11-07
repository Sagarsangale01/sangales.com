import React from "react";
import EnquiryManagerClient from "@/components/admin/EnquiryManagerClient";
import { getAllEnquiries } from "@/services/enquiryService";
import { getAllBusinesses } from "@/services/businessService";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const [enquiries, businesses] = await Promise.all([
    getAllEnquiries(),
    getAllBusinesses(),
  ]);

  return (
    <div className="space-y-6">
      <EnquiryManagerClient
        initialEnquiries={enquiries}
        businesses={businesses.map((b) => ({ id: b.id, name: b.name }))}
      />
    </div>
  );
}
