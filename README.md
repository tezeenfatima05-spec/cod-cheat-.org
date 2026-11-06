# COD Cheats (cod-cheat.org)

Astro site template conversion for **COD MW4** product positioning. Game-specific copy, SEO, assets, and checkout live in `src/config/` and `src/i18n/en.ts`.

## Quick config

| Key | Location |
| --- | --- |
| Domain, `PRODUCT_BASE`, asset paths | `src/config/site.ts` |
| Checkout redirect (`/go/mw4/` → partner URL) | `src/config/checkout-redirects.mjs` |
| Page titles / meta | `src/config/pageSeo.ts` |
| Visible copy (hero, features, blog list, legal) | `src/i18n/en.ts` |

Set **`SITE_ASSETS.heroVideo`** in `site.ts` when you add `public/...` hero WebM/MP4; otherwise the hero uses the image carousel.

## Commands

```bash
npm install
npm run build
npm run dev
```

---

Upstream template clone used for the initial import is kept in `_template_source/` for reference; the live site uses `src/` at the repo root.
