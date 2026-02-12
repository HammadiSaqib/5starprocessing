import { NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { sub?: number | string, role?: string }) : null;
    const role = payload?.role || "";
    if (role !== "team") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const conn = await db.getConnection();
    try {
      const [rows] = await conn.query(`
        SELECT a.*, u.name, u.email, u.phone
        FROM applications a
        JOIN users u ON u.id = a.user_id
        ORDER BY a.created_at DESC
      `);
      return NextResponse.json(rows, { status: 200 });
    } finally {
      await conn.end();
    }
  } catch {
    return NextResponse.json({ error: "List failed" }, { status: 500 });
  }
}
