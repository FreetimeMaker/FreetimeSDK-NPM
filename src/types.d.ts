declare module 'base58-js' {
  export function base58encode(bytes: Uint8Array): string;
  export function base58decode(s: string): Uint8Array;
  export { base58encode as encode, base58decode as decode };
}

declare module 'bech32-buffer' {
  export function decode(s: string): { prefix: string; words: number[] };
  export function encode(prefix: string, words: number[]): string;
  export function toWords(bytes: Uint8Array): number[];
  export function fromWords(words: number[]): Uint8Array;
}
