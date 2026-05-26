// lib/errors/errorCodes.js

export const ERROR_CODES = Object.freeze({
  // Authentication Errors
  AUTH_FAILED: "AUTH_401",
  TOKEN_EXPIRED: "AUTH_402",
  UNAUTHORIZED: "AUTH_403",

  // Bank Gateway / IBM API Errors
  GATEWAY_TIMEOUT: "BANK_504",
  INVALID_ACCOUNT: "BANK_404",
  INSUFFICIENT_PERMISSIONS: "BANK_403",

  // MSME Application Process Errors
  APPLICATION_NOT_FOUND: "MSME_404",
  VALIDATION_FAILED: "MSME_422",
  FILE_TOO_LARGE: "MSME_413",

  // Portal / Request Handling Errors
  BAD_REQUEST: "PORTAL_400",
  CONFIGURATION_ERROR: "PORTAL_500_CONFIG",
  INTERNAL_ERROR: "PORTAL_500",
});
