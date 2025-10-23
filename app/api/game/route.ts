export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";

// Placeholder API route for game state management
// TODO: Integrate with database

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("id");

  if (!gameId) {
    return NextResponse.json({ error: "Game ID required" }, { status: 400 });
  }

  // TODO: Fetch game state from database
  return NextResponse.json({
    message: "Database integration pending",
    gameId,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // TODO: Save game state to database
  console.log("Saving game state:", body);

  return NextResponse.json({
    message: "Game state saved (placeholder)",
    gameId: "generated-id-here",
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("id");

  if (!gameId) {
    return NextResponse.json({ error: "Game ID required" }, { status: 400 });
  }

  // TODO: Delete game state from database
  console.log("Deleting game:", gameId);

  return NextResponse.json({
    message: "Game deleted (placeholder)",
  });
}
