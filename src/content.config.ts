import { defineCollection, z } from 'astro:content';

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const treatments = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pageSlug: z.string(),
    lang: z.enum(['en', 'nl']),
    translationSlug: z.string().optional(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    ogImage: z.string().optional(),
    definition: z.string(),
    heroImage: z.string().optional(),
    duration: z.string(),
    price: z.string().optional(),
    icon: z.string().optional(),
    relatedConditions: z.array(z.string()).default([]),
    faq: z.array(faqItem).default([]),
    order: z.number().optional(),
  }),
});

const conditions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pageSlug: z.string(),
    lang: z.enum(['en', 'nl']),
    translationSlug: z.string().optional(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    ogImage: z.string().optional(),
    definition: z.string(),
    heroImage: z.string().optional(),
    symptoms: z.array(z.string()).default([]),
    causes: z.array(z.string()).default([]),
    whenToSeekHelp: z.string().optional(),
    relatedTreatments: z.array(z.string()).default([]),
    faq: z.array(faqItem).default([]),
    order: z.number().optional(),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pageSlug: z.string(),
    lang: z.enum(['en', 'nl']),
    translationSlug: z.string().optional(),
    date: z.string(),
    updatedDate: z.string().optional(),
    excerpt: z.string(),
    category: z.enum(['Treatment', 'Prevention', 'Recovery', 'Patient Guide']),
    author: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    ogImage: z.string().optional(),
    relatedTreatments: z.array(z.string()).default([]),
    relatedConditions: z.array(z.string()).default([]),
  }),
});

export const collections = { treatments, conditions, guides };
