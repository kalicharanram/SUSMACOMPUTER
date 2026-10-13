import {
  ArrowLeft, BadgeCheck, BriefcaseBusiness, Camera, ChartNoAxesColumnIncreasing,
  CircleDollarSign, Clock3, Clapperboard, ContactRound, FileText, Globe2,
  GraduationCap, IdCard, Images, Keyboard, MapPin, Megaphone, MessageCircle,
  Monitor, Palette, Phone, Play, Printer, Receipt, School, Settings, Share2,
  ShieldCheck, Sparkles, Stamp, ThumbsUp, UserRound, Video,
} from 'lucide-react';
import { contact } from '../data/site';
import { priceCategories } from '../data/prices';
import { useLang } from '../i18n';

const categoryIcons = [Monitor, Camera, Megaphone, IdCard, Stamp];
const serviceIcons = [
  [FileText, Monitor, Palette, Receipt, Globe2, Settings, Keyboard, UserRound],
  [Video, Camera, Clapperboard, Images, Megaphone],
  [Share2, Play, MessageCircle, Share2, Camera, ChartNoAxesColumnIncreasing, Megaphone],
  [IdCard, GraduationCap, School, BriefcaseBusiness, ContactRound, UserRound, BadgeCheck],
  [Stamp, Printer, BadgeCheck, Stamp, FileText, Stamp, BadgeCheck],
];
const benefits = [
  { icon: Clock3, title: 'Fast Service' },
  { icon: ShieldCheck, title: 'Quality Work' },
  { icon: Phone, title: 'Customer Support' },
  { icon: ThumbsUp, title: '100% Satisfaction' },
];
const reasons = [
  { icon: UserRound, title: 'Experienced Team', text: 'Skilled & trained professionals' },
  { icon: ShieldCheck, title: 'Quality Work', text: 'Careful work, every time' },
  { icon: Clock3, title: 'On-Time Delivery', text: 'Your time matters' },
  { icon: CircleDollarSign, title: 'Affordable Price', text: 'Best value for money' },
];

export function PriceList() {
  const { t } = useLang();

  return <section className="job-page price-page">
    <div className="price-poster">
      <header className="price-masthead">
        <div className="price-brand-mark"><Monitor size={39} strokeWidth={2.2} /><span className="price-mark-dot" /></div>
        <div className="price-brand-copy">
          <p className="price-brand-name">SUSMA <span>COMPUTER</span></p>
          <p className="price-brand-lab">&amp; VIDEO MIXING LAB</p>
          <p className="price-brand-tag">Digital Solutions Under One Roof</p>
          <p className="price-brand-address"><MapPin size={14} /> {contact.town}, {contact.district}, Bihar</p>
        </div>
        <div className="price-promo">
          <Sparkles size={20} />
          <strong>Aapki Digital<br />Zarooraton Ka<br />Ek Hi Samadhan!</strong>
        </div>
        <div className="price-head-points">
          {[[Sparkles, 'Professional Services'], [CircleDollarSign, 'Affordable Prices'], [BadgeCheck, 'Trusted Work']].map(([Icon, label]) => <div key={label}><Icon size={20} /><span>{label}</span></div>)}
        </div>
      </header>

      <div className="price-title-row">
        <h1><span>Our Services &amp;</span><strong>Price List</strong></h1>
        <p>Clear starting prices<br />for your digital needs</p>
      </div>

      <div className="price-benefits" aria-label="Service benefits">
        {benefits.map(({ icon: Icon, title }) => <div key={title}><span><Icon size={19} /></span><strong>{title}</strong></div>)}
      </div>

      <div className="price-poster-grid">
        {priceCategories.map((category, categoryIndex) => {
          const CategoryIcon = categoryIcons[categoryIndex] || Sparkles;
          const icons = serviceIcons[categoryIndex] || [];
          return <section className={`price-poster-card price-card-${categoryIndex + 1}`} key={category.title}>
            <h2><span className="price-category-icon"><CategoryIcon size={25} /></span><span>{t(category.title)}</span></h2>
            <ol>{category.services.map((service, index) => {
              const ServiceIcon = icons[index] || Sparkles;
              return <li className="price-poster-row" key={service.name}>
                <span className="price-row-number">{String(index + 1).padStart(2, '0')}</span>
                <ServiceIcon className="price-service-icon" size={22} strokeWidth={2.2} />
                <div className="price-service-copy"><h3>{t(service.name)}</h3><p>{service.basis}</p></div>
                <strong className="price-tag">{service.price}</strong>
              </li>;
            })}</ol>
            {categoryIndex === 1 && <div className="price-card-callout"><Camera size={26} /><span>Capture Your<br /><b>Special Moments</b></span></div>}
            {categoryIndex === 2 && <div className="price-card-callout"><Play size={25} /><span>Grow Your<br /><b>Business Online</b></span></div>}
            {categoryIndex === 3 && <div className="price-card-callout"><IdCard size={27} /><span>Professional ID Cards<br /><b>For Every Need</b></span></div>}
            {categoryIndex === 4 && <div className="price-card-callout"><Stamp size={27} /><span>Your Identity,<br /><b>Our Priority</b></span></div>}
          </section>;
        })}

        <section className="price-poster-card price-why-card">
          <h2><span className="price-category-icon"><ThumbsUp size={25} /></span><span>Why Choose Us?</span></h2>
          <ul>{reasons.map(({ icon: Icon, title, text }) => <li key={title}><span><Icon size={22} /></span><div><strong>{title}</strong><small>{text}</small></div></li>)}</ul>
          <p className="price-why-motto">Work Smart<br /><b>Grow Together</b><ChartNoAxesColumnIncreasing size={40} /></p>
        </section>
      </div>

      <div className="price-contact-strip">
        <div className="price-location"><MapPin size={27} /><span>{contact.town}, {contact.district}<small>Your Local Digital Partner</small></span></div>
        <a href={`tel:${contact.phone1}`}><Phone size={21} /><span>{contact.phone1}<small>Call for details</small></span></a>
        <a href={contact.websiteHref}><Globe2 size={21} /><span>{contact.website}<small>Visit us online</small></span></a>
        <a className="price-back" href="#services"><ArrowLeft size={16} /> {t('Services')}</a>
      </div>

      <div className="price-notes">
        <p>Listed rates are starting prices. Final charges can change with work scope, duration, size, quantity and finish. Government or portal fees, materials, album printing, travel and advertising budget are extra where applicable. We will confirm the total before starting.</p>
        <a className="job-call" href={`tel:${contact.phone1}`}><Phone size={17} />{t('Call Now')}</a>
      </div>
      <div className="price-poster-bottom"><span>SUSMA COMPUTER</span><i />Digital Solutions Under One Roof<i /></div>
    </div>
  </section>;
}
