/**
 * Service images — crop + optimise the photos in public/images/services/_raw/
 *
 *   npm run services
 *
 * The mapping below is explicit rather than guessed from filenames. Fuzzy name
 * matching silently put the wrong photo on the wrong service, and two files
 * overwrote each other because they resolved to the same target.
 */
import sharp from 'sharp';
import path from 'node:path';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const RAW = path.join(root, 'public', 'images', 'services', '_raw');
const OUT = path.join(root, 'public', 'images', 'services');

/** raw filename -> target filename (must match `img` in src/data/site.js) */
const MAP = {
  '01-computer-digital-work.png': '01-computer-job-work.jpg',
  '02-online-form-filling.png': '02-online-form-filling.jpg',
  '05-videography.png': '03-videography.jpg',
  '04-photography.png': '04-photography.jpg',
  '06-video-editing.png': '05-video-mixing.jpg',
  '07-computer-sales-assembly.png': '06-computer-assemble.jpg',
  '08-computer-accessories.png': '07-computer-accessories.jpg',
  '09-mobile-accessories.png': '08-mobile-accessories.jpg',
  '10-household-items.png': '09-household-items.jpg',
  '11-recharge-payments.png': '11-mobile-recharge.jpg',
  '12-website-development.png': '12-website-designing.jpg',
  '13-youtube-services.png': '13-youtube-setup.jpg',
  '14-graphic-poster-design.png': '14-poster-design.jpg',
  '15-gst-services.png': '15-itr-gst-filing.jpg',
  '17-school-id-cards.png': '16-id-card.jpg',
  '18-rubber-stamps.png': '17-rubber-stamp.jpg',
  '03-digital-seva-kendra.png': '18-digital-seva-kendra.jpg',
  '20-digital-marketing.png': '19-digital-profile.jpg',
  '19-google-business-profile.png': '20-google-business.jpg',
  '21-photo-advertising.png': '21-advertising.jpg',
  '22-video-advertising.png': '22-all-services.jpg',
};

/** Kept aside — no service in site.js uses it. */
const EXTRA = {
  '16-itr-tax-services.png': 'koi service nahi bachi — ITR & GST Filing me 15-gst-services.png use hua',
};

const EXPECTED = [
  '01-computer-job-work.jpg', '02-online-form-filling.jpg', '03-videography.jpg',
  '04-photography.jpg', '05-video-mixing.jpg', '06-computer-assemble.jpg',
  '07-computer-accessories.jpg', '08-mobile-accessories.jpg', '09-household-items.jpg',
  '11-mobile-recharge.jpg', '12-website-designing.jpg',
  '13-youtube-setup.jpg', '14-poster-design.jpg', '15-itr-gst-filing.jpg',
  '16-id-card.jpg', '17-rubber-stamp.jpg', '18-digital-seva-kendra.jpg',
  '19-digital-profile.jpg', '20-google-business.jpg', '21-advertising.jpg',
  '22-all-services.jpg',
];

const lower = (s) => s.toLowerCase();

if (!existsSync(RAW)) {
  console.log(`\nRaw folder nahi mili:\n   ${RAW}\n`);
  console.log(`Banane ka command:  mkdir "${RAW}"\n`);
  process.exit(0);
}

await mkdir(OUT, { recursive: true });
const files = await readdir(RAW);
const images = files.filter((f) => /\.(jpe?g|png|webp|bmp|tiff?)$/i.test(f));

if (images.length === 0) {
  console.log(`\n${RAW} me koi photo nahi mili.\n`);
  process.exit(0);
}

/* ---------- clear any previously generated output so renames are clean -- */
for (const f of EXPECTED) {
  for (const ext of ['.jpg', '.webp']) {
    const p = path.join(OUT, f.replace(/\.jpg$/, ext));
    if (existsSync(p)) await stat(p).then(() => import('node:fs/promises').then((fs) => fs.unlink(p)));
  }
}

console.log(`\n${images.length} photo(s) mili\n`);

let done = 0;
const used = new Set();

for (const [rawName, target] of Object.entries(MAP)) {
  const src = path.join(RAW, rawName);
  if (!existsSync(src)) {
    console.log(`  MISS  ${rawName.padEnd(30)} (raw file nahi mili)`);
    continue;
  }
  used.add(lower(rawName));

  const out = path.join(OUT, target);
  await sharp(src)
    .resize(200, 120, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 84, progressive: true, mozjpeg: true })
    .toFile(out);
  await sharp(out).webp({ quality: 78 }).toFile(out.replace(/\.jpg$/, '.webp'));

  const { size } = await stat(out);
  console.log(`  OK    ${rawName.padEnd(30)} -> ${target.padEnd(30)} ${(size / 1024).toFixed(0)} KB`);
  done++;
}

const unused = images.filter((f) => !used.has(lower(f)));
if (unused.length) {
  console.log(`\nUse nahi hui photo(s):`);
  unused.forEach((f) => {
    const note = EXTRA[lower(f)] ?? EXTRA[f] ?? 'mapping nahi hai';
    console.log(`  - ${f}   (${note})`);
  });
}

const missing = EXPECTED.filter((f) => !existsSync(path.join(OUT, f)));
if (missing.length) {
  console.log(`\nAbhi bhi missing (${missing.length}/22):`);
  missing.forEach((f) => console.log(`  - ${f}`));
}

console.log(`\nDone — ${done}/21 image(s) install.\n`);
