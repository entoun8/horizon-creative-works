import { Clock, Mail, Facebook, Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';

export const metadata = {
  title: "Contact Us | Horizon Creative Works - 24-Hour Response Guarantee",
  description: "Get in touch with our team. Multiple ways to reach us with guaranteed 24-hour response time. Email, Facebook, or Instagram.",
  openGraph: {
    title: "Contact Horizon Creative Works - 24-Hour Response Guarantee",
    description: "Get in touch with our team. Multiple contact options with guaranteed 24-hour response time.",
    url: "https://horizon-creative-works.vercel.app/contact",
    siteName: "Horizon Creative Works",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Horizon Creative Works - 24-Hour Response Guarantee",
    description: "Get in touch with our team. Multiple contact options with guaranteed 24-hour response time.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        {/* Page Heading and Subheading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Get In Touch
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center mb-12">
          Tell us about your business - we&apos;ll figure out the rest together
        </p>

        {/* Response Guarantee Badge */}
        <div className="flex items-center justify-center gap-2 text-lg font-semibold text-primary mb-12">
          <Clock className="w-6 h-6" />
          <span>We respond within 24 hours</span>
        </div>

        {/* Multi-Channel Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email Option */}
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <Mail className="w-8 h-8 text-primary" />
              <div className="text-xl font-semibold">Email</div>
              <a 
                href="mailto:contact@horizoncreativeworks.com"
                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              >
                contact@horizoncreativeworks.com
              </a>
            </CardContent>
          </Card>

          {/* Facebook Option */}
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <Facebook className="w-8 h-8 text-primary" />
              <div className="text-xl font-semibold">Facebook</div>
              <span className="text-muted-foreground text-sm">
                Coming soon
              </span>
            </CardContent>
          </Card>

          {/* Instagram Option */}
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <Instagram className="w-8 h-8 text-primary" />
              <div className="text-xl font-semibold">Instagram</div>
              <span className="text-muted-foreground text-sm">
                Coming soon
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Or Send Us a Message
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
