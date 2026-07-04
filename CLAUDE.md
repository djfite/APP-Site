# APP Merchant Services — Claude Code Context

## Project Overview
Static HTML/CSS/JS website for APP Merchant Services, a local payment processing and POS solutions business in Palm Coast, FL. Sales rep for bluu™ powered by Merrick Bank. Target verticals: restaurants, salons, dry cleaners.

## Live Site
- **Current domain:** https://appmerchantservices.com
- **Domain migration completed:** 2026-06-26 (migrated from adproproductions.com)
- **GitHub repo:** github.com/djfite/APP-Site (public)

## Tech Stack
- Pure static HTML/CSS/JS — no frameworks, no build tools
- Hosted on Hostinger Business plan
- Cloudflare CDN (free plan) — SSL Full, Bot Fight Mode, Cache Everything rule active
- Auto-deploy: Git push → GitHub → Hostinger webhook → Cloudflare CDN

## Deployment Workflow
```
1. Make changes in VS Code
2. git add .
3. git commit -m "description"
4. git push
5. Purge Cloudflare cache (Caching → Configuration → Purge Everything)
6. Hard refresh browser (Cmd+Shift+R)
```

## CRITICAL: Cache Busting
Cloudflare aggressively caches JS and CSS files. When making changes to JS or CSS files, you MUST rename the file to force a cache bust. Example: components-v12.js → components-v13.js. Then update ALL HTML files to reference the new filename using find & replace.

**Current file versions:**
- CSS: styles-v2.css (referenced with a `?v=` query cache-buster; currently `?v=10`)
- Components JS: components-v18.js (contains nav + footer injection)
- Calculator JS: calculator.js (savings calculator — do not modify unless asked). As of 2026-07-03 it is embedded on restaurant.html, salon.html, and dry-cleaner.html only (see Recent Changes).

## File Structure
```
APP-SITE/
├── assets/
│   ├── app_logo.png (512x512, dark bg, blue middle P)
│   ├── derek_headshot.png (professional headshot)
│   ├── favicon.ico
│   ├── apple-touch-icon.png (180x180)
│   ├── favicon-192.png
│   └── [hero images for each vertical]
├── css/
│   └── styles-v2.css
├── js/
│   ├── components-v18.js (nav + footer injection)
│   └── calculator.js
├── index.html
├── restaurant.html
├── salon.html
├── dry-cleaner.html
├── services.html
├── faq.html
├── contact.html
├── privacy.html
├── terms.html
└── sitemap.xml
```

## Shared Components (components-v18.js)
- **Nav** — injected via `injectNav(activePage)` at bottom of each HTML file
- **Footer** — injected via `injectFooter()` at bottom of each HTML file
- Any change to nav or footer must be made in components-v18.js, NOT in individual HTML files
- After any change to components JS, rename the file and update all HTML references

## HTML Page Structure
Each page follows this pattern at the bottom:
```html
<script src="/js/components-v18.js"></script>
<script>
injectNav('/pagename.html');
injectFooter();
</script>
<script src="/js/calculator.js"></script> <!-- restaurant, salon, dry-cleaner only -->
<!-- promo banner script: present but DISABLED (commented out) on restaurant, salon, contact -->
</body>
</html>
```
Note: the savings-calculator markup (`<section class="sec calcSec" id="calculator">`) is embedded inline near the bottom of restaurant.html, salon.html, and dry-cleaner.html — one copy per page, not injected/shared.

## Brand Design Tokens
- **Background:** #070a12 (dark navy)
- **Accent/Blue:** #0070ff (electric blue)
- **Surface 1:** slightly lighter than background
- **Text 1:** white/near white
- **Text 2:** muted grey
- **Text 3:** dimmer grey
- **Font Display:** Rajdhani Bold (headings)
- **Font Body:** DM Sans (body text)
- **Border radius:** 8-16px on cards
- **CSS variables:** --blue, --text1, --text2, --text3, --surface1, --surface2

## Promotions
**No active promotion.** The Q2 2026 bluu Edge POS Bundle ($35/mo Terminal + Printer + Pin Pad, 200 units, restaurants & salons) **ended June 30, 2026** and the banner is now disabled (see Recent Changes).

The promo banner container/logic is **preserved (commented out, not deleted)** in restaurant.html, salon.html, and contact.html so a future offer can be re-enabled without rebuilding it. To re-enable: delete the `/*` and `*/` wrapper lines in the banner `<script>` block and update the offer copy (headline, price, inclusions, deadline, unit count). (index.html no longer carries a promo banner after the pharmacy-first redesign.)

## Contact Info
- Phone: (386) 259-0649
- Email: derek@appmerchantservices.com
- Location: Palm Coast, FL
- Hours: Mon-Fri 9am-5pm ET
- Jotform contact form ID: 243268921130048

## Analytics & SEO
- GA4 ID: G-3RPGTJ7M12
- Search Console verified: 3FqCoqqjQXs2pN8ZtHvuU_JeC_UwtO3WohIwuxlKrgw
- Sitemap: submitted, 7 pages indexed
- Local Business Schema: added to all 7 pages
- Google Business Profile: verified, live

## Facebook
- Page: https://www.facebook.com/profile.php?id=61568587052713
- Ellie AI chatbot removed from the website 2026-07-04 (see Recent Changes). Any Jotform↔Messenger integration is managed in Jotform, not in site code.

## Recent Changes (2026-07-04)
Work on the `pharmacy-redesign` branch (uncommitted at time of writing):
- **Built `online-pharmacy-payment-processing.html`** — full SEO/credibility page (hero, problem, who-we-work-with, compliance stack, 4-step underwriting, differentiators, FAQ with FAQPage JSON-LD, dark final-CTA with the embedded eligibility Jotform `261836765002053`, jsform, no SRI). Reuses existing `styles-v2.css` classes + the homepage step-counter in `animations.js`; page-specific rules live in a page-local `<style>` block (scoped `.opp`, not in the shared stylesheet). "Compounding pharmacies" as a vertical and the "underwrite in parallel while certification pends" claim were intentionally held out of the live page pending confirmation. The nav/footer "Online Pharmacy" links already pointed here.
- **Ellie AI chatbot removed site-wide** (decision made 2026-07-04). The widget was a single self-contained IIFE at the bottom of the components JS, loaded on every page; deleted there. Also scrubbed the Ellie references from the legal pages: removed Terms §5 "AI Chat Assistant (Ellie)" (renumbered §6–§13 → §5–§12) and the Ellie mentions in Terms §4 and Privacy §1/§2/§4. (No literal "update Ellie's branding" pending item existed in this doc; the decision is recorded here instead.)
- **Footer: removed the "Savings Calculator" link** from the POS Solutions column — the calculator no longer has one canonical home (it lives further down restaurant/salon/dry-cleaner pages, which are already linked in that column).
- **Footer contact column width fix** — the email `derek@appmerchantservices.com` was wrapping under its envelope icon. Rebalanced `.footerTop` grid `1.5fr 1fr 1fr 1fr → 1.3fr 1fr 1fr 1.5fr` and added `white-space: nowrap` to `.footerCol ul li a` so the email sits inline with its icon.
- **Cache-buster bumps** (forced by the shared-file edits above): components JS **v17 → v18** (rename + all 10 HTML references updated); CSS **`?v=9` → `?v=10`** across all 10 HTML files.

## Recent Changes (2026-07-03)
Work on the `pharmacy-redesign` branch (uncommitted at time of writing):
- **Nav wrapping fix** — with 8 nav items + the wider logo lockup, "Dry Cleaners" and the CTA were wrapping to a second line. Fixed in `.nav` CSS: added `white-space: nowrap` to `.navLinks a` and `.navCta`, reduced `.navLinks` gap `32px → 20px`, trimmed `.navCta` padding `9px 20px → 9px 18px`. Verified single-line down to ~900px; the 768px hamburger breakpoint was NOT changed.
- **Sticky nav semi-transparency (intentional)** — `.nav` background `rgba(255,255,255,0.92) → rgba(255,255,255,0.9)` (~90%) with `backdrop-filter: blur(8px)` (+ `-webkit-` prefix), so page content is subtly visible through the nav on scroll. Contrast verified over the dark navy hero (navy logo/links + green tagline stay legible).
- **Promo banner disabled (not deleted)** — expired Q2 2026 offer; the injection `<script>` on restaurant/salon/contact is wrapped in a `/* */` block comment with a re-enable note. No layout gap (banner was dynamically injected; nav collapses cleanly to the top).
- **Savings calculator moved from homepage → per-vertical pages** — recovered the original markup from git (`d1b5da0:index.html`) and embedded one copy each on restaurant.html, salon.html, dry-cleaner.html (inline, `id="calculator"` anchor, wired to the unchanged `js/calculator.js` + existing `.calcSec/.calcWrap/.calcCard/.calcRes/.calcNudge` styles). **Reasoning:** the calculator is a card-present fee-comparison tool; online-pharmacy processing rates don't fit that model, so it is intentionally NOT on index.html, the (future) online-pharmacy page, or faq.html.
- **Fixed 4 broken "Estimate My Savings" / calculator links** (previously all pointed at the now-nonexistent `/index.html#calculator`):
  - restaurant.html → `restaurant.html#calculator`
  - salon.html → `salon.html#calculator`
  - dry-cleaner.html → `dry-cleaner.html#calculator`
  - faq.html → `restaurant.html#calculator` (PLACEHOLDER — long-term FAQ→calculator behavior still undecided)
- **Removed the "Home" nav link** — dropped from the `injectNav` pages array in the shared components JS (the logo already links to `/index.html`). Applies to all 9 pages. Triggered a components rename **v16 → v17** (JS cache-busting convention); all 9 HTML references updated.
- **"Check Your Eligibility" now embeds a Jotform on-page** — the dead "Pre-qualification form loading" spinner in the `#qualify` section (index.html) was replaced with an inline Jotform embed (`https://form.jotform.com/jsform/261836765002053`), wrapped in the `.phFormShell` light card (white, hairline border, green top-accent) with a short intro line. **This is a PLACEHOLDER shell form (Name / Email / Phone only)** — marked with an HTML comment in index.html; the full pharmacy pre-qualification form (conditional/branching logic) is still to be built. Verified it renders inside the card without breaking layout or conflicting with the scroll observer / other page scripts. Note: no Subresource Integrity on the embed script — Jotform's `jsform` endpoint is dynamic (changes when the form is edited), so a pinned SRI hash would break it.

## Known Issues / In Progress
- **(Resolved 2026-07-03)** The old "promo banner appears behind the sticky nav" issue is moot — the banner is disabled. If a future banner is re-enabled, it is injected after the nav with `margin-top` to clear the fixed nav (do NOT use `position:fixed` on it; it should scroll with the page but sit below the nav). Nav height is ~68px.
- **Doc drift:** the "Brand Design Tokens" and font sections below still describe the pre-rebrand dark theme (Rajdhani/DM Sans, #070a12/#0070ff). The site is now the navy/green/white light system (Schibsted Grotesk / Hanken Grotesk / JetBrains Mono) — these sections should be refreshed in a follow-up (not done today to stay scoped).
- **Pending:**
  - **Check Your Eligibility form** — currently a placeholder Jotform embed (`261836765002053`, shell fields Name/Email/Phone only) on index.html `#qualify`. Full pre-qualification form with branching logic (website, business type, monthly volume, LegitScript status, etc.) still to be built, then swap the embed / expand the form.
  - online-pharmacy-payment-processing.html — built 2026-07-04 (see Recent Changes). Its final-CTA section still uses the placeholder eligibility Jotform (shell fields only); swap when the full pre-qualification form is built.
  - faq.html calculator reference (`restaurant.html#calculator`) is a placeholder pending a decision.
  - Note: the eligibility Jotform (`261836765002053`) is separate from the Contact page Jotform (`243268921130048`).

## Do Not Touch
- calculator.js — savings calculator logic, do not modify unless explicitly asked
- sitemap.xml — do not modify
- styles-v2.css — only modify if explicitly asked for CSS changes
- Any changes to shared elements (nav links, footer content, phone number) must go in components JS only
