import type { APIRoute } from 'astro';
import { getPublicSiteOrigin } from '../../scripts/site-origin.mjs';
import { SITE_URL } from '../config/site';

export const prerender = true;

const trim = (v: string | undefined) => (typeof v === 'string' ? v.trim().replace(/\/$/, '') : '');

export const GET: APIRoute = ({ site }) => {
  const origin = (trim(site?.toString()) || getPublicSiteOrigin()) as string;
  const legacy = trim(SITE_URL);
  const sitemapLines =
    legacy && legacy !== origin
      ? `Sitemap: ${origin}/sitemap.xml
Sitemap: ${legacy}/sitemap.xml`
      : `Sitemap: ${origin}/sitemap.xml`;
  const body = `User-agent: *
Allow: /

${sitemapLines}

# RSS: ${origin}/rss.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
