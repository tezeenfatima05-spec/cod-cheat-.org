/**
 * Build favicons from scripts/favicon-source.png — trim flat edges, transparent background, resize.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const src = path.join(root, 'scripts', 'favicon-source.png');
const pub = path.join(root, 'public');

if (!fs.existsSync(src)) {
  console.error('Missing scripts/favicon-source.png — add the source image first.');
  process.exit(1);
}

async function main() {
  let img = sharp(src).ensureAlpha();

  // Remove near-uniform border (purple UI chrome) if present
  try {
    img = img.trim({ threshold: 24 });
  } catch {
    // ignore trim failures on odd formats
  }

  const pipelineBase = img.png();

  await pipelineBase
    .clone()
    .resize(32, 32, {
      fit: 'contain',
      position: 'center',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(path.join(pub, 'favicon-32.png'));

  await pipelineBase
    .clone()
    .resize(16, 16, {
      fit: 'contain',
      position: 'center',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(path.join(pub, 'favicon-16.png'));

  await pipelineBase
    .clone()
    .resize(180, 180, {
      fit: 'contain',
      position: 'center',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(path.join(pub, 'apple-touch-icon.png'));

  // Copy 32px PNG as generic favicon.ico fallback (many servers expect the path)
  fs.copyFileSync(path.join(pub, 'favicon-32.png'), path.join(pub, 'favicon.ico'));

  // Lightweight SVG wrapper so vector tab icon picks up the new art
  const png32 = fs.readFileSync(path.join(pub, 'favicon-32.png'));
  const href = `data:image/png;base64,${png32.toString('base64')}`;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <image href="${href}" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  fs.writeFileSync(path.join(pub, 'favicon.svg'), svg, 'utf8');

  console.log('Favicons written: favicon-16.png, favicon-32.png, favicon.ico, favicon.svg, apple-touch-icon.png');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
