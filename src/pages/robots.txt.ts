import type { APIRoute } from 'astro';
import { resolveDocumentOrigin } from '../config/seo';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = resolveDocumentOrigin(site);
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
