import { getStore } from "@/lib/store";

export async function getDashboardStats() {
  const store = getStore();

  const totalBusinesses = store.businesses.length;
  const publishedBusinesses = store.businesses.filter((b) => b.status === "PUBLISHED").length;
  const draftBusinesses = store.businesses.filter((b) => b.status === "DRAFT").length;
  const upcomingBusinesses = store.businesses.filter((b) => b.status === "UPCOMING").length;

  const totalEnquiries = store.enquiries.length;
  const newEnquiries = store.enquiries.filter((e) => e.status === "NEW").length;
  const inProgressEnquiries = store.enquiries.filter((e) => e.status === "IN_PROGRESS").length;
  const closedEnquiries = store.enquiries.filter((e) => e.status === "CLOSED" || e.status === "CONVERTED").length;

  const publishedNews = store.news.filter((n) => n.status === "PUBLISHED").length;
  const activeJobs = store.careers.filter((c) => c.status === "PUBLISHED").length;
  const totalApplications = store.applications.length;

  // Build real recent activities feed
  const recentEnquiries = store.enquiries.slice(0, 5).map((e) => ({
    id: e.id,
    type: "ENQUIRY",
    title: `Enquiry from ${e.fullName} (${e.enquiryType})`,
    subtitle: e.subject || e.businessName || "General Group",
    time: e.createdAt,
    status: e.status,
  }));

  const recentApplications = store.applications.slice(0, 3).map((a) => ({
    id: a.id,
    type: "APPLICATION",
    title: `Job Application: ${a.fullName}`,
    subtitle: a.jobTitle,
    time: a.createdAt,
    status: a.status,
  }));

  return {
    totalBusinesses,
    publishedBusinesses,
    draftBusinesses,
    upcomingBusinesses,
    totalEnquiries,
    newEnquiries,
    inProgressEnquiries,
    closedEnquiries,
    publishedNews,
    activeJobs,
    totalApplications,
    recentEnquiries,
    recentApplications,
  };
}

