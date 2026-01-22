/**
 * API Service Layer
 * Centralized API calls following coding standards
 */

import { ContactFormData } from './schemas';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: Record<string, string[]>;
  data?: {
    status: number;
  };
}

/**
 * Submits contact form data to the API
 * @throws {Error} Network errors
 * @returns {Promise<ApiResponse>} API response with success status
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json() as Omit<ApiResponse, 'data'>;

  // Attach HTTP status for downstream error handling
  return {
    ...result,
    data: { status: response.status },
  };
}
