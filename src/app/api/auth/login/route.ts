import { NextResponse } from "next/server";
import { findUserByEmail, ensurePortalSchema, getApplicationStatusForUser, getOrCreateApplication } from "@/lib/db";
import { comparePassword } from "@/lib/auth";
import { signToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await comparePassword(password, user.password_hash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    await ensurePortalSchema();

    const role = user.role || "applicant";
    let appStatus = "prequal";
    let next = "/portal/prequal";
    if (role === "admin") {
      next = "/admin";
    } else if (role === "team") {
      next = "/team";
    } else {
      const existing = await getApplicationStatusForUser(user.id);
      if (!existing) {
        const app = await getOrCreateApplication(user.id);
        appStatus = String(app.status || "prequal");
      } else {
        appStatus = String(existing.status || "prequal");
      }
      next = "/dashboard";
    }

    const token = await signToken({ sub: user.id, email, role, appStatus });
    const res = NextResponse.json({ id: user.id, name: user.name, email, role, appStatus, next }, { status: 200 });
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost || request.headers.get("host") || "";
    const isLocalHost = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("0.0.0.0");
    const xfProto = request.headers.get("x-forwarded-proto") || "";
    const isHttps = xfProto === "https" || request.url.startsWith("https://");
    const secureFlag = process.env.NODE_ENV === "production" && isHttps && !isLocalHost;
    res.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureFlag,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error("Login error", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
