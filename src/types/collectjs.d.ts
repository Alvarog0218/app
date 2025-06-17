/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/collectjs.d.ts
export {};

declare global {
  interface Window {
    CollectJS: {
      configure: (options: {
        variant: string;
        price?: string;
        currency?: string;
        country?: string;
        fields?: any;
        callback: (response: { token: string }) => void;
      }) => void;
      startPaymentRequest: () => void;
    };
  }
}
