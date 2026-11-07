import { getStore, saveStore } from "@/lib/store";
import { NewsRecord } from "@/lib/data";
import { slugify } from "@/lib/utils";

export async function getPublishedNews(): Promise<NewsRecord[]> {
  const store = getStore();
  return store.news
    .filter((n) => n.status === "PUBLISHED")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getAllNews(): Promise<NewsRecord[]> {
  const store = getStore();
  return store.news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getNewsBySlug(slug: string): Promise<NewsRecord | null> {
  const store = getStore();
  return store.news.find((n) => n.slug === slug) || null;
}

export async function createNews(input: Partial<NewsRecord>): Promise<NewsRecord> {
  const store = getStore();
  const id = `news-${Date.now()}`;
  const slug = input.slug ? slugify(input.slug) : slugify(input.title || `news-${Date.now()}`);

  const item: NewsRecord = {
    id,
    title: input.title || "Untitled Article",
    slug,
    excerpt: input.excerpt || "",
    content: input.content || "",
    featuredImage: input.featuredImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    category: input.category || "Corporate",
    publishedAt: input.publishedAt || new Date().toISOString(),
    status: input.status || "PUBLISHED",
    seoTitle: input.seoTitle || `${input.title} | Sangales News`,
    seoDescription: input.seoDescription || input.excerpt || "",
  };

  store.news.unshift(item);
  saveStore(store);
  return item;
}

export async function updateNews(id: string, input: Partial<NewsRecord>): Promise<NewsRecord | null> {
  const store = getStore();
  const idx = store.news.findIndex((n) => n.id === id);
  if (idx === -1) return null;

  store.news[idx] = {
    ...store.news[idx],
    ...input,
    slug: input.slug ? slugify(input.slug) : store.news[idx].slug,
  };

  saveStore(store);
  return store.news[idx];
}

export async function deleteNews(id: string): Promise<boolean> {
  const store = getStore();
  const init = store.news.length;
  store.news = store.news.filter((n) => n.id !== id);
  if (store.news.length !== init) {
    saveStore(store);
    return true;
  }
  return false;
}
