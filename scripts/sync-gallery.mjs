/**
 * Optimises every image in public/images/gallery/ and generates the gallery list.
 *
 *   npm run gallery
 *
 * One command does both:
 *   1. Each photo is centre-cropped to 4:3, capped at 1000px wide, and written
 *      as JPEG (the site uses these) plus a WebP sibling.
 *   2. src/data/site.js is rewritten so every image in the folder is listed.
 *
 * Photos straight off a phone are 2-4 MB each. Around twenty of those on one
 * page would be tens of megabytes, which no visitor on a mobile connection
 * waits for — so resizing here is what keeps the gallery usable.
 */
import sharp from 'sharp';
import { readdir, writeFile, readFile, stat, unlink, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const DIR = path.join(root, 'public', 'images', 'gallery');
const SITE = path.join(root, 'src', 'data', 'site.js');

const WIDTH = 1000;   // rendered at ~300px; 1000 gives 3x headroom
const QUALITY = 80;

if (!existsSync(DIR)) {
  console.log(`\nFolder nahi mila: ${DIR}\n`);
  process.exit(0);
}

const all = await readdir(DIR);
const sources = all
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

if (sources.length === 0) {
  console.log(`\n${DIR} me koi photo nahi hai.\n`);
  process.exit(0);
}

/* ------------------------------------------- 1. normalise names + optimise */
console.log(`\n${sources.length} photo process ho rahi hain...\n`);

const kept = [];
let before = 0;
let after = 0;

for (const file of sources) {
  const src = path.join(DIR, file);

  // Stable, URL-safe filename: lowercase, spaces -> dash, no devanagari breakage
  const slug =
    file
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'photo';

  const stem = slug.replace(/-\d{4}-\d{2}-\d{2}$/, ''); // drop an EXIF date suffix
  const out = path.join(DIR, `${stem}.jpg`);

  before += (await stat(src)).size;

  // Sharp refuses to read and write the same path, and several sources already
  // sit at their target name (gst.jpg -> gst.jpg). Rendering to a temp file and
  // moving it into place handles both cases.
  const tmp = path.join(os.tmpdir(), `gal-${process.pid}-${kept.length}.jpg`);

  await sharp(src)
    .resize(WIDTH, Math.round((WIDTH * 3) / 4), { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
    .toFile(tmp);

  await sharp(tmp).webp({ quality: QUALITY - 8 }).toFile(path.join(DIR, `${stem}.webp`));

  await rename(tmp, out);

  after += (await stat(out)).size;

  // remove the original (and any webp it brought along) when renamed or oversized
  if (path.resolve(src) !== path.resolve(out)) await unlink(src).catch(() => {});
  await unlink(src.replace(/\.[^.]+$/, '.webp')).catch(() => {});

  kept.push({ file: `${stem}.jpg`, label: titleCase(stem) });
  console.log(`  ${file.padEnd(24)} -> ${stem}.jpg`);
}

function titleCase(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => (/^[a-z0-9]{2,5}$/.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

/* --------------------------------------------- 2. rewrite the site.js array */
const block = `export const gallery = [\n${
  kept.map((k) => `  { src: './images/gallery/${k.file}', label: '${k.label}' },`).join('\n')
}\n];`;

let source = await readFile(SITE, 'utf8');
const re = /export const gallery = \[[\s\S]*?\];/;

if (!re.test(source)) {
  console.error('\n  site.js me gallery array nahi mila.\n');
  process.exit(1);
}

await writeFile(SITE, source.replace(re, block));

console.log(
  `\n  ${kept.length} photo  |  ${(before / 1024 / 1024).toFixed(1)} MB  ->  ${(after / 1024 / 1024).toFixed(2)} MB`
);
console.log('  site.js update ho gaya\n');