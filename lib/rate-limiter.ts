/**
 * Rate Limiter Utility
 * 
 * Implements in-memory rate limiting for form submissions based on IP address.
 * Enforces 1 submission per IP address per 5 minutes.
 * 
 * Note: In-memory storage will reset on serverless function cold starts (acceptable for MVP).
 * Phase 2 may upgrade to Vercel Edge Config or Redis for persistent rate limiting.
 */

// Rate limit window: 5 minutes in milliseconds
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

// In-memory storage: Map of IP address to timestamp of last submission
const rateLimitStore: Map<string, number> = new Map();

/**
 * Check if an IP address is rate limited
 * 
 * @param ipAddress - IP address to check (use 'unknown' if IP cannot be determined)
 * @returns true if submission is allowed, false if rate limited
 */
export function checkRateLimit(ipAddress: string): boolean {
  const now = Date.now();
  const lastSubmission = rateLimitStore.get(ipAddress);

  // First submission from this IP
  if (!lastSubmission) {
    rateLimitStore.set(ipAddress, now);
    cleanupExpiredEntries(now);
    return true;
  }

  // Check if rate limit window has passed
  const timeSinceLastSubmission = now - lastSubmission;
  
  if (timeSinceLastSubmission < RATE_LIMIT_WINDOW_MS) {
    // Still within rate limit window - block submission
    return false;
  }

  // Rate limit window has passed - allow submission and update timestamp
  rateLimitStore.set(ipAddress, now);
  cleanupExpiredEntries(now);
  return true;
}

/**
 * Clean up expired rate limit entries to prevent memory leaks
 * 
 * @param currentTime - Current timestamp for comparison
 */
function cleanupExpiredEntries(currentTime: number): void {
  for (const [ip, timestamp] of rateLimitStore.entries()) {
    if (currentTime - timestamp >= RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}

/**
 * Clear all rate limit entries (primarily for testing)
 */
export function clearRateLimits(): void {
  rateLimitStore.clear();
}

/**
 * Get rate limit window duration in milliseconds (for testing)
 */
export function getRateLimitWindow(): number {
  return RATE_LIMIT_WINDOW_MS;
}
