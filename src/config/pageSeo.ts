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
    title: 'Cod cheats – MW4 PC cheat catalog (hero CTA destination)',
    description:
      'cod cheats for pc aimbot player esp wallhack: Cod cheats for MW4 on PC: aimbot, player ESP, triggerbot, 2D radar, DMZ loot, no recoil, and stream-proof.',
  },
  '/products/cod-cheats/': {
    title: 'COD MW4 Cheats for PC — Aimbot, ESP & Wallhack',
    description:
      'Compare Lite, Pro, and Elite COD MW4 cheat tiers: aim assist, visuals, radar, loot, and misc tools for multiplayer and DMZ.',
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
    title: 'cod guides & setup — radar, ESP, DMZ & patch notes (PC)',
    description:
      'Cod guides for MW4 on PC: setup and patch-day notes—aim tuning, ESP, 2D radar, DMZ loot layers, stream-proof capture options, and hardware checks.',
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
    title: 'Privacy – and contact data when you browse or email support',
    description:
      'Privacy practices at cod-cheat.org: analytics, cookies, and contact data when you browse or email support. This privacy overview supplements the full.',
  },
  '/about/': {
    title: 'Cod cheats — about MW4 tiers, guides & site publishing | PC',
    description:
      'Cod cheats on this site means MW4 module coverage only: tier comparisons, PC setup guides, blog resources, and status notes—editorial about pages, not a.',
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
    title: 'Checklist – COD Cheats Editorial When enforcement | COD',
    description:
      'Checklist: Pause play, read status, reload conservative profiles, then retest offline. edirect Related: MW4 capture-safe OBS checklist (stream overlays).',
  },
  '/blog/how-to-buy-cod-mw4-cheats/': {
    title: 'Buy Cod Mw4 Cheats Securely – Questions about this page',
    description:
      'Buy Cod Mw4 Cheats Securely: Portal access, order email hygiene, and avoiding fake loader links. go/mw4/ redirect Related: MW4 capture-safe OBS checklist.',
  },
  '/blog/mw4-2d-radar-zoom/': {
    title: 'Radar – Articles summarize workflows; authoritative | COD',
    description:
      'When to widen the radar for Ground War versus tight MP spawns. ut — /go/mw4/ redirect Related: MW4 capture-safe OBS checklist (stream overlays) All.',
  },
};

export function getBlogPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return BLOG_PAGE_SEO[normalizeSeoPath(pathname)];
}
