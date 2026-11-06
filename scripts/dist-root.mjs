import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

/**
 * Astro static assets land in `dist/` by default, or `dist/client/` when using
 * `@astrojs/cloudflare` (and some other adapters). Post-build scripts must match.
 */
export function getDistRoot() {
  const env = process.env.ASTRO_DIST_DIR?.trim();
  if (env) {
    const resolved = path.isAbsolute(env) ? env : path.join(root, env);
    if (fs.existsSync(resolved)) return resolved;
  }
  const client = path.join(root, 'dist', 'client');
  if (fs.existsSync(client)) return client;
  return path.join(root, 'dist');
}
