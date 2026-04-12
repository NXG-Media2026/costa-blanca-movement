/**
 * Centralized analytics utility.
 * All tracking goes through window.trackEvent().
 * Works without GA4 — silent no-op when gtag is not loaded.
 */

export interface EventProperties {
  page_type: string;
  page_slug: string;
  locale: string;
  cta_location?: string;
}

/**
 * Returns inline script that defines window.trackEvent().
 * Included once in BaseLayout <head>.
 */
export function getTrackingScript(): string {
  return `window.trackEvent=function(n,p){if(location.hostname==='localhost'||location.hostname==='127.0.0.1'){console.log('[Analytics]',n,p);return}if(typeof gtag==='function'){gtag('event',n,p)}};`;
}

/**
 * Returns GA4 loader script tags.
 * Returns empty string if no measurement ID — site works 100% without it.
 */
export function getGA4Script(measurementId: string): string {
  if (!measurementId) return '';

  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}');</script>`;
}
