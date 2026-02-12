import { NextResponse } from "next/server";
import { getOrCreateApplication, createDocument } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { sub?: number | string }) : null;
    const sub = payload?.sub;
    const userId = typeof sub === "string" ? Number(sub) : (typeof sub === "number" ? sub : 0);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const form = await request.formData();
    const docType = String(form.get("docType") || "").trim();
    const file = form.get("file") as File | null;
    if (!docType || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const app = await getOrCreateApplication(userId);
    const bytes = Buffer.from(await file.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), "uploads", String(app.id));
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    const ext = path.extname(file.name || "") || ".bin";
    const name = `${docType}-${Date.now()}${ext}`;
    const dest = path.join(uploadsDir, name);
    await fs.promises.writeFile(dest, bytes);
    const rel = path.relative(process.cwd(), dest).replace(/\\/g, "/");
    const id = await createDocument(app.id, docType, `/${rel}`);
    return NextResponse.json({ id, filePath: `/${rel}` }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
