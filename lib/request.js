import "server-only";
import { legacyDispatcher } from "./legacyDispatcher";
const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

// NOTE: For development purposes only
if (!isProd) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const BASE_URL = process.env.BASE_URL;

async function triggerLogout() {
  try {
    // no-op: without request context, fall back to cookie cleanup below
  } catch {
    // fall through to cookie cleanup
  }

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    allCookies.forEach((cookie) => {
      cookieStore.set(cookie.name, "", { path: "/", maxAge: 0 });
    });
  } catch {
    // no-op
  }
}

/**
 * POST interceptor (axios-style)
 * Modify payload / headers / logging here
 */
async function postInterceptor({ url, data, headers }) {
  // Example: log or mutate payload
  console.log("📨 POST:", url, data);

  return {
    url,
    data,
    headers,
  };
}


async function coreRequest(method, url, data, headers = {}) {
 let finalUrl = `${BASE_URL}${url}`;
 let finalData = data;
 let finalHeaders = headers;
if (method === "POST") {
  const intercepted = await postInterceptor({
   url: finalUrl,
   data,
   headers,
  });
finalUrl = intercepted.url;
  finalData = intercepted.data;
  finalHeaders = intercepted.headers;
 }
const res = await fetch(finalUrl, {
  method,
  headers: {
   Accept: "/", // allow pdf + json
   ...(finalData && { "Content-Type": "application/json" }),
   ...finalHeaders,
  },
  dispatcher: legacyDispatcher,
  body: finalData ? JSON.stringify(finalData) : undefined,
  cache: "no-store",
 });
const contentType = res.headers.get("content-type");
console.log("➡️", method, finalUrl);
console.log("Authorization header:", finalHeaders.Authorization);
 console.log("STATUS:", res.status);
 console.log("CONTENT TYPE:", contentType);
if (res.status === 401) {
  await triggerLogout();
  throw new Error("SESSION_EXPIRED");
 }
if (res.status === 403) {
  throw new Error("FORBIDDEN: Insufficient permissions");
}
if (!res.ok) {
  const errorText = await res.text();
  throw new Error(parseError(errorText, res.status));
 }
/* ===============================
   HANDLE RESPONSE BY TYPE
 ================================= */
// ✅ If JSON
 if (contentType?.includes("application/json")) {
  return await res.json();
 }
// ✅ If PDF
 if (contentType?.includes("application/pdf")) {
  return await res.blob();
 }
// ✅ Fallback (text)
 return await res.text();
 
  // legacy/simple request implementation removed — using canonical coreRequest below

// async function coreRequest(method, url, data, headers = {}) {
//   let finalUrl = `${BASE_URL}${url}`;
//   let finalData = data;
//   let finalHeaders = headers;

//   // 🔁 Intercept POST requests only
//   if (method === "POST") {
//     const intercepted = await postInterceptor({
//       url: finalUrl,
//       data,
//       headers,
//     });

//     finalUrl = intercepted.url;
//     finalData = intercepted.data;
//     finalHeaders = intercepted.headers;
//   }

//   const res = await fetch(finalUrl, {
//     method,
//     headers: {
//       Accept: "application/json",
//       ...(finalData && { "Content-Type": "application/json" }),
//       ...finalHeaders,
//     },
//     dispatcher: legacyDispatcher,
//     body: finalData ? JSON.stringify(finalData) : undefined,
//     cache: "no-store",
//   });

//   const text = await res.text();

//   console.log("➡️", method, finalUrl);
//   console.log("STATUS:", res.status);
//   console.log("BODY:", text);

//   if (res.status === 401) {
//     console.log("🔒 401 detected");
//     throw new Error("SESSION_EXPIRED");
//   }

//   if (text.includes("Token expired") || text.includes("unauthorized")) {
//     console.log("🔒 Token expired in body");
//     throw new Error("SESSION_EXPIRED");
//   }

//   if (!res.ok || text.includes("error")) {
//     throw new Error(parseError(text, res.status));
//   }

//   return text ? JSON.parse(text) : null;
// }
// (kept single canonical coreRequest implementation below)

function parseError(text, status) {
  try {
    const json = JSON.parse(text);
    return (
      json?.errors?.Error?.Description || json?.message || `HTTP ${status}`
    );
  } catch {
    return `HTTP ${status}`;
  }
}
}

// async function coreRequest(method, url, data = null, headers = {}) {
//   const targetUrl = `${BASE_URL}${url}`;

//   const config = {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//       ...headers,
//     },
//     next: { revalidate: 0 } // Disables aggressive server caching for real-time bank data
//   };

//   if (data) {
//     config.body = JSON.stringify(data);
//   }

//   try {
//     const response = await fetch(targetUrl, config);

//     // 1. If response is not ok (status code is not 2xx)
//     if (!response.ok) {
//       const rawText = await response.text();
//       const parsedMessage = parseError(rawText, response.status);

//       // Create a unified error object that client.js can intercept easily
//       const networkError = {
//         status: response.status,
//         message: parsedMessage,
//         isApiError: true
//       };

//       throw networkError;
//     }

//     // 2. Handle empty response states safely
//     if (response.status === 204) return { data: null };

//     // 3. Return clean JSON data payload
//     const result = await response.json();
//     return { data: result };

//   } catch (error) {
//     // If it's already a formatted API error, pass it up; otherwise handle network drops
//     if (error.isApiError) throw error;
    
//     throw {
//       status: 500,
//       message: error.message || "Network Connection Failed",
//       isApiError: true
//     };
//   }
// }


/* ==============================
   EXPORTED HTTP METHODS
================================ */

export const httpGet = (url, headers) => coreRequest("GET", url, null, headers);

export const httpPost = (url, data, headers) =>
  coreRequest("POST", url, data, headers);

export const httpPut = (url, data, headers) =>
  coreRequest("PUT", url, data, headers);

export const httpPatch = (url, data, headers) =>
  coreRequest("PATCH", url, data, headers);

export const httpDelete = (url, headers) =>
  coreRequest("DELETE", url, null, headers);
