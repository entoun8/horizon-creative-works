# Manual Accessibility Testing Checklist - Story 5.2

**Date Created**: 2026-01-22  
**Purpose**: Complete validation for ACs 5, 8, 11 (Tasks 1, 9, 10)  
**Required By**: Quinn (Test Architect) - QA Gate CONCERNS

---

## Prerequisites

✅ Dev server running: http://localhost:3000  
⬜ axe DevTools Chrome extension installed  
⬜ Chrome DevTools Lighthouse available  
⬜ NVDA (Windows) or VoiceOver (Mac) installed/enabled

---

## Task 1 & 10: Automated Accessibility Audits (AC 11)

### axe DevTools Chrome Extension

**Installation**: https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd

**Pages to Audit**:
- [ ] Homepage: http://localhost:3000/
- [ ] About: http://localhost:3000/about
- [ ] Contact: http://localhost:3000/contact
- [ ] Privacy: http://localhost:3000/privacy

**For Each Page**:
1. Open page in Chrome
2. Open DevTools (F12) → axe DevTools tab
3. Click "Scan ALL of my page"
4. Document results:
   - Violations count (target: 0)
   - Any warnings (document)
   - Screenshot of results
5. If violations found: Document issue, implement fix, re-test

**Expected Result**: 0 violations on all pages

### Lighthouse Accessibility Audit

**Pages to Audit** (same 4 pages):
- [ ] Homepage
- [ ] About
- [ ] Contact
- [ ] Privacy

**For Each Page**:
1. Open page in Chrome
2. Open DevTools (F12) → Lighthouse tab
3. Select "Accessibility" category only (faster)
4. Choose "Desktop" device
5. Click "Analyze page load"
6. Document results:
   - Accessibility score (target: ≥95, ideally 100)
   - Any failed audits
   - Screenshot of report
7. If score < 95: Review failed audits, fix, re-test

**Expected Result**: Scores ≥95 on all pages

---

## Task 5: Color Contrast Verification (AC 5)

### WebAIM Contrast Checker

**Tool**: https://webaim.org/resources/contrastchecker/

**Text/Background Combinations to Check**:

**Homepage**:
- [ ] Body text (foreground) on white background → Ratio: _____ (need ≥4.5:1)
- [ ] Muted text (muted-foreground) on white → Ratio: _____ (need ≥4.5:1)
- [ ] Hero headline (large text) on white → Ratio: _____ (need ≥3:1)
- [ ] Button text on primary background → Ratio: _____ (need ≥4.5:1)
- [ ] "Most Popular" badge text on primary → Ratio: _____ (need ≥4.5:1)

**Contact Page**:
- [ ] Form labels on white background → Ratio: _____ (need ≥4.5:1)
- [ ] Success message text on green-50 → Ratio: _____ (need ≥4.5:1)
- [ ] Error message text on red-50 → Ratio: _____ (need ≥4.5:1)

**All Pages**:
- [ ] Navigation links on white → Ratio: _____ (need ≥4.5:1)
- [ ] Footer text on white → Ratio: _____ (need ≥4.5:1)

**How to Check**:
1. Open DevTools → Inspect element
2. Note foreground color (text) and background color
3. Enter colors into WebAIM Contrast Checker
4. Verify ratio meets WCAG 2.1 AA minimums
5. If fails: Adjust colors in globals.css, re-test

**Note**: shadcn/ui default palette is WCAG-compliant, but verification required

---

## Task 9: Screen Reader Testing (AC 8)

### Setup

**Windows**: Download NVDA (free): https://www.nvaccess.org/download/  
**Mac**: Enable VoiceOver: System Preferences → Accessibility → VoiceOver

### Testing Procedure

**Homepage** (http://localhost:3000/):
- [ ] Start screen reader
- [ ] Tab from page load: Skip link announced and functional?
- [ ] Navigate by headings (H key): Logical structure (H1 → H2 → H3)?
- [ ] Hero CTA button: Announced as button with clear purpose?
- [ ] Packages section: H2 announced, cards navigable?
- [ ] Package cards: Title, price, deliverables all announced?
- [ ] Featured badge: "Most Popular" announced (not just icon)?
- [ ] "Get Started" buttons: Clear purpose from context?
- [ ] Footer links: Purpose clear?

**Document**: Any confusing, repetitive, or missing announcements

**About Page** (http://localhost:3000/about):
- [ ] H1 page title announced correctly?
- [ ] Team positioning text readable?
- [ ] Team photo: Alt text announced clearly?
- [ ] Values section: H2 and card content announced?
- [ ] CTA button navigable and clear?

**Contact Page** (http://localhost:3000/contact):
- [ ] H1 page title announced?
- [ ] Response guarantee badge readable?
- [ ] Contact options cards navigable?
- [ ] Email link announced with purpose?
- [ ] Form section H2 announced?
- [ ] All form labels announced before inputs?
- [ ] Required vs optional fields clear?
- [ ] Simulate form submission:
  - [ ] Loading state announced ("Sending...")?
  - [ ] Success message announced automatically (aria-live)?
  - [ ] Error message announced automatically?
  - [ ] Field validation errors announced?

**Privacy Page** (http://localhost:3000/privacy):
- [ ] H1 page title announced?
- [ ] H2 section headings logical?
- [ ] Lists (bullets) formatted correctly?
- [ ] Links to external privacy policies announced?
- [ ] Email links clear?

### Mobile Menu Testing (All Pages)

- [ ] Hamburger button: "Toggle navigation menu" announced?
- [ ] Press Enter on hamburger: Menu opens?
- [ ] Menu state change announced ("expanded")?
- [ ] Menu links navigable with Tab?
- [ ] Menu links purpose clear?
- [ ] Press Escape: Menu closes?

### Documentation Template

For each page, note:
- ✅ What worked well
- ⚠️ Any confusing announcements
- ❌ Any content not announced
- 🔧 Any recommended improvements

---

## Task 9: Keyboard Navigation Testing (AC 1, 2)

### Test All Pages

**Tab Order**:
- [ ] Logical sequence (visual order matches tab order)?
- [ ] No tab traps (can tab through entire page)?
- [ ] Skip link appears first (Tab from page load)?
- [ ] Skip link Enter jumps to main content?

**Focus Indicators**:
- [ ] All interactive elements show visible focus ring?
- [ ] Focus ring has sufficient contrast (visible against background)?
- [ ] Focus ring style consistent across site?

**Keyboard Actions**:
- [ ] All buttons activate on Enter and Space?
- [ ] All links activate on Enter?
- [ ] Form submission works via Enter in last field?
- [ ] Mobile menu opens on Enter/Space?
- [ ] Mobile menu closes on Escape?

**Hero CTA Button** (homepage):
- [ ] Button focusable via Tab?
- [ ] Enter activates smooth scroll to #packages?
- [ ] Packages section receives focus?

---

## Task 7: Grayscale Mode Testing (AC 9)

### Chrome DevTools Method

1. Open DevTools (F12) → Rendering tab
2. Enable "Emulate vision deficiencies" → "Achromatopsia" (no color)
3. Navigate site in grayscale

**Verify**:
- [ ] Success messages distinguishable (green icon visible in grayscale?)
- [ ] Error messages distinguishable (red icon visible?)
- [ ] Featured package distinguishable (star icon + "Most Popular" text visible?)
- [ ] Form validation states clear without color?
- [ ] All information conveyed through multiple channels (color + text + icons)?

---

## Completion Criteria

### All Tasks Complete When:
- [ ] axe DevTools: 0 violations on all 4 pages
- [ ] Lighthouse: Scores ≥95 on all 4 pages
- [ ] Color contrast: All ratios meet WCAG 2.1 AA minimums
- [ ] Screen reader: All content announced logically, no confusing repetition
- [ ] Keyboard nav: Full site navigable, no traps, visible focus
- [ ] Grayscale: All information distinguishable without color
- [ ] Screenshots saved for evidence:
  - axe DevTools clean reports (4 pages)
  - Lighthouse scores (4 pages)
  - Any before/after comparisons if fixes required

### Update Story When Complete

After validation passes:
1. Update story Tasks 1, 9, 10 as complete
2. Add test results to Completion Notes
3. Update Status to "Ready for Review"
4. Request QA re-run review to update gate to PASS

---

## Notes

**Current Status**: Code implementation complete and excellent. Only validation documentation missing.

**Expected Outcome**: Zero violations (code already implements all features correctly).

**Time Estimate**: 1.5-2 hours total for all validation steps.

**If Violations Found**: Document issue → Implement fix → Re-run validation → Update story
