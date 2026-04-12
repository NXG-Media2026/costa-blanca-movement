import { ui, type UIKey } from './ui';
import { routeSegments, treatmentSlugs, conditionSlugs } from './routes';
import type { Locale } from '../data/site';

/** Detect locale from URL path. /nl/... = 'nl', everything else = 'en'. */
export function getLocaleFromPath(path: string): Locale {
  return path.startsWith('/nl') ? 'nl' : 'en';
}

/** Get translated UI string. Falls back to EN if key missing in target locale. */
export function t(key: UIKey, locale: Locale): string {
  return ui[locale]?.[key] ?? ui.en[key] ?? key;
}

/**
 * Translate a URL path to the target locale.
 * Handles both route segments and content slugs.
 *
 * Examples:
 *   '/treatments/spinal-decompression' → '/nl/behandelingen/wervelkolom-decompressie'
 *   '/nl/klachten/lage-rugpijn'        → '/conditions/lower-back-pain'
 */
export function getTranslatedPath(path: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPath(path);
  if (currentLocale === targetLocale) return path;

  // Strip /nl prefix to get clean path
  let cleanPath = path.replace(/^\/nl/, '') || '/';

  if (targetLocale === 'nl') {
    cleanPath = translateSegments(cleanPath, 'en', 'nl');
    return cleanPath === '/' ? '/nl' : `/nl${cleanPath}`;
  } else {
    return translateSegments(cleanPath, 'nl', 'en') || '/';
  }
}

function translateSegments(path: string, fromLocale: string, toLocale: string): string {
  let translated = path;

  // Translate route segments (treatments → behandelingen, etc.)
  const fromSegments = routeSegments[fromLocale];
  const toSegments = routeSegments[toLocale];

  for (const [key, fromValue] of Object.entries(fromSegments)) {
    const toValue = toSegments[key];
    if (fromValue && toValue && fromValue !== toValue) {
      translated = translated.replace(`/${fromValue}`, `/${toValue}`);
    }
  }

  // Translate content slugs (spinal-decompression → wervelkolom-decompressie, etc.)
  const slugMaps = [treatmentSlugs, conditionSlugs];
  for (const slugMap of slugMaps) {
    for (const [enSlug, nlSlug] of Object.entries(slugMap)) {
      if (fromLocale === 'en') {
        translated = translated.replace(`/${enSlug}`, `/${nlSlug}`);
      } else {
        translated = translated.replace(`/${nlSlug}`, `/${enSlug}`);
      }
    }
  }

  return translated;
}

/** Get the base path for a collection in a given locale. */
export function getCollectionBasePath(
  collection: 'treatments' | 'conditions' | 'locations',
  locale: Locale,
): string {
  const segment = routeSegments[locale][collection];
  return locale === 'en' ? `/${segment}` : `/nl/${segment}`;
}
