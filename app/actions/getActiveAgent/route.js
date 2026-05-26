import { NextResponse } from "next/server";
import { getActiveAgent } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import { badRequest } from "@/lib/errors/apiError";
import { withRouteError } from "@/lib/errors/response";

export async function GET(request) {
  return withRouteError(async () => {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) throw badRequest("Missing id");

    const response = await getActiveAgent(id);
    const data = response?.encryptedResponse
      ? extractDataFromResponse(response)
      : response?.data ?? response ?? {};

    return NextResponse.json(Array.isArray(data) ? data[0] ?? {} : data);
  }, "Failed to fetch active agent");
}
