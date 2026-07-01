# APP Merchant Services — Homepage Design Brief
### Pharmacy-First Fintech Redesign

**Purpose:** This brief defines the visual direction, motion language, and technical approach for redesigning `index.html`. It is scoped to the homepage only. Once approved, this same brief will guide the redesign of secondary pages (online-pharmacy-payment-processing.html, restaurant.html, etc.) in a later phase.

**Target quality bar:** This should look and feel like a $10,000 professional web design engagement — not a template, not AI-generated-looking, not generic. Every section should feel deliberate.

**Audience:** Online pharmacy operators, telehealth/GLP-1 providers, and compounding pharmacy owners evaluating payment processors after being rejected, dropped, or frustrated by mainstream providers. This audience is sophisticated, skeptical, and pattern-matches fast on "generic vendor site" vs. "specialist who gets it."

---

## 1. Point of View / Initial Feel

The site should feel like a **specialist fintech tool**, not a general merchant services brochure. Reference points: Stripe, Ramp, Revolut, Wise. These sites succeed because they feel like software products, even though they're marketing pages — clean data visualization, confident typography, restrained color, and interface-like visual elements (cards, dashboards, transaction mockups) rather than stock-photo-driven storytelling.

The emotional register on load should be: *"These people understand exactly what I've been through, and they clearly know what they're doing technically."* Competence and empathy, expressed visually before a single word is read.

Avoid: generic corporate warmth, overly friendly rounded illustrations, anything that reads as a small local business site (even though APP Merchant Services also serves local merchants — that positioning lives on secondary pages, not here).

---

## 2. Color System

**Base background:** `#0A0D14` — a warm dark gray, not pure black. This replaces or refines the current `#070a12` with slightly more warmth so it doesn't read as harsh/cold like Revolut's true black.

**Secondary background (section alternation):** `#12151C` — for subtly differentiating sections without a hard line.

**Primary accent:** `#0070FF` — unchanged, this is the brand blue and stays as the single dominant accent color. Used sparingly: CTAs, key numbers, active states, section eyebrow labels.

**Text hierarchy:**
- Primary text (headlines): `#FFFFFF`
- Secondary text (body copy): `#8892A4`
- Tertiary/muted text (fine print, labels): `rgba(255,255,255,0.35)`

**Card/surface backgrounds:** `#12151C` to `#161A22`, with a subtle `1px solid rgba(255,255,255,0.06)` border. No heavy shadows — depth comes from subtle border + background contrast, matching the Stripe/Ramp aesthetic.

**Do not introduce secondary accent colors** (no green, no orange, no purple) except within contained illustrative elements (e.g., a small dot indicating a live status, matching Ramp's dotted animation style) where it reads as data, not brand color.

---

## 3. Typography

**Headline font:** Space Grotesk (Google Fonts) — weights 500, 600, 700
Distinctive geometric character without being a display/decorative font. Reads as technical and confident. Excellent numeral styling, which matters for stat blocks and pricing/data-style content.

**Body font:** Inter (Google Fonts) — weights 400, 500, 600
The current standard for fintech UI text. Highly legible at small sizes, pairs cleanly with Space Grotesk.

**This replaces Rajdhani/DM Sans on the homepage.** Rajdhani reads slightly more "gaming/esports" than fintech; Space Grotesk is the more accurate reference match to Stripe/Ramp/Revolut positioning. (Rajdhani can remain on secondary pages for now if you want to phase the transition, but ideally the whole site eventually moves to this pairing.)

**Type scale guidance:**
- Hero H1: 64–80px desktop, weight 600, tight line-height (1.05–1.1)
- Section H2: 40–48px, weight 600
- Body: 16–18px, weight 400, line-height 1.6
- Eyebrow labels: 11px, weight 600, letter-spacing 0.12em, uppercase, accent blue
- Stat numbers: 56–72px, weight 700, Space Grotesk tabular numerals

---

## 4. Layout & Card System

Adopt the **Stripe/Ramp card grid pattern** as the primary structural device for feature/benefit sections (this replaces the current plain numbered-list "What Makes Us Different" section):

- Cards have rounded corners: `border-radius: 16px`
- Card background: `#12151C`, border `1px solid rgba(255,255,255,0.06)`
- Padding: generous, minimum 32px
- Grid: 2-column or asymmetric (one large card + two smaller stacked, matching Stripe's mixed grid) rather than a rigid uniform 2x2
- Each card contains: a short headline, brief supporting text, and a **contained visual/animation area** at the bottom or side of the card (see Motion section below)

This card system should be used for:
- "What Makes Us Different" (4 items → reformat as cards with embedded micro-animations)
- A new "How It Works" treatment if desired (optional card-ification)
- Potentially a new "Payment Network" trust card (see Motion section, Concept 3)

Sections that should NOT be card-ified: hero, pain point quotes ("Sound Familiar?"), and the final CTA — these work better as full-width, spacious, non-boxed layouts per the Revolut/Wise reference.

---

## 5. Motion & Micro-Animation Concepts

Motion is a first-class requirement, not decoration. Every animation must feel **handcrafted and purposeful** — tied to a specific narrative moment, not generic fade-ins applied uniformly. Reference: Stripe's card animations (money moving across a globe), Ramp's transaction toast notifications, Revolut's phone mockup interactions.

All animations are **CSS + vanilla JS only** (no animation libraries). Must respect `prefers-reduced-motion`. Each one should loop or replay in a way that feels alive on repeat viewing, not just a one-time entrance effect.

### Concept A — "Payment Journey" Card
Replaces or supplements the current stat block. A card showing a simplified US map (SVG) with a small dot/pulse traveling from a patient location to a pharmacy location, then a checkmark confirming "Payment Settled." This visualizes the reliability message better than static text. Loop duration ~4s, replays continuously while in viewport.

### Concept B — "Live Transaction" Card
A small mockup UI element (styled like a phone or dashboard notification) that shows a simulated transaction appearing: "New order — $84.50 — Semaglutide Rx" sliding in, followed by a "✓ Processed" state. This directly mirrors the Ramp "Cards & Expenses that handle themselves" card and speaks directly to the pharmacy audience's actual product (prescription orders).

### Concept C — "Checkout Flow" Preview
A simplified, stylized checkout mockup (not a real functioning form) showing: cart summary → payment method selection → success state, cycling through automatically. This mirrors the Revolut phone-screen animation concept and reinforces "this is what your customer's payment experience looks like when it works."

### Concept D — Trust Bar Refinement
The existing accepted-networks bar stays subtle per current implementation, but on scroll-into-view, each logo should fade/slide in with a staggered delay (100ms apart) rather than appearing all at once — small touch, matches the "handcrafted" requirement.

### Concept E — Hero Parallax (already implemented)
Keep existing hero parallax and headline stagger animations from the prior build pass. These stay as-is unless they conflict with new visual direction.

### Concept F — Scroll-Triggered Count-Up Stats
Keep existing step-number count-up behavior in "How It Works" — this already matches the desired handcrafted feel.

**Implementation note for Claude Code:** Build Concepts A, B, and C as self-contained components (own CSS classes, own small JS module) so they can be tested and refined independently, then placed into the appropriate cards. Prioritize B first (highest narrative relevance to pharmacy orders), then A, then C if time/complexity allows.

---

## 6. Imagery Direction

**Hero image:** Keep current approach (real stock photography of healthcare professional) for authenticity reasons — do not replace with AI-generated human faces for primary hero imagery.

**Supporting imagery:** AI-generated imagery is appropriate for:
- Abstract data/network visualizations
- Payment flow graphics
- Blurred/environmental context shots (hands on a laptop keyboard, out-of-focus pharmacy shelving)
- Dashboard/UI mockup elements (these are illustrated, not photographic, so authenticity concerns don't apply)

Do not use AI-generated close-up human faces as a stand-in for real stock photography anywhere prospects might scrutinize closely (hero, testimonials if added later).

---

## 7. Mobile Considerations

- Card grids collapse to single column below 768px
- Hero headline scales down to 36–44px, maintains tight line-height
- Micro-animations (Concepts A/B/C) should either simplify significantly or pause/replace with a static state on mobile to preserve performance and avoid janky scroll behavior on lower-powered devices
- Touch targets (buttons, links) minimum 44px height
- Accepted networks bar wraps to two rows if needed rather than horizontal scroll
- Trust bar and stat elements stack vertically on mobile with generous spacing rather than compressing horizontally

---

## 8. Codebase Structure Guidance

- All new component-specific CSS should be organized with clear comment headers in `styles-v2.css` (e.g., `/* ===== TRANSACTION CARD ANIMATION ===== */`) so sections are easy to locate and iterate on independently
- Each motion concept (A/B/C) gets its own JS function in `animations.js`, clearly named (`initPaymentJourneyCard()`, `initLiveTransactionCard()`, etc.) rather than one monolithic scroll handler
- Reuse the existing Intersection Observer pattern already established in the current `animations.js` for consistency
- Maintain the existing versioned cache-busting convention (components-vXX.js) — do not deviate from this workflow
- Keep all changes scoped to `index.html`, `styles-v2.css`, and `animations.js` unless a footer/nav change is explicitly required

---

## 9. $10K Quality Checklist

Before considering this redesign complete, verify against each of these:

- [ ] **Point of view** — does the page feel like a specialist fintech product on first impression, not a generic services site?
- [ ] **Typography** — is the Space Grotesk/Inter pairing implemented consistently, with clear hierarchy and confident scale?
- [ ] **Color hierarchy** — is blue used sparingly and purposefully, with the warm dark gray base feeling intentional rather than default?
- [ ] **Imagery** — does all imagery (real and AI-assisted) feel cohesive and support trust rather than undermine it?
- [ ] **Motion** — do the animations feel handcrafted and narratively tied to the pharmacy payment story, not generic scroll-fade templates?
- [ ] **Mobile** — does every section degrade gracefully, with no broken layouts, overflow, or unreadable text at 375px width?
- [ ] **Codebase structure** — is the code organized well enough that a future developer (or future Derek) could find and modify any single component without archaeology?

---

## 10. Explicitly Out of Scope for This Pass

- Pharmacy page (`online-pharmacy-payment-processing.html`) — future phase, same brief will apply
- Restaurant/Salon/Dry Cleaner pages — unchanged for now
- Jotform embed styling — placeholder remains until Prompt D
- Full font migration site-wide — homepage only for this pass; decide later whether to propagate Space Grotesk/Inter everywhere
