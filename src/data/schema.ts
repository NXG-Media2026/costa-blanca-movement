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

/** sameAs URLs — used for entity coupling in Google + AI knowledge graphs. */
function baseSameAs(): string[] {
  return Object.values(siteConfig.socials).filter((url): url is string => Boolean(url));
}

/**
 * LocalBusiness — used on most pages.
 * For service area pages, pass the area to add areaServed.
 */
export function generateLocalBusiness(serviceArea?: { name: string }) {
  const sameAs = baseSameAs();
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
    ...(sameAs.length > 0 && { sameAs }),
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
  const sameAs = baseSameAs();
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
    ...(sameAs.length > 0 && { sameAs }),
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

/**
 * Article / MedicalScholarlyArticle — for guide pages.
 * Use type 'MedicalScholarlyArticle' for clinically-focused content reviewed by a clinician.
 */
export function generateArticle(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorSlug?: string; // links to /about#<slug> as Person.url
  type?: 'Article' | 'BlogPosting' | 'MedicalScholarlyArticle';
  image?: string;
}) {
  const type = article.type ?? 'BlogPosting';
  const authorUrl = article.authorSlug
    ? `${siteConfig.url}/about#${article.authorSlug}`
    : undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    author: {
      '@type': 'Person',
      name: article.authorName,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/og/default.jpg`,
      },
    },
    ...(article.image && {
      image: article.image.startsWith('http') ? article.image : `${siteConfig.url}${article.image}`,
    }),
  });
}

/**
 * Person — full E-E-A-T schema for team members.
 * Used on /about (full team) and homepage (TeamPreview) so AI surfaces author identity.
 */
export function generatePerson(member: {
  slug?: string;
  name: string;
  role: string;
  description?: string;
  qualifications: readonly string[];
  credentials?: readonly { name: string; issuer: string; year?: number }[];
  education?: readonly { institution: string; degree: string; year?: number }[];
  languages?: readonly string[];
  memberships?: readonly string[];
  image?: string;
}) {
  const personUrl = member.slug ? `${siteConfig.url}/about#${member.slug}` : `${siteConfig.url}/about`;
  const fullImage = member.image
    ? (member.image.startsWith('http') ? member.image : `${siteConfig.url}${member.image}`)
    : undefined;

  // Prefer structured credentials when present; fall back to flat qualifications list
  const hasCredential = (member.credentials && member.credentials.length > 0)
    ? member.credentials.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        ...(c.issuer && {
          recognizedBy: { '@type': 'Organization', name: c.issuer },
        }),
        ...(c.year && { dateCreated: String(c.year) }),
      }))
    : member.qualifications.map((q) => ({
        '@type': 'EducationalOccupationalCredential',
        name: q,
      }));

  const alumniOf = member.education?.map((e) => ({
    '@type': 'EducationalOrganization',
    name: e.institution,
  })) ?? [];

  const memberOf = member.memberships?.map((m) => ({
    '@type': 'Organization',
    name: m,
  })) ?? [];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personUrl,
    name: member.name,
    url: personUrl,
    jobTitle: member.role,
    ...(member.description && { description: member.description }),
    worksFor: {
      '@type': 'MedicalBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasCredential,
    ...(alumniOf.length > 0 && { alumniOf }),
    ...(memberOf.length > 0 && { memberOf }),
    ...(member.languages && member.languages.length > 0 && { knowsLanguage: [...member.languages] }),
    ...(fullImage && { image: fullImage }),
  });
}
