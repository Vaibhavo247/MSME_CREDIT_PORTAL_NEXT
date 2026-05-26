import { NextResponse } from "next/server";
import { rejectDeviatedCase } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import { badRequest } from "@/lib/errors/apiError";
import { withRouteError } from "@/lib/errors/response";

function normalizeResponse(response) {
  if (response?.encryptedResponse) {
    return extractDataFromResponse(response);
  }

  return response?.decryptedData?.data ?? response?.data ?? response ?? null;
}

export async function POST(request) {
  return withRouteError(async () => {
    const payload = await request.json();

    if (!payload?.id || !payload?.approved_by || !payload?.credit_comment) {
      throw badRequest("Missing cancel case details");
    }

    const response = await rejectDeviatedCase(payload);
    return NextResponse.json({ data: normalizeResponse(response) });
  }, "Failed to cancel case");
}
