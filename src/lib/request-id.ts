import { headers } from 'next/headers';

const REQUEST_ID_HEADER = 'x-request-id';

/**
 * Generate a new request ID using timestamp and random number
 */
export function generateRequestId(): string {
  const now = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${now}-${random}`;
}

/**
 * Get or create the request ID for the current request
 * This should be called in middleware or at the start of request handling
 */
export async function getOrCreateRequestId(): Promise<string> {
  const headersList = await headers();
  const existingId = headersList.get(REQUEST_ID_HEADER);

  if (existingId) {
    return existingId;
  }

  return generateRequestId();
}

/**
 * Get the request ID from the current request headers
 */
export async function getRequestId(): Promise<string | null> {
  const headersList = await headers();
  return headersList.get(REQUEST_ID_HEADER);
}

/**
 * Store request ID in context for use in server actions and API routes
 * This is a workaround for async context in Next.js
 */
let requestIdContext: string | null = null;

export function setRequestIdContext(requestId: string): void {
  requestIdContext = requestId;
}

export function getRequestIdContext(): string | null {
  return requestIdContext;
}

export function clearRequestIdContext(): void {
  requestIdContext = null;
}
