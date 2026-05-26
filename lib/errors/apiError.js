import { ERROR_CODES } from "./errorCodes";
import { getErrorMessage } from "./errorMessages";

export class ApiError extends Error {
  constructor({
    message,
    status = 500,
    code = ERROR_CODES.INTERNAL_ERROR,
    details,
    cause,
  }) {
    super(message || getErrorMessage(code), { cause });
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function isApiError(error) {
  return error instanceof ApiError || Boolean(error?.status && error?.code);
}

export function toApiError(error, fallbackMessage = getErrorMessage(ERROR_CODES.INTERNAL_ERROR)) {
  if (isApiError(error)) {
    return error;
  }

  if (error?.message === ERROR_CODES.TOKEN_EXPIRED) {
    return new ApiError({
      status: 401,
      code: ERROR_CODES.TOKEN_EXPIRED,
      message: getErrorMessage(ERROR_CODES.TOKEN_EXPIRED),
      cause: error,
    });
  }

  if (error?.message === ERROR_CODES.UNAUTHORIZED) {
    return new ApiError({
      status: 401,
      code: ERROR_CODES.UNAUTHORIZED,
      message: getErrorMessage(ERROR_CODES.UNAUTHORIZED),
      cause: error,
    });
  }

  return new ApiError({
    status: error?.status || 500,
    code: error?.code || ERROR_CODES.INTERNAL_ERROR,
    message: error?.message || fallbackMessage,
    cause: error,
  });
}

export function badRequest(message = getErrorMessage(ERROR_CODES.BAD_REQUEST), details) {
  return new ApiError({
    status: 400,
    code: ERROR_CODES.BAD_REQUEST,
    message,
    details,
  });
}

export function isForbidden(error) {
  const apiError = toApiError(error);
  return apiError.status === 403 || apiError.code === ERROR_CODES.INSUFFICIENT_PERMISSIONS;
}

export function getDisplayError(error, fallbackMessage) {
  return toApiError(error, fallbackMessage).message;
}
