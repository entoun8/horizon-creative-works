import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us - Horizon Creative Works | Expert Web Development Team',
  description: 'Professional web development team specializing in Next.js and modern web technologies. Transparent pricing, clear communication, and quality-focused approach.',
  openGraph: {
    title: 'About Horizon Creative Works - Expert Web Development Team',
    description: 'Professional web development team specializing in Next.js and modern web technologies. Transparent pricing and quality-focused approach.',
    url: 'https://horizon-creative-works.vercel.app/about',
    siteName: 'Horizon Creative Works',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Horizon Creative Works - Expert Web Development Team',
    description: 'Professional web development team specializing in Next.js and modern web technologies.',
  },
};

const VALUES = [
  {
    title: 'Transparent Pricing',
    description: "No hidden costs or surprise charges. You know exactly what you're paying for.",
  },
  {
    title: 'Clear Communication',
    description: 'We respond within 24 hours and speak in plain language, not technical jargon.',
  },
  {
    title: 'Quality Focused',
    description: 'We build modern, fast websites using proven technologies.',
  },
  {
    title: 'Partnership Mindset',
    description: "Your success is our success. We're here to help your business grow.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Heading */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            About Us
          </h1>
        </div>
      </section>

      {/* Team Positioning Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
            Professional web development team with practical experience
          </h2>
          <p className="text-base md:text-lg text-gray-700 text-center">
            We specialize in building modern, fast websites using proven web technologies. 
            Our team believes in transparent pricing and clear communication—no jargon, no surprises. 
            We work primarily with small businesses and growing companies who need professional web 
            solutions without enterprise complexity.
          </p>
        </div>
      </section>

      {/* Optional Team Photo */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Image
            src="/images/team-photo.jpg"
            alt="Horizon Creative Works team collaborating on web development projects"
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="rounded-lg w-full h-auto"
          />
        </div>
      </section>

      {/* Values/Approach Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How We Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {VALUES.map((value) => (
              <div key={value.title} className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  {value.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to discuss your project?
          </h2>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
