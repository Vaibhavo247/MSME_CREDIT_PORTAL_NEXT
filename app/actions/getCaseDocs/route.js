import { NextResponse } from "next/server";
import { getCaseDocs, getCaseDocsWithAgentToken } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import { badRequest, isForbidden } from "@/lib/errors/apiError";
import { errorResponse } from "@/lib/errors/response";

function extractDocs(response) {
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
    const response = await getCaseDocs(id);
    return NextResponse.json({ data: extractDocs(response) });
  } catch (error) {
    if (!isForbidden(error)) {
      return errorResponse(error, "Failed to fetch case docs");
    }
  }

  try {
    const response = await getCaseDocsWithAgentToken(id);
    return NextResponse.json({ data: extractDocs(response) });
  } catch (error) {
    if (!isForbidden(error)) {
      return errorResponse(error, "Failed to fetch case docs");
    }

    return NextResponse.json({
      data: [],
      warning: "Case documents are not available for this user.",
    });
  }
}
