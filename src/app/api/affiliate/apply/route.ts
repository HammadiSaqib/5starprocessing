import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { updateUserAffiliateStatus } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { sub?: number | string }) : null;
    const sub = payload?.sub;
    const userId = typeof sub === "string" ? Number(sub) : (typeof sub === "number" ? sub : 0);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update status to pending
    await updateUserAffiliateStatus(userId, "pending");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Application failed" }, { status: 500 });
  }
}
