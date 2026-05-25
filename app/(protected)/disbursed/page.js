"use server";

import { getDisbursedRecords } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import DisbursedClientPage from "./disbursedclient";

export default async function DisbursedPage() {
  const response = await getDisbursedRecords();
  const initialData = extractDataFromResponse(response);

  return (
    <div className="space-y-6">
      <DisbursedClientPage initialData={initialData} />
    </div>
  );
}
