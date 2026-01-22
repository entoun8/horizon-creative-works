import { NextRequest, NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';
import { ContactFormSchema } from '@/lib/schemas';
import { sendContactEmail } from '@/lib/email-service';
import { serverConfig } from '@/lib/config';
import { checkRateLimit } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Extract IP address from request headers (Vercel provides x-forwarded-for)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    // Check rate limit before processing (1 submission per IP per 5 minutes)
    if (!checkRateLimit(ipAddress)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again in a few minutes.',
        },
        { status: 429 }
      );
    }

    // Check honeypot field (bots fill hidden fields)
    if (body.website) {
      // Bot detected - reject silently with generic error
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid submission',
        },
        { status: 400 }
      );
    }

    // Validate using Zod schema
    const validatedData = ContactFormSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Sanitize message content to prevent XSS
    const sanitizedData = {
      ...validatedData.data,
      message: sanitizeHtml(validatedData.data.message, {
        allowedTags: [],
        allowedAttributes: {},
      }),
    };

    // Send email notification
    await sendContactEmail(sanitizedData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll respond within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging
    console.error('API route error:', error);

    // Return generic error response with actual contact email
    return NextResponse.json(
      {
        success: false,
        error: `Something went wrong. Please try emailing us directly at ${serverConfig.contact.email}`,
      },
      { status: 500 }
    );
  }
}
