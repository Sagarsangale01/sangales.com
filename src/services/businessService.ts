import { getStore, saveStore } from "@/lib/store";
import { BusinessRecord } from "@/lib/data";
import { slugify } from "@/lib/utils";

export async function getPublishedBusinesses(): Promise<BusinessRecord[]> {
  const store = getStore();
  return store.businesses
    .filter((b) => b.status === "PUBLISHED")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getUpcomingBusinesses(): Promise<BusinessRecord[]> {
  const store = getStore();
  return store.businesses
    .filter((b) => b.status === "UPCOMING")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPublicBusinesses(): Promise<BusinessRecord[]> {
  const store = getStore();
  return store.businesses
    .filter((b) => b.status === "PUBLISHED" || b.status === "UPCOMING")
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
    email: input.email || "contact.sangales@gmail.com",
    phone: input.phone || "+91 75077 00936",
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

export interface AdminProductItem {
  id: string;
  businessId: string;
  businessName: string;
  businessSlug: string;
  name: string;
  description: string;
  image: string;
  category?: string;
  price?: string;
  directBuyUrl?: string;
}

export async function getAllProductsAcrossBusinesses(): Promise<AdminProductItem[]> {
  const store = getStore();
  const list: AdminProductItem[] = [];
  store.businesses.forEach((b) => {
    if (b.products && b.products.length > 0) {
      b.products.forEach((p) => {
        list.push({
          ...p,
          businessId: b.id,
          businessName: b.name,
          businessSlug: b.slug,
        });
      });
    }
  });
  return list;
}

export async function addProductToBusiness(
  businessId: string,
  input: {
    name: string;
    description: string;
    image?: string;
    category?: string;
    price?: string;
    directBuyUrl?: string;
  }
): Promise<AdminProductItem | null> {
  const store = getStore();
  const biz = store.businesses.find((b) => b.id === businessId);
  if (!biz) return null;

  if (!biz.products) biz.products = [];

  const newProd = {
    id: `prod-${Date.now()}`,
    name: input.name.trim(),
    description: input.description.trim(),
    image:
      input.image?.trim() ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
    category: input.category?.trim() || "",
    price: input.price?.trim() || "",
    directBuyUrl: input.directBuyUrl?.trim() || "",
  };

  biz.products.push(newProd);
  saveStore(store);

  return {
    ...newProd,
    businessId: biz.id,
    businessName: biz.name,
    businessSlug: biz.slug,
  };
}

export async function updateProductInBusiness(
  productId: string,
  input: {
    name: string;
    description: string;
    image?: string;
    category?: string;
    price?: string;
    directBuyUrl?: string;
    businessId?: string;
  }
): Promise<AdminProductItem | null> {
  const store = getStore();

  const targetBiz = store.businesses.find((b) => b.products?.some((p) => p.id === productId));
  if (!targetBiz) return null;

  const prodIdx = targetBiz.products.findIndex((p) => p.id === productId);
  if (prodIdx === -1) return null;

  // If businessId is changing, move product to the new business
  if (input.businessId && input.businessId !== targetBiz.id) {
    const newBiz = store.businesses.find((b) => b.id === input.businessId);
    if (newBiz) {
      if (!newBiz.products) newBiz.products = [];
      const updatedProd = {
        ...targetBiz.products[prodIdx],
        name: input.name.trim(),
        description: input.description.trim(),
        image: input.image?.trim() || targetBiz.products[prodIdx].image,
        category: input.category?.trim() || "",
        price: input.price?.trim() || "",
        directBuyUrl: input.directBuyUrl?.trim() || "",
      };
      targetBiz.products.splice(prodIdx, 1);
      newBiz.products.push(updatedProd);
      saveStore(store);
      return {
        ...updatedProd,
        businessId: newBiz.id,
        businessName: newBiz.name,
        businessSlug: newBiz.slug,
      };
    }
  }

  // Update in place
  targetBiz.products[prodIdx] = {
    ...targetBiz.products[prodIdx],
    name: input.name.trim(),
    description: input.description.trim(),
    image: input.image?.trim() || targetBiz.products[prodIdx].image,
    category: input.category?.trim() || "",
    price: input.price?.trim() || "",
    directBuyUrl: input.directBuyUrl?.trim() || "",
  };

  saveStore(store);

  return {
    ...targetBiz.products[prodIdx],
    businessId: targetBiz.id,
    businessName: targetBiz.name,
    businessSlug: targetBiz.slug,
  };
}

export async function deleteProductFromBusiness(productId: string): Promise<boolean> {
  const store = getStore();
  let found = false;
  store.businesses.forEach((b) => {
    if (b.products && b.products.some((p) => p.id === productId)) {
      b.products = b.products.filter((p) => p.id !== productId);
      found = true;
    }
  });
  if (found) {
    saveStore(store);
    return true;
  }
  return false;
}

