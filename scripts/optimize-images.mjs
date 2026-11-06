import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const widths = [320, 400, 512, 640, 960];
/** Filenames we generate end with `-{width}.webp` (e.g. screenshot-1-400.webp). Skip only those — not bases like screenshot-1.webp. */
const generatedWidthSuffix = new Set(widths.map(String));

const dirs = [
  { relativeDir: 'public/images/gameplay', extensions: ['.png'] },
  { relativeDir: 'public/images/blog', extensions: ['.png'] },
  { relativeDir: 'public/images/mw4', extensions: ['.png', '.webp', '.jpg', '.jpeg'] },
];

async function optimizeDir(config) {
  const dir = path.join(root, config.relativeDir);
  if (!fs.existsSync(dir)) return;

  const exts = config.extensions.map((e) => e.toLowerCase());
  const files = fs.readdirSync(dir).filter((file) => {
    const lower = file.toLowerCase();
    if (!exts.some((ext) => lower.endsWith(ext))) return false;
    if (lower.endsWith('.webp')) {
      const m = lower.match(/-(\d+)\.webp$/);
      if (m && generatedWidthSuffix.has(m[1])) return false;
    }
    return true;
  });

  for (const file of files) {
    const input = path.join(dir, file);
    const parsed = path.parse(file);
    const base = parsed.name;

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete.');
