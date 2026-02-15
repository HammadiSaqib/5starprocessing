import { NextResponse } from "next/server";
import { upsertUserAuto, getOrCreateApplication, queueNotification } from "@/lib/db";
import { signToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").toLowerCase().trim();
    const phone = String(body.phone || "").trim();
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const userId = await upsertUserAuto(name, email, phone);
    const app = await getOrCreateApplication(userId);
    await queueNotification(userId, app.id, "email", "started_incomplete", 24);
    const token = await signToken({ sub: userId, email, role: "applicant", appStatus: "prequal" });
    const res = NextResponse.json({ next: "/portal/prequal" }, { status: 200 });
    res.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Entry failed" }, { status: 500 });
  }
}
