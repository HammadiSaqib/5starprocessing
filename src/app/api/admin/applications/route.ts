import { NextResponse } from "next/server";
import db, { ensurePortalSchema } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await ensurePortalSchema();
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { sub?: number | string }) : null;
    const sub = payload?.sub;
    const userId = typeof sub === "string" ? Number(sub) : (typeof sub === "number" ? sub : 0);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const conn = await db.getConnection();
    try {
      const [meRows] = await conn.query("SELECT role FROM users WHERE id = ?", [userId]);
      const meRole = Array.isArray(meRows) ? (meRows as { role: string }[])[0]?.role : undefined;
      if (!meRole || (meRole !== "admin" && meRole !== "team")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
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
