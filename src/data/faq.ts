import type { IconName } from '../components/icons/types';
import { SITE_DOMAIN } from '../config/site';
import { canonicalUrl } from '../config/seo';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

/** Unique visible anchor text per destination (same `href` must not reuse the same label). */
function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const elite = link('Elite tier — MW4 feature stack', productPath('elite'));
const lite = link('Lite lane — ESP-first MW4 tier', ROUTES.products);
const liteVisualsTier = link('Lite visuals lane — same catalog hub', ROUTES.products);
const pro = link('Pro lane — aim plus trigger add-ons', ROUTES.products);
const productsHub = link('MW4 tiers catalog — Lite, Pro, Elite', ROUTES.products);
const ugc = link('UGC appeals workflow page', productPath('ugc'));
const skin = link('Skin changer preview route', productPath('unlock-all'));
const faqPage = link('Full FAQ — every topic', ROUTES.faq);
const blog = link('Blog hub — setup and patch guides', ROUTES.blog);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check COD MW4 cheat status?',
    a: a(`Read the live banner on ${SITE_DOMAIN} and your portal before launching—especially after a game or anti-cheat update.`),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('Your portal unlocks the loader and setup guide through secure checkout. Follow the guide before opening MW4.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned?',
    a: a('Yes. Third-party tools violate publisher rules and can trigger enforcement. Only proceed if you accept that risk.'),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('MW4 on Windows 10/11 PC only. Consoles are not supported.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Usually yes through portal HWID reset—limits depend on your tier and partner policy.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are products and utilities listed?',
    a: `${productsHub} lists Lite, Pro, Elite, ${ugc}, and ${skin} with checkout via our partner.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is player ESP in MW4?',
    a: `ESP draws boxes, skeletons, health/armor, distance, optional names, weapons, snaplines, and squad tinting. ${lite} focuses on these visuals without aim modules.`,
    scopes: ['lite', 'pro', 'elite'],
  },
  {
    id: 'esp-vs-aim',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What is the difference between ESP and aim assist?',
    a: `ESP is information only. Smooth aim and trigger timing ship on ${pro} and ${elite}. Lite does not include aim or trigger modules.`,
  },
  {
    id: 'which-tier-esp',
    topic: 'plans',
    icon: 'faqWhichTierEsp',
    q: 'Which tier is ESP-only?',
    a: `${lite} is visuals + stream-proof with distance caps. ${pro} adds aim and trigger. ${elite} adds radar, DMZ loot, and misc gunplay assists.`,
    scopes: ['lite'],
  },
  {
    id: 'which-tier-aim',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'Which tier includes smooth aim and triggerbot?',
    a: `${pro} adds smooth aim circle, wall checks, and trigger delay with hold key. ${elite} includes everything plus radar and DMZ layers. ${lite} has no aim or trigger.`,
    scopes: ['pro'],
  },
  {
    id: 'rank-lite-vs-pro',
    topic: 'plans',
    icon: 'faqRankTiers',
    q: 'How do Lite vs Pro vs Elite compare?',
    a: `Awareness → ${lite}. Aim + trigger on top of ESP → ${pro}. Radar, DMZ loot, misc stack → ${elite}. Read each cheat page or the ${faqPage}.`,
  },
  {
    id: 'elite-slots',
    topic: 'plans',
    icon: 'faqEliteSlots',
    q: 'Why is Elite sometimes limited?',
    a: `Elite bundles the largest module surface—priority updates and support lanes are easier to keep healthy with slot caps. Verify availability before checkout.`,
    scopes: ['elite'],
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Will OBS capture my overlay?',
    a: `Enable stream-proof on ${lite}, ${pro}, or ${elite} and record a short local test before streaming.`,
  },
  {
    id: 'undetected',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Is “undetected” guaranteed?',
    a: a('No. Status reflects the current build—not a lifetime promise. Stop if the banner shows maintenance or testing.'),
  },
  {
    id: 'esp-safer',
    topic: 'safety',
    icon: 'faqEspSafer',
    q: 'Is ESP lower risk than aim?',
    a: a('ESP can be quieter than obvious aim traces, but it is still a cheat. Enforcement does not ignore overlays.'),
  },
  {
    id: 'ugc-what',
    topic: 'products',
    icon: 'faqUgcWhat',
    q: 'What is UGC?',
    a: `${ugc} structures appeals and evidence—not a promised unban.`,
    scopes: ['ugc'],
  },
  {
    id: 'unlock-all',
    topic: 'products',
    icon: 'faqSkinChanger',
    q: 'Does Skin changer change my inventory online?',
    a: `${skin} previews cosmetics locally. Others still see your real items. Often bundled with ${elite}.`,
    scopes: ['unlock-all'],
  },
  {
    id: 'external-loader',
    topic: 'products',
    icon: 'faqExternalLoader',
    q: 'Does the loader inject into the game folder?',
    a: `Delivery stays outside the game directory—follow the portal guide. Risk still exists; see ${productsHub}.`,
  },
  {
    id: 'blog-vs-cheats',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are blog guides the same as multi-player tools?',
    a: `Articles are educational. Ranked and DMZ tooling is sold through tiers on ${productsHub}.`,
  },
  {
    id: 'blog-setup',
    topic: 'blog',
    icon: 'faqBlogSetup',
    q: 'Where should I buy after reading a guide?',
    a: `Guides link back to ${productsHub}. Checkout always runs through the secure flow—never random file links.`,
  },
  {
    id: 'compare-plans',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Where do I compare tiers?',
    a: `Each cheat page lists modules. The ${faqPage} collects common questions in one list.`,
  },
  {
    id: 'who-lite',
    topic: 'plans',
    icon: 'faqWhoLite',
    q: 'Who should stay on Lite?',
    a: `Players who only want ESP readability, distance caps, and stream-proof overlays—no aim or trigger.`,
    scopes: ['lite'],
  },
  {
    id: 'who-pro',
    topic: 'plans',
    icon: 'faqWhoPro',
    q: 'Who should buy Pro?',
    a: `Anyone who wants smooth aim and trigger timing on top of the full Lite stack.`,
    scopes: ['pro'],
  },
  {
    id: 'who-elite',
    topic: 'plans',
    icon: 'faqWhoElite',
    q: 'Who should buy Elite?',
    a: `Squads that need radar zoom, DMZ loot/vehicle layers, no recoil/spread toggles, and dual saved profiles.`,
    scopes: ['elite'],
  },
  {
    id: 'patch-update',
    topic: 'safety',
    icon: 'faqPatchUpdate',
    q: 'What should I do after a big patch?',
    a: a(`Pause ranked play until ${SITE_DOMAIN} shows the build online, download the latest portal build, and retest in a private lobby.`),
  },
  {
    id: 'support-help',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get loader help?',
    a: a(`Email support@${SITE_DOMAIN} with your order email, Windows build, and MW4 client version.`),
  },
  {
    id: 'dmz-vs-mp',
    topic: 'plans',
    icon: 'faqTurboRanked',
    q: 'Do DMZ loot layers belong in 6v6?',
    a: a('No—Elite expects a separate DMZ profile. Keep loot and vehicle overlays disabled for Multiplayer presets.'),
  },
  {
    id: 'radar-tier',
    topic: 'esp',
    icon: 'faqZoomHack',
    q: 'Which tier includes 2D radar?',
    a: `2D radar with markers and zoom is an ${elite} module.`,
    scopes: ['elite'],
  },
  {
    id: 'dmz-loot',
    topic: 'scripts',
    icon: 'faqAutoFarm',
    q: 'Where are DMZ loot options listed?',
    a: `Cash, bags, contracts, extracts, and farmland vehicles are Elite-only DMZ overlays—see ${elite}.`,
    scopes: ['elite'],
  },
  {
    id: 'private-cheats',
    topic: 'safety',
    icon: 'faqPrivateCheats',
    q: 'What does private software mean here?',
    a: a('Private means portal-delivered keys and maintained builds—not public paste downloads.'),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `Use the ${faqPage} for every topic or browse ${blog} for deep dives.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'ban-risk', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

/** Homepage FAQ accordion + schema: unique anchor labels + absolute same-origin URLs (SEO audit). */
export function getHomeLandingFaqs(origin: string): SiteFaqItem[] {
  const productsHub = canonicalUrl(ROUTES.products, origin);
  const eliteHub = canonicalUrl(ROUTES.productsElite, origin);
  const ugcHref = canonicalUrl(productPath('ugc'), origin);
  const skinHref = canonicalUrl(productPath('unlock-all'), origin);

  return [
    {
      id: 'status',
      topic: 'setup',
      icon: 'faqStatus',
      q: 'Where do I check COD MW4 cheat status?',
      a: `Read the live banner on <a href="${productsHub}">status strip above the tier cards on the catalog hub</a> and your portal before launching—especially after a game or anti-cheat update.`,
    },
    {
      id: 'after-buy',
      topic: 'setup',
      icon: 'faqAfterBuy',
      q: 'What happens after I buy?',
      a: a(
        'Your portal unlocks the loader and setup guide through secure checkout. Follow the guide before opening MW4.',
      ),
    },
    {
      id: 'ban-risk',
      topic: 'safety',
      icon: 'faqBanRisk',
      q: 'Can I get banned?',
      a: a(
        'Yes. Third-party tools violate publisher rules and can trigger enforcement. Only proceed if you accept that risk.',
      ),
    },
    {
      id: 'platforms',
      topic: 'setup',
      icon: 'faqPlatforms',
      q: 'Which platforms are supported?',
      a: a('MW4 on Windows 10/11 PC only. Consoles are not supported.'),
    },
    {
      id: 'license-move',
      topic: 'setup',
      icon: 'faqLicenseMove',
      q: 'Can I move my license to a new PC?',
      a: a('Usually yes through portal HWID reset—limits depend on your tier and partner policy.'),
    },
    {
      id: 'products-page',
      topic: 'products',
      icon: 'faqProductsPage',
      q: 'Where are products and utilities listed?',
      a: `<a href="${productsHub}">All tier SKUs listed in one index</a> covers Lite, Pro, and Elite; the <a href="${eliteHub}">flagship module roundup</a> expands the full stack. Utilities: <a href="${ugcHref}">UGC appeals workflow page</a> and <a href="${skinHref}">Skin changer preview route</a>, with checkout via our partner.`,
    },
  ];
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Filter tiers, ESP, aim/trigger, safety, products, setup, and blog answers.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'scripts',
  'safety',
  'products',
  'blog',
  'setup',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter(
    (f) => !f.scopes && ['setup', 'safety', 'plans', 'esp', 'scripts'].includes(f.topic),
  );
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const tierCompare = siteFaqs.filter((f) =>
    ['rank-lite-vs-pro', 'compare-plans', 'undetected', 'patch-update'].includes(f.id),
  );

  const combined =
    kind === 'tier' ? [...scoped, ...tierCompare, ...general.slice(0, 8)] : [...scoped, ...general.slice(0, 6)];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

/** Same as Guides `blogTopicFaqs`, but wording avoids repeating "ESP" on the distance article. */
const blogTopicFaqsGuidesEspArticle: SiteFaqItem[] = [
  {
    id: 'blog-guide-start',
    topic: 'blog',
    icon: 'faqBlogGuideStart',
    q: 'Should I enable every overlay module at once?',
    a: a('No. Add boxes first, then snaplines, then optional names—stop when the HUD feels crowded.'),
  },
  {
    id: 'blog-guide-tier',
    topic: 'blog',
    icon: 'faqBlogGuideTier',
    q: 'Which tier matches this guide?',
    a: `Visual tuning → ${liteVisualsTier}. Aim/trigger topics → ${pro}. Radar + DMZ stacking → ${elite}.`,
  },
  {
    id: 'blog-guide-status',
    topic: 'blog',
    icon: 'faqBlogGuideStatus',
    q: 'Is this guide still valid after a patch?',
    a: a(`Check the article date and ${SITE_DOMAIN} status before changing live presets.`),
  },
];

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-guide-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Should I enable every ESP option at once?',
      a: a('No. Add boxes first, then snaplines, then optional names—stop when the HUD feels crowded.'),
    },
    {
      id: 'blog-guide-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which tier matches this guide?',
      a: `Visual tuning → ${lite}. Aim/trigger topics → ${pro}. Radar + DMZ stacking → ${elite}.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: a(`Check the article date and ${SITE_DOMAIN} status before changing live presets.`),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test in a private lobby first?',
      a: a('Yes—verify overlays, radar, and DMZ toggles offline before matchmaking.'),
    },
  ],
  Updates: [
    {
      id: 'blog-sec-patch',
      topic: 'blog',
      icon: 'faqBlogSecEnforcement',
      q: 'Does this article guarantee safe play after enforcement waves?',
      a: a('No. Treat enforcement chatter as a stop sign until status clears.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog posts official documentation?',
    a: `Articles summarize workflows; authoritative specs stay on ${productsHub}.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying a guide?',
    a: a(`Email support@${SITE_DOMAIN} with the article slug and your order email.`),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will these settings work next season?',
    a: a('Rebuild presets after major updates—copying old sliders often fails silently.'),
  },
];

function blogFaqDensityFilter(items: SiteFaqItem[], slug: string): SiteFaqItem[] {
  let out = items;
  if (slug.includes('stream-proof')) {
    out = out.filter((f) => f.id !== 'stream-proof' && f.id !== 'which-tier-esp');
  }
  if (slug === 'mw4-player-esp-distance') {
    out = out.filter(
      (f) => !['what-is-esp', 'esp-vs-aim', 'esp-safer', 'which-tier-esp', 'who-lite'].includes(f.id),
    );
  }
  return out;
}

export function getBlogFaqs(tag: string, slug: string, origin: string): SiteFaqItem[] {
  const productsHubBlog = `<a href="${canonicalUrl(ROUTES.products, origin)}">Authoritative MW4 tier matrix (blog FAQ)</a>`;
  const topicFaqs =
    tag === 'Guides' && slug === 'mw4-player-esp-distance'
      ? blogTopicFaqsGuidesEspArticle
      : (blogTopicFaqs[tag] ?? []);
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('map') || (slug.includes('esp') && slug !== 'mw4-player-esp-distance')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which tier covers ESP tuning from this article?',
      a: `${lite} ships the full visual stack. ${pro} keeps it and adds aim/trigger.`,
    });
  }
  if (slug.includes('aim') || slug.includes('trigger')) {
    slugHints.push({
      id: 'blog-slug-scripts',
      topic: 'scripts',
      icon: 'faqBlogSlugScripts',
      q: 'Which tier covers aim/trigger content?',
      a: `${pro} and ${elite} add smooth aim and trigger timing. ${lite} excludes those modules.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('ban')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does this replace UGC or product workflows?',
      a: `Use ${ugc} for appeal paperwork when that matches the article—not general blog advice alone.`,
    });
  }

  const defaultBlogFaqsResolved = defaultBlogFaqs.map((f) =>
    f.id === 'blog-default-1'
      ? {
          ...f,
          a: `Articles summarize workflows; authoritative specs stay on ${productsHubBlog}.`,
        }
      : f,
  );

  return blogFaqDensityFilter([...slugHints, ...topicFaqs, ...defaultBlogFaqsResolved], slug).slice(0, 8);
}

export const compareRows = [
  { feature: 'Player ESP (boxes, skeleton)', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Health, armor, distance caps', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Stream-proof overlay', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'Smooth aim + aim circle', icon: 'compareAutoCombo' as const, lite: false, pro: true, elite: true },
  { feature: 'Triggerbot w/ delay & hold key', icon: 'compareOrbwalker' as const, lite: false, pro: true, elite: true },
  { feature: '2D radar + zoom', icon: 'compareMinimapHack' as const, lite: false, pro: false, elite: true },
  { feature: 'DMZ loot + vehicles', icon: 'compareAutoFarm' as const, lite: false, pro: false, elite: true },
  { feature: 'No recoil / no spread', icon: 'compareAutoKillSteal' as const, lite: false, pro: false, elite: true },
  { feature: 'Custom crosshair', icon: 'compareAutoDagon' as const, lite: false, pro: false, elite: true },
  { feature: 'Dual saved configs', icon: 'compareCloudBackup' as const, lite: false, pro: true, elite: true },
];
