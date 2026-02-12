import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function GET(request: NextRequest, context: { params: Promise<{ applicationId: string }> }) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const role = payload?.role || "";
    if (role !== "team") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { applicationId: applicationIdParam } = await context.params;
    const applicationId = Number(applicationIdParam || 0);
    if (!applicationId) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const conn = await db.getConnection();
    try {
      const [rows] = await conn.query("SELECT data FROM submit WHERE application_id = ? LIMIT 1", [applicationId]);
      const row = Array.isArray(rows) ? (rows as Record<string, unknown>[])[0] || null : null;
      if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(row, { status: 200 });
    } finally {
      await conn.end();
    }
  } catch {
    return NextResponse.json({ error: "Submit detail failed" }, { status: 500 });
  }
}
