/**
 * Environment Configuration
 * Centralized access to environment variables with validation
 */

// Server-side only configuration
export const serverConfig = {
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
  },
  contact: {
    email: process.env.CONTACT_EMAIL || '',
  },
} as const;

/**
 * Validates that required environment variables are set
 * Call this at application startup or in API routes
 */
export function validateServerConfig(): void {
  const errors: string[] = [];

  if (!serverConfig.resend.apiKey) {
    errors.push('RESEND_API_KEY is not defined');
  }
  if (!serverConfig.contact.email) {
    errors.push('CONTACT_EMAIL is not defined');
  }

  if (errors.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${errors.join('\n')}`
    );
  }
}
