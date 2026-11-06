import { t } from '../i18n';
import { SITE_ASSETS, SITE_DOMAIN as INDEXNOW_HOST_NAME } from './site';
import { getPageSeoEntry } from './pageSeo';

/**
 * Canonical origin for OG URLs, hreflang, and JSON-LD — mirrors `site` in astro.config.mjs
 * (`import.meta.env.SITE` is set from that value at build time).
 */
export const SITE_ORIGIN = (
  typeof import.meta.env.SITE === 'string'
    ? import.meta.env.SITE.replace(/\/$/, '')
    : (import.meta.env.PUBLIC_SITE_ORIGIN?.replace(/\/$/, '') ?? `https://${t.site.domain}`)
) as string;

export const DEFAULT_OG_IMAGE = SITE_ASSETS.ogImage;

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

/** @example @codcheats */
export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Comma-separated profile URLs (X, YouTube, etc.) for Organization sameAs. */
export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

const trimOrigin = (v: unknown) => (typeof v === 'string' ? v.trim().replace(/\/$/, '') : '');

function nodeEnv(key: string): string {
  try {
    return trimOrigin(typeof process !== 'undefined' && process.env ? process.env[key] : '');
  } catch {
    return '';
  }
}

/**
 * Canonical / hreflang origin: prefer Cloudflare / deploy URLs over a stale PUBLIC_SITE_ORIGIN,
 * then `site` from astro.config, so crawlers on *.workers.dev get self-canonicals that match the live host.
 */
export function resolveDocumentOrigin(site: URL | string | undefined): string {
  const fromConfig = site ? String(site).replace(/\/$/, '') : '';
  return (
    nodeEnv('CF_PAGES_URL') ||
    nodeEnv('CF_PAGES_BRANCH_URL') ||
    nodeEnv('CANONICAL_SITE_ORIGIN') ||
    fromConfig ||
    trimOrigin(import.meta.env.PUBLIC_SITE_ORIGIN) ||
    trimOrigin(import.meta.env.SITEMAP_PUBLIC_ORIGIN) ||
    SITE_ORIGIN
  );
}

export function canonicalUrl(pathname: string, origin?: string): string {
  const raw = pathname || '/';
  const q = raw.indexOf('?');
  const h = raw.indexOf('#');
  let splitAt = -1;
  if (q >= 0 && h >= 0) splitAt = Math.min(q, h);
  else if (q >= 0) splitAt = q;
  else if (h >= 0) splitAt = h;
  const pathPart = splitAt >= 0 ? raw.slice(0, splitAt) : raw;
  const rest = splitAt >= 0 ? raw.slice(splitAt) : '';

  let path = pathPart;
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  const base = (origin ?? SITE_ORIGIN).replace(/\/$/, '');
  return `${base}${path}${rest}`;
}

/** Absolute URL for same-origin assets (OG/Twitter images, JSON-LD). Prefer `documentOrigin` so previews match canonical host. */
export function absoluteAssetUrl(path: string, documentOrigin?: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const base = (documentOrigin ?? SITE_ORIGIN).replace(/\/$/, '');
  return `${base}${normalized}`;
}

export function resolvePageSeo(pathname: string): { title: string; description: string } {
  const entry = getPageSeoEntry(pathname);
  if (entry) return entry;
  return { title: t.site.title, description: t.site.description };
}

export function pageTitle(keyword: string, brand: string = t.site.name, max = 60): string {
  const suffix = ` | ${brand}`;
  if (`${keyword}${suffix}`.length <= max) return `${keyword}${suffix}`;
  const trimmed = keyword.slice(0, Math.max(20, max - suffix.length - 1)).trim();
  return `${trimmed}${suffix}`;
}

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;
