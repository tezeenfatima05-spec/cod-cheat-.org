export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: 14,
    flair: 'Guide Q&A (demo)',
    body: [answer, detail],
    comments: [{ author: 'guide_team', age: 'From the guide', score: 0, body: tip }],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-goes-on-lite-tier',
    title: 'What ships on Lite for MW4?',
    upvotes: 52,
    excerpt: 'Demo Q&A summarizing ESP-only coverage from the Lite vs Pro blog.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Lite vs Pro: which COD MW4 tier fits you',
    sourcePath: '/blog/mw4-lite-vs-pro/',
    answer:
      'Lite is the ESP lane: boxes or corner boxes, skeleton, health/armor, distance, optional name, weapon, snapline, squad tinting, quieter behind-cover color, and stream-proof capture modes.',
    detail: 'It intentionally skips smooth aim, trigger timing, radar, and DMZ loot so 6v6 stays readable.',
    tip: 'Sample thread for layout—confirm modules on the product page before purchase.',
  }),
  guideDiscussion({
    slug: 'split-dmz-and-mp-profiles',
    title: 'How do I split DMZ and Multiplayer configs?',
    upvotes: 41,
    excerpt: 'Demo discussion about using two saved profiles instead of one overloaded preset.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Aim profiles for 6v6 versus DMZ rotations',
    sourcePath: '/blog/mw4-aimbot-dmz-config/',
    answer:
      'Duplicate your baseline profile, rename one “6v6” and one “DMZ.” On DMZ only, enable loot layers and wider radar zoom; keep those toggles off on the MP copy.',
    detail: 'Switch profiles in the portal before queueing so you never forget which stack is active.',
    tip: 'This thread is illustrative—always follow the portal labels shipped with your build.',
  }),
  guideDiscussion({
    slug: 'radar-zoom-ground-war',
    title: 'Radar zoom for big playlists vs small maps?',
    upvotes: 36,
    excerpt: 'Highlights from the radar zoom article in demo form.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: '2D radar zoom and range for MW4',
    sourcePath: '/blog/mw4-2d-radar-zoom/',
    answer:
      'Ground War benefits from a wider radar window so distant blips stay separated; on small maps tighten zoom so multiple players are not stacked on one dot.',
    detail: 'Pair radar adjustments with ESP distance caps—if both shout at you, lower one.',
    tip: 'Sample commentary only; tune using private matches first.',
  }),
  guideDiscussion({
    slug: 'trigger-hold-key-explained',
    title: 'Why use a hold key on trigger timing?',
    upvotes: 29,
    excerpt: 'Demo explainer pulled from the triggerbot guide.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Triggerbot delay and hold-key workflow',
    sourcePath: '/blog/mw4-triggerbot-guide/',
    answer:
      'A hold key makes sure the trigger only evaluates shots when you commit to pulling—sprays you did not mean to take stay untouched.',
    detail: 'Short delays keep single shots believable; lengthen delay slightly for long-range poke.',
    tip: 'Illustrative thread; verify delay ranges against your sensitivity.',
  }),
  guideDiscussion({
    slug: 'dmz-loot-noise',
    title: 'How do I stop DMZ loot from cluttering MP?',
    upvotes: 24,
    excerpt: 'Notes from the DMZ loot checklist rendered as demo forum copy.',
    category: 'Patch Talk',
    categoryTone: 'orange',
    sourceTitle: 'DMZ loot layers: Hajin checklist',
    sourcePath: '/blog/mw4-dmz-loot-checklist/',
    answer: 'Never share one profile between playlists. DMZ layers belong on a DMZ-only preset with loot, contracts, vehicles, and extract markers enabled.',
    detail: 'When you return to Multiplayer, load the ESP-first profile with loot toggled off.',
    tip: 'Demo content: treat it as a reminder, not live telemetry.',
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'first-time-loader-checklist-mw4',
    category: 'General',
    categoryTone: 'purple',
    title: 'First-time loader checklist (demo thread)',
    excerpt: 'Sample workflow: status banner → portal download → private lobby → live queue.',
    author: 'guide_team',
    age: '3 hours ago',
    commentsCount: 2,
    upvotes: 64,
    flair: 'Pinned sample',
    sourceTitle: 'Windows PC prep for MW4 loaders',
    sourcePath: '/blog/mw4-pc-setup-windows/',
    body: [
      'This is a demo thread that mirrors the Windows prep article—use it to see how the forum layout handles long setup posts.',
      'Always read the live status banner before installing anything from your portal.',
    ],
    comments: [
      {
        author: 'sample_user',
        age: '2 hours ago',
        score: 9,
        body: 'Helpful reminder to whitelist the loader folder—Defender grabbed mine on first launch.',
      },
      {
        author: 'guide_team',
        age: '1 hour ago',
        score: 3,
        body: 'Exactly. Add exclusions only for the verified path listed in your portal email.',
      },
    ],
  },
  {
    slug: 'esp-distance-too-noisy',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'ESP feels noisy in 6v6—what do I tweak first?',
    excerpt: 'Demo discussion referencing the player ESP distance article.',
    author: 'visuals_focused',
    age: '5 hours ago',
    commentsCount: 2,
    upvotes: 48,
    flair: 'Sample',
    sourceTitle: 'MW4 player ESP: distance caps that keep 6v6 readable',
    sourcePath: '/blog/mw4-player-esp-distance/',
    body: [
      'Start by lowering max distance before you touch colors. Most clutter comes from drawing operators three lanes away.',
      'Turn off optional name tags until comms require them—the box + skeleton combo is usually enough.',
    ],
    comments: [
      {
        author: 'rotation_6v6',
        age: '4 hours ago',
        score: 11,
        body: 'Corner boxes + shorter distance fixed 90% of the noise for me.',
      },
      {
        author: 'visuals_focused',
        age: '3 hours ago',
        score: 4,
        body: 'Demo reply: exactly—distance first, cosmetics second.',
      },
    ],
  },
  {
    slug: 'patch-day-pause',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Patch dropped—do we queue tonight? (demo)',
    excerpt: 'Sample caution thread about waiting for status after title updates.',
    author: 'status_watch',
    age: '1 day ago',
    commentsCount: 2,
    upvotes: 33,
    flair: 'Sample',
    sourceTitle: 'Patch-day loader checklist for COD MW4',
    sourcePath: '/blog/mw4-patch-day-loader/',
    body: [
      'Treat the first night after a major patch as maintenance time—even if the game launches, loaders may lag behind.',
      'Run a private match with overlays disabled except one diagnostic module to confirm stability.',
    ],
    comments: [
      {
        author: 'safe_queue',
        age: '20 hours ago',
        score: 7,
        body: 'I wait for the banner + a friend to confirm overlays render correctly.',
      },
      {
        author: 'status_watch',
        age: '18 hours ago',
        score: 2,
        body: 'Demo note: patience beats account strikes.',
      },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
