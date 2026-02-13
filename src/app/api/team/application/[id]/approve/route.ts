import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { ensurePortalSchema, setApplicationApproval } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await ensurePortalSchema();
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string; sub?: number | string }) : null;
    const role = payload?.role || "";
    if (role !== "team" && role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id: idParam } = await context.params;
    const applicationId = Number(idParam || 0);
    if (!applicationId) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const body = await request.json();
    const merchantId = String(body.merchantId || "").trim();
    const trackingId = String(body.trackingId || "").trim();
    if (!merchantId || !trackingId) return NextResponse.json({ error: "MID and Tracking ID required" }, { status: 400 });
    const reviewerSub = payload?.sub;
    const reviewerUserId = typeof reviewerSub === "string" ? Number(reviewerSub) : (typeof reviewerSub === "number" ? reviewerSub : 0);
    await setApplicationApproval(applicationId, merchantId, trackingId, reviewerUserId || 0);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Approval failed" }, { status: 500 });
  }
}
