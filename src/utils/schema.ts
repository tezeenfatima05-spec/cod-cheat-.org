import type { FaqItem } from '../i18n/types';
import { SITE_ASSETS, SITE_BRAND, SUPPORT_EMAIL } from '../config/site';
import { SITE_ORIGIN, absoluteAssetUrl, canonicalUrl, getOrganizationSameAs } from '../config/seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function websiteSchema() {
  const siteUrl = `${SITE_ORIGIN}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: SITE_BRAND,
    url: siteUrl,
    inLanguage: 'en-US',
    description:
      'COD MW4 cheats for PC—aim assist, player ESP, trigger timing, radar, DMZ loot overlays, and stream-proof options.',
  };
}

/** Self-referencing WebPage for the homepage (matches document `<title>` / canonical). */
export function homeWebPageSchema(input: { name: string; description: string }) {
  const pageUrl = canonicalUrl('/');
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: input.name,
    description: input.description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
  };
}

export function organizationSchema() {
  const sameAs = getOrganizationSameAs();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_BRAND,
    url: `${SITE_ORIGIN}/`,
    logo: absoluteAssetUrl(SITE_ASSETS.logo),
    email: SUPPORT_EMAIL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        url: canonicalUrl('/support/'),
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function collectionPageSchema(input: { name: string; description: string; url: string }) {
  const pageUrl = canonicalUrl(input.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    name: input.name,
    description: input.description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
  };
}

export function webPageSchema(input: { name: string; description: string; url: string }) {
  const pageUrl = canonicalUrl(input.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: input.name,
    description: input.description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
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

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url),
    })),
  };
}

export function discussionForumPostingSchema(input: {
  name: string;
  text: string;
  url: string;
  author: string;
  comments: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: input.name,
    articleBody: input.text,
    url: canonicalUrl(input.url),
    author: { '@type': 'Person', name: input.author },
    commentCount: input.comments,
    isPartOf: {
      '@type': 'CollectionPage',
      name: `${SITE_BRAND} Community Forum (demo)`,
      url: canonicalUrl('/forum/'),
    },
  };
}

function offerUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return canonicalUrl(path);
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  offerUrl: string;
  image?: string;
  sku?: string;
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
    ...(input.image ? { image: absoluteAssetUrl(input.image) } : {}),
    offers: {
      '@type': 'Offer',
      url: offerUrl(input.offerUrl),
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
}) {
  return productSchema({
    name: input.name,
    description: input.description,
    url: input.url,
    offerUrl: input.offerUrl ?? input.url,
    image: input.image,
  });
}

export function articleSchema(input: {
  name: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    image: absoluteAssetUrl(input.image),
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
        url: absoluteAssetUrl(SITE_ASSETS.logo),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${canonicalUrl(input.url)}#webpage`,
    },
  };
}

export function parseBlogDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return new Date().toISOString().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}
