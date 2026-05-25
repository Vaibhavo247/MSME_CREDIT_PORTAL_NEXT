import { NextResponse } from "next/server";
import { getSummary } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const response = await getSummary(id);
    return NextResponse.json({ data: extractDataFromResponse(response) });
  } catch (error) {
    console.error("Failed to fetch summary", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch summary" },
      { status: 500 },
    );
  }
}
