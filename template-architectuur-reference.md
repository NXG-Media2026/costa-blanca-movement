# Template Architectuur — Quick Reference

## Referentiedoc om open te houden naast Claude Code

---

## Design Tokens

```
Kleuren:
  --color-bg:          #FDFCFA    (warm wit)
  --color-bg-alt:      #F5F3EF    (lichtgrijs warm)
  --color-text:        #2D2A26    (donker charcoal)
  --color-text-muted:  #6B6560    (subtiele tekst)
  --color-accent:      #C4653A    (terracotta)
  --color-accent-dark: #A8532E    (hover state)
  --color-accent-light:#F0DDD4    (accent achtergrond)
  --color-border:      #E8E4DF    (subtiele lijnen)
  --color-white:       #FFFFFF

Typografie:
  Headings:  DM Serif Display (of Playfair Display) — serif, warm, premium
  Body:      Inter (of DM Sans) — clean, modern, leesbaar
  Sizes:     mobile-first, fluid scaling via clamp()

Spacing:
  Section padding:  py-16 md:py-24 lg:py-32
  Container:        max-w-7xl mx-auto px-4 md:px-6
  Component gap:    space-y-12 md:space-y-16

Radius:
  Cards:     rounded-xl (12px)
  Buttons:   rounded-lg (8px)
  Images:    rounded-2xl (16px)
```

## Component Structuur per Pagina

### Homepage
```
HeroSection          → full-width, gradient overlay, H1 + tagline + CTA
TrustBar             → "X jaar ervaring" | "Y+ patiënten" | certificeringen
ServicesGrid         → 4-6 behandelingen als kaarten met link
DefinitionBlock      → "Wat doen wij?" korte uitleg (citeerbaar)
TestimonialSlider    → 3 reviews
FAQAccordion         → 5-6 meest gestelde vragen (FAQ schema)
CTABand              → "Maak een afspraak" full-width
```

### Behandelingspagina (template)
```
BreadcrumbNav        → Home > Treatments > [Behandeling]
H1                   → Behandelingsnaam
DefinitionBlock      → "Wat is [behandeling]?"
Content              → Hoe werkt het, voor wie, wat verwachten
FAQAccordion         → 3-4 behandeling-specifieke vragen
RelatedConditions    → "Helpt bij: rugpijn, nekklachten, ..."
ReviewCTA            → "Heeft deze behandeling je geholpen?"
CTABand              → Afspraak maken
```

### Klachtpagina (template)
```
BreadcrumbNav        → Home > Conditions > [Klacht]
H1                   → Klachtnaam
DefinitionBlock      → "Wat is [klacht]?"
Content              → Symptomen, oorzaken, wanneer hulp zoeken
RelatedTreatments    → "Behandelingen voor [klacht]"
FAQAccordion         → 3-4 klacht-specifieke vragen
ReviewCTA            → "Herken je deze klachten?"
CTABand              → Afspraak maken
```

### Visibility Dashboard
```
DashboardHeader      → Praktijknaam + "Laatst bijgewerkt: [datum]"
ScoreRow             → 4 ScoreCards: Overall, Layer 1, Layer 2, Layer 3
TrendList            → Organisch verkeer per maand (CSS bars, geen chart lib)
EventSummary         → Conversie-events deze maand (bellen, WhatsApp, formulier)
ReviewSummary        → Totaal, gemiddeld, nieuw deze maand
ActionLog            → Uitgevoerde acties met datum
PriorityList         → Volgende focus met status (planned/in_progress/done)
```

## Schema Markup Checklist

| Pagina | Schema types |
|--------|-------------|
| Elke pagina | LocalBusiness, BreadcrumbList |
| Homepage | + MedicalBusiness |
| Behandeling | + Service, FAQPage |
| Klacht | + MedicalCondition, FAQPage |
| FAQ | + FAQPage |
| About/Team | + Person (per teamlid) |
| Locatie | + Place |

## URL Regels

- Geen trailing slashes (Astro config: trailingSlash: 'never')
- Lowercase alleen
- Hyphens, geen underscores
- Maximaal 3 niveaus diep
- EN = root (/treatments/), NL = /nl/ prefix (/nl/behandelingen/)

## Content Model — Behandeling Markdown

```markdown
---
title: "Spinal Decompression"
slug: "spinal-decompression"
lang: "en"
nlSlug: "wervelkolom-decompressie"          # link naar NL variant
metaTitle: "Spinal Decompression Therapy | Costa Blanca Movement Centre"
metaDescription: "Non-surgical spinal decompression..."
definition: "Spinal decompression is a non-surgical treatment..."
duration: "30-45 minutes"
price: "From €65"
relatedConditions: ["lower-back-pain", "herniated-disc", "sciatica"]
faq:
  - q: "Is spinal decompression painful?"
    a: "Most patients experience no pain..."
  - q: "How many sessions do I need?"
    a: "Typically 6-12 sessions..."
---

## How Does Spinal Decompression Work?

[Long-form content hier]

## What to Expect During Treatment

[Content]
```

## Content Model — Klacht Markdown

```markdown
---
title: "Lower Back Pain"
slug: "lower-back-pain"
lang: "en"
nlSlug: "lage-rugpijn"
metaTitle: "Lower Back Pain Treatment | Costa Blanca Movement Centre"
metaDescription: "Effective treatment for lower back pain..."
definition: "Lower back pain affects the lumbar region..."
symptoms: ["Stiffness in the morning", "Pain when bending", "Radiating pain to legs"]
causes: ["Poor posture", "Sedentary lifestyle", "Disc problems"]
relatedTreatments: ["spinal-decompression", "sports-massage", "dry-needling"]
faq:
  - q: "When should I see a specialist for back pain?"
    a: "If pain persists for more than..."
---

## Understanding Lower Back Pain

[Long-form content]
```

## i18n Structuur

```typescript
// src/i18n/ui.ts
export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.treatments': 'Treatments',
    'nav.conditions': 'Conditions',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    'cta.book': 'Book Appointment',
    'cta.call': 'Call Us',
    'cta.whatsapp': 'WhatsApp',
    'review.cta': 'Share Your Experience',
    'breadcrumb.home': 'Home',
  },
  nl: {
    'nav.home': 'Home',
    'nav.treatments': 'Behandelingen',
    'nav.conditions': 'Klachten',
    'nav.about': 'Over Ons',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    'cta.book': 'Afspraak Maken',
    'cta.call': 'Bel Ons',
    'cta.whatsapp': 'WhatsApp',
    'review.cta': 'Deel Je Ervaring',
    'breadcrumb.home': 'Home',
  }
} as const;
```

## Klant-naar-klant Aanpassing

Bij nieuwe klant verander je:
1. `src/data/site.ts` — naam, adres, telefoon, kleuren
2. `src/content/` — nieuwe markdown bestanden per behandeling/klacht
3. `public/images/` — nieuwe foto's
4. `tailwind.config.mjs` — accent kleur aanpassen
5. `src/data/client-report.json` — dashboard data voor deze klant
6. Deploy naar nieuw Cloudflare Pages project

Componenten, layouts en structuur blijven identiek.

## Visibility Dashboard — Wireframe

```
┌─────────────────────────────────────────────────────┐
│  VISIBILITY DASHBOARD           Laatst bijgewerkt:  │
│  Costa Blanca Movement Centre   12 maart 2026       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ OVERALL  │ │ TECHNIEK │ │ CITEER-  │ │ AUTO-  │ │
│  │   72 ▲   │ │   89 ●   │ │ BAARHEID │ │ RITEIT │ │
│  │  was: 58 │ │  was: 41 │ │   67 ▲   │ │  35 ▲  │ │
│  │          │ │          │ │  was: 38 │ │ was:22 │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                     │
│  ORGANISCH VERKEER                                  │
│  ████░░░░░░░░░░░  Jan: 45                           │
│  ████████░░░░░░░  Feb: 128                          │
│  ████████████░░░  Mar: 210                          │
│                                                     │
│  CONVERSIES DEZE MAAND                              │
│  ┌────────────┐ ┌────────────┐ ┌─────────────────┐  │
│  │ 📞 12     │ │ 💬 8      │ │ 📧 5 formulier │  │
│  │ belletjes  │ │ WhatsApp   │ │ aanvragen       │  │
│  └────────────┘ └────────────┘ └─────────────────┘  │
│                                                     │
│  REVIEWS                                            │
│  ★★★★★ 4.7 gemiddeld | 23 totaal | +3 deze maand  │
│                                                     │
│  ✅ UITGEVOERDE ACTIES                              │
│  • 1 mrt  — Nieuwe behandelpagina: lage rugpijn     │
│  • 5 mrt  — FAQ toegevoegd aan 3 pagina's           │
│  • 8 mrt  — GBP: weekpost + 4 foto's               │
│  • 10 mrt — Nieuwe vermelding: Zorgkaart NL         │
│                                                     │
│  🎯 VOLGENDE FOCUS                                  │
│  ○ 2 nieuwe klachtpagina's (ischias, nekpijn)       │
│  ◐ Review target: 4 nieuwe reviews deze maand       │
│  ○ 3 lokale directory vermeldingen                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Event Tracking — Quick Reference

### Naming convention
```
{action}_{object}
phone_click, form_submit, faq_expand, language_switch
```

### Context properties (meesturen met elk event)
```
page_type:     homepage | treatment | condition | location | faq | reviews | dashboard
page_slug:     current-page-slug
locale:        en | nl
cta_location:  hero | sticky_mobile | inline | footer | sidebar | treatment_bottom
```

### Welke events op welke pagina
| Pagina | Events |
|--------|--------|
| Alle pagina's | phone_click, whatsapp_click (via sticky CTA) |
| Homepage | treatment_cta_click, faq_expand |
| Behandeling | appointment_click, faq_expand, review_cta_click |
| Klacht | treatment_cta_click, faq_expand |
| Contact | form_submit, route_click |
| Locatie | route_click, phone_click |
| Reviews | review_cta_click |

### Analytics utility usage in components
```astro
---
// In any component with a CTA:
import { trackEvent } from '../lib/analytics';
---
<a href="tel:+34XXXXXXXXX"
   onclick="trackEvent('phone_click', {
     page_type: '{pageType}',
     page_slug: '{slug}',
     locale: '{locale}',
     cta_location: 'sticky_mobile'
   })">
  Call Us
</a>
```
