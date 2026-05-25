import { NextResponse } from "next/server";
import { getAgentAction } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const response = await getAgentAction(id);
    const data = response?.encryptedResponse
      ? extractDataFromResponse(response)
      : response?.data ?? response ?? {};

    return NextResponse.json(Array.isArray(data) ? data[0] ?? {} : data);
  } catch (error) {
    console.error("Failed to save agent action", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save agent action" },
      { status: 500 },
    );
  }
}
