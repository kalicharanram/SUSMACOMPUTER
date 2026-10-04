/**
 * Publishes the built site to GitHub Pages via the gh-pages branch.
 *
 *   npm run deploy:pages        (build the branch, do not push)
 *   npm run deploy:push         (build the branch and push it)
 *
 * Why a separate branch: GitHub Pages only serves static files. A React app has
 * to be compiled first (npm run build -> dist/), and GitHub expects that compiled
 * output on a dedicated branch. The source stays on main.
 *
 * Two details this script exists to get right:
 *
 *  1. The *contents* of dist must land at the ROOT of gh-pages. Adding the
 *     `dist` folder itself puts index.html one level too deep, and GitHub Pages
 *     serves a 404 because it only looks for /index.html.
 *
 *  2. 404.html is a copy of index.html. GitHub Pages has no server-side rewrite,
 *     so this is what makes deep links fall back to the app instead of erroring.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
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

const git = (...args) => {
  execFileSync('git', args, { cwd: root, stdio: 'inherit' });
};

// Park the built site outside the repo so `git clean` cannot wipe it
const parked = path.join(os.tmpdir(), `susma-pages-${process.pid}`);
mkdirSync(parked, { recursive: true });
cpSync(dist, parked, { recursive: true });

// SPA fallback for GitHub Pages
copyFileSync(path.join(parked, 'index.html'), path.join(parked, '404.html'));

console.log('\nPublishing to gh-pages\n');

// Never lose uncommitted work
if (execFileSync('git', ['status', '--porcelain'], { cwd: root }).toString().trim()) {
  git('stash', 'push', '-u', '-m', 'pre-deploy');
}

try {
  git('checkout', '--orphan', 'gh-pages');
} catch {
  /* already on it */
}

git('rm', '-rf', '--cached', '.', '-q');
git('clean', '-fdx', '-q'); // remove every tracked + untracked file

// Built files go to the branch ROOT, not into a dist/ subfolder
cpSync(parked, root, { recursive: true });
rmSync(path.join(root, 'dist'), { recursive: true, force: true });

git('add', '-A');
git('commit', '-m', 'Deploy: build output for GitHub Pages');

const remote = process.argv.includes('--push');
if (remote) {
  git('push', '-u', 'origin', 'gh-pages', '--force');
}

git('checkout', '-');

const stashed = execFileSync('git', ['stash', 'list']).toString().includes('pre-deploy');
if (stashed) git('stash', 'pop');

rmSync(parked, { recursive: true, force: true });

// Fail loudly rather than shipping a 404
const listed = execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD'], { cwd: root }).toString();
const rootOk = /(^|\n)index\.html(\n|$)/.test(listed);
const nested = /^dist\//m.test(listed);
console.log(
  rootOk && !nested
    ? '  layout OK - index.html at branch root'
    : '  WARNING - unexpected layout'
);
console.log(remote ? '\nPushed to gh-pages.\n' : '\nBranch built. Rerun with --push to publish.\n');