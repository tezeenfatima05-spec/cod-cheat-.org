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
    title: 'COD MW4 Cheats — Aimbot, ESP, Wallhack & Radar | ZADEYO',
    description:
      'Explore COD MW4 cheats for PC: aimbot, player ESP, triggerbot, 2D radar, DMZ loot overlay, no recoil, and stream-proof options—built for Modern Warfare on Windows.',
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
    title: 'COD MW4 Guides & Setup',
    description:
      'Setup tips, mode-specific tuning, and patch-day notes for COD cheats on PC—aim, ESP, radar, and DMZ.',
  },
  '/forum/': {
    title: 'COD MW4 Community Forum',
    description: 'Demo threads on setup, features, and troubleshooting for COD MW4 cheats—sample content for layout.',
  },
  '/faq/': {
    title: 'FAQ | COD MW4 Cheats & Checkout',
    description:
      'Answers on tiers, features, PC requirements, and secure checkout for COD MW4 cheats at cod-cheat.org.',
  },
  '/terms/': {
    title: 'Terms & Conditions | COD Cheats',
    description:
      'Purchase terms, license use, and refund policy for products linked from cod-cheat.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | COD Cheats',
    description:
      'How cod-cheat.org uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About COD Cheats',
    description:
      'What this site publishes: COD MW4 cheat tiers, guides, and status-focused resources at cod-cheat.org.',
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
