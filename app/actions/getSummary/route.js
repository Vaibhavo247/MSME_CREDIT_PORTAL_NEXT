import { NextResponse } from "next/server";
import { getSummary } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import { badRequest } from "@/lib/errors/apiError";
import { withRouteError } from "@/lib/errors/response";

export async function GET(request) {
  return withRouteError(async () => {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) throw badRequest("Missing id");

    const response = await getSummary(id);
    return NextResponse.json({ data: extractDataFromResponse(response) });
  }, "Failed to fetch summary");
}
