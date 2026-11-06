/** Checkout destinations — server-side redirect targets only (never use as visible href). */
export const CHECKOUT_URLS = {
  mw4: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fmw4',
  ugc: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fugc',
  skinChanger: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fskin-changer',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/mw4', CHECKOUT_URLS.mw4],
  ['/go/mw4/', CHECKOUT_URLS.mw4],
  // Legacy template paths → current MW4 checkout
  ['/go/dota-2', CHECKOUT_URLS.mw4],
  ['/go/dota-2/', CHECKOUT_URLS.mw4],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.mw4],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.mw4],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
