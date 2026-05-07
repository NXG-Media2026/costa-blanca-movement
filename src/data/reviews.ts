import type { Locale } from './site';

/**
 * Single source of truth for patient reviews.
 *
 * Drives:
 *   - Homepage TestimonialSlider (featured subset)
 *   - /reviews and /nl/reviews full grid
 *   - AggregateRating + Review JSON-LD on both
 *
 * Per client: replace with verified reviews. Keep `id` stable so
 * featured selection survives content edits.
 */

export interface Review {
  /** Stable identifier, used as @id fragment in Review schema. */
  id: string;
  /** Display name as it appears on the source review platform. */
  name: string;
  /** Integer 1–5. */
  rating: number;
  /** ISO-8601 date the review was published. */
  date: string;
  /** Canonical EN slug of the treatment received. Resolves to display label per locale. */
  treatmentSlug: 'spinal-decompression' | 'sports-massage' | 'postural-assessment' | 'dry-needling';
  /** Patient's location/town — optional. */
  location?: string;
  /** Source platform (Google, Doctoralia, etc). Defaults to Google. */
  source?: string;
  /** Show on homepage TestimonialSlider. */
  featured?: boolean;
  /** Review body — at least one of en/nl required. The other is auto-falls-back. */
  en?: string;
  nl?: string;
}

export const reviews: Review[] = [
  // ====== FEATURED on homepage ======
  {
    id: 'margaret-t',
    name: 'Margaret T.',
    rating: 5,
    date: '2025-12-01',
    treatmentSlug: 'spinal-decompression',
    location: 'Torrevieja',
    source: 'Google',
    featured: true,
    en: 'After years of lower back pain, I finally found relief at Costa Blanca Movement Centre. Dr. Mitchell explained everything clearly and the spinal decompression treatment has been life-changing.',
    nl: 'Na jaren van lage rugpijn vond ik eindelijk verlichting bij Costa Blanca Movement Centre. Dr. Mitchell legde alles duidelijk uit en de wervelkolom decompressie behandeling heeft mijn leven veranderd.',
  },
  {
    id: 'hans-van-der-berg',
    name: 'Hans van der Berg',
    rating: 5,
    date: '2025-11-22',
    treatmentSlug: 'sports-massage',
    source: 'Google',
    featured: true,
    en: "As a keen cyclist, regular sports massage here keeps me on the bike. Laura is incredibly skilled — she finds tension I didn't even know I had. Highly recommended for any active expat.",
    nl: 'Als enthousiast fietser houdt de regelmatige sportmassage hier me op de fiets. Laura is ongelooflijk bekwaam — ze vindt spanning waarvan ik niet eens wist dat ik die had. Sterk aanbevolen voor elke actieve expat.',
  },
  {
    id: 'david-r',
    name: 'David R.',
    rating: 5,
    date: '2025-11-08',
    treatmentSlug: 'spinal-decompression',
    source: 'Google',
    featured: true,
    en: 'Professional, knowledgeable, and genuinely caring. I came in with severe neck pain and sciatica. Within 6 sessions, I saw a dramatic improvement. Best clinic on the Costa Blanca.',
    nl: 'Professioneel, deskundig en oprecht betrokken. Ik kwam binnen met ernstige nekpijn en ischias. Binnen 6 sessies zag ik een dramatische verbetering. Beste kliniek aan de Costa Blanca.',
  },

  // ====== Reviews-page-only ======
  {
    id: 'david-thompson',
    name: 'David Thompson',
    rating: 5,
    date: '2025-11-15',
    treatmentSlug: 'spinal-decompression',
    source: 'Google',
    en: 'After years of lower back pain, I finally found real relief with spinal decompression therapy. Dr. Mitchell explained everything clearly and the results after just 4 sessions were remarkable. Highly recommended for anyone in the Torrevieja area.',
  },
  {
    id: 'annemieke-de-vries',
    name: 'Annemieke de Vries',
    rating: 5,
    date: '2025-10-28',
    treatmentSlug: 'sports-massage',
    source: 'Google',
    nl: 'Fantastische kliniek! Laura is een uitstekende sportmasseur. Als Nederlandse expat is het fijn dat ze Nederlands spreekt. Mijn nek- en schouderklachten zijn enorm verbeterd na een reeks behandelingen.',
    en: 'Fantastic clinic! Laura is an excellent sports massage therapist. As a Dutch expat it is great that she speaks Dutch. My neck and shoulder complaints have improved enormously after a series of treatments.',
  },
  {
    id: 'margaret-wilson',
    name: 'Margaret Wilson',
    rating: 5,
    date: '2025-10-02',
    treatmentSlug: 'spinal-decompression',
    source: 'Google',
    en: 'I was sceptical about non-surgical treatment for my herniated disc, but the decompression therapy has genuinely changed my life. I can walk, garden, and enjoy retirement again without constant pain.',
  },
  {
    id: 'peter-van-dijk',
    name: 'Peter van Dijk',
    rating: 4,
    date: '2025-09-14',
    treatmentSlug: 'postural-assessment',
    source: 'Google',
    en: 'Very professional clinic with modern equipment. The postural assessment was thorough and the follow-up exercises really helped. Only reason for 4 stars is the limited Saturday hours, but otherwise excellent.',
    nl: 'Zeer professionele kliniek met moderne apparatuur. De houdingsanalyse was grondig en de vervolgoefeningen hielpen echt. Enige reden voor 4 sterren zijn de beperkte zaterdaguren, maar verder uitstekend.',
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    rating: 5,
    date: '2025-08-20',
    treatmentSlug: 'sports-massage',
    location: 'Orihuela Costa',
    source: 'Google',
    en: "I drive from Orihuela Costa every week for my sports massage with Laura. It's worth every kilometre. She found tension I didn't even know I had. My golf game has improved noticeably since starting treatment.",
  },
  {
    id: 'jan-bakker',
    name: 'Jan Bakker',
    rating: 5,
    date: '2025-07-30',
    treatmentSlug: 'spinal-decompression',
    source: 'Google',
    nl: 'Na een verwijzing van een vriend ben ik hier terecht gekomen voor mijn ischias. De combinatie van decompressie en dry needling werkt uitstekend. Het team is professioneel en spreekt perfect Nederlands.',
    en: 'After a referral from a friend I came here for my sciatica. The combination of decompression and dry needling works excellently. The team is professional and speaks perfect Dutch.',
  },
  {
    id: 'christine-moreau',
    name: 'Christine Moreau',
    rating: 5,
    date: '2025-07-05',
    treatmentSlug: 'postural-assessment',
    location: 'Guardamar del Segura',
    source: 'Google',
    en: 'Moved to Guardamar recently and was worried about finding quality physiotherapy. This clinic exceeded expectations. The initial assessment was incredibly thorough — they actually listen and create a real plan.',
  },
  {
    id: 'robert-hughes',
    name: 'Robert Hughes',
    rating: 4,
    date: '2025-06-12',
    treatmentSlug: 'dry-needling',
    source: 'Google',
    en: "Good clinic with knowledgeable staff. The dry needling helped my chronic neck pain when nothing else did. They were upfront about what to expect and how many sessions I'd need. No overselling.",
  },
];

/** Treatment slug → display label per locale. Single source for testimonial badges. */
const treatmentLabels: Record<Review['treatmentSlug'], { en: string; nl: string }> = {
  'spinal-decompression': { en: 'Spinal Decompression', nl: 'Wervelkolom Decompressie' },
  'sports-massage': { en: 'Sports Massage', nl: 'Sportmassage' },
  'postural-assessment': { en: 'Postural Assessment', nl: 'Houdingsanalyse' },
  'dry-needling': { en: 'Dry Needling', nl: 'Dry Needling' },
};

export function treatmentLabel(slug: Review['treatmentSlug'], locale: Locale): string {
  return treatmentLabels[slug][locale];
}

/** Resolve display text for a review in the requested locale. Falls back to other locale if missing. */
export function reviewText(review: Review, locale: Locale): string {
  return review[locale] ?? review[locale === 'en' ? 'nl' : 'en'] ?? '';
}

/**
 * Get reviews shaped for components/schema.
 * Pass `featuredOnly: true` for the homepage subset.
 */
export function getReviews(opts: { featuredOnly?: boolean } = {}): Review[] {
  return opts.featuredOnly ? reviews.filter((r) => r.featured) : reviews;
}

/** Compute aggregate rating over a review set. */
export function aggregateRating(set: Review[] = reviews): { ratingValue: number; reviewCount: number } {
  const reviewCount = set.length;
  const ratingValue = reviewCount === 0
    ? 0
    : Math.round((set.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10;
  return { ratingValue, reviewCount };
}
