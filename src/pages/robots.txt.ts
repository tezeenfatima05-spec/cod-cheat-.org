import type { APIRoute } from 'astro';
import { getPublicSiteOrigin } from '../../scripts/site-origin.mjs';

export const prerender = true;

const trim = (v: string | undefined) => (typeof v === 'string' ? v.trim().replace(/\/$/, '') : '');

export const GET: APIRoute = ({ site }) => {
  const origin = (trim(site?.toString()) || getPublicSiteOrigin()) as string;
  const body = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml

# RSS: ${origin}/rss.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
