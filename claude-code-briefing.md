# Claude Code Opening Briefing — Health Clinic Template

## Copy-paste dit als openingsbericht in een nieuwe Claude Code sessie

---

Ik wil een health clinic website template bouwen. Dit wordt mijn niche-template voor lokale gezondheidsklinieken in Nederland en Spanje (chiropractors, esthetische klinieken, mobility/spine clinics). De eerste instantie is "Costa Blanca Movement Centre" — een mobility/spine kliniek voor expats op de Costa Blanca, Spanje.

## Stack

- **Framework:** Astro (static site generator)
- **Styling:** Tailwind CSS
- **Hosting:** Cloudflare Pages
- **Geen:** React runtime, geen CMS, geen pagebuilder, geen zware JS

## Waarom deze stack

Ik bouw een agency die lokale klinieken helpt met organische zichtbaarheid (Google + AI-zoekmachines). De template moet pure statische HTML outputten zodat crawlers (Googlebot, GPTBot, ClaudeBot) direct content kunnen lezen. Performance < 2 seconden op mobiel. Geen client-side rendering. Geen hydration. Geen vendor lock-in.

## Design richting

- Clean medical basis met warme accentkleur (terracotta/koper als accent)
- Primaire kleuren: wit, lichtgrijs (#f8f7f5 range), donker charcoal voor tekst
- Accent: warm terracotta (#c4653a range) of koper voor CTAs en highlights
- Veel whitespace, premium feel
- Moderne typografie (Inter of vergelijkbaar voor body, serif accent voor headings)
- Subtiele scroll-animaties (fade-in, slide-up via CSS alleen, geen JS libraries)
- Sticky WhatsApp/bel knop op mobiel
- Mobile first design — desktop is de uitbreiding, niet andersom
- Moet er duidelijk beter uitzien dan een standaard WordPress template

## i18n Aanpak

De template moet vanaf dag 1 multilingual-ready zijn:

- Folder-based routing: `/en/` en `/nl/` prefixes
- Alle UI labels, buttons, navigatie uit vertaalbestanden (JSON of TS)
- SEO metadata per taal (title, description, hreflang tags)
- Taalswitch component in navigatie
- Content bestanden per taal gescheiden

Voor v1 Costa Blanca:
- **Engels: volledig uitgewerkt** (primaire taal voor expat doelgroep)
- **Nederlands: homepage + 2-3 kernpagina's** (om i18n te testen)
- Rest NL = placeholder-ready structuur

## Pagina-architectuur

### Vaste pagina's
```
/                          → Homepage (hero, trust, diensten overview, FAQ, CTA)
/about/                    → Over ons / Team (E-E-A-T: opleiding, ervaring, foto's)
/contact/                  → Contact + kaart + openingstijden
/faq/                      → Centrale FAQ pagina (citeerbaar voor AI)
/reviews/                  → Reviews overzicht + links naar Google/Zorgkaart
/privacy/                  → Privacy policy
```

### Behandelingen (template-driven)
```
/treatments/               → Overzicht alle behandelingen
/treatments/spinal-decompression/
/treatments/sports-massage/
/treatments/postural-assessment/
/treatments/dry-needling/
```

### Klachten/condities (template-driven)
```
/conditions/               → Overzicht alle klachten
/conditions/lower-back-pain/
/conditions/neck-pain/
/conditions/sciatica/
/conditions/herniated-disc/
```

### Locatie (multi-location ready)
```
/locations/                → Overzicht alle locaties + service area kaart
/locations/altea/          → Primaire locatie (volledig uitgewerkt: kaart, route, uren, NAP)
/locations/benidorm/       → Service area pagina (licht: intro, kaart, CTA)
/locations/javea/          → Service area pagina (licht: intro, kaart, CTA)
/locations/denia/          → Service area pagina (licht: intro, kaart, CTA)
```

### Nederlandse variant
```
/nl/                       → NL homepage
/nl/behandelingen/         → NL behandelingen overzicht
/nl/behandelingen/wervelkolom-decompressie/
/nl/klachten/              → NL klachten overzicht
/nl/klachten/lage-rugpijn/
/nl/locaties/altea/
/nl/locaties/benidorm/
/nl/locaties/javea/
/nl/locaties/denia/
/nl/contact/
/nl/faq/
```

## Component Blokken (herbruikbaar per klant)

Bouw deze als losse Astro componenten:

1. **HeroSection** — full-width, gradient overlay, heading + subheading + CTA
2. **TrustBar** — logo's, certificeringen, "X jaar ervaring" badges
3. **ServicesGrid** — kaarten met icoon, titel, korte tekst, link
4. **FAQAccordion** — vraag-antwoord, schema-ready (FAQ structured data)
5. **TestimonialSlider** — reviews met naam, sterren, bron
6. **CTABand** — full-width call-to-action met contrast achtergrond
7. **TeamSection** — foto, naam, functie, opleiding (E-E-A-T)
8. **LocationCard** — adres, kaart embed, openingstijden, telefoon
9. **BreadcrumbNav** — automatische breadcrumbs op elke pagina
10. **StickyMobileCTA** — vaste WhatsApp + bel knop onderaan mobiel
11. **DefinitionBlock** — "Wat is [behandeling]?" blok voor citability
12. **RelatedConditions** — links naar gerelateerde klachten vanuit behandeling
13. **RelatedTreatments** — links naar behandelingen vanuit klachtpagina
14. **ReviewCTA** — "Deel je ervaring" blok op elke behandelingspagina

## SEO/GEO Vereisten (niet-onderhandelbaar)

### Schema markup (JSON-LD in head)
- `LocalBusiness` op elke pagina
- `MedicalBusiness` op homepage
- `FAQPage` op FAQ pagina en elke pagina met FAQ sectie
- `MedicalCondition` op klachtpagina's
- `Service` op behandelingspagina's
- `BreadcrumbList` automatisch

### Technische bestanden
- `robots.txt` — correct, geen blokkering van AI crawlers, expliciete allow voor GPTBot/ClaudeBot/PerplexityBot
- `llms.txt` — gestructureerde beschrijving van de praktijk voor AI systemen
- `sitemap.xml` — automatisch gegenereerd, alle talen, lastmod dates
- Canonical tags op elke pagina
- Hreflang tags voor EN/NL varianten
- Open Graph + Twitter Card meta tags

### Content structuur voor citability
- Elke behandelingspagina begint met een definitieblok ("Wat is X?")
- Elke klachtpagina heeft symptomen, oorzaken, behandelopties
- FAQ secties met directe vraag-antwoord structuur
- Korte paragrafen (max 3-4 zinnen)
- Duidelijke H2/H3 hiërarchie

## Event Tracking Architecture

Build a lightweight, centralized analytics abstraction from day 1. Do NOT hardcode GA4/gtag calls across components. Create a reusable tracking utility.

### Core tracking utility: `src/lib/analytics.ts`
```typescript
// Central event dispatcher — all tracking goes through here
// Supports GA4 now, swappable to Plausible/PostHog later
// Must be environment-configurable (dev = console.log, prod = real tracking)
// Must not affect performance when disabled

trackEvent(name: string, properties: EventProperties)

interface EventProperties {
  page_type: string;       // 'homepage' | 'treatment' | 'condition' | 'location' | 'faq' | 'dashboard'
  page_slug: string;       // current page slug
  locale: string;          // 'en' | 'nl'
  cta_location?: string;   // 'hero' | 'sticky_mobile' | 'inline' | 'footer' | 'sidebar'
}
```

### Standard events (build into every template):
**Conversion events:**
- `phone_click` — tel: link clicks
- `whatsapp_click` — WhatsApp CTA clicks
- `form_submit` — contact form submissions
- `appointment_click` — booking/appointment CTA
- `route_click` — Google Maps directions click

**Engagement events:**
- `faq_expand` — FAQ accordion open
- `review_cta_click` — "Leave a review" click
- `treatment_cta_click` — CTA on treatment page
- `language_switch` — locale change

### Implementation rules:
- Every CTA component (buttons, links, sticky bar) must accept an `eventName` and `ctaLocation` prop
- StickyMobileCTA, CTABand, ReviewCTA must have tracking built-in
- Contact form must fire `form_submit` with page context
- Tracking must be optional — site works 100% without any analytics loaded
- GA4 measurement ID in `src/data/site.ts` alongside other config

## Visibility Dashboard (Client Report Page)

Build a static visibility dashboard at `/visibility` (noindex, nofollow). This is NOT a live analytics tool — it reads from a static JSON file that I update manually before client meetings.

### Dashboard page: `/visibility`
- Uses `DashboardLayout.astro`
- Reads all data from `src/data/client-report.json`
- No authentication, no API calls, no database
- Clean, professional design consistent with rest of site
- Mobile responsive

### Dashboard components:
1. **ScoreCard** — large number + label + trend arrow (up/down/stable) + color (green/orange/red)
2. **ScoreRow** — horizontal row of 3-4 ScoreCards (Layer 1, Layer 2, Layer 3, Overall)
3. **TrendList** — simple list with date + value pairs (e.g., monthly organic clicks)
4. **EventSummary** — this month's conversion events in card format
5. **ActionLog** — list of completed actions with date and description
6. **PriorityList** — next focus items with status indicator
7. **ReviewSummary** — current review count, average rating, new this month

### Data source: `src/data/client-report.json`
```json
{
  "lastUpdated": "2026-03-12",
  "period": "March 2026",
  "scores": {
    "overall": { "value": 72, "previousValue": 58, "status": "improving" },
    "layer1_technical": { "value": 89, "previousValue": 41, "status": "strong" },
    "layer2_citability": { "value": 67, "previousValue": 38, "status": "improving" },
    "layer3_authority": { "value": 35, "previousValue": 22, "status": "building" }
  },
  "traffic": {
    "organicClicks": [
      { "month": "2026-01", "value": 45 },
      { "month": "2026-02", "value": 128 },
      { "month": "2026-03", "value": 210 }
    ]
  },
  "events": {
    "period": "2026-03",
    "phone_clicks": 12,
    "whatsapp_clicks": 8,
    "form_submits": 5,
    "route_clicks": 15
  },
  "reviews": {
    "total": 23,
    "averageRating": 4.7,
    "newThisMonth": 3,
    "source": "Google"
  },
  "actionsCompleted": [
    { "date": "2026-03-01", "action": "Published: Lower Back Pain treatment page" },
    { "date": "2026-03-05", "action": "Added FAQ section to 3 treatment pages" },
    { "date": "2026-03-08", "action": "GBP: weekly post + 4 new photos" },
    { "date": "2026-03-10", "action": "New citation: Zorgkaart Nederland" }
  ],
  "nextPriorities": [
    { "priority": "Add 2 new condition pages (sciatica, neck pain)", "status": "planned" },
    { "priority": "Review velocity: target 4 new reviews this month", "status": "in_progress" },
    { "priority": "Submit to 3 local directories", "status": "planned" }
  ]
}
```

### Dashboard design rules:
- Same design system as rest of site (same colors, fonts, spacing)
- ScoreCards use accent color for positive trends, muted for stable, subtle red for negative
- No chart libraries — use simple CSS bar charts or just numbers with trend arrows
- Print-friendly (client might screenshot or print)
- Add `<meta name="robots" content="noindex, nofollow">` — this page is not for search engines

## Hard Architecture Requirements

These are non-negotiable rules. Every component and page must follow these:

### Semantic HTML
- Exactly 1 `<h1>` per page
- `<h2>` and `<h3>` logically nested (never skip levels)
- Use `<section>`, `<article>`, `<nav>`, `<main>`, `<aside>` — no div soup
- Lists as real `<ul>`/`<ol>`, not styled divs
- FAQ as real question + answer structure

### Content rules
- All critical content in static HTML — nothing hidden behind JS
- FAQ accordions use `<details>`/`<summary>` (visible to crawlers when closed)
- No content in tabs/modals that crawlers can't see
- Every page has one clear entity/topic — no mixed-purpose pages
- Minimum content per page: definition block + main content + FAQ + CTA

### Internal linking (built into templates, not afterthought)
- Treatment pages auto-link to: related conditions, FAQ, contact, reviews, team
- Condition pages auto-link to: related treatments, FAQ, contact, location
- Breadcrumbs on every page except homepage
- "Related" blocks are part of page templates, not optional add-ons

### NAP Consistency
- Business name, address, phone, hours stored ONCE in `src/data/site.ts`
- Every component that shows contact info reads from this single source
- No hardcoded phone numbers or addresses anywhere in templates

### Image rules
- Astro Image component for optimization (WebP/AVIF output)
- Always set width + height (no layout shift)
- Meaningful alt text (not "image1.jpg")
- Lazy loading below the fold
- Hero images: max 400KB compressed, responsive srcset

### Performance budget
- No JavaScript libraries unless absolutely required
- Zero layout shift (CLS = 0)
- Fonts: self-hosted, preloaded, with font-display: swap
- No third-party scripts in initial load
- Target: Lighthouse 95+ on mobile

## Process Rule — IMPORTANT

Before writing any code, first propose and present for my approval:
1. Folder structure
2. Content model (frontmatter fields for treatments + conditions)
3. Component list with props
4. SEO metadata model
5. Schema strategy (which types on which pages)
6. Event tracking architecture
7. i18n structure
8. Dashboard data model

Wait for my approval before building. Do not start coding until architecture is confirmed.

## Mappenstructuur

```
costa-blanca-movement/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── robots.txt
│   ├── llms.txt
│   ├── favicon.svg
│   └── images/
│       ├── hero/
│       ├── team/
│       ├── treatments/
│       └── og/
├── src/
│   ├── components/
│   │   ├── HeroSection.astro
│   │   ├── TrustBar.astro
│   │   ├── ServicesGrid.astro
│   │   ├── FAQAccordion.astro
│   │   ├── TestimonialSlider.astro
│   │   ├── CTABand.astro
│   │   ├── TeamSection.astro
│   │   ├── LocationCard.astro
│   │   ├── BreadcrumbNav.astro
│   │   ├── StickyMobileCTA.astro
│   │   ├── DefinitionBlock.astro
│   │   ├── RelatedConditions.astro
│   │   ├── RelatedTreatments.astro
│   │   ├── ReviewCTA.astro
│   │   ├── dashboard/
│   │   │   ├── ScoreCard.astro
│   │   │   ├── ScoreRow.astro
│   │   │   ├── TrendList.astro
│   │   │   ├── EventSummary.astro
│   │   │   ├── ActionLog.astro
│   │   │   ├── PriorityList.astro
│   │   │   └── ReviewSummary.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── SEOHead.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro        ← HTML shell, head, header, footer
│   │   ├── TreatmentLayout.astro   ← template voor behandelingspagina's
│   │   ├── ConditionLayout.astro   ← template voor klachtpagina's
│   │   └── DashboardLayout.astro   ← visibility dashboard (noindex)
│   ├── content/
│   │   ├── treatments/
│   │   │   ├── en/
│   │   │   │   ├── spinal-decompression.md
│   │   │   │   ├── sports-massage.md
│   │   │   │   └── ...
│   │   │   └── nl/
│   │   │       ├── wervelkolom-decompressie.md
│   │   │       └── ...
│   │   ├── conditions/
│   │   │   ├── en/
│   │   │   │   ├── lower-back-pain.md
│   │   │   │   └── ...
│   │   │   └── nl/
│   │   │       ├── lage-rugpijn.md
│   │   │       └── ...
│   │   └── faq/
│   │       ├── en.json
│   │       └── nl.json
│   ├── i18n/
│   │   ├── ui.ts               ← UI labels, buttons, navigatie per taal
│   │   ├── en.json
│   │   ├── nl.json
│   │   └── utils.ts            ← getLocale(), t() helper functies
│   ├── data/
│   │   ├── site.ts             ← praktijknaam, adres, telefoon, socials
│   │   ├── navigation.ts       ← menu structuur per taal
│   │   ├── schema.ts           ← JSON-LD generators
│   │   └── client-report.json  ← dashboard data (handmatig bijgewerkt)
│   ├── lib/
│   │   └── analytics.ts        ← centrale trackEvent() utility
│   ├── pages/
│   │   ├── index.astro         ← EN homepage
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   ├── reviews.astro
│   │   ├── privacy.astro
│   │   ├── visibility.astro    ← client dashboard (noindex, nofollow)
│   │   ├── treatments/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro  ← dynamic route vanuit content/
│   │   ├── conditions/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── locations/
│   │   │   ├── index.astro
│   │   │   ├── altea.astro         ← volledig uitgewerkt (primary location)
│   │   │   ├── benidorm.astro      ← service area (licht)
│   │   │   ├── javea.astro         ← service area (licht)
│   │   │   └── denia.astro         ← service area (licht)
│   │   └── nl/
│   │       ├── index.astro     ← NL homepage
│   │       ├── contact.astro
│   │       ├── faq.astro
│   │       ├── behandelingen/
│   │       │   ├── index.astro
│   │       │   └── [...slug].astro
│   │       ├── klachten/
│   │       │   ├── index.astro
│   │       │   └── [...slug].astro
│   │       └── locaties/
│   │           ├── altea.astro
│   │           ├── benidorm.astro
│   │           ├── javea.astro
│   │           └── denia.astro
│   └── styles/
│       └── global.css          ← Tailwind imports + custom properties
└── CLAUDE.md                   ← instructies voor toekomstige Claude sessies
```

## CLAUDE.md bestand

Maak een CLAUDE.md in de root met:
- Korte beschrijving van het project en de stack
- Design tokens (kleuren, fonts, spacing)
- Component conventies (naming, props)
- Content toevoegen instructies (hoe een nieuwe behandeling/klacht toevoegen)
- Deploy instructies (Cloudflare Pages)
- i18n regels (hoe vertaling toevoegen)

Dit bestand is de SOP voor toekomstige Claude Code sessies en voor freelancers.

## Bouw volgorde

0. **Architecture proposal** — Present folder structure, content model, component list, SEO model, tracking architecture, i18n structure, dashboard data model. WAIT FOR APPROVAL.
1. **Project setup** — Astro + Tailwind + config + mappenstructuur
2. **BaseLayout + Header + Footer + SEOHead** — de shell
3. **Analytics utility** — `src/lib/analytics.ts` + trackEvent wrapper
4. **Homepage EN** — alle component blokken, tracking op CTAs
5. **TreatmentLayout + 2 behandelingspagina's EN**
6. **ConditionLayout + 2 klachtpagina's EN**
7. **FAQ pagina**
8. **About + Contact + Reviews pagina's**
9. **Location pagina's** — Altea volledig, Benidorm/Jávea/Dénia als lichte service area pagina's + locations overview

**Location page variants:**
- **Full location (Altea):** complete NAP, kaart met pin, openingstijden, routebeschrijving, parkeerinfo, behandelingen beschikbaar op deze locatie, team op locatie, LocalBusiness schema
- **Service area (Benidorm, Jávea, Dénia):** korte intro over de regio + expat community, kaart met service area markering, afstand vanuit Altea, beschikbare behandelingen, CTA ("Maak een afspraak in onze kliniek in Altea"), LocalBusiness schema met serviceArea
10. **Schema markup op alle pagina's**
11. **robots.txt + llms.txt + sitemap**
12. **i18n setup + NL homepage + 2 NL pagina's**
13. **StickyMobileCTA + LanguageSwitcher** (met tracking)
14. **Visibility Dashboard** — DashboardLayout + components + sample JSON data
15. **CLAUDE.md schrijven** (inclusief: hoe dashboard data updaten, hoe tracking events werken)
16. **Review, test, fix** — Lighthouse audit, semantic HTML check, schema validation

## Belangrijke regels

- Geen JavaScript libraries importeren tenzij absoluut nodig
- Geen client-side rendering — alles moet werken zonder JS
- FAQ accordions: gebruik HTML details/summary, geen JS
- Scroll animaties: CSS only (IntersectionObserver mag als progressive enhancement)
- Afbeeldingen: gebruik Astro Image component voor optimalisatie
- Fonts: self-hosted, geen Google Fonts CDN calls
- Alle content in markdown/JSON, nooit hardcoded in componenten
- Mobile first: schrijf eerst mobiel, dan `md:` en `lg:` breakpoints

## Placeholder content

Gebruik realistische placeholder content voor Costa Blanca Movement Centre:
- Praktijknaam: Costa Blanca Movement Centre
- Locatie: Altea, Costa Blanca, Spanje
- Doelgroep: Nederlandse en Engelstalige expats
- Focus: mobility, spine health, sports rehabilitation
- Team: Dr. [Naam] — Chiropractor/Movement Specialist (placeholder)
- Telefoon: +34 XXX XXX XXX (placeholder)
- Openingstijden: Ma-Vr 9:00-18:00, Za 9:00-13:00

Begin met stap 1 en werk sequentieel door de bouwvolgorde. Laat me na elke grote stap weten wat er staat en wat de volgende stap is.
