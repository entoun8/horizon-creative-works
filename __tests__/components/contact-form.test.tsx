/**
 * Component tests for Contact Form
 * 
 * Tests rate limit error display, honeypot field, and form interactions.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact-form';
import { submitContactForm } from '@/lib/api';

// Mock API service
jest.mock('@/lib/api');
const mockSubmitContactForm = submitContactForm as jest.MockedFunction<typeof submitContactForm>;

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rate Limit Error Handling', () => {
    it('displays rate limit error message when 429 received', async () => {
      const user = userEvent.setup();
      
      // Mock 429 response
      mockSubmitContactForm.mockResolvedValue({
        success: false,
        error: 'Too many requests. Please try again in a few minutes.',
        data: { status: 429 },
      });

      render(<ContactForm />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message with enough characters');

      // Submit form
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText(/too many requests/i)).toBeInTheDocument();
      });

      // Verify error styling
      const errorMessage = screen.getByText(/too many requests/i).closest('div');
      expect(errorMessage).toHaveClass('bg-red-50');
      expect(errorMessage).toHaveClass('text-red-800');
    });

    it('allows retry after rate limit error', async () => {
      const user = userEvent.setup();
      
      // First attempt - rate limited
      mockSubmitContactForm.mockResolvedValueOnce({
        success: false,
        error: 'Too many requests. Please try again in a few minutes.',
        data: { status: 429 },
      });

      // Second attempt - success
      mockSubmitContactForm.mockResolvedValueOnce({
        success: true,
        message: "Thank you! We'll respond within 24 hours.",
        data: { status: 200 },
      });

      render(<ContactForm />);

      // Fill and submit form (first attempt)
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message with enough characters');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for rate limit error
      await waitFor(() => {
        expect(screen.getByText(/too many requests/i)).toBeInTheDocument();
      });

      // Try again (form should not be disabled after error)
      await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Should eventually show success
      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      });
    });
  });

  describe('Honeypot Field', () => {
    it('includes hidden honeypot field in form', () => {
      render(<ContactForm />);

      const honeypotField = document.querySelector('input[name="website"]');
      expect(honeypotField).toBeInTheDocument();
      expect(honeypotField).toHaveAttribute('aria-hidden', 'true');
      expect(honeypotField).toHaveAttribute('tabIndex', '-1');
      expect(honeypotField).toHaveAttribute('autocomplete', 'off');
    });

    it('honeypot field is visually hidden', () => {
      render(<ContactForm />);

      const honeypotField = document.querySelector('input[name="website"]') as HTMLElement;
      const styles = honeypotField.style;

      expect(styles.position).toBe('absolute');
      expect(styles.left).toBe('-9999px');
      expect(styles.opacity).toBe('0');
    });

    it('sends honeypot field value with form submission', async () => {
      const user = userEvent.setup();
      
      mockSubmitContactForm.mockResolvedValue({
        success: true,
        message: "Thank you! We'll respond within 24 hours.",
        data: { status: 200 },
      });

      render(<ContactForm />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message with enough characters');

      // Submit form
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Verify honeypot field was included in submission
      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Test message with enough characters',
            website: '', // Honeypot should be empty
          })
        );
      });
    });
  });

  describe('Form Validation', () => {
    it('displays validation error for invalid email', async () => {
      const user = userEvent.setup();

      render(<ContactForm />);

      // Enter invalid email and blur
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      // Wait for validation error
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
      });
    });

    it('disables submit button during submission', async () => {
      const user = userEvent.setup();
      
      // Mock slow API response
      mockSubmitContactForm.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<ContactForm />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message with enough characters');

      // Submit form
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Button should be disabled during submission
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
    });
  });

  describe('Success Flow', () => {
    it('displays success message and clears form on successful submission', async () => {
      const user = userEvent.setup();
      
      mockSubmitContactForm.mockResolvedValue({
        success: true,
        message: "Thank you! We'll respond within 24 hours.",
        data: { status: 200 },
      });

      render(<ContactForm />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message with enough characters');

      // Submit form
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      });

      // Form should be cleared
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });
  });

  describe('Error Handling', () => {
    it('displays server error message on 500 response', async () => {
      const user = userEvent.setup();
      
      mockSubmitContactForm.mockResolvedValue({
        success: false,
        error: 'Something went wrong. Please try emailing us directly at contact@example.com',
        data: { status: 500 },
      });

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message with enough characters');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      });
    });

    it('displays network error message on fetch failure', async () => {
      const user = userEvent.setup();
      
      mockSubmitContactForm.mockRejectedValue(new Error('Network error'));

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message with enough characters');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for network error message
      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });
  });
});
