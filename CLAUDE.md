# Costa Blanca Movement Centre — Website Template

## Project Overview

Health clinic website template built with Astro + Tailwind CSS, optimized for SEO and AI visibility.
First instance: Costa Blanca Movement Centre — mobility/spine clinic for expats in Altea, Spain.

**Stack:** Astro 5, Tailwind CSS 3, Cloudflare Pages
**Hard rules:** No React, no client-side rendering, no hydration, no CMS, no heavy JS

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production (output: dist/)
npm run preview  # Preview production build
```

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FDFCFA` | Page background (warm white) |
| `--color-bg-alt` | `#F5F3EF` | Alternate sections |
| `--color-text` | `#2D2A26` | Body text |
| `--color-text-muted` | `#6B6560` | Secondary text |
| `--color-accent` | `#C4653A` | CTAs, links, highlights (terracotta) |
| `--color-accent-dark` | `#A8532E` | Hover states |
| `--color-accent-light` | `#F0DDD4` | Accent backgrounds |
| `--color-border` | `#E8E4DF` | Borders, dividers |

**Fonts:** DM Serif Display (headings), Inter (body) — self-hosted via @fontsource
**Radius:** Cards `rounded-xl`, Buttons `rounded-lg`, Images `rounded-2xl`
**Spacing:** Sections `py-16 md:py-24 lg:py-32`, Container `max-w-7xl mx-auto px-4 md:px-6`

## Component Conventions

- All components are pure `.astro` files — no framework components
- Props typed with TypeScript interfaces at top of frontmatter
- Contact/NAP data always from `src/data/site.ts` — never hardcode addresses or phone numbers
- CTAs accept `eventName` and `ctaLocation` props for analytics tracking
- Mobile first: write mobile styles first, then `md:` and `lg:` breakpoints
- FAQ sections use `<details>`/`<summary>` — no JavaScript
- Semantic HTML: one `<h1>` per page, logical heading hierarchy, `<section>`, `<nav>`, `<main>`
- Scroll animations: CSS only (`animate-fade-in`, `animate-slide-up`)

## Adding a New Treatment Page

1. Create `src/content/treatments/en/your-treatment.md`
2. Copy frontmatter structure from an existing treatment file
3. Required fields: `title`, `pageSlug`, `lang`, `metaTitle`, `metaDescription`, `definition`, `duration`, `relatedConditions`, `faq`
4. For NL version: create in `src/content/treatments/nl/` with `translationSlug` pointing to EN pageSlug
5. **Important:** Use `pageSlug` (not `slug`) in frontmatter — `slug` is reserved by Astro. If EN and NL share the same slug value (e.g. "dry-needling"), use a different filename for the NL file to avoid Astro duplicate id errors.
5. Add to `src/data/navigation.ts` menu entries
6. Add slug mapping to `src/i18n/routes.ts`

## Adding a New Condition Page

Same process as treatments, but in `src/content/conditions/`.
Extra required fields: `symptoms`, `causes`, `whenToSeekHelp`, `relatedTreatments`.

## i18n Rules

- EN = root URLs (`/treatments/spinal-decompression`)
- NL = `/nl/` prefix with translated segments (`/nl/behandelingen/wervelkolom-decompressie`)
- UI strings: `src/i18n/ui.ts` (single source, no duplicate JSON files)
- URL segment mappings: `src/i18n/routes.ts`
- Helper functions: `t('key', locale)` for translations, `getTranslatedPath()` for URL translation
- Every content file has a `lang` field in frontmatter
- Every page needs hreflang tags when a translation exists

## Event Tracking

- Central utility: `src/lib/analytics.ts`
- Events fire via `onclick="trackEvent('event_name', {...})"` on elements
- Dev mode: logs to console. Prod: sends to GA4 via `gtag()`
- GA4 measurement ID configured in `src/data/site.ts` (`ga4MeasurementId`)
- Site works 100% without GA4 loaded — `trackEvent` is a silent no-op
- Event naming convention: `{action}_{object}` (e.g., `phone_click`, `form_submit`, `faq_expand`)

## Schema Markup (JSON-LD)

Generated via `src/data/schema.ts`. Each page type gets specific schemas:

| Page | Schemas |
|---|---|
| Every page | `LocalBusiness` + `BreadcrumbList` |
| Homepage | `MedicalBusiness` (with full NAP) + `FAQPage` |
| Treatment | `Service` + `FAQPage` |
| Condition | `MedicalCondition` + `FAQPage` |
| FAQ page | `FAQPage` |
| About/Team | `Person` per team member |
| Location (full) | `LocalBusiness` with full NAP |
| Location (service area) | `LocalBusiness` with `areaServed` |

## Visibility Dashboard

- URL: `/visibility` (noindex, nofollow)
- Data source: `src/data/client-report.json` (manually updated before client meetings)
- No API calls, no auth, no database — pure static page
- Uses same design system as rest of site

## Deploy (Cloudflare Pages)

1. Connect GitHub repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node version: 18+

## Adapting for a New Client

1. `src/data/site.ts` — name, address, phone, team, opening hours
2. `tailwind.config.mjs` — accent color if different from terracotta
3. `src/content/` — new markdown files per treatment/condition
4. `public/images/` — new photos
5. `src/data/client-report.json` — dashboard data for this client
6. Deploy to new Cloudflare Pages project
