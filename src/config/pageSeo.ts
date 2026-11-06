/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title:
      'Cod Cheats For Pc Aimbot Player Esp Wallhack – Cod Cheats',
    description:
      'cod cheats for pc aimbot player esp wallhack for MW4 on Windows—aim, ESP, wallhack, triggerbot, and Lite, Pro, or Elite tiers.',
  },
  '/products/cod-cheats/': {
    title: 'cod cheats for pc aimbot player esp wallhack — MW4 tiers | COD',
    description:
      'cod cheats for pc aimbot player esp wallhack: Lite, Pro, Elite MW4 tiers—aim, visuals, radar, loot, and tools for MP and DMZ on PC.',
  },
  '/products/cod-cheats/elite/': {
    title: 'COD MW4 Elite Cheats | Full Feature Suite',
    description:
      'Elite tier: expanded modules, priority updates, and the full aim, ESP, radar, and DMZ loot toolkit for MW4 on PC.',
  },
  '/products/cod-cheats/utilities/': {
    title: 'COD Utilities | UGC & Related Tools',
    description:
      'Overview of account and cosmetic utilities that pair with COD cheats—see each card for scope and checkout.',
  },
  '/blog/': {
    title: 'COD MW4 guides — ESP, radar, DMZ & patch notes for PC',
    description:
      'COD MW4 PC guides: setup and patch-day notes—aim tuning, ESP, 2D radar, DMZ loot layers, stream-proof capture, and hardware checks.',
  },
  '/forum/': {
    title: 'Community forum — COD MW4 setup, ESP & DMZ Q&A (demo)',
    description:
      'Community demo: sample COD MW4 threads on setup, stream proof, ESP, DMZ, patches, and layout troubleshooting.',
  },
  '/faq/': {
    title: 'Cheats FAQ — COD MW4 tiers, ESP, checkout & guides | PC',
    description:
      'COD MW4 cheats FAQ on PC: Lite vs Pro vs Elite, ESP and aim modules, checkout, and support.',
  },
  '/terms/': {
    title: 'Terms & Conditions | COD Cheats',
    description:
      'Purchase terms, license use, and refund policy for products linked from cod-cheat.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | COD Cheats — analytics, cookies & email',
    description:
      'Analytics, cookies, and support email on cod-cheat.org—read this page before checkout or contact.',
  },
  '/about/': {
    title: 'About | COD Cheats — MW4 tiers, guides & editorial scope',
    description:
      'What this site covers: MW4 cheat tier comparisons, PC setup guides, and blog resources—editorial summaries only; product specs and checkout live on linked.',
  },
  '/support/': {
    title: 'Support | COD Cheats',
    description:
      'Get help with loader setup, checkout, and PC compatibility for COD MW4 cheats.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

/** Blog article routes — document title + meta only (visible H1 stays `post.title` from data). */
export const BLOG_PAGE_SEO: Record<string, PageSeoEntry> = {
  '/blog/anticheat-patch-day-checklist/': {
    title: 'Anti-cheat wave checklist — pause play & retest MW4 (PC)',
    description:
      'Checklist: Pause matchmaking, read status, reload conservative profiles, and offline-test before going live again. Checkout starts at /go/mw4/.',
  },
  '/blog/how-to-buy-cod-mw4-cheats/': {
    title: 'How to buy COD MW4 cheats securely — portal & order email',
    description:
      'Buy Cod Mw4 Cheats Securely: Use the official portal after checkout, guard your order email, and avoid third-party loader links.',
  },
  '/blog/mw4-2d-radar-zoom/': {
    title: 'MW4 2D radar zoom — when to widen the sweep (PC guide)',
    description:
      'Ground War benefits from a wider radar sweep; tight MP maps need a shorter range to reduce noise. Tune zoom before queueing and verify overlays after.',
  },
  '/blog/mw4-elite-tier-guide/': {
    title: 'MW4 Elite tier guide — full aim, ESP, radar & DMZ stack',
    description:
      'Elite Tier: Elite adds radar, DMZ loot layers, and misc gunplay assists on top of Pro. Compare modules on the products hub, then use /go/mw4/ for checkout.',
  },
  '/blog/mw4-lite-vs-pro/': {
    title: 'MW4 Lite vs Pro — ESP-first vs aim & trigger add-ons',
    description:
      'Lite focuses on visuals and stream-proof capture; Pro adds smooth aim and trigger timing. Read feature rows on the catalog page, then checkout via.',
  },
};

export function getBlogPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return BLOG_PAGE_SEO[normalizeSeoPath(pathname)];
}
