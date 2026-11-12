/**
 * Tiny prefixed logger. Every service logs through here so problems are easy
 * to spot in the browser console (filter by "[wedding:").
 * Debug output is shown in development only; warnings/errors always.
 */
type Scope = 'gallery' | 'rsvp' | 'audio' | 'app';

export const createLogger = (scope: Scope) => {
  const tag = `[wedding:${scope}]`;
  return {
    debug: (...args: unknown[]) => import.meta.env.DEV && console.debug(tag, ...args),
    warn: (...args: unknown[]) => console.warn(tag, ...args),
    error: (...args: unknown[]) => console.error(tag, ...args),
  };
};
