import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { findUserById, getReferrals, updateReferralSlug } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { sub?: number | string }) : null;
    const sub = payload?.sub;
    const userId = typeof sub === "string" ? Number(sub) : (typeof sub === "number" ? sub : 0);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await findUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Check if affiliate is approved
    if (user.affiliate_status !== 'approved') {
       return NextResponse.json({ error: "Not an affiliate" }, { status: 403 });
    }

    let slug = user.referral_slug;
    if (!slug) {
      // Generate slug
      const base = user.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'affiliate';
      const random = Math.floor(Math.random() * 10000);
      slug = `${base}-${random}`;
      await updateReferralSlug(userId, slug);
    }

    const referrals = await getReferrals(userId);

    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const referralUrl = `${protocol}://${host}/${slug}/signup`;

    return NextResponse.json({
      referralUrl,
      referrals
    }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
