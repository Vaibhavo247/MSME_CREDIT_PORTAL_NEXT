import { Agent } from "undici";
import crypto from "crypto";

export const legacyDispatcher = new Agent({
  connect: {
    rejectUnauthorized: false,
    secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
  },
});
