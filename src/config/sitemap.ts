import type { SitemapItem } from '@astrojs/sitemap';
import { blogPosts } from '../data/blog';
import { parseBlogDate } from '../utils/schema';

const buildDate = new Date().toISOString();

/** Same locales as `BaseLayout` `<link rel="alternate" hreflang>` — sitemap `xhtml:link` mirrors page-level signals. */
const HREFLANG_ALTERNATES: { lang: string; hreflang: string }[] = [
  { lang: 'en', hreflang: 'en' },
  { lang: 'en-US', hreflang: 'en-US' },
  { lang: 'en-GB', hreflang: 'en-GB' },
  { lang: 'en-CA', hreflang: 'en-CA' },
  { lang: 'en-AU', hreflang: 'en-AU' },
  { lang: 'en-NZ', hreflang: 'en-NZ' },
  { lang: 'en-IN', hreflang: 'en-IN' },
  { lang: 'en-SG', hreflang: 'en-SG' },
  { lang: 'en-IE', hreflang: 'en-IE' },
  { lang: 'en-ZA', hreflang: 'en-ZA' },
  { lang: 'x-default', hreflang: 'x-default' },
];

const blogLastmod = new Map(
  blogPosts.map((post) => [`/blog/${post.slug}/`, parseBlogDate(post.date)] as const),
);

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);

  if (path.includes('/404') || path.includes('/rss.xml')) {
    return undefined;
  }

  const pageUrl = item.url;
  item.links = HREFLANG_ALTERNATES.map(({ lang, hreflang }) => ({
    lang,
    hreflang,
    url: pageUrl,
  }));

  if (path.startsWith('/go/')) {
    item.priority = 0.3;
    item.changefreq = 'monthly';
    return item;
  }

  item.lastmod = buildDate;

  if (path === '/') {
    item.priority = 1;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/blog/') {
    item.priority = 0.9;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/forum/') {
    item.priority = 0.8;
    item.changefreq = 'daily';
    return item;
  }

  if (path.startsWith('/forum/')) {
    item.priority = 0.6;
    item.changefreq = 'weekly';
    return item;
  }

  if (path.startsWith('/blog/')) {
    item.priority = 0.7;
    item.changefreq = 'monthly';
    item.lastmod = blogLastmod.get(path) ?? buildDate;
    return item;
  }

  if (path.startsWith('/products/')) {
    item.priority = 0.8;
    item.changefreq = 'weekly';
    return item;
  }

  if (
    path === '/about/' ||
    path === '/support/' ||
    path === '/privacy/' ||
    path === '/terms/' ||
    path === '/faq/'
  ) {
    item.priority = 0.5;
    item.changefreq = 'yearly';
    return item;
  }

  item.priority = 0.6;
  item.changefreq = 'monthly';
  return item;
}
