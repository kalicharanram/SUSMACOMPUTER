import {
  Laptop, ClipboardList, Video, Camera, MonitorPlay, Cpu, Keyboard, Headphones,
  CookingPot, Tv, Smartphone, Globe, PlaySquare, Image, FileText, IdCard, Stamp,
  Landmark, BadgeCheck, MapPin, Megaphone, LayoutGrid,
  Users, House, Gauge, Headset, Medal,
} from 'lucide-react';

/**
 * Every icon referenced by name in src/data/site.js
 * Note: lucide-react v1 dropped brand marks, so "YouTube Channel Setup" uses
 * PlaySquare here. Swap it freely by name if you prefer a different glyph.
 */
export const ICONS = {
  // services
  Laptop, ClipboardList, Video, Camera, MonitorPlay, Cpu, Keyboard, Headphones,
  CookingPot, Tv, Smartphone, Globe, PlaySquare, Image, FileText, IdCard, Stamp,
  Landmark, BadgeCheck, MapPin, Megaphone, LayoutGrid,
  // why choose us
  Users, House, Gauge, Headset, Medal,
};

/** Pastel background, matching icon colour, and a deeper hover shade */
export const TONES = {
  blue: { bg: 'bg-p-blue', fg: 'text-[#2C6BD6]', hov: 'hover:bg-[#C7DCFF]' },
  peach: { bg: 'bg-p-peach', fg: 'text-[#E07B39]', hov: 'hover:bg-[#FFD3B8]' },
  pink: { bg: 'bg-p-pink', fg: 'text-[#DB4A78]', hov: 'hover:bg-[#FFC6D6]' },
  lav: { bg: 'bg-p-lav', fg: 'text-[#7A5AF0]', hov: 'hover:bg-[#DDD2FF]' },
  mint: { bg: 'bg-p-mint', fg: 'text-[#12A268]', hov: 'hover:bg-[#BFEBD3]' },
  cream: { bg: 'bg-p-cream', fg: 'text-[#C79A08]', hov: 'hover:bg-[#FFEAA0]' },
};

/** Renders an icon by its string name, falling back to a neutral glyph. */
export function Icon({ name, className = '', strokeWidth = 1.7 }) {
  const Cmp = ICONS[name] ?? LayoutGrid;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

/* --------------------------------------------------------------- BRAND ---- */
export function Logo({ className = '', size = 44 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B6DD6" />
          <stop offset="100%" stopColor="#0A1B4E" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#lg)" />
      {/* stylised S, matching the reference mark */}
      <path
        d="M66 34c-4-5-10-7-17-7-11 0-19 6-19 15 0 8 6 12 17 14 8 2 11 4 11 8 0 5-5 8-12 8-7 0-12-3-15-8l-8 8c5 8 13 12 23 12 12 0 21-7 21-18 0-9-6-13-18-16-7-2-10-3-10-7 0-4 4-7 10-7 5 0 9 2 12 5z"
        fill="#fff"
      />
      {/* red + yellow accent arcs, as in the reference logo */}
      <path d="M14 34a46 46 0 0 1 22-22" stroke="#E01F26" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M64 88a46 46 0 0 0 22-22" stroke="#FFD100" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------- SOCIAL -- */
/* Brand marks are prefixed `Brand` so they never collide with the
   same-named lucide icons (Facebook, Instagram, Youtube …).                  */
const s = { fill: 'currentColor' };

export function BrandFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...props} aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function BrandInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...props} aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Z" />
      <path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  );
}

export function BrandYoutube(props) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...props} aria-hidden="true">
      <path d="M23.5 6.9a3.02 3.02 0 0 0-2.12-2.14C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.9C0 8.79 0 12 0 12s0 3.21.5 5.1a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.21 24 12 24 12s0-3.21-.5-5.1ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

export function BrandMaps(props) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...props} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

export function BrandWhatsApp(props) {
  /*
   * Hand-written glyph with spaces between every number. Minified paths like
   * `-.4.5-.9` are ambiguous and some SVG parsers reject them, so the spacing
   * here is deliberate — do not compress this string.
   */
  return (
    <svg viewBox="0 0 24 24" {...s} {...props} aria-hidden="true">
      <path d="M12 2 C 8.13 2 5 5.13 5 9 c 0 1.74 0.46 3.45 1.32 4.91 L 5 22 l 8.34 -2.29 A 9.96 9.96 0 0 0 12 20 c 3.87 0 7 -3.13 7 -7 s -3.13 -7 -7 -7 Z" />
      <path
        d="M9.2 7.3 c -0.2 0 -0.4 0.1 -0.6 0.3 c -0.2 0.2 -0.7 0.7 -0.7 1.7 c 0 1 0.7 2 0.8 2.1 c 0.1 0.2 1.4 2.3 3.5 3.1 c 1.7 0.7 2.1 0.6 2.5 0.5 c 0.4 -0.1 1.3 -0.5 1.5 -1.1 c 0.2 -0.6 0.2 -1.1 0.1 -1.2 c -0.1 -0.1 -0.3 -0.2 -0.6 -0.4 l -1.3 -0.6 c -0.2 -0.1 -0.4 -0.1 -0.5 0.1 l -0.6 0.8 c -0.1 0.2 -0.3 0.2 -0.5 0.1 c -0.8 -0.4 -1.8 -1.5 -2.2 -2.3 c -0.1 -0.2 0 -0.4 0.1 -0.5 l 0.4 -0.5 c 0.1 -0.2 0.2 -0.3 0.2 -0.5 l -0.6 -1.4 c -0.1 -0.3 -0.3 -0.3 -0.5 -0.3 Z"
        fill="#fff"
      />
    </svg>
  );
}

export const SOCIALS = {
  facebook: BrandFacebook,
  instagram: BrandInstagram,
  youtube: BrandYoutube,
  maps: BrandMaps,
};

/** Brand colours for the app-style squares in the top bar */
export const SOCIAL_BG = {
  facebook: 'bg-[#1877F2]',
  instagram: 'bg-[linear-gradient(135deg,#F58529_0%,#DD2A7B_50%,#8134AF_100%)]',
  youtube: 'bg-[#FF0000]',
  maps: 'bg-[#00A84F]',
};