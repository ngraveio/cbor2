/**
 * Convert hex string to Uint8Array.
 *
 * @param str Hex string.
 * @returns Array with contents decoded as hex from str.
 */
export function hexToU8(str: string): Uint8Array {
  const len = str.length / 2;
  const res = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = parseInt(str.substr(i << 1, 2), 16);
  }

  return res;
}

/**
 * Convert from Base64 to bytes in an unexciting way.
 * From https://developer.mozilla.org/en-US/docs/Glossary/Base64
 * which goes through an intermediate string form.  Bleh.
 *
 * @param base64 Base64-encoded string.
 * @returns String decoded into bytes.
 */
export function base64ToBytes(base64: string): Uint8Array {
  const binString = atob(base64);
  return Uint8Array.from(
    binString,
    (m: string): number => m.codePointAt(0) as number
  );
}

const urlToNotUrl: {
  [key: string]: string;
} = {
  '-': '+',
  '_': '/',
};

/**
 * Decode Base64url string to bytes.
 *
 * @param base64url Base64url-encoded string.
 * @returns Bytes.
 */
export function base64UrlToBytes(base64url: string): Uint8Array {
  const s = base64url.replace(/[_-]/g, (m: string) => urlToNotUrl[m]);
  return base64ToBytes(s.padEnd(Math.ceil(s.length / 4) * 4, '='));
}

//
// function bytesToBase64(bytes: Uint8Array): string {
//   const binString = Array.from(bytes, (x: number) => String.fromCodePoint(x))
//     .join('');
//   return btoa(binString);
// }
