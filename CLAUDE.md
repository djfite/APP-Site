# APP Merchant Services — Claude Code Context

## Project Overview
Static HTML/CSS/JS website for APP Merchant Services, a local payment processing and POS solutions business in Palm Coast, FL. Sales rep for bluu™ powered by Merrick Bank. Target verticals: restaurants, salons, dry cleaners.

## Live Site
- **Current domain:** https://adproproductions.com
- **Future domain:** https://appmerchantservices.com (purchased, not yet switched)
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
Cloudflare aggressively caches JS and CSS files. When making changes to JS or CSS files, you MUST rename the file to force a cache bust. Example: components-v11.js → components-v12.js. Then update ALL HTML files to reference the new filename using find & replace.

**Current file versions:**
- CSS: styles-v2.css
- Components JS: components-v11.js (contains nav, footer, Ellie AI agent injection)
- Calculator JS: calculator.js (savings calculator — do not modify unless asked)

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
│   ├── components-v10.js (nav + footer injection + Ellie AI agent)
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

## Shared Components (components-v10.js)
- **Nav** — injected via `injectNav(activePage)` at bottom of each HTML file
- **Footer** — injected via `injectFooter()` at bottom of each HTML file
- **Ellie AI Agent** — Jotform chatbot injected on all pages (agent ID: 019a849dc7117bdb8560faf980b1c548959d)
- Any change to nav or footer must be made in components-v10.js, NOT in individual HTML files
- After any change to components JS, rename the file and update all HTML references

## HTML Page Structure
Each page follows this pattern at the bottom:
```html
<script src="/js/components-v10.js"></script>
<script src="/js/calculator.js"></script> <!-- index.html only -->
<script>
injectNav('/pagename.html');
injectFooter();
</script>
<!-- promo banner script here on: index, restaurant, salon, contact -->
</body>
</html>
```

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

## Current Active Promotion
Q2 2026 bluu Edge POS Bundle:
- $35/month (standard $64.90, $30 promotional credit applied)
- Includes: Terminal + Printer + Pin Pad
- Available for: Restaurants and Salons ONLY (not dry cleaners)
- Limited to 200 units nationwide
- Ends: June 30, 2026
- Promo banner with close button is on: index.html, restaurant.html, salon.html, contact.html

## Contact Info
- Phone: (386) 259-0649
- Email: derek@adproproductions.com
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
- Ellie AI agent connected to Facebook Messenger

## Known Issues / In Progress
- Promo banner (id="promoBanner") is appearing behind the sticky nav — needs positioning fix
- The banner is injected via a script block in each HTML file after injectFooter()
- Nav height is approximately 70px
- Do NOT use position:fixed on the banner — it should scroll with the page but appear below nav

## Do Not Touch
- calculator.js — savings calculator logic, do not modify unless explicitly asked
- sitemap.xml — do not modify
- styles-v2.css — only modify if explicitly asked for CSS changes
- Any changes to shared elements (nav links, footer content, phone number) must go in components JS only
