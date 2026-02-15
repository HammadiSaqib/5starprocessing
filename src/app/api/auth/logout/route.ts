import { NextResponse } from "next/server";

export const runtime = "nodejs";

function createLogoutResponse(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const proto = forwardedProto || (host.includes("localhost") || host.includes("127.0.0.1") || host.includes("0.0.0.0") ? "http" : "https");
  const target = host ? `${proto}://${host}/login` : "/login";
  const res = NextResponse.redirect(target);
  const isLocalHost = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("0.0.0.0");
  const isHttps = proto === "https" || request.url.startsWith("https://");
  const secureFlag = process.env.NODE_ENV === "production" && isHttps && !isLocalHost;
  res.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: secureFlag,
    path: "/",
    maxAge: 0,
  });
  return res;
}

export async function GET(request: Request) {
  return createLogoutResponse(request);
}

export async function POST(request: Request) {
  return createLogoutResponse(request);
}
