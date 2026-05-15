import "server-only";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const temporaryToken = cookieStore.get("temporary_token")?.value;
  console.log("Access Token:", accessToken, "Temporary Token:", temporaryToken);
  return accessToken || temporaryToken;
}

export async function getAgentToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("agent_token")?.value;
  console.log("Agent Token:", token);
  return token || null;
}

// Backward compatibility: access token only
export async function getAuthToken() {
  return getAccessToken();
}
