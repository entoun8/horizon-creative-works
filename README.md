# Horizon Creative Works

A modern, responsive website for a digital marketing agency, built with Next.js and TypeScript.

## Tech Stack

- **Next.js** 14.1+ - React meta-framework with App Router and SSG
- **TypeScript** 5.3+ - Type-safe development for frontend and backend
- **Tailwind CSS** 3.4+ - Utility-first CSS framework
- **shadcn/ui** - Accessible, customizable UI components (Radix UI + Tailwind)
- **shadcn MCP** - Model Context Protocol integration for component management
- **ESLint** - Code quality and linting
- **React Hook Form** + **Zod** - Form handling and validation (to be added)
- **Resend** - Transactional email service (to be added)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd horizon-creative-works
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
horizon-creative-works/
├── app/                    # Next.js App Router pages and layouts
├── components/             # React components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions and shared code
├── public/                # Static assets
└── styles/                # Additional styles
```

## Environment Variables

Create a `.env.local` file in the root directory for local environment variables (see `.env.example` for template).

## Deployment

### Production Environment

[![Deployed on Vercel](https://vercel.com/button)](https://horizon-creative-works-ngr48498j-entouns-projects.vercel.app/)

**Production URL:** https://horizon-creative-works-ngr48498j-entouns-projects.vercel.app/

### Deployment Workflow

- **Automatic Deployment:** All commits pushed to the `main` branch are automatically deployed to production
- **Preview Deployments:** Pull requests generate preview URLs automatically with a unique URL for each PR
- **Build Process:** Vercel automatically runs `npm run build` and deploys to their global Edge Network
- **HTTPS:** SSL certificates are automatically provisioned and managed by Vercel (Let's Encrypt)

### Deployment Status

Check deployment status and build logs in the [Vercel Dashboard](https://vercel.com/dashboard).

## Development

This project follows strict TypeScript configuration and uses Tailwind CSS for styling. Components are built using shadcn/ui for accessibility and consistency.

For more information about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
