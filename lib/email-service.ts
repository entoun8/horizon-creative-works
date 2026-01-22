import { Resend } from 'resend';
import sanitizeHtml from 'sanitize-html';
import { ContactFormData } from './schemas';
import { serverConfig, validateServerConfig } from './config';

// Lazy initialization - only create Resend instance when needed (at runtime, not build time)
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    // Validate environment variables only when first needed (runtime, not build time)
    validateServerConfig();
    resend = new Resend(serverConfig.resend.apiKey);
  }
  return resend;
}

/**
 * Escapes HTML entities to prevent XSS attacks in email templates
 */
function escapeHtml(text: string): string {
  return sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  try {
    // Escape all user input to prevent XSS in email HTML
    const escapedName = escapeHtml(data.name);
    const escapedEmail = escapeHtml(data.email);
    const escapedPhone = data.phone ? escapeHtml(data.phone) : null;
    const escapedMessage = escapeHtml(data.message);

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>New Contact Form Submission</h2>
            
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${escapedName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${escapedEmail}</div>
            </div>
            
            ${escapedPhone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${escapedPhone}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${escapedMessage}</div>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await getResendClient().emails.send({
      from: 'Website Contact Form <noreply@yourdomain.com>',
      to: serverConfig.contact.email,
      subject: `New Contact Form Submission from ${escapedName}`,
      html: htmlBody,
    });

    if (!result.data) {
      throw new Error('Failed to send email - no response data');
    }
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error('Failed to send email notification');
  }
}
