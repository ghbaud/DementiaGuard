# DementiaGuard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a curated, read-only reference website that helps families protect loved ones with dementia from online scams and exploitation.

**Architecture:** Multi-page static site with no framework or build step. Plain HTML/CSS/JS hosted on GitHub Pages. Seven pages sharing a common stylesheet and JavaScript module for expandable sections and responsive navigation.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid, media queries), vanilla JavaScript (no dependencies)

**Spec:** `docs/superpowers/specs/2026-03-18-dementia-guard-site-design.md`

**Project directory:** `C:\Users\dhite\Projects\web\DementiaGuard\`

**Verification:** Since this is a static site with no test framework, each task is verified by opening the page in a browser and checking layout, responsiveness (resize to mobile width), keyboard navigation, and content accuracy. Use the browser's Lighthouse audit for accessibility spot-checks.

---

## File Structure

```
DementiaGuard/
  index.html            -- landing page (hub layout)
  devices.html          -- lock down devices guide
  scam-tools.html       -- scam detection tools
  ai-companions.html    -- AI companions
  financial.html        -- financial protection
  emergency.html        -- emergency playbook (interactive scenarios)
  understanding.html    -- understanding the problem
  404.html              -- friendly not-found page
  css/
    style.css           -- all styles (palette, typography, layout, responsive, a11y)
  js/
    main.js             -- expand/collapse, hamburger menu, hash deep-linking
  images/
    favicon.svg         -- simple sage-green shield icon
    og-preview.png      -- social sharing preview image (1200x630, warm branded)
```

Every HTML page shares the same `<head>` boilerplate (charset, viewport, OG tags, stylesheet link, favicon) and the same `<header>` / `<footer>` markup. Content pages follow a consistent structure: breadcrumb, page title, intro, summary box, expandable sections, "Why This Matters," related links.

---

### Task 1: CSS Foundation

**Files:**
- Create: `css/style.css`

Build the complete stylesheet that all pages will share. This includes the color palette as CSS custom properties, typography, layout primitives (container, grid, cards), expandable section styles, responsive breakpoints, and accessibility features (focus indicators, skip-to-content).

- [ ] **Step 1: Create `css/` directory and `style.css`**

Write the full stylesheet with these sections:

```css
/* === CSS Custom Properties === */
:root {
  --sage-green: #5B6E4E;
  --sage-dark: #4A5D3F;      /* visited links, hover */
  --warm-cream: #FAFAF5;
  --muted-brown: #6B6155;
  --warm-tan: #8A7F6B;
  --light-sand: #F0EDE4;
  --soft-border: #E5DFD3;
  --white: #FFFFFF;
  --max-width: 900px;
  --radius: 8px;
}

/* === Reset & Base === */
/* Minimal reset. Box-sizing border-box. Base font: 17px system sans-serif.
   Line-height 1.7 for readability. Background warm-cream, color muted-brown. */

/* === Typography === */
/* h1, h2, h3: Georgia serif, sage-green color.
   h1: 1.8rem. h2: 1.4rem. h3: 1.15rem.
   .subtitle: warm-tan, italic, 0.95rem.
   p: muted-brown, line-height 1.7. */

/* === Links === */
/* Always underlined. Sage-green unvisited, sage-dark visited.
   Hover: background light-sand, slight darkening.
   Focus: 2px solid sage-green outline with 2px offset. */

/* === Skip to Content === */
/* Visually hidden by default, visible on focus.
   Position absolute, top 0, left 0, z-index 1000.
   Sage-green background, white text, padding. */

/* === Layout === */
/* .container: max-width var(--max-width), margin auto, padding 0 1.5rem.
   .page-content: padding-top 2rem, padding-bottom 3rem. */

/* === Header === */
/* Background white, border-bottom soft-border.
   .header-inner: flex, space-between, align-center, container width.
   .site-name: Georgia, sage-green, 1.3rem, no underline.
   .tagline: warm-tan, 0.8rem, hidden on mobile.
   nav ul: flex, gap 1.5rem, list-style none.
   nav a: muted-brown, no underline, hover sage-green.
   nav a[aria-current="page"]: sage-green, font-weight bold.
   .hamburger: display none. On mobile (max-width 768px): display block, nav hidden.
   .nav-open nav: display block, position absolute, background white, full width,
     box-shadow, overlay on content. */

/* === Breadcrumb === */
/* warm-tan, 0.85rem. Separator ">". Link color warm-tan, hover sage-green. */

/* === "Things That Often Help" Summary Box === */
/* .summary-box: background light-sand, border-radius, padding 1.25rem.
   .summary-box h3: sage-green, margin-bottom 0.5rem.
   .summary-box li: line-height 1.8, list-style "~ " in sage-green. */

/* === Expandable Sections === */
/* .expandable: border soft-border, border-radius, margin-bottom 0.75rem.
   .expandable-trigger: background white, padding 0.75rem 1rem, cursor pointer,
     display flex, justify space-between, align center.
     Has role="button", tabindex="0", aria-expanded.
   .expandable-trigger h3: margin 0, display inline.
   .expandable-trigger .meta: warm-tan, 0.85rem (e.g., "~15 minutes").
   .expandable-trigger .chevron: transition transform 0.2s.
   .expandable-trigger[aria-expanded="true"] .chevron: rotate 180deg.
   .expandable-trigger[aria-expanded="true"]: background sage-green, color white.
     h3 color white, .meta color rgba(255,255,255,0.8).
   .expandable-content: max-height 0, overflow hidden, padding 0 1rem,
     transition: max-height 0.3s ease, padding 0.3s ease.
   .expandable-content.open: max-height 2000px, padding 1rem 1rem 1.25rem.
   .sensitivity-note: font-style italic, warm-tan, 0.9rem, margin-top 0.75rem. */

/* === Cards (Section Cards on Landing, Tool Cards on Sub-pages) === */
/* .card-grid: display grid, grid-template-columns 1fr 1fr, gap 1rem.
   On mobile (max-width 600px): single column.
   .card: border soft-border, border-radius, padding 1.25rem, background white.
   .card:hover: border-color sage-green, subtle box-shadow.
   .card h3: sage-green, margin-bottom 0.25rem.
   .card p: warm-tan, 0.9rem.
   .card a: covers full card (position relative + stretched link). */

/* === Highlight Card ("A Good Place to Start") === */
/* .highlight-card: border 2px solid sage-green with 0.15 opacity,
   background light-sand, border-radius, padding 1.25rem.
   .highlight-card h3: sage-green. */

/* === Tool Comparison Table === */
/* Responsive table: horizontal scroll wrapper on mobile.
   Header: light-sand background, sage-green text.
   Cells: padding 0.75rem, border-bottom soft-border.
   "Last reviewed" note: warm-tan, 0.8rem, italic. */

/* === "Why This Matters" Section === */
/* .why-section: border-top soft-border, padding-top 1.5rem, margin-top 2rem.
   .why-section .label: warm-tan, 0.8rem, uppercase, letter-spacing 0.05em.
   .why-section p: muted-brown, 0.95rem. */

/* === Related Links Box === */
/* .related: background white, border soft-border, border-radius, padding 1rem,
   margin-top 2rem.
   .related h3: sage-green, 1rem. */

/* === "Before You Begin" Note === */
/* .before-note: border-left 3px solid sage-green, padding-left 1rem,
   margin 1.5rem 0, font-style italic, muted-brown. */

/* === Emergency Playbook Scenario Cards === */
/* .scenario: border soft-border, border-radius, margin-bottom 0.75rem.
   .scenario-trigger: background white, padding 1rem, cursor pointer,
     font-weight bold, sage-green, display flex, align center.
   .scenario-trigger.active: background sage-green, color white.
   .scenario-content: max-height 0, overflow hidden, padding 0 1.25rem,
     transition: max-height 0.3s ease, padding 0.3s ease.
   .scenario-content.open: max-height 3000px, padding 1.25rem.
   .moment-box: background light-sand, border-radius, padding 1rem, margin-bottom 1rem.
   .moment-box h4: sage-green, margin-bottom 0.5rem.
   .reassurance: font-style italic, warm-tan, 0.9rem, margin-top 1rem. */

/* === Footer === */
/* Background white, border-top soft-border, padding 2rem 0.
   .footer-inner: container width, text-align center.
   .helplines: margin-bottom 1rem. Sage-green phone numbers.
   .disclaimer: warm-tan, 0.8rem, font-style italic. */

/* === Responsive === */
/* @media (max-width: 768px):
   - Hamburger visible, nav hidden until toggled
   - Card grid: single column
   - Font size adjustments if needed
   - .tagline: hidden
   @media (max-width: 600px):
   - Container padding: 1rem
   - h1: 1.5rem */
```

- [ ] **Step 2: Verify the stylesheet loads**

Create a minimal test HTML file to verify CSS loads correctly:
```bash
# Quick check -- delete after verification
echo '<!DOCTYPE html><html><head><link rel="stylesheet" href="css/style.css"></head><body class="page-content"><div class="container"><h1>Test</h1><p>Body text</p></div></body></html>' > test.html
```
Open `test.html` in browser. Confirm warm cream background, Georgia heading, sage green color. Delete `test.html` after.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS foundation with palette, typography, and component styles"
```

---

### Task 2: JavaScript Module

**Files:**
- Create: `js/main.js`

Build the shared JavaScript for expand/collapse behavior, hamburger menu, and hash fragment deep-linking. No dependencies.

- [ ] **Step 1: Create `js/` directory and `main.js`**

```javascript
/* DementiaGuard - main.js
   Expandable sections, mobile navigation, hash deep-linking.
   No dependencies. */

document.addEventListener('DOMContentLoaded', () => {

  // === Expandable Sections ===
  // Find all elements with [aria-expanded].
  // On click or Enter/Space keypress:
  //   - Toggle aria-expanded between "true" and "false"
  //   - Toggle .open class on the next sibling element (.expandable-content or .scenario-content)
  //   - Toggle .active class on the trigger itself
  // Handle both .expandable-trigger and .scenario-trigger elements.

  // === Hash Fragment Deep-Linking ===
  // On page load, check window.location.hash.
  // If a hash exists, find the expandable section whose id matches.
  // Auto-expand it and scroll it into view.
  // Example: devices.html#ios expands the iOS section.

  // === Hamburger Menu ===
  // Find .hamburger button.
  // On click: toggle .nav-open class on the header.
  // Toggle aria-expanded on the hamburger button.
  // When a nav link is clicked: close the menu (remove .nav-open, set aria-expanded="false").
  // On window resize above 768px: close the menu if open.

  // === Smooth Scroll for Anchor Links ===
  // For any anchor link pointing to an id on the same page,
  // use scrollIntoView({ behavior: 'smooth', block: 'start' }).

});
```

Write the full implementation for each section (the comments above describe the logic; the actual file should contain working code, not comments).

- [ ] **Step 2: Verify with test page**

Reuse the test HTML from Task 1 (recreate if deleted). Add an expandable section and the hamburger markup. Open in browser, verify:
- Click to expand/collapse works
- Keyboard Enter/Space toggles
- aria-expanded updates
- Hash fragment auto-expands

Delete test file after.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add JS for expandable sections, mobile nav, and hash deep-linking"
```

---

### Task 3: Landing Page

**Files:**
- Create: `index.html`
- Create: `images/favicon.svg`
- Create: `images/og-preview.png`

Build the hub landing page. This establishes the header/footer template that all other pages will reuse.

Note: Nav links use shortened labels ("Devices", "Financial", "Emergency") for space efficiency. This is intentional -- full page names would overflow on mobile.

- [ ] **Step 1: Create favicon and OG preview image**

Create `images/favicon.svg` -- a simple sage-green shield outline. Minimal SVG, ~10 lines.

Create `images/og-preview.png` -- 1200x630px social sharing preview image. Warm cream background, "DementiaGuard" in sage green, tagline below. This is what appears when someone shares a link in a messaging app. Can be created with any image editor or as an SVG converted to PNG.

- [ ] **Step 2: Create `index.html`**

Full page structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DementiaGuard - Protecting Vulnerable Loved Ones</title>
  <meta name="description" content="A guide for families protecting loved ones with dementia from online scams and exploitation.">
  <meta property="og:title" content="DementiaGuard">
  <meta property="og:description" content="Protecting vulnerable loved ones from online exploitation. Tools, guides, and support for families and caregivers.">
  <meta property="og:image" content="images/og-preview.png">
  <meta property="og:type" content="website">
  <link rel="icon" href="images/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- Skip to content -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Header with nav -->
  <header>
    <div class="header-inner container">
      <div>
        <a href="index.html" class="site-name">DementiaGuard</a>
        <span class="tagline">Protecting vulnerable loved ones</span>
      </div>
      <button class="hamburger" aria-expanded="false" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="index.html" aria-current="page">Home</a></li>
          <li><a href="devices.html">Devices</a></li>
          <li><a href="scam-tools.html">Scam Tools</a></li>
          <li><a href="ai-companions.html">AI Companions</a></li>
          <li><a href="financial.html">Financial</a></li>
          <li><a href="emergency.html">Emergency</a></li>
          <li><a href="understanding.html">Understanding</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main-content" class="page-content">
    <div class="container">

      <!-- Empathetic intro -->
      <h1>Protecting Someone You Love</h1>
      <p>If someone you love has dementia and is being targeted by online
      scams, you're not alone. Millions of families face this, and there
      are practical steps that can help.</p>

      <!-- "Before You Begin" note -->
      <div class="before-note">
        <p>Every family's situation is different, and your loved one may
        respond better to some approaches than others. There's no single
        right answer -- even small steps can make a meaningful difference.
        Pick what feels manageable and revisit the rest when you're ready.
        You know them best.</p>
      </div>

      <!-- "A Good Place to Start" highlight card -->
      <div class="highlight-card">
        <h2>A Good Place to Start</h2>
        <p>Things that often help:</p>
        <ul>
          <li><a href="devices.html">Limiting what their devices can do</a> (purchases, app installs)</li>
          <li><a href="scam-tools.html">Adding scam detection tools</a> that work in the background</li>
          <li><a href="financial.html">Talking with their bank</a> about safeguards</li>
          <li><a href="devices.html">Reducing exposure to social media</a>, if they're open to it</li>
          <li><a href="emergency.html">Having key phone numbers ready</a></li>
        </ul>
        <p class="sensitivity-note">Some of these changes can be done without your
        loved one noticing. Others may need a conversation. Trust your judgement
        -- you know them best.</p>
      </div>

      <!-- Six section cards in 2-column grid -->
      <div class="card-grid">
        <a href="devices.html" class="card">
          <h3>Lock Down Devices</h3>
          <p>Simple changes to their phone, tablet, or computer that can
          prevent most impulsive purchases and scam interactions.</p>
        </a>
        <a href="scam-tools.html" class="card">
          <h3>Scam Detection Tools</h3>
          <p>Software that watches for threats in the background -- catching
          what you can't be there to see.</p>
        </a>
        <a href="ai-companions.html" class="card">
          <h3>AI Companions</h3>
          <p>Digital companions that can reduce loneliness and provide
          engagement, with important considerations for safety.</p>
        </a>
        <a href="financial.html" class="card">
          <h3>Financial Protection</h3>
          <p>Safeguards at the banking and legal level that create a safety
          net beneath everything else.</p>
        </a>
        <a href="emergency.html" class="card">
          <h3>Emergency Playbook</h3>
          <p>What to do right now if they're about to send money, have given
          out personal information, or are upset about restrictions.</p>
        </a>
        <a href="understanding.html" class="card">
          <h3>Understanding the Problem</h3>
          <p>Why people with dementia are targeted, how modern scams work,
          and what patterns to watch for.</p>
        </a>
      </div>

    </div>
  </main>

  <!-- Footer -->
  <footer>
    <div class="footer-inner container">
      <div class="helplines">
        <p>Alzheimer's Association 24/7 Helpline:
          <a href="tel:8002723900">800.272.3900</a></p>
        <p>AARP Fraud Watch Network:
          <a href="tel:8779083360">877.908.3360</a></p>
      </div>
      <p class="disclaimer">This site provides general informational
      guidance, not medical or legal advice. Consult appropriate
      professionals for your specific situation.</p>
      <p class="attribution"><a href="understanding.html#sources">Sources and attribution</a></p>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

Fill in the complete content for the highlight card and all six section cards. Each section card should have a title, a brief 1-2 sentence description in the gentle voice, and link to the sub-page.

Section card descriptions:
- **Lock Down Devices:** "Simple changes to their phone, tablet, or computer that can prevent most impulsive purchases and scam interactions."
- **Scam Detection Tools:** "Software that watches for threats in the background -- catching what you can't be there to see."
- **AI Companions:** "Digital companions that can reduce loneliness and provide engagement, with important considerations for safety."
- **Financial Protection:** "Safeguards at the banking and legal level that create a safety net beneath everything else."
- **Emergency Playbook:** "What to do right now if they're about to send money, have given out personal information, or are upset about restrictions."
- **Understanding the Problem:** "Why people with dementia are targeted, how modern scams work, and what patterns to watch for."

- [ ] **Step 3: Verify in browser**

Open `index.html`. Check:
- Header renders with nav links
- Hamburger menu works on mobile width
- Intro text, before-you-begin note, highlight card, section cards all display
- Cards link to sub-pages (will 404 for now -- that's fine)
- Footer helpline numbers are clickable tel: links
- Skip-to-content link appears on Tab
- Page is responsive at 768px and 600px breakpoints

- [ ] **Step 4: Commit**

```bash
git add index.html images/favicon.svg
git commit -m "feat: add landing page with header, footer, section cards"
```

---

### Task 4: Lock Down Devices Page

**Files:**
- Create: `devices.html`

The most actionable page. Three expandable platform sections with step-by-step instructions.

- [ ] **Step 1: Create `devices.html`**

Use the same `<head>`, `<header>`, and `<footer>` as index.html (update `<title>`, OG tags, and `aria-current`).

Content structure:
- Breadcrumb: Home > Lock Down Devices
- Title: "Lock Down Their Devices"
- Intro paragraph (gentle tone, mentions 10-15 minutes)
- "Things That Often Help" summary box with 4 suggestions
- Three expandable sections (each with `id` for hash linking):
  - **iPad & iPhone (iOS)** (`id="ios"`, meta: "~15 minutes, 8 steps")
    - Step-by-step: Open Screen Time, set passcode, restrict purchases, restrict app installs, limit social media with App Limits, enable Content & Privacy Restrictions, consider Assistive Access, Family Sharing Ask to Buy workaround
    - Sensitivity note at end
  - **Android** (`id="android"`, meta: "~10 minutes, 7 steps")
    - Step-by-step: Google Family Link setup, Play Store restrictions, disable unknown sources, app pinning, Digital Wellbeing limits
    - Sensitivity note
  - **Windows** (`id="windows"`, meta: "~10 minutes, 6 steps")
    - Step-by-step: Microsoft Family Safety, browser restrictions, Standard vs Admin account, disable sideloading
    - Sensitivity note
- "Why This Matters" section (in-app purchase blindness, credit card replacement anecdote, gentle framing)
- Related links box: Scam Detection Tools, Financial Protection, Emergency Playbook

Write all content in the spec's voice. Every step-by-step instruction should be clear enough for a non-technical caregiver. Include notes like "If this causes distress, it's okay to skip this step and come back to it later."

- [ ] **Step 2: Verify in browser**

Open `devices.html`. Check:
- Breadcrumb shows and links to Home
- All three sections expand/collapse
- `devices.html#ios` auto-expands the iOS section
- Content is readable and well-spaced
- Mobile layout works (single column)
- Keyboard navigation works on expandable triggers

- [ ] **Step 3: Commit**

```bash
git add devices.html
git commit -m "feat: add Lock Down Devices page with iOS, Android, Windows guides"
```

---

### Task 5: Scam Detection Tools Page

**Files:**
- Create: `scam-tools.html`

Tool reviews with comparison table.

- [ ] **Step 1: Create `scam-tools.html`**

Content structure:
- Breadcrumb: Home > Scam Detection Tools
- Title: "Scam Detection Tools"
- Intro paragraph (tools that work in the background)
- "Things That Often Help" summary box
- Tool cards (each in its own expandable section):
  - **SeniorShield.AI** -- what it does, iOS app + Chrome extension, free tier + $3.99/mo premium, how to install, strengths (real-time detection, fake scam testing for education), limitations. "Last reviewed: March 2026"
  - **ElderShield** -- AI-powered scam protection, platforms, cost, strengths/limitations. "Last reviewed: March 2026"
  - **ZoraSafe** -- senior-specific features, platforms, cost, strengths/limitations. "Last reviewed: March 2026"
  - **GPTZero's Guide** -- detecting AI-generated content (not an app, a knowledge resource). "Last reviewed: March 2026"
- Comparison table (responsive, horizontal scroll on mobile):
  | Tool | Platforms | Cost | Key Feature |
- "Why This Matters" section (how AI scams work, why they're convincing, $3.4B in losses)
- Related links: Lock Down Devices, Financial Protection

Content sourced from the research session. Link to each tool's website.

- [ ] **Step 2: Verify in browser**

Open `scam-tools.html`. Check:
- Tool cards expand/collapse
- Comparison table scrolls horizontally on mobile
- External links open correctly
- "Last reviewed" dates are visible
- Page follows the content pattern consistently

- [ ] **Step 3: Commit**

```bash
git add scam-tools.html
git commit -m "feat: add Scam Detection Tools page with reviews and comparison table"
```

---

### Task 6: AI Companions Page

**Files:**
- Create: `ai-companions.html`

Product reviews plus the therapeutic deception ethical framework.

- [ ] **Step 1: Create `ai-companions.html`**

Content structure:
- Breadcrumb: Home > AI Companions
- Title: "AI Companions"
- Intro paragraph (can reduce loneliness, come with considerations)
- "Things That Often Help" summary box
- Product cards (expandable):
  - **Ella AI** -- dementia-certified, HIPAA compliant, caregiver reporting, emergency alerts, multi-modal communication. Link to ella-ai-care.com.
  - **ElliQ** -- physical robot, proactive conversation, health reminders, video calls, activity encouragement. Link to elliq.com.
  - **SeniorTalk** -- chatbot, 24/7 companionship, speech pattern monitoring for cognitive decline detection. Link to senior-talk.com.
  - **CareYaya QuikTok** -- telephone-based (no device needed), voice conversations via regular phone, cognitive monitoring. Link to careyaya.org.
- Expandable section: **Custom AI Personas**
  - The concept: setting up a personalized AI assistant (e.g., custom GPT or Claude persona)
  - What's possible: personality, guardrails against sharing money/info, caregiver alerts
  - Risks: consistency, discovery of deception, reinforcing harmful beliefs
  - Guidance: consult care team, design to protect not manipulate, "who benefits?" test
- Expandable section: **The Ethics of Therapeutic Deception**
  - What it is: benign deception used in dementia care (going along with harmless beliefs)
  - When it's accepted: widely practiced by caregivers, studied in clinical literature
  - When it's risky: reinforcing beliefs that lead to harmful action, anthropomorphization
  - The key test: is this for the patient's benefit or the caregiver's convenience?
  - References to Harvard D3 analysis and Nature Mental Health article
- Expandable section: **Risks to Consider**
  - Reinforcing delusions
  - Anthropomorphization (forming deep bonds with AI)
  - Replacing real human connection
  - Consistency challenges with current AI
- "Why This Matters" section (loneliness accelerates decline, 63.3% reduced anxiety stat, engagement gap)
- Related links: Understanding the Problem, Emergency Playbook

- [ ] **Step 2: Verify in browser**

Open `ai-companions.html`. Check all sections expand/collapse, external links work, ethical content is clearly separated from product reviews, tone is gentle and non-judgmental.

- [ ] **Step 3: Commit**

```bash
git add ai-companions.html
git commit -m "feat: add AI Companions page with product reviews and ethics framework"
```

---

### Task 7: Financial Protection Page

**Files:**
- Create: `financial.html`

Banking safeguards and legal foundations.

- [ ] **Step 1: Create `financial.html`**

Content structure:
- Breadcrumb: Home > Financial Protection
- Title: "Financial Protection"
- Intro paragraph (safety net beneath everything else)
- "Things That Often Help" summary box
- Expandable sections:
  - **Bank-Level Protections** (`id="bank"`)
    - Call the bank's fraud department, explain the situation
    - Set up transaction alerts (text/email for purchases over a threshold)
    - Designate a trusted contact on the account (many banks now support this)
    - AARP BankSafe program -- trains bank staff to spot signs of exploitation
    - Link to AARP BankSafe initiative
  - **Spending-Limited Cards** (`id="cards"`)
    - True Link Visa Prepaid Card: caregiver sets spending rules, blocks specific merchants/categories, works like a normal card to the user
    - How it works: load funds periodically, set limits, get alerts
    - Link to truelinkfinancial.com
  - **Legal Foundations** (`id="legal"`)
    - Power of Attorney (POA): what it is, financial vs healthcare, when to pursue
    - Guardianship/Conservatorship: more restrictive, court-supervised, when it's necessary
    - When to involve an elder law attorney
    - Tone: "These are significant legal steps. Many families start with POA and find it sufficient."
    - Note: "Laws vary by state. An elder law attorney can advise on your specific situation."
  - **Credit Protection** (`id="credit"`)
    - Freeze credit reports at all three bureaus (Equifax, Experian, TransUnion)
    - Set up credit monitoring for new account alerts
    - Check for unauthorized accounts
- "Why This Matters" section ($3.4B in losses, fraud victims twice as likely to end up in residential care within a year)
- Related links: Lock Down Devices, Emergency Playbook
- Resource links: Alzheimer's Association, AARP Fraud Watch Network (with phone numbers), note about finding local elder law attorneys via the National Academy of Elder Law Attorneys (naela.org)

- [ ] **Step 2: Verify in browser**

Open `financial.html`. Check expandable sections, hash deep-linking (`financial.html#legal`), external links, tone consistency.

- [ ] **Step 3: Commit**

```bash
git add financial.html
git commit -m "feat: add Financial Protection page with bank, legal, and credit sections"
```

---

### Task 8: Emergency Playbook Page

**Files:**
- Create: `emergency.html`

Interactive scenario cards. This page is slightly more direct in tone than the others.

- [ ] **Step 1: Create `emergency.html`**

Content structure:
- Breadcrumb: Home > Emergency Playbook
- Title: "Emergency Playbook"
- Intro: "What to do right now, with calm and clarity."
- Subtitle: "Choose the situation closest to what you're dealing with."
- Five scenario cards (using `.scenario` / `.scenario-trigger` / `.scenario-content` classes):

**Scenario 1: They're about to send money to someone online**
- "In the moment" box:
  - Don't argue about whether the person is real -- this rarely works and can cause agitation
  - Try: "Let's wait until tomorrow to make sure everything checks out"
  - Redirect gently -- suggest a meal, a show, an activity. The urgency often fades with distraction.
  - If at a computer/phone: "the internet is slow today" or another low-conflict reason to pause
- "After the moment passes" box:
  - Check recent transactions (bank app, credit card statements)
  - Consider purchase restrictions (link to Devices)
  - Consider a spending-limited card (link to Financial)
  - Block or report the person they were communicating with
- Reassurance: "The goal isn't to win an argument. It's to create enough pause that the transaction doesn't happen. Each time you redirect successfully is a win, even if the belief doesn't change."

**Scenario 2: They already sent money or gift cards**
- "In the moment" box:
  - Don't blame them -- they are a victim, not a willing participant
  - Contact the bank immediately -- some transactions can be reversed if caught quickly
  - If gift cards: contact the card issuer (number on the back)
  - Document what happened (who they sent money to, how much, when)
- "After the moment passes" box:
  - Report to FTC at reportfraud.ftc.gov
  - File a report with local police (creates a paper trail)
  - Add financial protections (link to Financial)
  - Add device restrictions to prevent recurrence (link to Devices)
- Reassurance: "Recovery isn't always possible, but reporting helps protect others. Don't let guilt or frustration overshadow the fact that you're taking action now."

**Scenario 3: They gave out personal information (SSN, passwords, bank details)**
- "In the moment" box:
  - Stay calm -- knowing about it means you can act
  - Change passwords on any compromised accounts immediately
  - Call the bank if financial information was shared
- "After the moment passes" box:
  - Freeze credit at all three bureaus (link to Financial, #credit)
  - Set up credit monitoring
  - Check for unauthorized accounts or charges
  - Contact affected institutions (Social Security Administration if SSN was shared)
  - Consider an identity theft report at identitytheft.gov
- Reassurance: "Acting quickly makes a real difference. Most identity theft can be contained if caught early."

**Scenario 4: They believe they're in a relationship with someone online**
- "In the moment" box:
  - Don't confront the belief directly -- "that person is fake" rarely works and can cause deep distress
  - Listen without validating the request for money or information
  - If they want to send money: use redirection techniques from Scenario 1
  - Involve their care team -- a doctor or counselor they trust may be more effective
- "After the moment passes" box:
  - Block the scammer's account if possible
  - Restrict social media access (link to Devices)
  - Consider whether an AI companion might fill the engagement need (link to AI Companions)
  - Gently introduce doubt over time, not all at once
- Reassurance: "Romance scams exploit real emotional needs. Your loved one isn't foolish -- they're lonely and being manipulated by people who do this professionally."

**Scenario 5: They're upset because I restricted their device**
- "In the moment" box:
  - Validate their feelings: "I understand this is frustrating"
  - Keep explanations simple and concrete: "We're making sure nobody can take your money"
  - Don't frame it as taking something away -- frame it as protection
  - Offer alternatives: "Let's call [family member] instead" or "Let's watch something together"
- "After the moment passes" box:
  - Consider gradual restrictions rather than all-at-once
  - Leave some apps/functions unrestricted so they still feel independence
  - Revisit which restrictions are essential vs. nice-to-have
  - Talk with their care team about managing the transition
- Reassurance: "Some distress is normal and usually temporary. Most people adjust within a few days. If it persists, it's okay to loosen restrictions and try a more gradual approach."

- Related links: All other pages

- [ ] **Step 2: Verify in browser**

Open `emergency.html`. Check:
- All five scenarios expand/collapse independently (multiple can be open simultaneously -- no accordion behavior. A caregiver may want to reference two scenarios at once.)
- Cross-links to other pages work
- Tone is warmer than typical emergency guides
- Mobile layout works

- [ ] **Step 3: Commit**

```bash
git add emergency.html
git commit -m "feat: add Emergency Playbook with five interactive crisis scenarios"
```

---

### Task 9: Understanding the Problem Page

**Files:**
- Create: `understanding.html`

Background context page. No summary box (intentional deviation from pattern).

- [ ] **Step 1: Create `understanding.html`**

Content structure:
- Breadcrumb: Home > Understanding the Problem
- Title: "Understanding the Problem"
- Intro: "Understanding the landscape can help you make better decisions about how to protect your loved one."
- No "Things That Often Help" box (this page is context, not actions)
- Expandable sections:
  - **Why People with Dementia Are Targeted** (`id="why-targeted"`)
    - Impaired judgment -- difficulty evaluating trustworthiness
    - Preserved trust -- social instincts remain even as critical thinking declines
    - Impulsivity -- reduced ability to pause before acting
    - Isolation -- fewer people around to intervene
    - Inability to recognize manipulation patterns
    - Repetition vulnerability -- may fall for the same scam type multiple times
  - **How Modern Scams Work** (`id="how-scams-work"`)
    - AI-generated voice cloning (calls that sound like a grandchild in trouble)
    - Deepfake video (convincing but fake video calls)
    - Romance scams (fake relationships cultivated over weeks/months)
    - Social media exploitation (fake accounts, fake celebrity profiles)
    - Urgency tactics ("send money now or you'll lose everything")
    - Authority impersonation (IRS, Social Security Administration, banks)
  - **The Scale of the Problem** (`id="scale"`)
    - Elder fraud losses exceeded $3.4 billion in 2023
    - Global dementia population projected to nearly double to 140 million by 2050
    - People defrauded in their own home are twice as likely to die or enter residential care within a year
    - AI is making scams more sophisticated and harder to detect
  - **Common Patterns to Watch For** (`id="patterns"`)
    - Gift card requests ("buy iTunes/Google Play cards and read me the numbers")
    - Wire transfers to unfamiliar recipients
    - "Investment opportunities" with guaranteed returns
    - Tech support scams ("your computer has a virus")
    - Government impersonation ("you owe back taxes, pay now or face arrest")
    - Prize/lottery scams ("you've won, just pay the processing fee")
  - **The Role of Social Media** (`id="social-media"`)
    - Facebook, Instagram, and similar platforms are primary hunting grounds
    - Fake accounts impersonating celebrities or authority figures
    - Targeted ads for fraudulent products
    - Messenger/DM exploitation (private messages from strangers)
    - Why algorithms amplify the problem (engagement-optimized content)
    - People with dementia may not distinguish ads from genuine content
- "Why This Matters" section: understanding patterns helps you spot early warning signs
- Related links: Emergency Playbook, Scam Detection Tools

- [ ] **Step 2: Verify in browser**

Open `understanding.html`. Check expandable sections, hash linking, content accuracy, absence of summary box (intentional), tone.

- [ ] **Step 3: Commit**

```bash
git add understanding.html
git commit -m "feat: add Understanding the Problem page with scam education content"
```

---

### Task 10: 404 Page and Final Polish

**Files:**
- Create: `404.html`

- [ ] **Step 1: Create `404.html`**

Simple, warm page in site style. Note: GitHub Pages automatically serves `404.html` for any URL that doesn't match a file -- no configuration needed.
- Same header and footer as other pages
- Centered message: "This page doesn't exist, but we can help you find what you're looking for."
- Link back to home page
- List of all section links

- [ ] **Step 2: Cross-page verification**

Open every page and verify:
- All nav links point to correct pages
- All cross-reference ("Related") links work
- All external links open correctly
- Breadcrumbs work on every sub-page
- `aria-current="page"` is set correctly on each page's nav
- Hash fragment deep-linking works (e.g., `devices.html#ios`, `financial.html#legal`)
- Mobile layout works on every page
- Tab through each page to verify focus order and keyboard accessibility

- [ ] **Step 3: Lighthouse audit**

Run Chrome Lighthouse on `index.html` and `emergency.html` (the two most complex pages). Check:
- Accessibility score (target 90+)
- **Specifically check:** muted brown `#6B6155` on warm cream `#FAFAF5` -- the spec flags this as close to the 4.5:1 WCAG AA threshold. If it fails, darken the brown slightly (e.g., `#5C5347`).
- Fix any other flagged issues (missing labels, etc.)

- [ ] **Step 4: Commit**

```bash
git add 404.html
git commit -m "feat: add 404 page and complete cross-page verification"
```

---

## Task Summary

| Task | What | Files |
|------|------|-------|
| 1 | CSS Foundation | `css/style.css` |
| 2 | JavaScript Module | `js/main.js` |
| 3 | Landing Page | `index.html`, `images/favicon.svg` |
| 4 | Lock Down Devices | `devices.html` |
| 5 | Scam Detection Tools | `scam-tools.html` |
| 6 | AI Companions | `ai-companions.html` |
| 7 | Financial Protection | `financial.html` |
| 8 | Emergency Playbook | `emergency.html` |
| 9 | Understanding the Problem | `understanding.html` |
| 10 | 404 Page + Final Polish | `404.html` |

**Dependencies:** Tasks 1-2 must be completed before Tasks 3-10. Task 3 should be done before 4-9 (establishes the header/footer template to copy). Tasks 4-9 are independent of each other. Task 10 must be last.
