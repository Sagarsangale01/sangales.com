"use client";

import { getStoredUTM } from "./utm";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Universal Event Tracker: Dispatches to both GA4 (gtag) and GTM (dataLayer).
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  // Initialize dataLayer if missing
  window.dataLayer = window.dataLayer || [];

  // 1. Get stored UTM attribution to enrich event parameters
  const utm = getStoredUTM() || {};

  const enrichedParams = {
    ...params,
    utm_source: params.utm_source || utm.utm_source || "(direct)",
    utm_medium: params.utm_medium || utm.utm_medium || "(none)",
    utm_campaign: params.utm_campaign || utm.utm_campaign || "",
    utm_term: params.utm_term || utm.utm_term || "",
    utm_content: params.utm_content || utm.utm_content || "",
    gclid: params.gclid || utm.gclid || "",
    page_location: window.location.href,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  // 2. Dispatch to GA4 (gtag)
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, enrichedParams);
    } catch (err) {
      console.warn("GA4 event dispatch warning:", err);
    }
  }

  // 3. Dispatch to GTM (dataLayer)
  try {
    window.dataLayer.push({
      event: eventName,
      ...enrichedParams,
    });
  } catch (err) {
    console.warn("GTM dataLayer push warning:", err);
  }
}

/**
 * Tracks WhatsApp CTA Click as a high-intent conversion event.
 * Standard GA4 event: 'contact' with method='whatsapp', plus custom 'whatsapp_click'.
 */
export function trackWhatsAppClick(props: {
  businessName?: string;
  businessSlug?: string;
  productName?: string;
  source: string;
  phoneNumber?: string;
}) {
  const eventData = {
    method: "whatsapp",
    business_name: props.businessName || "Sangales Corporate Desk",
    business_slug: props.businessSlug || "",
    product_name: props.productName || "",
    source_component: props.source,
    phone_number: props.phoneNumber || "+91 75077 00936",
    conversion_type: "whatsapp_inquiry",
  };

  // Dispatch standard contact event
  trackEvent("contact", eventData);

  // Dispatch dedicated whatsapp_click event (often used for specific Google Ads conversion actions)
  trackEvent("whatsapp_click", eventData);
}

/**
 * Tracks Lead Submission (Quick Quote, RFP, Corporate Contact).
 * Standard GA4 event: 'generate_lead'.
 */
export function trackLeadSubmit(props: {
  formName: string;
  businessName?: string;
  enquiryType?: string;
  email?: string;
  phone?: string;
  value?: number;
}) {
  const eventData = {
    form_name: props.formName,
    business_name: props.businessName || "Sangales Corporate Desk",
    enquiry_type: props.enquiryType || "General Enquiry",
    currency: "INR",
    value: props.value || 0,
    conversion_type: "lead_form",
  };

  // Standard GA4 conversion event
  trackEvent("generate_lead", eventData);

  // GTM trigger event
  trackEvent("conversion", {
    conversion_action: "lead_generation",
    ...eventData,
  });
}

/**
 * Tracks Direct Telephone Hotline Clicks.
 */
export function trackPhoneClick(props: {
  phoneNumber: string;
  source: string;
  businessName?: string;
}) {
  trackEvent("contact", {
    method: "phone",
    phone_number: props.phoneNumber,
    source_component: props.source,
    business_name: props.businessName || "Sangales Group",
    conversion_type: "phone_call",
  });

  trackEvent("phone_call_click", {
    phone_number: props.phoneNumber,
    source_component: props.source,
  });
}

/**
 * Tracks Client-Side Route Changes for Single Page App Pageviews.
 */
export function trackPageView(url: string) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "page_view", {
        page_location: url,
        page_path: window.location.pathname,
        page_title: document.title,
      });
    } catch {
      // Ignore
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_location: url,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

