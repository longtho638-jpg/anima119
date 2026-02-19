/**
 * Simple logger utility to centralize logging and allow for future expansion.
 * Currently wraps console methods but can be extended to use a logging service.
 */
export const logger = {
    error: (...args: unknown[]) => console.error('[Anima119]', ...args),
    warn: (...args: unknown[]) => console.warn('[Anima119]', ...args),
    info: (...args: unknown[]) => console.info('[Anima119]', ...args),
    debug: (...args: unknown[]) => console.debug('[Anima119]', ...args),
};
