import { NextResponse } from "next/server";
import { webGetBusinessImage, webGetBusinessImageWithAgentToken } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import { badRequest, isForbidden } from "@/lib/errors/apiError";
import { errorResponse } from "@/lib/errors/response";

function extractImageData(response) {
  return response?.encryptedResponse
    ? extractDataFromResponse(response)
    : response?.data ?? [];
}

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return errorResponse(badRequest("Missing id"));
  }

  try {
    const response = await webGetBusinessImage(id);
    return NextResponse.json({ data: extractImageData(response) });
  } catch (error) {
    if (!isForbidden(error)) {
      return errorResponse(error, "Failed to fetch business image");
    }
  }

  try {
    const response = await webGetBusinessImageWithAgentToken(id);
    return NextResponse.json({ data: extractImageData(response) });
  } catch (error) {
    if (!isForbidden(error)) {
      return errorResponse(error, "Failed to fetch business image");
    }

    return NextResponse.json({
      data: [],
      warning: "Business image is not available for this user.",
    });
  }
}
