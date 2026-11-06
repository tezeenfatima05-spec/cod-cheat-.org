import type { FaqItem } from '../i18n/types';
import { SITE_ASSETS, SITE_BRAND, SUPPORT_EMAIL } from '../config/site';
import { SITE_ORIGIN, absoluteAssetUrl, canonicalUrl, getOrganizationSameAs } from '../config/seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function siteRootId(origin?: string) {
  const base = (origin ?? SITE_ORIGIN).replace(/\/$/, '');
  return `${base}/`;
}

export function breadcrumbSchema(items: BreadcrumbItem[], origin?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path, origin),
    })),
  };
}

export function websiteSchema(origin?: string) {
  const base = (origin ?? SITE_ORIGIN).replace(/\/$/, '');
  const siteUrl = `${base}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': siteUrl,
    name: SITE_BRAND,
    url: siteUrl,
    inLanguage: 'en-US',
    description:
      'COD MW4 cheats for PC—aim assist, player ESP, trigger timing, radar, DMZ loot overlays, and stream-proof options.',
  };
}

/** Self-referencing WebPage for the homepage (matches document `<title>` / canonical). */
export function homeWebPageSchema(input: { name: string; description: string; origin?: string }) {
  const pageUrl = canonicalUrl('/', input.origin);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    name: input.name,
    description: input.description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': siteRootId(input.origin) },
  };
}

export function organizationSchema(origin?: string) {
  const sameAs = getOrganizationSameAs();
  const base = (origin ?? SITE_ORIGIN).replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_BRAND,
    url: `${base}/`,
    logo: absoluteAssetUrl(SITE_ASSETS.logo, origin),
    email: SUPPORT_EMAIL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        url: canonicalUrl('/support/', origin),
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function collectionPageSchema(input: { name: string; description: string; url: string; origin?: string }) {
  const pageUrl = canonicalUrl(input.url, input.origin);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': pageUrl,
    name: input.name,
    description: input.description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': siteRootId(input.origin) },
  };
}

export function webPageSchema(input: { name: string; description: string; url: string; origin?: string }) {
  const pageUrl = canonicalUrl(input.url, input.origin);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    name: input.name,
    description: input.description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': siteRootId(input.origin) },
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[], origin?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url, origin),
    })),
  };
}

export function discussionForumPostingSchema(input: {
  name: string;
  text: string;
  url: string;
  author: string;
  comments: number;
  origin?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: input.name,
    articleBody: input.text,
    url: canonicalUrl(input.url, input.origin),
    author: { '@type': 'Person', name: input.author },
    commentCount: input.comments,
    isPartOf: {
      '@type': 'CollectionPage',
      name: `${SITE_BRAND} Community Forum (demo)`,
      url: canonicalUrl('/forum/', input.origin),
    },
  };
}

function offerUrl(path: string, origin?: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return canonicalUrl(path, origin);
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  offerUrl: string;
  image?: string;
  sku?: string;
  origin?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    sku: input.sku ?? input.url.replace(/\//g, '-'),
    brand: {
      '@type': 'Brand',
      name: SITE_BRAND,
    },
    ...(input.image ? { image: absoluteAssetUrl(input.image, input.origin) } : {}),
    offers: {
      '@type': 'Offer',
      url: offerUrl(input.offerUrl, input.origin),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_BRAND,
      },
    },
  };
}

/** @deprecated Prefer productSchema for product/cheat detail pages. */
export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  offerUrl?: string;
  origin?: string;
}) {
  return productSchema({
    name: input.name,
    description: input.description,
    url: input.url,
    offerUrl: input.offerUrl ?? input.url,
    image: input.image,
    origin: input.origin,
  });
}

export function articleSchema(input: {
  name: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  origin?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.name,
    description: input.description,
    url: canonicalUrl(input.url, input.origin),
    image: absoluteAssetUrl(input.image, input.origin),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: SITE_BRAND,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_BRAND,
      logo: {
        '@type': 'ImageObject',
        url: absoluteAssetUrl(SITE_ASSETS.logo, input.origin),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(input.url, input.origin),
    },
  };
}

export function parseBlogDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return new Date().toISOString().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}
