import { NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { RowDataPacket } from "mysql2";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agentId = Number(id);

    // Basic auth check
    const cookie = request.headers.get("cookie") || "";
    const token = cookie.match(/session=([^;]+)/)?.[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const payload = await verifyToken(token) as { role?: string };
    if (payload?.role !== "admin" && payload?.role !== "team") {
       // Should check if admin
    }

    const conn = await db.getConnection();
    try {
      // Fetch clients referred by this agent
      const [rows] = await conn.query<RowDataPacket[]>(
        "SELECT id, name, email, phone, status, created_at FROM users WHERE referred_by = ? ORDER BY created_at DESC",
        [agentId]
      );
      return NextResponse.json(rows);
    } finally {
      await conn.end();
    }
  } catch (error) {
    console.error("Failed to fetch agent clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}
