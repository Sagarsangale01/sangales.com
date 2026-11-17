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
  subCategory?: string;
  price?: string;
  mrp?: string;
  unit?: string;
  sku?: string;
  stockStatus?: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  stockQuantity?: number;
  lowStockThreshold?: number;
  isFeaturedInShop?: boolean;
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
          stockStatus: p.stockStatus || "IN_STOCK",
          stockQuantity: typeof p.stockQuantity === "number" ? p.stockQuantity : 50,
          lowStockThreshold: typeof p.lowStockThreshold === "number" ? p.lowStockThreshold : 10,
          unit: p.unit || "Standard Unit",
          sku: p.sku || `SNG-${p.id.toUpperCase()}`,
          isFeaturedInShop: p.isFeaturedInShop ?? true,
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
    subCategory?: string;
    price?: string;
    mrp?: string;
    unit?: string;
    sku?: string;
    stockStatus?: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
    stockQuantity?: number;
    lowStockThreshold?: number;
    isFeaturedInShop?: boolean;
    directBuyUrl?: string;
  }
): Promise<AdminProductItem | null> {
  const store = getStore();
  const biz = store.businesses.find((b) => b.id === businessId);
  if (!biz) return null;

  if (!biz.products) biz.products = [];

  const newId = `prod-${Date.now()}`;
  const newProd = {
    id: newId,
    name: input.name.trim(),
    description: input.description.trim(),
    image:
      input.image?.trim() ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
    category: input.category?.trim() || "",
    subCategory: input.subCategory?.trim() || "",
    price: input.price?.trim() || "",
    mrp: input.mrp?.trim() || "",
    unit: input.unit?.trim() || "Standard Unit",
    sku: input.sku?.trim() || `SNG-${newId.toUpperCase()}`,
    stockStatus: input.stockStatus || "IN_STOCK",
    stockQuantity: typeof input.stockQuantity === "number" ? input.stockQuantity : 50,
    lowStockThreshold: typeof input.lowStockThreshold === "number" ? input.lowStockThreshold : 10,
    isFeaturedInShop: input.isFeaturedInShop ?? true,
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
    name?: string;
    description?: string;
    image?: string;
    category?: string;
    subCategory?: string;
    price?: string;
    mrp?: string;
    unit?: string;
    sku?: string;
    stockStatus?: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
    stockQuantity?: number;
    lowStockThreshold?: number;
    isFeaturedInShop?: boolean;
    directBuyUrl?: string;
    businessId?: string;
  }
): Promise<AdminProductItem | null> {
  const store = getStore();

  const targetBiz = store.businesses.find((b) => b.products?.some((p) => p.id === productId));
  if (!targetBiz) return null;

  const prodIdx = targetBiz.products.findIndex((p) => p.id === productId);
  if (prodIdx === -1) return null;

  const current = targetBiz.products[prodIdx];

  // If businessId is changing, move product to the new business
  if (input.businessId && input.businessId !== targetBiz.id) {
    const newBiz = store.businesses.find((b) => b.id === input.businessId);
    if (newBiz) {
      if (!newBiz.products) newBiz.products = [];
      const updatedProd = {
        ...current,
        name: input.name !== undefined ? input.name.trim() : current.name,
        description: input.description !== undefined ? input.description.trim() : current.description,
        image: input.image !== undefined ? input.image.trim() : current.image,
        category: input.category !== undefined ? input.category.trim() : current.category,
        subCategory: input.subCategory !== undefined ? input.subCategory.trim() : (current as any).subCategory,
        price: input.price !== undefined ? input.price.trim() : current.price,
        mrp: input.mrp !== undefined ? input.mrp.trim() : (current as any).mrp,
        unit: input.unit !== undefined ? input.unit.trim() : (current as any).unit,
        sku: input.sku !== undefined ? input.sku.trim() : (current as any).sku,
        stockStatus: input.stockStatus !== undefined ? input.stockStatus : (current as any).stockStatus,
        stockQuantity: input.stockQuantity !== undefined ? input.stockQuantity : (current as any).stockQuantity,
        lowStockThreshold: input.lowStockThreshold !== undefined ? input.lowStockThreshold : (current as any).lowStockThreshold,
        isFeaturedInShop: input.isFeaturedInShop !== undefined ? input.isFeaturedInShop : (current as any).isFeaturedInShop,
        directBuyUrl: input.directBuyUrl !== undefined ? input.directBuyUrl.trim() : current.directBuyUrl,
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
  const updatedProd = {
    ...current,
    name: input.name !== undefined ? input.name.trim() : current.name,
    description: input.description !== undefined ? input.description.trim() : current.description,
    image: input.image !== undefined ? input.image.trim() : current.image,
    category: input.category !== undefined ? input.category.trim() : current.category,
    subCategory: input.subCategory !== undefined ? input.subCategory.trim() : (current as any).subCategory,
    price: input.price !== undefined ? input.price.trim() : current.price,
    mrp: input.mrp !== undefined ? input.mrp.trim() : (current as any).mrp,
    unit: input.unit !== undefined ? input.unit.trim() : (current as any).unit,
    sku: input.sku !== undefined ? input.sku.trim() : (current as any).sku,
    stockStatus: input.stockStatus !== undefined ? input.stockStatus : (current as any).stockStatus,
    stockQuantity: input.stockQuantity !== undefined ? input.stockQuantity : (current as any).stockQuantity,
    lowStockThreshold: input.lowStockThreshold !== undefined ? input.lowStockThreshold : (current as any).lowStockThreshold,
    isFeaturedInShop: input.isFeaturedInShop !== undefined ? input.isFeaturedInShop : (current as any).isFeaturedInShop,
    directBuyUrl: input.directBuyUrl !== undefined ? input.directBuyUrl.trim() : current.directBuyUrl,
  };

  targetBiz.products[prodIdx] = updatedProd;
  saveStore(store);

  return {
    ...updatedProd,
    businessId: targetBiz.id,
    businessName: targetBiz.name,
    businessSlug: targetBiz.slug,
  };
}

export async function updateProductInventory(
  productId: string,
  updates: {
    stockStatus?: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
    stockQuantity?: number;
    price?: string;
    mrp?: string;
    unit?: string;
    sku?: string;
  }
): Promise<AdminProductItem | null> {
  return updateProductInBusiness(productId, updates);
}

export async function getInventorySummary() {
  const products = await getAllProductsAcrossBusinesses();
  const total = products.length;
  const inStock = products.filter((p) => p.stockStatus === "IN_STOCK").length;
  const lowStock = products.filter((p) => p.stockStatus === "LOW_STOCK").length;
  const outOfStock = products.filter((p) => p.stockStatus === "OUT_OF_STOCK").length;
  const totalQuantity = products.reduce((sum, p) => sum + (p.stockQuantity || 0), 0);

  // Calculate estimated total inventory retail value
  let totalEstimatedValue = 0;
  products.forEach((p) => {
    if (p.price) {
      const clean = p.price.replace(/,/g, "");
      const match = clean.match(/([0-9]+(?:\.[0-9]+)?)/);
      const val = match ? parseFloat(match[1]) : 0;
      if (val > 0) {
        totalEstimatedValue += val * (p.stockQuantity || 0);
      }
    }
  });

  return {
    total,
    inStock,
    lowStock,
    outOfStock,
    totalQuantity,
    totalEstimatedValue,
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

