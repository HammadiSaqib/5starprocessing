 import { NextResponse } from "next/server";
 import { ensureUsersTable, ensurePortalSchema, findUserByEmail, createUser, getOrCreateApplication } from "@/lib/db";
 import { hashPassword } from "@/lib/auth";
 import { signToken } from "@/lib/jwt";
 import db from "@/lib/db";
 
 export const runtime = "nodejs";
 
 export async function POST(request: Request) {
   try {
     const body = await request.json();
     const name = String(body.name || "").trim();
     const email = String(body.email || "").toLowerCase().trim();
     const password = String(body.password || "");
 
     if (!name || !email || !password) {
       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
     }
 
     await ensureUsersTable();
     await ensurePortalSchema();
 
     const existing = await findUserByEmail(email);
     if (existing) {
       return NextResponse.json({ error: "Email already registered" }, { status: 409 });
     }
 
     const passwordHash = await hashPassword(password);
     const userId = await createUser(name, email, passwordHash);
 
     const app = await getOrCreateApplication(userId);
     const conn = await db.getConnection();
     try {
       await conn.query("UPDATE applications SET status = 'application' WHERE id = ?", [app.id]);
     } finally {
       await conn.end();
     }
 
    const token = await signToken({ sub: userId, email, role: "applicant" });
    const res = NextResponse.json({ id: userId, next: "/dashboard" }, { status: 201 });
     res.cookies.set("session", token, {
       httpOnly: true,
       sameSite: "lax",
       secure: process.env.NODE_ENV === "production",
       path: "/",
       maxAge: 60 * 60 * 24 * 7,
     });
     return res;
   } catch (err) {
     console.error("Admin-ref signup error", err);
     return NextResponse.json({ error: "Signup failed" }, { status: 500 });
   }
 }
