import OnePagerClient from "@/components/onepager/OnePagerClient";
import { getAllRecords } from "@/lib/api";
import { extractDataFromResponse } from "@/lib/crypto";
import { getDisplayError } from "@/lib/errors/apiError";

export default async function OnePagerPage() {
  let initialData = [];
  let error = "";

  try {
    const response = await getAllRecords();
    initialData = response?.encryptedResponse
      ? extractDataFromResponse(response)
      : response?.data ?? [];
  } catch (loadError) {
    error = getDisplayError(loadError, "Unable to load one pager records");
  }

  return <OnePagerClient initialData={initialData} initialError={error} />;
}
