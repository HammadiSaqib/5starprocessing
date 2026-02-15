import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const adminToken = request.headers.get("cookie")?.match(/admin_session=([^;]+)/)?.[1] || "";
    const payload = adminToken ? (await verifyToken(adminToken) as { role?: string }) : null;
    if (payload?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true, next: "/admin/applications" }, { status: 200 });
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost || request.headers.get("host") || "";
    const isLocalHost = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("0.0.0.0");
    const xfProto = request.headers.get("x-forwarded-proto") || "";
    const isHttps = xfProto === "https" || request.url.startsWith("https://");
    const secureFlag = process.env.NODE_ENV === "production" && isHttps && !isLocalHost;
    res.cookies.set("session", adminToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureFlag,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookies.set("admin_session", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: secureFlag,
      path: "/",
      maxAge: 0,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Failed to stop impersonation" }, { status: 500 });
  }
}
