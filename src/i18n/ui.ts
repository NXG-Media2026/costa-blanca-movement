export const ui = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.treatments': 'Treatments',
    'nav.conditions': 'Conditions',
    'nav.locations': 'Locations',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    'nav.reviews': 'Reviews',
    'nav.privacy': 'Privacy Policy',

    // CTAs
    'cta.book': 'Book Appointment',
    'cta.call': 'Call Us',
    'cta.whatsapp': 'WhatsApp Us',
    'cta.directions': 'Get Directions',
    'cta.learnMore': 'Learn More',
    'cta.viewAll': 'View All',
    'cta.backToOverview': 'Back to Overview',

    // Reviews
    'review.cta': 'Share Your Experience',
    'review.heading': 'What Our Patients Say',
    'review.leaveReview': 'Leave a Review',

    // FAQ
    'faq.heading': 'Frequently Asked Questions',

    // Treatment pages
    'treatment.whatIs': 'What is',
    'treatment.duration': 'Duration',
    'treatment.price': 'Price',
    'treatment.relatedConditions': 'Conditions We Treat',
    'treatment.allTreatments': 'All Treatments',

    // Condition pages
    'condition.whatIs': 'What is',
    'condition.symptoms': 'Symptoms',
    'condition.causes': 'Common Causes',
    'condition.whenToSeekHelp': 'When to Seek Help',
    'condition.relatedTreatments': 'Treatment Options',
    'condition.allConditions': 'All Conditions',

    // Location pages
    'location.openingHours': 'Opening Hours',
    'location.address': 'Address',
    'location.phone': 'Phone',
    'location.servingArea': 'Serving the',
    'location.distanceFromClinic': 'Distance from clinic',
    'location.bookAtClinic': 'Book an appointment at our clinic in Altea',

    // General
    'general.readMore': 'Read More',
    'general.close': 'Close',
    'general.menu': 'Menu',
    'general.language': 'Language',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',

    // Breadcrumbs
    'breadcrumb.home': 'Home',
    'breadcrumb.treatments': 'Treatments',
    'breadcrumb.conditions': 'Conditions',
    'breadcrumb.locations': 'Locations',

    // Trust bar
    'trust.experience': 'Years Experience',
    'trust.patients': 'Patients Treated',
    'trust.rating': 'Google Rating',
  },
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.treatments': 'Behandelingen',
    'nav.conditions': 'Klachten',
    'nav.locations': 'Locaties',
    'nav.about': 'Over Ons',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    'nav.reviews': 'Reviews',
    'nav.privacy': 'Privacybeleid',

    // CTAs
    'cta.book': 'Afspraak Maken',
    'cta.call': 'Bel Ons',
    'cta.whatsapp': 'WhatsApp Ons',
    'cta.directions': 'Route Plannen',
    'cta.learnMore': 'Meer Info',
    'cta.viewAll': 'Bekijk Alles',
    'cta.backToOverview': 'Terug naar Overzicht',

    // Reviews
    'review.cta': 'Deel Je Ervaring',
    'review.heading': 'Wat Onze Patiënten Zeggen',
    'review.leaveReview': 'Schrijf een Review',

    // FAQ
    'faq.heading': 'Veelgestelde Vragen',

    // Treatment pages
    'treatment.whatIs': 'Wat is',
    'treatment.duration': 'Duur',
    'treatment.price': 'Prijs',
    'treatment.relatedConditions': 'Klachten Die Wij Behandelen',
    'treatment.allTreatments': 'Alle Behandelingen',

    // Condition pages
    'condition.whatIs': 'Wat is',
    'condition.symptoms': 'Symptomen',
    'condition.causes': 'Veelvoorkomende Oorzaken',
    'condition.whenToSeekHelp': 'Wanneer Hulp Zoeken',
    'condition.relatedTreatments': 'Behandelopties',
    'condition.allConditions': 'Alle Klachten',

    // Location pages
    'location.openingHours': 'Openingstijden',
    'location.address': 'Adres',
    'location.phone': 'Telefoon',
    'location.servingArea': 'Werkgebied',
    'location.distanceFromClinic': 'Afstand tot kliniek',
    'location.bookAtClinic': 'Maak een afspraak in onze kliniek in Altea',

    // General
    'general.readMore': 'Lees Meer',
    'general.close': 'Sluiten',
    'general.menu': 'Menu',
    'general.language': 'Taal',

    // Footer
    'footer.rights': 'Alle rechten voorbehouden',
    'footer.privacy': 'Privacybeleid',

    // Breadcrumbs
    'breadcrumb.home': 'Home',
    'breadcrumb.treatments': 'Behandelingen',
    'breadcrumb.conditions': 'Klachten',
    'breadcrumb.locations': 'Locaties',

    // Trust bar
    'trust.experience': 'Jaar Ervaring',
    'trust.patients': 'Patiënten Behandeld',
    'trust.rating': 'Google Beoordeling',
  },
} as const;

export type UIKey = keyof typeof ui.en;
