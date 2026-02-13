import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { findUserById } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { sub?: number | string }) : null;
    const sub = payload?.sub;
    const userId = typeof sub === "string" ? Number(sub) : (typeof sub === "number" ? sub : 0);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await findUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const role = typeof (user as { role?: string }).role === "string" ? (user as { role?: string }).role : "applicant";
    const status = typeof (user as { status?: string }).status === "string" ? (user as { status?: string }).status : "Pending";
    const status_reason = typeof (user as { status_reason?: string | null }).status_reason !== "undefined" ? (user as { status_reason?: string | null }).status_reason : null;
    const referral_slug = (user as { referral_slug?: string }).referral_slug || null;
    const custom_support_number = (user as { custom_support_number?: string }).custom_support_number || null;
    return NextResponse.json({ id: user.id, name: user.name, email: user.email, role, status, status_reason, referral_slug, custom_support_number }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Me error" }, { status: 500 });
  }
}
