import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { listAffiliates, updateUserAffiliateStatus } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    if (payload?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const affiliates = await listAffiliates();
    return NextResponse.json(affiliates);
  } catch {
    return NextResponse.json({ error: "Failed to list affiliates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    if (payload?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, status } = body;
    
    if (!userId || !status) {
       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await updateUserAffiliateStatus(userId, status);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
