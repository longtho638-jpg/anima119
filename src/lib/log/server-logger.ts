// src/lib/log/server-logger.ts

export function logServerError(error: unknown, context: string, details?: Record<string, unknown>) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  console.error(`[ServerError] ${context}: ${errorMessage}`, { details, stack });
}
