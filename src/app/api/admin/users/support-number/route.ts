import { NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const role = payload?.role || "";
    
    if (role !== "admin" && role !== "team") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, customSupportNumber } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const conn = await db.getConnection();
    try {
      await conn.query(
        "UPDATE users SET custom_support_number = ? WHERE id = ?",
        [customSupportNumber || null, userId]
      );
      return NextResponse.json({ success: true });
    } finally {
      await conn.end();
    }
  } catch (error) {
    console.error("Failed to update support number:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
