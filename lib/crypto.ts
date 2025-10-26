// lib/crypto.ts
// Basit istemci-yanı AES-GCM (256-bit). Anahtar cihazda (localStorage) tutulur.
const KEY_NAME = "afterme_aes_key";

function b64encode(buf: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}
function b64decode(b64: string) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

export async function getOrCreateKey(): Promise<CryptoKey> {
  const existing = typeof window !== "undefined" ? localStorage.getItem(KEY_NAME) : null;
  if (existing) {
    return crypto.subtle.importKey("raw", b64decode(existing), { name: "AES-GCM" }, false, ["encrypt","decrypt"]);
  }
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
  const raw = await crypto.subtle.exportKey("raw", key);
  localStorage.setItem(KEY_NAME, b64encode(raw));
  return key;
}

export async function encryptText(plain: string) {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getOrCreateKey();
  const cipherBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plain));
  return { ciphertext: b64encode(cipherBuf), iv: b64encode(iv.buffer) };
}
