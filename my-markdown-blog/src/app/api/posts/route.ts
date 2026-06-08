// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getAllPosts } from "../../../lib/markdown";
export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 },
    );
  }
}
