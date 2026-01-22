'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="py-4 border-b relative">
      <div className="flex items-center justify-between">
        {/* Logo/Site Name */}
        <Link href="/" className="flex items-center gap-2 focus:outline-2 focus:outline-offset-2 focus:outline-primary rounded">
          <Image 
            src="/logo.svg" 
            alt="Horizon Creative Works home" 
            width={32} 
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xl font-bold">HCW</span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile, flex on md and up */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Hamburger Menu - Visible on mobile, hidden on md and up */}
        <button
          className="md:hidden p-2 focus:outline-2 focus:outline-offset-2 focus:outline-primary rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Full width overlay */}
      {isMenuOpen && (
        <div 
          className="absolute top-full left-0 right-0 md:hidden bg-background border-b shadow-lg z-50 py-4 -mx-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2 px-4">
            {navLinks.map((link) => (
              <Button 
                key={link.href} 
                variant="ghost" 
                asChild 
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
