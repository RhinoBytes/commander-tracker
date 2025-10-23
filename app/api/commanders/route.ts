export const dynamic = "force-static";

import { NextRequest, NextResponse } from "next/server";

// Placeholder API route for commander data
// TODO: Integrate with database for caching Scryfall data

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Commander name required" },
      { status: 400 }
    );
  }

  // TODO: Check database for cached commander data
  // If not found, fetch from Scryfall and cache
  return NextResponse.json({
    message: "Database integration pending",
    name,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // TODO: Save commander data to database cache
  console.log("Saving commander data:", body);

  return NextResponse.json({
    message: "Commander data saved (placeholder)",
  });
}
