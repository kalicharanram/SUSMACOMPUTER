import { MapPin, Phone, Mail, Clock, Search, Menu, X, ChevronDown, House } from 'lucide-react';
import { useState, useEffect, useRef, Fragment } from 'react';
import { SOCIALS, SOCIAL_BG, BrandWhatsApp } from './Icons';
import { contact, nav, hero, socials } from '../data/site';
import { LANGS } from '../data/i18n';
import { useLang } from '../i18n';

/* ================================================================ TOP BAR == */
export function TopBar() {
  const { t, lang, setLang } = useLang();

  return (
    <div className="bg-navy text-white/90">
      <div className="wrap flex min-h-11 items-center justify-between gap-4 py-1.5 text-[0.8rem]">
        {/* ---- left: contact details ---- */}
        <div className="hidden min-w-0 items-center gap-5 lg:flex">
          {/* `truncate` + `min-w-0`: the address is the longest item here, so when the
            bar gets tight it gives up characters rather than wrapping to a second
            line and doubling the height of the whole header. */}
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            {/* Built here rather than via the shared `addressFull` so the street half can
            be translated; the town, district, state and PIN are proper nouns. */}
            <span className="truncate">
              {t(contact.street)}, {contact.town}, {contact.district}, {contact.state} - {contact.pin}
            </span>
          </span>

          <a href={`tel:${contact.phone1}`} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap hover:text-white">
            <Phone className="size-3.5 shrink-0" />
            {contact.phone1}
          </a>

          {/* second number is the WhatsApp line, so it carries the WhatsApp mark */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap hover:text-white"
          >
            <BrandWhatsApp className="size-3.5" />
            {contact.phone2}
          </a>

          {/* Dropped below xl. With the address, two numbers, the hours and the badge all
              in this bar there is no width left for the email as well, and a
              half-cut row looks worse than an absent one. The address, the number
              and the opening hours are what a visitor needs at a glance; the email
              is still in the footer. */}
          <a
            href={`mailto:${contact.email}`}
            className="hidden items-center gap-1.5 hover:text-white xl:inline-flex"
          >
            <Mail className="size-3.5 shrink-0" />
            {contact.email}
          </a>

          {/* Opening hours. These disappeared when the business info cards were
              removed from the hero, which left the site saying nothing about
              when the shop is open — the first thing a caller wants to know. */}
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <Clock className="size-3.5 shrink-0" />
            {t(contact.hoursToday)}
            <span className="rounded bg-open-green px-1.5 py-0.5 text-[0.62rem] font-bold leading-tight whitespace-nowrap text-white">
              {t(contact.openLabel)}
            </span>
          </span>
        </div>

        {/* mobile */}
        <span className="inline-flex items-center gap-1.5 lg:hidden">
          <MapPin className="size-3.5 shrink-0" />
          {contact.street}, {contact.town}
        </span>

        {/* ---- right: coloured social squares + call button ---- */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="hidden items-center gap-1.5 sm:flex">
            {Object.keys(SOCIALS).map((k) => {
              const S = SOCIALS[k];
              const url = socials[k];
              const className = `grid size-6 place-items-center rounded-[5px] text-white ${SOCIAL_BG[k]}`;

              // No URL yet for this network: draw the square, but not as a link.
              // A clickable `href="#"` would just jump the visitor to the top of
              // the page, which looks like a broken button.
              const glyph = !url ? (
                <span aria-hidden="true" className={`${className} opacity-60`}>
                  <S className="size-3.5" />
                </span>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={k}
                  className={`${className} transition-opacity hover:opacity-85`}
                >
                  <S className="size-3.5" />
                </a>
              );

              return (
                <Fragment key={k}>
                  {/* The call button leads the row, so the Facebook icon follows
                      it. It is rendered as a separate element rather than a fifth
                      entry in SOCIALS, which keeps that map a list of profiles
                      only while still deciding where the button lands. */}
                  {k === 'facebook' && (
                    <a
                      href={`tel:${contact.phone1}`}
                      aria-label={t('Call Now')}
                      className="inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-[5px] bg-brand-red px-2 text-[0.66rem] font-bold text-white transition-colors hover:bg-brand-red-dark"
                    >
                      <Phone className="size-3" />
                      {t('Call Now')}
                    </a>
                  )}

                  {glyph}
                </Fragment>
              );
            })}
          </div>

          {/* Language switcher, sitting directly under the social row as in the
              design reference. The active one stays white-on-navy so it reads
              as the current choice rather than another link. */}
          <div className="flex items-center gap-1" role="group" aria-label="Language">
            {LANGS.map((l) => {
              const on = lang === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  aria-pressed={on}
                  // The chosen language keeps full colour plus a white ring; the
                  // others stay in their own colour but dimmed, so the active one
                  // is obvious without hiding what else is on offer.
                  style={{ backgroundColor: l.color }}
                  className={`rounded-[5px] px-2 py-0.5 text-[0.66rem] font-bold tracking-[0.06em] text-white transition-all ${
                    on ? 'opacity-100 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>

          {/* The red "Call Now" button was removed from here at the client's request.
              Calling is still one tap away: the number on the left of this bar is
              a tel: link, and the red "Call Now" button stays in the hero. */}
        </div>
      </div>
    </div>
  );
}

/* ================================================================= HEADER == */
export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-spy: marks whichever section the visitor is actually looking at, so
     the menu tracks the page instead of always pointing at Home.
     The probe line sits just under the sticky header — measuring against the
     top of the viewport would pick a section that is still hidden behind it. */
  useEffect(() => {
    /* Contact lives on the <footer>, not on a <main> section — querying only
       `main > section[id]` left it out, so the Contact item could never light
       up. querySelectorAll returns document order, which keeps Contact last. */
    const sections = () =>
      [...document.querySelectorAll('main > section[id], footer[id]')].filter(
        (s) => s.offsetHeight > 0
      );

    const pick = () => {
      const list = sections();
      if (!list.length) return;

      const headerH = headerRef.current?.offsetHeight ?? 88;
      const line = window.scrollY + headerH + 24;

      let current = list[0].id;
      for (const s of list) {
        if (s.offsetTop <= line) current = s.id;
      }

      // At the very bottom the last section can be too short to ever cross the
      // line, so pin the highlight to the last one instead.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = list[list.length - 1].id;

      setActiveId((prev) => (prev === current ? prev : current));
    };

    pick();
    window.addEventListener('scroll', pick, { passive: true });
    window.addEventListener('resize', pick);
    return () => {
      window.removeEventListener('scroll', pick);
      window.removeEventListener('resize', pick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* Only the first nav item pointing at the visible section is highlighted.
     "Services" and "Price List" both link to #services; lighting both up at
     once reads as a mistake, so the first match wins and Price List stays
     neutral. */
  const activeIndex = nav.findIndex((item) => item.href === `#${activeId}`);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="wrap flex h-[5.5rem] items-center justify-between gap-4">
        <a href="#home" className="block min-w-0 shrink" aria-label="Susma Computer & Video Mixing Lab — Home">
          <img
            src="./images/branding/susma-header-blue-on-white.webp"
            alt="Susma Computer & Video Mixing Lab — Digital Solutions Under One Roof"
            width="2172"
            height="724"
            fetchPriority="high"
            className="block h-auto max-h-[72px] w-[216px] max-w-full object-contain"
          />
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item, i) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDrop(i)}
              onMouseLeave={() => setOpenDrop(null)}
            >
              <a
                href={item.href}
className={`inline-flex items-center gap-1.5 rounded-md px-2 py-2.5 text-[0.85rem] font-semibold transition-colors xl:px-3.5 xl:text-[0.92rem] ${
                  /* Dark blue for the section currently in view, and while this
                     item's menu is open. The open state has to be part of the
                     class, not just `:hover`: once the cursor leaves the link to
                     travel down into the dropdown panel the link is no longer
                     hovered, so a hover-only rule turned the button pale while
                     its own menu was still on screen. */
                  i === activeIndex || openDrop === i
                    ? 'bg-brand-blue-dark text-white'
                    : 'bg-p-blue text-brand-blue-dark hover:bg-brand-blue-dark hover:text-white'
                }`}
              >
                {/* the active Home item carries a house glyph in the reference */}
                {i === 0 && <House className="size-4" strokeWidth={2.4} />}
                {t(item.label)}
                {item.children && <ChevronDown className="size-3.5" />}
              </a>

              {item.children && (
                /* All services now live in this menu, so it is taller than the
                   viewport on a laptop. Capped to the viewport and given its own
                   scrollbar; a mouse wheel over the panel still reaches the list
                   because it is the only thing under the cursor. */
                <div
                  className={`scrollbar-thin absolute left-0 top-full max-h-[min(26rem,70vh)] w-56 overflow-y-auto overscroll-contain rounded-lg border border-slate-100 bg-white shadow-xl transition-all lg:max-h-[min(32rem,75vh)] ${
                    openDrop === i
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-1 opacity-0'
                  }`}
                >
                  {item.children.map((c) => (
                    <a
                      key={c}
                      href={item.href}
                      onClick={() => setOpenDrop(null)}
                      className="block border-b border-slate-50 px-4 py-2.5 text-sm text-body transition-colors last:border-0 hover:bg-p-blue hover:text-brand-blue"
                    >
                      {t(c)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* search + toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden 2xl:flex">
            <input
              type="search"
              placeholder={t('Search Services...')}
              className="h-10 w-40 rounded-l-md border border-r-0 border-slate-200 px-3 text-sm outline-none focus:border-brand-blue xl:w-44"
            />
            <button
              aria-label="Search"
              className="grid h-10 w-11 place-items-center rounded-r-md bg-navy text-white transition-colors hover:bg-navy-2"
            >
              <Search className="size-4" />
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('Close menu') : t('Open menu')}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="grid size-11 place-items-center rounded-md border border-slate-200 text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div id="mobile-navigation" className="border-t border-slate-100 bg-white lg:hidden">
          <div className="wrap flex flex-col py-3">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-slate-100 py-3 text-[0.95rem] font-semibold text-ink last:border-0"
              >
                {t(item.label)}
              </a>
            ))}
            <div className="mt-3 flex lg:hidden">
              <input
                type="search"
                placeholder={t('Search Services...')}
                className="h-11 flex-1 rounded-l-md border border-r-0 border-slate-200 px-3 text-sm"
              />
              <button className="btn-primary grid h-11 w-12 place-items-center rounded-r-md" aria-label="Search">
                <Search className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ================================================================== HERO == */
/* The shop front is the section background; the heading and the three actions
   sit on top of it. */
export function Hero() {
  const { t } = useLang();

  return (
    /* One single hero block. The shop front is now the background of the whole
       section instead of a panel of its own, so the heading, the three actions
       and the info cards all sit on one picture instead of three columns that
       read as separate pages. */
    <section id="home" className="relative isolate overflow-hidden bg-navy-2">
      <img
        src="./images/shop-hero.jpg"
        alt="Susma Computer & Video Mixing Lab shop front in Kadrabad, Begusarai"
        className="absolute inset-0 size-full object-cover object-center"
      />
      {/* Legibility wash. It has to be at its heaviest on the left, where the
          white heading sits, and lightest on the right so the shop stays
          visible behind the info cards. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/70 to-transparent"
      />

      <div className="relative wrap py-5 xl:py-4">
        {/* ------------------------------------------------ heading + actions -- */}
        {/* Capped width so the heading does not stretch into one very long line
             now that the right-hand card column is gone — and the shop photo
             stays visible beside the text instead of being covered by it. */}
        <div className="flex max-w-3xl flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[0.82rem] font-semibold text-white ring-1 ring-white/15 backdrop-blur-sm">
            <span className="text-brand-yellow">#</span>
            {t(hero.badge)}
          </span>

          <h1 className="mt-3 text-[1.7rem] font-extrabold leading-[1.1] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-[2rem] xl:text-[2.05rem]">
            {hero.title1}
            <br />
            <span className="text-brand-yellow">{hero.title2}</span>
          </h1>

          <p className="mt-2 max-w-lg text-[0.92rem] leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] sm:text-[1rem]">
            {t(hero.subtitleHindi)}
          </p>

          <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
            {/* `tick`, not `t` — naming the loop variable `t` shadows the translate
                function, and every label inside it would then call a string. */}
            {hero.ticks.map((tick) => (
              <li key={tick} className="inline-flex items-center gap-2.5 text-[0.98rem] font-medium text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.55)]">
                <span className="grid size-5 place-items-center rounded-full bg-brand-yellow text-navy">
                  <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t(tick)}
              </li>
            ))}
          </ul>

          {/* The three actions always stay on one line — no wrapping.
              On phones they share the available width and the label may wrap
              inside its own button rather than the row breaking. */}
          <div className="mt-4 flex flex-nowrap gap-2 sm:gap-3">
            <a
              href={`tel:${contact.phone1}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-red px-2.5 py-2 text-center text-[0.72rem] font-bold leading-tight text-white shadow-lg transition-colors hover:bg-brand-red-dark sm:flex-none sm:gap-2 sm:px-3.5 sm:py-2.5 sm:text-base"
            >
              <Phone className="size-4 shrink-0" />
              <span className="min-w-0">{t('Call Now')}</span>
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-wa-green px-2.5 py-2 text-center text-[0.72rem] font-bold leading-tight text-white shadow-lg transition-colors hover:bg-[#1eb957] sm:flex-none sm:gap-2 sm:px-3.5 sm:py-2.5 sm:text-base"
            >
              <BrandWhatsApp className="size-4 shrink-0" />
              <span className="min-w-0">{t('WhatsApp')}</span>
            </a>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-center text-[0.72rem] font-bold leading-tight shadow-lg transition-colors sm:flex-none sm:gap-2 sm:px-3.5 sm:py-2.5 sm:text-base"
            >
              <MapPin className="size-4 shrink-0" />
              <span className="min-w-0">{t('Get Direction')}</span>
            </a>
          </div>
        </div>

        {/* ------------------------------------------------- info-card panel -- */}
        {/* Removed at the client's request. The hours, the support promise and
             the full address are still on the page — in the top bar, in the
             "Get Direction" button and in the footer — so nothing was lost. */}
      </div>
    </section>
  );
}
