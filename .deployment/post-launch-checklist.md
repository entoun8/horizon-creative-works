# Post-Launch Maintenance Checklist

This checklist outlines ongoing maintenance tasks and monitoring procedures to ensure the website continues to operate smoothly after production launch.

## Daily Tasks

### 1. Contact Form Monitoring
- [ ] Check agency inbox (`CONTACT_EMAIL`) for new form submissions
- [ ] Respond to inquiries within 24 hours (as promised in success message)
- [ ] Verify no delivery failures in Resend dashboard: https://resend.com/emails
- [ ] If email not received, check Vercel Function Logs for `/api/contact` errors

### 2. Basic Site Health Check
- [ ] Visit production homepage to verify site is loading correctly
- [ ] Quick check that HTTPS is active (browser padlock icon visible)
- [ ] If site is down or slow, check Vercel dashboard for deployment status

## Weekly Tasks

### 1. Analytics Review
- [ ] Log into Vercel Dashboard → Project → Analytics tab
- [ ] Review page view counts for `/`, `/about`, `/contact`, `/privacy`
- [ ] Check Core Web Vitals trends: FCP, TTI, CLS
- [ ] Identify which pages are most visited and which packages generate most interest
- [ ] Note any performance degradation (FCP >1.5s or TTI >3s)

### 2. Function Logs Review
- [ ] Navigate to Vercel Dashboard → Deployments → Select latest production deployment
- [ ] Review Function Logs for `/api/contact` serverless function
- [ ] Check for any 4xx errors (validation failures, rate limiting) or 5xx errors (server errors)
- [ ] Investigate any unusual patterns (e.g., spike in 429 rate limit errors = potential bot activity)

### 3. Email Delivery Monitoring
- [ ] Log into Resend dashboard: https://resend.com/emails
- [ ] Review email delivery rate (should be 100% success)
- [ ] Check for any bounces or failed deliveries
- [ ] Monitor daily email count (alert if approaching 100/day limit)

## Monthly Tasks

### 1. Security and Dependency Updates
- [ ] Run `npm audit` in project directory to check for security vulnerabilities
- [ ] Review npm audit report and address any high/critical vulnerabilities
- [ ] Check for dependency updates: `npm outdated`
- [ ] Consider updating dependencies if critical security patches are available
- [ ] Test updates in preview deployment before deploying to production

### 2. Performance and SEO Review
- [ ] Run Lighthouse audit on production homepage and key pages
- [ ] Verify all scores remain ≥90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Check Google Search Console (if sitemap submitted) for indexing status
- [ ] Review organic search traffic trends (if Google Analytics added in Phase 2)

### 3. Content and Link Verification
- [ ] Test contact form submission end-to-end (use test email, verify delivery)
- [ ] Verify all navigation links work correctly (Home, About, Contact, Privacy)
- [ ] Check social media links (Facebook, Instagram) still point to correct profiles
- [ ] Verify mailto link works with correct agency email address

### 4. Backup and Documentation
- [ ] Ensure latest code is committed and pushed to GitHub repository
- [ ] Review `.deployment/production-info.md` for accuracy
- [ ] Document any configuration changes made during the month
- [ ] Update README.md if any deployment procedures have changed

## Quarterly Tasks

### 1. Major Dependency Updates
- [ ] Review all dependencies for major version updates: `npm outdated`
- [ ] Plan and test major updates in development environment
- [ ] Update Next.js, React, and other core dependencies
- [ ] Run full regression testing after updates (cross-browser, device testing)
- [ ] Deploy updates to production via main branch

### 2. Domain and SSL Certificate Management
- [ ] If using custom domain: Check domain registration expiration date
- [ ] Renew domain registration if expiring within 90 days
- [ ] Verify HTTPS certificate is active (Vercel handles renewal automatically)
- [ ] Review DNS records for accuracy (no changes unless domain registrar switched)

### 3. Comprehensive Site Audit
- [ ] Run axe DevTools accessibility audit on all pages
- [ ] Verify WCAG 2.1 AA compliance maintained
- [ ] Test site on latest browser versions (Chrome, Firefox, Safari, Edge)
- [ ] Test site on latest mobile devices (iOS Safari, Android Chrome)
- [ ] Review and update privacy policy if any data practices changed

### 4. Traffic and Lead Analysis
- [ ] Analyze Vercel Analytics data for traffic patterns over the quarter
- [ ] Review contact form submission rate and lead conversion
- [ ] Identify highest-traffic pages and most popular packages
- [ ] Make data-driven decisions for Phase 2 feature priorities
- [ ] Consider A/B testing for CTAs or package descriptions if needed

## Incident Response

### If Website is Down
1. Check Vercel dashboard → Deployments → Verify latest deployment status
2. If deployment failed, review build logs for errors
3. If deployment succeeded but site is down, check Vercel Status page: https://www.vercel-status.com/
4. If Vercel is operational, check DNS records and domain configuration
5. Roll back to previous working deployment if necessary (Vercel Dashboard → Deployments → Select previous → Redeploy)

### If Contact Form is Not Working
1. Test form submission manually on production site
2. Check Vercel Function Logs for `/api/contact` errors
3. Verify environment variables are set correctly in Vercel (RESEND_API_KEY, CONTACT_EMAIL)
4. Check Resend dashboard for email delivery failures or API errors
5. If Resend API key expired, regenerate key and update in Vercel environment variables
6. Test with curl or Postman to isolate frontend vs. backend issue

### If Analytics Stop Tracking
1. Verify Vercel Analytics is still enabled: Project Settings → Analytics
2. Check that `@vercel/analytics` package is installed and imported in layout.tsx
3. Review Vercel Analytics FAQ: https://vercel.com/docs/analytics
4. Contact Vercel Support if analytics not recording despite correct configuration

## Escalation Contacts

**Technical Issues:**
- Vercel Support: https://vercel.com/help
- Resend Support: https://resend.com/support

**Domain/DNS Issues:**
- Contact domain registrar support (Namecheap, GoDaddy, etc.)

**Development Changes:**
- Engage developer for code changes, new features, or bug fixes

---

**Checklist Created:** 2026-01-22  
**Created By:** James (Dev Agent)  
**Review Frequency:** Update this checklist quarterly or when new maintenance procedures are identified
