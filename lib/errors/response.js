import { NextResponse } from "next/server";
import { toApiError } from "./apiError";

export function errorResponse(error, fallbackMessage = "Request failed") {
  const apiError = toApiError(error, fallbackMessage);

  if (apiError.status >= 500) {
    console.error(apiError.message, apiError.cause || apiError);
  }

  return NextResponse.json(
    {
      error: apiError.message,
      code: apiError.code,
      details: apiError.details,
    },
    { status: apiError.status },
  );
}

export async function withRouteError(handler, fallbackMessage) {
  try {
    return await handler();
  } catch (error) {
    return errorResponse(error, fallbackMessage);
  }
}
