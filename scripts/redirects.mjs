/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/cod-cheats/'],
  ['/cheats/', '/products/cod-cheats/'],
  ['/cheats/lite', '/products/cod-cheats/'],
  ['/cheats/lite/', '/products/cod-cheats/'],
  ['/cheats/pro', '/products/cod-cheats/'],
  ['/cheats/pro/', '/products/cod-cheats/'],
  ['/cheats/elite', '/products/cod-cheats/elite/'],
  ['/cheats/elite/', '/products/cod-cheats/elite/'],
  ['/cheats/compare', '/blog/mw4-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/mw4-lite-vs-pro/'],
  ['/products/cod-cheats/utilities', '/products/cod-cheats/utilities/'],
  ['/products/cod-cheats', '/products/cod-cheats/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
