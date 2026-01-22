import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Horizon Creative Works | GDPR Compliant',
  description: 'Learn how we handle your data and protect your privacy. GDPR compliant privacy policy. No tracking cookies, minimal data collection.',
  openGraph: {
    title: 'Privacy Policy - Horizon Creative Works',
    description: 'Learn how we handle your data and protect your privacy. GDPR compliant with minimal data collection.',
    url: 'https://horizon-creative-works.vercel.app/privacy',
    siteName: 'Horizon Creative Works',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Horizon Creative Works',
    description: 'Learn how we handle your data and protect your privacy. GDPR compliant.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground mb-12">
        Last Updated: January 22, 2026
      </p>

      <div className="space-y-12 leading-relaxed">
        {/* Information Collection Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Information We Collect
          </h2>
          <p className="mb-4">
            When you submit our contact form, we collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Name</strong> (required): Between 2 and 100 characters
            </li>
            <li>
              <strong>Email Address</strong> (required): A valid email address so we can respond to your inquiry
            </li>
            <li>
              <strong>Phone Number</strong> (optional): If you prefer phone contact or want to provide an alternate way to reach you
            </li>
            <li>
              <strong>Message</strong> (required): Your inquiry or message, between 10 and 1,000 characters
            </li>
          </ul>
        </section>

        {/* How We Use Information Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            The information you provide through our contact form is used solely to respond to your inquiries and provide the information you&apos;ve requested.
          </p>
          <p className="mb-4">
            When you submit the form, your message is sent via email directly to our agency inbox. We do not store your information in any database. The email-only architecture means your data is transmitted securely and arrives in our inbox just like any other email.
          </p>
          <p>
            We use this information exclusively for:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Responding to your specific inquiry</li>
            <li>Providing information about our services</li>
            <li>Following up on potential projects or collaborations</li>
          </ul>
        </section>

        {/* Data Storage Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Data Storage and Retention
          </h2>
          <p className="mb-4">
            We take a minimal approach to data storage:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>No tracking cookies:</strong> We do not use cookies to track your behavior on our website
            </li>
            <li>
              <strong>No server-side storage:</strong> Our website runs on a serverless architecture, meaning we do not maintain databases or servers that store your personal information
            </li>
            <li>
              <strong>Email retention:</strong> Form submissions are delivered to our agency Gmail inbox and are retained there indefinitely as part of our business correspondence
            </li>
          </ul>
          <p>
            If you would like your information deleted from our email records, please contact us at{' '}
            <a
              href="mailto:info@horizoncreativeworks.com"
              className="text-primary underline hover:no-underline"
            >
              info@horizoncreativeworks.com
            </a>{' '}
            with your deletion request, and we will remove your email from our records.
          </p>
        </section>

        {/* Third-Party Services Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Third-Party Services
          </h2>
          <p className="mb-4">
            Our website uses the following third-party services to operate:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Resend Email Service</h3>
              <p className="mb-2">
                We use Resend to deliver contact form submissions to our inbox. When you submit the form, Resend processes your information to send the email. Resend does not store or use your information for any other purpose.
              </p>
              <p>
                View Resend&apos;s privacy policy:{' '}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://resend.com/legal/privacy-policy
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Vercel Hosting</h3>
              <p className="mb-2">
                Our website is hosted on Vercel, a cloud platform for static sites and serverless functions. Vercel may collect technical information like IP addresses and browser data for security and performance purposes.
              </p>
              <p>
                View Vercel&apos;s privacy policy:{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://vercel.com/legal/privacy-policy
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* User Rights Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Your Rights
          </h2>
          <p className="mb-4">
            We respect your privacy rights and comply with GDPR requirements for visitors from the European Union. You have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Right to access:</strong> You can request a copy of any information we have about you
            </li>
            <li>
              <strong>Right to deletion:</strong> You can request that we delete your information from our records
            </li>
            <li>
              <strong>Right to correction:</strong> You can request that we correct any inaccurate information
            </li>
            <li>
              <strong>Right to object:</strong> You can object to our processing of your information
            </li>
          </ul>
          <p>
            To exercise any of these rights, please email us at{' '}
            <a
              href="mailto:info@horizoncreativeworks.com"
              className="text-primary underline hover:no-underline"
            >
              info@horizoncreativeworks.com
            </a>{' '}
            with your request. We will respond within 30 days.
          </p>
        </section>

        {/* Analytics Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Analytics
          </h2>
          <p className="mb-4">
            We use Vercel Analytics to understand how visitors use our website. This service is privacy-focused and collects only anonymous data:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Page views and navigation patterns</li>
            <li>Device type and screen size (for responsive design improvements)</li>
            <li>Geographic region (country-level only, not specific location)</li>
          </ul>
          <p>
            Vercel Analytics does not collect any personal information, does not use cookies for tracking, and cannot identify individual users. All data is aggregated and anonymous.
          </p>
        </section>
      </div>
    </div>
  );
}
