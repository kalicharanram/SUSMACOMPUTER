/**
 * Publishes the built site to GitHub Pages via the gh-pages branch.
 *
 *   npm run deploy:pages
 *
 * Why a separate branch: GitHub Pages only serves static files. A React app has
 * to be compiled first (npm run build → dist/), and GitHub expects that compiled
 * output on a dedicated branch. The source stays on main.
 *
 * 404.html is a copy of index.html. GitHub Pages has no server-side rewrite, so
 * this is what makes deep links fall back to the app instead of 404ing.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');

if (!existsSync(path.join(dist, 'index.html'))) {
  console.error('\n  dist/index.html nahi mila. Pehle `npm run build` chalao.\n');
  process.exit(1);
}

// SPA fallback for GitHub Pages
copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));

const git = (...args) => {
  console.log('  git ' + args.join(' '));
  execFileSync('git', args, { cwd: root, stdio: 'inherit' });
};

const has = (branch) => {
  try {
    execFileSync('git', ['rev-parse', '--verify', branch], { cwd: root, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const remote = process.argv.includes('--push');

console.log('\nPublishing to gh-pages\n');

// Save whatever is in flight so switching branches cannot lose work
if (execFileSync('git', ['status', '--porcelain'], { cwd: root }).toString().trim()) {
  git('stash', 'push', '-u', '-m', 'pre-deploy');
}

// Fresh orphan branch = only dist contents, no history
if (has('gh-pages')) git('branch', '-D', 'gh-pages');
git('checkout', '--orphan', 'gh-pages');
git('rm', '-rf', '--cached', '.', '-q');
git('add', '-f', 'dist');
git('commit', '-m', 'Deploy: build output for GitHub Pages');

if (remote) {
  git('push', '-u', 'origin', 'gh-pages', '--force');
} else {
  console.log('\n  gh-pages branch ready (not pushed — rerun with --push).');
}

git('checkout', '-');

const stashed = has('stash@{0}') && execFileSync('git', ['stash', 'list']).toString().includes('pre-deploy');
if (stashed) git('stash', 'pop');

console.log(remote ? '\nDone — pushed to gh-pages.\n' : '\nDone.\n');