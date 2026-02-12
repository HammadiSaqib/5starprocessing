import { NextResponse } from "next/server";
import { getOrCreateApplication, saveApplicationSection, markApplicationSubmitted, getApplicationStatusForUser, listDocumentsForApplication } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

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
    const body = await request.json();
    const action = String(body.action || "");
    const app = await getOrCreateApplication(userId);
    if (action === "save") {
      if (app.status !== "application" && app.status !== "resubmission") {
        return NextResponse.json({ error: "Video not completed" }, { status: 403 });
      }
      const section = String(body.section || "");
      const data = body.data || {};
      await saveApplicationSection(app.id, section, data);
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    if (action === "submit") {
      if (app.status !== "application" && app.status !== "resubmission") {
        return NextResponse.json({ error: "Video not completed" }, { status: 403 });
      }
      await markApplicationSubmitted(app.id);
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Application error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { sub?: number | string }) : null;
    const sub = payload?.sub;
    const userId = typeof sub === "string" ? Number(sub) : (typeof sub === "number" ? sub : 0);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const app = await getApplicationStatusForUser(userId);
    if (!app) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const docs = await listDocumentsForApplication(app.id as number);
    return NextResponse.json({ status: app.status, tag: app.tag, applicationId: app.id, documents: docs });
  } catch {
    return NextResponse.json({ error: "Status error" }, { status: 500 });
  }
}
