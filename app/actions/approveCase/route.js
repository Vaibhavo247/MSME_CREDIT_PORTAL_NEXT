import { NextResponse } from "next/server";
import { updateDeviatedCase } from "@/lib/api";
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

    if (!payload?.id || !payload?.approved_by) {
      throw badRequest("Missing id or approved_by");
    }

    const response = await updateDeviatedCase(payload);
    return NextResponse.json({ data: normalizeResponse(response) });
  }, "Failed to approve case");
}
