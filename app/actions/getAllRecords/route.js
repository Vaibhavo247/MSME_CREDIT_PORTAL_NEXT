import { NextResponse } from "next/server";
import { getAllRecords } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import { withRouteError } from "@/lib/errors/response";

export async function GET() {
  return withRouteError(async () => {
    const response = await getAllRecords();
    const data = response?.encryptedResponse
      ? extractDataFromResponse(response)
      : response?.data ?? [];

    return NextResponse.json({ data });
  }, "Failed to fetch one pager records");
}
