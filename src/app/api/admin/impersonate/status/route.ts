import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/admin_session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const isAdmin = payload?.role === "admin";
    return NextResponse.json({ impersonating: Boolean(token && isAdmin) }, { status: 200 });
  } catch {
    return NextResponse.json({ impersonating: false }, { status: 200 });
  }
}
