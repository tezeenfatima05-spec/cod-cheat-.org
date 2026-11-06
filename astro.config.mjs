import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { getPublicSiteOrigin } from './scripts/site-origin.mjs';

const site = getPublicSiteOrigin();
if (!process.env.PUBLIC_SITE_ORIGIN) {
  process.env.PUBLIC_SITE_ORIGIN = site;
}

export default defineConfig({
  site,
  // Dev URL: http://localhost:5555/ — separate from common tooling / other games (override: `PORT=8080 npm run dev`)
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
    '/products/dota-2-cheats/': '/products/cod-cheats/',
    '/products/dota-2-cheats/lite/': '/products/cod-cheats/lite/',
    '/products/dota-2-cheats/pro/': '/products/cod-cheats/pro/',
    '/products/dota-2-cheats/elite/': '/products/cod-cheats/elite/',
    '/products/dota-2-cheats/utilities/': '/products/cod-cheats/utilities/',
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
    inlineStylesheets: 'always',
  },
});
