/**
 * Site Throttle - Popup Settings UI
 *
 * Protected by a simple passcode so the person being protected
 * can't easily change the settings.
 */

const DEFAULT_SETTINGS = {
  enabled: true,
  level: 'moderate',
  passcode: '1234',
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

// Passcode unlock
document.getElementById('passcode-btn').addEventListener('click', () => {
  const input = document.getElementById('passcode-input');
  const error = document.getElementById('passcode-error');

  chrome.storage.local.get('settings', (result) => {
    const settings = result.settings || DEFAULT_SETTINGS;
    if (input.value === settings.passcode) {
      document.body.classList.add('unlocked');
      error.style.display = 'none';
      loadSettings(settings);
    } else {
      error.style.display = 'block';
      input.value = '';
      input.focus();
    }
  });
});

// Allow Enter key on passcode field
document.getElementById('passcode-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('passcode-btn').click();
  }
});

// Load settings into the UI
function loadSettings(settings) {
  document.getElementById('enabled-toggle').checked = settings.enabled;
  document.getElementById('level-select').value = settings.level;

  // Convert sites array to deduplicated base domains for display
  const baseDomains = new Set();
  settings.sites.forEach(site => {
    // Strip common prefixes to show cleaner list
    const base = site.replace(/^(www\.|m\.|web\.|mobile\.)/, '');
    baseDomains.add(base);
  });
  document.getElementById('sites-input').value = Array.from(baseDomains).join('\n');
}

// Save settings
document.getElementById('save-btn').addEventListener('click', () => {
  // Expand base domains into common subdomains
  const rawSites = document.getElementById('sites-input').value
    .split('\n')
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 0);

  const expandedSites = [];
  rawSites.forEach(domain => {
    // Remove any protocol or trailing slash
    domain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    // Add base domain and common prefixes
    expandedSites.push(domain);
    if (!domain.startsWith('www.')) expandedSites.push('www.' + domain);
    if (!domain.startsWith('m.')) expandedSites.push('m.' + domain);
  });

  // Deduplicate
  const uniqueSites = [...new Set(expandedSites)];

  const newPasscode = document.getElementById('new-passcode').value.trim();

  chrome.storage.local.get('settings', (result) => {
    const settings = result.settings || DEFAULT_SETTINGS;

    settings.enabled = document.getElementById('enabled-toggle').checked;
    settings.level = document.getElementById('level-select').value;
    settings.sites = uniqueSites;

    if (newPasscode.length > 0) {
      settings.passcode = newPasscode;
    }

    chrome.storage.local.set({ settings }, () => {
      // Show saved confirmation
      const msg = document.getElementById('saved-msg');
      msg.classList.add('show');
      document.getElementById('new-passcode').value = '';
      setTimeout(() => msg.classList.remove('show'), 2000);
    });
  });
});
