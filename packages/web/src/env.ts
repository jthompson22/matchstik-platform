const env =
  (window as any).SERVER_DATA && (window as any).SERVER_DATA.env ? (window as any).SERVER_DATA.env : {};
export const NODE_ENV = env.NODE_ENV || "development";
export const DEBUG_ENABLED = env.DEBUG_ENABLED || 1;
export const API_URL = env.API_URL || "http://localhost:3001";
export const SENTRY_DSN = env.SENTRY_DSN || null;