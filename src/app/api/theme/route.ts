import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { ensurePortalSchema, getApplicationTheme, updateApplicationTheme } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await ensurePortalSchema();
    const theme = await getApplicationTheme();
    return NextResponse.json(theme, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Theme load failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const role = payload?.role || "";
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await request.json();
    const colors = {
      50: String(body["50"] || ""),
      100: String(body["100"] || ""),
      200: String(body["200"] || ""),
      300: String(body["300"] || ""),
      400: String(body["400"] || ""),
      500: String(body["500"] || ""),
      600: String(body["600"] || ""),
      700: String(body["700"] || ""),
      800: String(body["800"] || ""),
      900: String(body["900"] || ""),
      950: String(body["950"] || ""),
    };
    await updateApplicationTheme(colors);
    const theme = await getApplicationTheme();
    const globalsPath = path.join(process.cwd(), "src", "app", "globals.css");
    try {
      const original = await fs.readFile(globalsPath, "utf8");
      const shades = ["50","100","200","300","400","500","600","700","800","900","950"] as const;
      let updated = original;
      for (const s of shades) {
        const re = new RegExp(`(--brand-${s}:\\s*)(#[0-9a-fA-F]{3,8})([^;]*;)`, "i");
        updated = updated.replace(re, `$1${theme[s]}$3`);
      }
      await fs.writeFile(globalsPath, updated, "utf8");
    } catch {}
    return NextResponse.json(theme, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Theme update failed" }, { status: 500 });
  }
}
