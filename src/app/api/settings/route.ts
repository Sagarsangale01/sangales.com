import { NextRequest, NextResponse } from "next/server";
import {
  getSiteSettings,
  updateSiteSettings,
  getMilestones,
  updateMilestones,
} from "@/services/settingsService";
import { getCurrentAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  const settings = getSiteSettings();
  const milestones = getMilestones();
  return NextResponse.json({ success: true, settings, milestones });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    let updatedSettings = null;
    let updatedMilestones = null;

    if (body.milestones && Array.isArray(body.milestones)) {
      updatedMilestones = updateMilestones(body.milestones);
    }

    // Check if body has a settings property or if body is itself settings
    const settingsPayload = body.settings ? body.settings : body;
    // Don't save milestones as part of settings if it's top level
    const { milestones: _m, ...cleanSettings } = settingsPayload;

    if (Object.keys(cleanSettings).length > 0) {
      updatedSettings = updateSiteSettings(cleanSettings);
    } else {
      updatedSettings = getSiteSettings();
    }

    if (!updatedMilestones) {
      updatedMilestones = getMilestones();
    }

    // Invalidate caches across all public pages & layout
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/contact");
      revalidatePath("/our-vision");
      revalidatePath("/our-journey");
      revalidatePath("/businesses");
      revalidatePath("/news");
      revalidatePath("/careers");
      revalidatePath("/admin/settings");
    } catch (e) {
      // ignore in environments where revalidate is mocked
    }

    return NextResponse.json({
      success: true,
      settings: updatedSettings,
      milestones: updatedMilestones,
    });
  } catch (err: any) {
    console.error("Settings update error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

