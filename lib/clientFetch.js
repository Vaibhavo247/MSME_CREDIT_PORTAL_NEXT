import { ERROR_CODES } from "./errors/errorCodes";

function isSessionExpired(response, payload) {
  return (
    response.status === 401 ||
    payload?.code === ERROR_CODES.TOKEN_EXPIRED ||
    payload?.code === ERROR_CODES.AUTH_FAILED ||
    payload?.code === ERROR_CODES.UNAUTHORIZED
  );
}

function redirectToSessionExpiredLogin() {
  if (typeof window === "undefined") return;
  window.location.assign("/auth/logout?reason=session_expired");
}

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type");
  const payload = contentType?.includes("application/json")
    ? await response.json()
    : {};

  if (!response.ok) {
    if (isSessionExpired(response, payload)) {
      redirectToSessionExpiredLogin();
    }

    throw new Error(payload?.error || "Request failed");
  }

  return payload;
}

export function postJson(url, payload) {
  return fetchJson(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
