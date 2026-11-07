import { getStore, saveStore, EnquiryRecord } from "@/lib/store";

export async function createEnquiry(input: {
  businessId?: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  enquiryType: string;
  subject?: string;
  message: string;
}): Promise<EnquiryRecord> {
  const store = getStore();
  const business = input.businessId ? store.businesses.find((b) => b.id === input.businessId) : undefined;

  const enquiry: EnquiryRecord = {
    id: `enq-${Date.now()}`,
    businessId: input.businessId || undefined,
    businessName: business?.name || "Sangales Corporate Group",
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    companyName: input.companyName?.trim() || "",
    enquiryType: input.enquiryType,
    subject: input.subject?.trim() || `Enquiry from ${input.fullName}`,
    message: input.message.trim(),
    status: "NEW",
    adminNotes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.enquiries.unshift(enquiry);
  saveStore(store);
  return enquiry;
}

export async function getAllEnquiries(filter?: {
  status?: string;
  businessId?: string;
  search?: string;
}): Promise<EnquiryRecord[]> {
  const store = getStore();
  let list = [...store.enquiries];

  if (filter?.status && filter.status !== "ALL") {
    list = list.filter((e) => e.status === filter.status);
  }
  if (filter?.businessId && filter.businessId !== "ALL") {
    list = list.filter((e) => e.businessId === filter.businessId);
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.fullName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        (e.companyName && e.companyName.toLowerCase().includes(q)) ||
        (e.subject && e.subject.toLowerCase().includes(q))
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryRecord["status"],
  adminNotes?: string
): Promise<EnquiryRecord | null> {
  const store = getStore();
  const idx = store.enquiries.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  store.enquiries[idx].status = status;
  if (adminNotes !== undefined) {
    store.enquiries[idx].adminNotes = adminNotes;
  }
  store.enquiries[idx].updatedAt = new Date().toISOString();

  saveStore(store);
  return store.enquiries[idx];
}

