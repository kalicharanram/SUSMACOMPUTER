import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Icon, TONES, Logo } from './Icons';
import { services, whyUs, gallery, reviews, contact, business, visitCounter, socials } from '../data/site';
import { useLang } from '../i18n';

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
  const { t } = useLang();
  // Pause is driven from JS rather than a CSS hover utility: the `animation`
  // shorthand in `.animate-marquee` re-declares `animation-play-state`, which
  // makes a stylesheet-level override unreliable. An inline style always wins.
  const [paused, setPaused] = useState(false);

  return (
    <section id="services" className="bg-white py-5 sm:py-6">
      {/* Caption for the strip: a hairline in the brand blue running the full width,
          with the tiny label sitting in the middle of it. Two flex-1 rules of
          equal weight either side keep the label dead centre. */}
      <div className="mb-2 flex items-center gap-2.5 sm:gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-brand-blue/30" />
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink/60">
          {t('Services')}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-brand-blue/30" />
      </div>

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
                  alt={t(s.label)}
                  loading="lazy"
                  width="200"
                  height="120"
                  className="aspect-[5/3] w-full object-cover"
                />
                <span className="px-1.5 py-1.5 text-[0.68rem] font-bold leading-tight text-ink">
                  {t(s.label)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

/* ================================================================ WHY US == */
export function WhyUs() {
  const { t } = useLang();
  return (
    <section id="about" className="bg-white pb-14">
      <div className="wrap">
        <div className="hero-grad rounded-2xl p-6 sm:p-9">
          <h2 className="text-[1.5rem] font-extrabold text-white sm:text-[1.8rem]">{t(whyUs.heading)}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="text-brand-yellow">
                  <Icon name={item.icon} className="size-7" strokeWidth={1.7} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.98rem] font-bold text-white">{t(item.title)}</span>
                  {item.sub && (
                    <span className="block text-[0.9rem] text-white/75">{t(item.sub)}</span>
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
export function Gallery() {
  const { t } = useLang();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Index into `gallery` while the full-screen viewer is open, null when closed.
  const [lightbox, setLightbox] = useState(null);

  const strip = useRef(null);
  const photo = gallery[0];
  const openLightbox = (index) => { setPaused(true); setLightbox(index); };
  const closeLightbox = () => setLightbox(null);
  const stepLightbox = (direction) =>
    setLightbox((current) => (current === null ? current : (current + direction + gallery.length) % gallery.length));

  // The viewer is a fixed overlay, so the page behind it must not scroll while
  // it is open. Restored to whatever the page had before.
  useEffect(() => {
    if (lightbox === null) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [lightbox]);

  // Arrow keys page through the viewer, Escape closes it.
  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closeLightbox(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); stepLightbox(1); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); stepLightbox(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  // Two photos share the viewport without a gap; advance by one photo.
  const move = (direction) => {
    const element = strip.current;
    if (!element) return;
    const loopWidth = element.scrollWidth / 2;
    const step = element.clientWidth / 2;
    if (element.scrollLeft >= loopWidth) element.scrollLeft -= loopWidth;
    if (direction < 0 && element.scrollLeft < step) element.scrollLeft += loopWidth;
    element.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  // Page forward on a timer instead of drifting continuously: one whole photo
  // every few seconds, so each shot gets a clean, readable moment on screen.
  useEffect(() => {
    if (!strip.current || paused || hovered || gallery.length < 2 ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => move(1), 4000);
    return () => window.clearInterval(id);
  }, [paused, hovered]);

  return (
    <section id="gallery" className="bg-white pb-14">
      {/* Same treatment as the Services strip: a light-blue hairline running the
          full width with the tiny label sitting in the middle of it. Two flex-1
          rules of equal weight keep the label dead centre. */}
      <div className="mb-2 flex items-center gap-2.5 sm:gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-brand-blue/30" />
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-blue/75">
          {t('Gallery')}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-brand-blue/30" />
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
          <div className="relative">
            <div ref={strip} className="gallery-viewport no-scrollbar">
              <div className="gallery-track">
                {[0, 1].map((copy) => (
                  <div key={copy} className="gallery-group" aria-hidden={copy === 1}>
                    {gallery.map((item, index) => (
                      <figure
                        key={item.src}
                        aria-hidden={copy === 1}
                        className="gallery-card bg-transparent"
                      >
                        <button
                          type="button"
                          onClick={() => openLightbox(index)}
                          // The duplicate half of the loop is decorative, so it is
                          // not reachable by keyboard or screen reader.
                          tabIndex={copy === 1 ? -1 : 0}
                          aria-hidden={copy === 1}
                          aria-label={`${t(item.label)} — ${t('Full screen')}`}
                          className="block w-full cursor-zoom-in"
                        >
                          <img src={item.src} alt={t(item.label)} className="gallery-full-image" />
                        </button>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setPaused(true); move(-1); }}
              disabled={gallery.length < 2}
              aria-label={t('Previous photo')}
              className="absolute left-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-transparent text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70 disabled:opacity-40 sm:left-2"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => { setPaused(true); move(1); }}
              disabled={gallery.length < 2}
              aria-label={t('Next photo')}
              className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-transparent text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70 disabled:opacity-40 sm:right-2"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-center text-sm text-body/60">Gallery abhi khaali hai.</p>
      )}

      {/* Full-screen viewer. object-contain inside a box inset from every edge is
          what guarantees the whole photo is visible: whatever the aspect ratio,
          the image shrinks to fit rather than being cropped to fill. */}
      {lightbox !== null && gallery[lightbox] && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950"
          role="dialog"
          aria-modal="true"
          aria-label={`${gallery[lightbox].label} — photo ${lightbox + 1} of ${gallery.length}`}
        >
          <div className="flex items-start justify-between gap-4 p-4 text-white">
            <p className="text-sm font-semibold">
              {gallery[lightbox].label}
              <span className="ml-2 font-normal text-white/60">
                {lightbox + 1} / {gallery.length}
              </span>
            </p>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close full screen view"
              className="grid size-11 shrink-0 place-items-center rounded-md bg-white/10 text-2xl leading-none transition-colors hover:bg-white/25"
            >
              &times;
            </button>
          </div>

          {/* The arrows are flex siblings of the image rather than absolutely positioned
              on top of it. They take real horizontal space (shrink-0) and the
              image takes what is left (flex-1 + min-w-0), so a wide photo can no
              longer slide underneath the buttons. object-contain on a stretched
              image still letterboxes it, so nothing is ever cropped. */}
          <div className="flex min-h-0 flex-1 items-stretch justify-center gap-2 p-3 sm:gap-3 sm:p-5">
            <button
              type="button"
              onClick={() => stepLightbox(-1)}
              aria-label={t('Previous photo')}
              className="grid size-11 shrink-0 self-center place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <ChevronLeft className="size-7" />
            </button>
            <img
              src={gallery[lightbox].src}
              alt={gallery[lightbox].label}
              className="min-h-0 min-w-0 flex-1 object-contain"
            />
            <button
              type="button"
              onClick={() => stepLightbox(1)}
              aria-label={t('Next photo')}
              className="grid size-11 shrink-0 self-center place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <ChevronRight className="size-7" />
            </button>
          </div>
        </div>
      )}
      </section>
  );
}

/* =============================================================== REVIEWS == */
export function Reviews() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const prev = () => setI((v) => (v - 1 + reviews.length) % reviews.length);
  const next = () => setI((v) => (v + 1) % reviews.length);
  const r = reviews[i];

  return (
    <section id="reviews" className="bg-slate-50 py-14">
      <div className="wrap">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[1.6rem] font-extrabold sm:text-[1.9rem]">{t('Customer Reviews')}</h2>
            <a
              href="#reviews"
              className="rounded-md bg-brand-blue px-4 py-2 text-[0.82rem] font-bold text-white transition-colors hover:bg-brand-blue-dark"
            >
              {t('View All')}
            </a>
          </div>

          <div className="mt-6 flex items-start gap-4">
            <button
              onClick={prev}
              aria-label={t('Previous review')}
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
              <p className="mt-4 leading-relaxed text-body">{t(r.text)}</p>
            </div>

            <button
              onClick={next}
              aria-label={t('Next review')}
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
/* ======================================================== VISITOR COUNTER == */
/**
 * Shows how many people have visited, bottom-centre of the footer.
 *
 * Backs onto the Firebase Realtime Database in the `kadrabadmarts` project using
 * the plain REST API — no SDK — so it costs nothing in page weight on a site
 * this small.
 *
 * Two things worth knowing about how it counts:
 *
 * - Once per browser tab, not once per page view. sessionStorage is the marker,
 *   so refreshing a page does not inflate the total. A "visitor" number that
 *   jumps when you press F5 is worse than useless; it stops meaning anything.
 * - It counts every visit including the owner's own, so treat it as a rough
 *   figure rather than a traffic report.
 *
 * PATCHing `{"count": 1}` is the Realtime Database REST spelling of "add one to
 * the existing number" — it applies server-side, so two people opening the site
 * at the same instant cannot overwrite each other.
 *
 * Renders nothing at all when the database is unreachable, which is what keeps a
 * missing or locked-down database from showing an error in the footer.
 */
function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const show = (data) => {
      if (!cancelled && data && typeof data.count === 'number') setCount(data.count);
    };

    const read = () =>
      fetch(`${visitCounter.dbUrl}/susma/visits.json`)
        .then((r) => (r.ok ? r.json() : null))
        .then(show)
        .catch(() => {});

    try {
      if (!sessionStorage.getItem(visitCounter.sessionKey)) {
        sessionStorage.setItem(visitCounter.sessionKey, '1');
        fetch(`${visitCounter.dbUrl}/susma/visits.json`, {
          method: 'PATCH',
          body: '{"count":1}',
        })
          .then(() => read())
          .catch(() => {});
      } else {
        read();
      }
    } catch {
      /* storage blocked (private mode) — still show the existing number */
      read();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!visitCounter.enabled || count === null) return null;

  // No margin of its own: it sits in the middle cell of the footer's bottom
  // row, between the copyright line and the social squares.
  return (
    <p className="text-center text-[0.78rem] text-white/55">
      Visitor Count : {count}
    </p>
  );
}

export function Footer() {
  const { t } = useLang();
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
                <div className="mt-1.5 text-[0.58rem] text-white/70">{t(business.tagline)}</div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 fill-brand-red" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <span className="text-[0.85rem] leading-relaxed">
              {t(contact.street)}, {contact.town}
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
              <span className="text-white/65">{t('(Call / WhatsApp)')}</span>
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

        {/* Three cells rather than justify-between: the counter has to sit in the
            true middle of the row, and with justify-between it would just land
            wherever the free space happened to fall. The 1fr sides keep it
            centred no matter how wide the social squares get. */}
        <div className="mt-8 grid items-center gap-4 border-t border-white/10 pt-6 sm:grid-cols-[1fr_auto_1fr]">
          <p className="text-center text-[0.78rem] text-white/55 sm:text-left">
            © {new Date().getFullYear()} {business.nameFull}. {t('All rights reserved.')}
          </p>
          <div className="flex items-center justify-center gap-2 sm:justify-end">
            {/* Same profiles as the top-bar squares, read from the same `socials`
                map so the two rows can never point at different places. */}
            {['facebook', 'instagram', 'youtube', 'maps'].map((k) => {
              const url = socials[k];
              const className =
                'grid size-9 place-items-center rounded-md text-white transition-colors';

              // No profile URL for this network yet: draw it dimmed instead of
              // linking to "#", which would just jump the visitor to the top.
              if (!url) {
                return (
                  <span
                    key={k}
                    aria-hidden="true"
                    className={`${className} cursor-default bg-white/10 opacity-55`}
                  >
                    <SocialGlyph k={k} />
                  </span>
                );
              }

              return (
                <a
                  key={k}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={k}
                  className={`${className} bg-white/10 hover:bg-brand-red`}
                >
                  <SocialGlyph k={k} />
                </a>
              );
            })}
          </div>

          <VisitCounter />
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