import type { APIRoute } from 'astro';

export const prerender = true;

const defaultOrigin = 'https://cod-cheat.org';

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.toString().replace(/\/$/, '') || defaultOrigin) as string;
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
