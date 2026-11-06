import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { getPublicSiteOrigin } from './scripts/site-origin.mjs';

const site = getPublicSiteOrigin();
/** Keep Vite `import.meta.env.PUBLIC_SITE_ORIGIN` aligned with deploy host (CF_PAGES_URL wins over a stale dashboard value). */
process.env.PUBLIC_SITE_ORIGIN = site;

export default defineConfig({
  site,
  // Dev URL: http://localhost:5555/ (override: `PORT=8080 npm run dev`)
  server: {
    host: true,
    port: Number(process.env.PORT) || 5555,
  },
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/cod-cheats/',
    '/cheats/lite/': '/products/cod-cheats/',
    '/cheats/pro/': '/products/cod-cheats/',
    '/cheats/elite/': '/products/cod-cheats/elite/',
    '/cheats/compare/': '/blog/mw4-lite-vs-pro/',
    '/contact/': '/support/',
    '/products/cod-cheats/hwid-spoofer/': '/products/cod-cheats/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    // Let Astro externalize larger CSS so HTML parses faster; small critical CSS may still inline.
    inlineStylesheets: 'auto',
  },
});
