"use client";

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  first_seen?: string;
}

const UTM_STORAGE_KEY = "sangales_utm_data";
const UTM_COOKIE_KEY = "sangales_utm";

/**
 * Extracts UTM and ad click parameters from a query string or URLSearchParams.
 */
export function extractUTMFromSearchParams(params: URLSearchParams): UTMData {
  const data: UTMData = {};

  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  const term = params.get("utm_term");
  const content = params.get("utm_content");
  const gclid = params.get("gclid");
  const fbclid = params.get("fbclid");

  if (source) data.utm_source = source;
  if (medium) data.utm_medium = medium;
  if (campaign) data.utm_campaign = campaign;
  if (term) data.utm_term = term;
  if (content) data.utm_content = content;
  if (gclid) data.gclid = gclid;
  if (fbclid) data.fbclid = fbclid;

  return data;
}

/**
 * Captures UTM parameters from current window URL and saves them in persistent session.
 * Preserves initial campaign attribution for the session (first-touch / multi-page persistence).
 */
export function captureUTMFromUrl(): UTMData | null {
  if (typeof window === "undefined") return null;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const incomingUTM = extractUTMFromSearchParams(urlParams);
    const hasIncoming = Object.keys(incomingUTM).length > 0;

    // Check existing stored UTMs
    const existing = getStoredUTM();

    if (hasIncoming) {
      const merged: UTMData = {
        ...existing,
        ...incomingUTM,
        landing_page: window.location.pathname,
        referrer: document.referrer || existing?.referrer || "",
        first_seen: existing?.first_seen || new Date().toISOString(),
      };

      // Store in sessionStorage
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));

      // Also set a 30-day cookie for cross-session / server-side persistence
      try {
        const cookieVal = encodeURIComponent(JSON.stringify(merged));
        document.cookie = `${UTM_COOKIE_KEY}=${cookieVal}; path=/; max-age=2592000; SameSite=Lax`;
      } catch {
        // Ignore cookie write errors
      }

      return merged;
    }

    return existing;
  } catch (err) {
    console.error("UTM capture error:", err);
    return null;
  }
}

/**
 * Retrieves the currently persisted UTM attribution data.
 */
export function getStoredUTM(): UTMData | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Check sessionStorage
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UTMData;
    }

    // 2. Check cookie fallback
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${UTM_COOKIE_KEY}=([^;]+)`));
    if (match && match[1]) {
      const parsed = JSON.parse(decodeURIComponent(match[1])) as UTMData;
      // Re-hydrate session storage
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(parsed));
      return parsed;
    }
  } catch (err) {
    console.error("UTM retrieval error:", err);
  }

  return null;
}

/**
 * Formats a clean attribution summary string suitable for appending to WhatsApp inquiry messages.
 * e.g. "[Ref: Google Ads | diwali_campaign]"
 */
export function getAttributionRefString(customTag?: string): string {
  const utm = getStoredUTM();
  const parts: string[] = [];

  if (utm?.utm_source) {
    const src = utm.utm_source.toLowerCase();
    if (src.includes("google")) parts.push("Google Ads");
    else if (src.includes("meta") || src.includes("facebook") || src.includes("fb")) parts.push("Meta Ads");
    else if (src.includes("insta")) parts.push("Instagram");
    else if (src.includes("linkedin")) parts.push("LinkedIn");
    else parts.push(utm.utm_source);
  }

  if (utm?.utm_campaign) {
    parts.push(utm.utm_campaign);
  }

  if (customTag && !parts.includes(customTag)) {
    parts.push(customTag);
  }

  if (parts.length === 0) {
    return "[Ref: sangales.com]";
  }

  return `[Ref: ${parts.join(" | ")}]`;
}

/**
 * Builds an attributed WhatsApp link with prefilled message including campaign reference.
 */
export function buildAttributedWhatsAppUrl(
  phone: string = "917507700936",
  baseMessage: string,
  customTag?: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const ref = getAttributionRefString(customTag);
  const fullMessage = `${baseMessage.trim()}\n\n${ref}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;
}

