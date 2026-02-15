import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session")?.value || "";
  const payload = token ? await verifyToken(token) as { role?: string } : null;
  const valid = payload;
  const role = payload?.role;

  if (pathname.startsWith("/dashboard")) {
    if (!valid) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/portal") && pathname !== "/portal/entry") {
    if (!valid) {
      const entryUrl = new URL("/portal/entry", req.url);
      return NextResponse.redirect(entryUrl);
    }
  }

  if ((pathname === "/login" || pathname === "/signup") && valid) {
    if (role === "admin") {
      const adminUrl = new URL("/admin", req.url);
      return NextResponse.redirect(adminUrl);
    }
    if (role === "team") {
      const teamUrl = new URL("/team", req.url);
      return NextResponse.redirect(teamUrl);
    }
    const u = new URL("/dashboard", req.url);
    return NextResponse.redirect(u);
  }

  if (pathname.startsWith("/admin")) {
    if (!valid || role !== "admin") {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/team")) {
    if (!valid || role !== "team") {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/signup", "/portal/:path*", "/admin/:path*", "/team/:path*"],
};
