import { NextResponse } from "next/server";
import { ensureUsersTable, ensurePortalSchema, findUserByEmail, createUser, findUserByReferralSlug, getOrCreateApplication } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { signToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");
    const referralCode = String(body.referral_slug || "").trim();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await ensureUsersTable();
    await ensurePortalSchema();

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    let referredBy: number | undefined;
    if (referralCode) {
      const referrer = await findUserByReferralSlug(referralCode);
      if (referrer) {
        referredBy = referrer.id;
      }
    }

    const passwordHash = await hashPassword(password);
    // Note: We don't generate a referral slug for applicants by default, only for agents
    const userId = await createUser(name, email, passwordHash, undefined, referredBy);
    await getOrCreateApplication(userId);
    const token = await signToken({ sub: userId, email, role: "applicant", appStatus: "prequal" });

    const res = NextResponse.json({ id: userId, name, email }, { status: 201 });
    const xfProto = request.headers.get("x-forwarded-proto") || "";
    const secureFlag = process.env.NODE_ENV === "production" && xfProto === "https";
    res.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureFlag,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error("Signup error", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
