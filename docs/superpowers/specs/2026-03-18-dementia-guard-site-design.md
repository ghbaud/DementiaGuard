# DementiaGuard Site Design Spec

## Overview

A curated, read-only reference website for families and caregivers of people with dementia who are vulnerable to online scams and exploitation. The site provides layered guidance -- quick actionable suggestions alongside deeper context -- in a warm, non-prescriptive tone that respects each family's unique situation.

No login, no editing, no configuration. Visit and use.

## Goals

- Help families protect a loved one with dementia from online financial exploitation
- Provide actionable steps without being prescriptive -- suggestive guidance, not mandates
- Consolidate scattered information (device lockdown, scam tools, AI companions, financial protection, ethical considerations) into one coherent resource
- Be immediately useful to someone in crisis and also valuable for longer-term planning

## Non-Goals

- Not a template or customizable framework -- content is curated and fixed
- Not a community or forum -- no user accounts, no comments, no user-generated content
- Not medical or legal advice -- the site provides informational guidance with appropriate disclaimers
- No search functionality -- the site is small enough to navigate directly
- No print stylesheet in the initial build (future consideration)

## Audience

- Family members with varying levels of technical comfort
- Professional caregivers and care coordinators
- Social workers or elder care advocates who may refer families to the site

## Technology

- **Multi-page static site** with hub-style landing page linking to focused sub-pages
- **Plain HTML/CSS/JS** -- no framework, no build step, no dependencies
- **Hosted on GitHub Pages** (or any static host) -- free, reliable, no server to maintain
- **Mobile-responsive** throughout -- families will frequently access from phones
- **Project location:** `C:\Users\dhite\Projects\web\DementiaGuard\`

## Visual Style

### Warm & Approachable

The site should feel like a trusted health resource, not a tech site. Gentle, non-clinical, supportive.

- **Color palette:**
  - Sage green: `#5B6E4E` (headings, accents, links)
  - Warm cream: `#FAFAF5` (page backgrounds)
  - Muted brown: `#6B6155` (body text)
  - Warm tan: `#8A7F6B` (secondary text, breadcrumbs)
  - Light sand: `#F0EDE4` (highlight boxes)
  - Soft border: `#E5DFD3` (cards, dividers)
- **Typography:** Serif headings (Georgia or similar), readable sans-serif body text. Base font size 16-18px.
- **Spacing:** Generous padding and line-height for readability. Nothing cramped.
- **Shape:** Rounded corners (8px border-radius), no sharp edges.
- **Links:** Always underlined for discoverability (audience skews older). Sage green for unvisited, slightly darker for visited, subtle highlight on hover.

## Accessibility

The audience includes elderly caregivers who may have their own visual or motor impairments. Target **WCAG 2.1 AA** compliance.

- **Color contrast:** Verify all text/background combinations meet 4.5:1 ratio. The muted brown (`#6B6155`) on warm cream (`#FAFAF5`) is close to the threshold -- test and adjust if needed.
- **Keyboard navigation:** All expandable sections must be operable via keyboard (Enter/Space to toggle). Visible focus indicators on all interactive elements.
- **ARIA attributes:** Expandable sections use `role="button"`, `aria-expanded`, and `aria-controls`. Hamburger menu uses `aria-expanded` and `aria-label`.
- **Semantic HTML:** Use `<main>`, `<nav>`, `<header>`, `<footer>` landmark roles. Include a "Skip to content" link as the first focusable element.
- **Images:** Alt text on all images and icons. Decorative images use `alt=""`.

## Voice & Tone

### Principles

1. **Suggestive, not prescriptive.** "Consider this..." "Some families find..." "This may help..." -- never "You must..." "Always..." "Never..."
2. **Acknowledge complexity.** Every patient and family is different. What calms one person may agitate another. Restricting a device may cause distress that outweighs the protection.
3. **Permission to go slow.** Not everything needs to happen today. Small steps count. It's okay to try something and back off if it doesn't work.
4. **Trust the family.** "You know them best" is a recurring refrain. The site provides options and context; the family makes the calls.

### Practical Application

- The "At a Glance" box is titled **"Things That Often Help"** -- suggestions, not commands
- Step-by-step guides include notes like "If this causes distress, it's okay to skip this step"
- Tool recommendations say "worth considering" not "you need this"
- The Emergency Playbook stays more direct (crises need clarity) but still acknowledges the family as decision-maker
- A **"Before You Begin"** note on the landing page sets the gentle, non-prescriptive tone for the entire site

## Site Map

### 1. Landing Page (index.html)

Hub-first layout. Visitors are oriented before being directed.

- **Header:** Site name and tagline ("Protecting vulnerable loved ones from online exploitation")
- **Empathetic intro paragraph:** "If someone you love has dementia and is being targeted by online scams, you're not alone..."
- **"Before You Begin" note:** Sets the tone -- every family is different, these are suggestions not mandates, small steps count
- **"A Good Place to Start" card:** Highlighted with a warm border. Contains soft suggestions (not a numbered checklist), each linking to the relevant detail page: limiting device capabilities (-> Devices), adding scam detection (-> Scam Tools), talking with the bank (-> Financial), reducing social media exposure (-> Devices), having key numbers ready (-> Emergency Playbook)
- **Six section cards** in a 2-column grid, each with title and brief description:
  - Lock Down Devices
  - Scam Detection Tools
  - AI Companions
  - Financial Protection
  - Emergency Playbook
  - Understanding the Problem
- **Footer:** Helpline numbers, disclaimer

### 2. Lock Down Devices (devices.html)

Step-by-step guides for restricting what their devices can do.

- **Intro:** The single most effective thing you can do. Takes 10-15 minutes.
- **"Things That Often Help" box:** Restrict purchases, limit social media, enable simplified home screen, set passcodes
- **Three expandable platform sections:**
  - **iPad & iPhone (iOS):** Screen Time passcode, purchase restrictions, app limits, Assistive Access, Family Sharing workarounds
  - **Android:** Google Family Link, Play Store restrictions, app pinning
  - **Windows:** Microsoft Family Safety, browser restrictions, account limitations
- **Each section** includes time estimate ("~15 minutes"), numbered steps, and sensitivity notes ("If this causes distress...")
- **"Why This Matters"** section with context (in-app purchase blindness, the credit card replacement story)
- **Related links:** Scam Detection Tools, Financial Protection, Emergency Playbook

### 3. Scam Detection Tools (scam-tools.html)

Reviews of software that can detect and block scam attempts.

- **Intro:** Tools that work in the background to catch what you can't.
- **"Things That Often Help" box:** Install a scam detection app, add a browser extension, enable phone-level blocking
- **Tool cards** for each product, containing: what it does, platforms supported, cost, how to install, strengths/limitations:
  - **SeniorShield.AI** -- iOS app + Chrome extension, real-time scam detection in messages/emails, $3.99/mo premium
  - **ElderShield** -- AI-powered online scam protection
  - **ZoraSafe** -- AI scam shield with senior-specific features
  - **GPTZero's guide** -- detecting AI-generated scam content
- Each tool card includes a **"Last reviewed: [date]"** note so readers know how current the information is
- **Comparison table** summarizing platforms, cost, and key features
- **"Why This Matters"** section: how AI-powered scams work, why they're convincing, the scale of the problem
- **Related links:** Lock Down Devices, Financial Protection

### 4. AI Companions (ai-companions.html)

AI tools that provide companionship and may help with safety.

- **Intro:** AI companions can reduce loneliness and provide engagement, but come with important considerations.
- **"Things That Often Help" box:** Consider whether an AI companion fits their personality, start with monitored options, involve their care team
- **Product cards:**
  - **Ella AI** -- dementia-certified, caregiver reporting, emergency alerts
  - **ElliQ** -- physical companion robot, proactive conversation, health reminders
  - **SeniorTalk** -- AI chatbot companion, loneliness reduction, speech pattern monitoring
  - **CareYaya QuikTok** -- telephone-based (no device needed), voice conversations
- **"Custom AI Personas" section:** The concept of setting up a personalized AI assistant. What's possible, what the risks are, guidance on guardrails.
- **"Therapeutic Deception" framework:** What dementia care ethics says about benign deception. When it's accepted practice, when it's risky, the key test ("who benefits?")
- **Risks section:** Reinforcing delusions, anthropomorphization, replacing real connection, consistency challenges
- **"Why This Matters"** section: loneliness and dementia progression, the engagement gap, 63.3% of users report reduced anxiety
- **Related links:** Understanding the Problem, Emergency Playbook

### 5. Financial Protection (financial.html)

Safeguards at the banking and legal level.

- **Intro:** Even with device restrictions and scam detection, a financial safety net matters.
- **"Things That Often Help" box:** Call the bank, consider a prepaid card, review legal options
- **Expandable sections:**
  - **Bank-level protections:** Fraud alerts, transaction limits, trusted contact designation, AARP BankSafe program
  - **Spending-limited cards:** True Link Visa Prepaid Card -- caregiver-controlled spending rules, merchant blocking, works like a normal card to the user
  - **Legal foundations:** Power of attorney (what it is, when to pursue), guardianship/conservatorship basics, when to involve an elder law attorney
  - **Credit protection:** Freezing credit reports, monitoring for new accounts
- **"Why This Matters"** section: $3.4B in elder fraud losses, the link between fraud victimization and health outcomes
- **Related links:** Lock Down Devices, Emergency Playbook
- **Resource links:** Alzheimer's Association, AARP Fraud Watch Network, local elder law referrals

### 6. Emergency Playbook (emergency.html)

Interactive decision trees for common crisis scenarios.

- **Intro:** What to do right now, with calm and clarity.
- **Tone note:** This page is slightly more direct than others because crises need clear guidance. But it still respects the family as decision-maker.
- **Five clickable scenario cards** that expand in place:
  1. **They're about to send money to someone online** -- don't argue about the person's reality, redirect gently, create a pause; then check transactions, add restrictions
  2. **They already sent money or gift cards** -- contact bank immediately, report to FTC, document what happened, don't blame them
  3. **They gave out personal information** -- freeze credit, change passwords, monitor accounts, contact affected institutions
  4. **They believe they're in a relationship with someone online** -- don't confront the belief directly, gently introduce doubt over time, block the contact if possible, involve their care team
  5. **They're upset because I restricted their device** -- validate their feelings, explain in simple terms, offer alternatives, consider gradual rather than sudden restrictions
- **Each scenario** contains:
  - **"In the moment"** -- what to do right now (calm, gentle, practical)
  - **"After the moment passes"** -- preventive steps with cross-links to relevant pages
  - **Closing reassurance** -- "each time you redirect successfully is a win"
- **Related links:** All other pages as appropriate per scenario

### 7. Understanding the Problem (understanding.html)

Context and background for those who want to understand why this happens.

- **Intro:** Understanding the landscape can help you make better decisions about protection.
- **No "Things That Often Help" box** -- this page is informational context, not actionable steps. It intentionally deviates from the standard content pattern.
- **Expandable sections:**
  - **Why people with dementia are targeted:** Impaired judgment, trust, impulsivity, isolation, inability to recognize manipulation patterns
  - **How modern scams work:** AI-generated voices, deepfakes, romance scams, social media exploitation, fake celebrity accounts, urgency tactics
  - **The scale of the problem:** $3.4B in losses, projected dementia population growth, the fraud-to-care-home pipeline statistic
  - **Common patterns to watch for:** Gift card requests, wire transfers, "investment opportunities," tech support scams, government impersonation
  - **The role of social media:** Why Facebook and similar platforms are particularly dangerous for this population
- **"Why This Matters"** section: understanding patterns helps you spot early warning signs before a crisis
- **Related links:** Emergency Playbook, Scam Detection Tools

## Shared Elements

### Header
- Site name ("DementiaGuard") with tagline
- Navigation links to all seven pages
- Responsive: collapses to hamburger menu on mobile (breakpoint: 768px, overlay on content, auto-closes on link click)

### Footer
- **Helpline numbers:**
  - Alzheimer's Association 24/7 Helpline: 800.272.3900
  - AARP Fraud Watch Network Helpline: 877.908.3360
- **Disclaimer:** "This site provides general informational guidance, not medical or legal advice. Consult appropriate professionals for your specific situation."
- **Attribution and source links**

### Breadcrumbs
- All sub-pages show: Home > [Page Name]
- Breadcrumbs use muted styling, positioned above the page title

### Expandable Sections
- Click to expand/collapse
- Visual indicator (chevron or similar) showing state
- Smooth animation
- **Default state:** All sections start collapsed on page load. URL hash fragments (e.g., `devices.html#ios`) can deep-link to and auto-expand a specific section.
- Expanded sections include sensitivity notes where appropriate

### Cross-Reference Links
- "Related" box at bottom of each page linking to relevant sibling pages
- In-line links within content where other pages are referenced

## File Structure

```
DementiaGuard/
  index.html          -- landing page
  devices.html        -- lock down devices
  scam-tools.html     -- scam detection tools
  ai-companions.html  -- AI companions
  financial.html      -- financial protection
  emergency.html      -- emergency playbook
  understanding.html  -- understanding the problem
  css/
    style.css         -- shared styles, color palette, typography, responsive
  js/
    main.js           -- expand/collapse, mobile nav, smooth scrolling
  404.html            -- friendly "page not found" in site style, links back to home
  images/             -- any icons or illustrations (keep minimal)
```

Note: `docs/` (specs, plans) lives in the repo but is excluded from deployment. Only `*.html`, `css/`, `js/`, and `images/` are deployed to GitHub Pages.

### Social Sharing Metadata

Each page includes Open Graph tags for link previews when shared via messaging apps:
- `og:title` -- page title
- `og:description` -- page intro text
- `og:image` -- a shared site image (warm, simple, branded)
- `og:type` -- "website"
- Plus a favicon consistent with the warm visual style.

## Content Sources

All content is drawn from research conducted during the design session. Key sources to reference and link:

- [SeniorShield.AI](https://www.seniorshield.ai/)
- [ElderShield](https://eldershield.app/)
- [ZoraSafe](https://zorasafe.com/for-seniors)
- [Ella AI](https://www.ella-ai-care.com/)
- [ElliQ](https://elliq.com/)
- [SeniorTalk](https://www.senior-talk.com/)
- [CareYaya QuikTok](https://www.careyaya.org/resources/news/quiktok)
- [True Link Financial](https://www.truelinkfinancial.com/)
- [AARP Dementia Resource Guide](https://www.aarp.org/health/brain-health/dementia-resource-guide-digital-edition/)
- [AARP BankSafe Initiative](https://www.aarp.org/advocacy/banksafe-training-protects-adults-with-dementia/)
- [Alzheimer's Association Technology 101](https://www.alz.org/help-support/caregiving/safety/technology-101)
- [Harvard D3: Promise and Peril of AI Companions](https://d3.harvard.edu/navigating-the-promise-and-peril-of-ai-companions-for-older-adults/)
- [Nature Mental Health: AI Companions for Dementia](https://www.nature.com/articles/s44220-025-00545-w)
- [Apple Support: Screen Time for Family Members](https://support.apple.com/guide/ipad/set-up-screen-time-for-a-family-member-ipadb15cb886/ipados)
