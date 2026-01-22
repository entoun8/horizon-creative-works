'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, type ContactFormData } from '@/lib/schemas';
import { submitContactForm } from '@/lib/api';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      // Include honeypot field in submission (should be empty for legitimate users)
      const honeypotField = (document.querySelector('input[name="website"]') as HTMLInputElement)?.value || '';
      const submissionData = {
        ...data,
        website: honeypotField,
      };
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await submitContactForm(submissionData as any);
      const status = result.data?.status ?? 0;

      if (result.success) {
        // Success - display message and clear form
        setSubmitMessage({
          type: 'success',
          text: result.message || "Thank you! We'll respond within 24 hours.",
        });
        form.reset();
      } else if (status === 429) {
        // Rate limit exceeded - display clear message
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Too many requests. Please try again in a few minutes.',
        });
      } else if (status === 400 && result.details) {
        // Validation errors - set field-specific errors
        Object.entries(result.details).forEach(([field, errors]) => {
          if (Array.isArray(errors) && errors.length > 0) {
            form.setError(field as keyof ContactFormData, {
              type: 'manual',
              message: errors[0],
            });
          }
        });
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Please fix the errors above.',
        });
      } else {
        // Other errors (500, etc.)
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Something went wrong. Please try again later.',
        });
      }
    } catch (error) {
      // Network error
      console.error('Network error:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {submitMessage && (
            <div
              role="status"
              aria-live="polite"
              className={`p-4 rounded-md flex items-start gap-3 ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {submitMessage.type === 'success' ? (
                <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <span>{submitMessage.text}</span>
            </div>
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your project or inquiry..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot field - hidden from users, catches bots */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
            }}
            onChange={() => {}}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
