
import "server-only";
import { NextResponse } from 'next/server';


import {
  httpGet,
  httpPost,
  httpPut,
  httpPatch,
  httpDelete,
} from "./request";

import { getAccessToken, getAgentToken } from "./getAuthToken";
import { ERROR_CODES } from "./errors/errorCodes"; // Import your error codes

/* ====================================
   CENTRALIZED SERVER ERROR TRANSLATOR
   ==================================== */
async function executeAndTranslateErrors(requestPromise) {
  try {
    return await requestPromise;
  } catch (error) {
    // 1. If your underlying request handler passes back structured HTTP status codes
    const status = error?.response?.status || error?.status;
    
    if (status === 401) {
      throw new Error(ERROR_CODES.AUTH_FAILED);
    }
    if (status === 403) {
      throw new Error(ERROR_CODES.INSUFFICIENT_PERMISSIONS);
    }
    if (status === 504) {
      throw new Error(ERROR_CODES.GATEWAY_TIMEOUT);
    }

    // 2. Forward the original runtime error message if no matches hit
    throw error;
  }
}

/* =========================
   PUBLIC HTTP CLIENT
========================= */
export const publicHttp = {
  get: (url, headers) =>
    executeAndTranslateErrors(httpGet(url, headers)),

  post: (url, data, headers) =>
    executeAndTranslateErrors(httpPost(url, data, headers)),

  put: (url, data, headers) =>
    executeAndTranslateErrors(httpPut(url, data, headers)),

  patch: (url, data, headers) =>
    executeAndTranslateErrors(httpPatch(url, data, headers)),

  delete: (url, headers) =>
    executeAndTranslateErrors(httpDelete(url, headers)),
};

/* =========================
   AUTH HTTP CLIENT
========================= */
export const authHttp = {
  post: async (url, data, headers = {}) => {
    const token = await getAccessToken();
    console.log("Auth HTTP POST - Access Token:", token);
    if (!token) {
      throw new Error(ERROR_CODES.TOKEN_EXPIRED); // Centralized error code
    }

    return executeAndTranslateErrors(
      httpPost(url, data, {
        Authorization: `Bearer ${token}`,
        ...headers,
      })
    );
  },

  get: async (url, headers = {}) => {
    const token = await getAccessToken();
    if (!token) {
      throw new Error(ERROR_CODES.TOKEN_EXPIRED); // Centralized error code
    }

    return executeAndTranslateErrors(
      httpGet(url, {
        Authorization: `Bearer ${token}`,
        ...headers,
      })
    );
  },
};

/* =========================
   AGENT HTTP CLIENT
========================= */
export const agentHttp = {
  post: async (url, data, headers = {}) => {
    const token = await getAgentToken();
    if (!token) {
      throw new Error(ERROR_CODES.UNAUTHORIZED); // Centralized error code
    }

    return executeAndTranslateErrors(
      httpPost(url, data, {
        Authorization: `Bearer ${token}`,
        ...headers,
      })
    );
  },

  get: async (url, headers = {}) => {
    const token = await getAgentToken();
    if (!token) {

      console.log("===========token========",token)
      // NextResponse.redirect('http://localhost:3001/')
      //  throw new Error(ERROR_CODES.UNAUTHORIZED); // Centralized error code

      return

    }

    return executeAndTranslateErrors(
      httpGet(url, {
        Authorization: `Bearer ${token}`,
        ...headers,
      })
    );
  },
};
