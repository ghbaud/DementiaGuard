# Site Throttle

A Chrome/Edge extension that makes specified websites frustratingly slow to use -- without blocking them outright.

## Why

Blocking social media entirely causes distress for people with dementia ("someone took this away from me"). But these platforms are where most scam contact happens. Site Throttle takes a different approach: it makes the sites feel broken rather than blocked. The person thinks "the internet is slow today" and drifts to something else.

## What It Does

When a throttled site is visited:

- **Page loads slowly** -- content fades in after a delay
- **Scrolling is sluggish** -- feels like a slow connection
- **Clicks take seconds to register** -- cursor shows "wait" icon
- **Typing has lag** -- each keystroke is delayed
- **Images load blurry** -- gradually sharpen over several seconds

## How to Install

1. Open Chrome (or Edge) and go to `chrome://extensions`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select this folder (`extensions/site-throttle`)
5. The extension icon (a clock) appears in the toolbar

## Settings

Click the extension icon to access settings (default passcode: `1234`).

- **Enable/disable** throttling globally
- **Slowdown level**: Mild (2-3s), Moderate (5-8s), Aggressive (10-15s)
- **Site list**: Add or remove domains to throttle
- **Change passcode**: Prevent the person being protected from changing settings

## Default Throttled Sites

- facebook.com (including m.facebook.com, web.facebook.com)
- messenger.com
- instagram.com
- tiktok.com
- twitter.com / x.com

## Notes

- Works on Chrome, Edge, and Brave (all Chromium-based browsers)
- The extension uses a simple passcode to protect settings -- this is not high security, just enough to prevent casual changes
- Chrome shows a "developer mode extensions" banner on launch -- this can be dismissed but reappears periodically
