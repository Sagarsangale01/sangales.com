import { NextRequest, NextResponse } from "next/server";
import { signToken, AUTH_COOKIE_NAME, comparePassword } from "@/lib/auth";
import { getStore } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const store = getStore();
    const storedCreds = store.adminCredentials;

    const adminEmail = (storedCreds?.email || process.env.ADMIN_DEFAULT_EMAIL || "admin@sangales.com").trim().toLowerCase();
    
    let isPasswordValid = false;

    if (storedCreds?.passwordHash) {
      isPasswordValid = await comparePassword(password, storedCreds.passwordHash);
    } else {
      const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || "SangalesAdmin2026!";
      isPasswordValid = password === defaultPass;
    }

    if (
      email.trim().toLowerCase() === adminEmail &&
      isPasswordValid
    ) {
      const token = signToken({
        userId: "admin-super-1",
        email: adminEmail,
        name: "Sangales Super Administrator",
        role: "Super Admin",
      });

      const response = NextResponse.json({
        success: true,
        user: { email: adminEmail, name: "Sangales Super Administrator", role: "Super Admin" },
      });

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid administrator credentials" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

