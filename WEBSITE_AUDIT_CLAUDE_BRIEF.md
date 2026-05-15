# CyberArmour Website Audit + Claude Brief (Live Next.js)

## 1) Scope and Verification
- Scope included only active Next.js routes under `app/`.
- Scope excluded `old website/` and unused backup components.
- Audience target: B2B decision makers.
- Optimization target: conversion.

### Active route map (verified)
- `/` from `app/page.tsx` -> `HomePage` in `components/Site.tsx`
- `/contact` from `app/contact/page.tsx`
- `/case-studies` from `app/case-studies/page.tsx`
- `/case-studies/[slug]` from `app/case-studies/[slug]/page.tsx`
- `/changelog` from `app/changelog/page.tsx`
- `/privacy` from `app/privacy/page.tsx`

### Home section order (verified runtime composition)
1. Navbar
2. Hero
3. Services
4. Products
5. Case Studies
6. Customers
7. About Us
8. Join Us
9. Globe Footer

---

## 2) Section-by-Section Inventory (Purpose, Content, Interactions, Animation, Conversion Role)

## Home (`/`)

### A) Navbar
- Section goal:
  - Persistent top navigation and primary CTA entry to Contact page.
- Visible content blocks:
  - Logo (mark + “CyberArmour” wordmark)
  - Desktop links: Home, Services, Products, Case Studies, Customers
  - Desktop CTA button: “Contact Us”
  - Mobile hamburger + expandable menu with same links and CTA
- Interaction model:
  - Scroll-aware surface state (`isScrolled` when `window.scrollY > 24`)
  - Mobile open/close state
  - Hover/tap motion on desktop CTA
- Animation spec:
  - Navbar surface transition: 500ms CSS transition between solid and translucent/blurred states.
  - Top gradient fade-in/fade-out with scroll state: 500ms opacity transition.
  - Desktop CTA (`motion.a`): hover `y: -2`, tap `scale: 0.985`, duration 0.2s, ease `[0.22, 1, 0.36, 1]`.
  - Mobile menu (`AnimatePresence` + `motion.div`): open/close `height: 0 <-> auto`, `opacity: 0 <-> 1`, duration 0.28s, same ease.
  - Hamburger icon lines use CSS transforms/opacity transitions between burger and X.
- Conversion role in funnel:
  - Top-of-funnel routing + consistent “Contact Us” CTA from every page.

### B) Hero
- Section goal:
  - Establish brand and positioning immediately.
- Visible content blocks:
  - Full-screen hero with “CyberArmour” headline
  - Subhead: “Next-gen AI systems, built for tomorrow's innovators”
  - Primary button: “Book a demo”
  - Interactive gravitational mesh background canvas
- Interaction model:
  - Pointer-reactive background simulation.
  - If no pointer activity, autopilot pointer motion keeps scene alive.
- Animation spec:
  - Canvas loop (`requestAnimationFrame`): dynamic point grid with spring-like displacement toward pointer, link lines, glow nodes.
  - Pointer freshness gating: reveal intensity ramps up with active pointer and decays when idle.
  - Headline (`motion.div`) on load: `opacity 0.5->1`, `scale 0.82->1`, `y 12->0`, duration 0.85s, delay 0.48s.
  - Subhead (`motion.p`) on load: `opacity 0->1`, `y 18->0`, duration 0.75s, delay 0.66s.
  - CTA (`motion.div`) on load: `opacity 0->1`, `y 16->0`, duration 0.7s, delay 0.78s.
- Conversion role in funnel:
  - Immediate promise framing + primary CTA click to initiate inquiry/demo.

### C) Services
- Section goal:
  - Explain service categories and concrete offerings.
- Visible content blocks:
  - Heading: “Our Services”
  - Horizontal rail of 5 large service cards with icons + 3 bullet items each.
- Interaction model:
  - Scroll-driven horizontal translation while section is sticky.
  - Responsive card widths by breakpoint.
- Animation spec:
  - Section height computed as `100svh + distance`; sticky viewport while rail translates.
  - Scroll progress from section top maps to rail transform `translate3d(-distance * progress, 0, 0)`.
  - Smoothed movement with RAF easing (`SCROLL_EASE = 0.3`, snap threshold 0.5).
  - Heading in-view reveal: `opacity 0->1`, `y 34->0`, duration 0.7s.
  - Rail wrapper in-view reveal: `opacity 0->1`, `y 28->0`, duration 0.65s.
- Conversion role in funnel:
  - Mid-funnel capability clarity; helps visitors self-identify fit.

### D) Products
- Section goal:
  - Showcase productized AI capability (Whisper AI Assistant) and supporting features.
- Visible content blocks:
  - “Products” title
  - Strategic banner: “Lead the industry with AI or watch others do it”
  - Left explanatory cards (desktop scroll-linked; mobile stacked)
  - Right sticky Whisper demo card with simulated Q&A conversation
  - Marquee pill row
  - Core Features grid (6 cards)
  - Final CTA: “Book a demo”
- Interaction model:
  - Desktop: sticky right panel + intersection-tracked active left card.
  - Simulated chat typing loop (input typing -> user send -> assistant type output).
  - Hover effects on feature cards/icons.
- Animation spec:
  - Section title reveal: `opacity 0->1`, `y -20->0`, duration 0.6s.
  - Banner reveal with blur: `opacity 0->1`, `y 34->0`, `filter blur(10px->0)`, duration 0.7s.
  - Left cards (desktop) per-card in-view reveal: `opacity 0->1`, `y 24->0`, duration 0.5s.
  - Whisper panel reveal: `opacity 0->1`, `x -30->0`, duration 0.6s, delay 0.08s.
  - Chat messages:
    - Message enter motion: `opacity 0->1`, `y 10->0`, stagger by index `delay idx*0.08`.
    - Assistant text typewriter at 20ms per character.
    - Loop timings: type speed 90ms/char, send pause 900ms, response delay 1300ms, between-pairs 1800ms, batch reset pause 3600ms.
  - Marquee track infinite loop: `products-marquee` 36s linear from `translateX(0)` to `-50%`.
  - Rotating border-light effects:
    - Whisper border `border-spin` 5.8s linear infinite.
    - Feature border `border-spin` 3.8s linear infinite.
  - Core feature cards reveal: `opacity 0->1`, `y 34->0`, `scale 0.96->1`, duration 0.55s with per-card delay `idx*0.09`.
  - Feature icon hover scale to 1.1.
- Conversion role in funnel:
  - Converts abstract AI interest into concrete product confidence and capability trust.

### E) Case Studies (home block)
- Section goal:
  - Provide outcome evidence and encourage deeper proof exploration.
- Visible content blocks:
  - Heading: “Latest Case Studies”
  - 3 large sticky-stacked cards with tags, title, metrics, visual panel
  - “View all case studies” CTA card
- Interaction model:
  - Scroll over overlapping sticky cards (`top: 88px`, negative margin for stacking)
  - Click-through to detail pages
- Animation spec:
  - Section heading reveal: `opacity 0->1`, `y 26->0`, duration 0.65s.
  - Each study card reveal: `opacity 0->1`, `y 42->0`, duration 0.7s, delay `index*0.06`.
  - CTA card reveal: `opacity 0->1`, `y 34->0`, duration 0.65s.
  - No additional per-frame loop animation inside cards.
- Conversion role in funnel:
  - Late mid-funnel proof layer: metrics + project narratives reduce perceived execution risk.

### F) Customers (Industries)
- Section goal:
  - Demonstrate market breadth and sector relevance.
- Visible content blocks:
  - Heading + subcopy for sectors
  - Orbit visual with 3 industry cards rotating around center sphere motif
- Interaction model:
  - Orbit pauses on hover (`.customers-orbit-list:hover * { animation-play-state: paused; }`)
- Animation spec:
  - Heading reveal: `opacity 0->1`, `y 24->0`, duration 0.65s.
  - Orbit container reveal: `opacity 0->1`, `y 18->0`, duration 0.65s.
  - Card orbit system via CSS:
    - Parent list item clockwise rotation: `customers-rotate-cw` over 42s (derived from `--rotate-speed: 42`) infinite.
    - Card counter-rotation: `customers-rotate-ccw` same duration infinite to keep readable orientation.
    - Left-half glow mask pulse: `customers-pulse-glow` 5s linear infinite alternate.
- Conversion role in funnel:
  - Broadens trust and relevance for multiple B2B verticals.

### G) About Us
- Section goal:
  - Position company philosophy and credibility at a glance.
- Visible content blocks:
  - Eyebrow: “About Us”
  - Heading + descriptive paragraph
  - 3 value cards
  - 4 highlight stats cards
- Interaction model:
  - Passive scroll reveals only.
- Animation spec:
  - Intro block reveal: `opacity 0->1`, `y 22->0`, duration 0.65s.
  - Values grid reveal: `opacity 0->1`, `y 22->0`, duration 0.65s, delay 0.08s.
  - Highlights grid reveal: `opacity 0->1`, `y 18->0`, duration 0.62s, delay 0.12s.
- Conversion role in funnel:
  - Trust scaffold; currently intended to reduce “who are these people?” hesitation.

### H) Join Us
- Section goal:
  - Attract candidates and provide career CTA.
- Visible content blocks:
  - Main card with heading, paragraph, Apply button
  - Benefits list
  - Open roles panel with 3 sample roles
- Interaction model:
  - Passive scroll reveals only; links route to `/contact`.
- Animation spec:
  - Main panel reveal: `opacity 0->1`, `y 22->0`, duration 0.65s.
  - Open roles panel reveal: `opacity 0->1`, `y 18->0`, duration 0.62s, delay 0.08s.
- Conversion role in funnel:
  - Candidate conversion path; secondary to lead-gen for buyer traffic.

### I) Globe Footer
- Section goal:
  - Contact trust, global presence signaling, and legal links.
- Visible content blocks:
  - Brand row + quick links
  - Interactive rotating globe canvas
  - Office selector buttons (Islamabad, Ajman, London, Hong Kong)
  - Legal row (Privacy, Terms, Cookies)
- Interaction model:
  - Canvas auto-rotates when idle.
  - Hovering office buttons reorients globe to office and highlights country + pin pulse.
- Animation spec:
  - Globe RAF loop:
    - Idle: `rotLon -= 0.18` each frame (continuous spin).
    - Hovered office: eased transition to target lon/lat using custom easeInOut and `easeT += 0.022`.
    - Active pin pulse + animated ring.
  - Office button visual transitions with CSS `duration-300` for scale/underline/hover surface.
  - “Loading world map…” shown until world atlas JSON fetch resolves.
- Conversion role in funnel:
  - Bottom-funnel confidence and contact reassurance.

---

## Other Active Routes

## `/contact`

### Hero/contact header + 2-column panel
- Section goal:
  - Direct inquiry capture.
- Visible content blocks:
  - Contact badge, heading, support sentence.
  - Left: “Office Locations” card with interactive globe and phone micro-CTA.
  - Right: contact form fields + submit button.
- Interaction model:
  - Phone chip hover expands hidden number text.
  - Globe behavior similar to footer globe but container-specific sizing.
- Animation spec:
  - Phone reveal uses CSS transition: hidden span from `max-w:0/opacity:0` to visible on group hover.
  - Globe canvas auto-rotation + hover focus/pulse (same control pattern as footer variant).
  - No framer-motion entry animations in this page component.
- Conversion role in funnel:
  - Primary bottom-funnel conversion endpoint.

## `/case-studies`

### Case studies listing
- Section goal:
  - Encourage browsing and selection of proof assets.
- Visible content blocks:
  - Heading + list of study cards.
  - Each card has color panel, tags, title, summary, arrow bubble.
- Interaction model:
  - Card hover translate up slightly.
  - Arrow bubble shifts diagonally on hover.
- Animation spec:
  - Pure CSS hover:
    - Card: `transition-transform`, `hover:-translate-y-1`
    - Arrow bubble: `group-hover:translate-x-1 group-hover:-translate-y-1`
- Conversion role in funnel:
  - Evidence exploration path.

## `/case-studies/[slug]`

### Study detail
- Section goal:
  - Deliver focused outcome proof and metrics.
- Visible content blocks:
  - Back link, hero color strip, tags, large title, summary, 3 metrics.
- Interaction model:
  - Static content display.
- Animation spec:
  - No explicit framer-motion/CSS keyframe animation in this route component.
- Conversion role in funnel:
  - Deep proof page for high-intent evaluators.

## `/changelog`

### Updates list (SimplePage wrapper)
- Section goal:
  - Product cadence and operational maturity signaling.
- Visible content blocks:
  - Eyebrow/title and update cards.
- Interaction model:
  - Static cards.
- Animation spec:
  - No explicit motion animation in component.
- Conversion role in funnel:
  - Secondary trust support for due-diligence visitors.

## `/privacy`

### Privacy text (SimplePage wrapper)
- Section goal:
  - Address data-handling concerns.
- Visible content blocks:
  - Eyebrow/title and two paragraphs.
- Interaction model:
  - Static content.
- Animation spec:
  - No explicit motion animation in component.
- Conversion role in funnel:
  - Risk-reduction support page.

---

## 3) About Us + Join Us Deep Conversion Review

## About Us (current assessment)
- Current strengths:
  - Clear plain-language positioning.
  - Values and metrics create structured readability.
  - Visual consistency with rest of site.
- Conversion gaps:
  - Metrics are unqualified (no timeframe/source/method), reducing trust impact for serious buyers.
  - Missing team proof signals (leadership credibility, domain track record, logos/certifications/security posture).
  - No direct CTA inside section to transition buyer into next action.
- Message hierarchy issues:
  - Headline is broad and generic; not anchored to business outcome or risk reduction.
  - Value cards describe principles more than buyer pain/outcome.
- CTA friction points:
  - Section has no primary conversion action, forcing user to infer next step.
- Proof/credibility gaps:
  - No explicit “why trust us now” evidence (named clients, security process, delivery model, quantified outcomes with context).

## Join Us (current assessment)
- Current strengths:
  - Clear role list and benefits; readable layout.
  - Apply CTA exists and is prominent within section.
- Conversion gaps (for B2B buyer audience):
  - This block appears before final footer and competes with lead-gen narrative.
  - Content is candidate-focused, which can dilute buyer momentum near funnel end.
- Message hierarchy issues:
  - For buyer journey, “Join Us” is currently over-weighted relative to trust/commercial close.
- CTA friction points:
  - “Apply Now” and “View Open Roles” both route to `/contact`, not a hiring workflow or job detail funnel.
- Proof/credibility gaps:
  - Roles look illustrative but not validated with requisition metadata (posting date, department lead, hiring process).

---

## 4) Claude-Ready Prompt Context (Copy/Paste)

```text
You are reviewing a live Next.js B2B AI services website (CyberArmour). Audience is B2B decision makers and optimization goal is conversion (inquiries/demos).

Use this exact architecture and behavior context (do not assume legacy pages):

ROUTES:
- / (home)
- /contact
- /case-studies
- /case-studies/[slug]
- /changelog
- /privacy

HOME ORDER:
Navbar -> Hero -> Services -> Products -> Case Studies -> Customers -> About Us -> Join Us -> Globe Footer

KEY INTERACTION + ANIMATION FACTS:
- Navbar is fixed and scroll-reactive: translucent blur after scrollY > 24. Mobile menu uses AnimatePresence with height+opacity open/close over 0.28s.
- Hero uses an interactive gravitational mesh canvas (requestAnimationFrame) that reacts to pointer and idles with autopilot motion. Headline/subhead/CTA have staged entrance motion with ~0.7-0.85s durations.
- Services is a sticky horizontal scroll section: vertical scroll progress drives rail translateX with smoothed RAF easing.
- Products has a sticky Whisper AI panel on desktop, simulated typewriter chat loop, animated marquee (36s infinite), and rotating conic border-light effects (3.8s/5.8s).
- Case studies on home are sticky stacked cards with in-view reveal motion; /case-studies index uses subtle hover lift only.
- Customers section uses CSS orbit animations: clockwise parent rotation + counter-rotating cards; hover pauses animation.
- About Us and Join Us rely on in-view fade/up reveals (no advanced interaction).
- Globe footer and contact globe are canvas-based orthographic globe animations with idle rotation and office-hover reorientation/highlight.

CONTENT CONTEXT:
- About Us: headline + paragraph, 3 value cards, 4 highlight metrics.
- Join Us: hiring-focused section with benefits and open roles, CTAs route to /contact.

Please provide:
1) A conversion-focused critique of About Us and Join Us for B2B buyer journeys.
2) Rewritten copy hierarchy (headlines, subheads, proof blocks, CTA text).
3) Structural recommendations (what to add/remove/reorder).
4) Final recommended version for both sections that balances credibility + action.
5) Any risk from keeping Join Us in current home-page position for buyer conversion.

Prioritize practical, high-impact changes that can be implemented quickly.
```

---

## 5) My Direct Recommendations (Actionable Rewrites + Structural Changes)

## A) Strategic page-flow changes
1. Keep `About Us` on homepage but make it a trust-to-action bridge, not just a brand statement.
2. Move `Join Us` lower priority for buyer funnel:
   - Option 1 (recommended): Keep on homepage but collapse to a compact “Careers strip” (1 short sentence + link).
   - Option 2: Remove full Join Us block from homepage and place full section on dedicated `/careers`.
3. Add a buyer CTA immediately after About Us: “Book a 30-minute AI assessment”.

## B) About Us rewrite (conversion-focused)
- Replace current headline:
  - From: “Building practical AI for real teams.”
  - To: “We deploy secure AI systems that cut operational drag and deliver measurable ROI.”
- Replace paragraph with outcome-first message:
  - “CyberArmour partners with leadership teams to design, deploy, and scale AI systems across operations, support, and analytics. We focus on production reliability, data governance, and measurable business outcomes, not prototype theater.”
- Replace value cards with buyer-relevant pillars:
  1. “Business-First Implementation”
     - “Every AI workflow is mapped to a KPI: cycle time, cost, throughput, or revenue impact.”
  2. “Security and Control by Default”
     - “Role-based access, deployment flexibility (on-prem/cloud), and controlled data boundaries from day one.”
  3. “Production Reliability”
     - “Monitoring, feedback loops, and optimization routines keep systems useful after launch.”
- Keep metrics row but make it auditable:
  - Add footnote text: “Representative outcomes across delivered projects; available in case study walkthroughs.”
- Add CTA cluster under metrics:
  - Primary: “Book a strategy call”
  - Secondary: “See case study outcomes” (link `/case-studies`)

## C) Join Us restructure (for buyer-first homepage)
- If kept on homepage, convert into compact strip:
  - Heading: “Building with us”
  - Copy: “We’re hiring operators, engineers, and designers who ship secure AI systems at production quality.”
  - CTA: “View Careers” -> `/careers` (or temporary `/contact?topic=careers`)
- Move full roles table off homepage into dedicated careers route.
- On careers page, improve credibility with:
  - Hiring process steps
  - Team principles
  - Real requisition metadata (posted date, level, function, location, hiring manager)

## D) CTA and anchor fixes (high priority)
- Fix footer anchor mismatch:
  - Footer currently links `#join-us`, but section id is `join`.
  - Align to one id (recommended `#join`) to prevent dead navigation.
- Add nav links for trust blocks if retained on homepage:
  - Include About and either Join/Careers.
- Ensure every major trust/proof section has a conversion exit (demo/contact/case-study deep dive).

## E) Fast implementation sequence (minimal lift, high gain)
1. Rewrite About Us copy + add CTA row.
2. Convert Join Us into compact strip or move full block to separate route.
3. Fix anchor mismatch and CTA destinations.
4. Add one proof footnote/source note under metrics.
5. Re-test scroll flow from Hero -> Services -> Products -> Case Studies -> About -> CTA.

---

## 6) Notes for Engineering Accuracy
- This brief reflects active code paths from:
  - `components/Site.tsx`
  - `components/Navbar.tsx`
  - `components/HeroSection.tsx`
  - `components/ServicesSection.tsx`
  - `components/Products.tsx`
  - `components/CaseStudiesSection.tsx`
  - `components/CustomersSection.tsx`
  - `components/AboutUsSection.tsx`
  - `components/JoinUsSection.tsx`
  - `components/Globe_Footer.tsx`
  - `components/Globe_With_Container_ContactUs_Page.tsx`
  - `app/contact/page.tsx`
  - `app/case-studies/page.tsx`
  - `app/case-studies/[slug]/page.tsx`
  - `app/changelog/page.tsx`
  - `app/privacy/page.tsx`
  - `app/globals.css`
- No assumptions were taken from `old website/`.
