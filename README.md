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
- `npm test` - Run test suite with Jest
- `npm run test:watch` - Run tests in watch mode

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

Create a `.env.local` file in the root directory for local development. Required environment variables:

| Variable | Description | Required For |
|----------|-------------|--------------|
| `RESEND_API_KEY` | API key from Resend for email delivery | Production, Testing |
| `CONTACT_EMAIL` | Email address to receive contact form submissions | Production, Testing |
| `NEXT_PUBLIC_SITE_URL` | Full production URL (e.g., https://youragency.com) | Production |

**Example `.env.local` file:**

```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=contact@youragency.com
NEXT_PUBLIC_SITE_URL=https://youragency.com
```

See `.env.example` for a complete template with detailed descriptions.

**⚠️ Security:** Never commit `.env.local` to version control. It's already listed in `.gitignore`.

## Deployment

### Production Environment

[![Deployed on Vercel](https://vercel.com/button)](https://horizon-creative-works-ngr48498j-entouns-projects.vercel.app/)

**Production URL:** https://horizon-creative-works-ngr48498j-entouns-projects.vercel.app/

### Deployment Workflow

- **Automatic Deployment:** All commits pushed to the `main` branch are automatically deployed to production
- **Preview Deployments:** Pull requests generate preview URLs automatically with a unique URL for each PR
- **Build Process:** Vercel automatically runs `npm run build` and deploys to their global Edge Network
- **HTTPS:** SSL certificates are automatically provisioned and managed by Vercel (Let's Encrypt)

### Environment Configuration on Vercel

1. Navigate to your Vercel Project → Settings → Environment Variables
2. Add the required environment variables listed above
3. Ensure variables are set for the **Production** environment
4. Trigger a new deployment after adding/updating variables

### Deployment Status and Monitoring

- **Deployment Status:** Check build status and logs in the [Vercel Dashboard](https://vercel.com/dashboard)
- **Analytics:** Vercel Analytics tracks page views and Core Web Vitals (Project → Analytics tab)
- **Function Logs:** Monitor serverless function execution (Deployments → Select deployment → Functions)

### Deployment Documentation

Detailed deployment information, including production configuration and post-launch maintenance procedures, is available in the `.deployment/` folder:

- `.deployment/production-info.md` - Production deployment details and configuration
- `.deployment/post-launch-checklist.md` - Ongoing maintenance tasks and monitoring
- `.deployment/launch-announcement-templates.md` - Marketing and announcement templates

### Manual Deployment

To deploy manually (if not using automatic Git integration):

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Development

This project follows strict TypeScript configuration and uses Tailwind CSS for styling. Components are built using shadcn/ui for accessibility and consistency.

For more information about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
