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

const origin = getPublicSiteOrigin();
/** Rewrite <loc> bases if Astro emitted a different deploy host (e.g. first build used prod URL). */
const hostsToRewrite = [
  'https://cod-cheat.org',
  'http://cod-cheat.org',
  'https://www.cod-cheat.org',
  'http://www.cod-cheat.org',
];
for (const h of hostsToRewrite) {
  if (h !== origin) raw = raw.split(h).join(origin);
}

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

const formatted = formatUrlset(raw);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), formatted, 'utf8');

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${origin}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(dist, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), formatted, 'utf8');

console.log(`Sitemap finalized: ${urlCount} URLs → ${path.relative(process.cwd(), path.join(dist, 'sitemap.xml'))}`);
