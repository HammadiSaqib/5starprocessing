import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getReferrals } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Admin check
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    if (payload?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const referrals = await getReferrals(Number(id));
    return NextResponse.json(referrals);
  } catch {
    return NextResponse.json({ error: "Failed to list referrals" }, { status: 500 });
  }
}
