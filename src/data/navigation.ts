import type { Locale } from './site';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: Record<Locale, NavItem[]> = {
  en: [
    { label: 'Home', href: '/' },
    {
      label: 'Treatments',
      href: '/treatments',
      children: [
        { label: 'Spinal Decompression', href: '/treatments/spinal-decompression' },
        { label: 'Sports Massage', href: '/treatments/sports-massage' },
        { label: 'Postural Assessment', href: '/treatments/postural-assessment' },
        { label: 'Dry Needling', href: '/treatments/dry-needling' },
      ],
    },
    {
      label: 'Conditions',
      href: '/conditions',
      children: [
        { label: 'Lower Back Pain', href: '/conditions/lower-back-pain' },
        { label: 'Neck Pain', href: '/conditions/neck-pain' },
        { label: 'Sciatica', href: '/conditions/sciatica' },
        { label: 'Herniated Disc', href: '/conditions/herniated-disc' },
      ],
    },
    { label: 'Locations', href: '/locations' },
    { label: 'About', href: '/about' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  nl: [
    { label: 'Home', href: '/nl' },
    {
      label: 'Behandelingen',
      href: '/nl/behandelingen',
      children: [
        { label: 'Wervelkolom Decompressie', href: '/nl/behandelingen/wervelkolom-decompressie' },
        { label: 'Sportmassage', href: '/nl/behandelingen/sportmassage' },
      ],
    },
    {
      label: 'Klachten',
      href: '/nl/klachten',
      children: [
        { label: 'Lage Rugpijn', href: '/nl/klachten/lage-rugpijn' },
      ],
    },
    { label: 'Locaties', href: '/nl/locaties/torrevieja' },
    { label: 'FAQ', href: '/nl/faq' },
    { label: 'Contact', href: '/nl/contact' },
  ],
};
