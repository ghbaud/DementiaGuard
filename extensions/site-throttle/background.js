/**
 * Site Throttle - Background Service Worker
 *
 * Manages the throttled site list and communicates settings
 * to content scripts. The actual throttling (scroll lag, click
 * delays, image degradation) happens in the content script.
 */

const DEFAULT_SETTINGS = {
  enabled: true,
  // Delay level: 'mild' (2-3s), 'moderate' (5-8s), 'aggressive' (10-15s)
  level: 'moderate',
  // Passcode to access settings (simple 4-digit PIN)
  passcode: '1234',
  // Sites to throttle (domains without protocol)
  sites: [
    'facebook.com',
    'www.facebook.com',
    'web.facebook.com',
    'm.facebook.com',
    'messenger.com',
    'www.messenger.com',
    'instagram.com',
    'www.instagram.com',
    'tiktok.com',
    'www.tiktok.com',
    'twitter.com',
    'x.com'
  ]
};

// Initialize settings on install
chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.local.get('settings');
  if (!existing.settings) {
    await chrome.storage.local.set({ settings: DEFAULT_SETTINGS });
  }
});

// Listen for messages from content script asking if current site should be throttled
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'checkSite') {
    chrome.storage.local.get('settings', (result) => {
      const settings = result.settings || DEFAULT_SETTINGS;
      if (!settings.enabled) {
        sendResponse({ throttle: false });
        return;
      }

      const hostname = message.hostname.toLowerCase();
      const shouldThrottle = settings.sites.some(site =>
        hostname === site || hostname.endsWith('.' + site)
      );

      let delayMs;
      switch (settings.level) {
        case 'mild':     delayMs = { min: 2000, max: 3000 }; break;
        case 'aggressive': delayMs = { min: 10000, max: 15000 }; break;
        case 'moderate':
        default:         delayMs = { min: 5000, max: 8000 }; break;
      }

      sendResponse({
        throttle: shouldThrottle,
        level: settings.level,
        delayMs: delayMs
      });
    });
    // Return true to indicate we'll respond asynchronously
    return true;
  }
});
