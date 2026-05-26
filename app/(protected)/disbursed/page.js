"use server";

import { getDisbursedRecords } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import DisbursedClientPage from "./disbursedclient";
import ErrorState from "@/components/ErrorState";
import { getDisplayError } from "@/lib/errors/apiError";

export default async function DisbursedPage() {
  let initialData = [];

  try {
    const response = await getDisbursedRecords();
    initialData = extractDataFromResponse(response);
  } catch (error) {
    return <ErrorState title="Unable to load disbursed cases" message={getDisplayError(error)} />;
  }

  return (
    <div className="space-y-6">
      <DisbursedClientPage initialData={initialData} />
    </div>
  );
}
