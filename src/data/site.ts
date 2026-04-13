export const siteConfig = {
  name: 'Costa Blanca Movement Centre',
  tagline: 'Expert spine & mobility care for the expat community',
  url: 'https://costablancamovement.com',
  defaultLocale: 'en' as const,
  locales: ['en', 'nl'] as const,

  // GA4 — leave empty to disable tracking
  ga4MeasurementId: '',

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

  // Social profiles
  social: {
    google: '',
    facebook: '',
    instagram: '',
  },

  // Locations and service areas
  serviceAreas: [
    { name: 'Torrevieja', slug: 'torrevieja', type: 'primary' as const, distanceFromClinic: null },
    { name: 'Orihuela Costa', slug: 'orihuela-costa', type: 'service-area' as const, distanceFromClinic: '15 min drive' },
    { name: 'Guardamar del Segura', slug: 'guardamar-del-segura', type: 'service-area' as const, distanceFromClinic: '15 min drive' },
    { name: 'Pilar de la Horadada', slug: 'pilar-de-la-horadada', type: 'service-area' as const, distanceFromClinic: '20 min drive' },
  ],

  // Team members
  team: [
    {
      name: 'Dr. James Mitchell',
      role: 'Chiropractor & Movement Specialist',
      bio: 'With over 15 years of experience in spinal health and mobility, Dr. Mitchell specializes in non-surgical treatments for back pain, sports injuries, and postural correction.',
      qualifications: [
        'Doctor of Chiropractic (DC)',
        'Certified Spinal Decompression Specialist',
        'Sports Rehabilitation Diploma',
      ],
      image: '/images/team/placeholder-1.jpg',
    },
    {
      name: 'Laura van den Berg',
      role: 'Sports Massage Therapist',
      bio: 'Laura brings 8 years of hands-on experience in sports massage and myofascial release therapy, helping athletes and active adults recover faster and move better.',
      qualifications: [
        'BSc Sports Therapy',
        'Certified Myofascial Release Practitioner',
        'Dry Needling Certificate',
      ],
      image: '/images/team/placeholder-2.jpg',
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type Locale = (typeof siteConfig.locales)[number];
