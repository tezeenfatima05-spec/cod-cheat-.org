/**
 * Must match `site` in astro.config.mjs (and PUBLIC_SITE_ORIGIN for Vite-injected client env).
 * Used by postbuild scripts that run in Node without Astro's env injection.
 *
 * Cloudflare Pages sets CF_PAGES_URL to the deployment URL (incl. *.workers.dev previews).
 */
export function getPublicSiteOrigin() {
  const trim = (v) => (typeof v === 'string' ? v.trim().replace(/\/$/, '') : '');
  const explicit = trim(process.env.PUBLIC_SITE_ORIGIN);
  if (explicit) return explicit;
  const cfPages = trim(process.env.CF_PAGES_URL);
  if (cfPages) return cfPages;
  const cfBranch = trim(process.env.CF_PAGES_BRANCH_URL);
  if (cfBranch) return cfBranch;
  return 'https://cod-cheat.org';
}
