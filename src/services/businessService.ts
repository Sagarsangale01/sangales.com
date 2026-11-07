import { getStore, saveStore } from "@/lib/store";
import { BusinessRecord } from "@/lib/data";
import { slugify } from "@/lib/utils";

export async function getPublishedBusinesses(): Promise<BusinessRecord[]> {
  const store = getStore();
  return store.businesses
    .filter((b) => b.status === "PUBLISHED")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getAllBusinesses(): Promise<BusinessRecord[]> {
  const store = getStore();
  return store.businesses.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getBusinessBySlug(slug: string): Promise<BusinessRecord | null> {
  const store = getStore();
  const business = store.businesses.find((b) => b.slug === slug);
  return business || null;
}

export async function getFeaturedBusinesses(): Promise<BusinessRecord[]> {
  const store = getStore();
  return store.businesses
    .filter((b) => b.status === "PUBLISHED" && b.isFeatured)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function createBusiness(input: Partial<BusinessRecord>): Promise<BusinessRecord> {
  const store = getStore();
  const id = `biz-${Date.now()}`;
  const slug = input.slug ? slugify(input.slug) : slugify(input.name || `business-${Date.now()}`);

  const newBiz: BusinessRecord = {
    id,
    name: input.name || "New Business",
    slug,
    tagline: input.tagline || "",
    category: input.category || "General",
    categorySlug: slugify(input.category || "general"),
    shortDescription: input.shortDescription || "",
    about: input.about || "",
    logo: input.logo || "/logos/sangales-default.svg",
    coverImage: input.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
    brandPrimaryColor: input.brandPrimaryColor || "#142735",
    brandSecondaryColor: input.brandSecondaryColor || "#C6A66B",
    email: input.email || "contact@sangales.com",
    phone: input.phone || "+91 98220 00000",
    address: input.address || "Sangales Corporate House, India",
    website: input.website || `https://${slug}.sangales.com`,
    socialLinks: input.socialLinks || {},
    status: input.status || "DRAFT",
    isFeatured: !!input.isFeatured,
    displayOrder: input.displayOrder ?? store.businesses.length + 1,
    seoTitle: input.seoTitle || `${input.name} | Sangales Group`,
    seoDescription: input.seoDescription || input.shortDescription || "A business under Sangales - A Group of Companies",
    strengths: input.strengths || [],
    targetAudience: input.targetAudience || [],
    products: input.products || [],
    gallery: input.gallery || [],
  };

  store.businesses.push(newBiz);
  saveStore(store);
  return newBiz;
}

export async function updateBusiness(id: string, input: Partial<BusinessRecord>): Promise<BusinessRecord | null> {
  const store = getStore();
  const idx = store.businesses.findIndex((b) => b.id === id);
  if (idx === -1) return null;

  const current = store.businesses[idx];
  const updated: BusinessRecord = {
    ...current,
    ...input,
    slug: input.slug ? slugify(input.slug) : current.slug,
    categorySlug: input.category ? slugify(input.category) : current.categorySlug,
  };

  store.businesses[idx] = updated;
  saveStore(store);
  return updated;
}

export async function deleteBusiness(id: string): Promise<boolean> {
  const store = getStore();
  const initialLen = store.businesses.length;
  store.businesses = store.businesses.filter((b) => b.id !== id);
  if (store.businesses.length !== initialLen) {
    saveStore(store);
    return true;
  }
  return false;
}

export async function getCategories() {
  const store = getStore();
  return store.categories;
}

export async function createCategory(name: string, description?: string) {
  const store = getStore();
  const slug = slugify(name);
  const newCat = {
    id: `cat-${Date.now()}`,
    name,
    slug,
    description: description || "",
  };
  store.categories.push(newCat);
  saveStore(store);
  return newCat;
}

export async function deleteCategory(id: string) {
  const store = getStore();
  store.categories = store.categories.filter((c) => c.id !== id);
  saveStore(store);
  return true;
}

