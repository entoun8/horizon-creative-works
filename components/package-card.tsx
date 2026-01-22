import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface PackageCardProps {
  title: string;
  price: string;
  deliverables: string[];
  featured?: boolean;
  ctaLink: string;
}

export function PackageCard({ 
  title, 
  price, 
  deliverables, 
  featured = false, 
  ctaLink 
}: PackageCardProps) {
  return (
    <Card 
      className={`p-6 hover:shadow-lg transition-shadow duration-300 ${
        featured ? 'border-primary border-2' : ''
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          {featured && (
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Star className="h-4 w-4" aria-hidden="true" />
              Most Popular
            </span>
          )}
        </div>
        <p className="text-4xl font-bold">{price}</p>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {deliverables.map((item, index) => (
            <li key={`deliverable-${index}`} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Link href={ctaLink} className="w-full">
          <Button size="lg" className="w-full">Get Started</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
