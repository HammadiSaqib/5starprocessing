import { NextResponse } from "next/server";
import { getAllCourses, createCourse } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token)) : null;
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const courses = await getAllCourses();
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1] || "";
    const payload = token ? (await verifyToken(token) as { role?: string }) : null;
    if (!payload || (payload.role !== "admin" && payload.role !== "team")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await request.json();
    const { title, description, course_url, thumbnail_url, product_file_url, videos } = body;
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const id = await createCourse({
      title,
      description: description || "",
      course_url,
      thumbnail_url,
      product_file_url,
    }, videos);
    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
