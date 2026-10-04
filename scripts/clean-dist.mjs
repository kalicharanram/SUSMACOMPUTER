/**
 * Removes source-only folders from dist after a build.
 *
 * Everything inside public/ is copied verbatim into dist — including
 * public/images/services/_raw, which holds the 22 unprocessed source PNGs
 * (≈700 KB). Those are build inputs, not site assets, and have no business
 * being published. Runs automatically via the npm `postbuild` hook.
 */
import { rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '..', 'dist');

/** folders that must never reach the deployed site */
const EXCLUDE = ['images/services/_raw'];

for (const rel of EXCLUDE) {
  const target = path.join(dist, rel);
  if (existsSync(target)) {
    await rm(target, { recursive: true, force: true });
    console.log(`  removed  dist/${rel}`);
  }
}

// GitHub Pages: without this file Jekyll strips directories whose names begin
// with an underscore, which would drop the /assets/ JS and CSS bundles.
const nojekyll = path.join(dist, '.nojekyll');
if (!existsSync(nojekyll)) {
  const { writeFile } = await import('node:fs/promises');
  await writeFile(nojekyll, '');
  console.log('  added    dist/.nojekyll');
}