import { NextResponse } from "next/server";
import { setVideoProgress, getVideoProgress } from "@/lib/db";
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
    const videoId = String(body.videoId || "default");
    const percent = Number(body.percent || 0);
    await setVideoProgress(userId, videoId, percent);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Video progress error" }, { status: 500 });
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
    const { searchParams } = new URL(request.url);
    const videoId = String(searchParams.get("videoId") || "default");
    const progress = await getVideoProgress(userId, videoId);
    return NextResponse.json(progress, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Video progress error" }, { status: 500 });
  }
}
