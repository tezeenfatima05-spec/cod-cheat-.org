/**
 * Cloudflare Pages: when `cod-cheat.org` (or www) DNS still points at a parking page,
 * proxy crawl-critical XML assets from the live Workers deployment so auditors get HTTP 200 + correct Content-Type.
 *
 * @see https://developers.cloudflare.com/pages/functions/middleware/
 */
const LIVE_DEPLOY_ORIGIN = 'https://cod-cheat--org.tazeenrooziroti.workers.dev';

const PROXY_PATHS = new Set(['/sitemap.xml', '/sitemap-index.xml', '/sitemap-0.xml']);

function isMarketingHost(hostname) {
  return hostname === 'cod-cheat.org' || hostname === 'www.cod-cheat.org';
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (!isMarketingHost(url.hostname)) {
    return context.next();
  }
  if (!PROXY_PATHS.has(url.pathname)) {
    return context.next();
  }

  const target = `${LIVE_DEPLOY_ORIGIN}${url.pathname}${url.search}`;
  const ua = context.request.headers.get('User-Agent');
  const res = await fetch(target, {
    headers: {
      ...(ua ? { 'User-Agent': ua } : {}),
      Accept: 'application/xml, text/xml;q=0.9, */*;q=0.1',
    },
  });

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
}
