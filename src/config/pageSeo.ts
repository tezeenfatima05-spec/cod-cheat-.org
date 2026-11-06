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
      'COD Cheats for PC Aimbot Player ESP Wallhack Call of Duty MW4 on Windows Lite Pro Elite',
    description:
      'cod cheats for pc aimbot player esp wallhack — COD MW4 on Windows: aimbot, player ESP, wallhack, enemy tracking, triggerbot, and Lite / Pro / Elite tiers.',
  },
  '/products/cod-cheats/': {
    title: 'cod cheats for pc aimbot player esp wallhack — MW4 tiers | COD',
    description:
      'cod cheats for pc aimbot player esp wallhack: compare Lite, Pro, and Elite MW4 tiers—aim assist, visuals, radar, loot, and misc tools for multiplayer and DMZ on Windows.',
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
      'MW4 PC guides: setup and patch-day notes—aim tuning, ESP, 2D radar, DMZ loot layers, stream-proof capture, and hardware checks. Related: cod cheats for pc aimbot player esp wallhack on the home and products pages.',
  },
  '/forum/': {
    title: 'Community forum — COD MW4 setup, ESP & DMZ Q&A (demo)',
    description:
      'Community space (demo): sample threads on COD MW4 cheat setup, stream proof, ESP tuning, DMZ loot, patch-day habits, and troubleshooting for layout.',
  },
  '/faq/': {
    title: 'Cheats FAQ — COD MW4 tiers, ESP, checkout & guides | PC',
    description:
      'Cheats FAQ for COD MW4 on PC: Lite vs Pro vs Elite, ESP and aim modules, PC needs, secure checkout steps, blog setup guides, and where to get support.',
  },
  '/terms/': {
    title: 'Terms & Conditions | COD Cheats',
    description:
      'Purchase terms, license use, and refund policy for products linked from cod-cheat.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | COD Cheats — analytics, cookies & email',
    description:
      'How cod-cheat.org handles analytics, optional cookies, and support email when you browse or contact us. Read the full policy on this page before checkout.',
  },
  '/about/': {
    title: 'About | COD Cheats — MW4 tiers, guides & editorial scope',
    description:
      'What this site covers: MW4 cheat tier comparisons, PC setup guides, and blog resources—editorial summaries only; product specs and checkout live on linked pages.',
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
      'Pause matchmaking, read status, reload conservative profiles, and offline-test before going live again. Checkout starts at /go/mw4/. Pair with the stream-proof setup guide.',
  },
  '/blog/how-to-buy-cod-mw4-cheats/': {
    title: 'How to buy COD MW4 cheats securely — portal & order email',
    description:
      'Use the official portal after checkout, guard your order email, and avoid third-party loader links. Start secure checkout from /go/mw4/ when you are ready.',
  },
  '/blog/mw4-2d-radar-zoom/': {
    title: 'MW4 2D radar zoom — when to widen the sweep (PC guide)',
    description:
      'Ground War benefits from a wider radar sweep; tight MP maps need a shorter range to reduce noise. Tune zoom before queueing and verify overlays after patches.',
  },
  '/blog/mw4-elite-tier-guide/': {
    title: 'MW4 Elite tier guide — full aim, ESP, radar & DMZ stack',
    description:
      'Elite adds radar, DMZ loot layers, and misc gunplay assists on top of Pro. Compare modules on the products hub, then use /go/mw4/ for checkout when you upgrade.',
  },
  '/blog/mw4-lite-vs-pro/': {
    title: 'MW4 Lite vs Pro — ESP-first vs aim & trigger add-ons',
    description:
      'Lite focuses on visuals and stream-proof capture; Pro adds smooth aim and trigger timing. Read feature rows on the catalog page, then checkout via /go/mw4/.',
  },
};

export function getBlogPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return BLOG_PAGE_SEO[normalizeSeoPath(pathname)];
}
