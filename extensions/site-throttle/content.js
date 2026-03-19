/**
 * Site Throttle - Content Script
 *
 * Injected into every page. Asks the background worker if the
 * current site should be throttled. If yes, applies several
 * friction techniques to make the site feel slow and unresponsive
 * without actually blocking it.
 *
 * Techniques:
 * 1. Delayed page visibility -- page loads hidden, fades in after delay
 * 2. Scroll lag -- scrolling feels sluggish and unresponsive
 * 3. Click delay -- clicks take seconds to register
 * 4. Input delay -- typing has a noticeable lag per character
 * 5. Image degradation -- images load blurry and slowly sharpen
 * 6. Autoplay suppression -- videos and audio require a click to play
 */

(function () {
  'use strict';

  // Ask background if this site should be throttled
  chrome.runtime.sendMessage(
    { type: 'checkSite', hostname: window.location.hostname },
    (response) => {
      if (chrome.runtime.lastError || !response || !response.throttle) {
        return; // Not throttled -- do nothing
      }
      applyThrottle(response);
    }
  );

  function applyThrottle(config) {
    const { delayMs } = config;

    function randomDelay() {
      return delayMs.min + Math.random() * (delayMs.max - delayMs.min);
    }

    // --- 1. Delayed page visibility ---
    // Hide the page content and show it after a delay, simulating slow load
    const style = document.createElement('style');
    style.textContent = `
      html.site-throttle-loading body {
        opacity: 0 !important;
        transition: opacity 2s ease-in !important;
      }
      html.site-throttle-loaded body {
        opacity: 1 !important;
      }
    `;
    document.documentElement.appendChild(style);
    document.documentElement.classList.add('site-throttle-loading');

    const loadDelay = randomDelay();
    setTimeout(() => {
      document.documentElement.classList.remove('site-throttle-loading');
      document.documentElement.classList.add('site-throttle-loaded');
    }, loadDelay);

    // --- 2. Scroll lag ---
    // Override scrolling to feel sluggish
    let scrollAllowed = true;
    let scrollQueue = [];

    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (scrollAllowed) {
        scrollAllowed = false;
        const delay = 300 + Math.random() * 700; // 300-1000ms lag per scroll
        setTimeout(() => {
          window.scrollBy({
            top: e.deltaY * 0.4, // Reduced scroll distance
            behavior: 'auto'
          });
          scrollAllowed = true;
        }, delay);
      }
    }, { passive: false });

    // --- 3. Click delay ---
    // Intercept clicks and delay them, but let media clicks through
    // immediately so autoplay suppression can handle them properly
    document.addEventListener('click', (e) => {
      // Don't delay if it's our replayed click
      if (e.isTrusted && !e._throttleReplayed) {
        // Let clicks on or near video/audio elements pass through immediately
        // so the autoplay suppression can recognize them as user gestures
        const nearMedia = e.target.closest('video, audio, [class*="video"], [class*="player"], [class*="Video"], [class*="Player"]');
        if (nearMedia) return; // Don't intercept -- let it through

        e.preventDefault();
        e.stopPropagation();

        const target = e.target;
        const delay = 2000 + Math.random() * 3000; // 2-5 second click delay

        // Brief visual feedback that something is happening (cursor change)
        document.body.style.cursor = 'wait';

        setTimeout(() => {
          document.body.style.cursor = '';

          // Create and dispatch a new click event
          const newClick = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: e.clientX,
            clientY: e.clientY
          });
          newClick._throttleReplayed = true;
          target.dispatchEvent(newClick);

          // If it's a link, navigate after delay
          const link = target.closest('a');
          if (link && link.href) {
            window.location.href = link.href;
          }
        }, delay);
      }
    }, true); // Capture phase to intercept before anything else

    // --- 4. Input delay ---
    // Make typing feel laggy
    document.addEventListener('keydown', (e) => {
      const target = e.target;
      const isInput = target.tagName === 'INPUT' ||
                      target.tagName === 'TEXTAREA' ||
                      target.isContentEditable;

      if (isInput && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const delay = 400 + Math.random() * 600; // 400-1000ms per keystroke
        setTimeout(() => {
          if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            // Insert character at cursor position
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const value = target.value;
            target.value = value.slice(0, start) + e.key + value.slice(end);
            target.selectionStart = target.selectionEnd = start + 1;
            // Trigger input event so the site's JS notices the change
            target.dispatchEvent(new Event('input', { bubbles: true }));
          } else if (target.isContentEditable) {
            document.execCommand('insertText', false, e.key);
          }
        }, delay);
      }
    }, true);

    // --- 5. Image degradation ---
    // Make images load blurry and slowly sharpen
    function degradeImages() {
      const images = document.querySelectorAll('img:not([data-throttle-processed])');
      images.forEach(img => {
        img.setAttribute('data-throttle-processed', 'true');
        img.style.filter = 'blur(8px)';
        img.style.transition = 'filter 4s ease-in';

        // Sharpen after a random delay
        const delay = 3000 + Math.random() * 5000;
        setTimeout(() => {
          img.style.filter = 'blur(0px)';
        }, delay);
      });
    }

    // Process images on load and watch for new ones
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', degradeImages);
    } else {
      degradeImages();
    }

    // --- 6. Autoplay suppression ---
    // Kill all audio and video autoplay. TikTok and similar sites often
    // use separate audio handling or call play() from JS rather than
    // using the autoplay attribute, so we need multiple strategies.

    // Strategy A: Intercept HTMLMediaElement.prototype.play at the prototype
    // level BEFORE any site JS runs. This catches all play() calls on any
    // video or audio element, regardless of how the site triggers them.
    const originalPlay = HTMLMediaElement.prototype.play;
    const clickedElements = new WeakSet();

    HTMLMediaElement.prototype.play = function () {
      if (clickedElements.has(this)) {
        return originalPlay.call(this);
      }
      // Mute and pause -- silently block
      this.muted = true;
      this.pause();
      return Promise.resolve();
    };

    // Strategy B: Mute all media elements and force-pause them on a timer.
    // Sites like TikTok may bypass play() or use Web Audio API.
    function muteAndPauseAll() {
      const media = document.querySelectorAll('video, audio');
      media.forEach(el => {
        if (!clickedElements.has(el)) {
          el.muted = true;
          if (!el.paused) {
            el.pause();
          }
          el.removeAttribute('autoplay');
        }
      });
    }

    // Run mute/pause aggressively -- every 500ms for the first 10 seconds,
    // then every 2 seconds ongoing. Sites continuously create new players.
    let muteCount = 0;
    const muteInterval = setInterval(() => {
      muteAndPauseAll();
      muteCount++;
      if (muteCount > 20) {
        // Switch to slower polling after initial burst
        clearInterval(muteInterval);
        setInterval(muteAndPauseAll, 2000);
      }
    }, 500);

    // Strategy C: Listen for 'play' events bubbling up and kill them
    // unless the element was explicitly clicked
    document.addEventListener('play', (e) => {
      if (e.target && (e.target.tagName === 'VIDEO' || e.target.tagName === 'AUDIO')) {
        if (!clickedElements.has(e.target)) {
          e.target.muted = true;
          e.target.pause();
        }
      }
    }, true); // Capture phase

    // Strategy D: Mark elements as user-clicked when actually clicked.
    // Listen on the whole document since media elements may be inside
    // wrapper divs that receive the click.
    document.addEventListener('click', (e) => {
      // Find any video/audio at or near the click target
      const media = e.target.closest('video, audio') ||
                    e.target.querySelector('video, audio');
      if (media) {
        clickedElements.add(media);
        media.muted = false;
        originalPlay.call(media).catch(() => {});
      }

      // Also check parent containers (TikTok wraps videos in divs)
      const parent = e.target.closest('[class*="video"], [class*="player"]');
      if (parent) {
        const vid = parent.querySelector('video');
        if (vid) {
          clickedElements.add(vid);
          vid.muted = false;
          originalPlay.call(vid).catch(() => {});
        }
      }
    }, true);

    // Show play overlays on videos
    function addPlayOverlays() {
      const videos = document.querySelectorAll('video:not([data-throttle-overlay])');
      videos.forEach(vid => {
        vid.setAttribute('data-throttle-overlay', 'true');
        const wrapper = vid.parentElement;
        if (wrapper && !wrapper.querySelector('.throttle-play-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'throttle-play-overlay';
          overlay.textContent = 'Click to play';
          overlay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            pointer-events: none;
            z-index: 10;
          `;
          const parentPos = window.getComputedStyle(wrapper).position;
          if (parentPos === 'static') {
            wrapper.style.position = 'relative';
          }
          wrapper.appendChild(overlay);

          vid.addEventListener('play', () => {
            if (clickedElements.has(vid)) {
              overlay.remove();
            }
          });
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addPlayOverlays);
    } else {
      addPlayOverlays();
    }

    // Watch for dynamically added media and images
    const observer = new MutationObserver((mutations) => {
      let hasNewImages = false;
      let hasNewMedia = false;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1) continue; // Skip text nodes
          if (node.nodeName === 'IMG' || (node.querySelectorAll && node.querySelectorAll('img').length > 0)) {
            hasNewImages = true;
          }
          if (node.nodeName === 'VIDEO' || node.nodeName === 'AUDIO' ||
              (node.querySelectorAll && node.querySelectorAll('video, audio').length > 0)) {
            hasNewMedia = true;
          }
          if (hasNewImages && hasNewMedia) break;
        }
        if (hasNewImages && hasNewMedia) break;
      }
      if (hasNewImages) degradeImages();
      if (hasNewMedia) addPlayOverlays();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
