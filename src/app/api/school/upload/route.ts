import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    if (!payload || (payload.role !== "admin" && payload.role !== "team")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const type = form.get("type") as string || "misc"; // thumbnail or product
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    // Save to public/uploads/courses so it's accessible via URL
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "courses");
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    
    const ext = path.extname(file.name || "") || ".bin";
    const name = `${type}-${Date.now()}${ext}`;
    const dest = path.join(uploadsDir, name);
    
    await fs.promises.writeFile(dest, bytes);
    
    // Return the public URL path
    const publicPath = `/uploads/courses/${name}`;
    return NextResponse.json({ url: publicPath }, { status: 200 });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
