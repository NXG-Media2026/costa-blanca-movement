import { siteConfig } from './site';

function baseAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.province,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  };
}

function baseGeo() {
  return {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  };
}

function baseOpeningHours() {
  return siteConfig.openingHoursSpecification.map((spec) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: spec.dayOfWeek,
    opens: spec.opens,
    closes: spec.closes,
  }));
}

/**
 * LocalBusiness — used on most pages.
 * For service area pages, pass the area to add areaServed.
 */
export function generateLocalBusiness(serviceArea?: { name: string }) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: baseAddress(),
    geo: baseGeo(),
    openingHoursSpecification: baseOpeningHours(),
  };

  if (serviceArea) {
    schema.areaServed = {
      '@type': 'City',
      name: serviceArea.name,
    };
  }

  return JSON.stringify(schema);
}

/**
 * MedicalBusiness — homepage.
 * Extends LocalBusiness; includes full NAP + all service areas.
 */
export function generateMedicalBusiness() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: baseAddress(),
    geo: baseGeo(),
    openingHoursSpecification: baseOpeningHours(),
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area.name,
    })),
  });
}

/** BreadcrumbList — auto-generated on every page except homepage. */
export function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

/** FAQPage — for pages with FAQ sections. */
export function generateFAQPage(faqs: Array<{ q: string; a: string }>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  });
}

/** Service — for treatment pages. */
export function generateService(treatment: {
  name: string;
  description: string;
  url: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: treatment.name,
    description: treatment.description,
    url: treatment.url,
    provider: {
      '@type': 'MedicalBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  });
}

/** MedicalCondition — for condition pages. */
export function generateMedicalCondition(condition: {
  name: string;
  description: string;
  url: string;
  symptoms?: string[];
  causes?: string[];
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: condition.name,
    description: condition.description,
    url: condition.url,
  };

  if (condition.symptoms?.length) {
    schema.signOrSymptom = condition.symptoms.map((s) => ({
      '@type': 'MedicalSignOrSymptom',
      name: s,
    }));
  }

  if (condition.causes?.length) {
    schema.cause = condition.causes.map((c) => ({
      '@type': 'MedicalCause',
      name: c,
    }));
  }

  return JSON.stringify(schema);
}

/** AggregateRating — for reviews page. */
export function generateAggregateRating(rating: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    address: baseAddress(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
      bestRating: rating.bestRating ?? 5,
      worstRating: 1,
    },
  });
}

/**
 * Place — for location pages.
 * Main clinic: full address, geo, map link.
 * Service areas: locality-level address only.
 */
export function generatePlace(location: {
  name: string;
  type: 'primary' | 'service-area';
  locality?: string;
}) {
  if (location.type === 'primary') {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: `${siteConfig.name} — ${siteConfig.address.city}`,
      address: baseAddress(),
      geo: baseGeo(),
      hasMap: siteConfig.googleMapsUrl,
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: location.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.locality ?? location.name,
      addressRegion: siteConfig.address.province,
      addressCountry: siteConfig.address.countryCode,
    },
  });
}

/** Article/BlogPosting — for guide pages. */
export function generateArticle(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'MedicalBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  });
}

/** Person — for team members (E-E-A-T). */
export function generatePerson(member: {
  name: string;
  role: string;
  qualifications: string[];
  image?: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      '@type': 'MedicalBusiness',
      name: siteConfig.name,
    },
    hasCredential: member.qualifications.map((q) => ({
      '@type': 'EducationalOccupationalCredential',
      name: q,
    })),
    ...(member.image && { image: member.image }),
  });
}
