export const BASE_HEADERS = {
  "X-Request-ID": "TNC",
  "x-api-key": process.env.API_KEY,
};

export const withCorrelationId = (correlationId) => ({
  ...BASE_HEADERS,
  "x-correlation-id": correlationId?.toString(),
});