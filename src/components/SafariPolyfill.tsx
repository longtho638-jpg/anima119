'use client';

import { useEffect } from 'react';

/**
 * Safari Compatibility Polyfills (Client Side)
 * 
 * Injects polyfills for APIs missing in Safari < 15.4 (Object.hasOwn, structuredClone, etc.)
 * This must be a Client Component to run in the browser.
 */
export function SafariPolyfill() {
  useEffect(() => {
    // Object.hasOwn — Safari < 15.4
    if (!Object.hasOwn) {
      Object.defineProperty(Object, 'hasOwn', {
        value: function (obj: object, prop: PropertyKey): boolean {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        },
        configurable: true,
        writable: true,
      });
    }

    // structuredClone — Safari < 15.4
    if (typeof globalThis.structuredClone === 'undefined') {
      (globalThis as Record<string, unknown>).structuredClone = function <T>(val: T): T {
        return JSON.parse(JSON.stringify(val));
      };
    }

    // Array.prototype.at — Safari < 15.4
    if (!Array.prototype.at) {
      Object.defineProperty(Array.prototype, 'at', {
        value: function <T>(this: T[], index: number): T | undefined {
          const i = index >= 0 ? index : this.length + index;
          return this[i];
        },
        configurable: true,
        writable: true,
      });
    }
  }, []);

  return null; // No UI, just side effects
}
