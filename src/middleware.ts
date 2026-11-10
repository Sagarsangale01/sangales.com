import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "sangales_admin_session";
const JWT_SECRET = process.env.JWT_SECRET || "sangales-corporate-ultra-secure-jwt-secret-key-2026";

/**
 * Verify HMAC-SHA256 JWT signature using standard Web Crypto API.
 * This runs natively in Next.js Edge Runtime without Node.js crypto dependencies.
 */
async function verifyJwt(token: string, secret: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signatureB64] = parts;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigStr = signatureB64.replace(/-/g, "+").replace(/_/g, "/");
    const pad = sigStr.length % 4 === 0 ? "" : "=".repeat(4 - (sigStr.length % 4));
    const sigBytes = Uint8Array.from(atob(sigStr + pad), (c) => c.charCodeAt(0));

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      enc.encode(`${headerB64}.${payloadB64}`)
    );

    if (!valid) return null;

    const pStr = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const pPad = pStr.length % 4 === 0 ? "" : "=".repeat(4 - (pStr.length % 4));
    const payload = JSON.parse(atob(pStr + pPad));

    // Verify expiration timestamp
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin and all /admin/* sub-paths
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifyJwt(token, JWT_SECRET) : null;

    // Login page handling
    if (pathname === "/admin/login") {
      // If already authenticated, redirect to /admin dashboard
      if (session) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-pathname", pathname);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // For all other /admin routes, reject unauthenticated visitors
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Authenticated: forward request with pathname header for layout
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
