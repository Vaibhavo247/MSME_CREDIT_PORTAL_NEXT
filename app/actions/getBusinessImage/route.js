import { NextResponse } from "next/server";
import { webGetBusinessImage, webGetBusinessImageWithAgentToken } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";

function extractImageData(response) {
  return response?.encryptedResponse
    ? extractDataFromResponse(response)
    : response?.data ?? [];
}

function isForbidden(error) {
  return String(error?.message || error).includes("FORBIDDEN");
}

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const response = await webGetBusinessImage(id);
    return NextResponse.json({ data: extractImageData(response) });
  } catch (error) {
    if (!isForbidden(error)) {
      console.error("Failed to fetch business image", error);
      return NextResponse.json(
        { error: error?.message || "Failed to fetch business image" },
        { status: 500 },
      );
    }
  }

  try {
    const response = await webGetBusinessImageWithAgentToken(id);
    return NextResponse.json({ data: extractImageData(response) });
  } catch (error) {
    if (!isForbidden(error)) {
      console.error("Failed to fetch business image with agent token", error);
      return NextResponse.json(
        { error: error?.message || "Failed to fetch business image" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: [],
      warning: "Business image is not available for this user.",
    });
  }
}
