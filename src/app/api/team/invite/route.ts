import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { updateReferralSlug, ensureUsersTable, ensurePortalSchema } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { sub?: number | string }) : null;
    
    if (!payload || !payload.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = typeof payload.sub === "string" ? Number(payload.sub) : payload.sub;
    
    const body = await request.json();
    const slug = String(body.slug || "").trim().toLowerCase();

    if (!slug) {
        return NextResponse.json({ error: "Slug cannot be empty" }, { status: 400 });
    }

    // Validate slug format: only alphanumeric and hyphens
    if (!/^[a-z0-9-]+$/.test(slug)) {
       return NextResponse.json({ error: "Invalid format. Only letters, numbers, and hyphens allowed." }, { status: 400 });
    }

    await ensureUsersTable();
    await ensurePortalSchema();
    const success = await updateReferralSlug(userId, slug);
    if (!success) {
        return NextResponse.json({ error: "This Invite Link Already In Use, Try Something Diffrent" }, { status: 409 });
    }

    return NextResponse.json({ success: true, slug });

  } catch (err) {
      console.error("Invite slug update error:", err);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
