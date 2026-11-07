import React from "react";
import CareersManagerClient from "@/components/admin/CareersManagerClient";
import { getAllCareers, getAllApplications } from "@/services/careerService";
import { getAllBusinesses } from "@/services/businessService";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const [careers, applications, businesses] = await Promise.all([
    getAllCareers(),
    getAllApplications(),
    getAllBusinesses(),
  ]);

  return (
    <div className="space-y-6">
      <CareersManagerClient
        initialCareers={careers}
        initialApplications={applications}
        businesses={businesses.map((b) => ({ id: b.id, name: b.name }))}
      />
    </div>
  );
}

