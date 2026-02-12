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
      const [rows] = await conn.query(
        `SELECT s.application_id, s.updated_at, u.id AS user_id, u.name, u.email, u.status AS user_status, u.status_reason, a.tag, a.status AS app_status
         FROM submit s
         JOIN applications a ON a.id = s.application_id
         JOIN users u ON u.id = a.user_id
         ORDER BY s.updated_at DESC`
      );
      return NextResponse.json(rows, { status: 200 });
    } finally {
      await conn.end();
    }
  } catch {
    return NextResponse.json({ error: "Submints list failed" }, { status: 500 });
  }
}
