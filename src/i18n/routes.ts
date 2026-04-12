/** URL segment translations between locales */
export const routeSegments: Record<string, Record<string, string>> = {
  en: {
    treatments: 'treatments',
    conditions: 'conditions',
    locations: 'locations',
    about: 'about',
    contact: 'contact',
    faq: 'faq',
    reviews: 'reviews',
    privacy: 'privacy',
  },
  nl: {
    treatments: 'behandelingen',
    conditions: 'klachten',
    locations: 'locaties',
    about: 'over-ons',
    contact: 'contact',
    faq: 'faq',
    reviews: 'reviews',
    privacy: 'privacy',
  },
};

/** Content slug mappings: EN slug → NL slug */
export const treatmentSlugs: Record<string, string> = {
  'spinal-decompression': 'wervelkolom-decompressie',
  'sports-massage': 'sportmassage',
  'postural-assessment': 'houdingsanalyse',
  'dry-needling': 'dry-needling',
};

/** Content slug mappings: EN slug → NL slug */
export const conditionSlugs: Record<string, string> = {
  'lower-back-pain': 'lage-rugpijn',
  'neck-pain': 'nekpijn',
  'sciatica': 'ischias',
  'herniated-disc': 'hernia',
};
