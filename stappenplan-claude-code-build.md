# Stappenplan: Health Clinic Template Bouwen met Claude Code

## Van nul tot werkende site — alles wat je moet doen, waar, en in welke volgorde

---

## FASE 0 — Voorbereiding (op je eigen machine, vóór Claude Code)

### Stap 0.1 — Installeer de tools
**Waar:** Terminal op je Mac/PC

```bash
# Node.js (als je het nog niet hebt) — versie 18+
node --version

# Als niet geïnstalleerd: https://nodejs.org/

# Claude Code CLI installeren
npm install -g @anthropic-ai/claude-code

# Git (zou al moeten staan)
git --version

# Wrangler (Cloudflare CLI — voor deployment later)
npm install -g wrangler
```

### Stap 0.2 — Maak een projectmap aan
**Waar:** Terminal

```bash
# Kies waar je projecten bewaart
cd ~/Projects   # of waar jij je code zet
mkdir costa-blanca-movement
cd costa-blanca-movement

# Git initialiseren
git init
```

### Stap 0.3 — Download de briefing en reference documenten
**Waar:** Vanuit deze chat

- Download `claude-code-briefing.md` → zet in de projectmap root
- Download `template-architectuur-reference.md` → zet in de projectmap root
- Download `nxg-agency-plan-v2.docx` → NIET nodig in de projectmap (alles zit al in de briefing)

### Stap 0.4 — Open je editor ernaast
**Waar:** VS Code of je favoriete editor

Open de projectmap in je editor zodat je kunt meelezen wat Claude Code bouwt:
```bash
code .   # als je VS Code gebruikt
```

---

## FASE 1 — Claude Code Starten + Architectuur Goedkeuren

### Stap 1.1 — Start Claude Code in je projectmap
**Waar:** Terminal, in je projectmap

```bash
cd ~/Projects/costa-blanca-movement
claude
```

Dit opent de Claude Code CLI sessie.

### Stap 1.2 — Plak de briefing als openingsbericht
**Waar:** Claude Code CLI

Kopieer de VOLLEDIGE inhoud van `claude-code-briefing.md` en plak dit als je eerste bericht.

⚠️ BELANGRIJK: Plak alles in één keer. Niet in stukjes. Claude Code moet de hele context in één bericht krijgen.

💡 TIP: Als het te lang is voor je terminal, kun je ook doen:
```
cat claude-code-briefing.md
```
En dan zeggen: "Lees het bestand claude-code-briefing.md in de root en gebruik dat als je complete briefing."

### Stap 1.3 — Wacht op architectuur-voorstel
**Waar:** Claude Code CLI

Claude Code zou nu NIET direct moeten gaan bouwen (dat staat in de briefing).
Hij zou eerst moeten presenteren:

1. Folder structuur
2. Content model (frontmatter velden)
3. Component lijst met props
4. SEO metadata model
5. Schema strategie
6. Event tracking architectuur
7. i18n structuur
8. Dashboard data model

### Stap 1.4 — Review het voorstel
**Waar:** Claude Code CLI + je editor

Check of het voorstel overeenkomt met de briefing. Let specifiek op:

- [ ] Zijn alle pagina-types aanwezig?
- [ ] Klopt de mappenstructuur?
- [ ] Zijn de content models compleet (treatments + conditions frontmatter)?
- [ ] Zit de analytics utility erin?
- [ ] Zit het dashboard erin?
- [ ] Is i18n correct (folder-based, /nl/ prefix)?
- [ ] Zijn de 4 locaties erin (Altea volledig, 3x service area)?

Als iets mist of afwijkt, zeg dat nu. Voorbeelden:

- "Je mist de dashboard componenten — voeg ScoreCard, TrendList, ActionLog etc. toe"
- "De locatie structuur moet 4 steden zijn: Altea volledig, Benidorm/Jávea/Dénia als service area"
- "Ik wil geen React componenten — alles moet pure Astro zijn"

### Stap 1.5 — Geef goedkeuring
**Waar:** Claude Code CLI

Als alles klopt:
```
Architectuur goedgekeurd. Begin met stap 1: project setup.
```

---

## FASE 2 — Project Setup + Shell

### Stap 2.1 — Project setup
**Wat Claude Code doet:**
- Astro project initialiseren
- Tailwind CSS configureren
- TypeScript config
- Mappenstructuur aanmaken
- Package.json met dependencies

**Wat jij checkt in je editor:**
- [ ] `package.json` heeft Astro + Tailwind als dependencies
- [ ] `astro.config.mjs` bestaat en is correct
- [ ] `tailwind.config.mjs` heeft de juiste design tokens (kleuren, fonts)
- [ ] Mappenstructuur komt overeen met de briefing
- [ ] `tsconfig.json` aanwezig

**Test het:**
```bash
# In een aparte terminal (laat Claude Code open staan)
cd ~/Projects/costa-blanca-movement
npm install
npm run dev
```

Je zou een lege Astro dev server moeten zien op `localhost:4321`.

💡 TIP: Als `npm install` faalt, zeg tegen Claude Code wat de error is — hij kan het fixen.

### Stap 2.2 — Git commit
**Waar:** Terminal (apart van Claude Code)

```bash
git add .
git commit -m "feat: project setup - Astro + Tailwind + folder structure"
```

⚠️ COMMIT NA ELKE GROTE STAP. Dit is je vangnet als iets breekt.

### Stap 2.3 — BaseLayout + Header + Footer + SEOHead
**Waar:** Claude Code CLI

```
Bouw nu stap 2: BaseLayout.astro, Header.astro, Footer.astro, en SEOHead.astro.

Regels:
- Header moet navigatie bevatten met LanguageSwitcher placeholder
- Footer moet NAP data tonen uit src/data/site.ts
- SEOHead moet title, description, canonical, OG tags, hreflang ondersteunen
- BaseLayout wraps alles met html/head/body en importeert global.css
- Mobile first — hamburger menu op mobiel
- Maak ook src/data/site.ts aan met alle business info
```

**Wat jij checkt:**
- [ ] `src/data/site.ts` bevat: naam, adres, telefoon, email, openingstijden, socials
- [ ] Header heeft navigatie met alle pagina-links
- [ ] Footer toont contactinfo uit site.ts (niet hardcoded)
- [ ] SEOHead accepteert props voor title, description, canonical, OG
- [ ] Mobile hamburger menu werkt

**Test het:**
```bash
npm run dev
# Open localhost:4321 — je zou header + footer moeten zien
# Open Chrome DevTools → mobiel mode → check hamburger menu
```

**Git commit:**
```bash
git add .
git commit -m "feat: BaseLayout, Header, Footer, SEOHead shell"
```

### Stap 2.4 — Analytics utility
**Waar:** Claude Code CLI

```
Bouw nu stap 3: de analytics utility in src/lib/analytics.ts.

Regels:
- Centrale trackEvent(name, properties) functie
- Environment-based: dev = console.log, prod = GA4 gtag
- GA4 measurement ID uit src/data/site.ts
- TypeScript types voor event names en properties
- Moet werken zonder dat GA4 geladen is (graceful degradation)
```

**Wat jij checkt:**
- [ ] `src/lib/analytics.ts` bestaat
- [ ] trackEvent functie is type-safe
- [ ] In dev mode logt hij naar console
- [ ] In prod mode stuurt hij naar GA4
- [ ] Site breekt niet als GA4 niet geladen is

**Git commit:**
```bash
git add .
git commit -m "feat: analytics utility with trackEvent abstraction"
```

---

## FASE 3 — Homepage Bouwen

### Stap 3.1 — Homepage componenten
**Waar:** Claude Code CLI

```
Bouw nu stap 4: de Engelse homepage met alle componenten.

Bouw deze componenten en assembleer ze op de homepage:
1. HeroSection — full-width, gradient overlay, H1 + tagline + CTA button
2. TrustBar — "15+ Years Experience" | "500+ Patients" | "4.8★ Google Reviews"
3. ServicesGrid — 4-6 behandeling kaarten met icoon + titel + korte tekst + link
4. DefinitionBlock — "What We Do" korte uitleg voor citability
5. TestimonialSlider — 3 reviews met naam + sterren + tekst
6. FAQAccordion — 5-6 vragen met details/summary (geen JS), FAQPage schema
7. CTABand — full-width "Book Your Appointment" met contrast achtergrond

Alle CTAs moeten trackEvent calls hebben.
Gebruik placeholder content voor Costa Blanca Movement Centre.
Design: clean medical + terracotta accent.
Mobile first.
```

**Wat jij checkt in de browser:**
- [ ] Homepage laadt zonder errors
- [ ] Alle 7 secties zijn zichtbaar
- [ ] H1 is er slechts één van
- [ ] FAQ werkt zonder JavaScript (details/summary)
- [ ] CTAs zijn klikbaar en loggen events in console (dev mode)
- [ ] Mobiel ziet er goed uit (Chrome DevTools → responsive)
- [ ] Desktop ziet er goed uit
- [ ] Kleuren kloppen (terracotta accent, warm wit achtergrond)

**Design feedback geven:**
Dit is het moment om visueel te beoordelen. Voorbeelden van feedback:

- "De hero is te saai — voeg een subtiele gradient overlay toe"
- "De trust bar moet meer whitespace"
- "De CTA kleur is niet opvallend genoeg"
- "Font voor headings moet serif zijn, niet sans-serif"
- "Te weinig whitespace tussen secties"
- "De FAQ moet visueel meer ruimte hebben"

Geef alle visuele feedback in één bericht, niet per punt apart.

**Git commit:**
```bash
git add .
git commit -m "feat: homepage EN with all component blocks"
```

### Stap 3.2 — Schema check homepage
**Waar:** Claude Code CLI

```
Voeg nu schema markup toe aan de homepage:
- MedicalBusiness (hoofd schema)
- LocalBusiness (met NAP data uit site.ts)
- FAQPage (voor de FAQ sectie)

Output als JSON-LD in de head via SEOHead component.
Maak een herbruikbare schema generator in src/data/schema.ts.
```

**Wat jij checkt:**
- [ ] View Page Source → zoek naar `<script type="application/ld+json">`
- [ ] Schema's zijn correct JSON
- [ ] Test met: https://validator.schema.org/ (plak je page source)
- [ ] Test met: https://search.google.com/test/rich-results

**Git commit:**
```bash
git add .
git commit -m "feat: schema markup - MedicalBusiness, LocalBusiness, FAQPage"
```

---

## FASE 4 — Treatment & Condition Templates

### Stap 4.1 — Treatment template + 2 pagina's
**Waar:** Claude Code CLI

```
Bouw nu stap 5: TreatmentLayout.astro + 2 behandelingspagina's in EN.

Template structuur per behandelingspagina:
- BreadcrumbNav (Home > Treatments > [Name])
- H1 behandelingsnaam
- DefinitionBlock ("What is [treatment]?")
- Main content (hoe werkt het, voor wie, wat verwachten)
- FAQAccordion (3-4 behandeling-specifieke vragen)
- RelatedConditions component ("Helps with: back pain, sciatica, ...")
- ReviewCTA ("Did this treatment help you?")
- CTABand ("Book Your Appointment")

Content in markdown met frontmatter in src/content/treatments/en/:
1. spinal-decompression.md
2. sports-massage.md

Maak ook de [...slug].astro dynamic route die content uit markdown haalt.
Voeg Service + FAQPage + BreadcrumbList schema toe.
Tracking op alle CTAs.
```

**Wat jij checkt:**
- [ ] `/treatments/spinal-decompression` laadt correct
- [ ] `/treatments/sports-massage` laadt correct
- [ ] `/treatments/` overview pagina toont beide
- [ ] Breadcrumbs werken en linken correct
- [ ] DefinitionBlock is bovenaan en leesbaar
- [ ] RelatedConditions links werken (mogen 404 zijn als conditions nog niet bestaan)
- [ ] FAQ werkt zonder JS
- [ ] Schema valide (check via validator)
- [ ] Markdown frontmatter bevat alle velden uit het content model

**Git commit:**
```bash
git add .
git commit -m "feat: treatment template + spinal-decompression + sports-massage"
```

### Stap 4.2 — Condition template + 2 pagina's
**Waar:** Claude Code CLI

```
Bouw nu stap 6: ConditionLayout.astro + 2 klachtpagina's in EN.

Template structuur per klachtpagina:
- BreadcrumbNav (Home > Conditions > [Name])
- H1 klachtnaam
- DefinitionBlock ("What is [condition]?")
- Symptoms lijst
- Causes sectie
- When to seek help sectie
- RelatedTreatments component ("Treatments for [condition]")
- FAQAccordion (3-4 klacht-specifieke vragen)
- ReviewCTA
- CTABand

Content in markdown met frontmatter in src/content/conditions/en/:
1. lower-back-pain.md
2. neck-pain.md

Voeg MedicalCondition + FAQPage + BreadcrumbList schema toe.
Zorg dat RelatedTreatments linkt naar de bestaande treatment pagina's.
```

**Wat jij checkt:**
- [ ] `/conditions/lower-back-pain` laadt correct
- [ ] `/conditions/neck-pain` laadt correct
- [ ] `/conditions/` overview pagina toont beide
- [ ] RelatedTreatments linkt naar werkende treatment pagina's
- [ ] Symptoms worden als echte `<ul>` getoond
- [ ] Interne linking werkt: treatment → condition EN condition → treatment
- [ ] Schema valide

**Git commit:**
```bash
git add .
git commit -m "feat: condition template + lower-back-pain + neck-pain"
```

---

## FASE 5 — Resterende Pagina's

### Stap 5.1 — FAQ pagina
**Waar:** Claude Code CLI

```
Bouw nu stap 7: de centrale FAQ pagina (/faq).

- Haal vragen uit src/content/faq/en.json
- Groepeer per categorie (General, Treatments, Insurance, Appointments)
- Gebruik FAQAccordion component
- Voeg FAQPage schema toe voor ALLE vragen
- Interne links vanuit antwoorden naar treatment/condition pagina's
```

**Wat jij checkt:**
- [ ] `/faq` laadt met alle vragen
- [ ] Categorieën zijn duidelijk gescheiden
- [ ] Elk antwoord bevat links naar relevante pagina's
- [ ] Schema bevat alle Q&A pairs
- [ ] Werkt zonder JavaScript

**Git commit:**
```bash
git add .
git commit -m "feat: FAQ page with categorized questions and schema"
```

### Stap 5.2 — About + Contact + Reviews
**Waar:** Claude Code CLI

```
Bouw nu stap 8: About, Contact en Reviews pagina's.

About (/about):
- TeamSection component met placeholder teamleden
- E-E-A-T: opleiding, ervaring, certificeringen, foto placeholder
- Korte clinic story/missie
- Person schema per teamlid

Contact (/contact):
- Contactformulier (naam, email, telefoon, bericht) — met form_submit tracking
- Google Maps embed
- Openingstijden
- Klikbaar telefoonnummer + WhatsApp link — met tracking
- Route/parkeerinfo
- NAP data uit site.ts

Reviews (/reviews):
- 6-8 placeholder reviews
- Gemiddelde rating prominente weergave
- Links naar Google Reviews, eventueel Zorgkaart
- ReviewCTA ("Laat een review achter")
- AggregateRating schema
```

**Wat jij checkt:**
- [ ] `/about` toont team met opleiding/ervaring
- [ ] `/contact` formulier stuurt form_submit event
- [ ] `/contact` telefoon en WhatsApp hebben tracking
- [ ] `/reviews` toont reviews met sterren
- [ ] Alle NAP data komt uit site.ts, nergens hardcoded
- [ ] Schema's valide op alle 3 pagina's

**Git commit:**
```bash
git add .
git commit -m "feat: about, contact, reviews pages"
```

### Stap 5.3 — Location pagina's
**Waar:** Claude Code CLI

```
Bouw nu stap 9: alle location pagina's.

Locations overview (/locations):
- Kaart met alle 4 locaties
- Korte beschrijving per locatie
- Links naar individuele pagina's

Altea (/locations/altea) — VOLLEDIG:
- Volledige NAP data
- Google Maps embed met pin
- Openingstijden tabel
- Routebeschrijving (vanuit Alicante, vanuit Benidorm)
- Parkeerinfo
- Welke behandelingen beschikbaar
- Team op deze locatie
- LocalBusiness schema met alle details

Benidorm (/locations/benidorm) — SERVICE AREA:
- Korte intro over Benidorm expat community
- "We serve the Benidorm area from our clinic in Altea"
- Kaart met afstandsindicatie
- Beschikbare behandelingen
- CTA naar contact/appointment
- LocalBusiness schema met serviceArea

Jávea (/locations/javea) — SERVICE AREA:
- Zelfde structuur als Benidorm, andere content

Dénia (/locations/denia) — SERVICE AREA:
- Zelfde structuur als Benidorm, andere content
```

**Wat jij checkt:**
- [ ] `/locations` overview toont alle 4 steden
- [ ] `/locations/altea` is volledig en gedetailleerd
- [ ] `/locations/benidorm`, `/locations/javea`, `/locations/denia` zijn lichte pagina's
- [ ] Service area pagina's verwijzen terug naar Altea als hoofdlocatie
- [ ] Kaarten laden correct
- [ ] Schema's kloppen per pagina

**Git commit:**
```bash
git add .
git commit -m "feat: location pages - Altea full + 3 service area"
```

---

## FASE 6 — SEO/GEO Technische Laag

### Stap 6.1 — Schema validatie
**Waar:** Claude Code CLI

```
Review nu alle schema markup op alle pagina's.
Zorg dat elke pagina de juiste schema's heeft:

- Alle pagina's: LocalBusiness + BreadcrumbList
- Homepage: + MedicalBusiness
- Treatment pages: + Service + FAQPage
- Condition pages: + MedicalCondition + FAQPage
- FAQ page: + FAQPage
- About: + Person per teamlid
- Reviews: + AggregateRating
- Location pages: + Place + LocalBusiness (met serviceArea voor service area pages)

Maak de schema generator in src/data/schema.ts herbruikbaar — niet copy-paste per pagina.
```

### Stap 6.2 — robots.txt + llms.txt + sitemap
**Waar:** Claude Code CLI

```
Bouw nu stap 10: technische SEO bestanden.

robots.txt (in public/):
- Allow alle crawlers
- Expliciete User-agent regels voor: Googlebot, GPTBot, ClaudeBot, PerplexityBot, Bingbot
- Disallow: /visibility (dashboard niet indexeren)
- Sitemap verwijzing

llms.txt (in public/):
- Gestructureerde beschrijving van Costa Blanca Movement Centre
- Diensten, locatie, talen, doelgroep
- Contact informatie
- Uit site.ts data halen

sitemap.xml:
- Automatisch gegenereerd door Astro
- Alle EN pagina's
- Alle NL pagina's (die bestaan)
- Lastmod dates
- Hreflang alternates
```

**Wat jij checkt:**
- [ ] `localhost:4321/robots.txt` toont correcte regels
- [ ] `localhost:4321/llms.txt` beschrijft de praktijk
- [ ] `localhost:4321/sitemap.xml` bevat alle pagina's
- [ ] Sitemap bevat hreflang alternates
- [ ] `/visibility` staat op Disallow in robots.txt

**Git commit:**
```bash
git add .
git commit -m "feat: robots.txt, llms.txt, sitemap.xml"
```

---

## FASE 7 — i18n + Nederlandse Pagina's

### Stap 7.1 — i18n setup
**Waar:** Claude Code CLI

```
Bouw nu stap 11: i18n systeem.

Setup:
- src/i18n/ui.ts met alle UI labels in EN + NL
- src/i18n/utils.ts met getLocale() en t() helper functies
- LanguageSwitcher.astro component in header
- Hreflang tags automatisch op elke pagina die een vertaling heeft

Bouw NL pagina's:
- /nl/ (homepage NL)
- /nl/behandelingen/ (overview)
- /nl/behandelingen/wervelkolom-decompressie/ (1 behandeling)
- /nl/klachten/lage-rugpijn/ (1 klacht)
- /nl/locaties/altea/
- /nl/locaties/benidorm/
- /nl/locaties/javea/
- /nl/locaties/denia/
- /nl/contact/
- /nl/faq/

Content voor NL in src/content/treatments/nl/ en src/content/conditions/nl/.
LanguageSwitcher moet correct linken naar de vertaalde variant.
```

**Wat jij checkt:**
- [ ] `/nl/` toont Nederlandse homepage
- [ ] LanguageSwitcher werkt EN → NL en NL → EN
- [ ] Navigatie is vertaald op NL pagina's
- [ ] CTAs zijn vertaald ("Afspraak Maken" niet "Book Appointment")
- [ ] Hreflang tags aanwezig in head van elke pagina
- [ ] URL structuur correct (/nl/behandelingen/ niet /nl/treatments/)
- [ ] Footer NAP data is hetzelfde in beide talen

**Git commit:**
```bash
git add .
git commit -m "feat: i18n setup + Dutch pages"
```

---

## FASE 8 — Mobile UX + Dashboard

### Stap 8.1 — StickyMobileCTA
**Waar:** Claude Code CLI

```
Bouw nu stap 12: StickyMobileCTA component.

- Vaste balk onderaan het scherm op mobiel (alleen zichtbaar op < md breakpoint)
- Twee knoppen: WhatsApp (groen) + Bellen (terracotta)
- Beide met tracking events
- Niet zichtbaar op desktop
- Moet niet de footer overlappen
- Moet smooth appearance hebben (niet abrupt)
- Telefoon en WhatsApp nummer uit site.ts
```

**Wat jij checkt:**
- [ ] Sticky bar zichtbaar op mobiel
- [ ] Niet zichtbaar op desktop
- [ ] WhatsApp opent juiste nummer
- [ ] Telefoon opent dialer
- [ ] Events loggen in console
- [ ] Overlapt niet met footer content

### Stap 8.2 — Visibility Dashboard
**Waar:** Claude Code CLI

```
Bouw nu stap 13: het visibility dashboard.

Pagina: /visibility (noindex, nofollow)
Layout: DashboardLayout.astro
Data: src/data/client-report.json (gebruik de sample data uit de briefing)

Componenten:
1. ScoreRow — 4 ScoreCards naast elkaar (Overall, Layer 1, Layer 2, Layer 3)
2. TrendList — organisch verkeer per maand als simpele CSS bars
3. EventSummary — conversie events deze maand in kaart-formaat
4. ReviewSummary — totaal, gemiddeld, nieuw deze maand
5. ActionLog — uitgevoerde acties met datum
6. PriorityList — volgende focus met status indicator

Design regels:
- Zelfde design systeem als rest van site
- Geen chart libraries — alleen CSS
- Print-friendly
- Mobiel responsive
- Header toont praktijknaam + "Last updated: [datum]"
- Geen navigatie naar dashboard vanuit de main site nav
```

**Wat jij checkt:**
- [ ] `/visibility` laadt met sample data
- [ ] Scores tonen met kleur-indicatie (groen/oranje/rood)
- [ ] Trend arrows werken (▲ voor verbetering, ▼ voor achteruitgang)
- [ ] Traffic bars zijn visueel duidelijk
- [ ] Events tonen correct
- [ ] Actions en priorities zijn leesbaar
- [ ] Mobiel layout werkt
- [ ] Geen link naar dashboard in header/footer navigatie
- [ ] View Source: `<meta name="robots" content="noindex, nofollow">`

**Git commit:**
```bash
git add .
git commit -m "feat: visibility dashboard with static JSON data"
```

---

## FASE 9 — CLAUDE.md + Afronding

### Stap 9.1 — CLAUDE.md
**Waar:** Claude Code CLI

```
Schrijf nu stap 14: CLAUDE.md in de project root.

Dit bestand is de SOP voor toekomstige Claude Code sessies en freelancers.
Het moet bevatten:

1. Project overview (wat is dit, welke stack)
2. Design tokens (kleuren, fonts, spacing — exacte waarden)
3. Component conventies (naming, props patterns)
4. Hoe een nieuwe behandeling toevoegen (stap voor stap)
5. Hoe een nieuwe klacht toevoegen
6. Hoe een nieuwe locatie toevoegen
7. Hoe dashboard data updaten
8. Hoe een nieuwe taal toevoegen
9. Hoe tracking events werken
10. Deploy instructies (Cloudflare Pages)
11. Hoe dit template te klonen voor een nieuwe klant
```

**Wat jij checkt:**
- [ ] CLAUDE.md is leesbaar en compleet
- [ ] "Nieuwe behandeling toevoegen" instructies zijn te volgen zonder context
- [ ] "Dashboard updaten" instructies zijn duidelijk
- [ ] "Klonen voor nieuwe klant" is gedocumenteerd
- [ ] Geen jargon of onduidelijke stappen

**Git commit:**
```bash
git add .
git commit -m "feat: CLAUDE.md project documentation"
```

### Stap 9.2 — Privacy pagina
**Waar:** Claude Code CLI

```
Bouw een basis /privacy pagina met placeholder privacy policy.
Gebruik standaard GDPR-compliant structuur voor een Spaanse health clinic.
Link vanuit footer.
```

### Stap 9.3 — Globale quality check
**Waar:** Claude Code CLI

```
Doe nu stap 15: volledige review en fix-ronde.

Check en fix het volgende op ALLE pagina's:

1. Semantic HTML: precies 1 H1 per pagina, logische H2/H3 nesting
2. Alle images hebben alt tekst
3. Alle links werken (geen 404s naar interne pagina's)
4. Alle CTAs hebben tracking events
5. NAP data komt overal uit site.ts
6. Schema markup is valide JSON-LD op elke pagina
7. Canonical tags aanwezig
8. OG tags aanwezig
9. Hreflang correct op tweetalige pagina's
10. Mobile layout check op alle pagina-types
11. FAQ accordions werken zonder JS
12. Breadcrumbs kloppen op elke pagina
13. Geen console errors
14. Geen hardcoded strings in componenten (alles uit i18n/site.ts)

Geef me een rapport van wat je hebt gefixed.
```

---

## FASE 10 — Performance Test + Deploy

### Stap 10.1 — Lighthouse audit
**Waar:** Chrome browser

```
1. npm run build
2. npm run preview (draait de production build lokaal)
3. Open Chrome → localhost:4321
4. DevTools → Lighthouse tab
5. Run audit: Performance, Accessibility, Best Practices, SEO
6. Check op mobiel EN desktop
```

**Targets:**
- [ ] Performance: 95+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 100

Als iets onder target zit, zeg tegen Claude Code:
```
Lighthouse geeft [score] op [categorie]. De issues zijn: [copy-paste de issues].
Fix deze.
```

### Stap 10.2 — Build test
**Waar:** Terminal

```bash
npm run build
```

Dit moet zonder errors completen. Check de `dist/` folder:
- [ ] Alle pagina's zijn statische HTML bestanden
- [ ] Geen JavaScript bundles behalve analytics
- [ ] Afbeeldingen zijn geoptimaliseerd
- [ ] robots.txt en llms.txt zijn aanwezig in dist/

### Stap 10.3 — Deploy naar Cloudflare Pages
**Waar:** Terminal + Cloudflare dashboard

**Optie A: Via Cloudflare dashboard (makkelijkst)**
1. Ga naar https://dash.cloudflare.com/
2. Pages → Create a project → Connect to Git
3. Selecteer je repository
4. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy

**Optie B: Via Wrangler CLI**
```bash
npm run build
npx wrangler pages deploy dist --project-name=costa-blanca-movement
```

### Stap 10.4 — Custom domain (optioneel nu)
**Waar:** Cloudflare dashboard

Als je al een domein hebt:
1. Pages → je project → Custom domains
2. Voeg domein toe
3. DNS wordt automatisch geconfigureerd als domein al op Cloudflare staat

Voor nu is de `.pages.dev` URL prima als demo.

### Stap 10.5 — Finale checks op live site
**Waar:** Browser

- [ ] Alle pagina's laden op de live URL
- [ ] HTTPS werkt
- [ ] Mobiel ziet er goed uit
- [ ] Schema test: https://search.google.com/test/rich-results
- [ ] Robots.txt bereikbaar: `[url]/robots.txt`
- [ ] Sitemap bereikbaar: `[url]/sitemap.xml`
- [ ] llms.txt bereikbaar: `[url]/llms.txt`
- [ ] `/visibility` dashboard laadt maar staat niet in navigatie

**Git commit + tag:**
```bash
git add .
git commit -m "feat: production ready v1"
git tag v1.0
```

---

## FASE 11 — Na de Build

### Stap 11.1 — GSC + Analytics koppelen
- Google Search Console: voeg domein/URL toe, verifieer, submit sitemap
- GA4: maak property aan, voeg Measurement ID toe aan site.ts, deploy opnieuw
- Google Business Profile: claim of maak aan voor Costa Blanca Movement Centre

### Stap 11.2 — Kom terug naar deze chat
Zeg: "Site is live op [URL]. Update mijn memory."

Dan update ik je memory zodat in toekomstige chats de context beschikbaar is.

---

## Troubleshooting — Veelvoorkomende Issues

### Claude Code bouwt te snel zonder te wachten
Zeg: "Stop. Laat me eerst reviewen voordat je verder gaat."

### Styling ziet er niet uit
Zeg: "De huidige styling wijkt af van de design richting. Ik wil: [beschrijf exact wat je wilt]. Kijk naar het template-architectuur-reference.md bestand voor de design tokens."

### Claude Code maakt React componenten
Zeg: "Geen React. Alles moet pure Astro componenten zijn. Geen client:load, geen useState, geen React imports."

### Build faalt
Copy-paste de exacte error naar Claude Code. Hij kan het bijna altijd fixen.

### Te veel JS in de build
Zeg: "De build bevat te veel JavaScript. Check: welke componenten laden client-side JS? Alles moet server-rendered zijn. Alleen de analytics utility mag client-side JS hebben."

### Claude Code vergeet eerdere instructies
Dit gebeurt bij lange sessies. Start een nieuwe Claude Code sessie en plak de briefing opnieuw. Zeg erbij: "We zijn bij stap [X]. Hier is de huidige staat van het project: [beschrijf kort wat al gebouwd is]."

### Context window vol
Als Claude Code aangeeft dat de context vol raakt:
1. Commit alles
2. Start nieuwe sessie
3. Plak briefing + "We zijn bij stap [X]"
4. Claude Code leest de bestaande code automatisch

---

## Tijdsinschatting

| Fase | Geschatte tijd | Focus |
|------|---------------|-------|
| Fase 0: Voorbereiding | 15 min | Setup |
| Fase 1: Architectuur | 30-60 min | Review + approve |
| Fase 2: Shell | 1-2 uur | Layout + components |
| Fase 3: Homepage | 2-3 uur | Components + styling + feedback |
| Fase 4: Templates | 2-3 uur | Treatment + Condition |
| Fase 5: Overige pagina's | 2-3 uur | FAQ, About, Contact, Reviews, Locations |
| Fase 6: SEO technisch | 1 uur | Schema, robots, sitemap |
| Fase 7: i18n | 2-3 uur | NL pagina's + switcher |
| Fase 8: Mobile + Dashboard | 2-3 uur | Sticky CTA + visibility |
| Fase 9: CLAUDE.md + QA | 1-2 uur | Documentatie + fixes |
| Fase 10: Deploy | 30-60 min | Build + Cloudflare |
| **Totaal** | **~15-22 uur** | **Verspreid over 3-5 dagen** |

Dit is inclusief review-tijd en iteratie. Claude Code doet het zware werk — jij reviewt en stuurt bij.
