/**
 * Publishes the built site to GitHub Pages.
 *
 *   npm run deploy:pages        (build the branch, do not push)
 *   npm run deploy:push         (build the branch and push it)
 *
 * Why a separate branch: GitHub Pages only serves static files. A React app has
 * to be compiled first (npm run build -> dist/), and GitHub expects that compiled
 * output on a dedicated branch. The source stays on main.
 *
 * This assembles the commit inside a throwaway repo in the temp folder instead
 * of checking out an orphan branch in the working tree. Two reasons, both learned
 * the hard way:
 *   - `git clean -fdx` cannot remove node_modules while the dev server holds
 *     those native bindings open, and it deletes .gitignore along the way.
 *   - Branch juggling in the working tree can silently clobber uncommitted work.
 * The project's working tree is never touched by this script.
 *
 * Two details that make the difference between a working site and a 404:
 *   1. The *contents* of dist must land at the branch ROOT. Pushing the dist
 *      folder itself buries index.html one level too deep.
 *   2. 404.html mirrors index.html — GitHub Pages has no server-side rewrite, so
 *      this is what lets deep links fall back to the app.
 */
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  copyFileSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');

if (!existsSync(path.join(dist, 'index.html'))) {
  console.error('\n  dist/index.html nahi mila. Pehle `npm run build` chalao.\n');
  process.exit(1);
}

const sh = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'inherit' });

/**
 * Same, but returns stdout. `stdio: 'inherit'` makes execFileSync return null —
 * there is no buffer to read — so any value we need must be captured here.
 */
const shOut = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });

let remote;
try {
  remote = shOut('git', ['remote', 'get-url', 'origin'], root).trim();
  if (!remote) throw new Error('empty');
} catch {
  console.error('\n  origin remote set nahi hai. Pehle `git remote add origin <url>` karo.\n');
  process.exit(1);
}

const stage = mkdtempSync(path.join(os.tmpdir(), 'susma-pages-'));

try {
  // Copy the CONTENTS of dist so files land at the branch root
  for (const entry of readdirSync(dist)) {
    cpSync(path.join(dist, entry), path.join(stage, entry), { recursive: true });
  }

  // SPA fallback + stop Jekyll from stripping the /assets folder
  copyFileSync(path.join(stage, 'index.html'), path.join(stage, '404.html'));
  writeFileSync(path.join(stage, '.nojekyll'), '');

  sh('git', ['init', '-q'], stage);
  sh('git', ['add', '-A'], stage);
  sh('git', ['commit', '-q', '-m', 'Deploy: build output for GitHub Pages'], stage);

  const files = shOut('git', ['ls-tree', '-r', '--name-only', 'HEAD'], stage);
  const rootOk = /(^|\n)index\.html(\n|$)/.test(files);
  const nested = /^dist\//m.test(files);

  console.log(`\n  staged ${files.trim().split('\n').length} files at branch root`);
  console.log(`  index.html at root  : ${rootOk ? 'yes' : 'NO'}`);
  console.log(`  nested dist/ folder: ${nested ? 'YES (bad)' : 'no'}`);

  if (!rootOk || nested) {
    console.error('\n  Layout galat hai, push nahi kiya.\n');
    process.exitCode = 1;
  } else if (process.argv.includes('--push')) {
    sh('git', ['remote', 'add', 'origin', remote], stage);
    sh('git', ['push', '--force', 'origin', 'HEAD:gh-pages'], stage);
    console.log('\n  pushed to gh-pages\n');
  } else {
    console.log('\n  branch built, not pushed (rerun with --push)\n');
  }
} finally {
  rmSync(stage, { recursive: true, force: true });
}