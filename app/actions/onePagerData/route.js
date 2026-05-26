import { NextResponse } from "next/server";
import { getSummary, msmeReport, webGetBusinessImage } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import { badRequest } from "@/lib/errors/apiError";
import { withRouteError } from "@/lib/errors/response";

function extractData(response) {
  return response?.encryptedResponse
    ? extractDataFromResponse(response)
    : response?.data ?? response?.DATA ?? response ?? {};
}

function firstRecord(value) {
  return Array.isArray(value) ? value[0] ?? {} : value ?? {};
}

function cleanBase64(value) {
  if (!value || typeof value !== "string") return "";
  return value.replace(/^data:image\/[a-zA-Z]+;base64,/, "").trim().replace(/\s/g, "");
}

export async function GET(request) {
  return withRouteError(async () => {
    const id = request.nextUrl.searchParams.get("id");
    const appId = request.nextUrl.searchParams.get("appId");

    if (!id || !appId) {
      throw badRequest("Missing id or appId");
    }

    const [summaryResponse, reportResponse, imageResponse] = await Promise.all([
      getSummary(id),
      msmeReport(appId),
      webGetBusinessImage(id).catch(() => ({ data: [] })),
    ]);

    const summary = firstRecord(extractData(summaryResponse));
    const report = extractData(reportResponse);
    const combined = report?.DATA ?? report ?? {};
    const imageRecord = firstRecord(extractData(imageResponse));

    return NextResponse.json({
      data: {
        ...combined?.CUSTOMER_DATA,
        ...combined?.BRANCH_DATA,
        ...combined?.GST_DATA,
        ...combined?.ACCOUNT_AGGREGATOR_DATA,
        ...summary,
        customer_image: cleanBase64(imageRecord?.customer_photo),
        business_image: cleanBase64(imageRecord?.business_image),
        application_id: appId,
      },
      msmedata: {
        ...combined?.BUREAU_DATA,
      },
      bredata: combined?.GOOGLE_DATA?.BRE_DETAILS || [],
      google: {
        ...combined?.GOOGLE_DATA,
      },
    });
  }, "Failed to build one pager data");
}
