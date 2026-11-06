import { t } from '../i18n';
import { CHECKOUT, checkoutForSlug, checkoutPath } from '../config/checkout';
import { SITE_ASSETS, SITE_URL } from '../config/site';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['mw4-map-hack-setup', 'mw4-lite-vs-pro', 'mw4-cod-cheats-guide', 'anticheat-patch-day-checklist'],
  pro: [
    'mw4-stream-proof-setup',
    'mw4-triggerbot-guide',
    'mw4-lite-vs-pro',
    'mw4-aimbot-dmz-config',
  ],
  elite: [
    'mw4-elite-tier-guide',
    'mw4-radar-loot-guide',
    'mw4-map-hack-setup',
    'anticheat-patch-day-checklist',
    'how-to-buy-cod-mw4-cheats',
  ],
  ugc: ['anticheat-patch-day-checklist', 'mw4-hwid-spoofer-after-ban', 'how-to-buy-cod-mw4-cheats'],
  'unlock-all': ['mw4-stream-proof-setup', 'mw4-cod-cheats-guide', 'how-to-buy-cod-mw4-cheats'],
};

const productBase = '/products/cod-cheats/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: `Check the live banner on ${new URL(SITE_URL).hostname} before purchase—especially after a game or anti-cheat update.`,
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select the tier that matches how you play (6v6 vs DMZ). Review modules before completing secure checkout.',
  },
  {
    num: '03',
    title: 'Open support if needed',
    desc: 'Use email or the Support page with your order details if you need availability or setup confirmation.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal and setup guide. Test in a private match, load presets, then play on your chosen mode.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Call of Duty and anti-cheat systems receive frequent updates. Confirm module availability on the live status panel before you purchase or launch. Overlay behavior can change between modes (6v6 vs DMZ) after patches.';

const sharedLimitations =
  'Third-party software in online games can violate publisher Terms of Use and lead to bans or account action. You use this software at your own risk. Compatibility and availability can change after game or Windows updates without notice.';

const mw4SystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqSteam', text: 'Current Call of Duty / MW4 PC client with the latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'Hardware that meets MW4 published PC requirements.' },
];

const shots = SITE_ASSETS.screenshots;

const galleryCaptions: Record<number, { caption: string; captionDesc: string; alt: string }> = {
  0: {
    caption: 'Combat clarity',
    captionDesc: 'MW4 multiplayer scene with operator engagement in frame.',
    alt: 'Call of Duty MW4 multiplayer gameplay with operators in combat',
  },
  1: {
    caption: 'Operator sightline',
    captionDesc: 'Framed action for testing overlay readability at range.',
    alt: 'Modern Warfare style firefight scene on PC',
  },
  2: {
    caption: 'Mode variety',
    captionDesc: 'Use separate presets for fast 6v6 and slower DMZ rotations.',
    alt: 'Call of Duty combat environment with operators moving through map',
  },
  3: {
    caption: 'Map flow',
    captionDesc: 'Pair visuals with radar and loot layers when the mode calls for it.',
    alt: 'Warfare map engagement with multiple operators visible',
  },
  4: {
    caption: 'Loadout moment',
    captionDesc: 'Keep trigger and aim settings conservative until you verify behavior.',
    alt: 'Modern Warfare operator aiming down sights in match',
  },
  5: {
    caption: 'Season context',
    captionDesc: 'Rebuild presets after major balance or anti-cheat updates.',
    alt: 'Arcane-inspired COD season art with operators',
  },
  6: {
    caption: 'Caution',
    captionDesc: 'Treat every build as temporary—check status after patches.',
    alt: 'Modern Warfare themed scene referencing account risk',
  },
};

type GalleryKey = number;

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const cap = galleryCaptions[k] ?? {
      caption: 'MW4',
      captionDesc: 'Gameplay reference image.',
      alt: 'Call of Duty Modern Warfare gameplay screenshot',
    };
    return {
      src: shots[k] ?? shots[0],
      alt: cap.alt,
      caption: cap.caption,
      captionDesc: cap.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'cod-cheats';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Lite is built for players who want clean information first—box or corner visuals, distance readouts, and stream-proof overlay options without full aim automation.',
    },
    { type: 'h2', text: '6v6-first layout' },
    {
      type: 'p',
      text: 'Distance caps and muted colors for players behind cover keep 6v6 readable. Skip teammates and downed operators so the overlay stays focused on live threats.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Pro adds smooth aim assist and trigger timing on top of Lite—head or chest selection, hold key, and wall checks that mirror the aim settings.',
    },
    { type: 'h2', text: 'Tune before you queue' },
    {
      type: 'p',
      text: 'Start with conservative smooth aim and trigger delay in a private match. Enable draw aim circle only while tuning, then dial visuals back for live play.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'Elite is the full package—2D radar with markers and zoom, DMZ loot layers (cash, bags, contracts, extract points, vehicles), no recoil and no spread, plus dual saved configs for 6v6 and DMZ.',
    },
    { type: 'h2', text: 'Mode-specific layers' },
    {
      type: 'p',
      text: 'Keep DMZ loot and vehicle overlays off in 6v6 so the HUD stays light. Use the second saved profile when you rotate into Hajin DMZ.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player visuals: box or corner box, skeleton, health, armor plates, distance, optional name tag, weapon in hand, snapline, squad color, quieter tint for targets behind cover. Stream-proof overlay hides capture software when enabled.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: `Lite license holders can move up to Pro or Elite through the same product hub. Compare tiers on [products](${productBase}) before checkout.`,
    },
  ],
  pro: [
    { type: 'h2', text: 'Aim and trigger' },
    {
      type: 'p',
      text: 'Aim: adjustable aim circle, smooth onto operator (not snap), head or upper chest or closest target, wall check, distance cap, teammate and downed skip, optional circle draw. Triggerbot: fires when crosshair is on an operator with short delay, same wall logic, hold key.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro suits 6v6 players who want assistance without enabling every world layer. Pair aim and trigger with Lite visuals—add radar or loot only when you need it.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Radar, loot, misc' },
    {
      type: 'p',
      text: 'Radar: 2D layout, operator markers, range and zoom. Loot (DMZ): cash and bags in Hajin DMZ, armor and ammo, contracts, extract points, vehicles on farmland roads—toggle off in 6v6. Misc: no recoil, no spread, stream-proof overlay, custom crosshair, two saved configs.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite may show limited availability on the status banner. Complete checkout through the secure flow when slots are open.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  ugc: [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC is an appeal and case-tracking workspace for restrictions and security flags—it organizes evidence and follow-ups, not a guaranteed unban.',
    },
    { type: 'h2', text: 'Expectations' },
    {
      type: 'p',
      text: 'Some bans cannot be reversed. When hardware is flagged, follow your portal or partner guidance—UGC handles account appeal paperwork only.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview' },
    {
      type: 'p',
      text: 'Cosmetic preview tools show loadouts on your client for content planning—other players see your actual inventory.',
    },
    { type: 'h2', text: 'Bundling' },
    {
      type: 'p',
      text: 'Included with Elite in many bundles; standalone exists for preview-only workflows without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide(0, 1, 2),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'Player ESP: box or corner box',
      'Skeleton, health, armor plates',
      'Distance, optional name tag',
      'Weapon in hand & snapline',
      'Squad color & cover tint',
      'Distance cap for readability',
      'Stream-proof overlay',
      '6v6-focused preset',
      'Cloud / saved profile slot',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Built around operator awareness',
      paragraphs: [
        'Lite focuses on player visuals you can read mid-fight—boxes, skeleton, health and armor, distance, optional names, weapon line, and snapline—with distance caps so 6v6 stays clean.',
        'No aim or trigger modules: good entry point if you want overlays and stream-proof behavior first.',
      ],
    },
  },
  pro: {
    images: slide(3, 4, 0),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'All Lite visual modules',
      'Aim circle & smooth aim',
      'Head / chest / closest bone',
      'Wall check & distance cap',
      'Skip teammates & downed',
      'Optional aim circle draw',
      'Triggerbot with delay',
      'Trigger hold key',
      'Shared wall logic with aim',
      'Dual profile slots (6v6 / DMZ)',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Aim and trigger on top of ESP',
      paragraphs: [
        'Pro adds smooth aim assistance and trigger timing while keeping Lite’s visual suite. Wall checks align between aim and trigger so behavior stays consistent.',
        'Best for multiplayer where you want help without turning on full radar and DMZ loot stacks.',
      ],
    },
  },
  elite: {
    images: slide(5, 6, 1),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      '2D radar with operator markers',
      'Radar range and zoom',
      'DMZ loot: cash, bags, Hajin routes',
      'Armor, ammo, contracts, extracts',
      'Vehicle markers on farmland roads',
      'Loot layer off by default in 6v6',
      'No recoil & no spread',
      'Stream-proof overlay',
      'Custom crosshair',
      'Two saved configs (6v6 & DMZ)',
      'Priority update queue',
    ],
    overview: {
      title: 'Full toolkit for MW4 on PC',
      paragraphs: [
        'Elite layers radar, DMZ loot, and misc combat assists on top of Pro—use separate profiles so DMZ clutter does not leak into 6v6.',
        'Check status on the homepage before purchase; profiles should stay conservative after every patch.',
      ],
    },
  },
  ugc: {
    images: slide(4, 5, 6),
    goodToKnow:
      'Gather order email, platform details, and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'Results vary by case type. Permanent bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: `Order email used at checkout or on ${new URL(SITE_URL).hostname}.` },
      { icon: 'reqShieldAccount', text: 'Account details and restriction notice if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for the case dashboard and support.' },
    ],
    fullFeatures: [
      'Appeal workflow templates',
      'Dispute follow-up tracking',
      'Case documentation structure',
      'Status notes',
      'Evidence upload layout',
      'Timeline tracker',
      'Response draft helpers',
      'Multi-platform scope notes',
    ],
    overview: {
      title: 'Account restriction workspace',
      paragraphs: [
        'UGC helps you organize appeals and follow-ups when access is limited—automation for paperwork, not a promised reversal.',
        'When the platform flags hardware, follow partner or portal guidance in your order email.',
      ],
    },
  },
  'unlock-all': {
    images: slide(1, 2, 3),
    goodToKnow:
      'Cosmetic previews are client-side. Others see your real loadout in matchmaking. Often bundled with Elite.',
    limitations: 'Does not change store purchases. Other players cannot see preview-only items.',
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'Weapon blueprint preview',
      'Operator skin preview',
      'Attachment cosmetic view',
      'Favorites list',
      'Loadout export',
      'HUD theme sampling',
      'Stream capture test mode',
    ],
    overview: {
      title: 'Local loadout preview',
      paragraphs: [
        'Skin changer / cosmetic preview lets you test looks before you commit—included with Elite in many bundles.',
        'Use for thumbnails or offline planning; live inventory rules still apply online.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName =
      cheat.name === 'Lite' ? 'COD MW 4' : cheat.name === 'Pro' ? 'MW4 Pro' : 'MW4 Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: slug === 'lite' ? CHECKOUT.mw4 : checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl:
          slug === 'ugc'
            ? CHECKOUT.ugc
            : slug === 'unlock-all'
              ? CHECKOUT.skinChanger
              : checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

/** Pro / Elite cards hidden from home + products hub grid; detail URLs stay buildable. */
const PRODUCT_HUB_HIDDEN_TIER_SLUGS = new Set(['pro', 'elite']);

export const productHubCatalog = productPages.filter(
  (p) => !(p.kind === 'tier' && PRODUCT_HUB_HIDDEN_TIER_SLUGS.has(p.slug)),
);

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides = slide(0, 1, 2, 3, 4, 5, 6);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'COD MW4 cheat tiers plus UGC and cosmetic utilities—aim, ESP, radar, and DMZ overlays for PC.',
  buyUrl: checkoutPath('mw4'),
};
