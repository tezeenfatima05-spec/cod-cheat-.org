# Search Console workflow (cod-cheat.org)

You verify the domain at your DNS provider—no HTML meta tags in the repo.

## Setup (once)

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `cod-cheat.org` if it is not already there.
2. Under **Sitemaps**, submit the **live deployment** URL (example): `https://cod-cheat--org.tazeenrooziroti.workers.dev/sitemap.xml` — use the same host Search Console is verifying. Do **not** submit `https://cod-cheat.org/sitemap.xml` unless that host serves HTTP 200 + `application/xml` for that path (that requires pointing `cod-cheat.org` DNS at this project or proxying `/sitemap.xml`).
3. In **Cloudflare Pages / Workers** project settings, set **`CANONICAL_SITE_ORIGIN`** or **`PUBLIC_SITE_ORIGIN`** to the same canonical HTTPS origin as the deployment (e.g. `https://cod-cheat--org.tazeenrooziroti.workers.dev`) if your build does not inject **`CF_PAGES_URL`**. **`CANONICAL_SITE_ORIGIN`** overrides a stale dashboard `PUBLIC_SITE_ORIGIN` so `<loc>` URLs and HTML canonicals stay on the Workers host. The build syncs `site` into Vite via `astro.config.mjs`.
4. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) if you use Bing.

## Monthly tune (15 minutes)

1. Search Console → **Performance** → **Search results**.
2. Sort by **Impressions** (last 28 days).
3. For each query that already maps to a page on your site, open the matching path in [`src/config/pageSeo.ts`](../src/config/pageSeo.ts).
4. Adjust `title` and `description` so the primary query appears naturally in the title (keep under ~60 characters for the title where possible).
5. Deploy. Allow 1–2 weeks before judging click-through changes.

## Path cheat sheet

| Common query intent | Edit path in `pageSeo.ts` |
| ------------------- | ------------------------- |
| COD cheats / MW4 (broad) | `/` |
| lite / pro / elite | `/products/cod-cheats/lite/`, etc. |
| esp, aim, radar | `/products/cod-cheats/`, blog posts |
| hwid, unlock all | `/products/cod-cheats/utilities/` |
| purchase / refund | `/terms/`, `/support/` |

Product and blog article pages still use their own titles from content; add entries to `PAGE_SEO` only when you want a fixed override for a specific pathname.
