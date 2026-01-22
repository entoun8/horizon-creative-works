# Production Testing Guide

**Purpose:** This guide provides step-by-step instructions for manually testing the production deployment. Complete all tests and document results before marking Story 5.4 as complete.

**Tester:** Project owner or designated human tester  
**Test Environment:** Live production URL (custom domain or Vercel subdomain)  
**Test Date:** _To be filled by tester_

---

## Prerequisites

Before beginning testing:

- [ ] Production deployment completed successfully (check Vercel dashboard)
- [ ] All environment variables configured in Vercel Production environment
- [ ] Have access to the agency inbox configured in `CONTACT_EMAIL` environment variable
- [ ] Have a secondary email address for testing contact form (different from `CONTACT_EMAIL`)

---

## Test Section 1: Deployment and Environment Verification

### 1.1 Verify Deployment Status

**Instructions:**
1. Log into Vercel dashboard: https://vercel.com/dashboard
2. Navigate to your project
3. Check latest deployment status

**Expected Result:** Deployment status shows "Ready" with green checkmark

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

### 1.2 Verify Environment Variables

**Instructions:**
1. In Vercel dashboard, go to Project Settings → Environment Variables
2. Verify the following variables exist for **Production** environment:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`

**Expected Result:** All three variables are configured for Production environment

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

### 1.3 Verify HTTPS Certificate

**Instructions:**
1. Visit production URL in browser
2. Check for padlock icon in address bar
3. Click padlock and verify certificate is valid

**Expected Result:** 
- Padlock icon visible
- Certificate shows "Connection is secure"
- No certificate warnings

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

### 1.4 Test HTTP to HTTPS Redirect

**Instructions:**
1. In browser address bar, type `http://` (not https://) + your domain
2. Press Enter

**Expected Result:** Browser automatically redirects to `https://` version

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

## Test Section 2: Contact Form End-to-End Testing

### 2.1 Submit Valid Contact Form

**Instructions:**
1. Navigate to production `/contact` page
2. Fill out form with the following data:
   - **Name:** "Production Test Submission"
   - **Email:** [your secondary email address - NOT the CONTACT_EMAIL]
   - **Phone:** "+1 555-0123" (optional)
   - **Message:** "This is a test submission to verify production email delivery. Please confirm receipt."
3. Click "Send Message" button

**Expected Result:** 
- Success message displays: "Thank you! We'll respond within 24 hours."
- Form clears after submission
- No error messages shown

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

### 2.2 Verify Email Received

**Instructions:**
1. Check agency inbox (the email address configured in `CONTACT_EMAIL`)
2. Look for email from Resend with subject containing "New Contact Form Submission"
3. Verify email contains all form fields:
   - Name: "Production Test Submission"
   - Email: [your secondary email]
   - Phone: "+1 555-0123"
   - Message: Full message text

**Expected Result:** Email received within 1-2 minutes with all form data correctly formatted

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

**Note:** If email not received within 5 minutes, check Vercel Function Logs for errors (see Section 6.2)

---

### 2.3 Test Form Validation (Invalid Email)

**Instructions:**
1. Navigate to production `/contact` page
2. Fill out form with invalid email:
   - **Name:** "Test User"
   - **Email:** "invalid-email" (no @ symbol)
   - **Message:** "Testing validation"
3. Click "Send Message" button

**Expected Result:** 
- Error message displays below email field: "Please enter a valid email address"
- Form does NOT submit
- No success message shown

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

### 2.4 Test Form Validation (Message Too Short)

**Instructions:**
1. Refresh contact page
2. Fill out form with short message:
   - **Name:** "Test User"
   - **Email:** "test@example.com"
   - **Message:** "Hi" (less than 10 characters)
3. Click "Send Message" button

**Expected Result:** 
- Error message displays below message field: "Message must be at least 10 characters"
- Form does NOT submit

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

### 2.5 Test Rate Limiting

**Instructions:**
1. Submit a valid contact form (Name: "Rate Limit Test 1", Email: valid email, Message: 10+ chars)
2. Wait for success message
3. Immediately submit another form (Name: "Rate Limit Test 2", Email: same/different email, Message: 10+ chars)

**Expected Result:** 
- First submission succeeds
- Second submission (within 5 minutes) shows error: "Too many requests. Please try again in a few minutes."
- HTTP status 429 (visible in browser DevTools Network tab)

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

## Test Section 3: Navigation and Link Testing

### 3.1 Test Navigation Links

**Instructions:**
Test each navigation link by clicking and verifying correct page loads:

| Link | Expected Destination | Status |
|------|---------------------|--------|
| Home | Homepage (`/`) | [ ] PASS  [ ] FAIL |
| About | About page (`/about`) | [ ] PASS  [ ] FAIL |
| Contact | Contact page (`/contact`) | [ ] PASS  [ ] FAIL |
| Privacy | Privacy Policy page (`/privacy`) | [ ] PASS  [ ] FAIL |

**Notes:** _Any issues observed?_

---

### 3.2 Test Hero CTA Button

**Instructions:**
1. Navigate to homepage
2. Click "View Our Packages" button in hero section

**Expected Result:** Page smoothly scrolls down to packages section (anchor: `#packages`)

**Actual Result:** _To be filled by tester_

**Status:** [ ] PASS  [ ] FAIL

---

### 3.3 Test Package Card CTA Buttons

**Instructions:**
Test each package card's CTA button:

| Package | Button Text | Expected Destination | Status |
|---------|------------|---------------------|--------|
| Starter | "Get Started" | `/contact` page | [ ] PASS  [ ] FAIL |
| Business | "Get Started" | `/contact` page | [ ] PASS  [ ] FAIL |
| Custom | "Contact Us" | `/contact` page | [ ] PASS  [ ] FAIL |

**Notes:** _Any issues observed?_

---

### 3.4 Test Social Media Links

**Instructions:**
1. Navigate to contact page
2. Test each social media icon link:

| Social Media | Icon | Expected Behavior | Correct Profile URL? | Status |
|--------------|------|------------------|---------------------|--------|
| Facebook | Facebook icon | Opens in new tab | [ ] YES  [ ] NO | [ ] PASS  [ ] FAIL |
| Instagram | Instagram icon | Opens in new tab | [ ] YES  [ ] NO | [ ] PASS  [ ] FAIL |

**Expected Attributes:** All external links should have `target="_blank"` and `rel="noopener noreferrer"`

**Facebook URL:** _Record actual URL opened_ ___________________________________

**Instagram URL:** _Record actual URL opened_ ___________________________________

**Notes:** _Are these the correct agency profile URLs?_

---

### 3.5 Test Email (Mailto) Link

**Instructions:**
1. On contact page, click the email icon or email address link

**Expected Result:** 
- Opens default email client (Gmail, Outlook, Mail app)
- "To:" field pre-filled with correct agency email address

**Email Address Shown:** _Record email address_ ___________________________________

**Status:** [ ] PASS  [ ] FAIL

---

## Test Section 4: Responsive Design Testing

### 4.1 Test Mobile Viewport (375px)

**Instructions:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Set viewport to 375px width (iPhone SE)
4. Navigate through all pages: Home, About, Contact, Privacy

**Checklist:**
- [ ] All content visible (no horizontal scroll)
- [ ] Navigation menu becomes hamburger menu
- [ ] Hamburger menu opens/closes correctly
- [ ] Text is readable (not too small)
- [ ] Images scale correctly
- [ ] Contact form is usable
- [ ] Package cards stack vertically

**Status:** [ ] PASS  [ ] FAIL

**Notes:** _Any layout issues?_

---

### 4.2 Test Tablet Viewport (768px)

**Instructions:**
1. Set viewport to 768px width (iPad)
2. Navigate through all pages

**Checklist:**
- [ ] Layout adjusts correctly for tablet
- [ ] Navigation displays appropriately
- [ ] Package cards display in appropriate grid
- [ ] No overlapping elements

**Status:** [ ] PASS  [ ] FAIL

---

### 4.3 Test Desktop Viewport (1440px)

**Instructions:**
1. Set viewport to 1440px width (desktop)
2. Navigate through all pages

**Checklist:**
- [ ] Full navigation menu visible (no hamburger)
- [ ] Package cards display side-by-side
- [ ] Content is centered appropriately
- [ ] Whitespace/margins look professional

**Status:** [ ] PASS  [ ] FAIL

---

### 4.4 Test on Actual Mobile Device

**Instructions:**
1. Open production URL on actual mobile device (iPhone or Android)
2. Test basic functionality

**Device Used:** _iOS Safari / Android Chrome / Other_

**Checklist:**
- [ ] Site loads quickly
- [ ] Touch interactions work (buttons, links, form)
- [ ] Navigation menu works
- [ ] No visual glitches

**Status:** [ ] PASS  [ ] FAIL

---

## Test Section 5: Performance and SEO Testing

### 5.1 Run Lighthouse Audit - Homepage

**Instructions:**
1. Open production homepage in Chrome
2. Open DevTools (F12) → Lighthouse tab
3. Select "Desktop" mode
4. Check all categories (Performance, Accessibility, Best Practices, SEO)
5. Click "Analyze page load"

**Expected Scores (all ≥90):**
- Performance: _____  [ ] ≥90
- Accessibility: _____  [ ] ≥90
- Best Practices: _____  [ ] ≥90
- SEO: _____  [ ] ≥90

**Core Web Vitals:**
- FCP: _____ seconds  [ ] <1.5s
- TTI: _____ seconds  [ ] <3s

**Status:** [ ] PASS  [ ] FAIL

---

### 5.2 Run Lighthouse Audit - About Page

**Repeat Lighthouse audit for `/about` page**

**Scores:**
- Performance: _____  [ ] ≥90
- Accessibility: _____  [ ] ≥90
- Best Practices: _____  [ ] ≥90
- SEO: _____  [ ] ≥90

**Status:** [ ] PASS  [ ] FAIL

---

### 5.3 Run Lighthouse Audit - Contact Page

**Repeat Lighthouse audit for `/contact` page**

**Scores:**
- Performance: _____  [ ] ≥90
- Accessibility: _____  [ ] ≥90
- Best Practices: _____  [ ] ≥90
- SEO: _____  [ ] ≥90

**Status:** [ ] PASS  [ ] FAIL

---

### 5.4 Run Lighthouse Audit - Privacy Page

**Repeat Lighthouse audit for `/privacy` page**

**Scores:**
- Performance: _____  [ ] ≥90
- Accessibility: _____  [ ] ≥90
- Best Practices: _____  [ ] ≥90
- SEO: _____  [ ] ≥90

**Status:** [ ] PASS  [ ] FAIL

---

### 5.5 Verify Meta Tags (SEO)

**Instructions:**
1. On homepage, open DevTools → Elements tab
2. Locate `<head>` section
3. Verify presence of meta tags

**Checklist:**
- [ ] `<title>` tag present
- [ ] `<meta name="description">` present
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:image`)
- [ ] Favicon displays in browser tab

**Status:** [ ] PASS  [ ] FAIL

---

## Test Section 6: Monitoring and Analytics

### 6.1 Verify Vercel Analytics Tracking

**Instructions:**
1. Navigate through all pages on production site (Home, About, Contact, Privacy)
2. Wait 10 minutes
3. Log into Vercel Dashboard → Project → Analytics tab

**Expected Result:** Analytics shows page views for pages visited

**Actual Result:** _To be filled by tester_

**Metrics Visible:**
- [ ] Page views per page
- [ ] Core Web Vitals (FCP, TTI, CLS)

**Status:** [ ] PASS  [ ] FAIL

**Note:** Analytics data has ~5-10 minute delay, not real-time

---

### 6.2 Verify Vercel Function Logs Accessible

**Instructions:**
1. In Vercel Dashboard, go to Deployments
2. Select latest production deployment
3. Click "Functions" tab
4. Select `/api/contact` function
5. Click "View logs"

**Expected Result:** Logs display showing recent function executions

**Log Entries Visible:**
- [ ] Successful contact form submissions (200 status)
- [ ] Timestamp and execution details

**Status:** [ ] PASS  [ ] FAIL

---

## Test Section 7: Console Errors and Visual Verification

### 7.1 Check for Console Errors

**Instructions:**
1. Open DevTools Console (F12 → Console tab)
2. Navigate through all pages: Home, About, Contact, Privacy
3. Look for any red error messages in console

**Expected Result:** No console errors on any page

**Errors Found:** _List any errors or write "None"_

**Status:** [ ] PASS  [ ] FAIL

---

### 7.2 Verify No Broken Images

**Instructions:**
1. Visually inspect all pages
2. Verify all images load correctly (no broken image icons)

**Pages Checked:**
- [ ] Homepage - all images load
- [ ] About page - all images load
- [ ] Contact page - all images load
- [ ] Privacy page - all images load

**Status:** [ ] PASS  [ ] FAIL

---

### 7.3 Verify Favicon Displays

**Instructions:**
Check browser tab for favicon (small icon next to page title)

**Expected Result:** Favicon visible in all browser tabs

**Status:** [ ] PASS  [ ] FAIL

---

## Test Section 8: Cross-Browser Testing (Optional but Recommended)

### 8.1 Test in Multiple Browsers

**Instructions:**
Repeat core tests (navigation, contact form, responsive design) in different browsers:

| Browser | Version | Navigation Works | Form Works | Layout Correct | Status |
|---------|---------|-----------------|-----------|----------------|--------|
| Chrome | _____ | [ ] | [ ] | [ ] | [ ] PASS  [ ] FAIL |
| Firefox | _____ | [ ] | [ ] | [ ] | [ ] PASS  [ ] FAIL |
| Safari | _____ | [ ] | [ ] | [ ] | [ ] PASS  [ ] FAIL |
| Edge | _____ | [ ] | [ ] | [ ] | [ ] PASS  [ ] FAIL |

---

## Test Summary

### Overall Test Results

**Total Tests:** 40+  
**Tests Passed:** _____  
**Tests Failed:** _____

**Critical Issues (must fix before launch):**

_List any critical failures_

**Minor Issues (can be addressed post-launch):**

_List any minor issues_

---

### Sign-Off

**Tester Name:** ___________________________________  
**Test Date:** ___________________________________  
**Test Duration:** ___________________________________  
**Recommendation:** [ ] APPROVE FOR LAUNCH  [ ] REQUIRES FIXES

**Tester Signature:** ___________________________________

---

## Troubleshooting Guide

### If Contact Form Email Not Received:

1. Check Vercel Function Logs: Deployments → Functions → `/api/contact` → View logs
2. Look for errors in logs (401 Unauthorized = Resend API key issue, 500 = server error)
3. Verify `RESEND_API_KEY` is correctly set in Vercel environment variables
4. Log into Resend dashboard: https://resend.com/emails to check delivery status
5. Verify `CONTACT_EMAIL` environment variable has correct email address
6. Check spam/junk folder in agency inbox

### If Site is Down or Slow:

1. Check Vercel Status page: https://www.vercel-status.com/
2. Check Vercel Dashboard → Deployments for failed deployments
3. Review build logs for errors
4. Verify DNS records if using custom domain (use nslookup or online DNS checker)

### If Analytics Not Tracking:

1. Verify Vercel Analytics is enabled: Project Settings → Analytics
2. Wait 10-15 minutes (data not real-time)
3. Check that `@vercel/analytics` package is installed
4. Verify `<Analytics />` component is in `app/layout.tsx`

---

**Testing Guide Version:** 1.0  
**Created:** 2026-01-22  
**Created By:** James (Dev Agent)
