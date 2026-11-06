/**
 * Must match `site` in astro.config.mjs (and PUBLIC_SITE_ORIGIN for Vite-injected client env).
 * Used by postbuild scripts that run in Node without Astro's env injection.
 *
 * Cloudflare Pages sets CF_PAGES_URL to the deployment URL (incl. *.workers.dev previews).
 */
export function getPublicSiteOrigin() {
  const trim = (v) => (typeof v === 'string' ? v.trim().replace(/\/$/, '') : '');
  /** Same preference order as `scripts/finalize-sitemap.mjs` so canonical/hreflang match `<loc>` URLs. */
  return (
    trim(process.env.CF_PAGES_URL) ||
    trim(process.env.CF_PAGES_BRANCH_URL) ||
    trim(process.env.CANONICAL_SITE_ORIGIN) ||
    trim(process.env.PUBLIC_SITE_ORIGIN) ||
    trim(process.env.SITEMAP_PUBLIC_ORIGIN) ||
    'https://cod-cheat.org'
  );
}
