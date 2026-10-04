import { MapPin, Phone, Mail, Star, MapPinned, Clock, Search, Menu, X, ChevronDown, House } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo, SOCIALS, SOCIAL_BG, BrandWhatsApp } from './Icons';
import { business, contact, nav, hero } from '../data/site';

/* ================================================================ TOP BAR == */
export function TopBar() {
  return (
    <div className="bg-navy text-white/90">
      <div className="wrap flex h-11 items-center justify-between gap-4 text-[0.8rem]">
        {/* ---- left: contact details ---- */}
        <div className="hidden items-center gap-5 lg:flex">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            {contact.city}, {contact.district}, {contact.state}
          </span>

          <a href={`tel:${contact.phone1}`} className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone className="size-3.5 shrink-0" />
            {contact.phone1}
          </a>

          {/* second number is the WhatsApp line, so it carries the WhatsApp mark */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white"
          >
            <BrandWhatsApp className="size-3.5" />
            {contact.phone2}
          </a>

          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
            <Mail className="size-3.5 shrink-0" />
            {contact.email}
          </a>
        </div>

        {/* mobile */}
        <span className="inline-flex items-center gap-1.5 lg:hidden">
          <MapPin className="size-3.5 shrink-0" />
          {contact.city}, {contact.district}
        </span>

        {/* ---- right: coloured social squares + call button ---- */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 sm:flex">
            {Object.keys(SOCIALS).map((k) => {
              const S = SOCIALS[k];
              return (
                <a
                  key={k}
                  href="#"
                  aria-label={k}
                  className={`grid size-6 place-items-center rounded-[5px] text-white transition-opacity hover:opacity-85 ${SOCIAL_BG[k]}`}
                >
                  <S className="size-3.5" />
                </a>
              );
            })}
          </div>

          <a
            href={`tel:${contact.phone1}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-red px-3.5 py-1.5 font-semibold text-white transition-colors hover:bg-brand-red-dark"
          >
            <Phone className="size-3.5" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================================================================= HEADER == */
export function Header() {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
      <div className="wrap flex h-[5.5rem] items-center justify-between gap-4">
        {/* logo */}
        <a href="#home" className="flex items-center gap-3">
          <Logo size={54} />
          <span className="leading-none">
            <span className="block text-[1.25rem] font-extrabold tracking-tight text-brand-blue sm:text-[1.55rem]">
              {business.name}
            </span>
            <span className="mt-0.5 block text-[1.05rem] font-extrabold sm:text-[1.3rem]">
              <span className="text-brand-red">{business.nameAccent}</span>
            </span>
            <span className="mt-1.5 block text-[0.62rem] font-medium text-body/85">
              {business.tagline}
            </span>
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {nav.map((item, i) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDrop(i)}
              onMouseLeave={() => setOpenDrop(null)}
            >
              <a
                href={item.href}
                className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2.5 text-[0.92rem] font-semibold transition-colors ${
                  i === 0
                    ? 'bg-brand-blue text-white'
                    : 'text-ink hover:text-brand-blue'
                }`}
              >
                {/* the active Home item carries a house glyph in the reference */}
                {i === 0 && <House className="size-4" strokeWidth={2.4} />}
                {item.label}
                {item.children && <ChevronDown className="size-3.5" />}
              </a>

              {item.children && (
                <div
                  className={`absolute left-0 top-full w-56 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-xl transition-all ${
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
                      {c}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* search + toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex">
            <input
              type="search"
              placeholder="Search Services..."
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
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-md border border-slate-200 text-ink xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-slate-100 bg-white xl:hidden">
          <div className="wrap flex flex-col py-3">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-slate-100 py-3 text-[0.95rem] font-semibold text-ink last:border-0"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex lg:hidden">
              <input
                type="search"
                placeholder="Search Services..."
                className="h-11 flex-1 rounded-l-md border border-r-0 border-slate-200 px-3 text-sm"
              />
              <button className="grid h-11 w-12 place-items-center rounded-r-md bg-navy text-white" aria-label="Search">
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
/* Three zones, exactly as the reference: dark navy panel · shop photo (centre)
   · light panel carrying the three info cards.                            */
export function Hero() {
  const cards = [
    {
      ring: 'bg-[#E3EEFB]',
      fg: 'text-brand-blue',
      Icon: Clock,
      title: 'Open Today',
      lines: [contact.hoursToday],
      pill: contact.openLabel,
    },
    {
      ring: 'bg-[#FEF6D6]',
      fg: 'text-[#E8A800]',
      Icon: Star,
      title: 'Customer Support',
      lines: ['Always Ready to Help'],
    },
    {
      ring: 'bg-[#FDE7EA]',
      fg: 'text-brand-red',
      Icon: MapPinned,
      title: 'Our Location',
      lines: [`${contact.city}, ${contact.district}, ${contact.state}`],
      link: 'View on Google Maps',
    },
  ];

  return (
    <section id="home" className="grid xl:grid-cols-[1.2fr_1.08fr_0.62fr]">
      {/* ---------------------------------------------- 1. navy text panel -- */}
      <div className="hero-grad order-1 flex flex-col justify-center px-6 py-3 sm:px-10 sm:py-4 xl:pl-14 xl:pr-10">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.85rem] font-semibold text-white ring-1 ring-white/15">
          <span className="text-brand-yellow">#</span>
          {hero.badge}
        </span>

        <h1 className="mt-4 text-[1.85rem] font-extrabold leading-[1.1] text-white sm:text-[2.2rem] xl:text-[2.35rem]">
          {hero.title1}
          <br />
          <span className="text-brand-yellow">{hero.title2}</span>
        </h1>

        <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-white/90 sm:text-[1.05rem]">
          {hero.subtitleHindi}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2.5">
          {hero.ticks.map((t) => (
            <li key={t} className="inline-flex items-center gap-2.5 text-[0.98rem] font-medium text-white">
              <span className="grid size-5 place-items-center rounded-full bg-brand-yellow text-navy">
                <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {t}
            </li>
          ))}
        </ul>

        {/* The three actions always stay on one line — no wrapping.
            On phones they share the available width and the label may wrap
            inside its own button rather than the row breaking. */}
        <div className="mt-5 flex flex-nowrap gap-2 sm:gap-3">
          <a
            href={`tel:${contact.phone1}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-red px-2.5 py-2.5 text-center text-[0.72rem] font-bold leading-tight text-white shadow-lg transition-colors hover:bg-brand-red-dark sm:flex-none sm:gap-2 sm:px-3.5 sm:py-2.5 sm:text-base"
          >
            <Phone className="size-4 shrink-0" />
            <span className="min-w-0">Call Now</span>
          </a>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-wa-green px-2.5 py-2.5 text-center text-[0.72rem] font-bold leading-tight text-white shadow-lg transition-colors hover:bg-[#1eb957] sm:flex-none sm:gap-2 sm:px-3.5 sm:py-2.5 sm:text-base"
          >
            <BrandWhatsApp className="size-4 shrink-0" />
            <span className="min-w-0">WhatsApp</span>
          </a>
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-blue px-2.5 py-2.5 text-center text-[0.72rem] font-bold leading-tight text-white shadow-lg transition-colors hover:bg-brand-blue-dark sm:flex-none sm:gap-2 sm:px-3.5 sm:py-2.5 sm:text-base"
          >
            <MapPin className="size-4 shrink-0" />
            <span className="min-w-0">Get Direction</span>
          </a>
        </div>
      </div>

      {/* ----------------------------------------------- 2. shop photo (mid) -- */}
      <div className="relative order-2 min-h-[11rem] bg-navy-2 lg:min-h-[13.5rem]">
        <img
          src="/images/shop-hero.jpg"
          alt="Susma Computer & Video Mixing Lab shop front in Kadrabad, Begusarai"
          className="absolute inset-0 size-full object-cover object-top"
        />
        {/* soft navy wash on the left edge so the photo blends into the panel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/10 to-transparent"
        />
      </div>

      {/* ------------------------------------------ 3. light info-card panel -- */}
      <div className="order-3 flex flex-col justify-center gap-2.5 bg-gradient-to-br from-white via-[#F3F8FD] to-[#E6EFF9] px-5 py-4 sm:px-7 lg:flex-row xl:flex-col">
        {cards.map(({ ring, fg, Icon, title, lines, pill, link }) => (
          <div
            key={title}
            className="rounded-xl bg-white p-3 shadow-[0_4px_20px_-6px_rgba(10,27,78,0.18)]"
          >
            <div className="flex items-start gap-3.5">
              {/* circular icon badge, as in the reference */}
              <span className={`grid size-11 shrink-0 place-items-center rounded-full ${ring}`}>
                <Icon className={`size-5 ${fg}`} />
              </span>

              <div className="min-w-0">
                <h3 className="text-[0.98rem] font-extrabold leading-tight">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="mt-1 text-[0.85rem] leading-snug text-body">
                    {l}
                  </p>
                ))}
                {pill && (
                  <span className="mt-2 inline-block rounded bg-open-green px-2.5 py-1 text-[0.7rem] font-bold text-white">
                    {pill}
                  </span>
                )}
              </div>
            </div>

            {link && (
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block rounded-md bg-brand-blue px-3.5 py-1.5 text-[0.74rem] font-bold text-white transition-colors hover:bg-brand-blue-dark"
              >
                {link}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
