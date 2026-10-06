import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Icon, TONES, Logo } from './Icons';
import { services, whyUs, gallery, reviews, contact, business } from '../data/site';

/* ============================================================== SERVICES == */
/**
 * One single row of service cards that scrolls continuously from right to left.
 *
 * About six cards fill the viewport; the rest sit off-screen on both sides.
 * The list is rendered twice and the track is shifted by exactly -50%, so the
 * second copy lines up where the first one ends and the loop is seamless —
 * the card arriving from the right is the one that just left on the left.
 */
export function Services() {
  // Pause is driven from JS rather than a CSS hover utility: the `animation`
  // shorthand in `.animate-marquee` re-declares `animation-play-state`, which
  // makes a stylesheet-level override unreliable. An inline style always wins.
  const [paused, setPaused] = useState(false);

  return (
    <section id="services" className="bg-white py-5 sm:py-6">
      {/* Hovering anywhere in the strip stops the scroll, so a card can be read
          before it slides away. Leaving it resumes. */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* soft edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-16"
        />

        <div
          className="flex w-max animate-marquee gap-3 px-2"
          style={paused ? { animationPlayState: 'paused' } : undefined}
        >
          {[...services, ...services].map((s, i) => {
            const tone = TONES[s.tone] ?? TONES.blue;
            const dupe = i >= services.length;
            return (
              <div
                key={`${s.id}-${i}`}
                aria-hidden={dupe}
                className={`flex w-[124px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl text-center transition-all duration-200 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-lg sm:w-[144px] lg:w-[158px] ${tone.bg} ${tone.hov}`}
              >
                {/* aspect-[5/3] matches the 200x120 files exactly, so the whole
                    image is visible — a fixed height with object-cover was
                    slicing the top and bottom off every card. */}
                <img
                  src={`./images/services/${s.img}`}
                  alt={s.label}
                  loading="lazy"
                  width="200"
                  height="120"
                  className="aspect-[5/3] w-full object-cover"
                />
                <span className="px-1.5 py-1.5 text-[0.68rem] font-bold leading-tight text-ink">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-2.5 text-center text-[0.75rem] font-medium text-body/60">
        {services.length} services · scroll runs automatically
      </p>
    </section>
  );
}

/* ================================================================ WHY US == */
export function WhyUs() {
  return (
    <section id="about" className="bg-white pb-14">
      <div className="wrap">
        <div className="hero-grad rounded-2xl p-6 sm:p-9">
          <h2 className="text-[1.5rem] font-extrabold text-white sm:text-[1.8rem]">{whyUs.heading}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="text-brand-yellow">
                  <Icon name={item.icon} className="size-7" strokeWidth={1.7} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.98rem] font-bold text-white">{item.title}</span>
                  {item.sub && (
                    <span className="block text-[0.9rem] text-white/75">{item.sub}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =============================================================== GALLERY == */
/** Click-to-enlarge overlay. Escape or a click outside closes it. */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-2 pt-16 pb-4 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-2xl bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
      <img
        src={src}
        alt="Gallery preview"
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function Gallery() {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(0);
  const photo = gallery[active];
  const visiblePhotos = gallery.length > 1
    ? [photo, gallery[(active + 1) % gallery.length]]
    : photo ? [photo] : [];
  const move = (direction) => setActive((index) =>
    (index + direction + gallery.length) % gallery.length);

  useEffect(() => {
    if (paused || hovered || open || gallery.length < 2 ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % gallery.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, open, active]);

  return (
    <section id="gallery" className="bg-white pb-14">
      <div className="wrap flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[1.6rem] font-extrabold sm:text-[1.9rem]">Our Shop Gallery</h2>
        {photo && (
          <button
            type="button"
            onClick={() => setOpen(photo.src)}
            className="rounded-md bg-brand-blue px-4 py-2 text-[0.82rem] font-bold text-white hover:bg-brand-blue-dark"
          >
            Full Screen
          </button>
        )}
      </div>

      {photo ? (
        <div
          className="mt-6 w-full"
          role="region"
          aria-label="Shop photos"
          aria-roledescription="carousel"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(true);
          }}
        >
          <div className="relative px-2 sm:px-3">
            <div className="grid grid-cols-2 items-start gap-2 sm:gap-3">
              {visiblePhotos.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setOpen(item.src)}
                  aria-label={`Enlarge ${item.label}`}
                  className="min-w-0 cursor-zoom-in overflow-hidden bg-transparent"
                >
                  <img src={item.src} alt={item.label} className="gallery-full-image" />
                  <span className="block px-2 py-3 text-sm font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => { setPaused(true); move(-1); }}
              disabled={gallery.length < 2}
              aria-label="Previous photo"
              className="absolute left-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-transparent text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70 disabled:opacity-40 sm:left-2"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => { setPaused(true); move(1); }}
              disabled={gallery.length < 2}
              aria-label="Next photo"
              className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-transparent text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70 disabled:opacity-40 sm:right-2"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
          <div className="wrap mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold" aria-live={paused ? 'polite' : 'off'}>
              {visiblePhotos.map((_, offset) => (active + offset) % gallery.length + 1).join(' & ')} / {gallery.length} photos
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                className="min-h-11 rounded-md border border-slate-200 px-4 text-sm font-semibold"
              >
                {paused ? 'Play' : 'Pause'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-center text-sm text-body/60">Gallery abhi khaali hai.</p>
      )}

      <Lightbox src={open} onClose={() => setOpen(null)} />
    </section>
  );
}

/* =============================================================== REVIEWS == */
export function Reviews() {
  const [i, setI] = useState(0);
  const prev = () => setI((v) => (v - 1 + reviews.length) % reviews.length);
  const next = () => setI((v) => (v + 1) % reviews.length);
  const r = reviews[i];

  return (
    <section id="reviews" className="bg-slate-50 py-14">
      <div className="wrap">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[1.6rem] font-extrabold sm:text-[1.9rem]">Customer Reviews</h2>
            <a
              href="#reviews"
              className="rounded-md bg-brand-blue px-4 py-2 text-[0.82rem] font-bold text-white transition-colors hover:bg-brand-blue-dark"
            >
              View All
            </a>
          </div>

          <div className="mt-6 flex items-start gap-4">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="mt-6 grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-ink transition-colors hover:bg-slate-50"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <div className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-navy text-lg font-extrabold text-white">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-ink">{r.name}</div>
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <svg key={k} viewBox="0 0 24 24" className="size-4 fill-brand-yellow text-brand-yellow" aria-hidden="true">
                        <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-body">{r.text}</p>
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="mt-6 grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-ink transition-colors hover:bg-slate-50"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((rv, k) => (
              <button
                key={rv.name}
                onClick={() => setI(k)}
                aria-label={`Go to review ${k + 1}`}
                className={`size-2 rounded-full transition-colors ${k === i ? 'bg-brand-blue' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ FOOTER == */
export function Footer() {
  return (
    <footer id="contact" className="bg-navy py-10 text-white/85">
      <div className="wrap">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-start gap-3">
              <Logo size={44} />
              <div className="leading-none">
                <div className="text-[0.98rem] font-extrabold text-brand-blue">{business.name}</div>
                <div className="mt-1 text-[0.9rem] font-extrabold text-brand-red">{business.nameAccent}</div>
                <div className="mt-1.5 text-[0.58rem] text-white/70">{business.tagline}</div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 fill-brand-red" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <span className="text-[0.85rem] leading-relaxed">
              {contact.street}, {contact.town}
              <br />
              {contact.district}, {contact.state} - {contact.pin}
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 fill-brand-red" aria-hidden="true">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1l-2.3 2Z" />
            </svg>
            <span className="text-[0.85rem] leading-relaxed">
              <a href={`tel:${contact.phone1}`} className="hover:text-white">{contact.phone1}</a>
              <br />
              <span className="text-white/65">(Call / WhatsApp)</span>
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 fill-brand-red" aria-hidden="true">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
            </svg>
            <a href={`mailto:${contact.email}`} className="break-all text-[0.85rem] hover:text-white">
              {contact.email}
            </a>
          </div>

          <div className="flex items-start gap-2.5">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 fill-brand-red" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.4a15 15 0 0 0-1.4-5.8A8 8 0 0 1 19.9 11ZM12 4c.8 1.1 1.6 3.4 1.7 7h-3.4C10.4 7.4 11.2 5.1 12 4ZM4.1 13h3.4c.2 2.2.7 4.2 1.4 5.8A8 8 0 0 1 4.1 13Zm3.4-2H4.1a8 8 0 0 1 4.8-5.8A15 15 0 0 0 7.5 11ZM12 20c-.8-1.1-1.6-3.4-1.7-7h3.4c-.1 3.6-.9 5.9-1.7 7Zm2.1-7H9.9c-.1-3.4.8-5.9 1.7-7h3.4c.9 1.1 1.8 3.6 1.7 7Zm.5 9.8c.7-1.6 1.2-3.6 1.4-5.8h3.4a8 8 0 0 1-4.8 5.8Z" />
            </svg>
            <span className="text-[0.85rem] leading-relaxed">
              <a
                href={contact.websiteHref}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-saffron-300"
              >
                {contact.website}
              </a>
              {contact.websiteNote && (
                <span className="text-white/65">{contact.websiteNote}</span>
              )}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-[0.78rem] text-white/55">
            © {new Date().getFullYear()} {business.nameFull}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {['facebook', 'instagram', 'youtube', 'maps'].map((k) => (
              <a
                key={k}
                href="#"
                aria-label={k}
                className="grid size-9 place-items-center rounded-md bg-white/10 text-white transition-colors hover:bg-brand-red"
              >
                <SocialGlyph k={k} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialGlyph({ k }) {
  const paths = {
    facebook: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z',
    instagram:
      'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Z',
    youtube:
      'M23.5 6.9a3.02 3.02 0 0 0-2.12-2.14C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.9C0 8.79 0 12 0 12s0 3.21.5 5.1a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.21 24 12 24 12s0-3.21-.5-5.1ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z',
    maps: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z',
  };
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d={paths[k]} />
    </svg>
  );
}