"use server"
import { getCreditApprovedLoanRecords } from "@/lib/api";
import ApprovedClientPage from "./approvedclient";
import { extractDataFromResponse } from "@/lib/crypto";

export default async function ApprovedPage() {
  const resp = await getCreditApprovedLoanRecords();
  const initialData = extractDataFromResponse(resp);

  return (
    <div className="space-y-6">
      {/* Pass the server-fetched data to the Client Component */}
      < ApprovedClientPage initialData={initialData} />
    </div>
  );
}
