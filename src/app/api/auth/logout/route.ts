import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const proto = forwardedProto || (host.includes("localhost") || host.includes("127.0.0.1") || host.includes("0.0.0.0") ? "http" : "https");
  const target = host ? `${proto}://${host}/login` : "/login";
  const res = NextResponse.redirect(target);
  res.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
