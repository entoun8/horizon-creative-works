/**
 * Integration tests for Contact API Route
 * 
 * Tests rate limiting, honeypot detection, validation, and error handling.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { checkRateLimit } from '@/lib/rate-limiter';
import { sendContactEmail } from '@/lib/email-service';

// Mock dependencies
jest.mock('@/lib/rate-limiter');
jest.mock('@/lib/email-service');

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init?: any) => {
      const bodyData = data;
      return {
        status: init?.status || 200,
        statusText: init?.statusText || '',
        headers: new Map(),
        json: async () => bodyData,
      };
    },
  },
}));

import { POST } from '@/app/api/contact/route';

const mockCheckRateLimit = checkRateLimit as jest.MockedFunction<typeof checkRateLimit>;
const mockSendContactEmail = sendContactEmail as jest.MockedFunction<typeof sendContactEmail>;

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default: allow submissions (not rate limited)
    mockCheckRateLimit.mockReturnValue(true);
    // Default: email sends successfully
    mockSendContactEmail.mockResolvedValue(undefined);
  });

  describe('Rate Limiting', () => {
    it('returns 429 when IP is rate limited', async () => {
      mockCheckRateLimit.mockReturnValue(false);

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message with enough characters to pass validation',
        }),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Too many requests. Please try again in a few minutes.');
      expect(mockSendContactEmail).not.toHaveBeenCalled();
    });

    it('extracts IP from x-forwarded-for header', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1, 10.0.0.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message with enough characters to pass validation',
        }),
      });

      await POST(request as any);

      expect(mockCheckRateLimit).toHaveBeenCalledWith('192.168.1.1');
    });

    it('uses "unknown" as IP when x-forwarded-for is missing', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message with enough characters to pass validation',
        }),
      });

      await POST(request as any);

      expect(mockCheckRateLimit).toHaveBeenCalledWith('unknown');
    });
  });

  describe('Honeypot Detection', () => {
    it('returns 400 when honeypot field is filled', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message with enough characters to pass validation',
          website: 'http://spam-bot.com', // Honeypot field filled
        }),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid submission');
      expect(mockSendContactEmail).not.toHaveBeenCalled();
    });

    it('allows submission when honeypot field is empty', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message with enough characters to pass validation',
          website: '', // Honeypot field empty
        }),
      });

      const response = await POST(request as any);

      expect(response.status).toBe(200);
      expect(mockSendContactEmail).toHaveBeenCalled();
    });
  });

  describe('Message Length Validation', () => {
    it('returns 400 when message exceeds 1000 characters', async () => {
      const longMessage = 'a'.repeat(1001);

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: longMessage,
        }),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Validation failed');
      expect(mockSendContactEmail).not.toHaveBeenCalled();
    });

    it('allows message with exactly 1000 characters', async () => {
      const maxLengthMessage = 'a'.repeat(1000);

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: maxLengthMessage,
        }),
      });

      const response = await POST(request as any);

      expect(response.status).toBe(200);
      expect(mockSendContactEmail).toHaveBeenCalled();
    });
  });

  describe('Successful Submission', () => {
    it('returns 200 when all validations pass', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message with enough characters to pass validation',
        }),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Thank you! We'll respond within 24 hours.");
      expect(mockSendContactEmail).toHaveBeenCalled();
    });

    it('sanitizes message content', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message with enough characters',
        }),
      });

      await POST(request as any);

      expect(mockSendContactEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters',
        phone: undefined,
      });
    });
  });

  describe('Error Handling', () => {
    it('returns 500 when email service fails', async () => {
      mockSendContactEmail.mockRejectedValue(new Error('Email service error'));

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message with enough characters to pass validation',
        }),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Something went wrong');
    });
  });
});
