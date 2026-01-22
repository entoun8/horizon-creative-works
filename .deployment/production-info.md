# Production Deployment Information

## Deployment Details

**Status:** ✅ DEPLOYED AND LIVE  
**Deployment Date:** 2026-01-22  
**Production URL:** https://horizon-creative-works.vercel.app

**Alternative URLs:**
- https://horizon-creative-works-entouns-projects.vercel.app
- https://horizon-creative-works-git-main-entouns-projects.vercel.app

## Vercel Project Configuration

**Vercel Project Name:** horizon-creative-works  
**Vercel Project ID:** prj_Z9XHcRQeFmM9onAzOKyhiUIClT8m  
**Vercel Team:** entoun's projects (team_GZ49c5rejh2HBbrvCziU1PEH)  
**Latest Deployment ID:** dpl_Du2rUfMScaPjaHMKakvhbVMxgtvq  
**Git Repository:** _Connect to GitHub repository_  
**Branch Strategy:**
- `main` branch → Production deployments (automatic)
- Pull requests → Preview deployments (automatic)

## Environment Variables Configured

The following environment variables are configured in Vercel Project Settings → Environment Variables (Production environment):

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `RESEND_API_KEY` | Resend API key for transactional email delivery | `re_xxxxxxxxxx` (obtain from resend.com/api-keys) |
| `CONTACT_EMAIL` | Agency email address to receive form submissions | `contact@youragency.com` or agency Gmail |
| `NEXT_PUBLIC_SITE_URL` | Full production URL including https:// protocol | `https://youragency.com` or `https://your-project.vercel.app` |

**⚠️ Security Note:** Actual environment variable values are stored securely in Vercel and are NOT committed to Git.

**⚠️ IMPORTANT:** Environment variables (`RESEND_API_KEY` and `CONTACT_EMAIL`) are currently **NOT configured** in Vercel. The site builds successfully but the contact form will NOT work until these variables are added. See `.deployment/DEPLOYMENT-READY.md` Step 2 for instructions.

## Domain Configuration

### Custom Domain (if applicable)

**Domain Name:** _To be filled if custom domain is used_  
**Domain Registrar:** _e.g., Namecheap, GoDaddy, etc._  
**DNS Records Configured:**
- Root domain: A record → 76.76.21.21 OR CNAME → `cname.vercel-dns.com`
- WWW subdomain: CNAME → `cname.vercel-dns.com`

**DNS Propagation Status:** _To be verified after DNS configuration_  
**HTTPS Certificate Status:** ✓ Automatically provisioned by Vercel via Let's Encrypt

### Vercel Subdomain (default)

**Default URL:** `https://[project-name]-[unique-id].vercel.app`  
**HTTPS:** ✓ Enabled by default

## Monitoring and Analytics

### Vercel Analytics
- **Status:** Enabled
- **Access:** Vercel Dashboard → Project → Analytics tab
- **Metrics Tracked:** Page views, Core Web Vitals (FCP, TTI, CLS), Unique visitors
- **Data Latency:** ~5-10 minutes (not real-time)

### Vercel Function Logs
- **Status:** Enabled (automatic)
- **Access:** Vercel Dashboard → Deployments → Select deployment → Functions → View logs
- **Functions Monitored:** `/api/contact` serverless function
- **Log Content:** console.log/error output, execution time, HTTP status codes, errors

### Email Delivery Monitoring
- **Service:** Resend
- **Dashboard:** https://resend.com/emails
- **Limits:** 100 emails/day (free tier)
- **Monitoring:** Delivery status, failures, bounce rates

## Build Configuration

**Build Command:** `npm run build`  
**Build Output Directory:** `.next` (handled automatically by Vercel)  
**Node.js Version:** 20.x (Vercel default)  
**Build Time:** ~20-30 seconds (SSG build)

## Known Issues and Limitations

- **Contact Form Not Functional:** Environment variables (`RESEND_API_KEY` and `CONTACT_EMAIL`) need to be configured in Vercel before contact form will work
- **Email Sender Domain:** The `from` address in `lib/email-service.ts` is set to `noreply@yourdomain.com` and should be updated to a verified Resend domain
- All other features are fully functional

## Post-Launch Maintenance

Refer to `.deployment/post-launch-checklist.md` for ongoing maintenance tasks and monitoring procedures.

---

**Last Updated:** 2026-01-22  
**Updated By:** James (Dev Agent)  
**Deployment Status:** Site is live and accessible, pending environment variable configuration for full functionality
