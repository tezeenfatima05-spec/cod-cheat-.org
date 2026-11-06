export const SITE_DOMAIN = 'cod-cheat.org';
export const SITE_BRAND = 'COD Cheats';
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const PRODUCT_BASE = '/products/cod-cheats/';
export const TITLE_PREFIX = 'COD Cheats & MW4';
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;

/** Central media paths (responsive srcSet expects raster stems under public/). */
export const SITE_ASSETS = {
  logo: '/images/mw4/logo.webp',
  /** Optional hero background video (WebM/MP4). Leave empty to use the image slider only. */
  heroVideo: '',
  heroPoster: '/images/mw4/hero-poster.webp',
  ogImage: '/images/mw4/hero-poster.webp',
  screenshots: [
    '/images/mw4/screenshot-1.webp',
    '/images/mw4/screenshot-2.webp',
    '/images/mw4/screenshot-3.webp',
    '/images/mw4/screenshot-4.webp',
    '/images/mw4/screenshot-5.webp',
    '/images/mw4/screenshot-6.webp',
    '/images/mw4/screenshot-7.webp',
  ],
} as const;
