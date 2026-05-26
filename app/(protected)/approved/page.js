"use server"
import { getCreditApprovedLoanRecords } from "@/lib/api";
import ApprovedClientPage from "./approvedclient";
import { extractDataFromResponse } from "@/lib/crypto";
import ErrorState from "@/components/ErrorState";
import { getDisplayError } from "@/lib/errors/apiError";

export default async function ApprovedPage() {
  let initialData = [];

  try {
    const resp = await getCreditApprovedLoanRecords();
    initialData = extractDataFromResponse(resp);
  } catch (error) {
    return <ErrorState title="Unable to load approved cases" message={getDisplayError(error)} />;
  }

  return (
    <div className="space-y-6">
      {/* Pass the server-fetched data to the Client Component */}
      < ApprovedClientPage initialData={initialData} />
    </div>
  );
}
