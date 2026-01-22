# Manual Testing Checklist

**Project:** Horizon Creative Works  
**Story:** 5.3 Cross-Browser and Device Testing  
**Created:** 2026-01-22

## Purpose

This checklist provides step-by-step manual testing scenarios for cross-browser and device compatibility testing. Each scenario should be executed on all target browsers and devices listed in the browser-device-testing-matrix.md.

---

## Test Scenarios

### Scenario 1: Homepage Load and Layout

**Objective:** Verify homepage loads correctly and displays proper layout at target viewport

**Steps:**
1. Navigate to homepage (/)
2. Wait for page to fully load
3. Verify hero section displays correctly (headline, subheading, CTA button)
4. Verify packages section displays correctly (3 package cards in grid)
5. Verify footer displays correctly
6. Check for horizontal scrolling (should be none)
7. Open DevTools Console and check for errors/warnings

**Expected Results:**
- Page loads within 2 seconds
- All images load correctly
- Text is readable and properly sized
- No horizontal scrolling
- No console errors

**Pass/Fail:** _____

---

### Scenario 2: Navigation - Desktop (1440px viewport)

**Objective:** Verify horizontal navigation menu works correctly on desktop

**Steps:**
1. Set viewport to 1440px width
2. Navigate to homepage
3. Verify horizontal navigation menu displays (Home, About, Contact, Privacy links visible)
4. Click "Home" link - verify it navigates or highlights as active
5. Click "About" link - verify navigation to /about page
6. Click "Contact" link - verify navigation to /contact page
7. Click "Privacy" link - verify navigation to /privacy page
8. Use Tab key to navigate through links, verify keyboard navigation works
9. Press Enter on a focused link, verify navigation occurs

**Expected Results:**
- Horizontal menu visible (no hamburger icon)
- All links navigate correctly
- Active page is highlighted
- Keyboard navigation works (Tab, Enter)
- No console errors

**Pass/Fail:** _____

---

### Scenario 3: Navigation - Mobile (375px viewport)

**Objective:** Verify hamburger menu works correctly on mobile

**Steps:**
1. Set viewport to 375px width
2. Navigate to homepage
3. Verify hamburger menu icon (☰) displays in navigation
4. Tap/click hamburger icon
5. Verify mobile menu slides in or appears
6. Verify menu contains links: Home, About, Contact, Privacy
7. Tap "About" link - verify navigation to /about and menu closes
8. Reopen menu, tap close icon (X)
9. Verify menu closes

**Expected Results:**
- Hamburger icon visible at 375px
- Menu opens/closes correctly
- All links work and menu closes after navigation
- Touch targets are minimum 44×44px
- No console errors

**Pass/Fail:** _____

---

### Scenario 4: Contact Form Submission - Valid Data

**Objective:** Verify contact form accepts valid data and submits successfully

**Steps:**
1. Navigate to /contact page
2. Fill in form fields:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "555-1234" (optional)
   - Message: "I would like to learn more about your services"
3. Click Submit button
4. Wait for submission to complete
5. Verify success message displays: "Thank you! We'll be in touch soon." (or similar)
6. Check DevTools Network tab - verify POST request to /api/contact returns 200 status
7. Check DevTools Console for errors

**Expected Results:**
- Form accepts valid input
- Submit button shows loading state during submission
- Success message displays
- API returns 200 status
- No console errors
- Form clears or remains filled (based on implementation)

**Pass/Fail:** _____

---

### Scenario 5: Contact Form Validation - Invalid Data

**Objective:** Verify form validation works correctly for invalid inputs

**Steps:**
1. Navigate to /contact page
2. Leave Name field empty, fill other fields validly
3. Click Submit - verify error message for Name field
4. Fill Name, enter invalid email "notanemail"
5. Click Submit - verify error message for Email field
6. Fill all fields validly except Message (leave empty or too short)
7. Click Submit - verify error message for Message field
8. Verify form does NOT submit when validation fails
9. Check console for errors

**Expected Results:**
- Validation errors display inline near fields
- Error messages are clear and helpful
- Form does NOT submit with invalid data
- No console errors (validation errors are expected UI behavior)

**Pass/Fail:** _____

---

### Scenario 6: Contact Form Rate Limiting

**Objective:** Verify rate limiting prevents spam (1 submission per 5 minutes)

**Steps:**
1. Navigate to /contact page
2. Fill form with valid data and submit successfully
3. Wait for success message
4. Immediately refill form with valid data (within 1 minute)
5. Click Submit again
6. Verify rate limit error message displays (e.g., "Please wait 5 minutes between submissions")
7. Check DevTools Network tab - verify POST request returns 429 status (Too Many Requests)

**Expected Results:**
- First submission succeeds (200 status)
- Second submission within 5 minutes fails (429 status)
- Error message informs user of rate limit
- No console errors

**Pass/Fail:** _____

---

### Scenario 7: Hero CTA Button Smooth Scroll

**Objective:** Verify hero CTA button scrolls smoothly to packages section

**Steps:**
1. Navigate to homepage
2. Scroll to top if needed (hero section should be visible)
3. Click hero CTA button (e.g., "View Our Packages" or similar text)
4. Observe scroll behavior
5. Verify page scrolls to #packages anchor (packages section)
6. Verify scroll is smooth (animated) on modern browsers or instant (acceptable fallback) on older browsers
7. Check console for errors

**Expected Results:**
- Clicking CTA scrolls to packages section
- Scroll behavior is smooth (or instant fallback)
- No JavaScript errors
- No console errors

**Pass/Fail:** _____

---

### Scenario 8: Responsive Layout - 768px Tablet Breakpoint

**Objective:** Verify layout transitions correctly at tablet breakpoint

**Steps:**
1. Set viewport to 768px width
2. Navigate to all 4 pages (Home, About, Contact, Privacy)
3. Verify navigation transitions correctly (likely hamburger menu → horizontal menu at or above 768px)
4. On homepage, verify package cards layout (likely 2 columns at tablet size)
5. On contact page, verify form layout appropriate for tablet
6. Check for horizontal scrolling (should be none)
7. Test navigation functionality at exactly 768px

**Expected Results:**
- Layout adapts appropriately at 768px
- Navigation breakpoint transitions at correct width
- Package cards display in appropriate grid
- No horizontal scrolling
- All interactive elements functional

**Pass/Fail:** _____

---

### Scenario 9: Touch Target Validation - Mobile (375px)

**Objective:** Verify all interactive elements meet 44×44px minimum size on mobile

**Steps:**
1. Set viewport to 375px width
2. Navigate to homepage
3. Use DevTools Inspect tool to measure touch targets:
   - Hamburger menu icon
   - Mobile menu navigation links
   - Hero CTA button
   - Package card CTA buttons
   - Footer links
4. Navigate to contact page
5. Measure contact form submit button
6. Verify all measured elements are ≥44×44px

**Expected Results:**
- All interactive elements meet 44×44px minimum
- Elements are easily tappable without accidental misclicks
- Touch targets documented in matrix

**Pass/Fail:** _____

---

### Scenario 10: Console Error Audit - All Pages

**Objective:** Verify zero console errors/warnings on all pages

**Steps:**
1. Open DevTools Console
2. Navigate to homepage (/)
3. Wait for page load, check console - document any errors/warnings
4. Navigate to /about - check console
5. Navigate to /contact - check console
6. Navigate to /privacy - check console
7. Submit contact form (valid data) - check console during/after submission
8. Test navigation menu interactions - check console
9. Document all errors/warnings found

**Expected Results:**
- Zero critical console errors
- Zero warnings (or only acceptable warnings documented)
- No failed network requests
- No React hydration mismatches
- No deprecated API warnings

**Pass/Fail:** _____

---

## Testing Sign-Off

**All scenarios completed:** [ ]  
**All critical issues resolved:** [ ]  
**Ready for QA review:** [ ]

**Tester:** _______________  
**Date:** _______________  
**Signature:** _______________
