import type { IconName } from '../components/icons/types';

export const featureIcons: Record<string, IconName> = {
  Aimbot: 'stepCrosshair',
  Triggerbot: 'triggerBot',
  'Player ESP': 'featureEsp',
  Radar: 'featureRadar',
  'DMZ Loot': 'lootEsp',
  'Misc & QoL': 'featureUtilitySuite',
  'Profiles & configs': 'compareCloudBackup',
  'Patch delivery': 'compareCloudBackup',
};

export const whyUsIcons: IconName[] = ['whyShield', 'whyUsers', 'whyMonitor', 'whyHeadphones'];

export const setupStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqCheck'];

export const toolkitIcons: Record<string, IconName> = {
  Combat: 'toolkitCombat',
  Vision: 'toolkitVision',
  Radar: 'toolkitRadar',
  Weapons: 'toolkitWeapons',
  Movement: 'toolkitMovement',
  Profiles: 'toolkitProfiles',
};

export const workflowIcons: IconName[] = [
  'workflowAlert',
  'workflowPackage',
  'workflowSettings',
  'workflowCheck',
];

export const fieldNoteIcons: IconName[] = ['fieldCalendar', 'fieldShield', 'fieldHeadphones'];

export const blogTagIcons: Record<string, IconName> = {
  Guides: 'navBlog',
  Setup: 'settings',
  Features: 'layers',
  Updates: 'refresh',
  Troubleshooting: 'alert',
};

export const heroStatusPills: { icon: IconName; label: string }[] = [
  { icon: 'espActive', label: 'ESP Active' },
  { icon: 'radarOnline', label: 'Radar Online' },
  { icon: 'seasonBuild', label: 'PC build' },
  { icon: 'undetected', label: 'Status gate' },
  { icon: 'softAim', label: 'Smooth aim' },
  { icon: 'noRecoil', label: 'No Recoil' },
  { icon: 'streamProof', label: 'Stream Proof' },
  { icon: 'lootEsp', label: 'Loot ESP' },
  { icon: 'skeletonEsp', label: 'Skeleton ESP' },
  { icon: 'uavRadar', label: '2D Radar' },
  { icon: 'mapHack', label: 'Wall check' },
  { icon: 'support247', label: 'Support' },
  { icon: 'instantDelivery', label: 'Portal delivery' },
  { icon: 'rankedSafe', label: 'Readable HUD' },
  { icon: 'triggerBot', label: 'Trigger Bot' },
  { icon: 'boneSelect', label: 'Bone Select' },
  { icon: 'liveStatus', label: 'Live Status' },
  { icon: 'autoUpdates', label: 'Auto Updates' },
];

export const heroStatIcons: IconName[] = [
  'heroStatStream',
  'heroStatClock',
  'heroStatUsers',
  'heroStatHeadphones',
];

export const cheatTierIcons: Record<string, IconName> = {
  Lite: 'tierLite',
  Pro: 'tierPro',
  Elite: 'tierElite',
};

export const productCategoryIcons: Record<string, IconName> = {
  'Core product': 'coreProduct',
  'External suite': 'externalSuite',
  'DMA hardware': 'dmaHardware',
  'System utility': 'systemUtility',
  'Account recovery': 'accountRecovery',
  Cosmetic: 'cosmetic',
};

export const acquisitionStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqZap', 'acqCheck'];

/** After-purchase timeline on product detail — one distinct icon per step */
export const productAcquisitionStepIcons: IconName[] = [
  'liveStatus',
  'acqPackage',
  'headphones',
  'acqCheck',
];

/** Product detail requirement tiles — prefer compat-style icons where mapped */
export const productRequirementIcons: Partial<Record<IconName, IconName>> = {
  reqWindows: 'compatWindows',
  reqSteam: 'compatSteam',
  reqSettings: 'compatPackage',
  reqWifi: 'compatWifi',
  reqCpu: 'compatMonitor',
  reqRestorePoint: 'compatRefresh',
  reqShieldGuide: 'compatShield',
  reqMailOrder: 'mail',
  reqShieldAccount: 'compatShield',
  reqWifiPortal: 'compatWifi',
};

export function requirementDisplayIcon(icon: IconName): IconName {
  return productRequirementIcons[icon] ?? icon;
}

export const compatibilityIcons: IconName[] = [
  'compatWindows',
  'compatPackage',
  'compatSteam',
  'compatMonitor',
  'compatRefresh',
  'compatWifi',
  'compatDiscord',
  'compatShield',
];
