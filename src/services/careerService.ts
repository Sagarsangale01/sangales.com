import { getStore, saveStore, ApplicationRecord } from "@/lib/store";
import { CareerRecord } from "@/lib/data";
import { slugify } from "@/lib/utils";

export async function getPublishedCareers(): Promise<CareerRecord[]> {
  const store = getStore();
  return store.careers.filter((c) => c.status === "PUBLISHED");
}

export async function getAllCareers(): Promise<CareerRecord[]> {
  const store = getStore();
  return store.careers;
}

export async function getCareerBySlug(slug: string): Promise<CareerRecord | null> {
  const store = getStore();
  return store.careers.find((c) => c.slug === slug) || null;
}

export async function createCareer(input: Partial<CareerRecord>): Promise<CareerRecord> {
  const store = getStore();
  const id = `car-${Date.now()}`;
  const slug = input.slug ? slugify(input.slug) : slugify(input.title || `career-${Date.now()}`);

  const career: CareerRecord = {
    id,
    title: input.title || "New Opening",
    slug,
    businessName: input.businessName || "Sangales Corporate Group",
    department: input.department || "General",
    location: input.location || "India",
    employmentType: input.employmentType || "Full-time",
    description: input.description || "",
    requirements: input.requirements || [],
    status: input.status || "PUBLISHED",
    closingDate: input.closingDate,
  };

  store.careers.unshift(career);
  saveStore(store);
  return career;
}

export async function updateCareer(id: string, input: Partial<CareerRecord>): Promise<CareerRecord | null> {
  const store = getStore();
  const idx = store.careers.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  store.careers[idx] = {
    ...store.careers[idx],
    ...input,
    slug: input.slug ? slugify(input.slug) : store.careers[idx].slug,
  };

  saveStore(store);
  return store.careers[idx];
}

export async function deleteCareer(id: string): Promise<boolean> {
  const store = getStore();
  const init = store.careers.length;
  store.careers = store.careers.filter((c) => c.id !== id);
  if (store.careers.length !== init) {
    saveStore(store);
    return true;
  }
  return false;
}

export async function submitApplication(input: {
  careerId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string;
}): Promise<ApplicationRecord> {
  const store = getStore();
  const app: ApplicationRecord = {
    id: `app-${Date.now()}`,
    careerId: input.careerId,
    jobTitle: input.jobTitle,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    resumeUrl: input.resumeUrl.trim(),
    coverLetter: input.coverLetter?.trim(),
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  store.applications.unshift(app);
  saveStore(store);
  return app;
}

export async function getAllApplications(): Promise<ApplicationRecord[]> {
  const store = getStore();
  return store.applications;
}

export async function updateApplicationStatus(id: string, status: ApplicationRecord["status"]) {
  const store = getStore();
  const idx = store.applications.findIndex((a) => a.id === id);
  if (idx !== -1) {
    store.applications[idx].status = status;
    saveStore(store);
    return store.applications[idx];
  }
  return null;
}

