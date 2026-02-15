import { NextResponse } from "next/server";
import { findUserById, ensurePortalSchema, getApplicationStatusForUser, getOrCreateApplication } from "@/lib/db";
import { verifyToken, signToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    if (payload?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const userId = Number(body.userId || 0);
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const user = await findUserById(userId);
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const role = String((user as { role?: string }).role || "applicant").toLowerCase();
    if (role !== "applicant") {
      return NextResponse.json({ error: "Only clients can be opened" }, { status: 400 });
    }

    await ensurePortalSchema();
    const existing = await getApplicationStatusForUser(userId);
    const appStatus = existing ? String(existing.status || "prequal") : String((await getOrCreateApplication(userId)).status || "prequal");

    const newToken = await signToken({ sub: user.id, email: user.email, role, appStatus });
    const res = NextResponse.json({ ok: true, next: "/dashboard" }, { status: 200 });
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost || request.headers.get("host") || "";
    const isLocalHost = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("0.0.0.0");
    const xfProto = request.headers.get("x-forwarded-proto") || "";
    const isHttps = xfProto === "https" || request.url.startsWith("https://");
    const secureFlag = process.env.NODE_ENV === "production" && isHttps && !isLocalHost;
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureFlag,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookies.set("session", newToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureFlag,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Impersonation failed" }, { status: 500 });
  }
}
