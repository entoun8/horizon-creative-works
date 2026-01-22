import { Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright and Links */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Horizon Creative Works. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Contact Icon */}
        <div className="flex items-center gap-4">
          <Link href="mailto:contact@horizoncreativeworks.com" aria-label="Email us" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
