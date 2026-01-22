/**
 * Unit tests for Rate Limiter
 * 
 * Tests the rate limiting logic that enforces 1 submission per IP per 5 minutes.
 */

import { checkRateLimit, clearRateLimits, getRateLimitWindow } from '@/lib/rate-limiter';

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Clear rate limiter state before each test
    clearRateLimits();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('checkRateLimit', () => {
    it('allows first submission from IP', () => {
      const result = checkRateLimit('192.168.1.1');
      expect(result).toBe(true);
    });

    it('blocks second submission within 5 minutes', () => {
      checkRateLimit('192.168.1.1'); // First submission
      const result = checkRateLimit('192.168.1.1'); // Immediate retry
      expect(result).toBe(false);
    });

    it('allows submission after 5 minutes', () => {
      checkRateLimit('192.168.1.1'); // First submission
      
      // Fast-forward time by 5 minutes + 1ms
      jest.advanceTimersByTime(getRateLimitWindow() + 1);
      
      const result = checkRateLimit('192.168.1.1'); // Should be allowed
      expect(result).toBe(true);
    });

    it('tracks different IPs independently', () => {
      checkRateLimit('192.168.1.1'); // First IP submits
      const result = checkRateLimit('192.168.1.2'); // Second IP submits
      expect(result).toBe(true); // Second IP should be allowed
    });

    it('blocks multiple rapid submissions from same IP', () => {
      checkRateLimit('192.168.1.1'); // First submission
      expect(checkRateLimit('192.168.1.1')).toBe(false); // 2nd attempt
      expect(checkRateLimit('192.168.1.1')).toBe(false); // 3rd attempt
      expect(checkRateLimit('192.168.1.1')).toBe(false); // 4th attempt
    });

    it('allows submission at exactly 5 minute boundary', () => {
      checkRateLimit('192.168.1.1'); // First submission
      
      // Fast-forward time by exactly 5 minutes
      jest.advanceTimersByTime(getRateLimitWindow());
      
      const result = checkRateLimit('192.168.1.1'); // Should be allowed
      expect(result).toBe(true);
    });

    it('handles unknown IP gracefully', () => {
      const result = checkRateLimit('unknown');
      expect(result).toBe(true);
      
      // Second submission should be blocked
      expect(checkRateLimit('unknown')).toBe(false);
    });

    it('resets rate limit for IP after time window passes', () => {
      checkRateLimit('192.168.1.1'); // First submission
      jest.advanceTimersByTime(getRateLimitWindow() + 1000);
      checkRateLimit('192.168.1.1'); // Second submission (allowed after window)
      
      // Should be blocked immediately after second submission
      expect(checkRateLimit('192.168.1.1')).toBe(false);
    });

    it('handles multiple IPs with different timings', () => {
      // IP 1 submits at t=0
      checkRateLimit('192.168.1.1');
      
      // Advance 2 minutes
      jest.advanceTimersByTime(2 * 60 * 1000);
      
      // IP 2 submits at t=2min
      checkRateLimit('192.168.1.2');
      
      // Advance 2 more minutes (total 4min)
      jest.advanceTimersByTime(2 * 60 * 1000);
      
      // IP 1 should still be blocked (only 4min passed)
      expect(checkRateLimit('192.168.1.1')).toBe(false);
      
      // IP 2 should still be blocked (only 2min passed)
      expect(checkRateLimit('192.168.1.2')).toBe(false);
      
      // Advance 2 more minutes (total 6min)
      jest.advanceTimersByTime(2 * 60 * 1000);
      
      // IP 1 should be allowed (6min passed)
      expect(checkRateLimit('192.168.1.1')).toBe(true);
      
      // IP 2 should still be blocked (only 4min passed)
      expect(checkRateLimit('192.168.1.2')).toBe(false);
    });
  });

  describe('clearRateLimits', () => {
    it('clears all rate limit entries', () => {
      checkRateLimit('192.168.1.1');
      checkRateLimit('192.168.1.2');
      
      clearRateLimits();
      
      // Both IPs should be allowed after clearing
      expect(checkRateLimit('192.168.1.1')).toBe(true);
      expect(checkRateLimit('192.168.1.2')).toBe(true);
    });
  });

  describe('getRateLimitWindow', () => {
    it('returns correct rate limit window', () => {
      const window = getRateLimitWindow();
      expect(window).toBe(5 * 60 * 1000); // 5 minutes in milliseconds
    });
  });
});
