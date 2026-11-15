"use client";

import React, { useEffect, Suspense } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUTMFromUrl } from "@/lib/utm";
import { trackPageView } from "@/lib/analytics";

interface GoogleAnalyticsProps {
  gaMeasurementId?: string;
  gtmId?: string;
}

function RouteTrackingHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Capture UTM parameters from incoming paid campaign query strings
    captureUTMFromUrl();

    // 2. Dispatch page_view event on client route changes
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${pathname}${
        searchParams?.toString() ? `?${searchParams.toString()}` : ""
      }`;
      trackPageView(fullUrl);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics({ gaMeasurementId, gtmId }: GoogleAnalyticsProps) {
  const resolvedGA = gaMeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const resolvedGTM = gtmId || process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      {/* Route & UTM Change Tracker wrapped in Suspense for Next.js App Router */}
      <Suspense fallback={null}>
        <RouteTrackingHandler />
      </Suspense>

      {/* Google Analytics 4 (gtag.js) */}
      {resolvedGA && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${resolvedGA}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${resolvedGA}', {
                  page_path: window.location.pathname,
                  send_page_view: false
                });
              `,
            }}
          />
        </>
      )}

      {/* Google Tag Manager (GTM) */}
      {resolvedGTM && (
        <>
          <Script
            id="google-tag-manager-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${resolvedGTM}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${resolvedGTM}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
    </>
  );
}

