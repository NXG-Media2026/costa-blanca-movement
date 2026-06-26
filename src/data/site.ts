export const siteConfig = {
  name: 'Costa Blanca Movement Centre',
  shortName: 'Costa Blanca Movement', // Used in <title> tags to stay under 60-char SEO limit
  tagline: 'Expert spine & mobility care for the expat community',
  url: 'https://costablancamovement.com', // Per client: cruciaal voor canonicals, hreflang en sitemap
  defaultLocale: 'en' as const,
  locales: ['en', 'nl'] as const,

  // Analytics — per client. Empty string = feature disabled.
  analytics: {
    ga4MeasurementId: 'G-Z9SLJYNE4T',
    gscVerificationId: '', // Per client: Google Search Console HTML tag verification
  },

  // Contact (single source of truth for all NAP data)
  phone: '+34 XXX XXX XXX',
  phoneDisplay: '+34 XXX XXX XXX',
  email: 'info@costablancamovement.com',
  whatsappNumber: '34XXXXXXXXX',
  whatsappUrl: 'https://wa.me/34XXXXXXXXX?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment',

  // Primary location (Torrevieja)
  address: {
    street: 'Calle Example 123',
    city: 'Torrevieja',
    province: 'Alicante',
    postalCode: '03181',
    country: 'Spain',
    countryCode: 'ES',
  },
  geo: {
    latitude: 37.9786,
    longitude: -0.6823,
  },
  googleMapsUrl: 'https://maps.google.com/?q=Costa+Blanca+Movement+Centre+Torrevieja',
  googleMapsEmbed: '',

  // Opening hours (display format)
  openingHours: [
    { days: 'Monday–Friday', hours: '9:00–18:00' },
    { days: 'Saturday', hours: '9:00–13:00' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  // Schema.org format
  openingHoursSpecification: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { dayOfWeek: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],

  // Social profiles — per client. Empty string = hide.
  // Used in Footer (icon links) and Organization schema sameAs (entity coupling for AI/Google).
  socials: {
    google: '', // Google Business Profile URL — also used as review link
    instagram: 'https://instagram.com/costablancamovement',
    facebook: 'https://facebook.com/costablancamovement',
    linkedin: 'https://linkedin.com/company/costablancamovement',
    youtube: '', // empty = niet gebruiken
  },

  // Locations and service areas
  serviceAreas: [
    { name: 'Torrevieja', slug: 'torrevieja', type: 'primary' as const, distanceFromClinic: null },
    { name: 'Orihuela Costa', slug: 'orihuela-costa', type: 'service-area' as const, distanceFromClinic: '15 min drive' },
    { name: 'Guardamar del Segura', slug: 'guardamar-del-segura', type: 'service-area' as const, distanceFromClinic: '15 min drive' },
    { name: 'Pilar de la Horadada', slug: 'pilar-de-la-horadada', type: 'service-area' as const, distanceFromClinic: '20 min drive' },
  ],

  // Clinic-level trust signals — surfaced on /credentials page (E-E-A-T for clinic entity).
  // Per client: replace with actual registrations, partner insurers, and certifications.
  clinicCredentials: {
    registrations: [
      { name: 'Registro de Centros Sanitarios — Comunidad Valenciana', detail: 'Officially registered healthcare facility', registryId: 'CV-XXXX/2024' },
      { name: 'Colegio Oficial de Quiroprácticos de la Comunidad Valenciana', detail: 'Professional chiropractic association — clinic registration' },
    ],
    insurers: [
      'Cigna Global', 'Allianz Care', 'AXA International', 'Bupa Global',
      'IMG Europe', 'DKV Seguros', 'Sanitas', 'ASISA',
    ],
    certifications: [
      { name: 'Hygiene & Infection Control Protocol', detail: 'Annually audited per Spanish Ministry of Health guidelines' },
      { name: 'Medical Equipment Calibration', detail: 'Spinal decompression unit serviced and calibrated every 6 months' },
      { name: 'GDPR Compliant Data Handling', detail: 'Patient records stored in EU-hosted, encrypted systems' },
    ],
    continuingEducation: 'Our clinical team commits to a minimum of 30 hours of continuing professional development per year, with annual attendance at international spine, sports therapy, and rehabilitation conferences.',
  },

  // Medical content review — date the clinical lead last reviewed treatment/condition pages.
  // Used in "Medically reviewed by …" bylines on health pages (E-E-A-T signal).
  // Per client: update on each editorial review cycle (Google Helpful Content best practice).
  medicalContentReview: {
    reviewerSlug: 'dr-james-mitchell', // Must match a team[].slug below
    lastReviewedDate: '2026-04-10',
  },

  // Team members
  team: [
    {
      slug: 'dr-james-mitchell', // Used as anchor on /about and href in schema
      name: 'Dr. James Mitchell',
      role: 'Chiropractor & Movement Specialist',
      bio: 'With over 15 years of experience in spinal health and mobility, Dr. Mitchell specializes in non-surgical treatments for back pain, sports injuries, and postural correction.',
      // Longer description — used in Person schema. Per client: write 2-3 sentences.
      description: 'Dr. James Mitchell is a clinically experienced chiropractor with a focus on non-surgical spine and mobility care. He combines manual therapy, motorised spinal decompression, and rehabilitation programming to treat chronic back pain, sciatica, and postural disorders in the international expat community of the Costa Blanca.',
      // Legacy flat list — kept for component backward compatibility
      qualifications: [
        'Doctor of Chiropractic (DC)',
        'Certified Spinal Decompression Specialist',
        'Sports Rehabilitation Diploma',
      ],
      // Structured credentials — used for Person.hasCredential and About page detail
      credentials: [
        { name: 'Doctor of Chiropractic (DC)', issuer: 'Anglo-European College of Chiropractic', year: 2009 },
        { name: 'Certified Spinal Decompression Specialist', issuer: 'International Disc Education Association', year: 2014 },
        { name: 'Sports Rehabilitation Diploma', issuer: 'British Chiropractic Sports Association', year: 2012 },
      ],
      // Education — used for Person.alumniOf
      education: [
        { institution: 'Anglo-European College of Chiropractic', degree: 'Doctor of Chiropractic (MChiro)', year: 2009 },
        { institution: 'University of Bristol', degree: 'BSc Human Anatomy & Physiology', year: 2005 },
      ],
      // Languages — used for Person.knowsLanguage (BCP-47 codes preferred for schema)
      languages: ['English', 'Spanish', 'Dutch (basic)'],
      // Professional memberships — placeholders, replace per client
      memberships: [
        'General Chiropractic Council (UK) — registered',
        'Asociación Española de Quiroprácticos (AEQ)',
        'European Chiropractors\' Union',
      ],
      // Publications/talks — placeholders, replace per client
      publications: [
        'Speaker, Costa Blanca Health Forum 2025: "Non-surgical management of lumbar disc herniation"',
      ],
      // Add real team photos per client. Empty string falls back to CSS initials avatar.
      image: '',
    },
    {
      slug: 'laura-van-den-berg',
      name: 'Laura van den Berg',
      role: 'Sports Massage Therapist',
      bio: 'Laura brings 8 years of hands-on experience in sports massage and myofascial release therapy, helping athletes and active adults recover faster and move better.',
      description: 'Laura van den Berg is a sports massage therapist specialising in deep-tissue work, myofascial release, and dry needling. She works with cyclists, runners, and active expats across the Costa Blanca to resolve muscular pain, reduce injury risk, and support performance.',
      qualifications: [
        'BSc Sports Therapy',
        'Certified Myofascial Release Practitioner',
        'Dry Needling Certificate',
      ],
      credentials: [
        { name: 'BSc (Hons) Sports Therapy', issuer: 'St Mary\'s University Twickenham', year: 2016 },
        { name: 'Certified Myofascial Release Practitioner', issuer: 'John F. Barnes Myofascial Release Approach', year: 2019 },
        { name: 'Dry Needling Certificate', issuer: 'European Dry Needling Institute', year: 2021 },
      ],
      education: [
        { institution: 'St Mary\'s University Twickenham', degree: 'BSc (Hons) Sports Therapy', year: 2016 },
        { institution: 'Hogeschool van Amsterdam', degree: 'Foundation in Physiotherapy', year: 2013 },
      ],
      languages: ['Dutch', 'English', 'Spanish'],
      memberships: [
        'Society of Sports Therapists (UK)',
        'Koninklijk Nederlands Genootschap voor Fysiotherapie (KNGF)',
      ],
      publications: [],
      image: '',
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type Locale = (typeof siteConfig.locales)[number];
