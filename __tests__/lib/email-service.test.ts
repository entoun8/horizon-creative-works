/**
 * Unit tests for Email Service
 * 
 * Tests XSS sanitization and email sending functionality.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// Mock Resend BEFORE importing email service
const mockSend = jest.fn().mockResolvedValue({ data: { id: 'test-email-id' } });

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: (...args: any[]) => mockSend(...args),
      },
    })),
  };
});

import { sendContactEmail } from '@/lib/email-service';

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSend.mockResolvedValue({ data: { id: 'test-email-id' } });
  });

  describe('XSS Sanitization', () => {
    it('sanitizes script tags in message', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: '<script>alert("xss")</script>Test message',
      };

      await sendContactEmail(data);

      // Verify script tags were removed
      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).not.toContain('<script>');
      expect(callArgs.html).not.toContain('alert("xss")');
      expect(callArgs.html).toContain('Test message');
    });

    it('sanitizes img tags with onerror in message', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: '<img src=x onerror=alert("xss")>Test message',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).not.toContain('<img');
      expect(callArgs.html).not.toContain('onerror');
      expect(callArgs.html).toContain('Test message');
    });

    it('sanitizes iframe tags in message', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: '<iframe src="evil.com"></iframe>Test message',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).not.toContain('<iframe');
      expect(callArgs.html).toContain('Test message');
    });

    it('sanitizes event handlers in message', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: '<div onload=alert("xss")>Test message</div>',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).not.toContain('onload');
      expect(callArgs.html).not.toContain('alert("xss")');
      expect(callArgs.html).toContain('Test message');
    });

    it('sanitizes XSS in name field', async () => {
      const data = {
        name: '<script>alert("xss")</script>John',
        email: 'john@example.com',
        message: 'Test message',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).not.toContain('<script>');
      expect(callArgs.html).toContain('John');
    });

    it('sanitizes XSS in email field', async () => {
      const data = {
        name: 'John Doe',
        email: 'test@example.com<script>alert("xss")</script>',
        message: 'Test message',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).not.toContain('<script>');
      expect(callArgs.html).toContain('test@example.com');
    });

    it('sanitizes XSS in phone field', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234<script>alert("xss")</script>',
        message: 'Test message',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).not.toContain('<script>');
      expect(callArgs.html).toContain('555-1234');
    });

    it('preserves line breaks in message', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Line 1\nLine 2\nLine 3',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      // Check that line breaks are preserved (white-space: pre-wrap CSS maintains them)
      expect(callArgs.html).toContain('Line 1');
      expect(callArgs.html).toContain('Line 2');
      expect(callArgs.html).toContain('Line 3');
    });

    it('removes all HTML tags while preserving text content', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: '<b>Bold</b> <i>italic</i> <u>underline</u> normal',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      // All HTML tags should be removed
      expect(callArgs.html).not.toContain('<b>');
      expect(callArgs.html).not.toContain('<i>');
      expect(callArgs.html).not.toContain('<u>');
      // But text content should remain
      expect(callArgs.html).toContain('Bold');
      expect(callArgs.html).toContain('italic');
      expect(callArgs.html).toContain('underline');
      expect(callArgs.html).toContain('normal');
    });
  });

  describe('Email Sending', () => {
    it('sends email with correct recipient', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      };

      await sendContactEmail(data);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com', // From test environment
        })
      );
    });

    it('includes all form fields in email', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        message: 'Test message',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).toContain('John Doe');
      expect(callArgs.html).toContain('john@example.com');
      expect(callArgs.html).toContain('555-1234');
      expect(callArgs.html).toContain('Test message');
    });

    it('omits phone field if not provided', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      };

      await sendContactEmail(data);

      const callArgs = mockSend.mock.calls[0][0];
      // Phone section should not be present
      expect(callArgs.html.match(/Phone:/g) || []).toHaveLength(0);
    });

    it('throws error when email send fails', async () => {
      mockSend.mockResolvedValue({ data: null });

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      };

      await expect(sendContactEmail(data)).rejects.toThrow('Failed to send email notification');
    });

    it('throws error when resend API throws', async () => {
      mockSend.mockRejectedValue(new Error('API error'));

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      };

      await expect(sendContactEmail(data)).rejects.toThrow('Failed to send email notification');
    });
  });
});
