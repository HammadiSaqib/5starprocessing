import { NextResponse } from "next/server";
import db, { updateDocumentStatus } from "@/lib/db";
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
    } finally {
      await conn.end();
    }
    const body = await request.json();
    const documentId = Number(body.documentId || 0);
    const status = String(body.status || "");
    if (!documentId || !status) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    await updateDocumentStatus(documentId, userId, status);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
