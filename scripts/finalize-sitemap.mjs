import fs from 'node:fs';
import path from 'node:path';
import { getDistRoot } from './dist-root.mjs';
import { getPublicSiteOrigin } from './site-origin.mjs';

const dist = getDistRoot();
const source = path.join(dist, 'sitemap-0.xml');

if (!fs.existsSync(source)) {
  console.error(`finalize-sitemap: ${path.relative(process.cwd(), source)} not found — run astro build first.`);
  process.exit(1);
}

let raw = fs.readFileSync(source, 'utf8');
const urlCount = (raw.match(/<url>/g) ?? []).length;

const trim = (v) => (typeof v === 'string' ? v.trim().replace(/\/$/, '') : '');
/** Prefer Cloudflare deploy host so `<loc>` matches live canonical (Workers) over a stale PUBLIC_SITE_ORIGIN. */
const origin =
  trim(process.env.CF_PAGES_URL) ||
  trim(process.env.CF_PAGES_BRANCH_URL) ||
  trim(process.env.CANONICAL_SITE_ORIGIN) ||
  trim(process.env.PUBLIC_SITE_ORIGIN) ||
  trim(process.env.SITEMAP_PUBLIC_ORIGIN) ||
  trim(getPublicSiteOrigin());
if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap-0.xml contains no URLs.');
  process.exit(1);
}

function formatUrlset(xml) {
  return xml
    .replace(/^<\?xml[^?]*\?>/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
    .replace(/<\/urlset>/, '\n</urlset>\n')
    .replace(/<url>/g, '  <url>\n')
    .replace(/<\/url>/g, '\n  </url>\n')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<\/loc>/g, '</loc>\n')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<\/lastmod>/g, '</lastmod>\n')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<\/changefreq>/g, '</changefreq>\n')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<\/priority>/g, '</priority>\n');
}

const candidateHosts = [
  'https://cod-cheat.org',
  'http://cod-cheat.org',
  'https://www.cod-cheat.org',
  'http://www.cod-cheat.org',
  'https://cod-cheat--org.tazeenrooziroti.workers.dev',
  'http://cod-cheat--org.tazeenrooziroti.workers.dev',
  trim(process.env.CF_PAGES_URL),
  trim(process.env.CF_PAGES_BRANCH_URL),
  trim(getPublicSiteOrigin()),
].filter(Boolean);

function rewriteOrigin(xml, targetOrigin) {
  let out = xml;
  for (const h of candidateHosts) {
    if (h && h !== targetOrigin) out = out.split(h).join(targetOrigin);
  }
  return out;
}

const formattedDist = rewriteOrigin(raw, origin);
const formatted = formatUrlset(formattedDist);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), formatted, 'utf8');

const publicDir = path.join(process.cwd(), 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), formatted, 'utf8');

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${origin}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(dist, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), formatted, 'utf8');

console.log(`Sitemap finalized: ${urlCount} URLs → ${path.relative(process.cwd(), path.join(dist, 'sitemap.xml'))}`);
