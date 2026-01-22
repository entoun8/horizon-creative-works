import type { Metadata } from 'next';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PackageCard } from '@/components/package-card'

export const metadata: Metadata = {
  title: 'Horizon Creative Works - Professional Websites for Growing Businesses',
  description: 'Modern, simple websites built to get you customers. Transparent pricing packages starting at $1,500. Expert Next.js and React development team.',
  openGraph: {
    title: 'Professional Websites for Growing Businesses',
    description: 'Modern, simple websites built to get you customers. Transparent pricing starting at $1,500.',
    url: 'https://horizon-creative-works.vercel.app',
    siteName: 'Horizon Creative Works',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Websites for Growing Businesses',
    description: 'Modern, simple websites built to get you customers. Transparent pricing starting at $1,500.',
  },
};

const packages = [
  {
    title: "Starter",
    price: "$1,500",
    deliverables: [
      "5-page responsive website",
      "Mobile-first design",
      "Contact form integration",
      "Basic SEO setup",
      "2 rounds of revisions"
    ],
    featured: false,
    ctaLink: "/contact"
  },
  {
    title: "Business",
    price: "$3,500",
    deliverables: [
      "10-page responsive website",
      "Custom design with your branding",
      "Advanced SEO optimization",
      "Contact form + email integration",
      "Social media integration",
      "4 rounds of revisions"
    ],
    featured: true,
    ctaLink: "/contact"
  },
  {
    title: "Custom",
    price: "Let's Talk",
    deliverables: [
      "Fully customized solution",
      "Unlimited pages",
      "E-commerce capabilities",
      "Advanced integrations",
      "Ongoing support options",
      "Tailored to your needs"
    ],
    featured: false,
    ctaLink: "/contact"
  }
];

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Horizon Creative Works",
    "url": "https://horizon-creative-works.vercel.app",
    "logo": "https://horizon-creative-works.vercel.app/logo.svg",
    "description": "Professional web development team specializing in Next.js and modern web technologies for small businesses.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@horizoncreativeworks.com",
      "contactType": "Customer Service"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <section className="w-full py-12 md:py-16 flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Professional Websites for Growing Businesses
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl">
          Modern, simple, and built to get you customers
        </p>
        <Link href="#packages">
          <Button size="lg">View Our Packages</Button>
        </Link>
      </section>

      <section id="packages" className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Service Packages
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Transparent pricing, no surprises. Choose the package that fits your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                title={pkg.title}
                price={pkg.price}
                deliverables={pkg.deliverables}
                featured={pkg.featured}
                ctaLink={pkg.ctaLink}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
