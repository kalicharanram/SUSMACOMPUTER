import {
  BadgeCheck, BriefcaseBusiness, Camera, ChartNoAxesColumnIncreasing,
  CircleDollarSign, Clock3, Clapperboard, ContactRound, FileText,
  GraduationCap, IdCard, Images, Keyboard, Megaphone, MessageCircle,
  Monitor, Palette, Play, Printer, Receipt, School, Settings, Share2,
  ShieldCheck, Sparkles, Stamp, ThumbsUp, UserRound, Video,
} from 'lucide-react';
import { priceCategories } from '../data/prices';

const categoryIcons = [Monitor, Camera, Megaphone, IdCard, Stamp];
const serviceIcons = [
  [FileText, Monitor, Palette, Receipt, Globe2, Settings, Keyboard, UserRound],
  [Video, Camera, Clapperboard, Images, Megaphone],
  [Share2, Play, MessageCircle, Share2, Camera, ChartNoAxesColumnIncreasing, Megaphone],
  [IdCard, GraduationCap, School, BriefcaseBusiness, ContactRound, UserRound, BadgeCheck],
  [Stamp, Printer, BadgeCheck, Stamp, FileText, Stamp, BadgeCheck],
];
const reasons = [
  { icon: UserRound, title: 'Experienced Team', text: 'Skilled & trained professionals' },
  { icon: ShieldCheck, title: 'Quality Work', text: 'Careful work, every time' },
  { icon: Clock3, title: 'On-Time Delivery', text: 'Your time matters' },
  { icon: CircleDollarSign, title: 'Affordable Price', text: 'Best value for money' },
];

export function PriceList() {
  return <section className="job-page price-page">
    <div className="price-poster">
      <div className="price-poster-grid">
        {priceCategories.map((category, categoryIndex) => {
          const CategoryIcon = categoryIcons[categoryIndex] || Sparkles;
          const icons = serviceIcons[categoryIndex] || [];
          return <section className={`price-poster-card price-card-${categoryIndex + 1}`} key={category.title}>
            <h2><span className="price-category-icon"><CategoryIcon size={25} /></span><span>{category.title}</span></h2>
            <ol>{category.services.map((service, index) => {
              const ServiceIcon = icons[index] || Sparkles;
              return <li className="price-poster-row" key={service.name}>
                <span className="price-row-number">{String(index + 1).padStart(2, '0')}</span>
                <ServiceIcon className="price-service-icon" size={22} strokeWidth={2.2} />
                <div className="price-service-copy"><h3>{service.name}</h3><p>{service.basis}</p></div>
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

    </div>
  </section>;
}
