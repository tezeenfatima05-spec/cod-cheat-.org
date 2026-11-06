/**
 * Must match `site` in astro.config.mjs (and PUBLIC_SITE_ORIGIN for Vite-injected client env).
 * Used by postbuild scripts that run in Node without Astro's env injection.
 *
 * Cloudflare Pages sets CF_PAGES_URL to the deployment URL (incl. *.workers.dev previews).
 */

/** Live deploy host for sitemaps/canonicals when apex env still points at marketing DNS. */
export const WORKERS_SITE_ORIGIN = 'https://cod-cheat--org.tazeenrooziroti.workers.dev';

function marketingApexHostname(hostname) {
  return hostname === 'cod-cheat.org' || hostname === 'www.cod-cheat.org';
}

/** If `origin` is only the marketing domain (no live Astro build there), use Workers deploy URLs in XML/SEO. */
export function preferWorkersSiteOrigin(origin) {
  if (!origin) return WORKERS_SITE_ORIGIN;
  try {
    const { hostname } = new URL(origin);
    if (marketingApexHostname(hostname)) return WORKERS_SITE_ORIGIN;
  } catch {
    /* ignore */
  }
  return origin;
}

export function getPublicSiteOrigin() {
  const trim = (v) => (typeof v === 'string' ? v.trim().replace(/\/$/, '') : '');
  /** Same preference order as `scripts/finalize-sitemap.mjs` so canonical/hreflang match `<loc>` URLs. */
  const raw = (
    trim(process.env.CF_PAGES_URL) ||
    trim(process.env.CF_PAGES_BRANCH_URL) ||
    trim(process.env.CANONICAL_SITE_ORIGIN) ||
    trim(process.env.PUBLIC_SITE_ORIGIN) ||
    trim(process.env.SITEMAP_PUBLIC_ORIGIN) ||
    WORKERS_SITE_ORIGIN
  );
  return preferWorkersSiteOrigin(raw);
}
