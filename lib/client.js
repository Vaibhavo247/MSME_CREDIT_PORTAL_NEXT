
import "server-only";


import {
  httpGet,
  httpPost,
  httpPut,
  httpPatch,
  httpDelete,
} from "./request";

import { getAccessToken, getAgentToken } from "./getAuthToken";
import { ERROR_CODES } from "./errors/errorCodes"; // Import your error codes
import { ApiError, isApiError } from "./errors/apiError";

/* ====================================
   CENTRALIZED SERVER ERROR TRANSLATOR
   ==================================== */
async function executeAndTranslateErrors(requestPromise) {
  try {
    return await requestPromise;
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }

    // 1. If your underlying request handler passes back structured HTTP status codes
    const status = error?.response?.status || error?.status;
    
    if (status === 401) {
      throw new ApiError({ status, code: ERROR_CODES.AUTH_FAILED });
    }
    if (status === 403) {
      throw new ApiError({ status, code: ERROR_CODES.INSUFFICIENT_PERMISSIONS });
    }
    if (status === 504) {
      throw new ApiError({ status, code: ERROR_CODES.GATEWAY_TIMEOUT });
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
    if (!token) {
      throw new ApiError({ status: 401, code: ERROR_CODES.TOKEN_EXPIRED });
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
      throw new ApiError({ status: 401, code: ERROR_CODES.TOKEN_EXPIRED });
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
      throw new ApiError({ status: 401, code: ERROR_CODES.UNAUTHORIZED });
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
      throw new ApiError({ status: 401, code: ERROR_CODES.UNAUTHORIZED });
    }

    return executeAndTranslateErrors(
      httpGet(url, {
        Authorization: `Bearer ${token}`,
        ...headers,
      })
    );
  },
};
