// lib/errors/errorMessages.js
import { ERROR_CODES } from "./errorCodes";

export const ERROR_MESSAGES = Object.freeze({
  [ERROR_CODES.AUTH_FAILED]: "Invalid credentials. Please verify your token and try again.",
  [ERROR_CODES.TOKEN_EXPIRED]: "Your secure session has expired. Please log in again.",
  [ERROR_CODES.UNAUTHORIZED]: "You are not authorized to access this resource.",
  [ERROR_CODES.INSUFFICIENT_PERMISSIONS]: "You do not have permission to access this resource.",
  [ERROR_CODES.GATEWAY_TIMEOUT]: "The banking gateway is currently unreachable. Retrying shortly.",
  [ERROR_CODES.APPLICATION_NOT_FOUND]: "The requested MSME Application_Id  not  found.",
  [ERROR_CODES.VALIDATION_FAILED]: "Please check the submitted details and try again.",
  [ERROR_CODES.BAD_REQUEST]: "Required request details are missing or invalid.",
  [ERROR_CODES.CONFIGURATION_ERROR]: "Portal configuration is missing. Contact portal support.",
  [ERROR_CODES.INTERNAL_ERROR]: "An unexpected system error occurred. Contact portal support.",
});

// Helper function to safely get a message
export function getErrorMessage(code) {
  return ERROR_MESSAGES[code] || "An unexpected system error occurred. Contact portal support.";
}
