import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { ensurePortalSchema, listSupportNumbers, createSupportNumber, deleteSupportNumber } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const role = payload?.role || "";
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await ensurePortalSchema();
    const rows = await listSupportNumbers();
    return NextResponse.json(rows, { status: 200 });
  } catch {
    return NextResponse.json({ error: "List failed" }, { status: 500 });
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
    await ensurePortalSchema();
    const body = await request.json();
    const number = String(body.number || "").trim();
    const label = String(body.label || "").trim();
    if (!number) return NextResponse.json({ error: "Number required" }, { status: 400 });
    await createSupportNumber(number, label || undefined);
    const rows = await listSupportNumbers();
    return NextResponse.json(rows, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    const role = payload?.role || "";
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await ensurePortalSchema();
    const body = await request.json();
    const id = Number(body.id || 0);
    if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    await deleteSupportNumber(id);
    const rows = await listSupportNumbers();
    return NextResponse.json(rows, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
