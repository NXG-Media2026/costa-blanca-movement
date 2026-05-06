/**
 * Centralized analytics utility.
 * All tracking goes through window.trackEvent() on the client.
 * Dev: console.log. Prod: GA4 gtag(). No GA4 loaded: silent no-op.
 */

// --- Type definitions (used by components for type-safe onclick attributes) ---

/** Standard event names. Components reference these as string literals in onclick handlers. */
export type EventName =
  | 'phone_click'
  | 'whatsapp_click'
  | 'form_submit'
  | 'appointment_click'
  | 'route_click'
  | 'faq_expand'
  | 'review_cta_click'
  | 'treatment_cta_click'
  | 'language_switch';

export type PageType =
  | 'homepage'
  | 'treatment'
  | 'condition'
  | 'location'
  | 'faq'
  | 'reviews'
  | 'contact'
  | 'about'
  | 'guide'
  | 'dashboard'
  | 'page';

export type CTALocation =
  | 'hero'
  | 'sticky_mobile'
  | 'inline'
  | 'footer'
  | 'sidebar'
  | 'treatment_bottom'
  | 'header';

export interface EventProperties {
  page_type: PageType;
  page_slug: string;
  locale: string;
  cta_location?: CTALocation;
}

// --- Script generators (used by BaseLayout at build time) ---

/**
 * Inline script that defines window.trackEvent().
 * Dev: logs to console. Prod: forwards to GA4 gtag().
 * If gtag is not loaded, the call is a silent no-op.
 */
export function getTrackingScript(): string {
  return [
    'window.trackEvent=function(n,p){',
    "if(location.hostname==='localhost'||location.hostname==='127.0.0.1'){",
    "console.log('[Analytics]',n,p);return}",
    "if(typeof gtag==='function'){gtag('event',n,p)}",
    '};',
  ].join('');
}

/**
 * GA4 loader script tags. Returns empty string when no ID is configured,
 * so the site works 100% without analytics.
 */
export function getGA4Script(measurementId: string): string {
  if (!measurementId) return '';

  return (
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>` +
    '<script>window.dataLayer=window.dataLayer||[];' +
    'function gtag(){dataLayer.push(arguments)}' +
    "gtag('js',new Date());" +
    `gtag('config','${measurementId}');</script>`
  );
}

// --- Helper for building onclick attribute strings (used in .astro templates) ---

/**
 * Builds an onclick attribute value for tracking.
 * Usage in .astro template:
 *   onclick={trackOnClick('phone_click', { page_type: 'homepage', page_slug: '/', locale: 'en', cta_location: 'header' })}
 */
export function trackOnClick(name: EventName, props: EventProperties): string {
  return `trackEvent('${name}',${JSON.stringify(props)})`;
}
