import { NextResponse } from "next/server";
import { pendingDeviatedCase } from "@/lib/api";
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

    if (!payload?.id || !payload?.approved_by || !payload?.credit_selective_comment) {
      throw badRequest("Missing pending case details");
    }

    const response = await pendingDeviatedCase(payload);
    return NextResponse.json({ data: normalizeResponse(response) });
  }, "Failed to mark case pending");
}
