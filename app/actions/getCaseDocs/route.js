import { NextResponse } from "next/server";
import { getCaseDocs, getCaseDocsWithAgentToken } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";

function extractDocs(response) {
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
    const response = await getCaseDocs(id);
    return NextResponse.json({ data: extractDocs(response) });
  } catch (error) {
    if (!isForbidden(error)) {
      console.error("Failed to fetch case docs", error);
      return NextResponse.json(
        { error: error?.message || "Failed to fetch case docs" },
        { status: 500 },
      );
    }
  }

  try {
    const response = await getCaseDocsWithAgentToken(id);
    return NextResponse.json({ data: extractDocs(response) });
  } catch (error) {
    if (!isForbidden(error)) {
      console.error("Failed to fetch case docs with agent token", error);
      return NextResponse.json(
        { error: error?.message || "Failed to fetch case docs" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: [],
      warning: "Case documents are not available for this user.",
    });
  }
}
