# Costa Blanca Movement Centre — Website Template

## Project Overview

Health clinic website template built with Astro + Tailwind CSS, optimized for SEO and AI visibility.
First instance: Costa Blanca Movement Centre — mobility/spine clinic for expats in Torrevieja, Spain.

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

## Languages parity check (BLOCKING for new sections/pages)

**Rule:** every new section, component, or page MUST be added to BOTH locales in the same change. NL must remain visually + structurally identical to EN — only the text translated.

When adding a new section to a page:
- [ ] Add to the EN page
- [ ] Add the same section, in the same position, with the same image/component props, to the NL counterpart
- [ ] Translate all visible strings (title, body, CTA labels, alt text)
- [ ] Verify section order matches EN exactly
- [ ] Reuse the same images from `public/images/` (do not duplicate)

When adding a new page:
- [ ] Create EN page at `/some-path/`
- [ ] Create NL page at `/nl/<translated-segment>/` — see `src/i18n/routes.ts`
- [ ] Both pages set hreflang pairs pointing at each other
- [ ] Add route segment mapping to `src/i18n/routes.ts` if new
- [ ] Update `src/data/navigation.ts` for both locales
- [ ] Update `src/i18n/ui.ts` if new visible UI strings

**Quick parity check before committing:**
```bash
# Compare line counts of paired pages — large diffs flag missing sections
for f in $(ls src/pages/*.astro src/pages/**/*.astro | grep -v '^src/pages/nl/'); do
  nl=$(echo "$f" | sed 's|src/pages/|src/pages/nl/|;s|treatments|behandelingen|;s|conditions|klachten|;s|locations|locaties|;s|guides|gidsen|;s|about|over-ons|')
  if [ -f "$nl" ]; then
    en_lines=$(wc -l < "$f"); nl_lines=$(wc -l < "$nl")
    diff=$((en_lines > nl_lines ? en_lines - nl_lines : nl_lines - en_lines))
    [ $diff -gt 20 ] && echo "DIFF $diff: $f vs $nl"
  fi
done
```

**Why this matters:** the meertalige propositie is core to the sales pitch. A NL site that's visibly thinner than EN undermines the "full multilingual support" claim.

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

## Per-client checklist before going live

All template placeholders live in **`src/data/site.ts`**. Replace these before launching:

### Identity & branding
- [ ] `name` — full legal/brand name (also used in schema, footer, page titles)
- [ ] `shortName` — compact form used in `<title>` tags (keep ≤22 chars to fit ≤60-char title limit)
- [ ] `tagline` — one-line description, used in MedicalBusiness schema and footer
- [ ] `url` — production URL **without trailing slash** — cruciaal voor canonicals, hreflang, sitemap, OG tags

### Contact & NAP (single source of truth)
- [ ] `phone` — E.164 format for `tel:` links (`+34XXXXXXXXX`)
- [ ] `phoneDisplay` — pretty format for UI (`+34 XXX XXX XXX`)
- [ ] `email` — primary contact address
- [ ] `whatsappNumber` + `whatsappUrl` — WhatsApp click-to-chat
- [ ] `address` — street, city, province, postal, country, countryCode
- [ ] `geo.latitude` / `geo.longitude` — for LocalBusiness schema + map embeds
- [ ] `googleMapsUrl` / `googleMapsEmbed` — directions link + iframe embed src

### Hours
- [ ] `openingHours` — display format for footer/contact
- [ ] `openingHoursSpecification` — Schema.org format (must match `openingHours`)

### Social profiles → fed into Footer + schema `sameAs`
- [ ] `socials.google` — Google Business Profile URL (also used as review link)
- [ ] `socials.instagram` / `facebook` / `linkedin` / `youtube` — empty string = hidden

### Analytics — per client. Empty string disables the feature.
- [ ] `analytics.ga4MeasurementId` — `G-XXXXXXXXXX` (from analytics.google.com → Admin → Data Streams)
- [ ] `analytics.gscVerificationId` — content value from the `<meta name="google-site-verification">` tag (Google Search Console → Settings → Ownership verification → HTML tag method)

### Service areas, team & content
- [ ] `serviceAreas` — primary location + nearby towns (with drive times)
- [ ] `team` — names, roles, bio, qualifications. `image: ''` falls back to CSS initials avatar.
- [ ] `src/content/treatments|conditions|guides/` — replace markdown files
- [ ] `public/images/` — hero, treatments, atmosphere, clinic, og/default.jpg
- [ ] `src/data/client-report.json` — visibility dashboard data

### Per-page SEO limits enforced in template
- Title: max 60 chars (use `siteConfig.shortName` in templates, not `siteConfig.name`)
- Meta description: max 150 chars
- Hreflang: self-referential per locale + `x-default` automatically added by `SEOHead.astro`
- Canonical URL on every page (set via `BaseLayout` prop)
