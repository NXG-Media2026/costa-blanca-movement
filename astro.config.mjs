import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://costablancamovement.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/visibility'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', nl: 'nl' },
      },
    }),
  ],
});
