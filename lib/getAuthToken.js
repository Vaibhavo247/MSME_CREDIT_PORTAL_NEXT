import "server-only";
import { cookies } from "next/headers";

function maskToken(token) {
  if (!token) return null;
  return `${token.slice(0, 8)}...${token.slice(-6)}`;
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const temporaryToken = cookieStore.get("temporary_token")?.value;
  console.log("Access Token:", maskToken(accessToken), "Temporary Token:", maskToken(temporaryToken));
  return accessToken || temporaryToken;
}

export async function getAgentToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("agent_token")?.value;
  console.log("Agent Token:", maskToken(token));
  return token || null;
}

// Backward compatibility: access token only
export async function getAuthToken() {
  return getAccessToken();
}
