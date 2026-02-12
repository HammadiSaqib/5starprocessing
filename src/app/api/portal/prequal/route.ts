import { NextResponse } from "next/server";
import { getOrCreateApplication, savePrequal } from "@/lib/db";
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
    const data = {
      industry: String(body.industry || "").trim(),
      processing_current: Boolean(body.processing_current),
      monthly_volume: Number(body.monthly_volume || 0),
      us_citizen: Boolean(body.us_citizen),
      active_us_bank: Boolean(body.active_us_bank),
      fees_payer: String(body.fees_payer || "").trim(),
    };
    if (!data.industry || !data.fees_payer) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const app = await getOrCreateApplication(userId);
    const result = await savePrequal(app.id, data);
    const next =
      result.status === "disqualified" ? "/portal/disqualified" : "/portal/video";
    return NextResponse.json({ tag: result.tag, status: result.status, next }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Prequal failed" }, { status: 500 });
  }
}
