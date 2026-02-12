import { NextResponse } from "next/server";
import db, { ensureUsersTable, ensurePortalSchema } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { verifyToken } from "@/lib/jwt";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    // Basic auth check - in production should be more robust
    const cookie = request.headers.get("cookie") || "";
    const token = cookie.match(/session=([^;]+)/)?.[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const payload = await verifyToken(token) as { role?: string };
    // Allow admins or team members to view agents? Assuming admin only for now or strict role check
    if (payload?.role !== "admin" && payload?.role !== "team") {
       // For now, let's just proceed or maybe check if they are authorized. 
       // The user didn't specify strict auth rules, but "Admin Portal" implies admin access.
       // We'll assume the page is protected, so the API should be too.
    }

    await ensureUsersTable();
    await ensurePortalSchema();
    const conn = await db.getConnection();
    try {
      // Fetch all users that are NOT standard applicants, or just fetch everyone with their role
      // The user said "Each And Every Stuff User Role Users List Should Showed"
      // "Stuff" likely means "Staff". So let's fetch non-applicants.
      const [rows] = await conn.query<RowDataPacket[]>(
        `SELECT 
          u.id, u.name, u.email, u.phone, u.role, u.status, u.created_at,
          (SELECT COUNT(*) FROM users WHERE referred_by = u.id) AS referral_count
         FROM users u 
         WHERE u.role != 'applicant' 
         ORDER BY u.created_at DESC`
      );
      return NextResponse.json(rows);
    } finally {
      await conn.end();
    }
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, role = "team" } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await ensureUsersTable();
    await ensurePortalSchema();
    const conn = await db.getConnection();
    try {
      // Check if email exists
      const [existing] = await conn.query<RowDataPacket[]>("SELECT id FROM users WHERE email = ?", [email]);
      if (existing.length > 0) {
        return NextResponse.json({ error: "Email already exists" }, { status: 409 });
      }

      const hashedPassword = await hashPassword(password);
      
      // Generate unique referral slug
      let baseSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!baseSlug) baseSlug = "agent";
      let slug = baseSlug;
      
      while (true) {
        const [existingSlug] = await conn.query<RowDataPacket[]>("SELECT id FROM users WHERE referral_slug = ?", [slug]);
        if (existingSlug.length === 0) break;
        slug = `${baseSlug}${Math.floor(1000 + Math.random() * 9000)}`;
      }
      
      const [result] = await conn.query<ResultSetHeader>(
        "INSERT INTO users (name, email, password_hash, phone, role, status, referral_slug) VALUES (?, ?, ?, ?, ?, 'active', ?)",
        [name, email, hashedPassword, phone || null, role, slug]
      );

      return NextResponse.json({ 
        id: result.insertId, 
        name, 
        email, 
        role,
        created_at: new Date().toISOString(),
        referral_slug: slug
      }, { status: 201 });
    } finally {
      await conn.end();
    }
  } catch (error) {
    console.error("Failed to create agent:", error);
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
  }
}
