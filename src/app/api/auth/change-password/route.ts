import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin, comparePassword, hashPassword, signToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { getStore, saveStore } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Current and new passwords are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const store = getStore();
    const storedCreds = store.adminCredentials;
    let isCurrentValid = false;

    if (storedCreds?.passwordHash) {
      isCurrentValid = await comparePassword(currentPassword, storedCreds.passwordHash);
    } else {
      const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || "SangalesAdmin2026!";
      isCurrentValid = currentPassword === defaultPass;
    }

    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, message: "The current password you entered is incorrect." },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(newPassword);

    store.adminCredentials = {
      email: admin.email,
      passwordHash: newHash,
      updatedAt: new Date().toISOString(),
    };

    saveStore(store);

    // Issue refreshed token
    const token = signToken({
      userId: admin.userId,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin password successfully updated.",
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

