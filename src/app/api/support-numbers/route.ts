import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { ensurePortalSchema, listSupportNumbers, createSupportNumber, deleteSupportNumber } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const role = payload?.role || "";
    if (role !== "admin" && role !== "team") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await ensurePortalSchema();
    const rows = await listSupportNumbers();
    return NextResponse.json(rows, { status: 200 });
  } catch {
    return NextResponse.json({ error: "List failed" }, { status: 500 });
  }
}
