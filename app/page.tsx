import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowRight, Check } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">shadcn UI Integration Test</h1>
          <p className="text-muted-foreground">
            Verifying shadcn/ui components, styling, and responsive behavior
          </p>
        </div>

        {/* Button Variants Test */}
        <Card>
          <CardHeader>
            <CardTitle>Button Component - Variants</CardTitle>
            <CardDescription>Testing different button variants and icon integration</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Check className="h-4 w-4" /></Button>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              With Icon
            </Button>
            <Button>
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Form Components Test */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>Testing Input and Label components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Input id="message" placeholder="Type your message..." />
            </div>
            <Button className="w-full">Submit Form</Button>
          </CardContent>
        </Card>

        {/* Responsive Grid Test */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Mobile (375px)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Single column on mobile devices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tablet (768px)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                2 columns on tablet devices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Desktop (1440px)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                3 columns on desktop screens
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Theme Variables Test */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Theme Variables Test</CardTitle>
            <CardDescription>CSS variables are applying correctly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary" />
              <span className="text-sm">Primary color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-secondary" />
              <span className="text-sm">Secondary color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-muted" />
              <span className="text-sm">Muted color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent" />
              <span className="text-sm">Accent color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-destructive" />
              <span className="text-sm">Destructive color</span>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground pt-8 border-t">
          <p>✅ If all components render with proper styling, shadcn/ui integration is successful!</p>
        </div>
      </div>
    </main>
  );
}
