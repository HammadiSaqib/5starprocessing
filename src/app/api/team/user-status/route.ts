import { NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const role = payload?.role || "";
    if (role !== "team") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await request.json();
    const userId = Number(body.userId || 0);
    let status = String(body.status || "").trim();
    const reason = String(body.reason || "").trim() || null;
    if (!userId || !status) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    if (status === "Currently Posed") status = "Possed";
    const allowed = new Set(["Pending", "Approved", "Declined", "Possed"]);
    if (!allowed.has(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    const conn = await db.getConnection();
    try {
      await conn.query("UPDATE users SET status = ?, status_reason = ? WHERE id = ?", [status, reason, userId]);
      return NextResponse.json({ ok: true }, { status: 200 });
    } finally {
      await conn.end();
    }
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
