"use server"
import { getCreditApprovedLoanRecords } from "@/lib/api";
import ApprovedClientPage from "./approvedclient";
import { extractDataFromResponse } from "@/lib/crypto";

export default async function ApprovedPage() {
  let initialData = [];

  try {
    const resp = await getCreditApprovedLoanRecords();
    initialData = extractDataFromResponse(resp);
  } catch (error) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-red-600">Unable to load approved cases</h3>
        <p className="text-sm text-gray-700">{String(error?.message || error)}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pass the server-fetched data to the Client Component */}
      < ApprovedClientPage initialData={initialData} />
    </div>
  );
}
