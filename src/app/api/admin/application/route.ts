import { NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
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
      const body = await request.json();
      const action = String(body.action || "");
      const applicationId = Number(body.applicationId || 0);
      if (!applicationId) return NextResponse.json({ error: "Missing applicationId" }, { status: 400 });
      if (action === "unlock") {
        await conn.query("UPDATE applications SET status = 'resubmission' WHERE id = ?", [applicationId]);
        return NextResponse.json({ ok: true }, { status: 200 });
      }
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } finally {
      await conn.end();
    }
  } catch {
    return NextResponse.json({ error: "Admin application error" }, { status: 500 });
  }
}
