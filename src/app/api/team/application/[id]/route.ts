import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const role = payload?.role || "";
    if (role !== "team") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id: idParam } = await context.params;
    const id = Number(idParam || 0);
    if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const conn = await db.getConnection();
    try {
      const [rows] = await conn.query(
        "SELECT id, user_id, industry, processing_current, monthly_volume, us_citizen, active_us_bank, fees_payer, tag, status FROM applications WHERE id = ? LIMIT 1",
        [id]
      );
      const row = Array.isArray(rows) ? (rows as Record<string, unknown>[])[0] || null : null;
      if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(row, { status: 200 });
    } finally {
      await conn.end();
    }
  } catch {
    return NextResponse.json({ error: "Application detail failed" }, { status: 500 });
  }
}
