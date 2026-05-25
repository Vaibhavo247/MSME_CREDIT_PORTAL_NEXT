import CryptoJS from 'crypto-js';

const DEFAULT_PASSPHRASE = 'ab5a4552-2412-4724-a254-18a05e722e3d';

export function decryptResponse(encryptedResponse, passphrase = DEFAULT_PASSPHRASE) {
  if (!encryptedResponse) return null;
  const bytes = CryptoJS.AES.decrypt(encryptedResponse, passphrase);
  const text = bytes.toString(CryptoJS.enc.Utf8);
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Failed to parse decrypted text', err);
    return null;
  }
}

export function extractDataFromResponse(resp, passphrase = DEFAULT_PASSPHRASE) {
  if (!resp) return [];
  if (resp?.encryptedResponse) {
    const decrypted = decryptResponse(resp.encryptedResponse, passphrase);
    return Array.isArray(decrypted?.data) ? decrypted.data : [];
  }
  return Array.isArray(resp?.data) ? resp.data : [];
}

const cryptoUtils = {
  decryptResponse,
  extractDataFromResponse,
};

export default cryptoUtils;
