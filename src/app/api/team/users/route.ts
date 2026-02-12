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
        "SELECT id, name, email, phone, status, status_reason, created_at, referred_by FROM users WHERE role = 'applicant' ORDER BY created_at DESC"
      );
      return NextResponse.json(rows, { status: 200 });
    } finally {
      await conn.end();
    }
  } catch {
    return NextResponse.json({ error: "Users list failed" }, { status: 500 });
  }
}
